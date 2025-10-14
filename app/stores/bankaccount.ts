import type {
    BankAccountModel,
    BankAccountPaginationModel,
    BankAccountResponseModel,
} from "~/models/bankaccount";

export const useBankAccountStore = defineStore("bankAccountStore", () => {
    /**
     *  references
     */
    const bankAccounts = ref<BankAccountModel[]>([]);
    const pagination = ref<BankAccountPaginationModel>(
        {} as BankAccountPaginationModel,
    );
    const bankAccount = ref<BankAccountModel>({
        id: null,
        bankName: null,
        accountName: null,
        accountNumber: null,
        currency: null,
        accountImage: null,
        qrCode: null,
    });

    /**
     *  computed
     */
    const getAll = computed(() => bankAccounts.value);
    const getPagination = computed(() => pagination.value);
    const getOne = computed(() => bankAccount.value);

    /**
     *  functions
     */
    const created = async (body: FormData) => {
        const { data } = await useServer(`bank-accounts`, {
            method: "POST",
            body,
        });
        return data.value as BankAccountResponseModel;
    };
    const setAll = async () => {
        const { data } = await useServer(`bank-accounts`, {
            method: "GET",
            params: {
                q: "all",
            },
        });
        const response = data?.value as BankAccountResponseModel;
        if (response?.success) {
            const res = response?.data as BankAccountModel[];
            bankAccounts.value = res;
        }
    };

    const setPagination = async (params: Record<string, string>) => {
        pagination.value = DEFAULT_PAGINATION;
        const { data } = await useServer(`bank-accounts`, {
            method: "GET",
            params,
        });
        const response = data?.value as BankAccountResponseModel;
        if (response?.success) {
            pagination.value = response?.data as BankAccountPaginationModel;
        }
    };
    const setOne = async (id: string) => {
        bankAccount.value = {
            id: null,
            bankName: null,
            accountName: null,
            accountNumber: null,
            currency: null,
            accountImage: null,
            qrCode: null,
        } as BankAccountModel;
        const { data } = await useServer(`bank-accounts/${id}`, {
            method: "GET",
        });
        const response = data?.value as BankAccountResponseModel;
        if (response?.success) {
            const res = response?.data as BankAccountModel;
            bankAccount.value = {
                ...res,
                id: res?.id,
                bankName: res?.bankName,
                accountName: res?.accountName,
                accountNumber: res?.accountNumber,
                currency: res?.currency,
                accountImage: res?.accountImage,
                qrCode: res?.qrCode,
            } as BankAccountModel;
        }
    };

    const updated = async (id: string, body: FormData) => {
        const { data } = await useServer(`bank-accounts/${id}`, {
            method: "PATCH",
            body,
        });
        return data.value as BankAccountResponseModel;
    };

    const request = async (
        id: string,
        body: Record<string, string>,
    ) => {
        const { data } = await useServer(`bank-accounts/request/${id}`, {
            method: "PATCH",
            body,
        });
        return data.value as BankAccountResponseModel;
    };
    const deleted = async (id: string) => {
        const { data } = await useServer(`bank-accounts/${id}`, {
            method: "DELETE",
        });
        return data.value as BankAccountResponseModel;
    };

    return {
        created,
        setAll,
        setPagination,
        setOne,
        updated,
        deleted,
        request,

        getAll,
        getOne,
        getPagination,

        bankAccounts,
        bankAccount,
        pagination,
    };
});
