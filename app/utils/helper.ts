export const Helper = {
    cloneObject(data: any) {
        return JSON.parse(JSON.stringify(data));
    },
};

export const validateRequired = (value: string, fieldName: string) => {
    if (value && value?.toString()?.trim()) {
        return true;
    }
    return _tl(`${fieldName}_is_required`);
};


export const ObjectEntries = (obj: Record<string, string>) => {
    return (
        Object.entries(obj || {}).map(([code, html]) => {
            const language = useLanguageStore().languageOrigin.find(
                (lang) => lang.code === code,
            );
            return {
                code,
                text: html, // Keep original HTML (with <p> tags)
                name: language ? language.name : null,
                isMain: language?.isMain || false,
            };
        }) || []
    );
};
