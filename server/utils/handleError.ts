const handleError =
    (func: (event: any) => Promise<any>) => async (event: any) => {
        try {
            return await func(event);
        } catch (error: any) {
            console.log("🚨 Server Error:", error);
            if (error?.response) {
                return createError({
                    status: error?.response?.status,
                    message: error?.response?.data?.message,
                });
            }
            return createError({
                status: 500,
                message: "Server when wrong please try later",
            });
        }
    };

export default handleError;
