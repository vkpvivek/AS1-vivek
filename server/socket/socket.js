const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { encrypt, decrypt } = require("../utils/encryption");


function initSocket(server) {

  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Auth token missing"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "myjwtsecret");
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.user.email);

    socket.on("binary-event", (encryptedBuffer) => {
      try {
        const decrypted = decrypt(encryptedBuffer);
        const data = JSON.parse(decrypted);
        console.log("📨 Received decrypted data:", data);

        const responseData = JSON.stringify({ msg: "Hello from server!" });
        const encryptedResponse = encrypt(responseData);
        socket.emit("binary-response", encryptedResponse);
      } catch (err) {
        console.error("❌ Failed to decrypt:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });
  });
}


module.exports = initSocket;
