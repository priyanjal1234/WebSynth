import React from "react";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const PricingPlan = ({
  name,
  price,
  description,
  features,
  popular = false,
  buttonText,
}) => {
  return (
    <div
      className={`flex flex-col rounded-xl overflow-hidden ${
        popular
          ? "border-2 border-indigo-500 shadow-lg shadow-indigo-500/20 scale-105 lg:scale-110 z-10"
          : "border border-gray-800"
      } transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 relative bg-gray-900`}
    >
      {popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            Popular
          </div>
        </div>
      )}

      <div className="p-6 text-center border-b border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
        <div className="flex items-baseline justify-center mb-2">
          <span className="text-4xl font-bold text-white">{price}</span>
          {price !== "Free" && (
            <span className="text-gray-400 ml-1">/month</span>
          )}
        </div>
        <p className="text-gray-400">{description}</p>
      </div>

      <div className="p-6 flex-grow">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <Check className="h-5 w-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
              ) : (
                <X className="h-5 w-5 text-gray-600 mt-0.5 mr-2 flex-shrink-0" />
              )}
              <span
                className={feature.included ? "text-gray-300" : "text-gray-500"}
              >
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 border-t border-gray-800">
        <Link
          to={'/register'}
          className={`block text-center py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            popular
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/20"
              : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
          }`}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "Free",
      description: "Perfect for trying out the platform",
      features: [
        { name: "1 website", included: true },
        { name: "Basic templates", included: true },
        { name: "Community support", included: true },
        { name: "Custom domain", included: false },
        { name: "Remove branding", included: false },
        { name: "Priority support", included: false },
        { name: "Advanced components", included: false },
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$29",
      description: "For professionals and small businesses",
      features: [
        { name: "10 websites", included: true },
        { name: "All templates", included: true },
        { name: "Community support", included: true },

        { name: "Remove branding", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced components", included: false },
      ],
      buttonText: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "For teams and agencies",
      features: [
        { name: "Unlimited websites", included: true },

        { name: "Community support", included: true },

        { name: "Remove branding", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced components", included: true },
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="py-24 bg-gray-900 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-900 rounded-full filter blur-3xl"></div>
        <div className="absolute top-24 -left-24 w-72 h-72 bg-purple-900 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            Choose Your Plan
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Flexible pricing options to match your needs. Start for free and
            upgrade as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingPlan
              key={index}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
              buttonText={plan.buttonText}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 max-w-2xl mx-auto">
            All plans include a 14-day free trial. No credit card required to
            start. Need a custom solution?{" "}
            <a
              href="#contact"
              className="text-indigo-400 hover:text-indigo-300 underline"
            >
              Contact us
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
