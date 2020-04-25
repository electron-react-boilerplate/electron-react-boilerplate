import { OutputField } from "./tg_output_field";

export class OutputMessageBuilder {
    servedMessageCount: number = 0;
    fields: Array<OutputField> = new Array();
    field_sepearator: string = ','; // TODO default sepetator
    global_seperator: string;
    formatted_string: string = "";
    parsed_fields: Map<string, OutputField> = new Map();

    constructor(globalSeperator: string) {
        this.global_seperator = globalSeperator;

    }

    addField(field: OutputField) {
        this.fields.push(field);
    }

    overrideFieldValue(fieldName: string, fieldValue: string) {
        const field = this.getFieldByName(fieldName);
        field.overrideParsedValue(fieldValue);
    }

    getFieldByName(fieldName: string): OutputField {
        const field: any = this.parsed_fields.get(fieldName)
        if (field == undefined) {
            console.error(`OutputMessage ::getFieldByName field-${fieldName} not found`);
        }
        return field;
    }

    increseServedMessageCount() {
        this.servedMessageCount++;
    }

    getServedMessageCount() {
        return this.servedMessageCount;
    }

    getFormatedString() {
        
        return this.formatted_string;
    }

    generateFormatedString(){
        let str = ''
        for (const field of this.fields) {
            const element = field.getFieldAsStr();
            if (field.is_first == false) {
                // if ((field.is_empty_valid == true) ||
                //     (field.is_empty_valid == false && element)

               // ) {
                    str += this.global_seperator;

              //  }
            }
            str += element ? element : ''
        }
        this.formatted_string = str;
    }

    actionBeforeGenerateString(signal: string) {
        this.parsed_fields.clear();
        for (const field of this.fields) {
            field.parse(signal);
            this.parsed_fields.set(field.field_name, field);
        }
    }
    setFormatedString(text: string) {
        this.formatted_string = text;
    }

    sendFormattedString(): string {
        this.increseServedMessageCount();
        return this.getFormatedString();
    }

}