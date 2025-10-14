import handleError from "../../../utils/handleError";
import type { H3Event } from "h3"; // Import H3Event from h3
import FormData from "form-data";
export default defineEventHandler(
  handleError(async (event: H3Event) => {
    const axios = event.context.axios;
    const body: Array<any> = <Array<any>>await readMultipartFormData(event);
    const formData: FormData = new FormData();
    const { id } = getRouterParams(event);
    for (const data of body) {
      formData.append(
        data.name,
        data.type && data?.filename ? data.data : data.data?.toString(),
        data.filename
      );
    }
    const { data } = await axios.post(
      `land-buy-sell/repayment/${id}`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );
    return data;
  })
);
