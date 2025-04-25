import { ethers } from 'ethers';
import { DIDRegistry } from '../../../smart-contracts/typechain-types';
import DIDRegistryArtifact from '../../../smart-contracts/artifacts/contracts/DIDRegistry.sol/DIDRegistry.json';

export class RelayerService {
  private contract: DIDRegistry;
  private signer: ethers.Signer;

  constructor(contractAddress: string, signer: ethers.Signer) {
    this.contract = new ethers.Contract(
      contractAddress,
      DIDRegistryArtifact.abi,
      signer
    ) as DIDRegistry;
    this.signer = signer;
  }

  async createDIDGasless(
    did: string,
    publicKeys: string[],
    services: string[],
    user: string,
    signature: string
  ) {
    try {
      const tx = await this.contract.createDIDGasless(
        did,
        publicKeys,
        services,
        user,
        signature
      );
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error in createDIDGasless:', error);
      throw error;
    }
  }

  async verifySignature(
    did: string,
    user: string,
    signature: string
  ): Promise<boolean> {
    try {
      const messageHash = ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(
          ['string', 'address'],
          [did, user]
        )
      );
      const ethSignedMessageHash = ethers.utils.hashMessage(
        ethers.utils.arrayify(messageHash)
      );
      const recoveredAddress = ethers.utils.recoverAddress(
        ethSignedMessageHash,
        signature
      );
      return recoveredAddress.toLowerCase() === user.toLowerCase();
    } catch (error) {
      console.error('Error in verifySignature:', error);
      return false;
    }
  }
} 