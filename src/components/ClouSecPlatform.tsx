// src/components/ClouSecPlatform.tsx

import {
  ShieldCheck,
  Search,
  Bug,
  Settings,
  UserCheck,
  Users,
  Bell,
  DollarSign,
  TerminalSquare,
  FileText,
  View
} from "lucide-react";

const features = [
  {
    title: "Ensure Continuous Compliance & Prevent Costly Breaches",
    icon: ShieldCheck,
    description:
      "Automatically identify and remediate security misconfigurations across your cloud environment. Stay compliant and secure effortlessly.",
  },
  {
    title: "Proactive Threat Detection & Response",
    icon: Search,
    description:
      "Detect and respond to threats in real-time using AI-powered intelligence and behavioral analysis.",
  },
  {
    title: "Minimize Your Attack Surface",
    icon: Bug,
    description:
      "Identify, prioritize, and patch vulnerabilities across infrastructure, apps, and containers quickly.",
  },
  {
    title: "Gain Complete Control Over Your Cloud Configuration",
    icon: Settings,
    description:
      "Uncover hidden risks and enforce consistent policies to prevent configuration drift.",
  },
  {
    title: "Secure Your Cloud Identities",
    icon: UserCheck,
    description:
      "Manage user access with MFA and protect sensitive data from unauthorized use.",
  },
  {
    title: "Simplify User Access Reviews & Ensure Least Privilege",
    icon: Users,
    description:
      "Easily audit access rights and apply least privilege principles to reduce insider threats.",
  },
  {
    title: "Streamline Incident Response & Reduce Alert Fatigue",
    icon: Bell,
    description:
      "Suppress false positives and automate response with an integrated ticketing system.",
  },
  {
    title: "Gain a Holistic View of Your Cloud Environment",
    icon: View,
    description:
      "Visualize relationships and assets through a powerful, intuitive tree view.",
  },
  {
    title: "Optimize Your Cloud Spend & Eliminate Waste",
    icon: DollarSign,
    description:
      "Slash unnecessary costs with AI-driven insights and actionable optimization.",
  },
  {
    title: "Centralize Your Cloud Security Operations",
    icon: TerminalSquare,
    description:
      "Run all your security tasks from a single, unified operations hub.",
  },
  {
    title: "Demonstrate Compliance & Track Your Security Posture",
    icon: FileText,
    description:
      "Generate detailed, auditor-friendly reports with a single click.",
  },
];

export default function ClouSecPlatform() {
  return (
    <section className="bg-gradient-to-br from-indigo-700 to-purple-700 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-4">
           Unifying Cloud Security, Simplifying Your Life.
        </h1>
        <p className="text-lg font-medium max-w-2xl mx-auto">
          No Hidden Costs. No Feature or Resource-Based Restrictions. Just Complete Cloud Security.
        </p>
      </div>

      <div className="bg-white mt-12 rounded-3xl shadow-xl p-10 text-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-indigo-700">Everything You Need – In Every Plan</h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            All ClouSec plans come with full access to every platform capability – no upcharges, no limitations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ title, icon: Icon, description }, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-medium text-indigo-600">
            Say goodbye to resource-based pricing. Say hello to clarity, value, and peace of mind.
          </p>
        </div>
      </div>
    </section>
  );
}
