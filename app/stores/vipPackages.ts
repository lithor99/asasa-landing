import type {
    VipPackageModel,
    VipPackagePaginationModel,
    VipPackageResponseModel,
} from "~/models/vipPackage";

export const useVipPackagesStore = defineStore("vipPackagesStore", () => {
    /**
     *  references
     */
    const vipPackages = ref<VipPackageModel[]>([]);
    const pagination = ref<VipPackagePaginationModel>(
        {} as VipPackagePaginationModel,
    );
    const vipPackage = ref<VipPackageModel>({
        id: null,
        name: {},
        type: null,
        amount: null,
        percent: null,
        daysExpired: null,
        currency: null,
    } as VipPackageModel);

    /**
     *  computed
     */
    const getAll = computed(() => vipPackages.value);
    const getPagination = computed(() => pagination.value);
    const getOne = computed(() => vipPackage.value);

    /**
     *  functions
     */
    const setAll = async () => {
        const { data } = await useServer(`vip-packages`, {
            method: "GET",
            params: {
                q: "all",
            },
        });
        const response = data?.value as VipPackageResponseModel;
        if (response?.success) {
            vipPackages.value = response?.data as VipPackageModel[];
        }
    };

    const setPagination = async (params: Record<string, string>) => {
        pagination.value = DEFAULT_PAGINATION;
        const { data } = await useServer(`vip-packages`, {
            method: "GET",
            params,
        });
        const response = data?.value as VipPackageResponseModel;
        if (response?.success) {
            pagination.value = response?.data as VipPackagePaginationModel;
        }
    };
    const setOne = async (id: string) => {
        vipPackage.value = {
            id: null,
            name: {},
            type: null,
            amount: null,
            percent: null,
            daysExpired: null,
            currency: null,
        } as VipPackageModel;
        const { data } = await useServer(`vip-packages/${id}`, {
            method: "GET",
        });
        const response = data?.value as VipPackageResponseModel;
        if (response?.success) {
            const res = response?.data as VipPackageModel;
            vipPackage.value = {
                ...res,
                name: res?.name || {},
                type: res?.type,
                amount: res?.amount,
                percent: res?.percent,
                daysExpired: res?.daysExpired,
                currency: res?.currency,
            } as VipPackageModel;
        }
    };

    return {
        setAll,
        setPagination,
        setOne,

        getAll,
        getOne,
        getPagination,

        vipPackages,
        vipPackage,
        pagination,
    };
});
