import handleError from "~/../server/utils/handleError";
import type { H3Event } from "h3"; // Import H3Event from h3
import FormData from "form-data";
export default defineEventHandler(
    handleError(async (event: H3Event) => {
        const axios = event.context.axios;
        /**
         *   get body by formdata
         */
        const body: Array<{ name: string; data: Buffer | string; type?: string; filename?: string }> = await readMultipartFormData(event) as Array<{ name: string; data: Buffer | string; type?: string; filename?: string }>;
        const formData: FormData = new FormData();

        for (const data of body) {
            formData.append(
                data.name,
                data.type && data?.filename ? data.data : data.data?.toString(),
                data.filename,
            );
        }
        const { data } = await axios.patch(`members/kyc`, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        return data;
    }),
);
