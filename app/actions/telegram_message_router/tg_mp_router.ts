
import { CHANNEL, MSG_TYPE, getTelegramMessageFormat, getChannelId, getMessageTypeName } from './signal-utils';
import { TgChannel } from './tg_mp_channel';
import { TgClient } from "./tg_mp_client";
import { salvage_channel_parser } from './tg_mp_parser_price_action_vip';
import { test_channel_parser } from './tg_mp_parser_price_action_vip';
import { get } from 'lodash';
import { LOG } from '../../utils/logger';

const config = require('config');

export class TgMessageRouter {
    tg_client: any;
    interested_channels: Map<number, TgChannel> = new Map();
    channelId: Map<String, number> = new Map();
    global_sequance: number;


    constructor(apiId: number, apiHash: string, username: string, phoneNumber: string) {
        // Create telegram client 
        this.tg_client = new TgClient({
            apiId: apiId,
            apiHash: apiHash
        });
        // Connect to the server
        this.tg_client.connect(username, phoneNumber);


        // Subscribe the client to interested updates
        this.subscribeToUpdates();

        // Subscribe to channels interested, can be done after initation via REST or via DB load
        for (const subChannel of config.signal_server.subscribed_channels) {
            const channelId = getChannelId(subChannel.channel_name);
            if (channelId == 0) {
                throw new Error(`TgMessageRouter::constructor channel id not found for channel-${subChannel.channel_name}`)
            }

            let parser = null;
            // TODO move to a map
            if(subChannel.user_parser === true){
                parser = test_channel_parser;
            }
            
            
            const channel = new TgChannel(channelId, parser, this);
            if (channel) {
                this.subscribeChannel(channelId, channel);
            } else {
                throw new Error(`TgMessageRouter::constructor not subscribed to the channel-${subChannel.channel_name}`)
            }
        }
        this.global_sequance = 0;
    }


    subscribeToUpdates() {
        this.subscribeToUpdate('__updateNewMessage', this.onReciveMessageNew.bind(this));
        this.subscribeToUpdate('__updateMessageEdited', this.onReciveMessageEdit.bind(this));
        this.subscribeToUpdate('__updateMessageContent', this.onReciveMessageContentUpdate.bind(this));
        this.subscribeToUpdate('__updateDeleteMessages', this.onReciveMessageDelete.bind(this));
    }

    subscribeToUpdate(updateType: string, callback: any) { //()=>{}
       this.tg_client.on(updateType, callback);
    }

    onReciveMessageNew(update: any) {
        const channelId = get(update, "message.chat_id"); //TODO should this be configurable
        const replyMessageId = get(update, 'message.reply_to_message_id'); //TODO should this be configurable
        //TODO update magic number-last reply message map (to trace the orignal order)
        if (replyMessageId != 0) {
            update.message.id = replyMessageId;   //TODO this is needed to be done clearly with parser
            this.route(update, channelId, MSG_TYPE.UPDATE)

        } else {
            this.route(update, channelId, MSG_TYPE.NEW)

        }
    }

    onReciveMessageEdit() {

    }

    onReciveMessageContentUpdate() {

    }

    onReciveMessageDelete() {

    }

    // Can have subscription to specific message type later to reduce unneccssary processing
    subscribeChannel(channelId: number, channel: TgChannel): boolean {
        // const originalSize = this.interested_channels.size;
        if (this.interested_channels.get(channelId) != null) {
            LOG.error(`${channelId} is already in subcribed list`);
            return false;
        }
        this.interested_channels.set(channelId, channel);
        return true;
        // return (originalSize + 1 === newSize) ? true : false;
    }

    unsubscribeChannel(channelId: number): boolean {
        if (this.interested_channels.get(channelId) != null) {
            this.interested_channels.delete(channelId);
            return true;
        }
        LOG.error(`${channelId} is not in subcribed list`);
        return false;
    }

    route(update: any, channelId: any, tgMessageType: MSG_TYPE) {
        try {
            const channel: (TgChannel | undefined) = this.interested_channels.get(channelId);
            if (channel != null) {
                if (channel.isChannelSubscribedToMsgType(tgMessageType)) {
                    LOG.info(`==>Processed update-${getMessageTypeName(tgMessageType)}: ${JSON.stringify(update)}`)
    
                    switch (tgMessageType) {
                        case MSG_TYPE.NEW:
                            channel.onMessageNew(this.global_sequance++, update);
                            break;
                        case MSG_TYPE.DELETE:
                            channel.onMessageDelete(this.global_sequance++, update);
                            break;
                        case MSG_TYPE.UPDATE:
                            channel.onMessageReply(this.global_sequance++, update);
                            break;
                        case MSG_TYPE.EDIT:
                            channel.onMessageEdit(this.global_sequance++, update);
    
                            break;
                        default:
                            console.warn(`TgMessageRouter::route unhandled message type recived`)
                            break;
                    }
                } else {
                    // console.debug(`==>Ignored update-${JSON.stringify(update)}`)
                    // LOG.info(`===>TgMessageRouter::route channel-${getChannelName(channelId)} is not subscribed to message type-${getMessageTypeName(tgMessageType)}.`)
                }
            }
            else {
    
                LOG.info(`==>Ignored update- ${JSON.stringify(update)} \n channel id = ${channelId}`);
                let content = get(update, config.signal_server.content);
                if(content){
                    LOG.info(`############################################## \n
                    content = ${content} \n channel id = ${channelId} \n
                              ##############################################`);
                }
            }
            
        } catch (error) {
            LOG.error(error);   
        }

    }

    notifyAllChannels() {

    }

    notifyChannel(channel: CHANNEL) {

    }

    getPublicChannelID(channelName: string) {
        return new Promise(async (resolve, reject) => {
            this.tg_client.searchPublicChat(`@${channelName}`).then((userId: any) => {
                resolve(userId.id);
            }).catch((error: any) => {
                reject(error);
            })
        });
    }

    sendToPublicChannel(channelName: string, message: string) {
        let channelId: (number| undefined) = this.channelId.get(channelName);
        if(channelId == undefined){
            this.getPublicChannelID(channelName)
            .then((channelId: any)=>{
                this.channelId.set(channelName, channelId);
                return this.sendTelegramMessage(channelId, message);
            })
            .catch(error=>{
                return LOG.error(`error in get channel id : ${channelName} error: ${JSON.stringify(error)}`);
            })
        }

        this.sendTelegramMessage(channelId, message);
    }

    sendTelegramMessage(channelId: (number|any), data: string){
        return new Promise(async (resolve, reject) => {
            this.tg_client.sendMessage(channelId, data).then(() => {
                resolve("OK");
            }).catch((error: any) => {
                reject(error);
            })
        }); 
    }



    sendToMulticastChannel(channelName: string, data: string){
        const words = data.split(",");
        
        if(config.signal_server.multicastSupportChannels.includes(words[8]) === true){
            this.sendToPublicChannel(channelName, getTelegramMessageFormat(words));

        }
            
        
        
        
    }

}