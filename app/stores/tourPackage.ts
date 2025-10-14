import type {
    TourPackageModel,
    TourPackagePaginationModel,
} from "~/models/tourPackage";

export const useTourPackageStore = defineStore("TourPackageStore", () => {
    /**
     *  references
     */
     
    const tourPackages = ref<TourPackageModel[]>([]);
    const pagination = ref<TourPackagePaginationModel>(
        {} as TourPackagePaginationModel,
    );
    const tourPackage = ref<TourPackageModel>();

    /**
     *  computed
     */
    const getAll = computed(() => tourPackages.value);
    const getPagination = computed(() => pagination.value);
    const getOne = computed(() => tourPackage.value);

    /**
     *  functions
     */
    const setAll = async () => {
        const { data } = await useServer(`tour-packages`, {
            method: "GET",
            params: {
                q: "all",
                objectFormat: true,
            },
        });
        const response: any = data?.value;
        if (response?.success) {
            tourPackages.value = response?.data as TourPackageModel[];
        }
    };

    const setPagination = async (params: Record<string, string>) => {
        pagination.value = DEFAULT_PAGINATION;
        const { data } = await useServer(`tour-packages`, {
            method: "GET",
            params,
        });
        const response = data?.value  as any;
        if (response?.success) {
            pagination.value = response?.data as TourPackagePaginationModel;
        }
    };
    const setOne = async (id: string) => {
        const { data } = await useServer(`tour-packages/${id}`, {
            method: "GET",
        });
        const response = data?.value as any;
        if (response?.success) {
            const res = response?.data as TourPackageModel;
            tourPackage.value = {
                ...res,
            } as TourPackageModel;
        }
    };
    
    return {
        setAll,
        setPagination,
        setOne,

        getAll,
        getOne,
        getPagination,

        tourPackages,
        tourPackage,
        pagination,
    };
});
