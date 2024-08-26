const client = require('wa-client')
const path = require('path')
const { AES, enc, mode, pad } = require('crypto-js')

const aesDecrpt = (input, key) => {
  const secretKey = enc.Utf8.parse(key)
  const iv = enc.Utf8.parse(key.substring(0, 16))
  const decrypted = AES.decrypt(input, secretKey, {
    iv,
    mode: mode.CBC,
    padding: pad.Pkcs7
  })
  return decrypted.toString(enc.Utf8)
}

const src = path.join(__dirname, '..', 'dist')
client.default.pub({
  path: src,
  env: 'test',
  target: 'admin',
  aesDecrypt: aesDecrpt,
  aesKey: 'rixinyueyi666666'
})
