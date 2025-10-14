import type {
    LandAuctionModel,
    LandAuctionPaginationModel,
    LandAuctionResponseModel,
} from "~/models/landAuction";

export const useLandAuctionStore = defineStore("landAuctionStore", () => {
    /**
     *  references
     */
    const landAuctions = ref<LandAuctionModel[]>([]);
    const landAuctionList = ref<LandAuctionModel[]>([]);
    const pagination = ref<LandAuctionPaginationModel>(
        {} as LandAuctionPaginationModel,
    );
    const landAuction = ref<LandAuctionModel>({
        id: null,
        memberId: null,
        status: null,
        amount: null,
        lat: null,
        lng: null,
        paymentImage: null,
        responseImage: null,
        detail: null,
        approvedBy: null,
        member: null,
        approver: null,
    } as LandAuctionModel);

    /**
     *  computed
     */
    const getAll = computed(() => landAuctions.value);
    const getPagination = computed(() => pagination.value);
    const getOne = computed(() => landAuction.value);

    /**
     *  functions
     */
    const created = async (body: FormData) => {
        const { data } = await useServer(`land-auction`, {
            method: "POST",
            body,
        });
        return data.value as LandAuctionResponseModel;
    };

    const setAll = async () => {
        const { data } = await useServer(`land-auction`, {
            method: "GET",
            params: {
                q: "all",
            },
        });
        const response = data?.value as LandAuctionResponseModel;
        if (response?.success) {
            landAuctions.value = response?.data?.rows as LandAuctionModel[];
        }
    };

    const setPagination = async (params: Record<string, string>) => {
        //pagination.value = DEFAULT_PAGINATION;
        const { data } = await useServer(`land-auction`, {
            method: "GET",
            params,
        });
        const response = data?.value as LandAuctionResponseModel;
        if (response?.success) {
            pagination.value = response?.data as LandAuctionPaginationModel;
            if (pagination.value.rows && pagination.value.rows.length > 0) {
                landAuctionList.value = landAuctionList.value.concat(
                    pagination.value.rows,
                );
            }
        }
    };
    const setOne = async (id: string) => {
        landAuction.value = {
            id: null,
            memberId: null,
            status: null,
            amount: null,
            lat: null,
            lng: null,
            paymentImage: null,
            responseImage: null,
            detail: null,
            approvedBy: null,
            member: null,
            approver: null,
        } as LandAuctionModel;
        const { data } = await useServer(`upgrade-vip/${id}`, {
            method: "GET",
        });
        const response = data?.value as LandAuctionResponseModel;
        if (response?.success) {
            const res = response?.data as LandAuctionModel;
            landAuction.value = {
                ...res,
                member: res?.member || null,
                approver: res?.approver || null,
            } as LandAuctionModel;
        }
    };

    const setClearPagination = async () => {
        landAuctionList.value = [];
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

        landAuctions,
        landAuctionList,
        landAuction,
        pagination,
    };
});
