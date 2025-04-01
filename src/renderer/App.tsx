import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import './App.css';
import Select from 'react-select';
import Sidebar from './Sidebar';
import LoadingIndicator from './Loading';

interface SelectOption {
  value: number;  // or string if you have string IDs
  label: string;
}

interface OpportunityCustomField {
  custom_field_definition_id: number;
  value: any;
}

interface Option {
  id: number;
  name: string;
  rank: number;
}

interface CustomField {
  id: number;
  name: string;
  data_type: string;
  available_on: string[];
  is_filterable: boolean;
  currency: string[] | undefined;
  options: Option[] | undefined;
}

interface Opportunity {
  id: number;
  company_name: string;
  details: string;
  pipeline_stage_id: number;
  primary_contact_d: number;
  custom_fields: CustomField[];
}

interface Stage {
  id: number;
  name: string;
}

interface Industry {
  id: number;
  name: string;
  rank: number;
}

const baseUrl = "https://api.copper.com/developer_api/v1/";
const apiToken = window.env.COPPER_API_KEY;
const apiEmail = "mschoessling@irishangels.com";
const headers = {
  "X-PW-AccessToken": apiToken,
  "X-PW-Application": "developer_api",
  "X-PW-UserEmail": apiEmail,
  "Content-Type": "application/json"
};

function Hello() {
  const [selectOpps, setSelectOpps] = useState<SelectOption[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity>();
  const [stages, setStages] = useState<Stage[]>([]);
  const [stage, setStage] = useState<Stage>();
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [industry, setIndustry] = useState<string>('');

  const onOpportunitySelect = async (selectedOption: SelectOption) => {
    console.log('Opportunity Selected!');

    if (selectedOption == null) return;

    // API credentials
    const apiOppUrl = `${baseUrl}/opportunities/${selectedOption.value}`;

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

      // Get Primary Contact Info
      const apiContactUrl = `${baseUrl}/people/${data.primary_contact_id}`;
      const contactResponse = await fetch(apiContactUrl, {
        method: 'GET',
        headers: headers
      });
      const contactData = await contactResponse.json();
      console.log('Contact Data:', contactData);

      setSelectedOpportunity(data);
      setStage(stages?.find(stage => stage.id == data.pipeline_stage_id));
      const oppsIndustryIds = data.custom_fields.find((cf: OpportunityCustomField) => cf.custom_field_definition_id == 648465).value;
      setIndustry(oppsIndustryIds.map((id: number) => industries.find(ind => ind.id == id)?.name).join(', '));

      // Handle data (e.g., export to Excel)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <Navbar setSelectOpps={setSelectOpps} setStages={setStages} setIndustries={setIndustries}/>
      <div className="sidebar-body">
        <Sidebar />
        {selectOpps.length == 0
        ? <LoadingIndicator />
        :
          <div className="content">
            <div className="selector">
              <Select 
                options={selectOpps} 
                menuPortalTarget={document.body} 
                onChange={(selectedOption) => {
                    if (selectedOption) {
                        onOpportunitySelect(selectedOption);
                    }
                }}
                styles={{ 
                  menuPortal: base => ({ ...base, zIndex: 9999 }), 
                  control: base => ({ ...base, width: '300px', margin: '20px 0 0 0', borderColor: '#0C2340', '&:hover': {borderColor: '#0C2340'}, color: '#0C2340' }),
                  option: base => ({ ...base, color: '#0C2340', borderColor: '#0C2340'}),
                  placeholder: base => ({ ...base, color: '#0C2340'}),
                  indicatorSeparator: base => ({ ...base, backgroundColor: '#0C2340'}),
                  dropdownIndicator: base => ({ ...base, color: '#0C2340', '&:hover': {color: '#0C2340'}})
                }} 
              />
              <div className="horizontal-line" />
            </div>
            <div className="opportunity-info">
              <table>
                <tbody>
                  <tr>
                    <td className="col-title">Description</td>
                    <td className="col-title">Stage</td>
                    <td className="col-title">Industries</td>
                  </tr>
                  <tr>
                    <td className="cell-left">{selectedOpportunity?.details}</td>
                    <td className="cell-middle">{stage?.name}</td>
                    <td className="cell-right">{industry}</td>
                  </tr>
                  </tbody>
              </table>
              <div className="horizontal-line" />
            </div>
            <div className="button-class">
              <button>Export Summary</button>
            </div>
          </div>
        }
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
