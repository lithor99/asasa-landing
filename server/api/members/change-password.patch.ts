import handleError from "~/../server/utils/handleError";
export default defineEventHandler(
  handleError(async (event: any) => {
    const axios = event.context.axios;
    const body = await readBody(event);
    const { data } = await axios.patch(`auth/member/change-password`, body);
    return data;
  })
);
