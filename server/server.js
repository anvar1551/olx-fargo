const express = require("express");
const { google } = require("googleapis");
const TelegramBot = require("node-telegram-bot-api");

const TG_TOKEN = "5834853089:AAEvpQBdFpIkOiTO7_urckW1QOy5Cb7c-wY";

const bot = new TelegramBot(TG_TOKEN, {
  polling: true,
});

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "https://olx-fargo.netlify.app");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

/////////////////////////////////////////////////////////////////////////////
let chatIds;
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  chatIds = chatId;

  // Текст сообщения
  const text = "Привет! Это пример бота с кнопками.";

  // Кнопки
  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Инструкция", url: "https://example.com/button1" }],
        [{ text: "Публичная оферта", url: "https://fargo.uz/oferta" }],
      ],
    },
  };

  // Отправка сообщения с кнопками
  bot.sendMessage(chatId, text, options);
});

////////////////////////////////////////////////////////////////////////////

// Конфигурация Google Sheets API
const credentials = require("./credentials.json");
const { client_email, private_key } = credentials;
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const spreadsheetId = "15j_HaPCYKvbNOr6pKOc0J8HWDGU0q0I12xML33SBOOI";

app.post("/api/write-to-google-sheets", async (req, res) => {
  try {
    const {
      id,
      status,
      whoPays,
      senderName,
      city,
      senderAdress,
      senderPhone,
      typeOfDelivery,
      recieverName,
      recieverCity,
      recieverAdress,
      receivePoint,
      recieverPhone,
      weight,
      totalCost,
      dateTime,
      olxRef,
    } = req.body;

    // Аутентификация с использованием ключей сервисного аккаунта
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email,
        private_key,
      },
      scopes: SCOPES,
    });

    // Создание клиента для работы с Google Sheets API
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    // Запись данных в Google Sheets
    const request = {
      spreadsheetId,
      range: "Лист1", // Замените на ваш диапазон листа
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [
            id,
            status,
            whoPays,
            senderName,
            city,
            senderAdress,
            senderPhone,
            typeOfDelivery,
            recieverName,
            recieverCity,
            recieverAdress,
            receivePoint,
            recieverPhone,
            weight,
            totalCost,
            dateTime,
            olxRef,
          ],
        ],
      },
    };

    const response = await sheets.spreadsheets.values.append(request);
    console.log("Данные успешно записаны в Google Sheets");

    // Sending a success message to Telegram bot
    const chatId = chatIds; // Replace this with your actual Telegram chat ID
    const successMessage = "Данные успешно записаны в Google Sheets";
    bot.sendMessage(chatId, successMessage);

    res
      .status(200)
      .json({ message: "Данные успешно записаны в Google Sheets" });
  } catch (error) {
    console.error("Произошла ошибка при записи данных в Google Sheets", error);
    res
      .status(500)
      .json({ error: "Произошла ошибка при записи данных в Google Sheets" });
  }
});

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});
