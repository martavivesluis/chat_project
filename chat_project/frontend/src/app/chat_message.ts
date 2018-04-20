export class ChatMessage {
    constructor(text: string, user: string, date: Date, receiver: string) {
        this.text = text;
        this.user = user; /*username*/
        this.date = date;
        this.receiver = receiver;
    }
    text: string;
    user: string;
    date: Date;
    receiver: string;
}
