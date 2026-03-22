// src/styles/authClasses.js
// Shared Tailwind class strings for auth pages — import where needed

export const authCardBase = `
  bg-transparent
  p-[30px] rounded-xl text-center
  w-[350px] max-w-full
  mr-[4%] ml-auto
  relative
  border border-white/25
  shadow-[0_15px_30px_rgba(0,255,255,0.3),0_20px_40px_rgba(255,0,255,0.25)]
  [transform:perspective(1200px)_rotateX(6deg)_rotateY(-6deg)_rotateZ(1deg)]
  transition-all duration-400 ease-in-out
  hover:[transform:perspective(1200px)_rotateX(3deg)_rotateY(-3deg)_rotateZ(0deg)_translateY(-10px)]
  hover:shadow-[0_18px_40px_rgba(0,255,255,0.4),0_22px_50px_rgba(255,0,255,0.35),inset_0_5px_15px_rgba(255,255,255,0.15)]
  after:content-[''] after:absolute after:bottom-[-18px] after:left-1/2
  after:w-[90%] after:h-[14px]
  after:bg-black/90 after:rounded-full
  after:-translate-x-1/2 after:blur-[10px] after:opacity-70
  max-lg:mx-auto max-lg:w-[90%] max-lg:max-w-[400px] max-lg:[transform:none]
`;

export const authInputBase = `
  w-full px-3 py-3 my-2.5 rounded-md
  border border-white/40
  bg-black/30 text-white
  placeholder-white/60
  transition-all duration-300 ease-in-out
  focus:outline-none focus:border-cyan-400
  focus:shadow-[0_5px_15px_rgba(0,255,255,0.5)]
`;

export const authButtonBase = `
  w-full py-3 text-base rounded-md border-none cursor-pointer
  text-white font-medium
  shadow-[0_7px_18px_rgba(0,0,0,0.6),0_5px_20px_rgba(0,255,255,0.4),0_6px_22px_rgba(255,0,255,0.3)]
  hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(0,255,255,0.5),0_12px_28px_rgba(255,0,255,0.4)]
  active:translate-y-0.5 active:shadow-[0_3px_8px_rgba(0,0,0,0.4)]
  transition-all duration-300
`;

export const authHeadingBase = `
  text-2xl mb-5 text-white
  [text-shadow:0px_2px_8px_rgba(255,255,255,0.15)]
`;

export const authLinkBase = `text-white/70 no-underline hover:text-cyan-400 transition-colors duration-300`;
export const authPageBase = `flex justify-end items-center h-screen bg-cover bg-center max-lg:justify-center`;