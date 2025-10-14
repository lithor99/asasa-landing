import type {
  TranslateModel,
  TranslatePaginationModel,
  TranslateResponseModel,
} from "~/models/translate";

export const useTranslateStore = defineStore("translateStore", () => {
  /**
   *  references
   */
  const translation = ref<Record<string, string>>({});
  const translates = ref<TranslateModel[]>([]);
  const pagination = ref<TranslatePaginationModel>(
    {} as TranslatePaginationModel
  );
  const translate = ref<TranslateModel>({
    id: null,
    key: null,
    text: {},
    type: [],
    mergeText: [],
  });

  /**
   *  computed
   */
  const getTranslation = computed(() => translation.value);
  const getAll = computed(() => translates.value);
  const getPagination = computed(() => pagination.value);
  const getOne = computed(() => translate.value);

  /**
   *  functions
   */
  const setAll = async () => {
    const { data } = await useServer(`translates`, {
      method: "GET",
      params: {
        q: "all",
        objectFormat: true,
      },
    });
    const response = data?.value as TranslateResponseModel;
    if (response?.success) {
      translates.value = response?.data as TranslateModel[];
    }
  };

  const setPagination = async (params: Record<string, string>) => {
    pagination.value = DEFAULT_PAGINATION;
    const { data } = await useServer(`translates`, {
      method: "GET",
      params,
    });
    const response = data?.value as TranslateResponseModel;
    if (response?.success) {
      pagination.value = response?.data as TranslatePaginationModel;
    }
  };
  const setOne = async (id: string) => {
    translate.value = {
      id: null,
      key: null,
      text: {},
      type: [],
      mergeText: [],
    } as TranslateModel;
    const { data } = await useServer(`translates/${id}`, {
      method: "GET",
    });
    const response = data?.value as TranslateResponseModel;
    if (response?.success) {
      const res = response?.data as TranslateModel;
      translate.value = {
        ...res,
        id: res?.id,
        key: res?.key,
        text: res?.text,
        type: res?.type,
        mergeText: useLanguageStore().languageOrigin.map((item) => ({
          ...item,
          text: res?.text[item.code as string] || "",
        })),
      } as TranslateModel;
    }
  };
  const setTranslation = async () => {
    const { data } = await useServer(`translates`, {
      method: "GET",
      params: {
        q: "all",
        objectFormat: true,
      },
    });
    const response = data?.value as TranslateResponseModel;
    if (response?.success) {
      translation.value = response?.data as Record<string, string>;
    }
  };

  const createLocale = async (body: Record<string, string>) => {
    const { data } = await useServer(`translates/locale`, {
      method: "POST",
      body,
    });
    setTranslation();
    return data.value as TranslateResponseModel;
  };
  return {
    setAll,
    setPagination,
    setOne,
    createLocale,
    setTranslation,

    getTranslation,
    getAll,
    getOne,
    getPagination,

    translation,
    translates,
    translate,
    pagination,
  };
});
