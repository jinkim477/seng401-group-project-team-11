"use client";
import React from 'react';

interface SidebarProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  handleTabChange: (tab: string) => void;
  handleSubmit: () => void;
  loading: boolean;
  errorMessages: string[];  // Add this line to the interface
}

const Sidebar: React.FC<SidebarProps> = ({ tabs, activeTab, handleTabChange, handleSubmit, loading, errorMessages}) => {
  console.log("Sidebar receiving errorMessages:", errorMessages);
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <div className="w-full lg:w-1/4 bg-dark dark:bg-primary p-6 rounded-3xl shadow-lg flex flex-col self-start">
      <div className="space-y-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"  // Ensure buttons inside form do not submit the form
            className={`w-full text-lg font-bold py-4 rounded-3xl transition shadow-lg hover:scale-110 ${
              activeTab === tab.id ? "bg-accent-gray text-white dark:bg-accent-beige dark:text-dark" : "bg-dark text-primary dark:bg-primary dark:text-dark"
            }`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form with submit button */}
      <form onSubmit={handleFormSubmit} className="mt-6">
        <button
          type="submit"
          className="w-full bg-accent-green text-dark py-4 rounded-3xl font-bold shadow-lg hover:scale-105 transition"
        >
          Generate
        </button>
        {loading && (
          <p className="text-center text-lg mt-4 text-green-500 font-semibold">
            Generating meal plan...
          </p>
        )}
        {errorMessages.length > 0 && (
          <div className="text-lg mt-4 text-red-500 font-semibold">
            {errorMessages.map((error, index) => (
              <div key={index} className="error-message mb-2 last:mb-0">{error}</div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Sidebar;
