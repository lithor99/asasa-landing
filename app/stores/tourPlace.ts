import type {
    TourPlaceModel,
    TourPlacePaginationModel,
} from "~/models/tourPlace";

export const useTourPlaceStore = defineStore("TourPlaceStore", () => {
    /**
     *  references
     */
    const tourPlaces = ref<TourPlaceModel[]>([]);
    const pagination = ref<TourPlacePaginationModel>(
        {} as TourPlacePaginationModel,
    );
    const tourPlace = ref<TourPlaceModel>();

    /**
     *  computed
     */
    const getAll = computed(() => tourPlaces.value);
    const getPagination = computed(() => pagination.value);
    const getOne = computed(() => tourPlace.value);

    /**
     *  functions
     */
    const setAll = async () => {
        const { data } = await useServer(`tour-places`, {
            method: "GET",
            params: {
                q: "all",
                objectFormat: true,
            },
        });
        const response: any = data?.value;
        if (response?.success) {
            tourPlaces.value = response?.data as TourPlaceModel[];
        }
    };

    const setPagination = async (params: Record<string, string>) => {
        pagination.value = DEFAULT_PAGINATION;
        const { data } = await useServer(`tour-places`, {
            method: "GET",
            params,
        });
        const response = data?.value  as any;
        if (response?.success) {
            pagination.value = response?.data as TourPlacePaginationModel;
        }
    };
    const setOne = async (id: string) => {
        // tourPlace.value = {
        //     id: null,
        //     name: {},
        //     mergeText: [],
        //     lat: null,
        //     lng: null,
        // } as TourPlaceModel;
        const { data } = await useServer(`tour-places/${id}`, {
            method: "GET",
        });
        const response = data?.value as any;
        if (response?.success) {
            const res = response?.data as TourPlaceModel;
            tourPlace.value = {
                ...res,
            } as TourPlaceModel;
        }
    };
    
    return {
        setAll,
        setPagination,
        setOne,

        getAll,
        getOne,
        getPagination,

        tourPlaces,
        tourPlace,
        pagination,
    };
});
