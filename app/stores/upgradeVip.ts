import type {
    UpgradeVipModel,
    UpgradeVipPaginationModel,
    UpgradeVipResponseModel,
} from "~/models/upgradeVip";

export const useUpgradeVipStore = defineStore("upgradeVipStore", () => {
    /**
     *  references
     */
    const upgradeVips = ref<UpgradeVipModel[]>([]);
    const upgradeVipList = ref<UpgradeVipModel[]>([]);
    const pagination = ref<UpgradeVipPaginationModel>(
        {} as UpgradeVipPaginationModel,
    );
    const upgradeVip = ref<UpgradeVipModel>({
        id: null,
        memberId: null,
        packageId: null,
        startDate: null,
        expiredDate: null,
        status: null,
        amount: null,
        image: null,
        currency: null,
        bankRef: null,
        paymentDetail: null,
        approvedBy: null,
        remark: null,
        member: null,
        approver: null,
    } as UpgradeVipModel);

    /**
     *  computed
     */
    const getAll = computed(() => upgradeVips.value);
    const getPagination = computed(() => pagination.value);
    const getOne = computed(() => upgradeVip.value);

    /**
     *  functions
     */
    const created = async (body: FormData) => {
        const { data } = await useServer(`upgrade-vip`, {
            method: "POST",
            body,
        });
        return data.value as UpgradeVipResponseModel;
    };

    const setAll = async () => {
        const { data } = await useServer(`upgrade-vip`, {
            method: "GET",
            params: {
                q: "all",
            },
        });
        const response = data?.value as UpgradeVipResponseModel;
        if (response?.success) {
            upgradeVips.value = response?.data as UpgradeVipModel[];
        }
    };

    const setPagination = async (params: Record<string, string>) => {
        //pagination.value = DEFAULT_PAGINATION;
        const { data } = await useServer(`upgrade-vip`, {
            method: "GET",
            params,
        });
        const response = data?.value as UpgradeVipResponseModel;
        if (response?.success) {
            pagination.value = response?.data as UpgradeVipPaginationModel;
            if (pagination.value.rows && pagination.value.rows.length > 0) {
                upgradeVipList.value = upgradeVipList.value.concat(
                    pagination.value.rows,
                );
            }
        }
    };
    const setOne = async (id: string) => {
        upgradeVip.value = {
            id: null,
            memberId: null,
            packageId: null,
            startDate: null,
            expiredDate: null,
            status: null,
            amount: null,
            image: null,
            currency: null,
            bankRef: null,
            paymentDetail: null,
            approvedBy: null,
            remark: null,
            member: null,
            approver: null,
        } as UpgradeVipModel;
        const { data } = await useServer(`upgrade-vip/${id}`, {
            method: "GET",
        });
        const response = data?.value as UpgradeVipResponseModel;
        if (response?.success) {
            const res = response?.data as UpgradeVipModel;
            upgradeVip.value = {
                ...res,
                member: res?.member || null,
                approver: res?.approver || null,
            } as UpgradeVipModel;
        }
    };

    const setClearPagination = async () => {
        upgradeVipList.value = [];
    };

    return {
        created,
        setAll,
        setPagination,
        setOne,
        setClearPagination,

        getAll,
        getOne,
        getPagination,

        upgradeVips,
        upgradeVipList,
        upgradeVip,
        pagination,
    };
});
