import Link from 'next/link'

const Info = () => {
  return (
    <div className="mt-20 grid grid-cols-1 gap-12 bg-gray-900 p-28 text-[#e5e5e5] md:grid-cols-2 lg:grid-cols-4">
      <div className="flex flex-col items-center gap-y-4 px-28 md:px-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          className="bi bi-wallet"
          viewBox="0 0 16 16"
        >
          <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
        </svg>
        <div className="text-3xl font-bold">Set up your wallet</div>
        <div className="text-md text-center text-gray-300 lg:text-sm">
          Once you’ve set up your wallet of choice, connect it to BlockBuy by
          clicking the connect button in the top right corner.
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-4 px-28 md:px-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          className="bi bi-grid-3x3-gap"
          viewBox="0 0 16 16"
        >
          <path d="M4 2v2H2V2h2zm1 12v-2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm5 10v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM9 2v2H7V2h2zm5 0v2h-2V2h2zM4 7v2H2V7h2zm5 0v2H7V7h2zm5 0h-2v2h2V7zM4 12v2H2v-2h2zm5 0v2H7v-2h2zm5 0v2h-2v-2h2zM12 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2z" />
        </svg>
        <div className="text-3xl font-bold">Explore Items</div>
        <div className="text-md text-center text-gray-300 lg:text-sm">
          Visit the{' '}
          <span className="text-[#fca311]">
            <Link href="/explore">Explore Page</Link>
          </span>{' '}
          to explore and buy products uploaded on the marketplace by other users
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-4 px-28 md:px-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          className="bi bi-image"
          viewBox="0 0 16 16"
        >
          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
        </svg>
        <div className="text-3xl font-bold">Add your item</div>
        <div className="text-md text-center text-gray-300 lg:text-sm">
          Upload your item, add a title, description and price to it on the{' '}
          <span className="text-[#fca311]">
            <Link href="/create">Create Page</Link>
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-4 px-28 md:px-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          className="bi bi-tags-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
          <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
        </svg>
        <div className="text-3xl font-bold">List them for sale</div>
        <div className="text-md text-center text-gray-300 lg:text-sm">
          You choose how you want to sell your item, and we help you sell them!
        </div>
      </div>
    </div>
  )
}

export default Info
