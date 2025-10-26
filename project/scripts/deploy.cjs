const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("🚀 Starting deployment...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // For Sepolia testnet, you can use an existing USDT test token or deploy a mock
  // Sepolia USDT address (if exists) or we'll deploy a mock
  // For testing, we'll use a mock ERC20 token

  console.log("\n📝 Deploying Mock USDT...");
  const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
  const mockUSDT = await MockERC20.deploy("Mock USDT", "USDT", 6);
  await mockUSDT.waitForDeployment();
  const mockUSDTAddress = await mockUSDT.getAddress();
  console.log("✅ Mock USDT deployed to:", mockUSDTAddress);

  // Deploy CommunityStaking Contract on Sepolia
  console.log("\n📝 Deploying CommunityStaking...");
  const CommunityStaking = await hre.ethers.getContractFactory("CommunityStaking");
  const minStake = hre.ethers.parseUnits("10", 6); // 10 USDT (6 decimals)
  const stakingContract = await CommunityStaking.deploy(mockUSDTAddress, minStake);
  await stakingContract.waitForDeployment();
  const stakingAddress = await stakingContract.getAddress();
  console.log("✅ CommunityStaking deployed to:", stakingAddress);

  // Deploy Membership Registry
  console.log("\n📝 Deploying MembershipRegistry...");
  const MembershipRegistry = await hre.ethers.getContractFactory("MembershipRegistry");
  const registryContract = await MembershipRegistry.deploy();
  await registryContract.waitForDeployment();
  const registryAddress = await registryContract.getAddress();
  console.log("✅ MembershipRegistry deployed to:", registryAddress);

  // Mint some test USDT to deployer for testing
  console.log("\n💰 Minting test USDT to deployer...");
  const mintAmount = hre.ethers.parseUnits("1000", 6); // 1000 USDT
  await mockUSDT.mint(deployer.address, mintAmount);
  console.log("✅ Minted 1000 USDT to:", deployer.address);

  // Save deployment addresses and ABIs
  const deploymentInfo = {
    network: hre.network.name,
    chainId: (await hre.ethers.provider.getNetwork()).chainId.toString(),
    deployer: deployer.address,
    contracts: {
      mockUSDT: mockUSDTAddress,
      stakingContract: stakingAddress,
      registryContract: registryAddress
    },
    minStakeAmount: minStake.toString(),
    timestamp: new Date().toISOString(),
    blockNumber: await hre.ethers.provider.getBlockNumber()
  };

  fs.writeFileSync(
    'deployments.json',
    JSON.stringify(deploymentInfo, null, 2)
  );

  // Save ABIs for frontend
  const stakingArtifact = await hre.artifacts.readArtifact("CommunityStaking");
  const registryArtifact = await hre.artifacts.readArtifact("MembershipRegistry");
  const erc20Artifact = await hre.artifacts.readArtifact("MockERC20");

  const abis = {
    CommunityStaking: stakingArtifact.abi,
    MembershipRegistry: registryArtifact.abi,
    MockERC20: erc20Artifact.abi
  };

  fs.writeFileSync(
    'contract-abis.json',
    JSON.stringify(abis, null, 2)
  );

  console.log("\n✅ Deployment complete!");
  console.log("📄 Deployment info saved to deployments.json");
  console.log("📄 ABIs saved to contract-abis.json");

  console.log("\n📋 Contract Addresses:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Mock USDT:           ", mockUSDTAddress);
  console.log("CommunityStaking:    ", stakingAddress);
  console.log("MembershipRegistry:  ", registryAddress);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  // Verify contracts on Etherscan (if not localhost)
  if (hre.network.name !== "localhost" && hre.network.name !== "hardhat") {
    console.log("\n⏳ Waiting for block confirmations...");
    await stakingContract.deploymentTransaction().wait(5);

    console.log("\n🔍 Verifying contracts on Etherscan...");

    try {
      await hre.run("verify:verify", {
        address: mockUSDTAddress,
        constructorArguments: ["Mock USDT", "USDT", 6],
      });
      console.log("✅ Mock USDT verified");
    } catch (error) {
      console.log("⚠️  Mock USDT verification failed:", error.message);
    }

    try {
      await hre.run("verify:verify", {
        address: stakingAddress,
        constructorArguments: [mockUSDTAddress, minStake],
      });
      console.log("✅ CommunityStaking verified");
    } catch (error) {
      console.log("⚠️  CommunityStaking verification failed:", error.message);
    }

    try {
      await hre.run("verify:verify", {
        address: registryAddress,
        constructorArguments: [],
      });
      console.log("✅ MembershipRegistry verified");
    } catch (error) {
      console.log("⚠️  MembershipRegistry verification failed:", error.message);
    }
  }

  console.log("\n🎉 All done!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
