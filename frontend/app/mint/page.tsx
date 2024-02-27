'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import nftmAbi from '@/contracts/Marketplace.json';
import { uploadFileToIPFS, uploadJSONToIPFS } from './pinata';
import Content from '@/components/Content';
import ImageCard from '@/components/ImageCard';
import { Accordion, AccordionItem } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import Swal from 'sweetalert2'
import { showToast } from '@/helper/ToastNotify';
import { type BaseError, useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem'


const Minting = () => {

  const contractAddress = nftmAbi.address; 
  const contractAbi = nftmAbi.abi; 
  const [uploadFileName, setUploadFileName] = useState<string>("");
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [nftName, setNftName] = useState<string>("");
  const [fileURL, setFileURL] = useState<string>("");
  const { address } = useAccount();
  const { data: hash,isPending, error, writeContract } = useWriteContract();

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
    console.log(nftName);
    const result = await uploadFileToIPFS(uploadFileName);
    if (result?.success === true) {
      console.log(result?.pinataURL);
      setFileURL(result?.pinataURL);
    } else {
      showToast("error", "uploading Error");
    }
    _uploadMetaData(nftName, result?.pinataURL).then(res=>{
      console.log(res);
      if (res.success === true) {
        showToast("success", "Successfully uploaded");
        console.log("account address", address);
        console.log(res?.pinataURL, parseEther('0.0001'), contractAddress, contractAbi);
        writeContract({
          contractAbi,
          address: contractAddress,
          functionName: 'createToken',
          args:[res?.pinataURL, parseEther('0.001')]});
      }
    }); // or we can use useEffect() hook for state update. the state variable will be update after re-rendering.
    
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
          <div className="px-8 py-4">
            <div className="flex justify-center">
              <h1 className="text-center text-3xl">Mint your NFT!</h1>
            </div>
            <Accordion suppressHydrationWarning>
              <AccordionItem
                key="anchor"
                aria-label="Anchor"
                indicator={<FaEye />}
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
              <button
                onClick={() => _mint}
                className="text-white bg-violet-500 rounded-full px-9 py-2"
                disabled={isPending} 
              >
                {isPending ? 'Confirming...' : 'Mint'} 
              </button>
              <Button onPress={onOpen}>Mint NFT</Button>
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
                          <FaEye className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
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
                    <Button color="primary" onClick={_mint}>
                      Mint
                    </Button>
                      {hash && <div>Transaction Hash: {hash}</div>}
                      {isConfirming && <div>Waiting for confirmation...</div>} 
                      {isConfirmed && <div>Transaction confirmed.</div>} 
                      {error && ( 
                        <div>Error: {(error as BaseError).shortMessage || error.message}</div> 
                      )} 
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
