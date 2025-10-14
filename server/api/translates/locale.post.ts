import handleError from "~/../server/utils/handleError";
import type { H3Event } from "h3"; // Import H3Event from h3
export default defineEventHandler(
  handleError(async (event: H3Event) => {
    const body = await readBody(event);
    const axios = event.context.axios;
    const { data } = await axios.post(`translates/locale`, body);
    return data;
  })
);
