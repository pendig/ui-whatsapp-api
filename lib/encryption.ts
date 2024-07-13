import CryptoJS from 'crypto-js';

const secretKey = process.env.CRYPTO_SECRET_KEY || 'wa_secret_key';

export const encryptText = (text: string): string => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decryptText = (cipherText: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
