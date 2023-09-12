"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const nodemailer = require('nodemailer');
class Worker {
    constructor(inServerInfo) {
        Worker.serverInfo = inServerInfo;
    }
    sendMessage(inOptions) {
        return new Promise((resolve, reject) => {
            const transport = nodemailer.createTransport(Worker.serverInfo.smtp);
            transport.sendMail(inOptions, (error, info) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve("");
                }
            });
        });
    }
}
exports.Worker = Worker;
//# sourceMappingURL=SMTP.js.map