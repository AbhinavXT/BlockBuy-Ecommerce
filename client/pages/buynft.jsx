import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'

import { itemContractAddress, itemMarketAddress } from '../config.js'

import NFT from '../utils/Item.json'
import Market from '../utils/Market.json'

import { useRouter } from 'next/router'

const buynft = () => {
  const [nft, setNft] = useState({})
  const [id, setId] = useState(null)
  const [tokenData, setTokenData] = useState({})
  const [txLoading, setTxLoading] = useState(null)

  const router = useRouter()

  // Fetch NFT data to display
  const getNFTData = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const nftContract = new ethers.Contract(
          itemContractAddress,
          NFT.abi,
          signer
        )
        const marketContract = new ethers.Contract(
          itemMarketAddress,
          Market.abi,
          signer
        )

        const tokenId = router.query.tokenid
        setId(tokenId)

        const itemId = router.query.itemid

        const itemData = await nftContract.tokenURI(tokenId)
        const data = await axios.get(itemData)
        setNft(data.data)

        const tokenData = await marketContract.fetchNftItemById(itemId)

        const itemPrice = ethers.utils.formatEther(tokenData[5])

        const EternalToken = {
          seller: tokenData[3],
          price: itemPrice,
        }
        setTokenData(EternalToken)
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log('Error fetching token data', error)
    }
  }

  // Creates transaction to buy NFT from the marketplace
  const buyEternalNft = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        setTxLoading(0)
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()

        const marketContract = new ethers.Contract(
          itemMarketAddress,
          Market.abi,
          signer
        )

        const itemId = router.query.itemid

        const tokenData = await marketContract.fetchNftItemById(itemId)
        const price = ethers.utils.parseUnits(tokenData[5].toString(), 'wei')

        const tx = await marketContract.createItemSale(
          itemContractAddress,
          itemId,
          {
            value: price,
          }
        )
        console.log('Mining:', tx.hash)
        await tx.wait()

        console.log('Mined!', tx.hash)
        setTxLoading(1)

        router.push('/profile')
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log('Error Mining transaction', error)
    }
  }

  useEffect(() => {
    if (!router.isReady) return
    getNFTData()
  }, [router.isReady])

  return (
    <div className="flex items-center justify-center gap-x-20 gap-y-20 px-60 pt-8 text-gray-900 lg:flex-row">
      <div className="flex w-3/6 flex-col gap-y-8">
        <div className="flex h-96 w-full items-center justify-center">
          <img src={nft.image} alt="" className="h-80 rounded-xl shadow-xl" />
        </div>
        <div>
          <div className="flex h-16 w-full items-center justify-center rounded-lg  bg-gray-200 text-lg font-bold text-black shadow-lg">
            {nft.description}
          </div>
        </div>
        <div>
          <div className="flex w-full flex-col gap-y-2 rounded-lg bg-gray-200  px-4 py-4 font-bold text-black shadow-lg">
            <div className="flex justify-between">
              <div>TokenId:</div>
              <div>{id}</div>
            </div>
            <div className="flex justify-between">
              <div>Token Standard:</div>
              <div>ERC-721</div>
            </div>
            <div className="flex justify-between">
              <div>Blockchain:</div>
              <div>Polygon Mumbai</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-12 py-8 px-12 font-bold">
        <div className="lg:text-4xl">{nft.name}</div>
        <div className="flex gap-x-4 text-2xl lg:text-xl">
          <div>Owner:</div>
          <div className="text-gray-800">{tokenData.seller}</div>
        </div>
        <div className="flex gap-x-4 text-xl">
          <div>Contract:</div>
          <div className="text-gray-800">{itemContractAddress}</div>
        </div>
        <div className="flex gap-x-4 text-xl">
          <div>Price:</div>
          <div className="text-gray-800">{tokenData.price} ETH</div>
        </div>
        <div className="flex w-96 flex-col gap-y-4">
          <button
            onClick={buyEternalNft}
            className="flex h-12 cursor-pointer items-center justify-center rounded-lg bg-[#14213d] text-2xl font-bold text-[#e5e5e5] shadow-lg transition duration-500 ease-in-out hover:scale-[1.03] hover:shadow-lg lg:text-lg"
          >
            Buy
          </button>
        </div>
        {txLoading === 0 ? (
          <div className="px-auto mt-12 flex items-center justify-center font-bold">
            Proocessing Your Transaction....
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default buynft
