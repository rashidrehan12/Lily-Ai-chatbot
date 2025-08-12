// const app = require("./src/app");
// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const main = require("./src/services/gemini");

// const httpServer = createServer(app);

// // const io = new Server(httpServer, {
// //     cors: {
// //         origin: ["http://localhost:5173", "https://lily-ai-chatbot-eight.vercel.app"],
// //         methods: ["GET", "POST"]
// //     }
// // })
// const io = new Server(httpServer, {
//   cors: {
//     origin: [
//       "http://localhost:5173",
//       "https://lily-ai-chatbot-eight.vercel.app"
//     ],
//     methods: ["GET", "POST"],
//     credentials: true,
//   }
// });
// ;

// io.on("connection", (socket) => {
//     console.log("User connected...");

//     const chatHistory = []; // store per user

//     socket.on("disconnect", () => {
//         console.log("User disconnected!");
//     });

//     socket.on("ai-message", async (data) => {
//         chatHistory.push({
//             role: "user",
//             parts: [{ text: data.prompt }]
//         });

//         try {
//             const response = await main(chatHistory);
//             chatHistory.push({
//                 role: "model",
//                 parts: [{ text: response }]
//             });
//             socket.emit("ai-response", response);
//         } catch (error) {
//             console.error("Error generating AI response:", error);
//             socket.emit("ai-response", { error: "Something went wrong." });
//         }
//     });
// });

// httpServer.listen(3000, () => {
//     console.log("Server is running at http://localhost:3000");
// });


const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const main = require("./src/services/gemini");

// Create HTTP server for Express
const httpServer = createServer(app);

// Configure Socket.IO with CORS
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

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("User connected...");

  const chatHistory = [];

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

      // Always send consistent object
      socket.emit("ai-response", { type: "success", message: response });
    } catch (error) {
      console.error("Error generating AI response:", error);
      socket.emit("ai-response", { type: "error", message: "Something went wrong." });
    }
  });
});

// Use Render's provided PORT or fallback for local
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
