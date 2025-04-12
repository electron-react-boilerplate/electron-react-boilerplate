import React, { useState, useEffect } from 'react';
import { baseUrl, headers} from '../helpers/constants';
import { SelectOption, Stage, Industry, CustomField, Opportunity } from '../helpers/types'
import './App.css';

interface NavbarProps {
    setSelectOpps: React.Dispatch<React.SetStateAction<SelectOption[]>>;
    setStages: React.Dispatch<React.SetStateAction<Stage[]>>;
    setIndustries: React.Dispatch<React.SetStateAction<Industry[]>>;
    setCustomFields: React.Dispatch<React.SetStateAction<CustomField[]>>;
}

function Navbar(props: NavbarProps) {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const listOpportunitiesUrl = baseUrl + 'opportunities/search';
            const apiStageUrl = `${baseUrl}/pipeline_stages`;
            const apiIndustriesUrl = `${baseUrl}/custom_field_definitions/648465`;
            const customFieldsUrl = `${baseUrl}/custom_field_definitions`;
            let allCompanies: Opportunity[] = [];
            const totalPages = 50; // No efficient way to get total opportunities in Copper, so use total pages > actual total pages
        
            try {
            const requests = Array.from({ length: totalPages}, (_, i) =>
                fetch(listOpportunitiesUrl, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({ page_size: 200, page_number: i + 1 }),
                }).then((res) => res.json())
            );

            const stageResponse = await fetch(apiStageUrl, {
                method: 'GET',
                headers: headers
            });

            const industriesResponse = await fetch(apiIndustriesUrl, {
                method: 'GET',
                headers: headers
            });

            const customFieldsResponse = await fetch(customFieldsUrl, {
                method: 'GET',
                headers: headers
            });
        
            const results = await Promise.all(requests);
            
            const companies: Opportunity[] = results.flatMap((result) => 
                result.map((opp: Opportunity) => ({ id: opp.id, company_name: opp.company_name })) // returning Opportunity objects
            ).filter(opp => opp.company_name != null);
            const stageData = await stageResponse.json();
            const industriesData = await industriesResponse.json();
            const customFieldsData = await customFieldsResponse.json() as CustomField[];
            setOpportunities(companies);
            props.setSelectOpps(companies.map(opp => ({value: opp.id, label: opp.company_name})))
            props.setStages(stageData);
            props.setIndustries(industriesData.options);
            props.setCustomFields(customFieldsData);
            } catch (error) {
            console.log('Error: ', error);
            }
        }

        if (opportunities.length == 0)
            fetchData()
    });

    return (
        <div className="navbar">
            <h1>IrishAngels</h1>
            {/* <button type="button" onClick={fetchData}>
                Update Opportunities
            </button> */}
        </div>
    )
}

export default Navbar;