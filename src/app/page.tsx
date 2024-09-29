"use client"; 
import FlipText from "../components/ui/flip-text";
import Globe from "../components/ui/globe";
import ShimmerButton from "../components/ui/shimmer-button";
import { useRouter } from 'next/navigation'; 
import ModeToggle from "./components/ModeToggle";
import { useAuth} from '@clerk/nextjs';
export default function Home() {
  const router = useRouter();
  
  const handleGetStartedClick = () => {
      router.push('/chatpage');
  }
  

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orbit</h1>
        <div className="flex items-center space-x-4">
          <ModeToggle />

          <button className="rounded-full relative flex py-2 px-4 items-center justify-center hover:space-x-8 bg-gradient-to-r from-blue-500 to-cyan-500 overflow-hidden bg-cyan-500 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before: before:duration-100 before:ease-linear hover:bg-black hover:text-cyan-500 hover:shadow-blue-500 hover:before:border-[25px]">
            <span className="relative z-10">
       
              <a href="_blank">Sign Up</a>
            </span>
       
          </button>
          <button className="rounded-full relative flex py-2 px-4 items-center justify-center hover:space-x-8 bg-gradient-to-r from-blue-500 to-cyan-500 overflow-hidden bg-cyan-500 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before: before:duration-100 before:ease-linear hover:bg-black hover:text-cyan-500 hover:shadow-blue-500 hover:before:border-[25px]">
            <span className="relative z-10">
              <a href="_blank">Login</a>
            </span>
          </button>
          
        </div>
      </header>
      <FlipText className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 mt-20 md:leading-[6rem]"
        word="ORBIT"
      />
      <main className="flex flex-col items-center justify-center">
        <p className='mt-10'>Best way to travel</p>
        <ShimmerButton className="shadow-2xl mt-28" onClick={handleGetStartedClick}>
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-500/10 lg:text-lg">
            Get Started
          </span>
        </ShimmerButton>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 scale-150 overflow-hidden w-full h-1/2">
          <Globe className="pointer-events-none" />
        </div>
      </main>
      <footer className="py-8">
      </footer>
    </div>
  );
};