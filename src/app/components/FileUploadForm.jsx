import React from "react";
import CSVReader from "react-csv-reader";

const FileUploadForm = ({ onFileLoaded }) => {
  return (
    <div>
      <label htmlFor="">Upload CSV File</label>
      <CSVReader
        onFileLoaded={onFileLoaded}
        inputStyle={{
          display: "block",
          margin: "5px 0px",
          padding: "10px",
          border: "1px solid gray",
          borderRadius: "4px",
        }}
      />
    </div>
  );
};

export default FileUploadForm;
