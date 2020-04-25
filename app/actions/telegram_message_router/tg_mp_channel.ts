import { OutputField } from "./tg_output_field";
import { OutputMessageBuilder as OutputMessageBuilder } from "./tg_output_message_builder";
import {OutputMessage} from "./tg_output_message";
import { Utils, MSG_TYPE, getMessageType, UPDATE_TYPE, getMessageTypeName, getChannelName, getEnumFromOrderSide, isNumber } from "./signal-utils";
import { get } from 'lodash';
import { LOG } from '../../utils/logger';
import { TgMessageRouter } from "./tg_mp_router";
const config = require('config');
export class TgChannel {
    /**
     * 
     * @param channelId 
     * @param signalParser is a JSON file defined as per the FTB DSL definition, which will be 
     * used to parse messages of a particular channel
     */
    message_type_cache: Map<MSG_TYPE, OutputMessageBuilder> = new Map();
    content_location: string;
    message_id_location: string;
    private useParser: boolean = false;

    constructor(readonly channelId: number, readonly signalParser: any, readonly parent: TgMessageRouter) {
        if (signalParser != null) {
            this.useParser = true;
            this.validateSignalParser(signalParser);
            const messageDefs = signalParser.messageDefs;
            const fieldAccesors = signalParser.fieldAccesors;

            for (const messageDef of messageDefs) {
                this.validateMessageDef(messageDef);
                const messageName = messageDef.messageName;
                const globalSeperator = messageDef.globalSeperator;
                const fields = messageDef.fields;

                const outputMessage = new OutputMessageBuilder(globalSeperator);
                this.message_type_cache.set(getMessageType(messageName), outputMessage);

                let isFirst = true;
                for (const field of fields) {
                    this.validateFieldDef(field);
                    const fieldName = field.name;
                    const type = field.type;
                    const optionList = field.optionList;
                    const regex = field.regex;
                    const keyPsitions = field.keyPositions;
                    const valuePositions = field.valuePositions;
                    const valueMappings = field.valueMappings;
                    const localSeperator = field.localSeperator;
                    const isEmptyValid = field.isEmptyValid;

                    const fieldObj = new OutputField(fieldName, localSeperator, type, optionList, regex, keyPsitions, valuePositions, valueMappings, isFirst, isEmptyValid);
                    outputMessage.addField(fieldObj);
                    isFirst = false;
                }
            }

            this.validateFieldAccesors(fieldAccesors);
            this.content_location = fieldAccesors.content;
            this.message_id_location = fieldAccesors.messageId;
        } else {
            this.content_location = config.signal_server.content;
            this.message_id_location = "ToDecide";

        }

     
    }

    private validateSignalParser(signalParser: any) {
        const messageDefs = signalParser.messageDefs;
        const fieldAccesors = signalParser.fieldAccesors;

        if (messageDefs == undefined) {
            throw new Error(`TgChannel::validateSignalParser invalid signal parser definition, element 'messageDefs' is required.`)
        }

        if (Array.isArray(messageDefs) == false) {
            throw new Error(`TgChannel::validateSignalParser invalid signal parser definition, element 'messageDefs' should be a array of 'messageDef' object(s).`)
        }

        if (messageDefs.length <= 0) {
            throw new Error(`TgChannel::constructor invalid signal parser definition, element 'messageDefs' should be a non empty array of 'messageDef' object(s).`)
        }

        if (fieldAccesors == undefined) {
            throw new Error(`TgChannel::validateSignalParser invalid signal parser definition, element 'fieldAccesors' is required.`)

        }

    }

