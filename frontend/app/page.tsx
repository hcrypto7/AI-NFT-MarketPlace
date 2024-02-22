'use client'
import Image from "next/image";
import Navbar from '@/components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const notify = () => toast("This is a toast notification !");
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />  
      <button className="bg-gradient-to-tr from-pink-400 to-pink-200 px-10 py-3 rounded-full text-white border-solid border-4 hover:border-blue-500/30 transition" onClick={notify}>Notify !</button>
      <button>
        <div className="mx-auto flex min-h-screen max-w-screen-md items-center justify-center">
          <div className="h-26 w-full rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[0.5px]">
            <div className="h-full w-full rounded-full bg-gray-400 px-10 py-5">
              BigLongButton
            </div>
          </div>
        </div>
      </button>
      <ToastContainer /> 
    </main>
  );
}
