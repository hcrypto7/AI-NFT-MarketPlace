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
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { showToast } from '@/helper/ToastNotify';
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { ParseEther, parseEther } from 'viem';
import Building from '@/components/Building';
import Age from '@/components/AgeSelectbox';
import Weather from '@/components/WeatherSelectbox';
import Environment from '@/components/EnvironmentSelectbox';
import Season from '@/components/SeasonSelectbox';
import { ages, weathers, seasons, environments } from '@/lib/data/PromptData';

export type DataType = { building_name: string; }

const Minting = () => {

  const [inputVal, setInputVal] = useState('')
  const contractAddress = nftmAbi.address;
  const contractAbi = nftmAbi.abi;
  const [genImg, setGenImg] = useState("")
  const [uploadFileName, setUploadFileName] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nftName, setNftName] = useState("");
  const [fileURL, setFileURL] = useState("");
  const {
    data: hash,
    isPending,
    error,
    writeContract
  } = useWriteContract();

  const _uploadMetaData = (nftColName: string, nftFileURL: string) => {
    return new Promise((resolve, reject) => {
      if (!nftColName || !nftFileURL) {
        showToast("error", "Please input name exactly!");
        reject("error occurred");
      }
      const nftJSON = {
        nftName,
        image: nftFileURL
      };
      uploadJSONToIPFS(nftJSON)
        .then(res => {
          if (res.success === true) {
            resolve(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const _mint = async () => {
    const result = await uploadFileToIPFS(uploadFileName);
    if (result?.success === true) {
      setFileURL(result?.pinataURL);
    } else {
      showToast("error", "Uploading Error");
    }
    _uploadMetaData(nftName, result?.pinataURL).then(res => {
      if (res.success === true) {
        showToast("success", "Successfully uploaded");
        writeContract({
          address: contractAddress,
          abi: contractAbi,
          functionName: 'createToken',
          args: [res?.pinataURL, parseEther('0.001')],
        });
      }
    });
  };

  const [age, setAge] = useState(ages[0]);
  const [season, setSeason] = useState(seasons[0])
  const [weather, setWeather] = useState(weathers[0])
  const [environment, setEnvironment] = useState(environments[0])
  const [selected, setSelected] = useState<DataType>({ building_name: "Willow Heights Apartments" })


  let prompt = inputVal + " and " + selected.building_name + " of New York City " + age.name + ", in " + season.name + " " + environment.name;
  console.log(prompt);

  const GenerateImage = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "key": "UNi8wvSz4p6CkM1boPSxccM0GErrbVK3aj84nqZkM3p3cMHkumQ3UNtjFP5P",
      prompt: prompt,
      "negative_prompt": "bad quality",
      "width": "512",
      "height": "512",
      "safety_checker": false,
      "seed": null,
      "samples": 1,
      "base64": false,
      "webhook": null,
      "track_id": null
      // negative_prompt: " bad quality",
      // model_id: "lob-juggernaut-xl-5",
      // panorama: "no",
      // self_attention: "no",
      // width: "1024",
      // guidance: 7.5,
      // height: "1024",
      // samples: "3",
      // upscale: null,
      // safety_checker: true,
      // clip_skip: "2",
      // free_u: null,
      // instant_response: null,
      // steps: 20,
      // use_karras_sigmas: "yes",
      // algorithm_type: null,
      // safety_checker_type: true,
      // tomesd: "yes",
      // seed: null,
      // webhook: null,
      // track_id: null,
      // scheduler: "DDIMScheduler",
      // base64: null,
      // temp: null,
      // ip_adapter_id: null,
      // ip_adapter_scale: null,
      // ip_adapter_image: null,
      // vae: null,
      // lora: "test-water",
      // lora_strength: null,
      // embeddings: "unrealisticdream-v10",
      // embeddings_id: 5595
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://modelslab.com/api/v6/realtime/text2img", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        const resultImage = JSON.parse(result);
        console.log(resultImage.output);
        const imageData = resultImage.output;
        setGenImg(imageData)

      })
      .catch(error => console.log('error', error));
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

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
                className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </label>
            <div>
              <div className="bg-white-900 grid grid-cols-2F md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4">
                <input
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  type="text"
                  className=" block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-black-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4">
                <Building params={{ selected, setSelected }} />
                <Age age={age} setAge={setAge} />
                <Environment environment={environment} setEnvironment={setEnvironment} />
                <Weather weather={weather} setWeather={setWeather} />
                <Season season={season} setSeason={setSeason} />
              </div>
              <div>
                <button className="text-white bg-violet-500 rounded-full px-9 py-2" onClick={GenerateImage}>Generate Image</button>
                {genImg &&
                  <img width={250} height={250} src={genImg} alt='Generated image' />
                }
              </div>

              <button onClick={_mint} className="text-white bg-violet-500 rounded-full px-9 py-2">
                Mint
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
                      Please input name
                    </p>
                    <div>
                      <Input
                        autoFocus
                        endContent={<FaEye className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                        label="Name"
                        placeholder="Enter your NFT name"
                        variant="bordered"
                        onChange={(event) => setNftName(event.target.value)}
                      />
                    </div>
                    {hash && <div>Transaction Hash: {hash}</div>}
                    {isConfirming && <div>Waiting for confirmation...</div>}
                    {isConfirmed && <div>Transaction confirmed.</div>}
                    {isPending ? 'Confirming...' : 'Mint'}
                    {error && (
                      <div>Error: {(error as BaseError).shortMessage || error.message}</div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={_mint}>
                      Mint
                    </Button>
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