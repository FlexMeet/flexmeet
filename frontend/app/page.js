'use client';
import { useState } from "react";
import LoginModal from "./modals/Loginpage.js";
import SignUpModal from "./modals/Signuppage.js";
import { useRouter } from "next/navigation";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;


export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openSignUp = () => {
    setIsLoginOpen(false); // Close Sign-In Modal
    setIsSignUpOpen(true); // Open Sign-Up Modal
  };
  const closeSignUp = () => setIsSignUpOpen(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <header className="w-full bg-tele p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">FlexMeet</h1>
        <div>
          <button
            onClick={openLogin}
            className="pr-4 bg-tele font-bold text-white rounded"
          >
            Log In / Sign Up
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto text-center mt-20 p-4">
        <p className="text-gray-500 text-sm">12 January 2025</p>
        <h2 className="text-8xl mt-2">Introducing FlexMeet</h2>
        <button className="mt-6 px-6 py-3 bg-tele text-white rounded-full shadow-lg"
        onClick={() => router.push("/setup")} >
          Try FlexMeet
        </button>
        <p className="text-gray-700 text-left mt-8">
          We’re excited to introduce our new app, FlexMeet, designed to simplify
          scheduling and make coordinating with groups easier than ever. With an
          intuitive interface and powerful features, our app helps you quickly
          find the best times to meet by allowing participants to share their
          availability in an interactive and visually clear format.
        </p>
        <p className="text-gray-700 text-left mt-4">
          FlexMeet is perfect for planning meetings, events, or casual
          get-togethers, ensuring everyone stays on the same page with minimal
          effort.
        </p>
      </main>

      {/* Render the LoginModal */}
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} onOpenSignUp={openSignUp} />
      <SignUpModal isOpen={isSignUpOpen} onClose={closeSignUp} />
    </div>
  );
}
