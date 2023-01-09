import React from "react";
import { SyncLoader } from "react-spinners";

function Loader({ loader }) {
  return (
    <div className="loader">
      <SyncLoader
        color={"red"}
        loading={loader}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
