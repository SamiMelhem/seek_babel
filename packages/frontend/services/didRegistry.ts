import { ethers } from 'ethers';
import { DIDRegistry } from '../../smart-contracts/typechain-types';
import DIDRegistryArtifact from '../../smart-contracts/artifacts/contracts/DIDRegistry.sol/DIDRegistry.json';

export class DIDRegistryService {
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

  async createDID(did: string, publicKeys: string[], services: string[]) {
    const tx = await this.contract.createDID(did, publicKeys, services);
    await tx.wait();
    return tx;
  }

  async getDIDDocument(did: string) {
    return await this.contract.getDIDDocument(did);
  }

  async getDIDByAddress(address: string) {
    return await this.contract.getDIDByAddress(address);
  }
} 