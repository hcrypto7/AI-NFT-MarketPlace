'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ConnectButton() {
  const pathname = usePathname();
  return (
    <nav className='sticky top-0 flex justify-between items-center w-full px-8 py-4 backdrop-blur-md bg-white/60'>
      <div>
        CryptoWorld
      </div>      
      <div>
        <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">Home</Link>
      </div>
      <div>
        <Link className={`link ${pathname === '/mint' ? 'active' : ''}`} href="/mint">NFT mint</Link>
      </div>
      <div>
        <Link className={`link ${pathname === '/stake' ? 'active' : ''}`} href="/stake">NFT stake</Link>
      </div>
      <div>
        <w3m-button /> 
      </div>
    </nav>
  );
}