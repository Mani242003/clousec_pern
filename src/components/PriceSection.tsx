// src/components/PricingSection.tsx

import { CheckCircle2 } from "lucide-react";

const features = [
  "Security Misconfigurations (ClouSec Compliance Suite)",
  "Threats",
  "Vulnerabilities",
  "Configuration management insights",
  "Identity management",
  "User Access Matrix",
  "Ticketing System: Suppress / Findings workflow",
  "Comprehensive Tree view",
  "Cost Saver",
  "Ops Center",
  "Reports",
  "No Resource-Based Limits | Focus on Value, Not User Count",
];

const plans = [
  {
    name: "ClouSec Enterprise",
    price: "$6000 / year",
    highlight: "Best value for growing teams",
  },
  {
    name: "ClouSec Cost Saver + Tree View",
    price: "$45 / month",
    highlight: "Affordable entry with full features",
  },
];

export default function PricingSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Simple Pricing</h2>
          <p className="mt-4 text-lg text-gray-600">
            No hidden costs. No user-based restrictions. Start securing and optimizing your cloud today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">{plan.name}</h3>
                <p className="mt-2 text-gray-500">{plan.highlight}</p>
                <p className="mt-4 text-3xl font-bold text-indigo-600">{plan.price}</p>

                <ul className="mt-6 space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <CheckCircle2 className="text-green-500 w-5 h-5 mt-1 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button className="w-full bg-indigo-600 text-white py-3 px-5 rounded-xl hover:bg-indigo-700 transition">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
