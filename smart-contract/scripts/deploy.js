const { ethers } = require('hardhat');
const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constants");

async function main(){
    const fakeNFTMarketplace = await ethers.getContractFactory('FakeNFTMarketplace');
    const fakeNftMarketplace = await fakeNFTMarketplace.deploy();
    await fakeNftMarketplace.deployed();

    console.log(`FakeNFTMarketplace deployed at ${fakeNftMarketplace.address}`);

    const cryptoDevsDAO = await ethers.getContractFactory('CryptoDevsDAO');
    const cryptoDevsDao = await cryptoDevsDAO.deploy(fakeNftMarketplace.address, CRYPTODEVS_NFT_CONTRACT_ADDRESS, {
        value: ethers.utils.parseEther('1')
    });
    await cryptoDevsDao.deployed();
    console.log(`CryptoDevsDAO deployed at ${cryptoDevsDao.address}`);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });