"use client";
import React from "react";
import {SparklesCore} from "../ui/sparkles";
import {SignIn} from "@clerk/nextjs";

export default function Aurora() {
    return (
        <div
            className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
            <div className="w-full absolute inset-0 h-screen">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>
            <h1 className="md:text-7xl text-4xl lg:text-6xl py-2 font-bold text-center text-white relative z-20">
                Welcome to SleepCatch            </h1>
            <p className="text-lg mb-4 text-white">
                Sign in to your account to get started.
            </p>
            <SignIn/>
        </div>
    );
}
