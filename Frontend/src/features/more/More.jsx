import React, { lazy, Suspense } from 'react';

const Logout = lazy(() => import('../auth/Logout'));
const LoadingSpinner = lazy(() => import('../../components/globalComponent/LoadingSpinner'));

export default function More() {
  return (
    <div className="
      max-w-[500px] mx-auto mt-10 p-6
      bg-white dark:bg-[#1f2937]
      rounded-2xl
      shadow-[0_15px_35px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)]
      font-[Segoe_UI,Tahoma,Geneva,Verdana,sans-serif]
    ">
      <h2 className="text-[1.8rem] font-semibold text-[#333] dark:text-gray-100 mb-5 text-center">
        More Options
      </h2>

      <ul className="list-none p-0 m-0">
        {/* Regular items */}
        {["Profile Settings", "Notification Settings", "Privacy", "Help & Support"].map((label) => (
          <li
            key={label}
            className="
              flex items-center gap-3
              px-[18px] py-[14px] mb-3 rounded-xl
              bg-gradient-to-r from-[#f5f7fa] to-[#c3cfe2]
              dark:from-[#374151] dark:to-[#4b5563]
              text-[#222] dark:text-gray-100
              text-base font-medium cursor-pointer
              transition-all duration-[250ms] ease-in-out
              hover:-translate-y-0.5
              hover:shadow-[0_10px_18px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_10px_18px_rgba(0,0,0,0.5)]
              hover:bg-gradient-to-r hover:from-[#e0eafc] hover:to-[#cfdef3]
              dark:hover:from-[#4b5563] dark:hover:to-[#6b7280]
            "
          >
            {label}
          </li>
        ))}

        {/* Logout item */}
        <li className="
          flex items-center justify-center
          px-[18px] py-[14px] mb-3 rounded-xl
          bg-gradient-to-r from-[#ff758c] to-[#ff7eb3]
          hover:from-[#ff5f6d] hover:to-[#ffc371]
          text-white font-bold cursor-pointer
          transition-all duration-[250ms] ease-in-out
          hover:-translate-y-0.5
          hover:shadow-[0_10px_18px_rgba(0,0,0,0.15)]
          [&_button]:bg-transparent [&_button]:border-none [&_button]:text-white [&_button]:font-bold [&_button]:text-base [&_button]:cursor-pointer
        ">
          <Suspense fallback={<LoadingSpinner />}>
            <Logout />
          </Suspense>
        </li>
      </ul>
    </div>
  );
}