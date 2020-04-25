
import { LOG } from '../../utils/logger';
// import { ErrorHandler } from '../utils/error-handler';
// import {MongoCommunicator} from '../mongo/mongo_communicator';
// import { DB_COLLECTIONS} from '../mongo/common_defs';
import { Client } from './client';
import { OutputMessage } from './tg_output_message';
import { getChannelId, getTelegramMessageFormat } from './signal-utils';

const config = require('config');


export class signalDataHandler {
    // mongoCommunicator: MongoCommunicator;
    private timer: any = undefined;
    clientDetails: any;
    messageCache: any;
    currentSeq: number;
    connectedClientCount: number;
    timerCount: number;
    subChannels: number[] = [];


    constructor(instanceId: string, readonly telegramClient: any) {
        // this.mongoCommunicator = new MongoCommunicator(instanceId, [DB_COLLECTIONS.client_details], DB_COLLECTIONS.none, false);
        this.clientDetails = new Map();
        this.messageCache = new Map();
        this.connectedClientCount = 0;
        this.currentSeq = 0;
        this.timerCount = 0;
        config.signal_server.subscribed_channels.forEach((element: any )=> {
            this.subChannels.push(getChannelId(element.channel_name));
        });

        this.timer = setInterval(() => {
            this.processTimerActivity();
        }, 900000);
    }



    processTimerActivity(){
        this.clearMessageCache()
        this.logCurrentStatus();
        this.timerCount +=1;
    }

    logCurrentStatus(){
        const devider = 1024;
        const mem = process.memoryUsage();
        const output: any = {};
        if (mem.rss) { output['resident_set_size'] = mem.rss / devider; }
        if (mem.heapTotal) { output['total_heap'] = mem.heapTotal / devider; }
        if (mem.heapUsed) { output['used_heap'] = mem.heapUsed / devider; }
        if (mem.external) { output['cpp_obj_mem_usage'] = mem.external / devider; }

        LOG.debug(`memory usage for signal server : ${JSON.stringify(output)}`);
        LOG.debug(`cache memory size is : ${this.messageCache.size} , connected client count : ${this.connectedClientCount}`);
    }

    getLoadDataFromDB(filter: any): Promise<any> {
        return new Promise(async (resolve, reject) => {

            // this.mongoCommunicator.find(DB_COLLECTIONS.client_details, filter, {}, true, {})
            //     .then((data: any[]) => {
            //         resolve(data);
            //     })
            //     .catch((error) => {
            //         reject(error);
            //     });


        })

    }

    initDataHander(dbUrl: string): Promise<any>{
        return new Promise((resolve, reject) => {
          
            // this.mongoCommunicator.start(dbUrl, true)
            // .then((data)=>{
            //     return this.getLoadDataFromDB({});
            // })
            // .then((data: any[])=>{
            //     data.forEach((obj)=>{
            //         this.addNewClient(obj, false);
            //     })
            //     resolve("ok");
            // })
            // .catch((error)=>{
            //     reject(error);
            // })
        });

    }
    addNewClient(obj: any, saveClient = true): Client{
        
        obj.lastSeq = this.currentSeq;
        let client: Client = this.clientDetails.get(obj.accountID);
        if(client == null){
            client = new Client(obj);
            if(saveClient){
                client.saveClient();
            }
            this.clientDetails.set(obj.accountID, client);
        }
        else{
            LOG.error(`${obj.accountID} is already avilable`);
	    }
	    return client;
    }

    updateClient(clientId: string, obj: any, saveClient = true){
        
        let client: Client = this.clientDetails.get(clientId);
        if(client == null){
            throw `${clientId} is not in the system`;
        }
        else{
            client.updateClient(obj);      
	    }
    }

    removeClient(clientId: string, saveClient = true){
        
        let client: Client = this.clientDetails.get(clientId);
        if(client == null){
            throw `${clientId} is not in the system`;
        }
        else{
            client.removeClient();
            this.clientDetails.delete(clientId);      
	    }
    }

    getMongoCommunicator(){
       return ""; //this.mongoCommunicator; 
    }


