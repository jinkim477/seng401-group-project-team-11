"use client";
import React from 'react';

interface UserOptionsProps {
  formData: FormDataType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const UserOptions: React.FC<UserOptionsProps> = ({ formData, handleChange }) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">User Preferences</h3>

      {/* Physical Attributes */}
      <div className="grid grid-cols-2 gap-6 mt-4">
        <div>
          <label className="block text-lg font-bold">Weight (15 to 300 kg)</label>
          <input
            type="number"
            name="weight"
            min="15" // Minimum weight limit
            max="300" // Maximum weight limit
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
          />
        </div>
        <div>
          <label className="block text-lg font-bold">Height (30 to 300 cm)</label>
          <input
            type="number"
            name="height"
            min="30"
            max="300"
            value={formData.height}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
          />
        </div>
      </div>

      {/* Sex Selection */}
      <label className="block text-lg font-bold mt-4">Sex</label>
      <select
        name="sex"
        value={formData.sex}
        onChange={handleChange}
        className="w-full p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      {/* Price Range */}
      <label className="block text-lg font-bold mt-4">
        Price Range (Per Meal): ${formData.priceRange}
      </label>
      <input
        type="range"
        min="5"
        max="100"
        step="1"
        value={formData.priceRange}
        onChange={(e) =>
          handleChange({
            ...e,
            target: {
              ...e.target,
              name: 'priceRange',
              value: parseInt(e.target.value),
            },
          })
        }
        className="w-full cursor-pointer"
      />

      {/* Meal Prep Time */}
      <label className="block text-lg font-bold mt-4">
        Meal Prep Time (1 to 60 minutes)
      </label>
      <input
        type="number"
        name="prepTime"
        min="1"
        max="60"
        value={formData.prepTime}
        onChange={handleChange}
        className="w-full p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
        placeholder="Enter max time for meal prep"
      />

      {/* Meal Cook Time */}
      <label className="block text-lg font-bold mt-4">
        Meal Cook Time (1 to 180 minutes)
      </label>
      <input
        type="number"
        name="cookTime"
        min="1"
        max="180"
        value={formData.cookTime}
        onChange={handleChange}
        className="w-full p-4 rounded-lg bg-accent-gray text-white dark:bg-accent-beige dark:text-dark"
        placeholder="Enter max time for meal cook"
      />
    </div>
  );
};

export default UserOptions;