import cryptoJs from "crypto-js";

export const useDecodeString = (str: string) => {
    try {
        let odd = "";
        let even = "";
        const length = str.length;
        if (length % 2 === 0) {
            odd = str.slice(0, length / 2);
            even = str.slice(length / 2, length);
        } else {
            odd = str.slice(0, Math.floor(length / 2));
            even = str.slice(Math.floor(length / 2), length);
        }
        let decoded = "";
        for (let i = 0; i < even.length; i++) {
            if (i < odd.length) {
                decoded += even[i] + odd[i];
            } else {
                decoded += even[i];
            }
        }
        return atob(decoded + "==").toString();
    } catch (error) {
        return "";
    }
};

// export const useAesEncryption = (text: string) => {
//     var decrypted = cryptoJs.AES.encrypt(text, useDecodeString(useAceSecret()));
//     return decrypted.toString();
// };

export const useAesDecryption = (text: string) => {
    var decrypted = cryptoJs.AES.decrypt(text, useDecodeString(useAceSecret()));
    return decrypted.toString(cryptoJs.enc.Utf8);
};
