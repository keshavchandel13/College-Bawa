import React from "react";

const StepCollegeInfo = ({ formData, updateFormData, onNext, onBack }) => {
  return (
    <div className="step step-college-info">
      <h2>Step 2: College Details</h2>
      <input
        type="text"
        name="college"
        placeholder="College Name"
        value={formData.college}
        onChange={(e) => updateFormData("college", e.target.value)}
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={(e) => updateFormData("department", e.target.value)}
        required
      />
      <div className="step-buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default StepCollegeInfo;
