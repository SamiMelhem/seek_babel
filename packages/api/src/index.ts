import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { create } from 'ipfs-http-client';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// IPFS client setup
const projectId = process.env.IPFS_PROJECT_ID;
const projectSecret = process.env.IPFS_PROJECT_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// DID routes
app.post('/api/did', async (req, res) => {
  try {
    const { did, publicKeys, services } = req.body;
    const result = await ipfs.add(JSON.stringify({ did, publicKeys, services }));
    res.json({ cid: result.path });
  } catch (error) {
    console.error('Error storing DID:', error);
    res.status(500).json({ error: 'Failed to store DID' });
  }
});

app.get('/api/did/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const stream = ipfs.cat(cid);
    let data = '';
    for await (const chunk of stream) {
      data += chunk.toString();
    }
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error retrieving DID:', error);
    res.status(500).json({ error: 'Failed to retrieve DID' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
}); 