    private validateFieldDef(field: any) {
        const fieldName = field.name;
        const type = field.type;
        const optionList = field.optionList;
        const regex = field.regex;
        const valuePositions = field.valuePositions;
        const valueMappings = field.valueMappings;
        const localSeperator = field.localSeperator;
        const isEmptyValid = field.isEmptyValid;



        if (fieldName == undefined) {
            throw new Error(`TgChannel::validateFieldDef invalid signal parser definition, element 'name' is required.`)
        }

        if (type == undefined) {
            throw new Error(`TgChannel::validateFieldDef invalid signal parser definition, element 'type' is required.`)
        }

        if (type == 'optinArgument') {
            if (optionList == undefined) {
                throw new Error(`TgChannel::validateFieldDef invalid signal parser definition, element 'optionList' is required.`)
            }

            if (Array.isArray(optionList) == false) {
                throw new Error(`TgChannel::validateFieldDef invalid signal parser definition, element 'optionList' should be a array of 'option' object(s).`)
            }

            if (optionList.length <= 0) {
                throw new Error(`TgChannel::validateFieldDef invalid signal parser definition, element 'optionList' should be a non empty array of 'option' object(s).`)
            }
        } else if (type == 'parameterArgument' || type == 'internalField') {
            if (regex == undefined) {
                throw new Error(`TgChannel::validateFieldDef invalid signal parser definition, element 'regex' is required.`)
            }

            if (valuePositions == undefined) {
                throw new Error(`TgChannel::validateFieldDef invalid signal parser definition, element 'valuePositions' is required.`)
            }

            if (Array.isArray(valuePositions) == false) {
                throw new Error(`TgChannel::validateFieldDef invalid signal parser definition, element 'valuePositions' should be a array of integers.`)
            }

            if (valuePositions.length <= 0) {
                throw new Error(`TgChannel::validateFieldDef invalid signal parser definition, element 'valuePositions' should be a non empty array of integers.`)
            }
            //TODO Check valid regex
        } else if (type == 'transformedParameterArgument') {
            if (regex == undefined) {
                throw new Error(`TgChannel::validateFieldDef invalid signal parser definition, element 'regex' is required.`)
            }

            if (valuePositions == undefined) {
                throw new Error(`TgChannel::validateFieldDef invalid signal parser definition, element 'valuePositions' is required.`)
            }

            if (valueMappings == undefined) {
                throw new Error(`TgChannel::validateFieldDef invalid signal parser definition, element 'valueMappings' is required.`)
            }

            if (Array.isArray(valuePositions) == false) {
                throw new Error(`TgChannel::validateFieldDef invalid signal parser definition, element 'valuePositions' should be a array of integers.`)
            }

            if (valuePositions.length <= 0) {
                throw new Error(`TgChannel::validateFieldDef invalid signal parser definition, element 'valuePositions' should be a non empty array of integers.`)
            }
            //TODO Check valid regex
        } else {
            throw new Error(`TgChannel::validateSignalParser invalid signal parser definition, element 'type' should be either optinArgument or parameterArgument.`)
        }

        if (localSeperator == undefined) {
            console.warn(`TgChannel::validateFieldDef incomplete signal parser definition, element 'localSeperator' not defined, set to 'globalSeperator' separator.`)
        }
        //TODO single character ?

        if (isEmptyValid == undefined) {
            console.warn(`TgChannel::validateFieldDef incomplete signal parser definition, element 'isEmptyValid' not defined, set to false.`)
        }
        //TODO single boolean ?
    }

    private validateMessageDef(messageDef: any) {
        const messageName = messageDef.messageName;
        const fields = messageDef.fields;
        const globalSeperator = messageDef.globalSeperator;

        if (messageName == undefined) {
            throw new Error(`TgChannel::validateMessageDef invalid signal parser definition, element 'messageName' is required.`)
        }

        if (fields == undefined) {
            throw new Error(`TgChannel::validateMessageDef invalid signal parser definition, element 'field' is required.`)
        }

        if (Array.isArray(fields) == false) {
            throw new Error(`TgChannel::validateMessageDef invalid signal parser definition, element 'fields' should be a array of 'field' object(s).`)
        }

        if (fields.length <= 0) {
            throw new Error(`TgChannel::validateMessageDef invalid signal parser definition, element 'fields' should be a non empty array of 'field' object(s).`)
        }

        if (globalSeperator == undefined) {
            // Set to default globalSeperator
            console.warn(`TgChannel::validateMessageDef incomplete signal parser definition, element 'globalSeperator' not defined, set to default separator.`)
        }
    }

    private validateFieldAccesors(fieldAccesors: any) {
        const content = fieldAccesors.content;
        if (content == undefined) {
            throw new Error(`TgChannel::validateFieldAccesors invalid signal parser definition, element 'content' should be defined under 'fieldAccesors'.`)

        }
    }

    public isChannelSubscribedToMsgType(masgType: MSG_TYPE) {
        if(this.useParser === false){
            return true;
        }
        if (this.message_type_cache.has(masgType)) {
            return true;
        }
        return false;
    }

