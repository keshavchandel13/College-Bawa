import React, { useState } from "react";

const suggestions = ["React", "Node.js", "DSA", "Figma", "MongoDB", "Firebase"];

const StepSkillsBio = ({ formData, updateFormData, onNext, onBack }) => {
  const [input, setInput] = useState("");

  const addSkill = () => {
    if (input && !formData.skills.includes(input)) {
      updateFormData("skills", [...formData.skills, input]);
      setInput("");
    }
  };

  const removeSkill = (skill) => {
    updateFormData("skills", formData.skills.filter((s) => s !== skill));
  };

  return (
    <div className="step step-skills-bio">
      <h2>Step 3: Skills & Bio</h2>

      <textarea
        name="bio"
        placeholder="Short Bio"
        value={formData.bio}
        onChange={(e) => updateFormData("bio", e.target.value)}
        required
      />

      <div className="tag-input">
        <input
          type="text"
          placeholder="Add a skill"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
        />
        <button onClick={addSkill}>Add</button>
        <div className="tag-suggestions">
          {suggestions
            .filter((s) => s.toLowerCase().includes(input.toLowerCase()) && !formData.skills.includes(s))
            .map((sug) => (
              <span key={sug} onClick={() => { setInput(sug); }}>
                {sug}
              </span>
            ))}
        </div>
      </div>

      <div className="tag-preview">
        {formData.skills.map((skill, i) => (
          <span key={i} className="tag">
            {skill} <button onClick={() => removeSkill(skill)}>×</button>
          </span>
        ))}
      </div>

      <div className="step-buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default StepSkillsBio;
