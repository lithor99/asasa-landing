import type {
    DashboardModel,
    DashboardResponseModel,
} from "~/models/dashboard";

export const useDashboardStore = defineStore("dashboardStore", () => {
    /**
     *  references
     */
    const dashboard = ref<DashboardModel>({
        land: {
            total: 0,
            offline: 0,
            online: 0,
            pledged: 0,
            selled: 0,
            selling: 0,
            pending: 0,
            totalAmount: {},
            offlineAmount: {},
            onlineAmount: {},
            pledgedAmount: {},
            selledAmount: {},
            sellingAmount: {},
            pendingAmount: {},
        },
    });

    /**
     *  computed
     */
    const getDashboard = computed(() => dashboard.value);

    /**
     *  functions
     */
    const setDashboard = async () => {
        dashboard.value = {
            land: {
                total: 0,
                offline: 0,
                online: 0,
                pledged: 0,
                selled: 0,
                selling: 0,
                pending: 0,
                totalAmount: {},
                offlineAmount: {},
                onlineAmount: {},
                pledgedAmount: {},
                selledAmount: {},
                sellingAmount: {},
                pendingAmount: {},
            }, // Add a default value for 'land' as required by DashboardModel
        } as DashboardModel;
        const { data } = await useServer(`dashboards`, {
            method: "GET",
        });
        const response = data?.value as DashboardResponseModel;
        if (response?.success) {
            const res = response?.data as DashboardModel;
            dashboard.value = {
                ...res,
                land: {
                    ...res.land,
                    total: res.land.total || 0,
                    offline: res.land.offline || 0,
                    online: res.land.online || 0,
                    pledged: res.land.pledged || 0,
                    selled: res.land.selled || 0,
                    selling: res.land.selling || 0,
                    pending: res.land.pending || 0,
                },
            } as DashboardModel;
        }
    };
    return {
        dashboard,

        getDashboard,

        setDashboard,
    };
});
