import React, { useRef } from "react";
import "./SearchBar.css";
// import { useRouter } from "next/navigation";
// import toast, { Toaster } from "react-hot-toast";

const SearchBar = ({ placeholder = "", onSearch = () => {} }) => {
  //
  // const [search, setSearch] = useState("");
  const search = useRef("");

  //
  return (
    <form className="search-form">
      {/* <Toaster /> */}
      <div className="search-div">
        <input
          ref={search}
          type="text"
          id="search"
          name="search"
          className="search-input"
          placeholder={placeholder}
          required
        />
        <button
          type="button"
          className="search-btn"
          onClick={() => onSearch(search.current?.value)}
        >
          search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
