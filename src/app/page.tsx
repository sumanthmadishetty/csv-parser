'use client';

import { useRef, useState } from 'react';
import CsvTable from './components/CsvTable';
import Button from './components/Button';
import { isValidCsv } from './utils';
import Divider from './components/Divider';

const Page = () => {
  const [csvData, setCsvData] = useState([]);
  const [isCsvValid, setIsCsvValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const textAreaRef = useRef(null) as any;

  const handleInputChange = (event) => {
    const text = event.target.value;

    // Check if the input size exceeds 1MB (1,048,576 bytes)
    const textSizeInBytes = new Blob([text]).size;

    if (textSizeInBytes > 1048576) {
      setCsvData([]);
      setIsCsvValid(false);
      setErrorMessage('The input exceeds the 1MB size limit. Please provide a smaller file.');
      return;
    }

    if (isValidCsv(text)) {
      const rows = text.split('\n');
      const parsedData = rows.map((row) => row.split(/[,\t]/));
      setCsvData(parsedData);
      setIsCsvValid(true);
      setErrorMessage(''); // Clear error message
    } else {
      setCsvData([]);
      setIsCsvValid(false);
      setErrorMessage('Invalid CSV or TSV format. Please check your input.');
    }
  };
  

  function handleReset() {
    setCsvData([]); // Clear CSV data state
    if (textAreaRef.current) {
      textAreaRef.current.value = ''; // Reset textarea value to an empty string
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <div className='csv_text_box_container' style={{ maxHeight: '' }}>
        <textarea
          ref={textAreaRef}
          style={{ height: "100%" }}
          placeholder="Paste your CSV or TSV data here..."
          onChange={handleInputChange}
          // style={{ marginBottom: '20px', width: '100%' }}
        />
        <Button onClick={handleReset}>Reset</Button>
      </div>
      {!isCsvValid && (
        <p style={{ color: 'red', marginBottom: '20px' }}>{errorMessage}</p>
      )}
      <Divider />
       {isCsvValid && csvData.length > 0 && (
        <div style={{ marginTop: "50px" }}>
        <CsvTable data={csvData} setData={setCsvData} />
        </div>
      )}
    </div>
  );
};

export default Page;
