import { error } from 'console'
import Nedb from 'nedb'
import * as path from 'path'
const Datastore = require('nedb')

export interface IContact {
    _id?: number,
    name: string,
    email: string
}

export class Worker {
    private db: Nedb
    constructor() {
        this.db = new Datastore({
            filenamme: path.join(__dirname, "contacts.db"),
            autoload: true
        })
    }

    public listContacts(): Promise<IContact[]> {
        return new Promise((resolve, reject) => {
            this.db.find({}, (error: Error, inDocs: IContact[]) => {
                if(error) {
                    reject(error)
                }
                else {
                    resolve(inDocs)
                }
            })
        })
    }

    public addContact(IContact: IContact): Promise<IContact> {
        return new Promise((resolve, reject) => {
            this.db.insert(IContact,
                (error: Error|null, inNewDoc: IContact) => {
                    if(error) {
                        reject(error)
                    }
                    else {
                        resolve(inNewDoc)
                    }
                }
            )
        })
    }

    public deleteContact(ID: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.db.remove({_id: ID}, {}, 
                (error: Error|null, inNumRemoved: number) => {
                    if(error) {
                        reject(error)
                    }
                    else {
                        resolve("")
                    }
                }
            )
        })
    }
}
