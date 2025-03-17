import React from 'react';

interface SidebarProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  handleTabChange: (tab: string) => void;
  handleSubmit: () => void;
  loading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ tabs, activeTab, handleTabChange, handleSubmit, loading }) => {
  return (
    <div className="w-full lg:w-1/4 bg-dark dark:bg-primary p-6 rounded-3xl shadow-lg flex flex-col self-start shadow-lg">
      <div className="space-y-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`w-full text-lg font-bold py-4 rounded-3xl transition shadow-lg ${
              activeTab === tab.id
                ? "bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
                : "bg-dark text-primary dark:bg-primary dark:text-dark"
            }`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="w-full bg-accent-green text-dark py-4 rounded-3xl font-bold shadow-lg hover:scale-105 transition"
        >
          Generate
        </button>
      </div>
      <div>
        {loading && (
          <p className="text-center text-lg mt-4 text-green-500 font-semibold">
            Generating meal plan...
          </p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;