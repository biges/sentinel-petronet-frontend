<template>
  <div :class="getRouteForClass">
    <DeviceDetailsHeader
      :premise_information="data"
      @openServiceModal="openModal"
    ></DeviceDetailsHeader>
    <IndicatorGateway :gatewayArrays="gatewayArrays"></IndicatorGateway>
    <SensorTable :sensorArrays="sensorArrays"></SensorTable>
  </div>
</template>

<script>
import SensorTable from '@/components/device-details/iot/sensor-table'
import IndicatorGateway from '@/components/device-details/iot/indicator-gateway'
import DeviceDetailsHeader from '@/components/device-details/device-details-header.vue'
import { mapActions } from 'vuex'
export default {
  name: 'DeviceDetailIot',
  components: {
    DeviceDetailsHeader,
    IndicatorGateway,
    SensorTable
  },
  data() {
    return {
      device_id: null,
      data: [],
      premise: {},
      is_last_signals: false,
      filtered_data: {},
      modal_visible: false,
      premise_id: '',
      gatewayArrays: [],
      sensorArrays: []
    }
  },
  computed: {
    isLastSignals() {
      return this.$route.path.split('/').includes('last-signals')
    },
    getRouteForClass: function () {
      if (!this.$route.path.split('/').includes('last-signals')) {
        return 'details-content'
      } else {
        return 'details-last-signals-content'
      }
    }
  },
  methods: {
    ...mapActions({
      getGatewayDevices: 'device/getGatewayDevices',
      getGatewayById: 'device/getGatewayById',
      getPremiseById: 'premise/getPremiseById',
      downloadProsecDeviceLastSignals: 'device/downloadProsecDeviceLastSignals'
    }),
    handleModalClose(val) {
      this.modal_visible = val
    },
    openModal(val) {
      this.modal_visible = val
    },
    handleFilteredData(val) {
      this.filtered_data = val
    },
    handleDownloadSignalsHistory() {
      let download_file = this.downloadProsecDeviceLastSignals(
        this.filtered_data
      )
      download_file.then((r) => {
        let currentDate = new Date()
        const url = window.URL.createObjectURL(new Blob([r]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute(
          'download',
          'Cihaz-Gecmiş-Sinyalleri-' +
            currentDate.getFullYear() +
            ('0' + (currentDate.getMonth() + 1)).slice(-2) +
            ('0' + currentDate.getDate()).slice(-2) +
            ('0' + currentDate.getHours()).slice(-2) +
            ('0' + currentDate.getMinutes()).slice(-2) +
            ('0' + currentDate.getSeconds()).slice(-2) +
            '.xlsx'
        )
        document.body.appendChild(link)
        link.click()
      })
    }
  },
  created() {
    console.log('Created IOT')
    this.device_id = this.$route.params.device_id
    let storeDevice = {}
    let device = this.getGatewayById(this.device_id)
    device.then((r) => {
      storeDevice = r
      let gateways = this.getGatewayDevices({ premise_id: r.premise_id })
      gateways.then((r) => {
        this.gatewayArrays = r
        this.gatewayArrays.forEach((item) => {
          //   console.log('İtem Sensor', item.sensor)
          item.sensor?.forEach((sensor) => {
            this.sensorArrays.push({ ...sensor, gateway: item })
          })
        })
        console.log('Sensor Array', this.sensorArrays)
      })
      let premise = this.getPremiseById(r.premise_id)
      premise.then((res) => {
        storeDevice.premise = { ...res }
        this.$store.dispatch('setDevice', {
          device: { ...storeDevice }
        })
        console.log('Premise DAta', res)
        this.data = { premise: res }
      })
      //   this.data = { premise: r }
    })
  },
  mounted() {
    // if (this.isLastSignals) {
    //   let device_signals = this.getProsecDeviceLastSignals({
    //     device_id: this.device_id,
    //   });
    //   device_signals.then((r) => {
    //     this.data = r;
    //   });
    // }
  }
}
</script>

<style lang="scss" scoped>
.details-content {
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  padding: 0 36px 0 36px;
  overflow: none;
}
.details-last-signals-content {
  display: flex;
  flex-direction: column;
  // min-height: 100vh !important;

  // justify-content: space-between;
  padding: 0 0 0 13px;
}
.bottom {
  padding: 34px;
  min-height: 25px;
  background: rgba(160, 160, 160, 0.1);
}
</style>