    userAuthenticate(dataBuffer: string){
        let data: any = Client.getClientJsonFromString(dataBuffer);
        let client = this.clientDetails.get(data.accountID);
        

        if(client == null){
            this.telegramClient.sendToPublicChannel(config.signal_server.userRegisterChannel, dataBuffer);
            if(data.isReal == true){
                LOG.error("unknown user is recieved for real account ", JSON.stringify(data));
                throw "unknown user is recieved for real account";
            }
            else{
                LOG.debug(`unknown user is recieved for demo account. client details: ${JSON.stringify(data)}`);
                client = this.addNewClient(data);
            }
        }
        else{
            if(client.supportSignal === true || client.isReal == false ||  client.supportReal === true){
                LOG.debug(`${JSON.stringify(data)} existing user connects with server.`);
                client.lastSeq = this.currentSeq;
            }
            else{
                throw "client is not suppoted for real account or not support for signal providing";
            }

        }
        if(client.getConnectionStatus() === false){
            this.onClientLogin(client);
        }
    }

    onClientLogin(client: Client){
        client.onConnect();
        this.connectedClientCount += 1;
    }
    onClientLogout(client: Client){
        client.onDisConnect();
        this.connectedClientCount -= 1;

    }

    getSignal(accountID: string): string{

        let client: Client = this.clientDetails.get(accountID);
        if (client == null) {
            LOG.error("unknown user is recieved for real account");
            return "retry";

        }
        else {
            if (client.getConnectionStatus() === false) {
                return "retry";
            }
            if(client.isReal == true &&  client.supportReal === false){
                throw "error in get signal";
            }

            let message: string = this.getMessageFromCache(client.lastSeq + 1);
            if (message !== "") {
                console.log(`${message}, ${client.channels.length}`);
                
                if(client.channels.length > 0){  //channel validation should be done
                    let words: string[] = message.split(',');
                    if(client.channels.includes(words[8]) === false){
                        message = "";
                    }
                }
                client.lastSeq += 1;
            }
            return message;

        }


    }
    setClientProfit(clientId: string, profit: string){
        LOG.debug(`setClientProfit  client id: ${clientId}, profit: ${profit}`)
        let client: Client = this.clientDetails.get(clientId); 
        if(client != null)  {
            let object = Client.getProfitFromString(profit);
            client.addProfit(object);
        }
    }
    
    sendSignal(clientId: string, channelId: string, data: string){
        let channel: number = parseInt(channelId);
        LOG.debug(`sendSignal  client id: ${clientId}, channelId: ${channel}, data: ${data}`);
        let client: Client = this.clientDetails.get(clientId);
        if (client == null) {
            throw "unknown user is recieved as signal server";
        }
        else {
            
            if(client.supportSignal === true){

                if(client.sendSignal == true && this.subChannels.includes(channel) === false){
                    let outputMessage: OutputMessage = new OutputMessage(data);
                    this.setMessageCache(outputMessage);
                }
                if(channel !== -1){
                    this.telegramClient.sendTelegramMessage(channel, getTelegramMessageFormat(data.split(",")));
                }
            }

           

        }


    }

    setMessageCache(message: OutputMessage){
        let seqNumber = ++this.currentSeq;	
        message.setTimerCount(this.timerCount); 
        this.telegramClient.sendToMulticastChannel(config.signal_server.multicastChannel, message.getFormatedString());
    	this.messageCache.set(seqNumber, message);
    }

    getMessageFromCache(seqNumber: number): string{
        let message: OutputMessage = this.messageCache.get(seqNumber);
        if (message == null) {
            return "";
        }
        let outputMessage: string = message.sendFormattedString();

        return outputMessage;
    }
    removeFromMessageCache(seqNumber: number){
        LOG.debug(`message is removed from cache, seq number: ${seqNumber}`);
        this.messageCache.delete(seqNumber);   
    }

    clearMessageCache(){
        this.messageCache.forEach((obj: OutputMessage, seqNumber: number)=>{
            if(obj.getTimerCount() <= this.timerCount -1 ){
                this.removeFromMessageCache(seqNumber);   
            }
        });
    
    }

    userDisconnected(data: any){

        let client: Client= this.clientDetails.get(data.accountID);
        if(client != null){
            this.onClientLogout(client);    
        }
       

    }


    




}
