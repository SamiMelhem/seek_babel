import { ethers } from "hardhat";

async function main() {
  try {
    // Get the deployed contract address (replace with your deployed address)
    const DID_REGISTRY_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
    
    // Get the contract factory and attach to deployed contract
    const DIDRegistry = await ethers.getContractFactory("DIDRegistry");
    const didRegistry = DIDRegistry.attach(DID_REGISTRY_ADDRESS);

    // Get signers (accounts)
    const [owner, user1] = await ethers.getSigners();

    console.log("Interacting with DIDRegistry at:", DID_REGISTRY_ADDRESS);
    console.log("Using account:", user1.address);

    // Create a DID
    const did = `did:example:${user1.address.toLowerCase()}`;
    const publicKeys = ["key1"];
    const services = ["service1"];

    // Create DID transaction
    console.log("Creating DID...");
    const tx = await didRegistry.connect(user1).createDID(did, publicKeys, services);
    await tx.wait();
    console.log("DID created successfully!");

    // Get DID Document
    console.log("\nFetching DID Document...");
    const [owner_, keys, services_, updated] = await didRegistry.getDIDDocument(did);
    
    console.log("\nDID Document:");
    console.log("Owner:", owner_);
    console.log("Public Keys:", keys);
    console.log("Services:", services_);
    console.log("Last Updated:", new Date(updated.toNumber() * 1000).toISOString());

  } catch (error) {
    console.error("Error during interaction:");
    console.error(error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 