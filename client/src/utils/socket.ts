import { io, Socket } from 'socket.io-client';
import CryptoJS from 'crypto-js';


const SOCKET_URL = 'http://localhost:5000'; 
const SECRET_KEY = '12345678901234567890123456789012'; 


let socket: Socket | null = null;

const encrypt = (data: any) => {
  const json = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(json, SECRET_KEY).toString();
  return encrypted;
};

const decrypt = (encrypted: string) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};

const connectSocket = (token: string) => {
  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('✅ Socket connected:', socket?.id);
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected');
  });

  socket.on('binary:event', (data: ArrayBuffer) => {
    const encryptedString = Buffer.from(data).toString(); 
    const decryptedData = decrypt(encryptedString);
    console.log('🔓 Received binary event:', decryptedData);
  });
};

const sendBinaryEvent = (eventName: string, data: any) => {
  if (!socket) return;

  const encrypted = encrypt(data);
  const buffer = Buffer.from(encrypted);
  socket.emit(eventName, buffer);
};


export { connectSocket, sendBinaryEvent };
