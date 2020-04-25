import { OUTPUT_FIELD_TYPE } from "./signal-utils";
import { LOG } from '../../utils/logger';
export class OutputField {
    field_name: string;
    field_seperator: string;
    is_first: boolean;
    is_empty_valid: boolean;
    type: OUTPUT_FIELD_TYPE;
    option_list: Array<string>;
    regex: string;
    value_positions: Array<number>;
    key_positions: Array<number>;
    value_mappings: Map<string, string>;

    parsed_str_value: string = "";

    constructor(fieldName: string, fieldSeperator: string = ',', type: string = '', optionList: Array<string> = [], regex: string = '', keyPositions: Array<number> = [], valuePositions: Array<number> = [], valueMappings: Map<string, string> = new Map(), isFirst: boolean = false, isEmptyValid: boolean = true) {
        this.field_name = fieldName;
        this.field_seperator = fieldSeperator;
        this.is_first = isFirst;
        this.is_empty_valid = isEmptyValid;
        if (type == "optinArgument")
            this.type = OUTPUT_FIELD_TYPE.OPTION_ARGUMENT;
        else if (type == "parameterArgument")
            this.type = OUTPUT_FIELD_TYPE.PARAMETER_ARGUMENT;
        else if (type == "transformedParameterArgument")
            this.type = OUTPUT_FIELD_TYPE.TRANFORMED_PARAMETER_ARGUMENT;
        else if (type == "internalField")
            this.type = OUTPUT_FIELD_TYPE.INTERNAL_FIELD;
        else 
            this.type = OUTPUT_FIELD_TYPE.NONE;

        this.option_list = optionList;
        this.regex = regex;
        this.key_positions = keyPositions;
        this.value_positions = valuePositions;
        this.value_mappings = valueMappings;
    }

    parse(signal: string): string {
        let str: string = '';
        if (this.type == OUTPUT_FIELD_TYPE.OPTION_ARGUMENT) {
            const spaceSplitokens = signal.split(' ');
            for (const token of spaceSplitokens) {
                if (this.option_list.includes(token.toLocaleUpperCase())) {
                    if (this.is_first == false && str !== '') {
                        str += this.field_seperator;
                    }
                    str += token.toLocaleUpperCase();
                }
            }
        } else if (this.type == OUTPUT_FIELD_TYPE.PARAMETER_ARGUMENT) {
            str += this.parseParameterArguments(signal);

        } else if (this.type == OUTPUT_FIELD_TYPE.TRANFORMED_PARAMETER_ARGUMENT) {
            str += this.parseTransformedParameterArguments(signal);
        } else if (this.type == OUTPUT_FIELD_TYPE.INTERNAL_FIELD) {
            str += this.parseParameterArguments(signal);
        } else {
            LOG.debug(`OutputField::parse valid type not defined field-${this.field_name}`)
        }

        this.parsed_str_value = str.replace(" ", "").replace("\n","").replace("\n",""); //RIMASH CHECK

        return  this.parsed_str_value; //TODO remove return and update tests
    }

    parseParameterArguments(signal: string): string {
        let str = '';
        const tokens = signal.match(this.regex);
        if (tokens != undefined) {
            let isFirst = true;
            for (const token of tokens) {
                const splitTokens = token.split(' ');
                for (let splitTokenIndex = 0; splitTokenIndex < splitTokens.length; splitTokenIndex++) {
                    if (this.value_positions.includes(splitTokenIndex)) {
                        const tokenValue = splitTokens[splitTokenIndex]
                        if (tokenValue !== undefined && tokenValue !== '') {
                            if (isFirst == false) {
                                str += this.field_seperator;
                            }
                            isFirst = false;
                            str += tokenValue;
                        }

                    }
                }
            }

        } else {
           LOG.debug(`OutputField::parse match not found for field-${this.field_name}`)
        }
        return str;
    }

