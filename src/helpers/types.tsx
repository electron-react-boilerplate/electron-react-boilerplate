export interface SelectOption {
    value: number;  
    label: string;
}

export interface OpportunityCustomField {
    custom_field_definition_id: number;
    value: any;
}

export interface Option {
    id: number;
    name: string;
    rank: number;
}

export interface CustomField {
    id: number;
    name: string;
    data_type: string;
    available_on: string[];
    is_filterable: boolean;
    currency: string[] | undefined;
    options: Option[] | undefined;
}

export interface Opportunity {
    id: number;
    company_name: string;
    details: string;
    pipeline_stage_id: number;
    primary_contact_id: number;
    custom_fields: OpportunityCustomField[];
}

export interface Stage {
    id: number;
    name: string;
}

export interface Industry {
    id: number;
    name: string;
    rank: number;
}

export interface Person {
    id: number;
    name: string;
    emails: Email[];
    email: string;
}

export interface Email {
    email: string;
    category: string;
}