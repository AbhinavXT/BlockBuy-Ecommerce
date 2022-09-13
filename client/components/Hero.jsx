import Link from 'next/link'
import ItemCarousel from '../components/ItemCarousel.jsx'

const Hero = () => {
  return (
    <div className="flex items-center gap-y-32 px-40 text-center lg:flex-row lg:gap-x-20 lg:text-left">
      <div className="flex flex-col gap-y-8 lg:w-1/2">
        <div className="text-[40px] font-extrabold lg:text-5xl">
          Trading made Trustless and Secure
        </div>
        <div className="px-12 text-xl lg:px-0 lg:text-lg">
          BlockBuy is a Marketplace which allows you to trade items in a
          trustless, secure and accessible way.{' '}
          <span className="hidden lg:inline">
            With blockchain-driven technology, you will not need any third-party
            influence for transactions. You can have accurate, faster, and
            transparent transactions with a complete record stored for future
            use.
          </span>
        </div>
        <div className="flex justify-center gap-x-8 lg:justify-start">
          <Link href="/explore">
            <button className="transtion rounded-lg bg-[#fca311] py-4 px-8 text-xl font-bold text-black duration-500 hover:scale-[1.03] lg:text-lg">
              Explore
            </button>
          </Link>
          <Link href="/create">
            <button className="transtion rounded-lg bg-black py-4 px-8 text-xl font-bold text-[#e5e5e5] duration-500 hover:scale-[1.03] lg:text-lg">
              Create
            </button>
          </Link>
        </div>
      </div>
      <div>
        <ItemCarousel />
      </div>
    </div>
  )
}

export default Hero
