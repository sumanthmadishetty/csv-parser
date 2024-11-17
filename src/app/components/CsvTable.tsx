'use client';

import { useState } from 'react';

const CsvTable = ({ data, setData }) => {
  const [editedData, setEditedData] = useState(data);

  const handleEdit = (rowIndex, colIndex, value) => {
    const updatedData = [...editedData];
    updatedData[rowIndex][colIndex] = value;
    setEditedData(updatedData);
  };

  const handleDownload = () => {
    const csvContent = editedData.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'edited_data.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '20px',
        }}
      >
        <thead>
          <tr>
            {editedData[0].map((header, index) => (
              <th
                key={index}
                style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  background: '#f4f4f4',
                  fontWeight: 'bold',
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {editedData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                  }}
                >
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) =>
                      handleEdit(rowIndex + 1, colIndex, e.target.value)
                    }
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleDownload}
        style={{
          padding: '10px 20px',
          background: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Download Edited CSV
      </button>
    </div>
  );
};

export default CsvTable;
