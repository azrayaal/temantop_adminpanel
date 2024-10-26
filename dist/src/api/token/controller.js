"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRtcTokenView = exports.generateRtcToken = exports.getBothTokens = exports.getRtmToken = exports.getRtcToken = exports.testRoutes = void 0;
const agora_access_token_1 = require("agora-access-token");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const appID = process.env.APP_ID;
const appCertificate = process.env.APP_CERTIFICATE;
if (!appID || !appCertificate) {
    console.error("FATAL ERROR: ENV not properly configured, check appID and appCertificate");
    process.exit(1);
}
const testRoutes = (req, res) => {
    res.json({ success: true });
};
exports.testRoutes = testRoutes;
const getRtcToken = (req, res) => {
    const { channelName, role, tokentype, uid } = req.params;
    const expireTime = parseInt(req.query.expiry) || 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expireTimestamp = currentTimestamp + expireTime;
    try {
        let token;
        if (tokentype === "userAccount") {
            token = agora_access_token_1.RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channelName, uid, getRole(role), expireTimestamp);
        }
        else if (tokentype === "uid") {
            token = agora_access_token_1.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, parseInt(uid, 10), getRole(role), expireTimestamp);
        }
        else {
            throw new Error(`Unknown tokentype: ${tokentype}`);
        }
        res.json({ rtcToken: token });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            message: `Error Generating RTC token: ${err.message}`,
            status: 400,
        });
    }
};
exports.getRtcToken = getRtcToken;
const getRtmToken = (req, res) => {
    const { uid } = req.params;
    const expireTime = parseInt(req.query.expiry) || 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expireTimestamp = currentTimestamp + expireTime;
    try {
        const token = agora_access_token_1.RtmTokenBuilder.buildToken(appID, appCertificate, uid, agora_access_token_1.RtmRole.Rtm_User, expireTimestamp);
        res.json({ rtmToken: token });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            message: `Error Generating RTM token: ${err.message}`,
            status: 400,
        });
    }
};
exports.getRtmToken = getRtmToken;
const getBothTokens = (req, res) => {
    const { channelName, role, tokentype, uid } = req.params;
    const expireTime = parseInt(req.query.expiry) || 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expireTimestamp = currentTimestamp + expireTime;
    try {
        let rtcToken;
        if (tokentype === "userAccount") {
            rtcToken = agora_access_token_1.RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channelName, uid, getRole(role), expireTimestamp);
        }
        else if (tokentype === "uid") {
            rtcToken = agora_access_token_1.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, parseInt(uid, 10), getRole(role), expireTimestamp);
        }
        else {
            throw new Error(`Unknown tokentype: ${tokentype}`);
        }
        const rtmToken = agora_access_token_1.RtmTokenBuilder.buildToken(appID, appCertificate, uid, agora_access_token_1.RtmRole.Rtm_User, expireTimestamp);
        res.json({ rtcToken, rtmToken });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            message: `Error Generating Token: ${err.message}`,
            status: 400,
        });
    }
};
exports.getBothTokens = getBothTokens;
const APP_ID = process.env.APP_ID || "";
const APP_CERTIFICATE = process.env.APP_CERTIFICATE || "";
const expirationTimeInSeconds = 3600;
// Function to map role string to RtcRole
const getRole = (role) => {
    if (role === "publisher") {
        return agora_access_token_1.RtcRole.PUBLISHER;
    }
    else {
        return agora_access_token_1.RtcRole.SUBSCRIBER;
    }
};
const generateRtcToken = (channelName, uid, expiry = 3600) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expireTimestamp = currentTimestamp + expiry;
    try {
        console.log(`Generating token for channel: ${channelName}, uid: ${uid}, expire: ${expireTimestamp}`);
        const token = agora_access_token_1.RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, parseInt(uid, 10), agora_access_token_1.RtcRole.SUBSCRIBER, expireTimestamp);
        console.log(`Generated token: ${token}`);
        return token;
    }
    catch (error) {
        console.error("Error generating RTC token:", error.message);
        throw error;
    }
};
exports.generateRtcToken = generateRtcToken;
const generateRtcTokenView = (channelName, uid, expiry = 3600) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expireTimestamp = currentTimestamp + expiry;
    try {
        console.log(`Generating token for channel: ${channelName}, uid: ${uid}, expire: ${expireTimestamp}`);
        const token = agora_access_token_1.RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, parseInt(uid, 10), agora_access_token_1.RtcRole.SUBSCRIBER, expireTimestamp);
        console.log(`Generated token: ${token}`);
        return token;
    }
    catch (error) {
        console.error("Error generating RTC token:", error.message);
        throw error;
    }
};
exports.generateRtcTokenView = generateRtcTokenView;
