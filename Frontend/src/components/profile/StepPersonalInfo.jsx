import React from "react";

const StepPersonalInfo = ({ formData, updateFormData, onNext }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Personal Info
      </h2>

      <input
        className="w-full px-4 py-2 rounded-lg border 
        bg-white dark:bg-[#111827]
        border-gray-300 dark:border-gray-600
        text-gray-800 dark:text-gray-200
        focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => updateFormData("name", e.target.value)}
      />

      {/* <input
        className="w-full px-4 py-2 rounded-lg border 
        bg-white dark:bg-[#111827]
        border-gray-300 dark:border-gray-600
        text-gray-800 dark:text-gray-200
        focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => updateFormData("email", e.target.value)}
      /> */}

      <button
        onClick={onNext}
        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
      >
        Next
      </button>
    </div>
  );
};

export default StepPersonalInfo;
