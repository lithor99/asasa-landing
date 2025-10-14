import type {
    ProvinceModel,
    ProvincePaginationModel,
    ProvinceResponseModel,
} from "~/models/province";

export const useProvinceStore = defineStore("provinceStore", () => {
    /**
     *  references
     */
    const provinces = ref<ProvinceModel[]>([]);
    const pagination = ref<ProvincePaginationModel>(
        {} as ProvincePaginationModel,
    );
    const province = ref<ProvinceModel>({
        id: null,
        name: {},
        mergeText: [],
        lat: null,
        lng: null,
    });

    /**
     *  computed
     */
    const getAll = computed(() => provinces.value);
    const getPagination = computed(() => pagination.value);
    const getOne = computed(() => province.value);

    /**
     *  functions
     */
    const setAll = async () => {
        const { data } = await useServer(`provinces`, {
            method: "GET",
            params: {
                q: "all",
                objectFormat: true,
            },
        });
        const response = data?.value as ProvinceResponseModel;
        if (response?.success) {
            provinces.value = response?.data as ProvinceModel[];
        }
    };

    const setPagination = async (params: Record<string, string>) => {
        pagination.value = DEFAULT_PAGINATION;
        const { data } = await useServer(`provinces`, {
            method: "GET",
            params,
        });
        const response = data?.value as ProvinceResponseModel;
        if (response?.success) {
            pagination.value = response?.data as ProvincePaginationModel;
        }
    };
    const setOne = async (id: string) => {
        province.value = {
            id: null,
            name: {},
            mergeText: [],
            lat: null,
            lng: null,
        } as ProvinceModel;
        const { data } = await useServer(`provinces/${id}`, {
            method: "GET",
        });
        const response = data?.value as ProvinceResponseModel;
        if (response?.success) {
            const res = response?.data as ProvinceModel;
            province.value = {
                ...res,
                id: res?.id,
                name: res?.name,
                mergeText: useLanguageStore().languageOrigin.map((item) => ({
                    ...item,
                    text: res?.name[item.code as string] || "",
                })),
            } as ProvinceModel;
        }
    };
    
    return {
        setAll,
        setPagination,
        setOne,

        getAll,
        getOne,
        getPagination,

        provinces,
        province,
        pagination,
    };
});
