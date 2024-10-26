"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.access_tokenview = exports.access_token = void 0;
const agora_access_token_1 = require("agora-access-token");
require("dotenv").config();
const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;
const access_token = (req, res) => {
    const { channelName, uid, role } = req.body;
    if (!channelName) {
        return res.status(400).json({ error: "channel name is required" });
    }
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
    const token = agora_access_token_1.RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpiredTs);
    return res.json({ token: token });
};
exports.access_token = access_token;
const access_tokenview = (channelName, role, uid, expiry = 3600) => {
    return (req, res) => {
        if (!channelName) {
            return res.status(400).json({ error: "Channel name is required" });
        }
        // Map role from string to number
        let roleNumber;
        if (role === "audience") {
            roleNumber = agora_access_token_1.RtcRole.SUBSCRIBER; // Assuming audience is equivalent to SUBSCRIBER
        }
        else if (role === "publisher") {
            roleNumber = agora_access_token_1.RtcRole.PUBLISHER; // Assuming publisher is equivalent to PUBLISHER
        }
        else {
            return res.status(400).json({ error: "Invalid role provided" });
        }
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expiry;
        try {
            console.log(`Generating token for channel: ${channelName}, uid: ${uid}, role: ${roleNumber}, expire: ${privilegeExpiredTs}`);
            const token = agora_access_token_1.RtcTokenBuilder.buildTokenWithUid(process.env.APP_ID || "", process.env.APP_CERTIFICATE || "", channelName, uid, roleNumber, privilegeExpiredTs);
            console.log(`Generated token: ${token}`);
            return res.json({ token: token });
        }
        catch (error) {
            console.error("Error generating RTC token:", error.message);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };
};
exports.access_tokenview = access_tokenview;
