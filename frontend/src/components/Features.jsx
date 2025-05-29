import React from "react";
import {
  Code,
  Braces,
  Rocket,
  Smartphone,
  Zap,
  Shield,
  Award,
  Clock,
} from "lucide-react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="group relative bg-gray-900 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-800 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "AI-Powered Generation",
      description:
        "Describe your website and watch as GPT generates responsive, beautiful code in real-time.",
    },
    {
      icon: <Braces className="h-6 w-6" />,
      title: "WebContainer Technology",
      description:
        "Edit and preview your website directly in the browser with no setup or installation required.",
    },

    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Responsive Design",
      description:
        "All generated websites are fully responsive and optimized for any device size or screen type.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Modern Best Practices",
      description:
        "All generated code follows current web standards and best practices for security and performance.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to create professional websites without writing
            a single line of code.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
