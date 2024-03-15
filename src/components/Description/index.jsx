import React, { useEffect, useRef, useState } from "react";
import "./Description.css";

const Description = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayReadBtn, setDisplayReadBtn] = useState(false);

  var paragraphStyle = {
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    display: "-webkit-box",
  };

  var paraRef = useRef(null);

  useEffect(() => {
    if (paraRef.current) {
      setDisplayReadBtn(
        paraRef.current.scrollHeight !== paraRef.current.clientHeight
      );
    }
  }, []);

  return (
    <>
      <p
        style={isOpen ? null : paragraphStyle}
        className="description-para"
        ref={paraRef}
      >
        {props.children}
      </p>

      {displayReadBtn && (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="read-more-btn"
        >
          {isOpen ? "read less..." : "read more..."}
        </button>
      )}
    </>
  );
};

export default Description;
