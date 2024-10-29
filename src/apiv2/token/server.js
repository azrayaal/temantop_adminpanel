const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const cors = require('cors');

const app = express();
const port = 3000;

const APP_ID = '815d068f5c6f4de18d9870dc59398905';
const APP_CERTIFICATE = 'c007515057eb45f0aed56e5d86bd1e9e';

app.use(cors());
app.use(express.json());

app.post('/access_token', (req, res) => {
    const { channelName, uid, role } = req.body;
    if (!channelName) {
        return res.status(400).json({ 'error': 'channel name is required' });
    }

    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpiredTs);

    return res.json({ 'token': token });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
