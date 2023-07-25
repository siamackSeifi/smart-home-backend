const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const HomeModel = require("../models/homeModel");

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
let doc;

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
    doc = await HomeModel.findOne({userId: chatId});
    if (doc) {
        if (messageText === "mow the lawn") {
            let response = await axios.get(doc.endpoint + '/mowLawn');
            await bot.sendMessage(chatId, response.data);
        } else if (messageText === "vacuum") {
            const buttons = doc.rooms.map((room) => ({
                text: room.name,
                callback_data: room.name
            }));
            const keyboard = {
                inline_keyboard: [buttons] // Buttons will be arranged in a row
            };
            await bot.sendMessage(chatId, 'Select a room:', {
                reply_markup: keyboard
            });
        }
    } else {
        // // block the user
        // const userId = msg.from.id;
        // const response = await bot.restrictChatMember(chatId, userId, {
        //     can_send_messages: false,
        //     can_send_media_messages: false,
        //     can_send_other_messages: false,
        // });
        // if (response.ok) {
        //     console.log(`User with ID ${userId} has been blocked.`);
        // } else {
        //     console.error('Failed to block user:', response);
        // }
    }
});

bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const roomName = query.data;
    let response = await axios.get(doc.endpoint + '/vacuum?room=' + roomName);
    await bot.sendMessage(chatId, response.data);
});

module.exports.bot = bot;