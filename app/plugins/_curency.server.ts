// import { useDegreeStore } from '~/stores/degree'
export default defineNuxtPlugin(async (_) => {
    const currencyStore = useCurrencyStore();
    await currencyStore.setAll();
});
