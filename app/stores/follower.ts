import type {
    FollowerModel,
    FollowerPaginationModel,
} from "~/models/follower";

export const useFollowerStore = defineStore("FollowerStore", () => {
    /**
     *  references
     */
    const followers = ref<FollowerModel[]>([]);
    const pagination = ref<FollowerPaginationModel>(
        {} as FollowerPaginationModel,
    );

    /**
     *  computed
     */
    const getAll = computed(() => followers.value);
    const getPagination = computed(() => pagination.value);

    /**
     *  functions
     */

    const create = (async (body: any) => {
        const { data } = await useServer(`followers`, {
            method: "POST",
            body,
        });
        return data.value;
    });

    const setAll = async () => {
        const { data } = await useServer(`followers`, {
            method: "GET",
            params: {
                q: "all",
                objectFormat: true,
            },
        });
        const response: any = data?.value;
        if (response?.success) {
            followers.value = response?.data as FollowerModel[];
        }
    };

    const setPagination = async (params: Record<string, string>) => {
        pagination.value = DEFAULT_PAGINATION;
        const { data } = await useServer(`followers`, {
            method: "GET",
            params,
        });
        const response = data?.value  as any;
        if (response?.success) {
            pagination.value = response?.data as FollowerPaginationModel;
        }
    };
    
    return {
        create,
        setAll,
        setPagination,

        getAll,
        getPagination,

        followers,
        pagination,
    };
});
