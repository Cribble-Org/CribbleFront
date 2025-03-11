import logo from "../../assets/Images/o bg.webp";

export default function Header() {
  return (
    <div className="w-full bg-black">
      <div className="container flex h-16 items-center justify-between ">
        <a href="/" className="flex items-center space-x-2">
          <div className="relative h-10 w-[70px]">
            <div className="absolute top-4 left-4 flex h-[72px] items-center">
              <div className="relative h-12 w-12 rounded-full  -mt-14  ">
                <div className="absolute inset-0 rounded-full" />
                <div className="relative z-10 flex h-full items-center justify-center text-2xl font-bold">
                  <img src={logo} className="rounded-full" />
                </div>
                <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-br from-purple-500/50 to-pink-500/50 blur-md" />
              </div>
            </div>
          </div>
          <span className="text-lg font-semibold text-white  ">CRIBBLE</span>
        </a>
        <nav className="hidden space-x-4 md:flex">
          <a href="/pitchdeck" className="text-white hover:text-gray-300">
            Pitchdeck
          </a>
          <a href="/whitepaper" className="text-white hover:text-gray-300">
            Whitepaper
          </a>
          <a href="/pricing" className="text-white hover:text-gray-300">
            Pricing
          </a>
          <a href="/contact" className="text-white hover:text-gray-300">
            Contact
          </a>
        </nav>
        <button className="bg-[#B3FF53] text-black hover:bg-[#B3FF53]/90 px-2 py-2 rounded-lg">
          <a href="/signup">Sign Up</a>
        </button>
      </div>
    </div>
  );
}
