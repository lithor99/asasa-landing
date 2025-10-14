import type {
    MemberModel,
    MemberPaginationModel,
    MemberResponseModel,
} from "~/models/member";
import type { MenuModel } from "~/models/menu";

export const useMemberStore = defineStore("memberStore", () => {
    /**
     *  references
     */
    const menus = ref<MenuModel[]>([] as MenuModel[]);
    const menuList = ref<MenuModel[]>([] as MenuModel[]);
    const members = ref<MemberModel[]>([]);
    const pagination = ref<MemberPaginationModel>({} as MemberPaginationModel);
    const profile = ref<MemberModel>({
        id: null,
        code: "",
        provinceId: "",
        districtId: "",
        village: null,
        email: null,
        profile: null,
        picture: null,
        gender: EGender.MALE,
        firstName: null,
        lastName: null,
        phone: null,
        username: null,
        birthday: null,
        status: EMemberStatus.ACTIVE,
        documentType: EDocumentType.FAMILY_BOOK,
        documentNo: null,
        documentFile: [],
        remark: null,
        kycStatus: EKycStatus.DEFAULT,
        expiredVip: null,
        bankAccount: [],
        wallet: [],
    });
    const tab = ref<number>(1);
    const registerData = ref({
        nickname: "",
        firstname: "",
        lastname: "",
        gender: "MALE",
        phone: "",
        password: "",
        referralCode: null,
    });

    const forgotDataForm = ref({
        id: "",
        phone: "",
        type: "PHONE",
        password: "",
    });

    const otpData = ref<{
        id: string;
        phone: string;
        otpCode: string;
        token: string;
        seconds: number;
    }>({
        id: "",
        phone: "",
        otpCode: "",
        token: "",
        seconds: 0,
    });

    const forgotData = ref<{
        id: string;
        phone: string;
        token: string;
    }>({
        id: "",
        phone: "",
        token: "",
    });

    const ctimetout = ref<any>();

    /**
     *  computed
     */
    const getAll = computed(() => members.value);
    const getPagination = computed(() => pagination.value);
    const getProfile = computed(() => profile.value);

    /**
     *  functions
     */
    const onEmitMemberData = (data: MemberModel) => {
        profile.value = {
            ...profile.value,
            id: data?.id,
            code: data.code,
            profile: data?.profile,
            phone: data?.phone,
            username: data?.username,
            birthday: data?.birthday,
            status: data?.status,
            kycStatus: data?.kycStatus,
            bankAccount: data?.bankAccount || [],
        } as MemberModel;
    };
    const onClearMemberData = () => {
        profile.value = {
            id: null,
            provinceId: "",
            districtId: "",
            village: null,
            email: null,
            profile: null,
            picture: null,
            gender: EGender.MALE,
            firstName: null,
            lastName: null,
            phone: null,
            username: null,
            birthday: null,
            status: EMemberStatus.ACTIVE,
            documentType: EDocumentType.FAMILY_BOOK,
            documentNo: null,
            documentFile: [],
            remark: null,
            kycStatus: EKycStatus.DEFAULT,
            expiredVip: null,
            bankAccount: [],
            wallet: [],
        };
    };
    const clearOtpData = () => {
        otpData.value = {
            id: "",
            phone: "",
            otpCode: "",
            token: "",
            seconds: 0,
        };
    };
    const clearForgotData = () => {
        forgotData.value = {
            id: "",
            phone: "",
            token: "",
        };
    };
    const onClearRegisterData = () => {
        registerData.value = {
            nickname: "",
            firstname: "",
            lastname: "",
            gender: "MALE",
            phone: "",
            password: "",
            referralCode: null,
        };
    };

    const onClearForgotDataForm = () => {
        forgotDataForm.value = {
            id: "",
            phone: "",
            type: "PHONE",
            password: "",
        };
    };

    function setOtpExpire() {
        if (ctimetout.value) {
            clearTimeout(ctimetout.value);
        }
        if (otpData.value.seconds <= 0) {
            const token = useCookie("token");
            token.value = null;
            return;
        }
        otpData.value.seconds -= 1;
        ctimetout.value = setTimeout(() => {
            setOtpExpire();
        }, 1000);
    }

    const setOtpData = (otpDt: {
        id: string;
        phone: string;
        otpCode: string;
        token: string;
        seconds: number;
    }) => {
        otpData.value = otpDt;
        setOtpExpire();
    };

    const setForgotData = (forgotDt: {
        id: string;
        phone: string;
        token: string;
    }) => {
        forgotData.value = forgotDt;
    };

    const setAll = async () => {
        const { data } = await useServer("members", {
            method: "GET",
            params: {
                q: "all",
                limit: 1000,
                page: 1,
            },
        });
        const response = data?.value as MemberResponseModel;
        if (response?.success) {
            const res = response?.data as MemberPaginationModel;
            members.value = res?.rows as MemberModel[];
        }
    };

    const setPagination = async (params: Record<string, string>) => {
        pagination.value = { ...DEFAULT_PAGINATION } as MemberPaginationModel;
        const { data } = await useServer("members", {
            method: "GET",
            params,
        });
        const response = data?.value as MemberResponseModel;
        if (response?.success) {
            pagination.value = response?.data as MemberPaginationModel;
        }
    };

    const setProfile = async () => {
        const { data } = await useServer(`members/profile`, {
            method: "GET",
        });
        const response = data?.value as MemberResponseModel;
        if (response?.success) {
            const res = response?.data as MemberModel;
            profile.value = {
                ...res,
                id: res?.id,
                profile: res?.profile,
                username: res?.username,
                gender: res?.gender,
                phone: res?.phone,
                status: res?.status,
                documentType: res?.documentType || EDocumentType.FAMILY_BOOK,
            } as MemberModel;
        }
    };
    const register = async (body: FormData) => {
        const { data } = await useServer(`members`, {
            method: "POST",
            body,
        });
        return data.value as MemberResponseModel;
    };

    const updateProfile = async (body: FormData) => {
        const { data } = await useServer(`members`, {
            method: "PATCH",
            body,
        });
        return data.value as MemberResponseModel;
    };

    const login = async (body: {
        username: string;
        password: string;
        deviceToken?: string;
    }) => {
        const { data } = await useServer(`members/login`, {
            method: "POST",
            body,
        });
        return data.value as MemberResponseModel;
    };

    const setMenus = async () => {
        menuList.value = [];
        const userId = useCookie<string>("userId");
        const { data } = await useServer(`members/${userId.value}`, {
            method: "GET",
        });
        const response: any = data?.value;
        if (response?.success) {
            const res = response?.data as MemberModel;
            if (res?.menus) {
                menuList.value = JSON.parse(JSON.stringify(res?.menus));
                const myMenus = [] as MenuModel[];
                const mnActive = res?.menus?.map((item) => {
                    return { ...item, active: false };
                }) as MenuModel[];
                const parentMenu = mnActive?.filter(
                    (item) => item.menuDeep === 1 && item.isShow,
                ) as MenuModel[];

                for (const key in parentMenu) {
                    const parent = parentMenu[key];
                    const body = {
                        ...parent,
                        children: res?.menus
                            ?.filter(
                                (item) =>
                                    item.menuDeep === 2 &&
                                    item.isShow &&
                                    item.parentMenu?.toString() ===
                                        parent.id?.toString(),
                            )
                            ?.sort(
                                (a, b) => (a.menuSort || 0) - (b.menuSort || 1),
                            ),
                    };
                    myMenus.push(body as MenuModel);
                }
                menus.value = myMenus.sort(
                    (a, b) => Number(a?.menuSort) - Number(b?.menuSort),
                ) as MenuModel[];
            } else {
                menus.value = [] as MenuModel[];
            }
        } else {
            menus.value = [];
        }
    };
    const setManualMenus = (response: any) => {
        menuList.value = [];
        const res = response?.data as MemberModel;
        if (res?.menus) {
            menuList.value = JSON.parse(JSON.stringify(res?.menus));
            const myMenus = [] as MenuModel[];
            const mnActive = res?.menus?.map((item) => {
                return { ...item, active: false };
            }) as MenuModel[];
            const parentMenu = mnActive?.filter(
                (item) => item.menuDeep === 1 && item.isShow,
            ) as MenuModel[];

            for (const key in parentMenu) {
                const parent = parentMenu[key];
                const body = {
                    ...parent,
                    children: res?.menus
                        ?.filter(
                            (item) =>
                                item.menuDeep === 2 &&
                                item.isShow &&
                                item.parentMenu?.toString() ===
                                    parent.id?.toString(),
                        )
                        ?.sort((a, b) => (a.menuSort || 0) - (b.menuSort || 1)),
                };
                myMenus.push(body as MenuModel);
            }
            menus.value = myMenus.sort(
                (a, b) => Number(a?.menuSort) - Number(b?.menuSort),
            ) as MenuModel[];
        } else {
            menus.value = [] as MenuModel[];
        }
    };
    const verifyOTP = async (body: any) => {
        const token = body.token;
        delete body.token;
        delete body.expired;
        const { data } = await useServer(`members/verify`, {
            method: "POST",
            body,
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        });
        return data.value;
    };
    const forgotPassword = async (body: any) => {
        const token = body.token;
        delete body.token;
        delete body.expired;
        const { data } = await useServer(`members/forgot-password`, {
            method: "POST",
            body,
        });
        return data.value;
    };
    const verifyPassword = async (body: any) => {
        const token = body.token;
        delete body.token;
        const { data } = await useServer(`members/verify-password`, {
            method: "POST",
            body,
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        });
        return data.value;
    };
    const resetPassword = async (body: any) => {
        const token = body.token;
        console.log("body reset===", token);
        // delete body.token;
        // delete body.expired;
        const { data } = await useServer(`members/reset-password`, {
            method: "PATCH",
            body,
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        });
        return data.value;
    };

    const updatedKYC = async (body: FormData) => {
        const { data } = await useServer(`members/kyc`, {
            method: "PATCH",
            body,
        });
        return data.value as MemberResponseModel;
    };

    const deletedDocument = async (id: string, body: { imageName: string }) => {
        const { data } = await useServer(`members/remove-document/${id}`, {
            method: "PATCH",
            body,
        });
        return data.value as MemberResponseModel;
    };

    const changePassword = async (body: any) => {
        const { data } = await useServer(`members/change-password`, {
            method: "PATCH",
            body,
        });
        return data.value as MemberResponseModel;
    };
    return {
        onEmitMemberData,
        onClearMemberData,
        onClearRegisterData,
        onClearForgotDataForm,
        setAll,
        setPagination,
        setProfile,
        register,
        updateProfile,
        login,
        setMenus,
        setManualMenus,
        clearOtpData,
        clearForgotData,
        setOtpData,
        setForgotData,
        verifyOTP,
        updatedKYC,
        deletedDocument,
        changePassword,
        forgotPassword,
        verifyPassword,
        resetPassword,

        getAll,
        getPagination,
        getProfile,

        members,
        profile,
        pagination,
        tab,
        registerData,
        forgotDataForm,
        otpData,
        forgotData,
        ctimetout,
    };
});
