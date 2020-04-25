import { MSG_TYPE } from "./signal-utils";
const config = require('config');

const test_channel_parser = {
    
    messageDefs: [
        {
            messageName: "NEW",
            fields: [
                {
                    name: "messageType",
                    isEmptyValid: true,
                    type: "internalField",
                    optionList: [],
                    regex: "",
                    valuePositions: [0],
                    localSeperator: ","
                },
                {
                    name: "updateType",
                    isEmptyValid: true,
                    type: "internalField",
                    optionList: [],
                    regex: /(\w*CLOSE\w*)\s*(\w*HALF\w*)*/gi,
                    valuePositions: [0, 1],
                    localSeperator: ","
                },
                {
                    name: "symbol",
                    isEmptyValid: true,
                    type: "optinArgument",
                    optionList: config.refdata.symbols,
                    regex: "",
                    localSeperator: ","
                },
                {
                    name: "action",
                    isEmptyValid: true,
                    type: "parameterArgument",
                    optionList: [],
                    regex: /(\w*BUY|SELL\w*)\s*(\w*LIMIT|STOP\w*)*/gi,
                    valuePositions: [0, 1],
                    localSeperator: " "
                },
                {
                    name: "price",
                    isEmptyValid: true,
                    type: "parameterArgument",
                    optionList: [],
                    regex: /(@|ENTRY)\s*[0-9,.]+/gi,
                    valuePositions: [1],
                    localSeperator: ","
                },
                {
                    name: "stopLoss",
                    isEmptyValid: true,
                    type: "parameterArgument",
                    optionList: [],
                    regex: /SL\s*[0-9,.]+/gi,
                    valuePositions: [1],
                    localSeperator: "|"
                },
                {
                    name: "takeProfit",
                    isEmptyValid: false,
                    type: "parameterArgument",
                    optionList: [],
                    regex: /TP[0-9]*\s*[0-9,.]+/gi,
                    valuePositions: [1],
                    localSeperator: "|"
                },
                {
                    name: "messageId",
                    isEmptyValid: true,
                    type: "internalField",
                    optionList: [],
                    regex: "",
                    valuePositions: [0],
                    localSeperator: ","
                },
                {
                    name: "channelId",
                    isEmptyValid: true,
                    type: "internalField",
                    optionList: [],
                    regex: "",
                    valuePositions: [0],
                    localSeperator: ","
                },
            ],
            globalSeperator: ","
        },
        {
            messageName: "UPDATE",
            fields: [
                {
                    name: "messageType",
                    isEmptyValid: true,
                    type: "internalField",
                    optionList: [],
                    regex: "",
                    valuePositions: [0],
                    localSeperator: ","
                },
                {
                    name: "updateType",
                    isEmptyValid: true,
                    type: "internalField",
                    optionList: [],
                    regex: /(\w*CLOSE|DELETE\w*)\s*(\w*HALF\w*)*/gi,
                    valuePositions: [0, 1],
                    localSeperator: ","
                },
                {
                    name: "symbol",
                    isEmptyValid: true,
                    type: "optinArgument",
                    optionList: config.refdata.symbols,
                    regex: "",
                    localSeperator: ","
                },
                {
                    name: "action",
                    isEmptyValid: true,
                    type: "parameterArgument",
                    optionList: [],
                    regex: /(\w*BUY|SELL\w*)\s*(\w*LIMIT|STOP\w*)*/gi,
                    valuePositions: [0, 1],
                    localSeperator: " "
                },
                {
                    name: "price",
                    isEmptyValid: true,
                    type: "parameterArgument",
                    optionList: [],
                    regex: /@\s*[0-9,.]+/gi,
                    valuePositions: [1],
                    localSeperator: ","
                },
                {
                    name: "stopLoss",
                    isEmptyValid: true,
                    type: "transformedParameterArgument",
                    optionList: [],
                    regex: /(SL)(\s*:\s*|\s*to\s*|\s*=\s*)\s*([0-9,.]+|ENTRY)|(MOVE\s*SL\s*TO)\s*([0-9,.]+|ENTRY)/gi,
                    keyPositions: [0, 1],
                    valuePositions: [2, 3],
                    valueMappings: {
                        "MOVE SL": {
                            "TO ENTRY": "0",
                        }
                    },
                    localSeperator: "|"
                },
                {
                    name: "takeProfit",
                    isEmptyValid: false,
                    type: "parameterArgument",
                    optionList: [],
                    regex: /TP[0-9, ,:,=]*\s*[0-9,.]+/gi,
                    valuePositions: [1,2],
                    localSeperator: "|"
                },
                {
                    name: "messageId",
                    isEmptyValid: true,
                    type: "internalField",
                    optionList: [],
                    regex: "",
                    valuePositions: [0],
                    localSeperator: ","
                },
                {
                    name: "channelId",
                    isEmptyValid: true,
                    type: "internalField",
                    optionList: [],
                    regex: "",
                    valuePositions: [0],
                    localSeperator: ","
                },
            ],
            globalSeperator: ","
        }
    ],
    fieldAccesors: { //TODO move to message level when properites change between message types
        content: "message.content.text.text",
        messageId: "message.id",
    }
}

