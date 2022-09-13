import { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'

import { itemContractAddress, itemMarketAddress } from '../config.js'

import NFT from '../utils/Item.json'
import Market from '../utils/Market.json'

import { useRouter } from 'next/router'

const sellnft = () => {
  const [price, setPrice] = useState('')
  const [nft, setNft] = useState({})
  const [id, setId] = useState(null)
  const [owner, setOwner] = useState('')
  const [txLoading, setTxLoading] = useState(null)

  const router = useRouter()

  const handleChange = useCallback(
    (e) => {
      setPrice(e.target.value)
    },
    [setPrice]
  )

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

        const tokenId = router.query.id
        setId(tokenId)

        const tokenOwner = await nftContract.ownerOf(tokenId)
        setOwner(tokenOwner)

        const itemData = await nftContract.tokenURI(tokenId)
        const data = await axios.get(itemData)

        setNft(data.data)
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log('Error fetching token data', error)
    }
  }

  const reSellItem = async () => {
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

        const tokenId = router.query.id

        let listingPrice = await marketContract.getListingPrice()
        listingPrice = listingPrice.toString()

        const itemPrice = ethers.utils.parseUnits(price, 'ether')

        let tx = await marketContract.resellNftItem(
          itemContractAddress,
          tokenId,
          itemPrice,
          { value: listingPrice }
        )
        console.log('Mining:', tx.hash)
        await tx.wait()

        console.log('Mined!', tx.hash)
        setTxLoading(1)

        router.push('/explore')
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log('Error minting character', error)
    }
  }

  useEffect(() => {
    if (!router.isReady) return
    getNFTData()
  }, [router.isReady])

  return (
    <div className="flex items-center justify-center gap-x-20 px-60 pt-12 text-gray-900">
      <div className="flex w-3/6 flex-col gap-y-6">
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
        <div className="text-4xl">{nft.name}</div>
        <div className="flex gap-x-4 text-xl">
          <div>Owner:</div>
          <div className="text-gray-800">{owner}</div>
        </div>
        <div className="flex gap-x-4 text-xl">
          <div>Contract Address:</div>
          <div className="text-gray-800">{itemContractAddress}</div>
        </div>
        <div className="flex w-96 flex-col gap-y-4">
          <input
            type="text"
            onChange={handleChange}
            name="name"
            placeholder="Item Price"
            className="h-12 rounded-lg bg-gray-200 px-4 font-bold text-black shadow-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          <button
            onClick={reSellItem}
            className="flex h-12 cursor-pointer items-center justify-center rounded-lg bg-[#14213d] text-2xl font-bold text-[#e5e5e5] shadow-lg transition duration-500 ease-in-out hover:scale-[1.03] hover:shadow-lg lg:text-lg"
          >
            Sell
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

export default sellnft
