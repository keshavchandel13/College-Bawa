import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import StepPersonalInfo from "../components/profile/StepPersonalInfo";
import StepCollegeInfo from "../components/profile/StepCollegeInfo";
import StepSkillsBio from "../components/profile/StepSkillsBio";
import StepProfileImage from "../components/profile/StepProfileImage";
import ProfilePreview from "../components/profile/ProfilePreview";
import { submitUserProfile } from "../api/profile";


const AddUserProfile = ({ onEditClick }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setmessage] = useState()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    department: "",
    bio: "",
    skills: [],
    profileImage: null,
  });

  const updateFormData = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleNext = () => setStep((p) => Math.min(p + 1, 4));
  const handleBack = () => setStep((p) => Math.max(p - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setMessage("Name & Email required");
      return;
    }

    try {
      setLoading(true);

      await submitUserProfile({
        ...formData,
        skills: formData.skills.join(","),
      });

      setMessage("Profile submitted successfully!");
      onEditClick();
    } catch {
      setMessage("Error submitting profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 
      bg-gradient-to-br from-gray-50 to-gray-100 
      dark:from-[#0f172a] dark:to-[#111827]">

      <div className="w-full max-w-3xl bg-white dark:bg-[#1f2937] 
        rounded-2xl shadow-xl p-6 relative">

        {/* Close */}
        <IoIosCloseCircleOutline
          onClick={onEditClick}
          className="absolute right-4 top-4 text-3xl text-gray-400 hover:text-red-500 cursor-pointer"
        />

        {/* Progress */}
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
          <div
            className="h-2 bg-blue-500 rounded-full transition-all"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {step === 1 && <StepPersonalInfo {...{ formData, updateFormData, onNext: handleNext }} />}
        {step === 2 && <StepCollegeInfo {...{ formData, updateFormData, onNext: handleNext, onBack: handleBack }} />}
        {step === 3 && <StepSkillsBio {...{ formData, updateFormData, onNext: handleNext, onBack: handleBack }} />}
        {step === 4 && (
          <StepProfileImage
            {...{ formData, updateFormData, onBack: handleBack }}
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}

        <ProfilePreview formData={formData} />

        {message && (
          <p className="text-center mt-4 text-sm text-green-500 dark:text-green-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddUserProfile;
