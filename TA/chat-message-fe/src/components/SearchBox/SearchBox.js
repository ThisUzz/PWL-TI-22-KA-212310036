import React from "react";

export default function SearchBox({ value, onChange }) {
  return (
    <div className="mb-2 xl:w-50 relative">
      {/* Icon search */}
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          />
        </svg>
      </span>

      {/* Input */}
      <input
        type="search"
        className="block w-full rounded border rounded-full border-neutral-400 bg-transparent px-10 py-[0.25rem] text-base leading-[1.6] text-neutral-900 outline-none transition duration-200 ease-in-out focus:border-black focus:shadow focus:outline-none"
        placeholder="Search Contact"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
