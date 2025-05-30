import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import CodeTypingEffect from './CodeTypingEffect';
import { Link } from "react-router-dom";
import generateRandomWord from '../utils/generateRandom';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const codeExample = `// GPT is generating this website...
import React from 'react';
import { Header, Hero, Features } from './components';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black">
      <Header />
      <Hero 
        title="Your Vision, Our AI"
        subtitle="Build beautiful websites in seconds"
      />
      <Features features={[
        "Responsive layouts",
        "Modern design",
        "SEO optimized",
        "Fast performance"
      ]} />
    </div>
  );
}`;

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden bg-gray-950"
      style={{
        backgroundImage: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(79, 70, 229, 0.15) 0%, transparent 60%)'
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-900/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-900/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMjMyNDUiIHN0cm9rZS13aWR0aD0iMSIgLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+PC9zdmc+')]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-24">
          <div className="lg:w-1/2 text-center lg:text-left pt-8 lg:pt-16">
            <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm py-1 px-3 rounded-full mb-4 text-indigo-300 text-sm border border-indigo-800/50">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Powered by GPT & WebContainers</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Build Beautiful Websites
              </span>
              <br />
              <span className="text-white">with AI in Seconds</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
              Create stunning, responsive websites instantly with our GPT-powered platform. Just describe what you want, and watch as AI brings your vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to={`/register`}
                className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-lg px-6 py-3 text-base shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all duration-200"
              >
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a 
              target='_blank'
                href="https://youtu.be/dDpI5Ioi2eo?si=4K11wl0TcUppdRLS" 
                className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg px-6 py-3 text-base border border-gray-700 hover:border-gray-600 transition-all duration-200"
              >
                Watch Demo
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full max-w-xl mx-auto lg:mx-0">
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-gray-800 backdrop-blur-sm">
              <div className="bg-gray-900 py-2 px-4 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-400 text-xs flex-1 text-center">
                  AI-Powered Website Generator
                </div>
              </div>
              <div className="p-4 bg-gray-950 font-mono text-sm h-96 overflow-auto relative">
                <CodeTypingEffect code={codeExample} />
                <div className="absolute bottom-4 right-4 bg-indigo-600 text-white px-3 py-1.5 rounded-md text-xs font-sans animate-pulse">
                  AI generating...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="animate-bounce bg-gray-800 p-2 w-10 h-10 ring-1 ring-gray-700 shadow-lg rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-indigo-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;