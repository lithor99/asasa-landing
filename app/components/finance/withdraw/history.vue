<script setup lang="ts">
import { Selected } from "#components";

/**
 *  Store
 */
const { setQueryServerSide, isQueryServerSide } = useMainStore();

const withdrawStore = useWithdrawStore();

/**
 *  reference
 */
const loading = ref<boolean>(false);
const limit = ref<number>(50);
const page = ref<number>(1);
const search = ref<string>("");
const formData = ref({
  memberId: "",
  agentId: "",
  status: "",
  startDate: "",
  endDate: "",
});

const STATUS = computed(() => {
  return [
    { value: "", label: _tl("all") },
    { value: "APPROVED", label: _tl("APPROVED") },
    { value: "REJECTED", label: _tl("REJECTED") },
  ];
});
const onPagination = async () => {
  loading.value = true;
  let _filter = {};
  if (page.value) {
    _filter = {
      ..._filter,
      page: page.value,
    };
  }
  if (limit.value) {
    _filter = {
      ..._filter,
      limit: limit.value,
    };
  }
  if (search.value) {
    _filter = {
      ..._filter,
      search: search.value,
    };
  }
  if (formData.value.agentId) {
    _filter = {
      ..._filter,
      agentId: formData.value.agentId,
    };
  }
  if (formData.value.memberId) {
    _filter = {
      ..._filter,
      memberId: formData.value.memberId,
    };
  }
  if (formData.value.status) {
    _filter = {
      ..._filter,
      status: [formData.value.status],
    };
  } else {
    _filter = {
      ..._filter,
      status: ["APPROVED", "REJECTED"],
    };
  }
  if (formData.value.startDate && formData.value.endDate) {
    _filter = {
      ..._filter,
      startDate: formData.value.startDate,
      endDate: formData.value.endDate,
    };
  }
  await withdrawStore.setPagination(_filter);
  loading.value = false;
};
/**
 *  server render
 */
if (import.meta.server) {
  loading.value = true;
  onPagination();
  setQueryServerSide(true);
  loading.value = false;
}
/**
 *  client render
 */
onMounted(async () => {
  loading.value = true;
  if (!isQueryServerSide) {
    await onPagination();
  }
  setQueryServerSide(false);
  loading.value = false;
});

/**
 *  Method
 */
const onRefresh = async () => {
  limit.value = 50;
  page.value = 1;
  search.value = "";
  formData.value = {
    memberId: "",
    agentId: "",
    status: "",
    startDate: "",
    endDate: "",
  };
  await onPagination();
};
</script>

