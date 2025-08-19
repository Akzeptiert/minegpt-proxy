// Специальный код для Vercel
const { Groq } = require('groq-sdk');

module.exports = async (req, res) => {
  // Проверяем, что запрос - это "посылка" (POST)
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  try {
    // Ключ безопасно берется из переменных окружения Vercel
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    // Пересылаем запрос в Groq
    const chatCompletion = await groq.chat.completions.create(req.body);
    // Отправляем ответ обратно в игру
    res.json(chatCompletion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
