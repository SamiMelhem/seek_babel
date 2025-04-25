import { ethers } from "hardhat";

async function main() {
  try {
    console.log("Starting deployment of DIDRegistry...");

    // Get the deployer's address
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with account:", deployer.address);

    // Get the contract factory
    const DIDRegistry = await ethers.getContractFactory("DIDRegistry");
    console.log("Contract factory created...");

    // Deploy the contract with the deployer as the initial owner
    const didRegistry = await DIDRegistry.deploy(deployer.address);
    console.log("Contract deployment initiated...");

    // Wait for deployment to complete
    await didRegistry.deployed();
    
    console.log("Contract deployed successfully!");
    console.log("Contract address:", didRegistry.address);

    // Log deployment details
    console.log("Deployed by:", deployer.address);
    console.log("Deployer balance:", ethers.utils.formatEther(await deployer.getBalance()), "ETH");

  } catch (error) {
    console.error("Error during deployment:");
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