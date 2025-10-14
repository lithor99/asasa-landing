<script setup lang="ts">
defineProps({
    colspan: {
        type: String,
        default: "0",
    },
    loading: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <tbody>
        <tr class="bg-main bg-opacity-10">
            <td :colSpan="colspan" class="text-center h-20">
                <div
                    v-if="loading"
                    class="flex align-center justify-center items-center font-bold"
                >
                    <Icon name="eos-icons:loading" size="20" mode="svg" />
                    <span v-if="!btn" class="ml-2 animate-pulse">{{
                        _tl("loading")
                    }}</span>
                </div>
                <strong v-else>{{ _tl("no_data_found") }}</strong>
            </td>
        </tr>
    </tbody>
</template>
