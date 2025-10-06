"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";

const HeroSection = () => {

  const imageRef =useRef();
  
  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll=()=>{
       const scrollPosition = window.scrollY;
       const scrollThreshold = 100;

       if(scrollPosition>scrollThreshold){
          imageElement.classList.add("scrolled");

       }else{
        imageElement.classList.remove("scrolled");
       }
    };

    window.addEventListener("scroll",handleScroll)

    return()=>window.removeEventListener("scroll",handleScroll)
  }, []);
  return (
    <section className="pb-20 px-4 text-center max-w-3xl mx-auto">
      <h1 className="text-5xl md:text-8x1 lg:text-[50px] pb-6 gradient-title font-bold mb-6 leading-tight">
        Your AI Copilot for Smarter Investments <br />
        Risk Insights, and Financial Growth
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        An AI-powered finance platform that helps you analyze data, track performance,
        and make smarter financial decisions. From investment insights to risk management,
        it’s your intelligent copilot for growth.
      </p>

      {/* CTA Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <Link href="/dashboard">
          <Button size="lg" className="px-8">
            Get Started
          </Button>
        </Link>
        <Link
          href="https://www.youtube.com/watch?v=egS6fnZAdzk&t=1585s"
          target="_blank"
        >
          <Button size="lg" variant="outline" className="px-8">
            Watch Demo
          </Button>
        </Link>
      </div>

      {/* Banner Image */}
      <div className="hero-image-wrapper">
      <div ref={imageRef} className="hero-image">
        <Image
          src="/banner.png"
          width={1280}
          height={720}
          alt="Dashboard Preview"
          className="rounded-lg shadow-2xl border"
          priority
        />
      </div>
      </div>
    </section>
  );
};

export default HeroSection;
