import { signalDataHandler } from "./signal-data-handler";
import { TgMessageRouter } from "./tg_mp_router";

export class Utils {
    private static signalDataHander: signalDataHandler;

    static getDataHander(): any {
        return this.signalDataHander;
    }
    static initDataHander(instanceId: string, dbUrl: string, telegramClient: TgMessageRouter): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.signalDataHander == undefined) {
                this.signalDataHander = new signalDataHandler(instanceId, telegramClient);
            }
            this.signalDataHander.initDataHander(dbUrl)
                .then(() => {
                    resolve("ok");
                })
                .catch((error) => {
                    reject(error);
                })
        });


    }
}

export enum ORDER_SIDE {
    BUY = 0,
    SELL,
    BUY_LIMIT,
    SELL_LIMIT,
    BUY_STOP,
    SELL_STOP,
    NONE
}

export enum UPDATE_TYPE {
    NONE = -1,
    CLOSE,
    CLOSE_HALF,
    DELETE,
    PRICE,
    SL,
    TP,
    MULTIPLE

}

export enum OUTPUT_FIELD_TYPE {
    NONE = -1,
    INTERNAL_FIELD,
    OPTION_ARGUMENT,
    PARAMETER_ARGUMENT,
    TRANFORMED_PARAMETER_ARGUMENT

}

export enum MSG_TYPE {
    NONE = -1,
    NEW,
    UPDATE, //REPLY
    DELETE,
    EDIT
}

//MSG.type, UPDATE TYPE, symbol, order type, price, sl, tp, message id, channel id
export enum BOT_FIELD_POSITIONS {
    MSG_TYPE = 0,
    UPDATE_TYPE,
    SYMBOL,
    ORDER_SIDE,
    PRICE,
    SL,
    TP,
    MESSAGE_ID,
    CHANNEL_ID
}
export function getMessageTypeName(messageType: number): string {
    switch (messageType) {
        case MSG_TYPE.NEW:
            return "NEW";
        case MSG_TYPE.UPDATE:
            return "UPDATE";
        case MSG_TYPE.DELETE:
            return "DELETE";
        case MSG_TYPE.EDIT:
            return "REPLY";
        default:
            return "";
    }
}

export function getMessageType(messageType: string): MSG_TYPE {
    switch (messageType) {
        case "NEW":
            return MSG_TYPE.NEW;
        case "UPDATE":
            return MSG_TYPE.UPDATE;
        case "DELETE":
            return MSG_TYPE.DELETE;
        case "REPLY":
            return MSG_TYPE.EDIT;
        default:
            return MSG_TYPE.NONE;
    }
}


export enum CHANNEL {
    none = 0,
    test_channel = -1001421480052,
    salvage_channel = -1001424554694,
    price_action = -1001361965871,
    signal_expert = -1001412633629,
    day_finance = -1001480231253,
    forex_signal = -1001188607041

}
export function getChannelName(channel: number): string {
    switch (channel) {
        case CHANNEL.test_channel:
            return "TEST_CHANNEL";
        case CHANNEL.salvage_channel:
            return "SALVAGE_CHANNEL";
        case CHANNEL.price_action:
            return "PRICE_ACTION";
        case CHANNEL.signal_expert:
            return "SIGNAL_EXPERT";
        case CHANNEL.day_finance:
            return "DAY_FINANCE";
        case CHANNEL.forex_signal:
            return "FOREX_SIGNAL";
        default:
            return "";
    }
}

export function getChannelId(channelName: string): number {
    switch (channelName) {
        case "TEST_CHANNEL":
            return CHANNEL.test_channel;
        case "SALVAGE_CHANNEL":
            return CHANNEL.salvage_channel;
        case "PRICE_ACTION":
            return CHANNEL.price_action;
        case "SIGNAL_EXPERT":
            return CHANNEL.signal_expert;
        case "DAY_FINANCE":
            return CHANNEL.day_finance;
        case "FOREX_SIGNAL":
            return CHANNEL.forex_signal;
        default:
            return CHANNEL.none;
    }
}




export function getEnumFromOrderSide(side: string) {
    switch (side) {
        case "BUY":
            return ORDER_SIDE.BUY;
        case "SELL":
            return ORDER_SIDE.SELL;
        case "BUYLIMIT":
        case "BUY LIMIT":
            return ORDER_SIDE.BUY_LIMIT;

        case "SELL LIMIT":
        case "SELLLIMIT":
            return ORDER_SIDE.SELL_LIMIT;
        case "BUY STOP":
        case "BUYSTOP":
            return ORDER_SIDE.BUY_STOP;
        case "SELL STOP":
        case "SELLSTOP":
            return ORDER_SIDE.SELL_STOP;
        default:
            return ORDER_SIDE.NONE;

    }

}export function getOrderSideFromEnum(side: number) {
    switch (side) {
        case ORDER_SIDE.BUY:
            return "BUY";
        case ORDER_SIDE.SELL:
            return "SELL";
        case ORDER_SIDE.BUY_LIMIT:
            return "BUY LIMIT";

        case ORDER_SIDE.SELL_LIMIT:
            return "SELL LIMIT";
        case ORDER_SIDE.BUY_STOP:
            return "BUY STOP";
        case ORDER_SIDE.SELL_STOP:
            return "SELL STOP";
        default :
            return "";

    }

}


export function getBooleanFromString(boolValue: string): boolean {
    if (boolValue === 'true') {
        return true;
    }
    return false // assuming only true false value are valid
}

export function isNumber(numberValue: any) {
    const number = Number(numberValue);
    if (typeof number === 'number' && Number.isFinite(number)) {
        return true;
    }
    return false;
}

export function getTelegramMessageFormat(fields: string[]): string{

    let signal: string = "";
    if(fields[0] == 'NEW'){
        signal = `${fields[2]} ${getOrderSideFromEnum(parseInt(fields[3]))}\nENTRY ${fields[4]}\n${((fields[5] == "")?"":`SL ${fields[5]}\n`)}`;
        
        if(fields[6] !== ""){
            let tps: string[]= fields[6].split("|");
            tps.forEach(entry=>{
                signal = signal + `TP ${entry}\n`;
            });
        }
                     
    }  
    else{
        let updateType = parseInt(fields[1]);
        switch(updateType){
            case UPDATE_TYPE.CLOSE:
                signal = "Close the Order";
                if(fields[4] !== ''){
                    signal = signal + ` with ${fields[4]} pips count`
                }
                break;
            case UPDATE_TYPE.CLOSE_HALF:
                signal = "Close Half and set SL to the entry price"; 
                break;
            case UPDATE_TYPE.DELETE:
                signal = "Delete Order"; 
                break;
            case UPDATE_TYPE.PRICE:
                signal = `ENTRY ${fields[4]}`; 
                break;
            case UPDATE_TYPE.SL:
                if(fields[5] === "0"){
                    signal = "set SL to entry price";
                }
                else{
                    signal = `SL ${fields[5]}`; 
                }
                break;
            case UPDATE_TYPE.TP:
                signal = `TP ${fields[6]}`; 
                break;
            
        }
        signal += "\n";
        
    }

    const finalMessage: string = `==============================\nChannel Name = ${fields[8]}\nMessage Type  = ${fields[0]}\nMessage ID      = ${fields[7]}\n==============================\n${signal}==============================`;
    
    return finalMessage;
    

}