'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ConnectButton() {
  const pathname = usePathname();
  return (
    // <nav className='z-10 fixed top-0 flex justify-between items-center w-full px-8 py-4 backdrop-blur-xl bg-white/20'>
    <nav className='side-navbar z-10 relative left-0 flex-col justify-start items-between h-full w-1/6 px-8 py-4 bg-transparent'>
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
        <Link className={`link ${pathname === '/mining' ? 'active' : ''}`} href="/mining">Mining BNB</Link>
      </div>
      <div>
        <Link className={`link ${pathname === '/game' ? 'active' : ''}`} href="/game">Game</Link>
      </div>
    </nav>
  );
}

