import type {
    ObjectTypeModel,
    ObjectTypePaginationModel,
    ObjectTypeResponseModel,
} from "~/models/objectType";

export const useObjectLandTypeStore = defineStore("objectLandTypeStore", () => {
    /**
     *  references
     */
    const selectedType = ref(0);
    const isMap = ref(true);
    const objectTypes = ref<ObjectTypeModel[]>([]);
    const pagination = ref<ObjectTypePaginationModel>(
        {} as ObjectTypePaginationModel,
    );
    const objectType = ref<ObjectTypeModel>({
        id: null,
        code: null,
        name: {},
        mergeText: [],
        icon: null,
        img: null,
    });

    /**
     *  computed
     */
    const getAll = computed(() => objectTypes.value);
    const getPagination = computed(() => pagination.value);
    const getOne = computed(() => objectType.value);

    /**
     *  functions
     */
    const setSelectedType = (val: number) => {
        selectedType.value = val;
    };

    const onModeChanged = () => {
        isMap.value = !isMap.value;
    };

    const created = async (body: FormData) => {
        const { data } = await useServer(`object-land-types`, {
            method: "POST",
            body,
        });
        return data.value as ObjectTypeResponseModel;
    };
    const setAll = async () => {
        const { data } = await useServer(`object-land-types`, {
            method: "GET",
            params: {
                q: "all",
            },
        });
        const response = data?.value as ObjectTypeResponseModel;
        if (response?.success) {
            objectTypes.value = response?.data as ObjectTypeModel[];
        }
    };

    const setPagination = async (params: Record<string, string>) => {
        pagination.value = DEFAULT_PAGINATION;
        const { data } = await useServer(`object-land-types`, {
            method: "GET",
            params,
        });
        const response = data?.value as ObjectTypeResponseModel;
        if (response?.success) {
            pagination.value = response?.data as ObjectTypePaginationModel;
        }
    };
    const setOne = async (id: string) => {
        objectType.value = {
            id: null,
            code: null,
            name: {},
            mergeText: [],
            icon: null,
            img: null,
            isMenu: false,
            path: null,
        } as ObjectTypeModel;
        const { data } = await useServer(`object-land-types/${id}`, {
            method: "GET",
        });
        const response = data?.value as ObjectTypeResponseModel;
        if (response?.success) {
            const res = response?.data as ObjectTypeModel;
            objectType.value = {
                ...res,
                id: res?.id || null,
                code: res?.code || null,
                name: res?.name,
                mergeText: useLanguageStore().languageOrigin.map((item) => ({
                    ...item,
                    text: res?.name[item.code as string] || "",
                })),
                icon: res?.icon || null,
                img: res?.img || null,
            } as ObjectTypeModel;
        }
    };
    const updated = async (id: string, body: FormData) => {
        const { data } = await useServer(`object-land-types/${id}`, {
            method: "PATCH",
            body,
        });
        return data.value as ObjectTypeResponseModel;
    };
    const deleted = async (id: string) => {
        const { data } = await useServer(`object-land-types/${id}`, {
            method: "DELETE",
        });
        return data.value as ObjectTypeResponseModel;
    };

    const removeCatalog = async (id: string, body: Record<string, string>) => {
        const { data } = await useServer(
            `object-land-types/remove-catalog/${id}`,
            {
                method: "DELETE",
                body,
            },
        );
        return data.value as ObjectTypeResponseModel;
    };

    return {
        created,
        setAll,
        setPagination,
        setOne,
        updated,
        deleted,
        removeCatalog,
        setSelectedType,
        onModeChanged,

        getAll,
        getOne,
        getPagination,

        objectTypes,
        objectType,
        pagination,
        selectedType,
        isMap,
    };
});
