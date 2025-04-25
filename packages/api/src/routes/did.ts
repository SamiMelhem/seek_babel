import express from 'express';
import { ethers } from 'ethers';
import { RelayerService } from '../services/relayer';

const router = express.Router();

// Initialize relayer service
const provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
const signer = new ethers.Wallet(process.env.RELAYER_PRIVATE_KEY || '', provider);
const relayerService = new RelayerService(
  process.env.DID_REGISTRY_ADDRESS || '',
  signer
);

// Create DID endpoint
router.post('/create', async (req, res) => {
  try {
    const { did, publicKeys, services, user, signature } = req.body;

    // Verify the signature
    const isValid = await relayerService.verifySignature(did, user, signature);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Create DID using relayer
    const tx = await relayerService.createDIDGasless(
      did,
      publicKeys,
      services,
      user,
      signature
    );

    res.json({ success: true, transactionHash: tx.hash });
  } catch (error) {
    console.error('Error creating DID:', error);
    res.status(500).json({ error: 'Failed to create DID' });
  }
});

export default router; 