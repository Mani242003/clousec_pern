import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Clousec provides a holistic security solution that covers all aspects of your cloud infrastructure.",
  "Stay ahead of emerging threats with our real-time threat analysis, ensuring your cloud remains secure at all times.",
  "Navigate the complex world of compliance effortlessly with Clousec’s compliance-specific features.",
  "Bid farewell to tedious manual reporting processes. Clousec automates the reporting workflow.",
  "Minimize false positives and streamline operations with Clousec’s standardized suppression mechanisms.",
  "Foster teamwork and communication among your security and IT teams to achieve cloud security excellence.",
];

const BookDemo = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    phone: "",
    country: "",
    demoDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
    
  };

  return (
    <div className="pt-[85px] grid grid-cols-1 md:grid-cols-2 gap-10 p-10 min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-green-50">
      {/* Feature Section */}
      <div className="max-w-xl">
        <h2 className="text-3xl font-bold mb-4">Shaping the Future of Cloud Security</h2>
        <p className="mb-6 text-gray-700">
          At Clousec, we believe that security should be as dynamic as the cloud itself.
          Our innovative approach empowers organizations to safeguard their digital assets
          with ease and confidence. In this demo, you can expect:
        </p>
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-gray-800">
              <CheckCircle2 className="text-green-500 mt-1" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Form Section */}
      <div className="bg-white shadow-xl rounded-xl p-8">
        <h3 className="text-xl font-semibold mb-4">Book A Demo</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="firstName" required onChange={handleChange} value={form.firstName} className="border p-2 rounded" placeholder="First Name *" />
            <input name="lastName" onChange={handleChange} value={form.lastName} className="border p-2 rounded" placeholder="Last Name" />
          </div>
          <input name="email" required type="email" onChange={handleChange} value={form.email} className="w-full border p-2 rounded" placeholder="Business Email *" />
          <input name="company" required onChange={handleChange} value={form.company} className="w-full border p-2 rounded" placeholder="Company *" />
          <input name="jobTitle" onChange={handleChange} value={form.jobTitle} className="w-full border p-2 rounded" placeholder="Job Title" />
          <input name="phone" onChange={handleChange} value={form.phone} className="w-full border p-2 rounded" placeholder="Phone" />
          <input name="country" onChange={handleChange} value={form.country} className="w-full border p-2 rounded" placeholder="Country" />
          <input
            type="datetime-local"
            name="demoDate"
            required
            onChange={handleChange}
            value={form.demoDate}
            className="w-full border p-2 rounded"
            min="2025-05-11T08:00"
            max="2025-05-12T00:00"
          />
          <p className="text-sm text-gray-500">Please choose a time between <strong>8:00 AM</strong> and <strong>12:00 AM</strong> (India Standard Time).</p>
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Schedule Demo
          </button>
        </form>
      </div>
    </div>
  );
};


export default BookDemo;