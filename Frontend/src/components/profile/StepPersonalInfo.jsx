import React from "react";

const StepPersonalInfo = ({ formData, updateFormData, onNext }) => {
  return (
    <div className="step step-personal-info">
      <h2>Step 1: Personal Information</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => updateFormData("name", e.target.value)}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) => updateFormData("email", e.target.value)}
        required
      />
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default StepPersonalInfo;
