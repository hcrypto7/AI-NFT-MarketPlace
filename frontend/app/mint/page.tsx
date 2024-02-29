'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import nftmAbi from '@/contracts/Marketplace.json';
import { uploadFileToIPFS, uploadJSONToIPFS } from './pinata';
import Content from '@/components/Content';
import ImageCard from '@/components/ImageCard';
import { Accordion, AccordionItem } from "@nextui-org/react";
import { FaEye, FaImage, FaImages } from "react-icons/fa";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { showToast } from '@/helper/ToastNotify';
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import erc20ABI from '@/contracts/ERC20ABI.json';


const Minting = () => {
  const erc20TokenAddress = "0x0406dbBF7B62f79F8d889F30cC1F0E9191c404D4";
  const contractAddress = nftmAbi.address; 
  const contractAbi = nftmAbi.abi; 
  const [uploadFileName, setUploadFileName] = useState<string>("");
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [nftName, setNftName] = useState<string>("");
  const [fileURL, setFileURL] = useState<string>("");
  const [isProcess, setIsProcess] = useState<boolean>(false);
  const {
    data: hash,
    isPending, 
    error,
    writeContractAsync
  } = useWriteContract();
  
  
  // upload metadata of image to the pinata IPFS
  const _uploadMetaData = (nftColName:string, nftFileURL:string) => {
    return new Promise((resolve, reject)=>{
      console.log("MetaData:", nftColName, nftFileURL);
      if( !nftColName || !nftFileURL)
      {
        showToast("error", "Plz input name exactly!");
        reject("error occured")
      }
      
      const nftJSON = {
        nftName, image: nftFileURL
      }
      console.log('nftJson:', nftJSON);
      //upload the metadata JSON to IPFS
      uploadJSONToIPFS(nftJSON)
      .then(res=>{
        if(res.success === true){
          console.log("Uploaded JSON to Pinata: ", res)
          resolve(res);
          // return res.pinataURL;
        }
      })
      .catch(err=>{
        reject(err);
      })
    });
  }
  
  const _mint = async () => {
    console.log('upload:', uploadFileName);
    setIsProcess(true);
    const tx = await writeContractAsync({
      abi: erc20ABI,
      address: erc20TokenAddress,
      functionName: 'approve',
      args: [contractAddress, parseEther('1')],
    });
    console.log("tx1:", tx);
    const result = await uploadFileToIPFS(uploadFileName);
    if (result?.success === true) {
      console.log("uploaded image url:",result?.pinataURL);
      setFileURL(result?.pinataURL);
    } else {
      showToast("error", "uploading Error");
    }
    _uploadMetaData(nftName, result?.pinataURL).then(async(res)=>{
      if (res.success === true) {
        showToast("success", "Successfully uploaded");
        console.log("uploaded Metadata url:", res?.pinataURL);
        const tx2 = await writeContractAsync({ 
          address: contractAddress, 
          abi: contractAbi,
          functionName: 'createToken', 
          args: [[res?.pinataURL], parseEther('1')], 
        });
        console.log("tx2:", tx2);
      }
    }); // or we can use useEffect() hook for state update. the state variable will be update after re-rendering.
    setIsProcess(false);
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
  useWaitForTransactionReceipt({ 
    hash, 
  }) 



  return (
    <div className="grid grid-cols-12 w-full h-screen bg-[#090808]">
      <Navbar />
      <Sidebar />
      <Content>
        <>
          <div className="flex flex-col gap-8 px-8 py-4">
            <div className="flex justify-center">
              <h1 className="text-center text-3xl">Mint your NFT!</h1>
            </div>
            <Accordion suppressHydrationWarning variant="splitted">
              <AccordionItem
                key="anchor"
                aria-label="Anchor"
                indicator={<FaImage />}
                title="Show samples"
                suppressHydrationWarning
              >
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4">
                  <ImageCard />
                  <ImageCard />
                  <ImageCard />
                  <ImageCard />
                </div>
              </AccordionItem>
            </Accordion>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                onChange={event => setUploadFileName(event.target.files[0])}
                className="block w-full text-sm text-white
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                  "
              />
            </label>
            <div>
              <Button onPress={onOpen} className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Mint NFT</Button>
            </div>
          </div>
          <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    NFT Minting
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      Plz input name
                    </p>
                    <div>
                      <Input
                        autoFocus
                        endContent={
                          <FaImages className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Name"
                        placeholder="Enter your NFT name"
                        variant="bordered"
                        onChange={(event)=>setNftName(event.target.value)}
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onClick={_mint} isLoading={isProcess || isPending || isConfirming}>
                      {isPending || isConfirming  ? 'Confirming...' : 'Mint'} 
                    </Button>
                    {isConfirming && showToast("info", "waiting for Transaction comfirming...")} 
                    {/* {isConfirmed && showToast("success", "Transaction confirmed. NFT Minted!")} */}
                    {/* {isConfirmed && onClose()} */}
                    {error && showToast("error", error.message)} 
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </Content>
    </div>
  );
};

export default Minting;
