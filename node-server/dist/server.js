import express from "express";
import cron from "node-cron";
import { cleanUpSeenAddresses, startFetchingPumpFunLiveStreams, } from "./service/pumpfun/livestream.js";
const app = express();
const PORT = process.env.PORT || 3000;
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// health check route
app.get("/", (req, res) => {
    res.send("Server is running and Pump.Fun live streams service is active.");
});
// scheduler to clean old map entries every 5 minutes
const cleanUpLiveStreamMap = cron.schedule('*/5 * * * *', () => {
    cleanUpSeenAddresses();
}, {
    scheduled: false,
});
// this runs on server startup
(async () => {
    // we start tracking pump.fun livestreams
    await startFetchingPumpFunLiveStreams();
    cleanUpLiveStreamMap.start();
})();
// start the server
app.listen(PORT, () => {
    console.log(`[${new Date().toISOString()}] Server is running on http://localhost:${PORT}`);
});
