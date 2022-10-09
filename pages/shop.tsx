import {
  ThirdwebNftMedia,
  useActiveListings,
  useBuyNow,
  useContract,
} from "@thirdweb-dev/react";
import { SPIRIT_MARKET_ADDRESS } from "src/constants";
import { ListingType } from "@thirdweb-dev/sdk";

const Shop = () => {
  const { contract } = useContract(SPIRIT_MARKET_ADDRESS);

  const {
    data: listings,
    isLoading,
    error,
  } = useActiveListings(contract as any, {
    // seller: "0x...",
    // tokenContract: "0x...",
    // tokenId: 1,
    start: 0,
    count: 50,
  });

  console.log(listings);

  const { mutate: buyNow, isLoading: isBuying } = useBuyNow(contract as any);

  if (isLoading) {
    return <div>Loading market active listings...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <div className="grid gap-8 grid grid-cols-3">
      {listings?.map((listing) => (
        <div
          key={listing.id}
          className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl"
        >
          <div className="block rounded-xl bg-white p-6 sm:p-8">
            <div className="">
              <ThirdwebNftMedia metadata={listing.asset} />

              <h5 className="text-xl font-bold text-gray-900 mt-5">
                {listing.asset.name} ({listing.quantity.toString()})
              </h5>

              <p className="my-3 text-sm text-gray-500">
                {listing.asset.description}
              </p>

              <button
                disabled={isBuying}
                onClick={() =>
                  buyNow({
                    id: listing.id,
                    type: ListingType.Direct,
                    buyAmount: 1,
                  })
                }
                className="flex items-center justify-center rounded-xl border-4 border-black bg-pink-100 px-8 py-4 font-bold shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring active:bg-pink-50"
              >
                {isBuying
                  ? "Loading..."
                  : `Buy for ${listing.buyoutCurrencyValuePerToken.displayValue} ${listing.buyoutCurrencyValuePerToken.symbol}`}
              </button>

              {/*<Web3Button*/}
              {/*  colorMode="light"*/}
              {/*  isDisabled={listing.quantity <= 0}*/}
              {/*  contractAddress={NFT_CONTRACT_ADDRESS}*/}
              {/*  action={async (contract) => {*/}
              {/*    if (account[0].data?.address) {*/}
              {/*      await contract..claimTo(*/}
              {/*        account[0].data.address,*/}
              {/*        listing.asset.id*/}
              {/*      );*/}
              {/*    }*/}
              {/*  }}*/}
              {/*  onError={(error) => console.log(error)}*/}
              {/*  onSuccess={(...args) => console.log(args)}*/}
              {/*>*/}
              {/*  Mint*/}
              {/*</Web3Button>*/}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shop;
