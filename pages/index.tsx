import {
  ThirdwebNftMedia,
  useContract,
  useNFTs,
  useAddress,
  Web3Button,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { SPIRIT_HEROES_NFT_CONTRACT_ADDRESS } from "src/constants";

const Home = () => {
  const address = useAddress();

  const { contract } = useContract(SPIRIT_HEROES_NFT_CONTRACT_ADDRESS);

  const { data: nfts, isLoading: isReadingNfts } = useNFTs(contract, {
    start: 0,
    count: 20,
  });

  if (isReadingNfts) {
    return <p>Loading NFT`s...</p>;
  }

  return (
    <div className="grid gap-8 grid grid-cols-4">
      {nfts?.map((nft) => (
        <div
          key={nft.metadata.id}
          className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl"
        >
          <div className="block rounded-xl bg-white p-6 sm:p-8">
            <div className="">
              <ThirdwebNftMedia metadata={nft.metadata} />

              <h5 className="text-xl font-bold text-gray-900 mt-5">
                {nft.metadata.name}
              </h5>

              <p className="my-3 text-sm text-gray-500">
                {nft.metadata.description}
              </p>

              <Web3Button
                colorMode="light"
                isDisabled={nft.owner !== ethers.constants.AddressZero}
                contractAddress={SPIRIT_HEROES_NFT_CONTRACT_ADDRESS}
                action={async (contract) => {
                  if (address) {
                    await contract.erc721.claimTo(address, nft.metadata.id);
                  }
                }}
                onError={(error) => console.log(error)}
                onSuccess={(...args) => console.log(args)}
              >
                Mint
              </Web3Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
