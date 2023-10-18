import React, { useState } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/fetchData'); // Replace with your Express API endpoint
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>iTunes Data Fetcher</h1>
      <button onClick={fetchData}>Fetch Data</button>
      {data && (
        <div>
          <h2>Fetched Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default DataFetcher;
