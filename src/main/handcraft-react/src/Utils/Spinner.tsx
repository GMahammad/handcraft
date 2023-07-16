import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
const Spinner = () => {
  return (
    <div className="container text-center my-5">
      <PropagateLoader color="rgb(173, 166, 100)" />
    </div>
  );
};

export default Spinner;
