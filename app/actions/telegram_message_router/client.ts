import { signalDataHandler } from "./signal-data-handler";
import { Utils, getBooleanFromString } from "./signal-utils";
// import { DB_COLLECTIONS } from "../mongo/common_defs";

export class Client {
    lastSeq: number;
    supportReal: boolean;
    supportSignal: boolean;
    accountID: string;
    accountName: string;
    isReal: boolean;
    connected: boolean;
    sendSignal: boolean;
    profit: any[] = [];
    channels: string[] = [];

    constructor(clientObject: any){
        this.lastSeq = clientObject.lastSeq;
        this.supportReal = clientObject.supportReal;
        this.supportSignal = clientObject.supportSignal;
        this.accountID = clientObject.accountID;
        this.accountName = clientObject.accountName;
        this.isReal = clientObject.isReal;
        this.connected = false;
        this.sendSignal = clientObject.sendSignal;

        if(clientObject.channels != null && Array.isArray(clientObject.channels)){
            this.channels = clientObject.channels;
        }

        if(clientObject.profit != null){
            this.profit = clientObject.profit;
        }
       
    }

    saveClient(){
        let clientObject = {lastSeq: this.lastSeq, channels: this.channels, supportReal: this.supportReal, supportSignal: this.supportSignal, sendSignal: this.sendSignal, accountID: this.accountID, accountName: this.accountName, isReal: this.isReal, profit: this.profit};
        // Utils.getDataHander().getMongoCommunicator().insert(DB_COLLECTIONS.client_details, clientObject );
    }

    removeClient(){
        // Utils.getDataHander().getMongoCommunicator().deleteOne(DB_COLLECTIONS.client_details, {accountID: this.accountID});  
    }

    setLastSeq(seq: number, saveInDB = true){
        this.lastSeq = seq;
        // Utils.getDataHander().getMongoCommunicator().update(DB_COLLECTIONS.client_details, {lastSeq: this.lastSeq}, {accountID: this.accountID});
    } 
    getLastSeq(saveInDB = true){
        return this.lastSeq;
    }

    onConnect(saveInDB = true){
        this.connected = true;
       // Utils.getDataHander().getMongoCommunicator().update(DB_COLLECTIONS.client_details, {connected: this.connected}, {accountID: this.accountID});
    }
    onDisConnect(saveInDB = true){
        this.connected = false;
       // Utils.getDataHander().getMongoCommunicator().update(DB_COLLECTIONS.client_details, {connected: this.connected}, {accountID: this.accountID});
    }
    
    getConnectionStatus(){
        return this.connected;
    }
    
    addProfit(object: any){
        this.profit.push(object);
        // Utils.getDataHander().getMongoCommunicator().update(DB_COLLECTIONS.client_details, {profit: this.profit}, {accountID: this.accountID});

    }

    setSendSignalValue(value: boolean, saveInDB = true){
        this.sendSignal = value;
        // Utils.getDataHander().getMongoCommunicator().update(DB_COLLECTIONS.client_details, {sendSignal: this.sendSignal}, {accountID: this.accountID});
    } 

    updateClient(data: any){
        let clientObject: any = {};
        if(data.supportReal != null){
            this.supportReal = data.supportReal;
            clientObject.supportReal = data.supportReal;
        }

        if(data.supportSignal != null){
            this.supportSignal = data.supportSignal;
            clientObject.supportSignal = data.supportSignal;
        }

        if(data.accountName != null){
            this.accountName = data.accountName;
            clientObject.accountName = data.accountName;
        }


        if(data.sendSignal != null){
            this.sendSignal = data.sendSignal;
            clientObject.sendSignal = data.sendSignal;
        }

        if(data.channels != null && Array.isArray(data.channels)){
            this.channels = data.channels;
            clientObject.channels = data.channels;
        }

        // Utils.getDataHander().getMongoCommunicator().update(DB_COLLECTIONS.client_details, clientObject, {accountID: this.accountID} );
    }

    static getClientJsonFromString(data: string){
        let fieldArray = data.split(",");
        let object = {
            accountID : fieldArray[0],
            accountName: fieldArray[1],
            isReal: getBooleanFromString(fieldArray[2]),
            supportReal: getBooleanFromString(fieldArray[3])
        }
        return object;

    }

    static getProfitFromString(data: string){
        let fieldArray = data.split(",");
        let object = {
            date : fieldArray[0],
            profit: fieldArray[1],
           
        }
        return object;

    }

   
}