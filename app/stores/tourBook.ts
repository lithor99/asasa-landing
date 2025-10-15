import type { TourBookModel } from "~/models/tourBook";

export const useTourBookStore = defineStore("TourBookStore", () => {
    /**
    /**
     *  references
     */
    const tourBook = ref<TourBookModel>();
    /**
     *  computed
     */
    const getOne = computed(() => tourBook.value);

    /**
     *  functions
     */

    const create = async (body: any) => {
        const { data } = await useServer(`tour-books`, {
            method: "POST",
            body,
        });
        return data.value;
    };

    const setOne = async (id: string) => {
        const { data } = await useServer(`tour-books/${id}`, {
            method: "POST",
        });
        const response = data?.value as any;
        if (response?.success) {
            const res = response?.data as TourBookModel;
            tourBook.value = {
                ...res,
            } as TourBookModel;
        }
    };

    return {
        create,
        setOne,

        getOne,

        tourBook,
    };
});
