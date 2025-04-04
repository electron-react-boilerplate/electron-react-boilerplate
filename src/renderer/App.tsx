import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import './App.css';
import Select from 'react-select';
import Sidebar from './Sidebar';
import LoadingIndicator from './Loading';
import configData from '../../assets/config.json';
import ExcelJS from 'exceljs';

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
  primary_contact_id: number;
  custom_fields: OpportunityCustomField[];
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

interface Person {
  id: number;
  name: string;
  emails: Email[];
  email: string = "";
}

interface Email {
  email: string;
  category: string;
}

const baseUrl = "https://api.copper.com/developer_api/v1/";
const apiToken = '';
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
    // const onePagerPath = '../../assets/One-Pager_template.xlsx';
    // const workbook = XLSX.readFile(onePagerPath);
    let workbook = undefined;
    try {
      workbook = await window.electron.readOnePager();
    } catch(err){
      console.error('Error reading file:', err);
    };
    // setDebug1(workbook == undefined ? 'Undefined #sad' : 'Good to go. Workbook is defined!!');
    // if (workbook == undefined)
    //   throw new Error('Workbook is not defined');
    // console.log(workbook);

    // const cell = sheet?.getCell('I2');
    // if (cell != undefined)
    // {
    //   console.log('Lets see cell value of I2: ', cell?.value);
    //   cell.value = 'Test value';
    // } else {
    //   console.log('cell was undefined')
    // }

    // Export Basic Company Info
    // for (const [key, val] of Object.entries(configData.opportunity)) {
    //     XLSX.utils.sheet_add_aoa(workbook.Sheets[val.sheet], [[selectedOpportunity[key as keyof Opportunity]]], { origin: val.cell});
    // }
    // console.log('The I5 value: ', workbook.Sheets['Overall']['I5'].v)
    // setDebug2(workbook.Sheets['Overall']['I5'].v);
    
    // let opp_city = '';
    // let opp_state = '';

    // if (customFieldsDict == undefined)
    //   throw new Error('Custom Field Dictionary was not created correctly. Make sure config is properly set');

    // // Export Copper Custom Fields 
    // for (const customField of selectedOpportunity.custom_fields) {
    //   const customFieldConfigData = customFieldsDict[customField.custom_field_definition_id];

    //   if (!(customFieldConfigData.name in configData.custom_opp_fields))
    //     continue
    //   const excelInfo = configData.custom_opp_fields[customFieldConfigData.name as keyof object]
    //   const optionsDict = customFieldConfigData.options?.reduce((acc, opt) => {
    //     acc[opt.id] = opt;
    //     return acc;
    //   }, {} as Record<number, Option>)

    //   if (customFieldConfigData.id == 327449) {
    //     opp_city = customField.value;
    //   }
    //   else if (customFieldConfigData.id == 327711) {
    //     opp_state = customField.value;
    //   }
    //   else if (['Text', 'String', 'Currency'].includes(customFieldConfigData.data_type)) {
    //     XLSX.utils.sheet_add_aoa(workbook.Sheets[excelInfo['sheet']], [[customField.value]], { origin: excelInfo['cell']});
    //   }
    //   else if (customFieldConfigData.data_type == 'MultiSelect') {
    //     if (optionsDict == undefined)
    //       continue;
    //     const selections = customField.value.map((opt: number) => optionsDict[opt])
    //                                          .sort((a: Option,b: Option) => a.rank - b.rank)
    //                                          .map((opt: Option) => opt.name)
    //                                          .join(', ');
    //     XLSX.utils.sheet_add_aoa(workbook.Sheets[excelInfo['sheet']], [[selections]], { origin: excelInfo['cell']});
    //   }
    //   else if (customFieldConfigData.data_type == 'Dropdown') {
    //     if (optionsDict == undefined)
    //       continue;
    //     XLSX.utils.sheet_add_aoa(workbook.Sheets[excelInfo['sheet']], [[optionsDict[customField.value].name]], { origin: excelInfo['cell']});
    //   }
    // }

  //   // Set Location Value
  //   const locationExcelInfo = configData.custom_opp_fields['Location'];        
  //   XLSX.utils.sheet_add_aoa(workbook.Sheets[locationExcelInfo['sheet']], [[`${opp_city}, ${opp_state}`]], { origin: locationExcelInfo['cell']});

  //   // Get Primary Contact Info
  //   for (const [key, val] of Object.entries(configData.primary_contact)) {
  //     if (contact == undefined)
  //       continue;
  //     XLSX.utils.sheet_add_aoa(workbook.Sheets[val.sheet], [[contact[key as keyof Person]]], { origin: val.cell});
  // }

    // Write the updated Excel file
    // try {
    //   // const writtenFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    //   // const testWorkbookValues = XLSX.read(writtenFile, { type: 'buffer' });
    //   // console.log('test written: ', testWorkbookValues.Sheets['Overall']['J2']?.v);
    //   // console.log(testWorkbookValues.Sheets);
    //   // setDebug3(testWorkbookValues.Sheets['Overall']['J2']?.v)
    //   await window.electron.writeOnePager(workbook);
    // } catch (err: any) {
    //   throw new Error('New Error in writing: ', err);
    // }
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
