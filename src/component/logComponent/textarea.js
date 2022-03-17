import React from "react";

const TextArea = (props) => {
  const { errorData } = props;
  return (
    <textarea
      className="form-control textsize"
      rows={200}
      value={errorData}
      readOnly
    ></textarea>
  );
};

export default TextArea;
