<template>
  <div class="content">
    <DashboardDonutChart
      v-for="indicator in indicators"
      :key="indicator.id"
      :title="indicator.title"
      :hash_data="indicator.state"
    ></DashboardDonutChart>
  </div>
</template>

<script>
import DashboardDonutChart from '@/components/dashboard/donut-chart'
import { DASHBOARD_VARIABLES } from '@/constant'
import endpoints from '@/endpoints'
import { bus } from '@/main.js'

export default {
  name: 'IndicatorsIot',
  data() {
    return {
      indicators: {}
    }
  },
  components: {
    DashboardDonutChart
  },
  methods: {
    getDashboardDataNonFiltred(val) {
      this.indicators = { ...DASHBOARD_VARIABLES['IOT'] }
      let dashboard_data = this.$api({
        ...endpoints.getTermologDashboard
        // params: { refresh: val != null ? val : true }
      }).then((r) => {
        console.log('Dashboard', r.data.data.total_sensor)
        this.indicators[0].state.series.total.value = r.data.data.total_sensor
        this.indicators[0].state.series.online.value =
          r.data.data.working_sensor
        this.indicators[0].state.series.offline.value = r.data.data.fail_sensor
        this.indicators[1].state.series.sensor_normal.value =
          r.data.data.battery_normal_sensor
        this.indicators[1].state.series.sensor_alarm.value =
          r.data.data.battery_critic_sensor
        this.indicators[1].state.series.sensor_low.value =
          r.data.data.battery_critic_sensor - r.data.data.battery_critic_sensor

        this.indicators[2].state.series.eth.value =
          r.data.data.connection_ethernet_gateway
        this.indicators[2].state.series.wifi.value =
          r.data.data.connection_wifi_gateway
        this.indicators[2].state.series.m2m.value =
          r.data.data.connection_m2m_gateway

        this.indicators[3].state.series.temp_normal.value =
          r.data.data.temp_alarm_normal
        this.indicators[3].state.series.temp_alarm.value =
          r.data.data.temp_alarm_warning

        this.indicators[4].state.series.humidity_normal.value =
          r.data.data.humidity_alarm_normal
        this.indicators[4].state.series.humidity_alarm.value =
          r.data.data.humidity_alarm_warning

        this.indicators[5].state.series.tamper_normal.value =
          r.data.data.tamper_normal
        this.indicators[5].state.series.tamper_alarm.value =
          r.data.data.tamper_sensor

        this.indicators[6].state.series.total.value = r.data.data.total_gateway
        this.indicators[6].state.series.online.value =
          r.data.data.working_gateway
        this.indicators[6].state.series.offline.value = r.data.data.fail_gateway

        this.indicators[7].state.series.normal.value =
          r.data.data.on_battery_gateway
        this.indicators[7].state.series.energy_fault.value =
          r.data.data.on_electric_gateway

        this.indicators[8].state.series.battery_normal.value =
          r.data.data.battery_normal_gateway
        this.indicators[8].state.series.battery_low.value =
          r.data.data.battery_critic_gateway
        this.indicators[8].state.series.battery_alarm.value =
          r.data.data.battery_empty_gateway
      })
      console.log(dashboard_data)
    },
    getDashboardData(val) {
      this.indicators = { ...DASHBOARD_VARIABLES['IOT'] }
      let dashboard_data = this.$api({
        ...endpoints.getTermologDashboard,
        params: { refresh: val != null ? val : true }
      }).then((r) => {
        this.indicators[0].state.series.total.value = r.data.data.total_sensor
        this.indicators[0].state.series.online.value =
          r.data.data.working_sensor
        this.indicators[0].state.series.offline.value = r.data.data.fail_sensor
        this.indicators[1].state.series.normal_record.value =
          r.data.data.battery_normal_sensor
        this.indicators[1].state.series.alarm.value =
          r.data.data.battery_critic_sensor
        this.indicators[1].state.series.low.value =
          r.data.data.battery_critic_sensor
        this.indicators[2].state.series.total.value =
          r.data.data.total_disk_count
        this.indicators[2].state.series.normal_disk.value =
          r.data.data.normal_disk_count
        this.indicators[2].state.series.fault.value =
          r.data.data.faulty_disk_count
        this.indicators[3].state.series.total.value =
          r.data.data.total_channel_count
        this.indicators[3].state.series.active.value =
          r.data.data.active_channel_count
        this.indicators[3].state.series.pasif.value =
          r.data.data.passive_channel_count
        this.indicators[4].state.series.normal_analysis.value =
          r.data.data.normal_video_count
        this.indicators[4].state.series.video_loss.value =
          r.data.data.video_loss_count
        this.indicators[4].state.series.other_state.value =
          r.data.data.other_status_count
        this.indicators[5].state.series.motion_detect.value =
          r.data.data.motion_detect_count
        this.indicators[5].state.series.sabotage.value =
          r.data.data.sabotage_count
        this.indicators[5].state.series.scene_change.value =
          r.data.data.scene_change_count
      })
      console.log(dashboard_data)
    }
  },
  created() {
    this.getDashboardDataNonFiltred()
  },
  mounted() {
    bus.$on('onDashboardDataRefresh', (val) => this.getDashboardData(val))
  },
  destroyed() {
    bus.$on('onDashboardDataRefresh')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.content {
  max-width: 100%;
  height: 100%;
  background-color: $hybrone_background_color;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-evenly;
  justify-content: space-between;
}
@media screen and (min-width: 1500px) {
  .content {
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-template-columns: repeat(3, auto);
  }
}
</style>
