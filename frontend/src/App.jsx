// import { useState, useEffect } from "react";
// import "./app.css"; // Import the new CSS file for the animation
// import Spline from "@splinetool/react-spline";
// import { io } from "socket.io-client";

// function App() {
//   const [message, setMessage] = useState("");
//   const [socket, setSocket] = useState(null);
//   const [isLoading, setIsLoading] = useState(false); // Add loading state
//   const [chatHistory, setChatHistory] = useState([
//     { role: "model", content: "Hey I'm Lily ! How can I help you today?" },
//   ]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim() && !isLoading) {
//       // Prevent submission if loading
//       setIsLoading(true); // Start loading
//       setChatHistory((prev) => [
//         ...prev,
//         {
//           role: "user",
//           content: message,
//         },
//       ]);
//       socket.emit("ai-message", { prompt: message });
//       setMessage("");
//     }
//   };

//   useEffect(() => {
//     let socketInstance = io("https://lily-ai-chatbot.onrender.com");
//     // let socketInstance = io("http://localhost:3000"); // For local development
//     // Connect to the production server
//     setSocket(socketInstance);
//     console.log("Connected to production server");

//     socketInstance.on("ai-response", (response) => {
//       setIsLoading(false); // Stop loading when response received
//       setChatHistory((prev) => [
//         ...prev,
//         {
//           role: "model",
//           content: response,
//         },
//       ]);
//     });

//     // Cleanup function to handle socket disconnection
//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);

//   return (
//     <>
//       {/* Spline scene - hidden on mobile */}
//       <div className="hidden md:block">
//         <Spline
//           style={{
//             position: "fixed",
//             left: "-25%",
//             top: "0",
//             width: "100%",
//             height: "100vh",
//             zIndex: -1,
//           }}
//           scene="https://prod.spline.design/3T8VklGmrB9LgwwZ/scene.splinecode"
//         />
//       </div>

//       {/* Main container - responsive layout */}
//       <div className="absolute flex top-0 w-full md:left-1/2 md:w-1/2">
//         <div className="right p-4 md:p-20 w-full bg-purple-50 h-[100vh] md:min-h-screen">
//           <div className="h-full border-6 border-purple-200 bg-gradient-to-br from-purple-500/70 to-pink-200/80 animated-gradient w-full rounded-3xl p-4 md:p-6 flex flex-col shadow-xl shadow-gray-800/15">
//             {/* Chat Header */}
//             <div className="mb-4 md:mb-6">
//               <h1 className="text-xl md:text-2xl font-bold text-white">
//                 AI Chat Assistant
//               </h1>
//               <p className="text-xs md:text-sm text-white/80">
//                 Ask me anything!
//               </p>
//             </div>

//             {/* Chat Messages - adjust padding and spacing */}
//             <div className="flex-1 overflow-y-auto mb-4 space-y-3 md:space-y-4 pr-2">
//               {chatHistory.map((chat, index) => (
//                 <div
//                   key={index}
//                   className={`flex ${
//                     chat.role === "user" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`max-w-[70%] chat-message hover:scale-102 transition-all ease rounded-2xl p-3 ${
//                       chat.role === "user"
//                         ? "bg-white/20 backdrop-blur-sm text-white rounded-tr-none"
//                         : "bg-white/10 backdrop-blur-sm text-white rounded-tl-none"
//                     }`}
//                     style={{ wordBreak: "break-word" }}
//                   >
//                     {chat.content}
//                   </div>
//                 </div>
//               ))}

