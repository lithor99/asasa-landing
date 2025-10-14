export const CDN = () => {
    const config = useRuntimeConfig();
    return config.public.CDN;
};
