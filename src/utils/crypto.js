import {timeStampKey} from "./constant";
const CryptoJS = require('crypto-js')

const keyValue = timeStampKey

export function aesEncrypt(word) {
  const key = CryptoJS.enc.Utf8.parse(keyValue)
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.ciphertext.toString()
}

export function aesDecrypt(word) {
  const key = CryptoJS.enc.Utf8.parse(keyValue)
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  const encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypt.toString(CryptoJS.enc.Utf8)
}
