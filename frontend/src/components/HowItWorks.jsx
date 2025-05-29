import React from 'react';
import { MessageSquare, Code2, Eye, Upload } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Describe Your Vision",
      description: "Simply describe what you want your website to look like and what functionality you need. Be as detailed or as brief as you want."
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "AI Generates Code",
      description: "Our GPT model instantly creates the HTML, CSS, and JavaScript needed to bring your vision to life, all running in a WebContainer."
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Preview & Edit",
      description: "See your website in real-time as it's being built. Make adjustments by simply asking for changes or editing the code directly."
    },
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Deploy Your Site",
      description: "When you're happy with your creation, deploy it to production with a single click and share it with the world."
    }
  ];
  
  return (
    <section id="how-it-works" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-900 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-900 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Create a website in four simple steps - no coding experience required.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+32px)] right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-transparent z-0"></div>
              )}
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gray-800 mb-4 shadow-lg shadow-indigo-500/10">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                    {step.icon}
                  </div>
                </div>
                <span className="absolute top-10 text-white bg-gray-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 border-indigo-500">
                  {index + 1}
                </span>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#get-started" 
            className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-lg px-8 py-3 text-lg shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all duration-200"
          >
            Try It Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;