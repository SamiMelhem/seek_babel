import { ethers } from 'ethers';

export const generateKeyPair = async () => {
  const wallet = ethers.Wallet.createRandom();
  return {
    privateKey: wallet.privateKey,
    publicKey: wallet.publicKey,
    address: wallet.address,
  };
};

export const signMessage = async (message: string, privateKey: string) => {
  const wallet = new ethers.Wallet(privateKey);
  const signature = await wallet.signMessage(message);
  return signature;
};

export const verifySignature = async (
  message: string,
  signature: string,
  publicKey: string
) => {
  const recoveredAddress = ethers.utils.verifyMessage(message, signature);
  return recoveredAddress.toLowerCase() === publicKey.toLowerCase();
};

export const encryptData = async (data: string, publicKey: string) => {
  // Note: This is a placeholder. In a real implementation, you would use
  // a proper encryption library like tweetnacl-js or similar
  return data;
};

export const decryptData = async (encryptedData: string, privateKey: string) => {
  // Note: This is a placeholder. In a real implementation, you would use
  // a proper encryption library like tweetnacl-js or similar
  return encryptedData;
}; 