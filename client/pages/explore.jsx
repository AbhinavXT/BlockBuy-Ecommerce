import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Head from 'next/head'
import axios from 'axios'

import { itemContractAddress, itemMarketAddress } from '../config.js'

import NFT from '../utils/Item.json'
import Market from '../utils/Market.json'

import { useRouter } from 'next/router'

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [nftLoading, setNftLoading] = useState(null)

  const router = useRouter()

  // Routes to the buynft page
  const buyToken = (tokenId, itemId) => {
    router.push({
      pathname: '/buynft',
      query: { tokenid: tokenId, itemid: itemId },
    })
  }

  // Fetches the marketplace items put for sale
  const loadNFT = async () => {
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

        const itemsData = await marketContract.fetchNftItems()

        const items = await Promise.all(
          itemsData.map(async (i) => {
            const tokenUri = await nftContract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)

            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')

            let item = {
              price,
              itemId: i.itemId.toNumber(),
              tokenId: i.tokenId.toNumber(),
              seller: i.seller,
              owner: i.owner,
              image: meta.data.image,
              name: meta.data.name,
              description: meta.data.description,
            }
            return item
          })
        )
        setNftLoading(1)
        setNfts(items)
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log('Error loading eternal product', error)
    }
  }

  useEffect(() => {
    loadNFT()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center text-gray-900">
      <Head>
        <title>Explore Items</title>
        <meta name="description" content="Explore NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mt-12 text-4xl font-bold">Explore Items</div>

      {nftLoading === 0 ? (
        <div className="px-auto mt-20 flex items-center justify-center font-bold">
          Loading Marketplace Items...
        </div>
      ) : (
        <div>
          {nfts.length ? (
            <div className="flex flex-col items-center justify-center">
              <div className="flex justify-center">
                <div className="px-4">
                  <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {nfts.map((nft, i) => (
                      <button
                        key={i}
                        onClick={() => buyToken(nft.tokenId, nft.itemId)}
                        className="flex h-[500px] w-[330px] flex-col rounded-lg bg-[#14213d] text-[#e5e5e5] shadow-lg shadow-gray-700 transition duration-500 ease-in-out hover:scale-[1.01] hover:shadow-xl hover:shadow-gray-800"
                      >
                        <img
                          src={nft.image}
                          className="h-[300px] w-[330px] rounded-t-lg"
                        />

                        <div className="flex h-[200px] min-w-full flex-col items-start px-8">
                          <div className="my-auto flex text-2xl font-bold">
                            <div>
                              {nft.name}{' '}
                              <span className="text-lg font-light">
                                by @({nft.seller.slice(0, 16)})
                              </span>
                            </div>
                          </div>
                          <div className="my-auto flex flex-col items-start text-xl">
                            <div className="text-gray-400">Reserved Price</div>
                            <div>{nft.price} ETH</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-centre mt-16 text-xl font-bold">
              No Items in Marketplace
            </div>
          )}
        </div>
      )}
    </div>
  )
}
