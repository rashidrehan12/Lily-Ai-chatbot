const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const main = require("./src/services/gemini");

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
       origin: [
    "http://localhost:5173",
    "https://lily-ai-chatbot-eight.vercel.app"
],
methods: ["GET", "POST"],
credentials: true,


    }
});

io.on("connection", (socket) => {
    console.log("User connected...");

    const chatHistory = []; // store per user

    socket.on("disconnect", () => {
        console.log("User disconnected!");
    });

    socket.on("ai-message", async (data) => {
        chatHistory.push({
            role: "user",
            parts: [{ text: data.prompt }]
        });

        try {
            const response = await main(chatHistory);
            chatHistory.push({
                role: "model",
                parts: [{ text: response }]
            });
            socket.emit("ai-response", response);
        } catch (error) {
            console.error("Error generating AI response:", error);
            socket.emit("ai-response", { error: "Something went wrong." });
        }
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});