    public onMessageNew(sequanceNumber: number, update: any) {
        this.processMessage(get(update, this.message_id_location), MSG_TYPE.NEW, get(update, this.content_location));

    }

    public onMessageReply(sequanceNumber: number, update: any) {
        this.processMessage(get(update, this.message_id_location), MSG_TYPE.UPDATE, get(update, this.content_location));

    }

    private onFieldsParsed(messageId: string, msgType: MSG_TYPE, outputMessage: OutputMessageBuilder) {
        // Get field
        const updateType = outputMessage.getFieldByName('updateType');
        const price = outputMessage.getFieldByName('price');
        const stopLoss = outputMessage.getFieldByName('stopLoss');
        const takeProfit = outputMessage.getFieldByName('takeProfit');
        const type: string = getEnumFromOrderSide( outputMessage.getFieldByName('action').getFieldAsStr()).toString();
        // Set message id and channel id
        outputMessage.overrideFieldValue('channelId', getChannelName(this.channelId));
        outputMessage.overrideFieldValue('messageId', messageId);

        // set messageType
        switch (msgType) {
            case MSG_TYPE.NEW:
                outputMessage.overrideFieldValue('messageType', 'NEW');
                outputMessage.overrideFieldValue("action", type);
                break;
            case MSG_TYPE.EDIT:
            case MSG_TYPE.UPDATE: //edit

                const updateTypeNew = this.addUpdateType(updateType, price, stopLoss, takeProfit);

                outputMessage.overrideFieldValue('messageType', 'UPDATE');
                outputMessage.overrideFieldValue('takeProfit', takeProfit.getFieldAsStr().toString().replace(":|","").replace("=|",""));   //check rimash 
                outputMessage.overrideFieldValue('updateType', String(updateTypeNew));
                
                if(stopLoss.getFieldAsStr() === "ENTRY"){
                    if(updateTypeNew === UPDATE_TYPE.SL){
                        outputMessage.overrideFieldValue('stopLoss', "0");   
                    }
                    else{
                        outputMessage.overrideFieldValue('stopLoss', "");   

                    }    
                }
                
                
                break;
        }   
    }

    private addUpdateType(updateTypeField: OutputField, priceField: OutputField, stopLossField: OutputField, takeProfitField: OutputField){
        if(updateTypeField && updateTypeField.getFieldAsStr() != ""){
            if(updateTypeField.getFieldAsStr().toLocaleUpperCase() == "CLOSE"){
                return UPDATE_TYPE.CLOSE;
            } else if (updateTypeField.getFieldAsStr().toLocaleUpperCase() == "CLOSE,HALF") {
                return UPDATE_TYPE.CLOSE_HALF;
            } else if (updateTypeField.getFieldAsStr().toLocaleUpperCase() == "DELETE") {
                return UPDATE_TYPE.DELETE;
            }
        } else if(priceField && priceField.getFieldAsStr() != "" && stopLossField && stopLossField.getFieldAsStr() == "" && takeProfitField && takeProfitField.getFieldAsStr() == ""){
            return UPDATE_TYPE.PRICE;
           
        } else if(priceField && priceField.getFieldAsStr() == "" && stopLossField && stopLossField.getFieldAsStr() != "" && takeProfitField && takeProfitField.getFieldAsStr() == ""){
            return UPDATE_TYPE.SL;

        } else if(priceField && priceField.getFieldAsStr() == "" && stopLossField && stopLossField.getFieldAsStr() == "" && takeProfitField && takeProfitField.getFieldAsStr() != ""){
            return UPDATE_TYPE.TP;
            
        } else{            
            return UPDATE_TYPE.MULTIPLE;
        }   
    }

