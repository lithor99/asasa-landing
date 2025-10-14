import type {
    ObjectLandModel,
    ObjectLandPaginationModel,
    ObjectLandResponseModel,
    PopularAndProvinceModel,
    PopularResponseModel,
} from "~/models/objectLand";

export const useObjectLandStore = defineStore("objectLandStore", () => {
    /**
     *  references
     */
    const valuation = ref<any>([]);
    const objects = ref<ObjectLandModel[]>([]);
    const pagination = ref<ObjectLandPaginationModel>(
        {} as ObjectLandPaginationModel,
    );
    const landsByType = ref<ObjectLandModel[]>([]);
    const popular = ref<PopularAndProvinceModel>({} as PopularAndProvinceModel);
    const object = ref<ObjectLandModel>({
        id: null,
        categoryId: "",
        typeId: "",
        gradeId: "",
        code: null,
        name: {},
        mergeText: [],
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
        isValuation: false,
        isEmpty: false,
        status: null,
        searchVector: null,
        provinceId: "",
        districtId: "",
        village: null,
        deliveryPeriod: null,
        createdByMember: null,
        multiplePrice: [],
        descriptions: [],
        isAction: false,
    });
    const views = ref<ObjectLandPaginationModel>(
        {} as ObjectLandPaginationModel,
    );

    /**
     *  computed
     */
    const getAll = computed(() => objects.value);
    const getPagination = computed(() => pagination.value);
    const getOne = computed(() => object.value);
    const getPopular = computed(() => popular.value);
    const getValuation = computed(() => valuation.value);
    const getViewsPagination = computed(() => views.value);
    const getLandsByType = computed(() => landsByType.value);

    /**
     *  functions
     */
    const created = async (body: FormData) => {
        const { data } = await useServer(`object-land`, {
            method: "POST",
            body,
        });
        return data.value as ObjectLandResponseModel;
    };
    const updateView = async (body: any) => {
        const { data } = await useServer(`object-land/update-view`, {
            method: "PATCH",
            body,
        });
        return data.value as ObjectLandResponseModel;
    };
    const setAll = async () => {
        const { data } = await useServer(`object-land`, {
            method: "GET",
            params: {
                q: "all",
            },
        });
        const response = data?.value as ObjectLandResponseModel;
        if (response?.success) {
            objects.value = response?.data as ObjectLandModel[];
        }
    };
    const setPagination = async (params: Record<string, string>) => {
        pagination.value = DEFAULT_PAGINATION;
        const { data } = await useServer(`object-land`, {
            method: "GET",
            params,
        });
        const response = data?.value as ObjectLandResponseModel;
        if (response?.success) {
            pagination.value = response?.data as ObjectLandPaginationModel;
        }
    };

    const setPaginationOwner = async (
        params: Record<string, string | number>,
    ) => {
        pagination.value = DEFAULT_PAGINATION;
        const { data } = await useServer(`object-land/owner`, {
            method: "GET",
            params,
        });
        const response = data?.value as ObjectLandResponseModel;
        if (response?.success) {
            pagination.value = response?.data as ObjectLandPaginationModel;
        }
    };
    const setNearest = async (params: Record<string, string>) => {
        pagination.value = DEFAULT_PAGINATION;
        const { data } = await useServer(`object-land/near-by`, {
            method: "GET",
            params,
        });
        const response = data?.value as ObjectLandResponseModel;
        if (response?.success) {
            pagination.value = response?.data as ObjectLandPaginationModel;
            landsByType.value = landsByType.value.concat(
                pagination.value.rows || [],
            );
        }
    };

    const cleanLandsByType = () => {
        landsByType.value = [];
    };

    const setPopular = async (params: Record<string, string>) => {
        const { data } = await useServer(`object-land/popular`, {
            method: "GET",
            params,
        });
        const response = data?.value as PopularResponseModel;
        if (response?.success) {
            popular.value = response?.data as PopularAndProvinceModel;
        }
    };

    const setViews = async (params: any) => {
        const { data } = await useServer(`object-land/views`, {
            method: "GET",
            params,
        });
        const response = data?.value as ObjectLandResponseModel;
        if (response?.success) {
            views.value = response?.data as ObjectLandPaginationModel;
        }
    };

    const setOneManual = (res: any) => {
        object.value = {
                ...res,
                id: res?.id || null,
                code: res?.code || "",
                categoryId: res?.categoryId || "",
                typeId: res?.typeId || "",
                name: res?.name || {},
                mergeText: useLanguageStore().languageOrigin.map((item) => ({
                    ...item,
                    text: res?.name[item.code as string] || "",
                })),
                names: ObjectEntries(res?.name),
                gradeId: res?.gradeId || "",
                area: res?.area || null,
                prices: res?.prices || [],
                sysPercent: res?.sysPercent || "",
                image: res?.image || null,
                images: res?.images || [],
                remark: res?.remark || null,
                video: res?.video || null,
                lat: res?.lat || null,
                lng: res?.lng || null,
                view: res?.view || 0,
                isValuation: res?.isValuation || false,
                isEmpty: res?.isEmpty || false,
                status: res?.status || null,
                searchVector: res?.searchVector || null,
                provinceId: res?.provinceId || "",
                districtId: res?.districtId || "",
                village: res?.village || "",
                deliveryPeriod: res?.deliveryPeriod || null,
                createdByMember: res?.createdByMember || "",
                category: res?.category || { name: {} },
                type: res?.type || { name: {} },
                province: res?.province || { name: {} },
                district: res?.district || { name: {} },
                grade: res?.grade || { name: {} },
                description: res?.description || {},
                descriptions:
                    Object.entries(res?.description).map(([code, html]) => {
                        const language = useLanguageStore().languageOrigin.find(
                            (lang) => lang.code === code,
                        );
                        return {
                            code,
                            text: html, // Keep original HTML (with <p> tags)
                            name: language ? language.name : null,
                        };
                    }) || [],
                multiplePrice:
                    res?.prices?.map((item) => ({
                        price: item.price ? parseFloat(item.price) : null,
                        totalPrice: item.totalPrice
                            ? parseFloat(item.totalPrice)
                            : null,
                        currency: item.currency || "",
                        currencyName:
                            _tljson(
                                useCurrencyStore().currencies.find(
                                    (curr) => curr.code === item.currency,
                                )?.name,
                            ) || "",
                    })) || [],
                isAction: false,
            } as ObjectLandModel;
    }
    const setClearOne = () => {
        object.value = {
            id: null,
            categoryId: "",
            typeId: "",
            gradeId: "",
            code: null,
            name: {},
            mergeText: [],
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
            isValuation: false,
            isEmpty: false,
            status: null,
            searchVector: null,
            provinceId: "",
            districtId: "",
            village: null,
            deliveryPeriod: null,
            createdByMember: null,
            multiplePrice: [],
            descriptions: [],
            isAction: false,
        } as ObjectLandModel;
    }

    const setOne = async (params: any) => {
        
        const { data } = await useServer(`object-land/${params.id}`, {
            method: "GET",
            params,
        });
        const response = data?.value as ObjectLandResponseModel;
        if (response?.success) {
            const res = response?.data as ObjectLandModel;
            object.value = {
                ...res,
                id: res?.id || null,
                code: res?.code || "",
                categoryId: res?.categoryId || "",
                typeId: res?.typeId || "",
                name: res?.name || {},
                mergeText: useLanguageStore().languageOrigin.map((item) => ({
                    ...item,
                    text: res?.name[item.code as string] || "",
                })),
                names: ObjectEntries(res?.name),
                gradeId: res?.gradeId || "",
                area: res?.area || null,
                prices: res?.prices || [],
                sysPercent: res?.sysPercent || "",
                image: res?.image || null,
                images: res?.images || [],
                remark: res?.remark || null,
                video: res?.video || null,
                lat: res?.lat || null,
                lng: res?.lng || null,
                view: res?.view || 0,
                isValuation: res?.isValuation || false,
                isEmpty: res?.isEmpty || false,
                status: res?.status || null,
                searchVector: res?.searchVector || null,
                provinceId: res?.provinceId || "",
                districtId: res?.districtId || "",
                village: res?.village || "",
                deliveryPeriod: res?.deliveryPeriod || null,
                createdByMember: res?.createdByMember || "",
                category: res?.category || { name: {} },
                type: res?.type || { name: {} },
                province: res?.province || { name: {} },
                district: res?.district || { name: {} },
                grade: res?.grade || { name: {} },
                description: res?.description || {},
                descriptions:
                    Object.entries(res?.description).map(([code, html]) => {
                        const language = useLanguageStore().languageOrigin.find(
                            (lang) => lang.code === code,
                        );
                        return {
                            code,
                            text: html, // Keep original HTML (with <p> tags)
                            name: language ? language.name : null,
                        };
                    }) || [],
                multiplePrice:
                    res?.prices?.map((item) => ({
                        price: item.price ? parseFloat(item.price) : null,
                        totalPrice: item.totalPrice
                            ? parseFloat(item.totalPrice)
                            : null,
                        currency: item.currency || "",
                        currencyName:
                            _tljson(
                                useCurrencyStore().currencies.find(
                                    (curr) => curr.code === item.currency,
                                )?.name,
                            ) || "",
                    })) || [],
                isAction: false,
            } as ObjectLandModel;
        }
    };

    const setValuation = async (params: Record<string, any>) => {
        const { data } = await useServer(`object-land/valuation`, {
            method: "GET",
            params,
        });
        const response = data?.value as any;
        if (response?.success) {
            valuation.value = response?.data as any;
        }
        return response;
    };

    const updated = async (id: string, body: FormData) => {
        const { data } = await useServer(`object-land/${id}`, {
            method: "PATCH",
            body,
        });
        return data.value as ObjectLandResponseModel;
    };

    const deletedImage = async (id: string, params: { imageName: string }) => {
        const { data } = await useServer(`object-land/remove-image/${id}`, {
            method: "PATCH",
            params,
        });
        return data.value as ObjectLandResponseModel;
    };

    const deleted = async (id: string) => {
        const { data } = await useServer(`object-land/${id}`, {
            method: "DELETE",
        });
        return data.value as ObjectLandResponseModel;
    };

    const active = async (id: string) => {
        const { data } = await useServer(`object-land/active/${id}`, {
            method: "PATCH",
        });
        return data.value as ObjectLandResponseModel;
    };
    const inactive = async (id: string) => {
        const { data } = await useServer(`object-land/inactive/${id}`, {
            method: "PATCH",
        });
        return data.value as ObjectLandResponseModel;
    };
    const pledgeSell = async (id: string, status: string) => {
        const { data } = await useServer(`object-land/pledge-sell/${id}`, {
            method: "PATCH",
            body: {
                status,
            },
        });
        return data.value as ObjectLandResponseModel;
    };
    const hot = async (id: string) => {
        const { data } = await useServer(`object-land/hot/${id}`, {
            method: "PATCH",
        });
        return data.value as ObjectLandResponseModel;
    };
    return {
        created,
        updateView,
        setAll,
        setPaginationOwner,
        setPagination,
        setNearest,
        setOneManual,
        setClearOne,
        setOne,
        updated,
        deletedImage,
        deleted,
        active,
        inactive,
        pledgeSell,
        hot,
        setPopular,
        setViews,
        setValuation,
        cleanLandsByType,

        getAll,
        getOne,
        getPagination,
        getPopular,
        getViewsPagination,
        getValuation,
        getLandsByType,

        objects,
        object,
        landsByType,
        pagination,
        popular,
        views,
        valuation,
    };
});
