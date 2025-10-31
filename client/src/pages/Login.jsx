import React from "react";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import Img1 from "../assets/img1.png";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-6xl min-h-[650px] bg-white shadow-2xl rounded-3xl overflow-hidden flex">
        <div
          className="relative hidden md:flex w-1/2 items-center justify-center p-12"
          style={{
            backgroundImage: `url(${Img1})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative text-white text-center max-w-sm drop-shadow-lg">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Welcome to ImageSearch
            </h1>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
              Browse high-quality images instantly.  
              Sign in to store your search history and download collections!
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-12">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-lg bg-gray-200 mx-auto flex items-center justify-center text-gray-700 font-bold text-lg">
                IS
              </div>
              <h2 className="text-2xl font-bold mt-4">Sign In</h2>
              <p className="text-sm text-gray-500">Choose a provider below</p>
            </div>

            <div className="space-y-4">

            <button
            onClick={() => window.location.href = "http://localhost:5000/auth/google"}
            className="flex items-center gap-2 justify-center w-full py-3 border rounded-lg hover:bg-gray-50 transition"
            >
            <FaGoogle className="text-red-500" />
            <span className="text-sm font-medium">Continue with Google</span>
            </button>

            <button
            onClick={() => window.location.href = "http://localhost:5000/auth/github"}
            className="flex items-center gap-2 justify-center w-full py-3 border rounded-lg hover:bg-gray-50 transition"
            >
            <FaGithub />
            <span className="text-sm font-medium">Continue with GitHub</span>
            </button>

            <button
            onClick={() => window.location.href = "http://localhost:5000/auth/facebook"}
            className="flex items-center gap-2 justify-center w-full py-3 border rounded-lg hover:bg-gray-50 transition"
            >
            <FaFacebook className="text-blue-600" />
            <span className="text-sm font-medium">Continue with Facebook</span>
            </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
