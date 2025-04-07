"use client"; // Required for event listeners in Next.js

import Link from "next/link";

const Header = () => {
  return (
    
    <header className="fixed top-0 left-0 w-full bg-transparent z-50 container mx-auto lg:px-40 sm:px-14">
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex justify-between items-center container mx-auto py-4">
        <ul className="flex gap-6 list-none text-gray-800 text-lg font-sans">
          <li>
            <Link href="https://avatruae.com/models/avatr-11/">AVATR 11</Link>
          </li>
          <li>
            <Link href="https://avatruae.com/models/avatr-12/">AVATR 12</Link>
          </li>
          <li>
            <Link href="https://avatruae.com/experience-avatr/">Experience AVATR</Link>
          </li>
        </ul>

        <div className="flex justify-center items-center">
          <Link href="https://avatruae.com">
            <img src="/AVATR-Logo-–-Full.svg" alt="logo" className="w-[230px]" />
          </Link>
        </div>

        <ul className="flex gap-6 list-none text-gray-800 text-lg font-sans">
          <li>
            <Link href="https://avatruae.com/ownership/">Ownership</Link>
          </li>
          <li>
            <Link href="https://avatruae.com/discover-avatr/">Discover</Link>
          </li>
          <li>
            <Link href="https://avatruae.com/news/">News</Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-white border-b border-black">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="https://avatruae.com">
            <img src="/AVATR-Logo-–-Full.svg" alt="logo" className="w-[200px]" />
          </Link>
          <button
            className="text-black focus:outline-none cursor-pointer"
            onClick={() => {
              const nav = document.getElementById("mobileMenu");
              nav?.classList.toggle("hidden");
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div id="mobileMenu" className="hidden px-4 pb-4">
          <ul className="space-y-3 text-gray-800 text-lg">
            <li>
              <Link href="https://avatruae.com/models/avatr-11/">AVATR 11</Link>
            </li>
            <li>
              <Link href="https://avatruae.com/models/avatr-12/">AVATR 12</Link>
            </li>
            <li>
              <Link href="https://avatruae.com/experience-avatr/">Experience AVATR</Link>
            </li>
            <li>
              <Link href="https://avatruae.com/ownership/">Ownership</Link>
            </li>
            <li>
              <Link href="https://avatruae.com/discover-avatr/">Discover</Link>
            </li>
            <li>
              <Link href="https://avatruae.com/news/">News</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
