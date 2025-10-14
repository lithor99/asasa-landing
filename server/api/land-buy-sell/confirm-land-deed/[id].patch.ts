import handleError from "~/../server/utils/handleError";
import type { H3Event } from "h3"; // Import H3Event from h3
export default defineEventHandler(
    handleError(async (event: H3Event) => {
        const axios = event.context.axios;
        /**
         *   get body by formdata
         */

        const { id } = getRouterParams(event);
        const { data } = await axios.patch(
            `land-buy-sell/confirm-land-deed/${id}`,
        );
        return data;
    }),
);
