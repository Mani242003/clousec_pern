import React, { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

interface ContactFormProps {
  services?: string[];
}

const ContactForm: React.FC<ContactFormProps> = () => {
  const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onHCaptchaChange = (token: string | null): void => {
    if (token) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "4198e6e5-1a8e-4763-8e5f-35a75c33caec");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitSuccess(true);
        (event.target as HTMLFormElement).reset();
        setCaptchaVerified(false);
      } else {
        console.log("Error", data);
        setSubmitSuccess(false);
        setErrorMessage("Form submission failed. Please try again later.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitSuccess(false);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h3>
      
      {submitSuccess === true && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <p>Thank you! Your message has been sent successfully.</p>
        </div>
      )}
      
      {submitSuccess === false && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{errorMessage || "Form not submitting! Please try again later or contact us at +91 9790845787"}</p>
        </div>
      )}
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="Customer Name"
              placeholder="Your name"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="E-mail"
              placeholder="your.email@example.com"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Your phone number"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            id="message"
            rows={4}
            name="Message"
            required
            placeholder="How can we help you?"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          ></textarea>
        </div>
        
        <div className="hcaptcha-container">
          <HCaptcha
            sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
            reCaptchaCompat={false}
            onVerify={onHCaptchaChange}
          />
        </div>

        <div className="flex justify-center md:justify-start">
          <button
            className={`px-6 py-3 rounded-full text-white font-medium transition-all duration-300 ${
              captchaVerified 
                ? "bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary" 
                : "bg-gray-400 cursor-not-allowed"
            }`}
            type="submit"
            disabled={!captchaVerified || isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
