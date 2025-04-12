import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import './App.css';
import Select from 'react-select';
import Sidebar from './Sidebar';
import LoadingIndicator from './Loading';
import { baseUrl, headers} from '../helpers/constants';
import { 
  SelectOption, 
  Opportunity, 
  Stage, 
  Industry, 
  CustomField, 
  Person, 
  OpportunityCustomField 
} from '../helpers/types';

function Hello() {
  const [selectOpps, setSelectOpps] = useState<SelectOption[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity>();
  const [stages, setStages] = useState<Stage[]>([]);
  const [stage, setStage] = useState<Stage>();
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [industry, setIndustry] = useState<string>('');
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [customFieldsDict, setCustomFieldsDict] = useState<Record<number, CustomField>>();
  const [contact, setContact] = useState<Person>();
  const [debug1, setDebug1] = useState<string>('');
  const [debug2, setDebug2] = useState<string>('');
  const [debug3, setDebug3] = useState<string>('');
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
      const data = await response.json() as Opportunity;

      // Get Primary Contact Info
      const apiContactUrl = `${baseUrl}/people/${data.primary_contact_id}`;
      const contactResponse = await fetch(apiContactUrl, {
        method: 'GET',
        headers: headers
      });
      const contactData = await contactResponse.json() as Person;

      setSelectedOpportunity(data);
      setStage(stages?.find(stage => stage.id == data.pipeline_stage_id));
      const oppsIndustryIds = data.custom_fields.find((cf: OpportunityCustomField) => cf.custom_field_definition_id == 648465)?.value;
      setIndustry(oppsIndustryIds.map((id: number) => industries.find(ind => ind.id == id)?.name).join(', '));

      // Find contact's work email or first email in their list
      const workEmails = contactData.emails.filter(e => e.category == 'work');
      contactData.email = workEmails.length > 0 ? workEmails[0].email : contactData.emails[0]?.email;
      console.log('Contact Data ', contactData);
      console.log('done');
      setContact(contactData);

      // Make dictionary of custom fields
      const customFieldsDict = customFields?.reduce((acc, cf) => {
        acc[cf.id] = cf;
        return acc;
      }, {} as Record<number, CustomField>);

      setCustomFieldsDict(customFieldsDict);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onExportOnePager = async () => {
    if (selectedOpportunity == undefined) return;

    let workbook = undefined;
    try {
      workbook = await window.electron.readOnePager(selectedOpportunity, customFieldsDict, contact);
    } catch(err){
      console.error('Error reading file:', err);
    };
  }

  return (
    <div>
      <Navbar 
        setSelectOpps={setSelectOpps} 
        setStages={setStages} 
        setIndustries={setIndustries} 
        setCustomFields={setCustomFields}
      />
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
              <button onClick={onExportOnePager}>Export One-Pager  ➚</button>
            </div>
            <div className='debug'>
              <label>Debug 1 - {debug1}</label>
              <label>Debug 2 - {debug2}</label>
              <label>Debug 3 - {debug3}</label>
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
