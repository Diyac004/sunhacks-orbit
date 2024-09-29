"use client"; 
import FlipText from "../components/ui/flip-text";
import Globe from "../components/ui/globe";
import ShimmerButton from "../components/ui/shimmer-button";
import Marquee from "../components/ui/marquee";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { useRouter } from 'next/navigation'; 
import ModeToggle from "./components/ModeToggle";
import { useAuth } from '@clerk/nextjs';

import GradualSpacing from "../components/ui/gradual-spacing";
export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  
  const handleGetStartedClick = () => {
    if (isSignedIn) {
      router.push('/chatpage');
    } else {
      router.push('https://fluent-koi-9.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F'); 
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">ORB1T</h1>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          
          <SignedOut>
            <button className=" rounded-full relative flex py-2 px-4 items-center justify-center hover:space-x-8 bg-gradient-to-r from-blue-500 to-cyan-500 overflow-hidden bg-cyan-500 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before: before:duration-100 before:ease-linear hover:bg-black hover:text-cyan-500 hover:shadow-blue-500 hover:before:border-[25px]">
              <span className="relative z-10">
                <SignInButton />
              </span>
            </button>
          </SignedOut>
          
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      
      <FlipText
        className=" italic pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 mt-18 md:leading-[7rem]"
        word="ORB1T"
      />
      
      <main className="flex flex-col items-center justify-center">
        
        <GradualSpacing
      className="pointer-events-none bg-gradient-to-b from-black to-gray-500/80 bg-clip-text text-center text-pretty text-base font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 mt-12 md:leading-[3rem]"
      text="Plan your trip with a single click."/>
       <GradualSpacing
      className="pointer-events-none bg-gradient-to-b from-black to-gray-500/80 bg-clip-text text-center text-pretty font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10  md:leading-[2rem]"
      text="Pick your destination and enjoy the ideal vacation :)"/>
       
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
      <Marquee className="mt-20 text-2xl">
          <span>Explore the world with us</span>
          <span>Plan your next adventure</span>
          <span>Discover new places</span>
        </Marquee>
    </div>
  );
};