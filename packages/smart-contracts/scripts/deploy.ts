import { ethers } from "hardhat";

async function main() {
  console.log("Deploying DIDRegistry contract...");

  const DIDRegistry = await ethers.getContractFactory("DIDRegistry");
  const didRegistry = await DIDRegistry.deploy();

  await didRegistry.deployed();

  console.log(`DIDRegistry deployed to: ${didRegistry.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 