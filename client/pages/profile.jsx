import { useEffect, useState, useCallback } from 'react'
import { ethers } from 'ethers'

import { itemContractAddress, itemMarketAddress } from '../config.js'

import NFT from '../utils/Item.json'
import Market from '../utils/Market.json'
import axios from 'axios'

import { useRouter } from 'next/router'

const profile = () => {
  const [boughtNfts, setBoughtNfts] = useState([])
  const [nftLoading, setNftLoading] = useState(null)

  const router = useRouter()

  const reSell = (tokenId) => {
    router.push({
      pathname: '/sellnft',
      query: { id: tokenId },
    })
  }

  // Gets data of NFTs bought from the marketplace
  const loadBoughtNFT = async () => {
    setNftLoading(0)
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = await new ethers.providers.Web3Provider(ethereum)
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

        const data = await marketContract.fetchMyNftItems()

        const items = await Promise.all(
          data.map(async (i) => {
            const tokenUri = await nftContract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')

            let item = {
              price,
              tokenId: i.tokenId.toNumber(),
              name: meta.data.name,
              seller: i.seller,
              owner: i.owner,
              image: meta.data.image,
            }
            return item
          })
        )

        setNftLoading(1)
        setBoughtNfts(items)
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log('Error loading NFT nft', error)
    }
  }

  useEffect(() => {
    loadBoughtNFT()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center text-gray-900">
      <div className="flex justify-center">
        <div className="mt-12 px-4">
          <div className="text-center text-2xl font-extrabold">Your Items</div>
          {nftLoading === 0 ? (
            <div className="px-auto mt-20 flex items-center justify-center font-bold">
              Loading Your Items...
            </div>
          ) : boughtNfts.length === 0 ? (
            <div className="mt-4 text-center text-lg font-semibold">
              No Items.
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-8 pt-4 sm:grid-cols-2 lg:grid-cols-4">
              {boughtNfts.map((boughtNft, i) => (
                <button
                  key={i}
                  onClick={() => reSell(boughtNft.tokenId)}
                  className="flex h-[500px] w-[330px] flex-col rounded-lg bg-[#14213d] text-[#e5e5e5] shadow-lg shadow-gray-700 transition duration-500 ease-in-out hover:scale-[1.01] hover:shadow-xl hover:shadow-gray-800"
                >
                  <img
                    src={boughtNft.image}
                    className="h-[300px] w-[330px] rounded-t-lg"
                  />
                  <div className="flex h-1/2 min-w-full flex-col items-start px-8">
                    <div className="my-auto flex text-2xl font-bold">
                      <div>
                        {boughtNft.name}{' '}
                        <span className="text-lg font-light">
                          by @({boughtNft.owner.slice(0, 16)})
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default profile
