"use client";
import React from 'react';

interface DietOptionsProps {
  formData: FormDataType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>, category: keyof FormDataType) => void;
}

const DietOptions: React.FC<DietOptionsProps> = ({ formData, handleChange, handleCheckboxChange }) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold">Select Your Diet</h3>
      <div className="grid grid-cols-2 gap-6">
        {[
          "Keto",
          "Paleo",
          "Mediterranean",
          "Intermittent Fasting",
          "DASH",
          "Vegan",
          "Vegetarian",
          "Pescatarian",
          "Gluten-free",
        ].map((diet) => (
          <label key={diet} className="flex items-start space-x-3">
            <input
              type="checkbox"
              value={diet}
              checked={formData.selectedDiets.includes(diet)}
              onChange={(e) => handleCheckboxChange(e, "selectedDiets")}
              className="form-checkbox h-6 w-6 text-accent-green"
            />
            <span className="font-bold">{diet}</span>
          </label>
        ))}
      </div>

      {/* Inclusions Section */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Inclusions</h3>
        <label className="block text-lg mt-2">
          Ingredients that you already own
        </label>
        <textarea
          name="inclusions"
          value={formData.inclusions}
          onChange={handleChange}
          className="w-full mt-2 p-4 rounded-lg bg-accent-gray dark:bg-accent-beige text-white dark:text-black placeholder-accent-beige dark:placeholder-accent-gray"
          placeholder="Enter a list of ingredients you have readily available:"
          rows={3}
        />
      </div>

      {/* Exclusions Section */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Exclusions</h3>
        <label className="block text-lg mt-2">Allergies</label>
        <textarea
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          className="w-full mt-2 p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark placeholder-accent-beige dark:placeholder-accent-gray"
          placeholder="Enter a list of allergies:"
          rows={3}
        />
        <label className="block text-lg mt-4">
          Foods to avoid (excluding allergies)
        </label>
        <textarea
          name="exclusions"
          value={formData.exclusions}
          onChange={handleChange}
          className="w-full mt-2 p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark placeholder-accent-beige dark:placeholder-accent-gray"
          placeholder="Enter a list of foods you do not want to eat:"
          rows={3}
        />
      </div>
    </div>
  );
};

export default DietOptions;