import type {
    LandBuySellModel,
    LandBuySellPaginationModel,
    LandBuySellResponseModel,
} from "~/models/landBuySell";

export const useLandBuySellStore = defineStore("landBuySellStore", () => {
    /**
     *  references
     */
    const landBuySells = ref<LandBuySellModel[]>([]);
    const landBuyList = ref<LandBuySellModel[]>([]);
    const pagination = ref<LandBuySellPaginationModel>(
        {} as LandBuySellPaginationModel,
    );
    const paginationBuyer = ref<LandBuySellPaginationModel>(
        {} as LandBuySellPaginationModel,
    );
    const landBuySell = ref<LandBuySellModel>({
        id: null,
        landId: "",
        amount: null,
        status: ELandBuySellStatus.PENDING,
        currency: null,
        expiredPayment: null,
        paymentTimes: null,
        remark: null,
        buyerId: null,
        memberOwnerId: null,
        userOwnerId: null,
        approvedBy: null,
        land: {
            id: "",
            categoryId: "",
            typeId: "",
            gradeId: "",
            code: null,
            name: {},
            area: null,
            prices: [],
            sysPercent: "",
            image: null,
            images: [],
            remark: null,
            video: null,
            description: {},
            lat: null,
            lng: null,
            view: null,
            isValuation: null,
            isEmpty: null,
            status: null,
            provinceId: "",
            districtId: "",
            village: null,
            deliveryPeriod: null,
        },
        buyer: {
            profile: null,
            gender: null,
            firstName: null,
            lastName: null,
        },
        memberOwner: {
            profile: null,
            gender: null,
            firstName: null,
            lastName: null,
        },
        approver: {
            profile: null,
            gender: null,
            fullName: null,
        },
        payments: [],
        isActive: false, // For front-end use only
    });
    const tab = ref<number>(1);

    /**
     *  computed
     */
    const getAll = computed(() => landBuySells.value);
    const getPagination = computed(() => pagination.value);
    const getPaginationBuyer = computed(() => paginationBuyer.value);
    const getOne = computed(() => landBuySell.value);

    /**
     *  functions
     */
    const created = async (body: FormData) => {
        const { data } = await useServer(`land-buy-sell`, {
            method: "POST",
            body,
        });
        return data.value as LandBuySellResponseModel;
    };

    const repayment = async (id: string, body: FormData) => {
        const { data } = await useServer(`land-buy-sell/repayment/${id}`, {
            method: "POST",
            body,
        });
        return data.value as LandBuySellResponseModel;
    };

    const setPagination = async (params: Record<string, string | number>) => {
        pagination.value.rows = [];
        const { data } = await useServer(`land-buy-sell/owner`, {
            method: "GET",
            params,
        });
        const response = data?.value as LandBuySellResponseModel;
        if (response?.success) {
            pagination.value = response?.data as LandBuySellPaginationModel;
        }
    };
    const setPaginationBuyer = async (params: Record<string, string>) => {
        paginationBuyer.value.rows = [];
        const { data } = await useServer(`land-buy-sell/buyer`, {
            method: "GET",
            params,
        });
        const response = data?.value as LandBuySellResponseModel;
        if (response?.success) {
            paginationBuyer.value =
                response?.data as LandBuySellPaginationModel;
            if (
                paginationBuyer.value.rows &&
                paginationBuyer.value.rows.length > 0
            ) {
                landBuyList.value = landBuyList.value.concat(
                    paginationBuyer.value.rows,
                );
            }
        }
    };
    const setClearLaudBuyList = () => {
        landBuyList.value = [];
    };
    const setOne = async (id: string) => {
        landBuySell.value = {
            id: null,
            landId: "",
            amount: null,
            status: ELandBuySellStatus.PENDING,
            currency: null,
            expiredPayment: null,
            paymentTimes: null,
            remark: null,
            buyerId: null,
            memberOwnerId: null,
            userOwnerId: null,
            approvedBy: null,
            land: {
                id: "",
                categoryId: "",
                typeId: "",
                gradeId: "",
                code: null,
                name: {},
                area: null,
                prices: [],
                sysPercent: "",
                image: null,
                images: [],
                remark: null,
                video: null,
                description: {},
                lat: null,
                lng: null,
                view: null,
                isValuation: null,
                isEmpty: null,
                status: null,
                provinceId: "",
                districtId: "",
                village: null,
                deliveryPeriod: null,
            },
            buyer: {
                profile: null,
                gender: null,
                firstName: null,
                lastName: null,
            },
            memberOwner: {
                profile: null,
                gender: null,
                firstName: null,
                lastName: null,
            },
            approver: {
                profile: null,
                gender: null,
                fullName: null,
            },
            payments: [],
            isActive: false, // For front-end use only
        };
        const { data } = await useServer(`land-buy-sell/${id}`, {
            method: "GET",
        });
        const response = data?.value as LandBuySellResponseModel;
        if (response?.success) {
            const res = response?.data as LandBuySellModel;
            landBuySell.value = {
                ...res,
                id: res?.id,
            } as LandBuySellModel;
        }
    };
    const clearSetOne = async () => {
        landBuySell.value = {
            id: null,
            landId: "",
            amount: null,
            status: ELandBuySellStatus.PENDING,
            currency: null,
            expiredPayment: null,
            paymentTimes: null,
            remark: null,
            buyerId: null,
            memberOwnerId: null,
            userOwnerId: null,
            approvedBy: null,
            land: {
                id: "",
                categoryId: "",
                typeId: "",
                gradeId: "",
                code: null,
                name: {},
                area: null,
                prices: [],
                sysPercent: "",
                image: null,
                images: [],
                remark: null,
                video: null,
                description: {},
                lat: null,
                lng: null,
                view: null,
                isValuation: null,
                isEmpty: null,
                status: null,
                provinceId: "",
                districtId: "",
                village: null,
                deliveryPeriod: null,
            },
            buyer: {
                profile: null,
                gender: null,
                firstName: null,
                lastName: null,
            },
            memberOwner: {
                profile: null,
                gender: null,
                firstName: null,
                lastName: null,
            },
            approver: {
                profile: null,
                gender: null,
                fullName: null,
            },
            payments: [],
            isActive: false, // For front-end use only
        };
    };
    const updated = async (id: string, body: FormData) => {
        const { data } = await useServer(`land-buy-sell/${id}`, {
            method: "PATCH",
            body,
        });
        return data.value as LandBuySellResponseModel;
    };
    const upLoadDeed = async (id: string, body: FormData) => {
        const { data } = await useServer(
            `land-buy-sell/complete-land-deed/${id}`,
            {
                method: "PATCH",
                body,
            },
        );
        return data.value as LandBuySellResponseModel;
    };
    const deleted = async (id: string) => {
        const { data } = await useServer(`land-buy-sell/${id}`, {
            method: "DELETE",
        });
        return data.value as LandBuySellResponseModel;
    };

    const confirmLandDeed = async (id: string) => {
        const { data } = await useServer(
            `land-buy-sell/confirm-land-deed/${id}`,
            {
                method: "PATCH",
            },
        );
        return data.value as LandBuySellResponseModel;
    };

    const complete = async (id: string, body: { remark: string }) => {
        const { data } = await useServer(`land-buy-sell/complete/${id}`, {
            method: "PATCH",
            body,
        });
        return data.value as LandBuySellResponseModel;
    };

    return {
        created,
        repayment,
        setPagination,
        setPaginationBuyer,
        setClearLaudBuyList,
        setOne,
        clearSetOne,
        updated,
        upLoadDeed,
        deleted,
        confirmLandDeed,
        complete,

        getAll,
        getOne,
        getPagination,
        getPaginationBuyer,

        landBuySells,
        landBuyList,
        landBuySell,
        pagination,
        paginationBuyer,
        tab,
    };
});
