import { setCookie } from "h3";
export const useMainStore = defineStore("mainStore", () => {
    const lagCode = useCookie<string>("locale");
    const lagName = useCookie<string>("lngName");
    const lagFlag = useCookie<string>("lngFlag");
    const tk = useCookie("token");

    /**
     *  references
     */
    const token = ref<any>(tk.value);
    const fcm = ref<string>("");
    const queryServerSide = ref<boolean>(false);
    const drawer = ref<boolean>(false);
    const rail = ref<boolean>(true);
    const mobile = ref<boolean>(false);
    const locale = ref<string>(lagCode.value);
    const language = ref({
        code: lagCode.value,
        name: lagName.value,
        flag: lagFlag.value,
    });
    const dialog = ref({
        isOpen: false,
        title: "",
        content: "",
        confirmText: "",
        cancelText: "",
        isSubmit: false,
    });
    const showSnackbar = ref({
        isOpen: false,
        isSuccess: false,
        message: "",
        timeout: 2000,
    });
    const imageViewer = ref({
        isOpen: false,
        src: "",
        list: [] as string[],
        index: 0,
    });

    const latlng = ref({
        lat: 17.970871945718454,
        lng: 102.61898636441526,
    });
    const currentlatlng = ref({
        lat: 17.970871945718454,
        lng: 102.61898636441526,
    });
    const defaultlatlng = ref({
        lat: 17.970871945718454,
        lng: 102.61898636441526,
    });

    /**
     *  computed
     */
    const isQueryServerSide = computed(() => queryServerSide.value);
    const isDrawer = computed(() => drawer.value);
    const isRail = computed(() => rail.value);
    const isMobile = computed(() => mobile.value);
    const isDialog = computed(() => dialog.value);
    const isShowSnackbar = computed(() => showSnackbar.value);
    const getLanguage = computed(() => language.value);
    const getImageViewer = computed(() => imageViewer.value);
    const getLatLng = computed(() => latlng.value);
    /**
     *  functions
     */
    const setQueryServerSide = (val: boolean) => {
        queryServerSide.value = val;
    };
    const setRail = (val: boolean) => {
        rail.value = val;
    };
    const setDrawer = (val: boolean) => {
        drawer.value = val;
    };
    const setMobile = (val: boolean) => {
        mobile.value = val;
    };
    const setLanguage = (item: {
        code: string;
        name: string;
        flag: string;
    }) => {
        if (import.meta.server) {
            const event = useRequestEvent(); // Nuxt wrapper for h3 event
            if (event) {
                setCookie(event, "locale", item?.code, {
                    maxAge: 365 * 24 * 60 * 60, // 365 days
                });
                setCookie(event, "lngName", item?.name, {
                    maxAge: 365 * 24 * 60 * 60, // 365 days
                });
                setCookie(event, "lngFlag", item?.flag, {
                    maxAge: 365 * 24 * 60 * 60, // 365 days
                });
            }
        } else {
            const lCode = useCookie("locale", {
                maxAge: 365 * 24 * 60 * 60,
            });
            const lName = useCookie("lngName", {
                maxAge: 365 * 24 * 60 * 60,
            });
            const lFlag = useCookie("lngFlag", {
                maxAge: 365 * 24 * 60 * 60,
            });

            lCode.value = item?.code;
            lName.value = item?.name;
            lFlag.value = item?.flag;
        }
        language.value = item;
        locale.value = item?.code;
    };

    const setToken = (val: any) => {
        token.value = val;
    };

    const setDialog = (val: {
        isOpen: boolean;
        title: string;
        content: string;
        confirmText: string;
        cancelText: string;
        isSubmit: boolean;
    }) => {
        dialog.value = val;
    };
    const setShowSnackbar = (val: {
        isOpen: boolean;
        isSuccess: boolean;
        message: string;
        timeout: number;
    }) => {
        showSnackbar.value = { ...val };
    };
    const setImageSrc = (val?: string) => {
        if (!val) {
            imageViewer.value = {
                isOpen: false,
                src: "",
                list: [],
                index: 0,
            };
            return;
        }
        imageViewer.value = {
            isOpen: true,
            src: val,
            list: [],
            index: 0,
        };
    };

    const setImageList = (val?: any, idx?: number) => {
        if (!val) {
            imageViewer.value = {
                isOpen: false,
                src: "",
                list: [],
                index: 0,
            };
            return;
        }
        imageViewer.value = {
            isOpen: true,
            src: "",
            list: val,
            index: idx || 0,
        };
    };
    const setImageListIndex = (idx?: number) => {
        imageViewer.value = {
            isOpen: imageViewer.value.isOpen,
            src: imageViewer.value.src,
            list: imageViewer.value.list,
            index: idx || 0,
        };
    };

    const setLatLng = (ltlg: { lat: number; lng: number }) => {
        latlng.value = ltlg;
    };
    const setCurrentLatLng = (latlng: { lat: number; lng: number }) => {
        currentlatlng.value = latlng;
    };

    return {
        queryServerSide,
        drawer,
        rail,
        mobile,
        dialog,
        showSnackbar,
        locale,
        language,
        imageViewer,
        token,
        fcm,

        isQueryServerSide,
        isDrawer,
        isRail,
        isMobile,
        isDialog,
        isShowSnackbar,
        getLanguage,
        getImageViewer,

        latlng,
        currentlatlng,
        defaultlatlng,
        getLatLng,

        setQueryServerSide,
        setRail,
        setDrawer,
        setMobile,
        setDialog,
        setShowSnackbar,
        setLanguage,
        setImageSrc,
        setImageList,
        setImageListIndex,
        setLatLng,
        setCurrentLatLng,
        setToken,
    };
});
