import type {
    ObjectLandGradeModel,
    ObjectLandGradePaginationModel,
    ObjectLandGradeResponseModel,
} from "~/models/objectLandGrade";

export const useObjectLandGradeStore = defineStore(
    "objectLandGradeStore",
    () => {
        /**
         *  references
         */
        const objectGrades = ref<ObjectLandGradeModel[]>([]);
        const pagination = ref<ObjectLandGradePaginationModel>(
            {} as ObjectLandGradePaginationModel,
        );
        const objectGarde = ref<ObjectLandGradeModel>({
            id: null,
            name: {},
            mergeText: [],
        });

        /**
         *  computed
         */
        const getAll = computed(() => objectGrades.value);
        const getPagination = computed(() => pagination.value);
        const getOne = computed(() => objectGarde.value);

        /**
         *  functions
         */
        const created = async (
            body: Record<string, Record<string, string>>,
        ) => {
            const { data } = await useServer(`land-grades`, {
                method: "POST",
                body,
            });
            return data.value as ObjectLandGradeResponseModel;
        };
        const setAll = async () => {
            const { data } = await useServer(`land-grades`, {
                method: "GET",
                params: {
                    q: "all",
                },
            });
            const response = data?.value as ObjectLandGradeResponseModel;
            if (response?.success) {
                objectGrades.value = response?.data as ObjectLandGradeModel[];
            }
        };

        const setPagination = async (params: Record<string, string>) => {
            pagination.value = DEFAULT_PAGINATION;
            const { data } = await useServer(`land-grades`, {
                method: "GET",
                params,
            });
            const response = data?.value as ObjectLandGradeResponseModel;
            if (response?.success) {
                pagination.value =
                    response?.data as ObjectLandGradePaginationModel;
            }
        };
        const setOne = async (id: string) => {
            objectGarde.value = {
                id: null,
                name: {},
                mergeText: [],
            } as ObjectLandGradeModel;
            const { data } = await useServer(`land-grades/${id}`, {
                method: "GET",
            });
            const response = data?.value as ObjectLandGradeResponseModel;
            if (response?.success) {
                const res = response?.data as ObjectLandGradeModel;
                objectGarde.value = {
                    ...res,
                    id: res?.id || null,
                    name: res?.name,
                    mergeText: useLanguageStore().languageOrigin.map(
                        (item) => ({
                            ...item,
                            text: res?.name[item.code as string] || "",
                        }),
                    ),
                } as ObjectLandGradeModel;
            }
        };
        const updated = async (id: string, body: Record<string, string>) => {
            const { data } = await useServer(`land-grades/${id}`, {
                method: "PATCH",
                body,
            });
            return data.value as ObjectLandGradeResponseModel;
        };
        const deleted = async (id: string) => {
            const { data } = await useServer(`land-grades/${id}`, {
                method: "DELETE",
            });
            return data.value as ObjectLandGradeResponseModel;
        };

        return {
            created,
            setAll,
            setPagination,
            setOne,
            updated,
            deleted,

            getAll,
            getOne,
            getPagination,

            objectGrades,
            objectGarde,
            pagination,
        };
    },
);
