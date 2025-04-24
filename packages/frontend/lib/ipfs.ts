import { create } from 'ipfs-http-client';

// Configure IPFS client
const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

export const uploadToIPFS = async (data: any) => {
  try {
    const result = await client.add(JSON.stringify(data));
    return result.path;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};

export const getFromIPFS = async (cid: string) => {
  try {
    const stream = client.cat(cid);
    let data = '';
    for await (const chunk of stream) {
      data += chunk.toString();
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error retrieving from IPFS:', error);
    throw error;
  }
};

export const pinToIPFS = async (cid: string) => {
  try {
    await client.pin.add(cid);
    return true;
  } catch (error) {
    console.error('Error pinning to IPFS:', error);
    throw error;
  }
}; 