const salvage_channel_parser = {
    messageDefs: [
        {
            messageName: "NEW",
            fields: [
                {
                    name: "symbol",
                    isEmptyValid: true,
                    type: "optinArgument",
                    optionList: config.refdata.symbols,
                    regex: "",
                    localSeperator: ","
                },
                {
                    name: "price",
                    isEmptyValid: true,
                    type: "parameterArgument",
                    optionList: [],
                    regex: /@\s*[0-9,.]+/gi,
                    valuePositions: [1],
                    localSeperator: ","
                },
                {
                    name: "action",
                    isEmptyValid: true,
                    type: "parameterArgument",
                    optionList: [],
                    regex: /(\w*BUY|SELL\w*)\s*(\w*LIMIT|STOP\w*)*|(\w*CLOSE\w*)\s*(\w*HALF\w*)*/gi,
                    valuePositions: [0, 1],
                    localSeperator: " "
                },
                {
                    name: "stopLoss",
                    isEmptyValid: true,
                    type: "parameterArgument",
                    optionList: [],
                    regex: /SL\s*[0-9,.]+/gi,
                    valuePositions: [1],
                    localSeperator: "|"
                },
                {
                    name: "takeProfit",
                    isEmptyValid: false,
                    type: "parameterArgument",
                    optionList: [],
                    regex: /TP[0-9]*\s*[0-9,.]+/gi,
                    valuePositions: [1],
                    localSeperator: "|"
                },
            ],
            globalSeperator: ","
        },
        {
            messageName: "REPLY",
            fields: [
                {
                    name: "symbol",
                    isEmptyValid: true,
                    type: "optinArgument",
                    optionList: config.refdata.symbols,
                    regex: "",
                    localSeperator: ","
                },
                {
                    name: "price",
                    isEmptyValid: true,
                    type: "parameterArgument",
                    optionList: [],
                    regex: /@\s*[0-9,.]+/gi,
                    valuePositions: [1],
                    localSeperator: ","
                },
                {
                    name: "action",
                    isEmptyValid: true,
                    type: "parameterArgument",
                    optionList: [],
                    regex: /(\w*BUY|SELL\w*)\s*(\w*LIMIT|STOP\w*)*|(\w*CLOSE\w*)\s*(\w*HALF\w*)*/gi,
                    valuePositions: [0, 1],
                    localSeperator: " "
                },
                {
                    name: "stopLoss",
                    isEmptyValid: true,
                    type: "parameterArgument",
                    optionList: [],
                    regex: /SL to\s*[0-9,.]+/gi,
                    valuePositions: [1],
                    localSeperator: "|"
                },
                {
                    name: "takeProfit",
                    isEmptyValid: false,
                    type: "parameterArgument",
                    optionList: [],
                    regex: /TP[0-9]*\s*[0-9,.]+/gi,
                    valuePositions: [1],
                    localSeperator: "|"
                },
            ],
            globalSeperator: ","
        }
    ],
    fieldAccesors: {
        content: "message.content.text.text",
    }
}


const template = {
    messageDefs: [
        {
            messageName: "<NEW|UPDATE|DELETE|REPLY>",
            fields: [
                {
                    name: "<>string",
                    isEmptyValid: "<boolean>",
                    type: "<optinArgument|parameterArgument>",
                    optionList: [
                        "<string>" //only valid for optinArgument
                    ],
                    regex: "<string>", //only valid for parameterArgument
                    localSeperator: "<, or | or any character>" // Gets precedense over globalSeperator
                }
            ],
            globalSeperator: "<, or | or any character>"
        },
        {
            messageName: "editMessage",
            fields: [],
            globalSeperator: ""
        },
        {
            messageName: "deleteMessage",
            fields: [],
            globalSeperator: ""
        }
    ]
}

export { test_channel_parser, salvage_channel_parser };