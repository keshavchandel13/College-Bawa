import React, { useState } from "react";

const MobileDrawer = ({ children, buttonLabel = "Menu" }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="sm:hidden px-3 py-2 bg-blue-600 text-white rounded"
        onClick={() => setOpen(true)}
      >
        {buttonLabel}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30">
          <div className="absolute top-0 left-0 bg-white h-full w-3/4 p-4">
            <button
              className="mb-4 text-sm text-red-500"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileDrawer;