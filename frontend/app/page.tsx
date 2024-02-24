'use client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic'
import { NewspaperIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { FaTelegram, FaDiscord, FaMailBulk, FaFacebook, FaTwitter } from "react-icons/fa";
import { useRouter } from 'next/navigation';


 
const Exchange = dynamic(() => import('@/components/Exchange'), { ssr: false })
 
export default function Home() {

  const notify = () => toast("This is a toast notification !");

  const router = useRouter();
  
  return (
    <main className="min-h-screen">
      <div className="realtive px-20 py-8">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-between">
            <img src='./logo.png' className='w-28'/>
          </div>
          <w3m-button /> 
        </div>
        <section className='relative flex justify-center items-center mb-20'>
          <img src="./home-bg.png" className="w-[42%]"/>
          <div className="w-[90%] m-auto flex flex-col items-center gap-10 absolute transalte-y-1/2">
            <h1 className="font-medium text-center sm:text-start text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-loose text-white">
              HONESTY | TRANSPARENCY | SIMPLICITY | TRUST
            </h1>
            <h3 className="text-white text-4xl font-light">WE GROW TOGETHER</h3>
            <div className="w-32 h-1 my-2 mx-auto rounded-full  bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-400"></div>
            <div className="flex">
              <button className="btn glass-effect blue-effect btn-glow flex items-center" onClick={() => router.push('/mint')}><PaperAirplaneIcon className="h-8 w-8"/>Lunch APP</button>
              <button className="btn glass-effect blue-effect btn-glow flex items-center"><NewspaperIcon className="h-8 w-8"/>WhitePaper</button>
            </div>
          </div>
        </section>
        <section className="w-[80%] m-auto mb-20">
          <div className="grid grid-cols-2 gap-4">
            <div className="white-effect glass-effect rounded-xl flex justify-center items-center">
              <h1 className="text-4xl text-justify p-5">Buy, Sell, and Swap Crypto: Simple, Fast, Free of Custody</h1>
            </div>
            <Exchange/>
          </div>
        </section>
        <section className="w-full">
          <div className='grid grid-cols-4'>
            <div className="">
              <h1 className="text-left font-bold text-2xl">ABOUT</h1>
              <div className="inline-block items-start w-20 h-1 my-2 mx-auto rounded-full  bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-400">
                <>Documentation</>
                <>CoinMarketCap</>
                <>CoinGecko</>
                <>Pancakeswap</>
                <>WhitePaper</>
              </div>
            </div>
            <div className="">
              <h1 className="text-left font-bold text-2xl">ECOSYSTEM</h1>
              <div className="inline-block items-start w-20 h-1 my-2 mx-auto rounded-full  bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-400">
                <>NFT</>
                <>Staking</>
                <>Game</>
                <>Mining BNB</>
                <>Tokenomics</>
              </div>
            </div>
            <div className="">
              <h1 className="text-left font-bold text-2xl">SUBSCRIBE</h1>
              <div className="inline-block items-start w-20 h-1 my-2 mx-auto rounded-full  bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-400">
                <>Sign up for Alerts, Special features and Updates. Give your feedback.</>
              </div>
            </div>
            <div className="">
              <h1 className="text-left font-bold text-2xl">COMMUNITY</h1>
              <div className="inline-block items-start w-20 h-1 my-2 mx-auto rounded-full  bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-400"></div>
              <div className='flex items-center gap-4'>
                <div className="white-effect glass-effect rounded-lg"><FaTelegram className='h-10 w-10 p-2'/></div>Telegram
              </div>
              <div className='flex items-center gap-4'>
                <div className="white-effect glass-effect rounded-lg"><FaFacebook className='h-10 w-10 p-2'/></div>Fackbook
              </div>
              <div className='flex items-center gap-4'>
                <div className="white-effect glass-effect rounded-lg"><FaTwitter className='h-10 w-10 p-2'/></div>Twitter
              </div>
              <div className='flex items-center gap-4'>
                <div className="white-effect glass-effect rounded-lg"><FaMailBulk className='h-10 w-10 p-2'/></div>Mail
              </div>
              <div className='flex items-center gap-4'>
                <div className="white-effect glass-effect rounded-lg"><FaDiscord className='h-10 w-10 p-2'/></div>Discord
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer/>
    </main>
  );
}
