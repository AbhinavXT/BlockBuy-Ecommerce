import Head from 'next/head'
import Hero from '../components/Hero.jsx'
import Info from '../components/Info.jsx'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-gray-900">
      <Head>
        <title>BlockBuy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Info />
    </div>
  )
}