<template>
  <div class="">
    <div class="mt-1">
      <div class="grid grid-cols-12 gap-2 space-y-4 mb-5">
        <div class="col-span-12 md:col-span-6 xl:md:col-span-3">
          <div>{{ _tl("status") }}</div>
          <Selected
            v-model:value="formData.status"
            :placeholder="`${_tl('select_status')}`"
            :options="STATUS"
            @updated="onPagination"
          />
        </div>
        <div class="col-span-12 md:col-span-6 xl:md:col-span-3">
          <div>{{ _tl("start_date") }}</div>
          <input
            v-model="formData.startDate"
            type="date"
            class="w-full bg-secondary bg-opacity-30 text-main p-2 px-4 rounded shadow-box-inset"
            :placeholder="`${_tl('enter_start_date')}`"
            @change="onPagination"
          />
        </div>
        <div class="col-span-12 md:col-span-6 xl:md:col-span-3">
          <div>{{ _tl("end_date") }}</div>
          <input
            v-model="formData.endDate"
            type="date"
            class="w-full bg-secondary bg-opacity-30 text-main p-2 px-4 rounded shadow-box-inset"
            :placeholder="`${_tl('enter_end_date')}`"
            :min="formData.startDate"
            @change="onPagination"
          />
        </div>
        <div class="col-span-12 md:col-span-6 xl:md:col-span-6">
          <div>{{ _tl("search") }}</div>
          <Search
            v-model:text="search"
            :loading="loading"
            @on-search="onPagination"
            @on-refresh="onRefresh"
          />
        </div>
      </div>
      <div class="flex justify-between align-center my-1">
        <strong>
          {{ _tl("total") }}
          {{ Number(withdrawStore.pagination?.count || 0).toLocaleString() }}
        </strong>
        <div class="flex gap-2">
          <BtnExcel />
        </div>
      </div>
      <div class="overflow-x-auto w-full relative">
        <div
          v-if="loading"
          class="absolute animate-pulse w-full h-1 bg-primary bg-opacity-80 text-transparent rounded select-none"
        ></div>
        <table class="table-auto min-w-full">
          <thead>
            <tr class="h-14 text-center bg-main bg-opacity-50">
              <th
                class="border border-secondary border-opacity-10 text-center hidden md:table-cell w-14"
              >
                {{ _tl("sequence") }}
              </th>

              <th
                class="border border-secondary border-opacity-10 text-center w-40"
              >
                {{ _tl("withdraw_amount") }}
              </th>
              <th
                class="border border-secondary border-opacity-10 text-start min-w-40"
              >
                {{ _tl("customer") }}
              </th>
              <th
                class="border border-secondary border-opacity-10 text-start min-w-40"
              >
                {{ _tl("approver") }}
              </th>
              <th
                class="border border-secondary border-opacity-10 text-start min-w-40"
              >
                {{ _tl("agent") }}
              </th>
              <th
                class="border border-secondary border-opacity-10 text-center hidden md:table-cell w-40"
              >
                {{ _tl("date") }}
              </th>
              <th
                class="border border-secondary border-opacity-10 text-center w-32"
              >
                {{ _tl("status") }}
              </th>
              <th
                class="border border-secondary border-opacity-10 text-center w-32"
              >
                {{ _tl("option") }}
              </th>
            </tr>
          </thead>

          <tbody v-if="withdrawStore.pagination?.rows?.length > 0">
            <tr
              v-for="(item, index) in withdrawStore.pagination?.rows"
              :key="index"
              :class="`${index % 2 === 0 ? 'bg-sub' : 'bg-main bg-opacity-10'}`"
            >
              <td
                class="border border-secondary border-opacity-10 text-center hidden md:table-cell"
              >
                {{ index + 1 + limit * (page - 1) }}
              </td>
              <td
                class="border border-secondary border-opacity-10 text-primary"
              >
                {{
                  Number(item?.amount)?.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
              </td>
              <td class="border border-secondary border-opacity-10">
                {{ item?.member?.fullName }}
              </td>
              <td class="border border-secondary border-opacity-10">
                <div>
                  {{
                    item?.approverAgent
                      ? item?.approverAgent?.fullName
                      : item?.approverBo?.fullName
                  }}
                </div>
              </td>
              <td class="border border-secondary border-opacity-10 text-start">
                {{ item?.agent?.agentName }}
              </td>
              <td
                class="border border-secondary border-opacity-10 hidden md:table-cell"
              >
                {{ SetDateFormat(`${item?.createdAt}`) }}
              </td>
              <td
                :class="`border border-secondary border-opacity-10 text-center  ${
                  STATUS_COLOR[item.status]
                }`"
              >
                {{ _tl(item?.status) }}
              </td>
              <td class="border border-secondary border-opacity-10 text-end">
                <div class="flex justify-center">
                  <BtnView :route="`/finance/withdraw/view/${item.id}`" />
                </div>
              </td>
            </tr>
          </tbody>
          <TableEmpty v-else :loading="loading" colspan="9" />
        </table>
      </div>

      <pagination
        v-model:limit="limit"
        v-model:page="page"
        :pages="withdrawStore.pagination?.pages"
        @on-pagination="onPagination"
      />
    </div>
  </div>
</template>

<style scoped></style>
