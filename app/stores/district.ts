import type {
    DistrictModel,
    DistrictPaginationModel,
    DistrictResponseModel,
} from "~/models/district";

export const useDistrictStore = defineStore("districtStore", () => {
    /**
     *  references
     */
    const districts = ref<DistrictModel[]>([]);
    const pagination = ref<DistrictPaginationModel>(
        {} as DistrictPaginationModel,
    );
    const district = ref<DistrictModel>({
        id: null,
        provinceId: "",
        name: {},
        mergeText: [],
        lat: null,
        lng: null,
        province: {
            name: {},
            lat: null,
            lng: null,
        },
    });

    /**
     *  computed
     */
    const getAll = computed(() => districts.value);
    const getPagination = computed(() => pagination.value);
    const getOne = computed(() => district.value);

    /**
     *  functions
     */
    const setAll = async () => {
        const { data } = await useServer(`districts`, {
            method: "GET",
            params: {
                q: "all",
                objectFormat: true,
            },
        });
        const response = data?.value as DistrictResponseModel;
        if (response?.success) {
            districts.value = response?.data as DistrictModel[];
        }
    };

    const setPagination = async (params: Record<string, string>) => {
        pagination.value = DEFAULT_PAGINATION;
        const { data } = await useServer(`districts`, {
            method: "GET",
            params,
        });
        const response = data?.value as DistrictResponseModel;
        if (response?.success) {
            pagination.value = response?.data as DistrictPaginationModel;
        }
    };
    const setOne = async (id: string) => {
        district.value = {
            id: null,
            provinceId: "",
            name: {},
            mergeText: [],
            lat: null,
            lng: null,
            province: {
                name: {},
                lat: null,
                lng: null,
            },
        } as DistrictModel;
        const { data } = await useServer(`districts/${id}`, {
            method: "GET",
        });
        const response = data?.value as DistrictResponseModel;
        if (response?.success) {
            const res = response?.data as DistrictModel;
            district.value = {
                ...res,
                id: res?.id,
                name: res?.name,
                mergeText: useLanguageStore().languageOrigin.map((item) => ({
                    ...item,
                    text: res?.name[item.code as string] || "",
                })),
            } as DistrictModel;
        }
    };
    

    return {
        setAll,
        setPagination,
        setOne,

        getAll,
        getOne,
        getPagination,

        districts,
        district,
        pagination,
    };
});
