async function main() {
	const MARKET = await hre.ethers.getContractFactory("Market")
	const market = await MARKET.deploy()
	await market.deployed()
	console.log("market contract deployed to:", market.address)

	const ITEM = await hre.ethers.getContractFactory("Item")
	const item = await ITEM.deploy(market.address)
	await item.deployed()
	console.log("item contract deployed to:", item.address)
}

const runMain = async () => {
	try {
		await main()
		process.exit(0)
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

runMain()
