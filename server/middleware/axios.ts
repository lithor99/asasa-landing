import axios from "axios";
import  CryptoJS from "crypto-js";
// import { setHeader,getHeaders } from "h3";
export default defineEventHandler((event) => {
    const config = useRuntimeConfig();
    const headers = getHeaders(event);
    const axiosConfig = axios.create({
        baseURL: config.API_URL,
    });
    const locale = getCookie(event, "locale");
    const apiKey = encodeAPIKey(config.API_KEY, config.CYT_SECRET);
    axiosConfig.interceptors.request.use((req) => {
        req.headers = {
            "sec-ch-ua": headers["sec-ch-ua"],
            "sec-ch-ua-mobile": headers["sec-ch-ua"],
            Authorization: headers.authorization,
            "api-key": apiKey,
            platform: "MEMBER",
            lang: locale,
            "user-agent": headers["user-agent"],
            "sec-ch-ua-platform": headers["sec-ch-ua-platform"],
            accept: headers.accept,
            origin: headers.origin,
            "sec-fetch-site": headers["sec-fetch-site"],
            "sec-fetch-mode": headers["sec-fetch-site"],
            "sec-fetch-dest": headers["sec-fetch-dest"],
            referer: headers.referer,
            "accept-encoding": headers["accept-encoding"],
            "accept-language": headers["accept-language"],
            "x-forwarded-for": headers["x-forwarded-for"],
            "x-forwarded-port": headers["x-forwarded-port"],
            "x-forwarded-proto": headers["x-forwarded-proto"],
        } as any;
        return req;
    });
    event.context.axios = axiosConfig;
});

function encodeAPIKey(str: any, secret: any) {
    try {
        const plainText = String(str);
        const secretKey = String(secret);
        const generateString = randomText10();
        const signature = CryptoJS.AES.encrypt(plainText, secretKey).toString();
        const combine = signature + generateString;
        const encodeSignature = encodeString(encodeString(combine));
        const base64 = Buffer.from(encodeSignature).toString("base64");
        return encodeString(base64.replace(/=/g, ""));
    } catch (e) {
        console.log(e);
        return "";
    }
}
function encodeString(str: string) {
    const txt = str;
    let odd = "";
    let even = "";
    for (let i = 0; i < txt.length; i++) {
        if (i % 2 === 0) {
            even += txt[i];
        } else {
            odd += txt[i];
        }
    }
    const encoded = odd + even;

    return encoded;
}
function randomText10() {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_0123456789";
    for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
