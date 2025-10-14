import type {
  LanguageModel,
  LanguagePaginationModel,
  LanguageResponseModel,
} from "~/models/language";

export const useLanguageStore = defineStore("languageStore", () => {
  /**
   *  references
   */
  const languages = ref<LanguageModel[]>([]);
  const languageOrigin = ref<LanguageModel[]>([]);
  const pagination = ref<LanguagePaginationModel>(
    {} as LanguagePaginationModel
  );
  const language = ref<LanguageModel>({
    id: null,
    code: null,
    name: null,
    flag: null,
    isActive: false,
    isMain: false,
  });

  /**
   *  computed
   */
  const getAll = computed(() => languages.value);
  const getPagination = computed(() => pagination.value);
  const getOne = computed(() => language.value);

  /**
   *  functions
   */
  const setAll = async () => {
    const { data } = await useServer(`languages`, {
      method: "GET",
      params: {
        q: "all",
      },
    });
    const response = data?.value as LanguageResponseModel;
    if (response?.success) {
      const res = response?.data as LanguageModel[];
      languages.value = res;
      languageOrigin.value = res?.map((item) => {
        return { ...item, text: "" };
      }) as LanguageModel[];
    }
  };

  const setPagination = async (params: Record<string, string>) => {
    pagination.value = DEFAULT_PAGINATION;
    const { data } = await useServer(`languages`, {
      method: "GET",
      params,
    });
    const response = data?.value as LanguageResponseModel;
    if (response?.success) {
      pagination.value = response?.data as LanguagePaginationModel;
    }
  };
  const setOne = async (id: string) => {
    language.value = {
      id: null,
      code: null,
      name: null,
      flag: null,
      isActive: false,
      isMain: false,
    } as LanguageModel;
    const { data } = await useServer(`languages/${id}`, {
      method: "GET",
    });
    const response = data?.value as LanguageResponseModel;
    if (response?.success) {
      const res = response?.data as LanguageModel;
      language.value = {
        ...res,
        id: res?.id,
        code: res?.code,
        name: res?.name,
        flag: res?.flag,
        isActive: res?.isActive,
      } as LanguageModel;
    }
  };

  return {
    setAll,
    setPagination,
    setOne,
    getAll,
    getOne,
    getPagination,
    languages,
    language,
    pagination,
    languageOrigin,
  };
});
