<script setup lang="ts">
/**
 *  props
 */
const props = defineProps({
    options: {
        type: Array as () => {
            value: string;
            label: string;
        }[],
        default: () => [],
    },
    value: {
        type: String,
        default: "",
    },
    label: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
    classStyle: {
        type: String,
        default:
            "w-full bg-secondary bg-opacity-30 text-main p-2 px-4 rounded shadow-box-inset text-start",
    },
});
const emit = defineEmits(["updated", "update:value"]);

/**
 *  reference
 */
const showDropdown = ref<boolean>(false);
const highlightedIndex = ref<number>(-1);
const dropdownBelow = ref<boolean>(true);
const autocomplete = ref<HTMLDivElement>();
const dropdown = ref<HTMLDivElement>();
const query = ref(
    props.options?.find((item) => props.value === item.value)?.label || "",
);

// Filtered list based on query
const filteredItems = computed(() =>
    props.options?.filter((item) =>
        item?.label?.toLowerCase()?.includes(query.value?.toLowerCase()),
    ),
);
/**
 *  methods
 */
// Move highlight down
const highlightNext = () => {
    if (highlightedIndex.value < filteredItems.value.length - 1) {
        highlightedIndex.value++;
    }
};

// Move highlight up
const highlightPrev = () => {
    if (highlightedIndex.value > 0) {
        highlightedIndex.value--;
    }
};

// Select item from dropdown
const selectItem = (item: { value: string; label: string }) => {
    emit("update:value", item.value);
    emit("updated");
    query.value = item.label;
    showDropdown.value = false;
    highlightedIndex.value = -1;
};

// Select highlighted item
const selectHighlighted = () => {
    if (highlightedIndex.value !== -1) {
        selectItem(filteredItems.value[highlightedIndex.value]);
    }
};

// Hide dropdown when clicking outside
const hideDropdown = () => {
    setTimeout(() => (showDropdown.value = false), 200);
};

// Adjust dropdown position
const updateDropdownPosition = () => {
    if (autocomplete.value) {
        const rect = autocomplete.value.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        dropdownBelow.value = spaceBelow > 150;
    }
};
const onInput = () => {
    showDropdown.value = true;
    emit("update:value", query.value);
};

/**
 *  onMounted
 */
onMounted(() => {
    window.addEventListener("resize", updateDropdownPosition);
    updateDropdownPosition();
});

onUnmounted(() => {
    window.removeEventListener("resize", updateDropdownPosition);
});
</script>
<template>
    <div ref="autocomplete" class="relative w-full">
        <!-- Input Field -->
        <input
            v-model="query"
            type="text"
            :placeholder="placeholder"
            :class="classStyle"
            @focus="showDropdown = true"
            @keydown.down.prevent="highlightNext"
            @keydown.up.prevent="highlightPrev"
            @keydown.enter.prevent="selectHighlighted"
            @blur="hideDropdown"
            @input="onInput"
        />

        <Icon
            name="flowbite:angle-top-solid"
            size="20"
            class="absolute right-1 top-2 text-secondary transition-transform"
            :class="{
                '-rotate-180': showDropdown && dropdownBelow,
                'rotate-180': showDropdown && !dropdownBelow,
            }"
            mode="svg"
        />
        <!-- Dropdown "-->
        <div
            v-if="showDropdown"
            ref="dropdown"
            class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden"
            :class="dropdownBelow ? 'mt-1' : 'bottom-full mb-1'"
        >
            <ul
                v-if="filteredItems.length"
                class="w-full bg-main bg-opacity-40"
            >
                <li
                    v-for="(item, index) in filteredItems"
                    :key="index"
                    class="px-4 py-2 cursor-pointer hover:bg-secondary hover:bg-opacity-10 hover:font-bold transition-all rounded"
                    :class="{
                        'bg-primary': index === highlightedIndex,
                    }"
                    @mousedown.prevent="selectItem(item)"
                >
                    {{ item?.label }}
                </li>
            </ul>
            <div
                v-else
                class="w-full h-20 bg-main bg-opacity-40 p-2 pt-6 text-center text-secondary text-opacity-50"
            >
                {{ _tl("no_data_found") }}
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Smooth transition */
ul {
    transition: all 0.2s ease-in-out;
}
</style>
