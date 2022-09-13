import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { networks } from '../utils/networks'

const Navbar = () => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [network, setNetwork] = useState('')
  const [dropdown, setDropdown] = useState(false)

  const router = useRouter()

  const pages = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Explore',
      path: '/explore',
    },
    {
      name: 'Create',
      path: '/create',
    },
    {
      name: 'Profile',
      path: '/profile',
    },
  ]

  // Checks if wallet is connected to the correct network
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window

    if (!ethereum) {
      console.log('Make sure you have metamask!')
      return
    } else {
      console.log('We have the ethereum object', ethereum)
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length !== 0) {
      const account = accounts[0]
      console.log('Found an authorized account:', account)
      setCurrentAccount(account)
    } else {
      console.log('No authorized account found')
    }

    // This is the new part, we check the user's network chain ID
    const chainId = await ethereum.request({ method: 'eth_chainId' })
    setNetwork(networks[chainId])

    ethereum.on('chainChanged', handleChainChanged)

    // Reload the page when they change networks
    function handleChainChanged(_chainId) {
      window.location.reload()
    }
  }

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log('Metamask not detected')
        return
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      console.log('Found account', accounts[0])
      setCurrentAccount(accounts[0])
      switchNetwork()
    } catch (error) {
      console.log('Error connecting to metamask', error)
    }
  }

  const switchNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }], // Check networks.js for hexadecimal network ids
        })
      } catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x13881',
                  chainName: 'Mumbai',
                  rpcUrls: [
                    process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_URL,
                  ],
                  nativeCurrency: {
                    name: 'Matic',
                    symbol: 'MATIC',
                    decimals: 18,
                  },
                  blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
                },
              ],
            })
          } catch (error) {
            console.log(error)
          }
        }
        console.log(error)
      }
    } else {
      // If window.ethereum is not found then MetaMask is not installed
      alert(
        'MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html'
      )
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()

    if (currentAccount !== '' && network === 'Rinkeby') {
      console.log('init')
    }
  }, [currentAccount, network])

  return (
    <div className="h-full text-gray-900">
      <div className="dropdown relative flex items-center justify-between gap-x-8 py-4 px-20 shadow-xl">
        <Link href="/">
          <div className="flex cursor-pointer gap-x-4 text-3xl font-extrabold">
            <div className="trasition transition duration-500 ease-in-out hover:rotate-180 hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
              </svg>
            </div>
            <div>BlockBuy</div>
          </div>
        </Link>

        <div className="flex items-center justify-center gap-x-20">
          <div className="hidden gap-x-3 text-lg lg:flex">
            {pages.map((page, i) => (
              <Link key={i} href={page.path}>
                <div
                  className={`flex h-12 w-24 cursor-pointer items-center justify-center rounded-xl transition duration-500 ease-in-out hover:bg-gray-800 hover:text-gray-200 hover:shadow-xl ${
                    router.asPath === page.path
                      ? 'bg-gray-800 text-gray-200 shadow-xl'
                      : ''
                  }`}
                >
                  {page.name}
                </div>
              </Link>
            ))}
          </div>

          {currentAccount === '' ? (
            <button
              className="flex h-12 w-24 items-center justify-center rounded-lg bg-[#14213d] font-bold text-[#e5e5e5]"
              onClick={connectWallet}
            >
              Connect
            </button>
          ) : (
            <div>
              <button className="transtion flex h-12 w-12 items-center justify-center rounded-full bg-[#14213d] text-[#e5e5e5] duration-500 hover:scale-[1.03]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
