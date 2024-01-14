import React, { useState } from "react";
import "./SearchBar.css";
// import { useRouter } from "next/navigation";
// import toast, { Toaster } from "react-hot-toast";

const SearchBar = ({ placeholder = undefined, label = undefined }) => {
  //
  const [search, setSearch] = useState("");

  //
  return (
    <form className="search-form">
      {/* <Toaster /> */}
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-orange-900 sr-only"
      >
        {label}
      </label>
      <div className="search-div">
        <input
          type="text"
          id="search"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="search-input"
          placeholder={placeholder}
          required
        />
      </div>
    </form>
  );
};

export default SearchBar;
