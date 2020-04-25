import { OutputField } from "./tg_output_field";

export class OutputMessage {
    servedMessageCount: number = 0;
    timerCount: number = 0;
    formattedString: string;
   

    constructor(formattedString: string) {
        this.formattedString = formattedString;

    }

    increseServedMessageCount() {
        this.servedMessageCount++;
    }

    getServedMessageCount() {
        return this.servedMessageCount;
    }

    getFormatedString() {
        
        return this.formattedString;
    }

    setFormatedString(text: string) {
        this.formattedString = text;
    }
    setTimerCount(timerCount: number){
        this.timerCount = timerCount;
    }
    getTimerCount(){
        return this.timerCount;
    }

    sendFormattedString(): string {
        this.increseServedMessageCount();
        return this.getFormatedString();
    }

}