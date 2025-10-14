import type {
    BonusModel,
    BonusPaginationModel,
    BonusResponseModel,
} from "~/models/bonus";

export const useBonusStore = defineStore("bonusStore", () => {
    /**
     *  references
     */
    const bonuses = ref<BonusModel[]>([]);
    const bonusList = ref<BonusModel[]>([]);
    const pagination = ref<BonusPaginationModel>({} as BonusPaginationModel);
    const bonus = ref<BonusModel>({
        id: null,
        memberId: null,
        status: null,
        amount: null,
        image: null,
        currency: null,
        approvedBy: null,
        remark: null,
        member: null,
        approver: null,
        accountDetail: {},
    } as BonusModel);

    /**
     *  computed
     */
    const getAll = computed(() => bonuses.value);
    const getPagination = computed(() => pagination.value);
    const getOne = computed(() => bonus.value);

    /**
     *  functions
     */
    const created = async (body: FormData) => {
        const { data } = await useServer(`bonus`, {
            method: "POST",
            body,
        });
        return data.value as BonusResponseModel;
    };

    const setAll = async () => {
        const { data } = await useServer(`bonus`, {
            method: "GET",
            params: {
                q: "all",
            },
        });
        const response = data?.value as BonusResponseModel;
        if (response?.success) {
            bonuses.value = response?.data as BonusModel[];
        }
    };

    const setPagination = async (params: Record<string, string>) => {
        //pagination.value = DEFAULT_PAGINATION;
        const { data } = await useServer(`bonus`, {
            method: "GET",
            params,
        });
        const response = data?.value as BonusResponseModel;
        if (response?.success) {
            pagination.value = response?.data as BonusPaginationModel;
            if (pagination.value.rows && pagination.value.rows.length > 0) {
                bonusList.value = bonusList.value.concat(pagination.value.rows);
            }
        }
    };
    const setOne = async (id: string) => {
        bonus.value = {
            id: null,
            memberId: null,
            status: null,
            amount: null,
            image: null,
            currency: null,
            approvedBy: null,
            remark: null,
            member: null,
            approver: null,
            accountDetail: {},
        } as BonusModel;
        const { data } = await useServer(`bonus/${id}`, {
            method: "GET",
        });
        const response = data?.value as BonusResponseModel;
        if (response?.success) {
            const res = response?.data as BonusModel;
            bonus.value = {
                ...res,
                member: res?.member || null,
                approver: res?.approver || null,
            } as BonusModel;
        }
    };

    const setClearPagination = async () => {
        bonusList.value = [];
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

        bonuses,
        bonusList,
        bonus,
        pagination,
    };
});
