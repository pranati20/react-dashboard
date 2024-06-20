import React from 'react';
import { useCSVReader } from 'react-papaparse';

const CsvUpload = ({ onDataLoad }) => {
  const { CSVReader } = useCSVReader();

  const handleOnFileLoad = (data) => {
    onDataLoad(data.map(row => row.data));
  };

  return (
    <CSVReader onUploadAccepted={handleOnFileLoad}>
      {({ getRootProps, acceptedFile }) => (
        <div>
          <button type="button" {...getRootProps()}>
            Browse file
          </button>
          {acceptedFile && <span>{acceptedFile.name}</span>}
        </div>
      )}
    </CSVReader>
  );
};

export default CsvUpload;
