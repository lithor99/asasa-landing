import type {
    NewsModel,
    NewsPaginationModel,
} from "~/models/news";

export const useNewsStore = defineStore("NewsStore", () => {
    /**
     *  references
     */
    const newsList = ref<NewsModel[]>([]);
    const pagination = ref<NewsPaginationModel>(
        {} as NewsPaginationModel,
    );
    const news = ref<NewsModel>();

    /**
     *  computed
     */
    const getAll = computed(() => newsList.value);
    const getPagination = computed(() => pagination.value);
    const getOne = computed(() => news.value);

    /**
     *  functions
     */
    const setAll = async () => {
        const { data } = await useServer(`news`, {
            method: "GET",
            params: {
                q: "all",
                objectFormat: true,
            },
        });
        const response: any = data?.value;
        if (response?.success) {
            newsList.value = response?.data as NewsModel[];
        }
    };

    const setPagination = async (params: Record<string, string>) => {
        pagination.value = DEFAULT_PAGINATION;
        const { data } = await useServer(`news`, {
            method: "GET",
            params,
        });
        const response = data?.value  as any;
        if (response?.success) {
            pagination.value = response?.data as NewsPaginationModel;
        }
    };
    const setOne = async (id: string) => {
        const { data } = await useServer(`news/${id}`, {
            method: "GET",
        });
        const response = data?.value as any;
        if (response?.success) {
            const res = response?.data as NewsModel;
            news.value = {
                ...res,
            } as NewsModel;
        }
    };
    
    return {
        setAll,
        setPagination,
        setOne,

        getAll,
        getOne,
        getPagination,

        newsList,
        news,
        pagination,
    };
});
