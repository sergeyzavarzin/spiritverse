import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import {
  SPIRIT_HEROES_NFT_CONTRACT_ADDRESS,
  SPIRIT_THINGS_NFT_CONTRACT_ADDRESS,
} from "src/constants";

const Account = () => {
  const address = useAddress();

  const { contract: heroesContract } = useContract(
    SPIRIT_HEROES_NFT_CONTRACT_ADDRESS
  );

  const { data: ownedHeroes, isLoading: isHeroesLoading } = useOwnedNFTs(
    heroesContract,
    address
  );

  const { contract: thingsContract } = useContract(
    SPIRIT_THINGS_NFT_CONTRACT_ADDRESS
  );

  const { data: ownedThings, isLoading: isThingsLoading } = useOwnedNFTs(
    thingsContract,
    address
  );

  return (
    <div>
      <h2>My Heroes</h2>
      {isHeroesLoading ? (
        <span>Loading...</span>
      ) : (
        <div className="grid gap-8 grid grid-cols-4">
          {ownedHeroes?.map((hero) => (
            <div
              key={hero.metadata.id}
              className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl"
            >
              <div className="block rounded-xl bg-white p-6 sm:p-8">
                <div className="">
                  <ThirdwebNftMedia metadata={hero.metadata} />

                  <h5 className="text-xl font-bold text-gray-900 mt-5">
                    {hero.metadata.name}
                  </h5>

                  <p className="my-3 text-sm text-gray-500">
                    {hero.metadata.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2>My Things</h2>
      {isThingsLoading ? (
        <span>Loading...</span>
      ) : (
        <div className="grid gap-8 grid grid-cols-4">
          {ownedThings?.map((thing) => (
            <div
              key={thing.metadata.id}
              className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl"
            >
              <div className="block rounded-xl bg-white p-6 sm:p-8">
                <div className="">
                  <ThirdwebNftMedia metadata={thing.metadata} />

                  <h5 className="text-xl font-bold text-gray-900 mt-5">
                    {thing.metadata.name} ({thing.quantityOwned})
                  </h5>

                  <p className="my-3 text-sm text-gray-500">
                    {thing.metadata.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Account;
