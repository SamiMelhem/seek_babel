import dotenv from 'dotenv';

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['INFURA_IPFS_PROJECT_ID', 'INFURA_IPFS_PROJECT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export const config = {
  port: process.env.PORT || 3001,
  ipfs: {
    projectId: process.env.INFURA_IPFS_PROJECT_ID,
    projectSecret: process.env.INFURA_IPFS_PROJECT_SECRET,
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
  }
}; 