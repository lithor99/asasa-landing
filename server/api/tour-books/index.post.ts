import handleError from "~/../server/utils/handleError";
import type { H3Event } from "h3"; // Import H3Event from h3
import FormData from "form-data";
export default defineEventHandler(
    handleError(async (event: H3Event) => {
        const axios = event.context.axios;
        /**
         *   get body by formdata
         */
        const body = await readBody(event);
        const { data } = await axios.post(`tour-books`, body);
        return data;
    }),
);
