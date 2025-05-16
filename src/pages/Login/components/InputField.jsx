import React from "react";

const InputField = ({ label, type = "text", placeholder , icon}) => {
  return (
    <div className="flex flex-col">
      <p className="text-xs font-bold text-side-text">{label}</p>

      <div className="border-2 border-black py-1.5 px-3 flex items-center border-border rounded-full">
        <img 
        className="h-5 w-5"
        src={icon} alt="" />
        <input
        className="flex-grow h-[35px] px-[8px] focus:outline-none placeholder:text-sm"
        type={type}
        placeholder={placeholder}
        />
      </div>
      
    </div>
  );
}

export default InputField;