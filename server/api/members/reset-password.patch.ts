import handleError from "~/../server/utils/handleError";
import type { H3Event } from "h3"; // Import H3Event from h3
export default defineEventHandler(
    handleError(async (event: H3Event) => {
        const axios = event.context.axios;
        /**
         *   get body by formdata
         */
        const body = await readBody(event);

        const { data } = await axios.patch(
            `auth/member/reset-password/${body.id}`,
            body,
        );
        setCookie(event, "token", data.data?.token, {
            maxAge: 24 * 60 * 60,
        });
        return data;
    }),
);
