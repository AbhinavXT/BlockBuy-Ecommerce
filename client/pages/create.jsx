import { useState, useCallback } from 'react'

import { ethers } from 'ethers'
import { Buffer } from 'buffer';

import { itemContractAddress, itemMarketAddress } from '../config'
import NFT from '../utils/Item.json'
import Market from '../utils/Market.json'

import { useRouter } from 'next/router'

const ipfsClient = require('ipfs-http-client');

const projectId = process.env.NEXT_PUBLIC_INFURA_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_KEY;

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsClient.create({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  apiPath: "/api/v0",
  headers: {
    authorization: auth,
  },
});

const create = () => {
  const [fileUrl, setFileUrl] = useState(null)
  const [name, setName] = useState(``)
  const [description, setDescription] = useState(``)
  const [price, setPrice] = useState(null)
  const [nftLoading, setNftLoading] = useState(null)

  const router = useRouter()

  let progress_func = function (len) {
    console.log('File progress:', len)
  }

  const onChange = useCallback(
    async (e) => {
      const file = e.target.files[0]
      try {
        const added = await client.add(file, {
          progress: progress_func,
          pin: true,
        })

        
        const url = `https://infura-ipfs.io/ipfs/${added.path}`
        console.log(url);
        setFileUrl(url)
      } catch (error) {
        console.log('Error uploading file: ', error)
      }
    },
    [fileUrl]
  )

  const onNameChange = useCallback(
    (e) => {
      setName(e.target.value)
    },
    [name]
  )

  const onDescriptionChange = useCallback(
    (e) => {
      setDescription(e.target.value)
    },
    [description]
  )

  const onPriceChange = useCallback(
    (e) => {
      setPrice(e.target.value)
    },
    [price]
  )

  const submit = async () => {
    setNftLoading(0)
    const data = JSON.stringify({
      name: name,
      description: description,
      image: fileUrl,
    })

    try {
      const added = await client.add(data)
      const url = `https://infura-ipfs.io/ipfs/${added.path}`

      mintNFT(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  const mintNFT = async (url) => {
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

        console.log(url)

        let nftTx = await nftContract.createItem(url)
        console.log('Mining....', nftTx.hash)

        let tx = await nftTx.wait()

        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()

        console.log(
          `Mined, see transaction: https://mumbai.polygonscan.com/tx/${nftTx.hash}`
        )

        const itemPrice = ethers.utils.parseUnits(price, 'ether')

        let listingPrice = await marketContract.getListingPrice()
        console.log(listingPrice)
        listingPrice = listingPrice.toString()

        let marketTx = await marketContract.createMarketItem(
          itemContractAddress,
          tokenId,
          itemPrice,
          { value: listingPrice }
        )

        console.log('Mining....', marketTx.hash)

        tx = await marketTx.wait()

        console.log(
          `Mined, see transaction: https://mumbai.polygonscan.com/tx/${marketTx.hash}`
        )
        setNftLoading(1)

        router.push('/explore')
      } else {
        console.log("Ethereum object doesn't exist!", error.message)
      }
    } catch (error) {
      console.log('Error minting character', error)
    }
  }

  return (
    <div className="flex min-h-screen justify-center text-gray-900">
      <div className="mt-20 flex w-3/4 flex-col pb-12 lg:w-1/2">
        <input
          placeholder="Name"
          className="mt-8 rounded border p-4 font-bold text-black"
          onChange={onNameChange}
        />
        <input
          placeholder="Price"
          className="mt-2 rounded border p-4 font-bold text-black"
          onChange={onPriceChange}
        />
        <textarea
          placeholder="Description"
          className="mt-2 h-28 rounded border p-4 text-black "
          onChange={onDescriptionChange}
        />
        <div>
          <input
            type="file"
            name="Asset"
            className="my-4"
            onChange={onChange}
          />
        </div>

        {fileUrl && <div className='font-bold text-lg'>Done</div>}

        <button
          className="transtion mt-4 rounded bg-gray-800 p-4 text-lg font-bold text-gray-200 duration-500 hover:scale-[1.01] hover:shadow-lg hover:shadow-gray-800"
          onClick={submit}
        >
          Submit
        </button>

        {nftLoading === 0 ? (
          <div className="px-auto mt-20 flex items-center justify-center font-bold">
            Proocessing Your Transaction....
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default create
