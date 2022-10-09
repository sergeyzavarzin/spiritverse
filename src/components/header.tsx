import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex justify-between p-2">
      <div className="flex gap-12">
        <div>
          <img src="/logo.png" width={50} height={50} />
        </div>
        <div className="flex align-middle">
          <nav className="flex gap-4  font-bold text-2xl">
            <Link href="/">Main</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/claim">Claim $SPRT</Link>
            <Link href="/account">Account</Link>
          </nav>
        </div>
      </div>
      <ConnectWallet />
    </header>
  );
};
