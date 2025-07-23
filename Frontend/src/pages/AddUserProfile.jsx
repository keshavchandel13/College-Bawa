import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import StepPersonalInfo from "../components/profile/StepPersonalInfo";
import StepCollegeInfo from "../components/profile/StepCollegeInfo";
import StepSkillsBio from "../components/profile/StepSkillsBio";
import StepProfileImage from "../components/profile/StepProfileImage";
import ProfilePreview from "../components/profile/ProfilePreview";
import "../styles/homepage/addUserProfile.css";
import { submitUserProfile } from "../api/profile";

const AddUserProfile = ({ onEditClick }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    department: "",
    bio: "",
    skills: [],
    profileImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Convert skills array to comma-separated string before submission
      const preparedFormData = {
        ...formData,
        skills: formData.skills.join(","),
      };

      const response = await submitUserProfile(preparedFormData);
      setMessage("Profile submitted successfully!");
      console.log("API response:", response);

      setLoading(false);
      onEditClick(); // Close the form
    } catch (err) {
      setMessage("Error submitting profile.");
      setLoading(false);
    }
  };

  return (
    <div className="multi-step-form__container">
      <IoIosCloseCircleOutline
        className="multi-step-form__close-icon"
        onClick={onEditClick}
        title="Close"
      />

      <div className="multi-step-form__progress">
        <div
          style={{ width: `${(step / 4) * 100}%` }}
          className="multi-step-form__progress-bar"
        />
      </div>

      {step === 1 && (
        <StepPersonalInfo
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <StepCollegeInfo
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <StepSkillsBio
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 4 && (
        <StepProfileImage
          formData={formData}
          updateFormData={updateFormData}
          onBack={handleBack}
          onSubmit={handleFinalSubmit}
          loading={loading}
        />
      )}

      <ProfilePreview formData={formData} />

      {message && <p className="multi-step-form__message">{message}</p>}
    </div>
  );
};

export default AddUserProfile;
