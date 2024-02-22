import Navbar from "@/components/Navbar";
import nftmAbi from "@/contracts/Marketplace.json";

const Minting = () => {
  const addressNFTM = nftmAbi.address;

  return(
    <>
      <Navbar/>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="min-h-[36rem] min-w-[32rem] bg-transparent shadow-xl rounded-xl mt-14 p-10">
          <div>
            <h1>Mint your NFT!</h1>
          </div>
          <div>
            <input type="text"/>
          </div>
          <div>
            <textarea />
          </div>
          <div>
            <input type="text"/>
          </div>
          <div>
            <input type="text"/>
          </div>
          <div>
            <button>Mint</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Minting;