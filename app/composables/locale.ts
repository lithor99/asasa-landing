export const _tljson = (text: any) => {
    const mainStore = useMainStore();
    const languageStore = useLanguageStore();
    try {
        const mainlang =
            languageStore.getAll?.find((itm) => itm?.isMain) ||
            languageStore.getAll[0];
        return text?.[mainStore.locale] || text?.[mainlang?.code as string];
    } catch (error) {
        console.log(error);
        return "";
    }
};

export const _tl = (code: string) => {
    const translationStore = useTranslateStore();
    try {
        const text = translationStore.getTranslation[code];
        if (!text && import.meta.client) {
            translationStore.createLocale({ key: code });
        }
        return _tljson(text) || code;
    } catch (error) {
        console.log(error);
        return code;
    }
};
