'use client'
import dynamic from 'next/dynamic'
import { NewspaperIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { FaTelegram, FaDiscord, FaMailBulk, FaFacebook, FaTwitter } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react'
import loadable from "@loadable/component";

const Exchange = loadable(() => import("@/components/Exchange"));



// const Exchange = dynamic(() => import('@/components/Exchange'), { ssr: false })

export default function Home() {


  const router = useRouter();

  return (
    <main className="min-h-screen">
      <div className="realtive px-20 py-8">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-between">
            <img src="./logo.png" className="w-[744px]" />
          </div>
          <div className='flex flex-row gap-4 items-center'>
            <button className=' w-44 h-14 btn glass-effect blue-effect btn-glow flex items-center text-xs justify-items-center'>Buy NYNYC</button>
            <w3m-button />
          </div>
        </div>
        <section className="relative flex justify-center items-center mb-32">
          <img src="./home-bg.png" className="w-[42%]" />
          <div className="w-[90%] m-auto flex flex-col items-center gap-10 absolute transalte-y-1/2">
            <h1 className="font-medium text-center sm:text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-loose text-white">
              HONESTY | TRANSPARENCY | SIMPLICITY | TRUST
            </h1>
            <h3 className="text-white text-4xl font-light">WE GROW TOGETHER</h3>
            <div className="w-32 h-1 my-2 mx-auto rounded-full  bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-400"></div>
            <div className="flex">
              <Link
                href="/mint"
                className="btn glass-effect blue-effect btn-glow flex items-center"
              >
                <PaperAirplaneIcon className="h-8 w-8" />
                Lunch APP
              </Link>
              <Link
                href="./NYNYC_whitepaper.pdf"
                target="_blink"
                className="btn glass-effect blue-effect btn-glow flex items-center"
              >
                <NewspaperIcon className="h-8 w-8" />
                WhitePaper
              </Link>
            </div>
          </div>
        </section>
        <section className="w-[80%] m-auto mb-32">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="blue-effect glass-effect rounded-xl flex flex-col justify-center items-center">
              <h1 className="text-2xl text-center p-5">
                Buy, Sell, and Swap Crypto
              </h1>
              <h1 className='text-3xl text-center p-5 text-gray-300'>
                Simple, Fast, Free of Custody
              </h1>
            </div>
            {/* <Suspense fallback={<p>Loading feed...</p>}> */}
            <Exchange fallback={<div>Loading...</div>} />
            {/* </Suspense> */}
          </div>
        </section>
        <section className="w-[80%] m-auto px-20">
          <div className="grid grid-cols-4">
            <div className="flex flex-col">
              <h1 className="text-left font-bold text-md">ABOUT</h1>
              <div className="items-start w-20 h-0.5 my-3 rounded-full  bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-400"></div>
              <div className='flex flex-col text-gray-400'>
                <Link className="text-left text-md my-1" href="./NYNYC_whitepaper.pdf">WhitePaper</Link>
                <Link className="text-left text-md my-1" href="/comingSoon">Documentation</Link>
                <Link className="text-left text-md my-1" href="/comingSoon">CoinMarketCap</Link>
                <Link className="text-left text-md my-1" href="/comingSoon">CoinGecko</Link>
                <Link className="text-left text-md my-1" href="/comingSoon">Disclaimer</Link>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-left font-bold text-md">ECOSYSTEM</h1>
              <div className="items-start w-20 h-0.5 my-3 rounded-full  bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-400"></div>
              <div className='flex flex-col text-gray-400'>
                <Link className='text-left text-md my-1' href='/mint'>NFT mint</Link>
                <Link className='text-left text-md my-1' href="/comingSoon">Staking</Link>
                <Link className='text-left text-md my-1' href="/comingSoon">Game</Link>
                <Link className='text-left text-md my-1' href="/comingSoon">Mining BNB</Link>
                <Link className='text-left text-md my-1' href="/comingSoon">New NFT collection</Link>
                <Link className='text-left text-md my-1' href="/tokenomics">Tokenomics</Link>
              </div>
            </div>
            <div className="">
              <h1 className="text-left font-bold text-md">SUPPORT</h1>
              <div className="items-start w-20 h-0.5 my-3 rounded-full  bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-400"></div>
              <div className='flex flex-col text-gray-400'>
                <Link className='text-left text-md my-1' href="/stared">Getting Started</Link>
                <Link className='text-left text-md my-1' href="/faq">FAQ</Link>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-left font-bold text-md">COMMUNITY</h1>
              <div className="items-start w-20 h-0.5 my-3 rounded-full  bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-400"></div>
              <Link className="flex items-center gap-4 text-gray-400" href="https://web.telegram.org/a/#-1002038937912">
                <div className="blue-effect glass-effect rounded-lg">
                  <FaTelegram className="h-10 w-10 p-2" />
                </div>
                Telegram
              </Link>
              <Link className="flex items-center gap-4 text-gray-400" href="https://www.facebook.com/NYNYCoins">
                <div className="blue-effect glass-effect rounded-lg">
                  <FaFacebook className="h-10 w-10 p-2" />
                </div>
                Fackbook
              </Link>
              <Link className="flex items-center gap-4 text-gray-400" href="https://twitter.com/nynycoins">
                <div className="blue-effect glass-effect rounded-lg">
                  <FaTwitter className="h-10 w-10 p-2" />
                </div>
                Twitter
              </Link>
              {/* <Link className="flex items-center gap-4 text-gray-400">
                <div className="blue-effect glass-effect rounded-lg">
                  <FaMailBulk className="h-10 w-10 p-2" />
                </div>
                Mail
              </Link> */}
              <Link className="flex items-center gap-4 text-gray-400" href="https://discord.com/channels/1193296401245950033/1193296401245950036">
                <div className="blue-effect glass-effect rounded-lg">
                  <FaDiscord className="h-10 w-10 p-2" />
                </div>
                Discord
              </Link>
            </div>
          </div>
          <div className='flex mx-auto my-20 text-2xl text-gray-400'>
            <h1>@NYNYC - 2024. All Rights Reserved.</h1>
          </div>
        </section>
      </div>
    </main>
  );
}
