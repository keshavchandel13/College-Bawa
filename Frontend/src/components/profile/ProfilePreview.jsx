import React from "react";

const ProfilePreview = ({ formData }) => {
  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Live Preview
      </h3>

      <div className="bg-gray-50 dark:bg-[#111827] p-5 rounded-xl text-center">

        {formData.profileImage && (
          <img
            src={URL.createObjectURL(formData.profileImage)}
            className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
          />
        )}

        <h4 className="font-bold text-lg">
          {formData.name || "Your Name"}
        </h4>

        <p className="text-sm text-gray-500">
          {formData.email}
        </p>

        <p className="text-sm mt-1">
          {formData.college || "College"} • {formData.department || "Dept"}
        </p>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          {formData.bio || "Your bio will appear here"}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {formData.skills.map((skill, i) => (
            <span
              key={i}
              className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