    private processMessage(messageId: string, type: MSG_TYPE, content: string) {
        let msgType: MSG_TYPE = type;
        let outputMessage: OutputMessage;
        let validationPassed: boolean = false;
        if (content != null) {
            if (this.useParser === true) {
                outputMessage = new OutputMessage(this.generateFormatedString(messageId, msgType, content))
                
            }
            else {
                outputMessage = new OutputMessage(content);
                if(content.split(",")[0] === "UPDATE"){
                    msgType = MSG_TYPE.UPDATE;
                }

            }

            //LOG.info(`TgChannel::TYPE ${msgType}, message =  ${outputMessage.getFormatedString()}`);
            validationPassed = this.validateOutPutString(msgType, outputMessage.getFormatedString())
            if (validationPassed) {
                this.dispatchOutputMessage(outputMessage);
            }

            const notifyString: string = `original message = ${content} \n forex message = ${outputMessage.getFormatedString()} \n validation = ${validationPassed}`;
            LOG.info(notifyString);
            this.parent.sendToPublicChannel(config.signal_server.public_channel, notifyString);

        }

    }
    public generateFormatedString(messageId: string, msgType: MSG_TYPE, content: string): string{
        let outputMessageBuilder: (OutputMessageBuilder| undefined) = this.message_type_cache.get(msgType);

        if(outputMessageBuilder !== undefined) {
            outputMessageBuilder.actionBeforeGenerateString(content);
            this.onFieldsParsed(messageId, msgType, outputMessageBuilder);
            outputMessageBuilder.generateFormatedString();
            return outputMessageBuilder.getFormatedString();
        } else {
            LOG.error(`Required output message type-${getMessageTypeName(msgType)} not defined in the parser`);
            return "";
        }

    }

    private validateOutPutString(msgType: MSG_TYPE, outputString: string) {
        const words = outputString.split(",");
        //MSG.type, UPDATE TYPE, symbol, order type, price, sl, tp, message id, channel id
        
        if(words.length !== 9){
            LOG.warn(`word lenth is invalid : current length = ${words.length}`);
            return false;
        }
        
        if(words[4] !== "" && isNumber(words[4]) === false ){
            LOG.warn(`price should be number = ${words[4]}`);
            return false;
        }
        if(words[5] !== "" && isNumber(words[5]) === false ){
            LOG.warn(`stop loss should be number = ${words[5]}`);
            return false;
        }
        if(words[6] !== ""){
            const tpValues: string[] = words[6].split("|");
            
            for (let index = 0; index < tpValues.length; index++) {
                if(isNumber(tpValues[index]) === false){
                    LOG.warn(`take profit should be number = ${words[6]}`);
                    return false;
                }    
                
            }
            
        }
        
        
        switch (msgType) {
            case MSG_TYPE.NEW:
                if (config.refdata.symbols.includes(words[2]) !== true) {   //symbol 
                    LOG.warn(`symbol is mandotary in new message and should be included in pre defined symbol list symbol = ${words[2]}`);
                    return false;
                }
                if (words[3] === "" ||  parseInt(words[3]) > 5) {    //order type
                    LOG.warn(`order type should be valid in new message order type= ${words[3]}`);
                    return false;
                }
                if (words[4] === "") {    //price
                    LOG.warn(`order price should be valid in new message order price= ${words[4]}`);
                    return false;
                }
                break;

            case MSG_TYPE.UPDATE:
                switch (words[1]) {
                    case UPDATE_TYPE.PRICE.toString():
                        if (words[4] === "") {
                            LOG.warn(`order price should be valid in update message order price= ${words[4]}`);
                            return false;
                        }
                        break;
                    case UPDATE_TYPE.SL.toString():
                        if (words[5] === "") {
                            LOG.warn(`stop loss should be valid in update message stop loss= ${words[5]}`);
                            return false;
                        }
                        break;
                    case UPDATE_TYPE.TP.toString():
                        if (words[6] === "") {
                            LOG.warn(`take profit should be valid in update message take profit= ${words[6]}`);
                            return false;
                        }
                        break;
                    case UPDATE_TYPE.MULTIPLE.toString():
                        if (words[4] === "" && words[5] === "" && words[6] === "") {
                            LOG.warn(`issue in multiple type= ${words[4]}`);

                            return false;
                        }
                        break;
                    default:
                        break;
                }
                break;
            default:
                LOG.info(`invalid message type = ${msgType}`);

                return false;
        }

        return true;

    }



    public onMessageDelete(sequanceNumber: number, update: any) {
        console.log('NOT IMPLIMENTED');
    }

    public onMessageEdit(sequanceNumber: number, update: any) {
        console.log('NOT IMPLIMENTED');

    }

    dispatchOutputMessage(message: OutputMessage): boolean {
        Utils.getDataHander().setMessageCache(message);
        return true;
    }



}