    parseTransformedParameterArguments(signal: string, isTransformed: boolean = false): string {
        let str = '';
        let key = '';
        const keyArray = new Array<string>();
        const valueArray = new Array<string>();
        let transformedStr = '';

        const tokens = signal.match(this.regex);
        if (tokens != undefined) {
            let isFirst = true;
            let isFirstKey = true;
            let isFirstTransformed = true;
            for (const token of tokens) {
                const splitTokens = token.split(' ');
                for (let splitTokenIndex = 0; splitTokenIndex < splitTokens.length; splitTokenIndex++) {
                    if (this.value_positions.includes(splitTokenIndex)) {
                        const tokenValue = splitTokens[splitTokenIndex]
                        if (tokenValue !== undefined && tokenValue !== '') {
                            if (isFirst == false) {
                                str += ' ';
                            }
                            isFirst = false;
                            str += tokenValue;
                            valueArray.push(tokenValue);
                        }
                    } else if (this.key_positions.includes(splitTokenIndex)) {
                        const tokenValue = splitTokens[splitTokenIndex]
                        if (tokenValue !== undefined && tokenValue !== '') {
                            if (isFirstKey == false) {
                                key += ' ';
                            }
                            isFirstKey = false;
                            key += tokenValue;
                            keyArray.push(tokenValue);
                        }
                    }
                    else {

                    }
                }
                // console.log("key ", keyArray)
                // console.log("value ", valueArray)
                if(isFirstTransformed == false) {
                    transformedStr += this.field_seperator;
                }
                isFirstTransformed = false;
                transformedStr += this.getTransformedValue(key, str);
            }

        } else {
            LOG.debug(`OutputField::parse match not found for field-${this.field_name}`)
        }
        return transformedStr;
    }

    getTransformedValue(key: string, sourceValue: string): (string| undefined) {    
        key = key.toLocaleUpperCase();
        sourceValue  = sourceValue.toLocaleUpperCase();
        const valueMap: any = this.value_mappings.get(key);
        if (valueMap !== undefined) {
            if(valueMap[sourceValue] !== undefined) {
                return valueMap[sourceValue];
            } else {
                LOG.debug(`OutputField::getTransformedValue Mappings for source value-${sourceValue} of key-${key} not provided in the parser`)
            }
        } else {
            LOG.debug(`OutputField::getTransformedValue Mappings for key-${key} not provided in the parser`)
        }
        return sourceValue.split(' ').pop();
    }

    getFieldAsStr(): string{

        return this.parsed_str_value;
    }

    overrideParsedValue(fieldValue: string){
        this.parsed_str_value = fieldValue;
    }
}

// if(isTransformed == true){
//     if(this.value_mappings.has(tokenValue)) {
//         value = this.value_mappings[tokenValue]
//     } else {
//         LOG.debug(`OutputField::parseParameterArguments Mappings for field-${tokenValue} not provided in the parser`)
//     }
// }
// let isFirstFieldToken = true;
//                 for (const token of tokens) {
//                     const spaceSplitokens = token.split(' ');
//                     let isFirst = true;
//                     for (let matchTokenIndex = 0; matchTokenIndex < spaceSplitokens.length; matchTokenIndex++) {

//                         if (this.valuePositions.includes(matchTokenIndex)) {
//                             const value = spaceSplitokens[matchTokenIndex];

//                             if ((this.is_empty_valid == true) ||
//                                 (this.is_empty_valid == false && value)) {
//                                 console.log('sl ', this.field_name, this.is_empty_valid, token)
//                                 if (isFirstFieldToken == false) {
//                                     str += this.field_seperator;
//                                 }
//                             }

//                             isFirstFieldToken = false;
//                             if (value !== undefined && value !== '') {
//                                 if (isFirst == false) {
//                                     str += ' ';
//                                 }
//                                 isFirst = false;
//                                 str += value.toLocaleUpperCase();
//                             }
//                         }
//                     }