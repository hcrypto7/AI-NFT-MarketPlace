'use client'

import {useEffect, useState} from 'react';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import nftmAbi from "@/contracts/Marketplace.json";
import { uploadFileToIPFS, uploadJSONToIPFS } from './pinata';

const Minting = () => {
  const addressNFTM = nftmAbi.address;
  const [uploadFileName, setUploadFileName] = useState<string>("");


  const _mint = () => {
    console.log("upload:", uploadFileName);
    uploadFileToIPFS(uploadFileName);
  }

  return(
    <>
      <div className="w-full min-h-screen h-full">
        <Navbar/>
        <div className="relative flex h-1/2">
          <Sidebar/>
          <main className="w-full h-full flex flex-col items-center justify-between p-8">
            <div className="">
                <div className='flex justify-center'>
                  <h1>Mint your NFT!</h1>
                </div>        
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input type="file" onChange={(event) => setUploadFileName(event.target.files[0])} className="block w-full text-sm text-white
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                  "/>
                </label>
                <div>
                  <button onClick={()=>_mint()} className='text-white bg-violet-500 rounded-full px-9 py-2'>Mint</button>
                </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Minting;