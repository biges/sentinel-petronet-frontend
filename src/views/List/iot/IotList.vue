<template>
  <div class="container">
    <DashboardNav></DashboardNav>
    <ListFilter
      class="top"
      @onActionClick="handleActionClick"
      @onFilteredData="handleFilteredData"
    ></ListFilter>
    <GatewayDeviceTable :data="table_data"></GatewayDeviceTable>
    <DataTablePagination
      class="bottom"
      @onChangeCurrentPage="handleChangePagination"
      @onChangeSize="handleChangePagination"
    ></DataTablePagination>
    <SentinelModal
      @onClose="handleModalClose"
      :drawer="modal_visible"
      :type="modal_type"
    ></SentinelModal>
  </div>
</template>

<script>
import GatewayDeviceTable from '@/components/device/iot/GatewayDeviceTable.vue'
import DataTablePagination from '@/components/atomic/data-table-pagination.vue'
import ListFilter from '@/components/list/list-filter'
import SentinelModal from '@/components/modal/sentinel-modal.vue'
import DashboardNav from '@/components/dashboard/dashboard-nav'

import { bus } from '@/main.js'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'IotList',
  components: {
    DashboardNav,
    ListFilter,
    DataTablePagination,
    SentinelModal,
    GatewayDeviceTable
  },
  data() {
    return {
      modal_type: null,
      selectedAction: '',
      modal_visible: false,
      table_data: []
    }
  },
  computed: {
    ...mapGetters({
      getCurrentPage: 'pagination/getCurrentPage',
      getCurrentLimit: 'pagination/getCurrentLimit'
    }),
    getSelectedRows() {
      return this.$store.state.dataTable.selectedRows
    }
  },
  methods: {
    ...mapActions({
      refreshVguardDeviceData: 'device/refreshVguardDeviceData',
      getVguardDevices: 'device/getVguardDevices',
      getGatewayDevices: 'device/getGatewayDevices'
    }),
    handleChangePagination() {
      this.fillDataTable({
        page: this.getCurrentPage,
        limit: this.getCurrentLimit
      })
    },
    handleActionClick(val) {
      this.modal_visible = true
      switch (val) {
        case 'action':
          this.modal_type = 'action'
          break
        case 'report':
          //   this.modal_type = 'report'
          this.modal_type = 'temp'
          break
        case 'service':
          this.modal_type = 'service'
          break
      }
    },
    async handleFilteredData(val) {
      console.log('LİSt', val)
      await this.fillDataTable(val)
    },
    handleModalClose(val) {
      this.modal_visible = val
    },
    async fillDataTable(params) {
      console.log('Gelen Paramlar', params)
      if (this.$route.fullPath.indexOf('iot') < 0) {
        let devices = this.getVguardDevices({ page: 1, limit: 20, ...params })
        devices.then((r) => {
          this.table_data = r
        })
      } else {
        let devices = this.getGatewayDevices({ page: 1, limit: 20, ...params })
        devices.then((r) => {
          this.table_data = r
        })
      }
    },
    async refreshVguardDeviceAndData() {
      let refresh = null
      let selected_devices_integer = []
      if (this.$route.params.device_id) {
        refresh = this.refreshVguardDeviceData({
          device_id: [parseInt(this.$route.params.device_id)]
        })
      } else {
        this.getSelectedRows.forEach((row) => {
          console.log(row)
          selected_devices_integer.push(row.id)
          //   selected_devices_integer.push(parseInt(row.id))
        })
        refresh = await this.refreshVguardDeviceData({
          device_id: selected_devices_integer
        })
      }
      if (refresh.status == 200) {
        this.handleChangePagination()
      }
      //   refresh.then((r) => {
      //     if (r.status == 200) {
      //       this.getDeviceDetails(this.$route.params.device_id)
      //     }
      //   })
    },
    handleSvgIconClick(val) {
      this.modal_type = val
      this.modal_visible = true
    }
  },
  created() {
    this.fillDataTable()
  },
  mounted() {
    bus.$on('onSelectedDevicesRefresh', this.refreshVguardDeviceAndData)
    bus.$on('onServiceSorting', (val) => this.fillDataTable(val))
    bus.$on('onSvgIconClick', (val) => this.handleSvgIconClick(val))
  },
  destroyed() {
    bus.$off('onSelectedDevicesRefresh')
    bus.$off('onServiceSorting')
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex !important;
  flex-direction: column;
  min-height: 100vh;
}
.data-layer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  // min-width: 100% !important;
  margin-left: 12px;
}
.bottom {
  padding: 34px;
  min-height: 25px;
  background: rgba(160, 160, 160, 0.1);
}
</style>
