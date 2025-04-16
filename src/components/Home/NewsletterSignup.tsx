import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa"; // You can replace this with any icon of your choice

import { Button } from "../ui/button";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux"; // Assuming you might want to use Redux for managing state

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const theme = useSelector((state: any) => state.theme); // Assuming you are using Redux to manage theme state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate an API call or subscription action
    setTimeout(() => {
      toast.success("Subscribed successfully!");
      setEmail(""); // Reset the email input
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-700 to-purple-700 text-white"
      } p-6 rounded-xl shadow-lg w-full py-20  mx-auto transition-colors duration-300 flex items-center flex-col `}
    >
      <h2 className="text-3xl font-semibold mb-4 text-center">Join Our Community</h2>
      <form onSubmit={handleSubmit} className="flex  items-center justify-center space-x-2">
        <div className="w-80 relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={`${
            theme === "dark"
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          } px-4 py-2 rounded-full w-full  focus:outline-none focus:ring-2 focus:ring-indigo-500 `}

        />
        <Button
          type="submit"
          variant="primary"
          className={`${
            theme === "dark" ? "bg-indigo-600" : "bg-indigo-500"
          } rounded-full p-2.5 absolute top-[3.5px] right-[8px] w-8 h-8`}
          disabled={isLoading}
        >
          <FaPaperPlane size={20} className="text-white" />
        </Button>

        </div>
       
      </form>
      <p className="text-center text-sm text-gray-50 mt-3">
        Stay updated with the latest news and offers.
      </p>
    </div>
  );
};

export default NewsletterSignup;
