import { useEffect, useState } from 'react'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

// Define the type for API response items
interface Opportunity {
  company_name: string;
}

function Hello() {
  const [opportunities, setOpportunities] = useState([]);
  const baseUrl = "https://api.copper.com/developer_api/v1/";
  const apiToken = "";
  const apiEmail = "mschoessling@irishangels.com";
  const headers = {
    "X-PW-AccessToken": apiToken,
    "X-PW-Application": "developer_api",
    "X-PW-UserEmail": apiEmail,
    "Content-Type": "application/json"
  };

  //useEffect( () => {
    const fetchData = async () => {
      console.log('Got here on app start');
      const listOpportunitiesUrl = baseUrl + 'opportunities/search';
      let pageNumber = 1;

      while (true)
      {
        const body = JSON.stringify({
          page_size: 200,
          page_number: pageNumber
        });

        try {
          // Make the GET request
          const response = await fetch(listOpportunitiesUrl, {
            method: 'POST',
            headers: headers,
            body: body
          });

          // Check if the response was successful
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          // Parse JSON response
          const data = await response.json();
          const filteredOpps = data.map((opp: Opportunity) => opp.company_name).filter((opp: string) => opp != null);
          setOpportunities(filteredOpps);
          console.log('Opportunities:', filteredOpps);
          if (filteredOpps.length == 0)
            break;
          else
            console.log('Count: ', pageNumber);
          
          pageNumber++;

          // Handle data (e.g., export to Excel)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } 
    }

   // fetchData();

  //});

  const handleDocsClick = async () => {
    console.log('Export button clicked!');

    // API credentials
    const oppEndpoint = "/opportunities/33675544";

    // Construct API URL
    const apiOppUrl = `${baseUrl}${oppEndpoint}`;

    try {
      // Make the GET request
      const response = await fetch(apiOppUrl, {
        method: 'GET',
        headers: headers
      });

      // Check if the response was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse JSON response
      const data = await response.json();
      console.log('API Response:', data);

      // Handle data (e.g., export to Excel)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>IrishAutomate</h1>
      <div className="Hello">
        <button type="button" onClick={handleDocsClick}>
          <span role="img" aria-label="books">
            📚
          </span>
          Read our docs ok
        </button>
        <button type="button" onClick={fetchData}>
          <span role="img" aria-label="folded hands">
            🙏
          </span>
          Donate
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
