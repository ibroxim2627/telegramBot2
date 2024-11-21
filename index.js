const TelegramBot = require('node-telegram-bot-api');
const path = require('path')
const fs = require('fs');


const token = '7839024013:AAFTMUtoCM4uxJOu1PjazJzABmwCKuU60xc';

const bot = new TelegramBot(token, {polling: true});

const channels = [-1002170742320]

bot.on("message", async (message) => {
    console.log(message)
    const chatId = message.chat.id;
    const userId = message.from.id;
    let isSubscribed = await checkSubscribe(userId);
    console.log(isSubscribed)
    if (isSubscribed) {
        switch (message.text) {
            case "/start":
                bot.sendMessage(chatId, `Assalomu alaykum ${message.from.first_name}!`, {
                    reply_markup: {
                        resize_keyboard: true,
                        keyboard: [
                            [
                                {text: "1-buton"},
                                {text: "2-buton"},
                            ],
                            [
                                {text: "3-buton"},
                                {text: "youtube", web_app: {url: "https://www.youtube.com/"}},
                                {text: "5-buton"},
                            ],
                            [
                                {text: "6-buton", request_contact: true},
                            ]
                        ]
                    }
                });
                break
            case "1-buton":
                bot.sendMessage(chatId, "1-button bosildi")
                break
            case "001":
                bot.sendPhoto(chatId, path.join(__dirname, "img/img.png"), {
                    caption: "Kinoni korish uchun pasdagi tugmani bosing",
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "🎬 Kinoni korish",
                                    web_app: {url: "https://asilmedia.org/16130-agent-rekon-uzbek-tilida-2024-ozbekcha-tarjima-kino-hd.html"}
                                }
                            ],
                        ]
                    }
                })
                break
            case "002":
                bot.sendDocument(chatId, fs.createReadStream("file/No Longer Human.epub"))
                break
            case "003":
                bot.sendVideo(chatId, fs.createReadStream("video/003.mp4"), {
                    caption: "Video",
                    // thumb: "img/img.png"
                })
                break
        }
    }else {
        bot.sendMessage(chatId, "Siz ushbu kanalllarga obuna bo'ling!",  {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Obuna bo'lish",
                            url: "https://t.me/+VILaQAu1NQM1YjQy"
                        }
                    ]
                ]
            }
        })
    }
})


const checkSubscribe = async (userId) => {
    let isSubscribed = true;

    for (const channel of channels) {
        try {
            const response = await bot.getChatMember(channel, userId)
            console.log(response)
            if (response.status === "left" || response.status === "kicked") {
                isSubscribed = false;
            }
        } catch (err) {
            isSubscribed = false
        }
    }

    return isSubscribed
}