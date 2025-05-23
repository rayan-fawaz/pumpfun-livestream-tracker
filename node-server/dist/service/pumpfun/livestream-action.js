import { sendTelegramMessage } from "../telegram/server-bot.js";
export const handleNewLiveStream = async (tokenAddress) => {
    console.log(`[${new Date().toISOString()}] New token discovered: ${tokenAddress}`);
    const tokenUrl = `https://pump.fun/coin/${tokenAddress}`;
    await sendTelegramMessage(`New token livestream: ${tokenUrl}`);
};
