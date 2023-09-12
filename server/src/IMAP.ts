const ImapClient = require('emailjs-imap-client')
import { ParsedMail } from "mailparser"
import { simpleParser } from "mailparser"
import { IServerInfo } from "./ServerInfo"

export interface ICallOptions {
    mailbox: string,
    id?: number
}

export interface IMessage {
    id: string,
    date: string,
    from: string,
    subject: string,
    body?: string
}

export interface Imailbox {
    name: string,
    path: string
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

export class Worker {
    private static serverInfo: IServerInfo
    constructor(inServerInfo: IServerInfo) {
        Worker.serverInfo = inServerInfo
    }

    private async connectToServer(): Promise<any> {
        const client: any = new ImapClient.default(
            Worker.serverInfo.imap.host,
            Worker.serverInfo.imap.port,
            { auth: Worker.serverInfo.imap.auth }
        )
        client.logLevel = client.LOG_LEVEL_NONE
        client.onerror = (error: Error) => {
            console.log(`IMAP.Worker.listMailboxes(): Connection error`, error);
        }
        await client.connect()
        return client
    }
}