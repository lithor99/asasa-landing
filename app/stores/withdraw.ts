import type {
    WithdrawModel,
    WithdrawPaginationModel,
    WithdrawResponseModel,
} from "~/models/withdraw";

export const useWithdrawStore = defineStore("withdrawStore", () => {
    /**
     *  references
     */
    const pagination = ref<WithdrawPaginationModel>(
        {} as WithdrawPaginationModel,
    );
    const withdraw = ref<WithdrawModel>({
        id: null,
        memberId: "",
        agentId: "",
        amount: 0,
        transferAmount: 0,
        status: "PENDING",
        image: null,
        approveByBo: {},
        approveByAgent: "",
        remark: null,
        accountDetail: {},
        member: {
            profile: null,
            gender: "MALE",
            fullName: "",
            nickName: "",
            phone: "",
            bankAccount: {
                bankName: "",
                currency: "",
                accountName: "",
                accountImage: "",
                accountNumber: "",
            },
            kycStatus: EKycStatus.DEFAULT,
            status: EMemberStatus.ACTIVE,
            country: {
                name: {},
            },
        },
        approverBo: {
            fullName: "",
            profile: null,
            phone: "",
        },
        approverAgent: {
            fullName: "",
            profile: null,
            phone: "",
        },
        agent: {
            agentName: "",
        },
        exchangeRate: {
            currency: "",
        },
    });
    const tab = ref<number>(1);
    /**
     *  computed
     */
    const getPagination = computed(() => pagination.value);
    const getOne = computed(() => withdraw.value);

    /**
     *  functions
     */
    const setPagination = async (params: Record<string, string>) => {
        pagination.value = { ...DEFAULT_PAGINATION } as WithdrawPaginationModel;
        const { data } = await useServer(`withdrawals`, {
            method: "GET",
            params,
        });
        const response = data?.value as WithdrawResponseModel;
        if (response?.success) {
            pagination.value = response?.data as WithdrawPaginationModel;
        }
    };
    const setOne = async (id: string) => {
        withdraw.value = {
            id: null,
            memberId: "",
            agentId: "",
            amount: 0,
            transferAmount: 0,
            status: "PENDING",
            image: null,
            approveByBo: {},
            approveByAgent: "",
            remark: null,
            accountDetail: {},
            member: {
                profile: null,
                gender: "MALE",
                fullName: "",
                nickName: "",
                phone: "",
                bankAccount: {
                    bankName: "",
                    currency: "",
                    accountName: "",
                    accountImage: "",
                    accountNumber: "",
                },
                kycStatus: EKycStatus.DEFAULT,
                status: EMemberStatus.ACTIVE,
                country: {
                    name: {},
                },
            },
            approverBo: {
                fullName: "",
                profile: null,
                phone: "",
            },
            approverAgent: {
                fullName: "",
                profile: null,
                phone: "",
            },
            agent: {
                agentName: "",
            },
            exchangeRate: {
                currency: "",
            },
        } as WithdrawModel;
        const { data } = await useServer(`withdrawals/${id}`, {
            method: "GET",
        });
        const response = data?.value as WithdrawResponseModel;
        if (response?.success) {
            const res = response?.data as WithdrawModel;
            withdraw.value = {
                ...res,
                id: res?.id || "",
                agentId: res?.agentId || "",
                memberId: res?.memberId || "",
                amount: res?.amount || "0",
                remark: res?.remark || "",
            } as WithdrawModel;
        }
    };

    return {
        setPagination,
        setOne,

        getOne,
        getPagination,

        withdraw,
        pagination,
        tab,
    };
});
