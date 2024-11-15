import { EC } from 'elliptic';
import CryptoJS from 'crypto-js';

const ec = new EC('secp256k1');

export const generateKeyPair = () => {
  const keyPair = ec.genKeyPair();
  return {
    privateKey: keyPair.getPrivate('hex'),
    publicKey: keyPair.getPublic('hex')
  };
};

export const generateAESKey = () => {
  return CryptoJS.lib.WordArray.random(32).toString();
};

export const encryptVote = (vote: string, key: string) => {
  return CryptoJS.AES.encrypt(vote, key).toString();
};

export const decryptVote = (encryptedVote: string, key: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedVote, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const generateVoterId = (nin: string, vin: string) => {
  const combined = `${nin}-${vin}-${Date.now()}`;
  return CryptoJS.SHA256(combined).toString().substring(0, 12);
};