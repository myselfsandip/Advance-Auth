// mailjetConfig.js
import dotenv from "dotenv";
import Mailjet from 'node-mailjet';

dotenv.config();

const mailjet = new Mailjet({
    apiKey: process.env.MAIL_JET_TOKEN,
    apiSecret: process.env.MAIL_JET_SECRET
});

export default mailjet;
