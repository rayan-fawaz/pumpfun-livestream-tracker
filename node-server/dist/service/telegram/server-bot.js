import axios from 'axios';
// TODO: move this into an .env file
const BOT_TOKEN = '7515351247:AAFTtZvGJV3RX4x8a71Gq0NQZ2LSOmDQTgM';
const CHAT_ID = '-4575686283';
export const sendTelegramMessage = async (message) => {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const payload = {
        chat_id: CHAT_ID,
        text: message,
    };
    try {
        const response = await axios.post(url, payload);
        if (response.status === 200) {
            console.log(`[${new Date().toISOString()}] Telegram message sent: ${message}`);
        }
        else {
            console.error(`[${new Date().toISOString()}] Failed to send Telegram message. Status code: ${response.status}.`);
        }
    }
    catch (error) {
        console.error(`[${new Date().toISOString()}] Error sending Telegram message:`, error);
    }
};
