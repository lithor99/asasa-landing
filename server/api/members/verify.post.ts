import FormData from "form-data";
import handleError from "~/../server/utils/handleError";
export default defineEventHandler(
    handleError(async (event: any) => {
        const axios = event.context.axios;
        const body = await readBody(event);
        const { data } = await axios.post(`otp/verify`, body);
        setCookie(event, "token", data.data?.token, {
            maxAge: 24 * 60 * 60,
        });
        return data;
    }),
);
