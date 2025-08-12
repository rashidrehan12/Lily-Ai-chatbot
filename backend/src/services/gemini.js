// const { GoogleGenAI } = require( "@google/genai");
// require("dotenv").config();
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const ai = new GoogleGenAI({
//     apiKey: GEMINI_API_KEY,
// });

// async function main(prompt) {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: prompt,
//         config: {
//             systemInstruction: `
//             your name is lily
//             You are a helpful AI assistant.
//             Provide concise and informative responses to user queries. 
//             Ensure your answers are clear and easy to understand.
//             send response in text format only. no md formatting, no code blocks, no images, no links, no markdown.
//             You can use emojis to make the conversation more engaging, but do not use any other formatting.
//             `,
//         },
//     });
//     return response.text;
// }

// module.exports = main;


const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function main(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // or gemini-1.5-flash

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            systemInstruction: `
            Your name is Lily.
            You are a helpful AI assistant.
            Provide concise and informative responses to user queries.
            Ensure your answers are clear and easy to understand.
            Send response in text format only — no markdown, no code blocks, no images, no links.
            You can use emojis to make the conversation more engaging, but no other formatting.
            `
        }
    });

    return result.response.text();
}

module.exports = main;
