// import { useDegreeStore } from '~/stores/degree'
export default defineNuxtPlugin(async (_) => {
    try {
        const translateStore = useTranslateStore();
        await translateStore.setTranslation();
    } catch (error) {
        console.log(error);
    }
});
