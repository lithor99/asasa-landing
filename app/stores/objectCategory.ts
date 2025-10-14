import type {
  ObjectCategoryModel,
  ObjectCategoryPaginationModel,
  ObjectCategoryResponseModel,
} from "~/models/objectCategory";

export const useObjectCategoryStore = defineStore("objectCategoryStore", () => {
  /**
   *  references
   */
  const objectCategories = ref<ObjectCategoryModel[]>([]);
  const pagination = ref<ObjectCategoryPaginationModel>(
    {} as ObjectCategoryPaginationModel
  );
  const objectCategory = ref<ObjectCategoryModel>({
    id: null,
    code: null,
    name: {},
    mergeText: [],
    icon: null,
    img: null,
    catalog: [],
  });

  /**
   *  computed
   */
  const getAll = computed(() => objectCategories.value);
  const getPagination = computed(() => pagination.value);
  const getOne = computed(() => objectCategory.value);

  /**
   *  functions
   */
  const setAll = async () => {
    const { data } = await useServer(`object-categories`, {
      method: "GET",
      params: {
        q: "all",
      },
    });
    const response = data?.value as ObjectCategoryResponseModel;
    if (response?.success) {
      objectCategories.value = response?.data as ObjectCategoryModel[];
    }
  };

  const setPagination = async (params: Record<string, string>) => {
    pagination.value = DEFAULT_PAGINATION;
    const { data } = await useServer(`object-categories`, {
      method: "GET",
      params,
    });
    const response = data?.value as ObjectCategoryResponseModel;
    if (response?.success) {
      pagination.value = response?.data as ObjectCategoryPaginationModel;
    }
  };
  const setOne = async (id: string) => {
    objectCategory.value = {
      id: null,
      code: null,
      name: {},
      mergeText: [],
      icon: null,
      img: null,
      catalog: [],
    } as ObjectCategoryModel;
    const { data } = await useServer(`object-categories/${id}`, {
      method: "GET",
    });
    const response = data?.value as ObjectCategoryResponseModel;
    if (response?.success) {
      const res = response?.data as ObjectCategoryModel;
      objectCategory.value = {
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
        catalog: res?.catalog || [],
      } as ObjectCategoryModel;
    }
  };

  return {
    setAll,
    setPagination,
    setOne,

    getAll,
    getOne,
    getPagination,

    objectCategories,
    objectCategory,
    pagination,
  };
});