//               {/* Loading indicator */}
//               {isLoading && (
//                 <div className="flex justify-start">
//                   <div className="max-w-[70%] rounded-2xl p-3 bg-white/10 backdrop-blur-sm text-white rounded-tl-none">
//                     <div className="flex items-center space-x-2">
//                       <div className="flex space-x-1">
//                         <div
//                           className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
//                           style={{ animationDelay: "0ms" }}
//                         ></div>
//                         <div
//                           className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
//                           style={{ animationDelay: "150ms" }}
//                         ></div>
//                         <div
//                           className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
//                           style={{ animationDelay: "300ms" }}
//                         ></div>
//                       </div>
//                       <span className="text-sm text-white/70">
//                         AI is thinking...
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Input Form - adjust spacing */}
//             <form
//               onSubmit={handleSubmit}
//               className="flex flex-col gap-6 md:gap-3 w-full"
//             >
//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 disabled={isLoading}
//                 rows="1"
//                 className={`w-full rounded-xl text-wrap px-3 md:px-4 py-2 text-sm md:text-base bg-white/30 backdrop-blur-sm focus:outline-none focus:border-white/40 text-[#7c4b88] placeholder-purple-950/50 shadow-sm transition-all duration-300 ${
//                   isLoading
//                     ? "opacity-50 cursor-not-allowed"
//                     : "hover:bg-white/40 hover:scale-101"
//                 }`}
//                 placeholder={
//                   isLoading ? "AI is processing..." : "Type your message..."
//                 }
//               />

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`cssbuttons-io-button text-sm md:text-base ${
//                   isLoading ? "opacity-50 cursor-not-allowed !pr-4" : ""
//                 }`}
//               >
//                 {isLoading ? (
//                   <div className="flex items-center justify-center w-full">
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
//                     Processing
//                   </div>
//                 ) : (
//                   <>
//                     Generate
//                     <div className="icon">
//                       <svg
//                         height="24"
//                         width="24"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path d="M0 0h24v24H0z" fill="none"></path>
//                         <path
//                           d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
//                           fill="currentColor"
//                         ></path>
//                       </svg>
//                     </div>
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;


import { useState, useEffect, useRef } from "react";
import "./app.css";
import Spline from "@splinetool/react-spline";
import { io } from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: "model", content: "Hey I'm Lily! How can I help you today?" },
  ]);

  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      setIsLoading(true);
      setChatHistory((prev) => [...prev, { role: "user", content: message }]);
      socket.emit("ai-message", { prompt: message });
      setMessage("");
    }
  };

  useEffect(() => {
    let socketInstance = io("https://lily-ai-chatbot.onrender.com");
    setSocket(socketInstance);
    console.log("Connected to production server");

    socketInstance.on("ai-response", (response) => {
      setIsLoading(false);
      setChatHistory((prev) => [...prev, { role: "model", content: response }]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isLoading]);

  return (
    <>
      {/* Spline scene */}
      <div className="hidden md:block">
        <Spline
          style={{
            position: "fixed",
            left: "-25%",
            top: "0",
            width: "100%",
            height: "100vh",
            zIndex: -1,
          }}
          scene="https://prod.spline.design/3T8VklGmrB9LgwwZ/scene.splinecode"
        />
      </div>

      {/* Chat container */}
      <div className="absolute flex top-0 w-full md:left-1/2 md:w-1/2">
        <div className="right p-4 md:p-20 w-full bg-purple-50 h-[100vh] md:min-h-screen">
          <div className="h-full border-6 border-purple-200 bg-gradient-to-br from-purple-500/70 to-pink-200/80 animated-gradient w-full rounded-3xl p-4 md:p-6 flex flex-col shadow-xl shadow-gray-800/15">
            
            {/* Header */}
            <div className="mb-4 md:mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-white">AI Chat Assistant</h1>
              <p className="text-xs md:text-sm text-white/80">Ask me anything!</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-3 md:space-y-4 pr-2">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] chat-message hover:scale-102 transition-all ease rounded-2xl p-3 ${
                      chat.role === "user"
                        ? "bg-white/20 backdrop-blur-sm text-white rounded-tr-none"
                        : "bg-white/10 backdrop-blur-sm text-white rounded-tl-none"
                    }`}
                    style={{ wordBreak: "break-word" }}
                  >
                    {chat.content}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[70%] rounded-2xl p-3 bg-white/10 backdrop-blur-sm text-white rounded-tl-none">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                      <span className="text-sm text-white/70">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input & Button in one row */}
            <form onSubmit={handleSubmit} className="flex items-end gap-3 w-full">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                disabled={isLoading}
                rows="1"
                className={`flex-1 rounded-xl px-3 md:px-4 py-2 text-sm md:text-base bg-white/30 backdrop-blur-sm focus:outline-none focus:border-white/40 text-[#7c4b88] placeholder-purple-950/50 shadow-sm transition-all duration-300 resize-none ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-white/40 hover:scale-101"
                }`}
                placeholder={isLoading ? "AI is processing..." : "Type your message..."}
              />

              <button
                type="submit"
                disabled={isLoading}
                className={`cssbuttons-io-button text-sm md:text-base flex-shrink-0 ${
                  isLoading ? "opacity-50 cursor-not-allowed !pr-4" : ""
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center w-full">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Processing
                  </div>
                ) : (
                  <>
                    Generate
                    <div className="icon">
                      <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                          d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
