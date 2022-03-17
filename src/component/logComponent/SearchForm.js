import React from "react";

const SearchForm = (props) => {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="firstInput">{props.title}</label>
        <input
          id="firstInput"
          onChange={(e) => props.onchangeFunction(e.target.value)}
        ></input>
      </div>
    </form>
  );
};

export default SearchForm;
