import express from 'express';
import cors from 'cors';
import { ethers } from 'ethers';
import { config } from './config.js';

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// In-memory storage (replace with database in production)
const didDocuments = new Map();

// Health check endpoint
app.get('/health', async (req, res) => {
  res.json({ status: 'ok' });
});

// DID routes
app.post('/api/did/create', async (req, res) => {
  try {
    const { did, publicKeys, services, user, signature, message } = req.body;

    if (!did || !publicKeys || !services || !user || !signature || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify the signature
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== user.toLowerCase()) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Store the DID document in memory
    const didDocument = {
      did,
      publicKeys,
      services,
      controller: user,
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };

    didDocuments.set(did, didDocument);
    
    res.json({ 
      did,
      document: didDocument
    });
  } catch (error) {
    console.error('Error creating DID:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to create DID'
    });
  }
});

app.get('/api/did/:did', async (req, res) => {
  try {
    const { did } = req.params;
    const document = didDocuments.get(did);
    
    if (!document) {
      return res.status(404).json({ error: 'DID not found' });
    }
    
    res.json(document);
  } catch (error) {
    console.error('Error retrieving DID:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to retrieve DID'
    });
  }
});

// Start server
const server = app.listen(config.port, () => {
  console.log(`API server running on port ${config.port}`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
}); 