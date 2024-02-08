import React from "react";

const RightLightArrow = (props) => {
  return (
    <svg
      style={{ width: props.style?.width ? props.style.width : ".8rem" }}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 16"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14.153 15 19 8l-4.847-7H1l4.848 7L1 15h13.153Z"
      />
    </svg>
  );
};

export default RightLightArrow;
