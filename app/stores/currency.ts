import type {
    CurrencyModel,
    CurrencyPaginationModel,
    CurrencyResponseModel,
} from "~/models/currency";

export const useCurrencyStore = defineStore("currencyStore", () => {
    /**
     *  references
     */
    const currencies = ref<CurrencyModel[]>([]);
    const pagination = ref<CurrencyPaginationModel>(
        {} as CurrencyPaginationModel,
    );
    const currency = ref<CurrencyModel>({
        id: null,
        code: null,
        symbol: null,
        name: {},
        mergeText: [],
    });

    /**
     *  computed
     */
    const getAll = computed(() => currencies.value);
    const getPagination = computed(() => pagination.value);
    const getOne = computed(() => currency.value);

    /**
     *  functions
     */
    const created = async (body: Record<string, string>) => {
        const { data } = await useServer(`currencies`, {
            method: "POST",
            body,
        });
        return data.value as CurrencyResponseModel;
    };
    const setAll = async () => {
        const { data } = await useServer(`currencies`, {
            method: "GET",
            params: {
                q: "all",
            },
        });
        const response = data?.value as CurrencyResponseModel;
        if (response?.success) {
            currencies.value = response?.data as CurrencyModel[];
        }
    };

    const setPagination = async (params: Record<string, string>) => {
        pagination.value.rows = [];
        const { data } = await useServer(`currencies`, {
            method: "GET",
            params,
        });
        const response = data?.value as CurrencyResponseModel;
        if (response?.success) {
            pagination.value = response?.data as CurrencyPaginationModel;
        }
    };
    const setOne = async (id: string) => {
        currency.value = {
            id: null,
            code: null,
            symbol: null,
            name: {},
            mergeText: [],
        } as CurrencyModel;
        const { data } = await useServer(`currencies/${id}`, {
            method: "GET",
        });
        const response = data?.value as CurrencyResponseModel;
        if (response?.success) {
            const res = response?.data as CurrencyModel;
            currency.value = {
                ...res,
                id: res?.id,
                code: res?.code,
                symbol: res?.symbol,
                name: res?.name,
                mergeText: useLanguageStore().languageOrigin.map((item) => ({
                    ...item,
                    text: res?.name[item.code as string] || "",
                })),
            } as CurrencyModel;
        }
    };
    const updated = async (id: string, body: Record<string, string>) => {
        const { data } = await useServer(`currencies/${id}`, {
            method: "PATCH",
            body,
        });
        return data.value as CurrencyResponseModel;
    };
    const deleted = async (id: string) => {
        const { data } = await useServer(`currencies/${id}`, {
            method: "DELETE",
        });
        return data.value as CurrencyResponseModel;
    };
    return {
        created,
        setAll,
        setPagination,
        setOne,
        updated,
        deleted,
        getAll,
        getOne,
        getPagination,
        currencies,
        currency,
        pagination,
    };
});
