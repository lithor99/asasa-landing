import type { UseFetchOptions } from "nuxt/app";
import { defu } from "defu";

export async function useServer<T>(
    url: string,
    options: Record<string, any> = {},
) {
    const mainStore = useMainStore();
    const token = useCookie("token");
    const router = useRouter();
    const baseURL = "/api/";
    let header = {};
    if (import.meta.server) {
        header = useRequestHeaders();

        const defaults: UseFetchOptions<T> = {
            baseURL,
            // cache request
            key: url,

            // set user token if connected
            headers: {
                Authorization: token.value ? `Bearer ${token.value}` : "",
                ...header,
            },

            onResponse(_ctx) {
                // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
            },

            onResponseError(_ctx) {
                mainStore.showSnackbar = {
                    isOpen: true,
                    isSuccess: false,
                    message: _ctx?.response?._data
                        ? _ctx?.response?._data?.message
                        : "Please try again later",
                    timeout: 2000,
                };
                switch (_ctx.response.status) {
                    case 401:
                        // router.push("/login");
                        break;
                    case 403:
                        // router.push("/login");
                        break;
                    case 404:
                        break;
                    case 500:
                        break;
                    case 503:
                        break;
                    default:
                        break;
                }
            },
        };

        // for nice deep defaults, please use unjs/defu
        const params = defu(options, defaults);
        try {
            return useFetch(url, params);
        } catch (error) {
            return {
                data: ref(null),
                error: ref(error),
            };
        }
    } else if (import.meta.client) {
        try {
            options.headers = {
                Authorization: token.value ? `Bearer ${token.value}` : "",
                ...options.headers,
            };
            const response = $fetch(baseURL + url, options);
            const result: {
                success: boolean;
                code: number;
                message: string;
                data: any;
                error: any;
            } = (await response) as {
                success: boolean;
                code: number;
                message: string;
                data: any;
                error: any;
            };
            // console.log("response", response);
            return {
                data: ref(result),
                status: ref("success"),
                error: ref(null),
            };
            // return response;
        } catch (error: any) {
            mainStore.showSnackbar = {
                isOpen: true,
                isSuccess: false,
                message: error?.response?._data
                    ? error?.response?._data?.message
                    : "Please try again later",
                timeout: 2000,
            };
            const router = useRouter();

            // Handle specific HTTP errors globally
            switch (error?.status) {
                case 401:
                    // router.push("/login");
                    break;
                case 403:
                    // router.push("/login");
                    break;
                case 500:
                    break;
                default:
                    break;
            }

            return {
                data: ref(null),
                error: ref(error),
            };
        }
    }
    return {
        data: ref(null),
        error: null,
    };
}
