import type {
    NotificationModel,
    NotificationPaginationModel,
    NotificationResponseModel,
} from "~/models/notification";

export const useNotificationsStore = defineStore("notificationsStore", () => {
    /**
     *  references
     */
    const notifications = ref<NotificationModel[]>([]);
    const notificationsList = ref<NotificationModel[]>([]);
    const pagination = ref<NotificationPaginationModel>(
        {} as NotificationPaginationModel,
    );
    const notification = ref<NotificationModel>({
        id: null,
        senderId: null,
        receiverId: null,
        title: null,
        body: null,
        content: null,
        path: null,
        color: null,
        isRead: null,
        isClear: null,
        isSuccess: null,
        sender: {
            profile: null,
            gender: null,
            nickname: null,
            firstName: null,
            lastName: null,
        },
        receiver: {
            profile: null,
            gender: null,
            nickname: null,
            firstName: null,
            lastName: null,
        },
    });

    /**
     *  computed
     */
    const getAll = computed(() => notifications.value);
    const getPagination = computed(() => pagination.value);
    const getOne = computed(() => notification.value);

    /**
     *  functions
     */
    const setAll = async () => {
        const { data } = await useServer(`notifications`, {
            method: "GET",
            params: {
                q: "all",
                objectFormat: true,
            },
        });
        const response = data?.value as NotificationResponseModel;
        if (response?.success) {
            notifications.value = response?.data as NotificationModel[];
        }
    };

    const setPagination = async (params: Record<string, string>) => {
        pagination.value = {} as NotificationPaginationModel;
        const { data } = await useServer(`notifications`, {
            method: "GET",
            params,
        });
        const response = data?.value as NotificationResponseModel;
        if (response?.success) {
            pagination.value = response?.data as NotificationPaginationModel;
            if (pagination.value.rows && pagination.value.rows.length > 0) {
                notificationsList.value = notificationsList.value.concat(
                    pagination.value.rows,
                );
            }
        }
    };
    const setOne = async (id: string) => {
        notification.value = {
            id: null,
            senderId: null,
            receiverId: null,
            title: null,
            body: null,
            content: null,
            path: null,
            color: null,
            isRead: null,
            isClear: null,
            isSuccess: null,
            sender: {
                profile: null,
                gender: null,
                nickname: null,
                firstName: null,
                lastName: null,
            },
            receiver: {
                profile: null,
                gender: null,
                nickname: null,
                firstName: null,
                lastName: null,
            },
        } as NotificationModel;
        const { data } = await useServer(`notifications/${id}`, {
            method: "GET",
        });
        const response = data?.value as NotificationResponseModel;
        if (response?.success) {
            const res = response?.data as NotificationModel;
            notification.value = {
                ...res,
                id: res?.id || null,
                senderId: res?.senderId || null,
                receiverId: res?.receiverId || null,
                title: res?.title || null,
                body: res?.body || null,
                content: res?.content || null,
                path: res?.path || null,
                color: res?.color || null,
                isRead: res?.isRead || null,
                isClear: res?.isClear || null,
                isSuccess: res?.isSuccess || null,
                sender: {
                    profile: res?.sender?.profile || null,
                    gender: res?.sender?.gender || null,
                    nickname: res?.sender?.nickname || null,
                    firstName: res?.sender?.firstName || null,
                    lastName: res?.sender?.lastName || null,
                },
                receiver: {
                    profile: res?.receiver?.profile || null,
                    gender: res?.receiver?.gender || null,
                    nickname: res?.receiver?.nickname || null,
                    firstName: res?.receiver?.firstName || null,
                    lastName: res?.receiver?.lastName || null,
                },
            } as NotificationModel;
        }
    };

    const setRead = async (id: string) => {
        const { data } = await useServer(`notifications/${id}`, {
            method: "PATCH",
        });
        return data.value as NotificationModel;
    };

    const setClearNotificationList = () => {
        notificationsList.value = [];
    };

    return {
        setAll,
        setPagination,
        setOne,
        setRead,
        setClearNotificationList,

        getAll,
        getOne,
        getPagination,

        notifications,
        notificationsList,
        notification,
        pagination,
    };
});
