<template>
  <!-- v-else-if="
      ['List', 'Dashboard'].includes(this.$route.name) &&
      this.$route.fullPath.indexOf('iot') > 0
    " -->
  <el-table
    v-loading="loading"
    ref="iotGatewayTable"
    class="data-table"
    :data="data"
    style="
      width: 99%;
      max-height: calc(100vh - 180px);
      overflow: none;
      border: none;
      margin-left: 14px;
    "
    cell-class-name="mycell"
    @row-dblclick="handleDBClick"
    :header-cell-style="
      this.$route.name == 'List'
        ? { background: '#f5f5f5', color: '#444444' }
        : { color: '#444444' }
    "
    @sort-change="handleServiceSorting"
    :row-class-name="rowClassName"
    height="100%"
    border="false"
  >
    <!-- @selection-change="handleSelectionChange" -->
    <!-- <el-table-column type="selection" width="55"> </el-table-column> -->

    <el-table-column
      header-align="left"
      prop="premise_id"
      label="DEPO ID"
      width="100"
    >
      <!-- <template slot-scope="scope">
        <SvgIconWarning v-if="scope.row.show_warning"></SvgIconWarning>
        {{ scope.row.premise.custom_premise_id }}
      </template> -->
    </el-table-column>
    <!-- <el-table-column
      header-align="left"
      prop="premise.custom_premise_name"
      label="DEPO ADI"
    >
    </el-table-column> -->
    <el-table-column
      header-align="left"
      prop="premise.location.city.name"
      label="LOKASYON"
      width="180"
    >
      <template slot-scope="scope">
        {{ scope.row.premise.location.city.name || 'İstanbul' }}
      </template>
    </el-table-column>

    <el-table-column
      header-align="left"
      prop="description"
      label="Açıklama"
      width="80"
    >
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="sensor_count"
      label="SENSÖR"
      width="180"
      ><template slot-scope="scope">
        {{ scope.row.sensor.length }}
      </template>
    </el-table-column>

    <el-table-column
      header-align="center"
      label="SENSÖR DURUMLARI"
      style="color: #007db7"
    >
      <el-table-column
        header-align="center"
        prop="device_state"
        label="Sıcaklık"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :visible-arrow="false"
            :content="
              scope.row.sensor.length > 0
                ? scope.row.sensor[0].temp
                  ? 'Normal'
                  : 'Alarm'
                : 'Bilgi Yok'
            "
            :popper-class="
              scope.row.sensor.length > 0
                ? scope.row.sensor[0].temp
                  ? 'success'
                  : 'error'
                : 'no-name'
            "
            placement="bottom"
          >
            <div
              @click="handleSvgIconClick('temp')"
              style="display: flex; justify-content: center"
            >
              <SvgIconTemprature
                @click="handleSvgIconClick('temp')"
                :status="
                  scope.row.sensor.length > 0
                    ? scope.row.sensor[0].temp
                      ? true
                      : false
                    : null
                "
              ></SvgIconTemprature>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="device_state" label="Nem">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :visible-arrow="false"
            :content="
              scope.row.sensor.length > 0
                ? scope.row.sensor[0].humidity
                  ? 'Normal'
                  : 'Alarm'
                : 'Bilgi Yok'
            "
            :popper-class="
              scope.row.sensor.length > 0
                ? scope.row.sensor[0].humidity
                  ? 'success'
                  : 'error'
                : 'no-name'
            "
            placement="bottom"
          >
            <div
              @click="handleSvgIconClick('humidty')"
              style="display: flex; justify-content: center"
            >
              <SvgIconHumidty
                :status="
                  scope.row.sensor.length > 0
                    ? scope.row.sensor[0].humidity
                      ? true
                      : false
                    : null
                "
              ></SvgIconHumidty>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="device_state" label="Tamper">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :visible-arrow="false"
            :content="
              scope.row.sensor.length > 0
                ? scope.row.sensor[0].tamper
                  ? 'Normal'
                  : 'Alarm'
                : 'Bilgi Yok'
            "
            :popper-class="
              scope.row.sensor.length > 0
                ? scope.row.sensor[0].tamper
                  ? 'success'
                  : 'error'
                : 'no-name'
            "
            placement="bottom"
          >
            <div
              @click="handleSvgIconClick('tamper')"
              style="display: flex; justify-content: center"
            >
              <SvgIconTamper
                @click="handleSvgIconClick('tamper')"
                :status="
                  scope.row.sensor.length > 0
                    ? scope.row.sensor[0].tamper
                      ? true
                      : false
                    : null
                "
              ></SvgIconTamper>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="device_state" label="Pil">
        <template slot-scope="scope">
          <div
            @click="handleSvgIconClick('battery')"
            style="display: flex; justify-content: center"
          >
            <SvgIconBattery
              :value="
                scope.row.sensor.length > 0 ? scope.row.sensor[0].battery : null
              "
            ></SvgIconBattery>
          </div>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column
      header-align="center"
      label="GATEWAY DURUMLARI"
      style="color: #007db7"
    >
      <el-table-column
        header-align="center"
        prop="device_state"
        label="İletişim"
      >
        <template slot-scope="scope">
          <div style="display: flex; justify-content: center">
            <SvgIconCommunication
              :status="scope.row.status"
            ></SvgIconCommunication>
          </div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="device_state" label="Enerji">
        <template slot-scope="scope">
          <div style="display: flex; justify-content: center">
            <SvgIconEnergy
              :status="scope.row.electric_connection"
            ></SvgIconEnergy>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="device_state"
        label="Batarya"
      >
        <template slot-scope="scope">
          <div style="display: flex; justify-content: center">
            <SvgIconBattery :status="scope.row.battery"></SvgIconBattery>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="device_state"
        label="Bağlantı"
      >
        <template slot-scope="scope">
          <div style="display: flex; justify-content: center">
            <span
              v-if="scope.row.connection == 'wifi'"
              class="connection-type-wifi"
              >Wİ-Fİ
            </span>
            <span
              v-else-if="scope.row.connection == 'eth'"
              class="connection-type-eth"
              >ETH
            </span>
            <span
              v-else-if="scope.row.connection == 'm2m'"
              class="connection-type-gsm"
              >M2M
            </span>
            <span
              v-else-if="scope.row.connection == undefined"
              class="connection-type-na"
            >
              N/A
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table-column>

    <el-table-column
      align="left"
      prop="updated_at"
      label="SON SİNYAL"
      width="180"
    >
      <template slot-scope="scope">
        {{
          scope.row.last_signal_date == null ||
          scope.row.last_signal_date == '0001-01-01T00:00:00Z' ||
          scope.row.last_signal_date == '0001-01-01T01:55:52+01:55'
            ? 'Bilgi Alınamadı'
            : formattedDatetime(scope.row.last_signal_date)
        }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import SvgIconDownload from '@/assets/icons/device-details/svg-icon-download.vue'
// import SvgIconArmed from '@/components/atomic/device/hap/svg-icon-armed.vue'
import SvgIconHumidty from '@/assets/icons/device-details/termolog/svg-icon-humudity'
import SvgIconTemprature from '@/assets/icons/device-details/termolog/svg-icon-temprature'
import SvgIconTamper from '@/assets/icons/device-details/termolog/svg-icon-tamper'
import SvgIconBattery from '@/assets/icons/device-details/termolog/svg-icon-battery'
import SvgIconCommunication from '@/assets/icons/device-details/termolog/svg-icon-communication'
import SvgIconEnergy from '@/assets/icons/device-details/termolog/svg-icon-energy'
import SvgIconConnection from '@/assets/icons/device-details/termolog/svg-icon-connection'
import SvgIconSecondChannel from '@/components/atomic/device/camera/svg-icon-second-channel'
import SvgIconThirdChannel from '@/components/atomic/device/camera/svg-icon-third-channel'
import SvgIconFourthChannel from '@/components/atomic/device/camera/svg-icon-fourth-channel'
import SvgIconDisk from '@/components/atomic/device/camera/svg-icon-disk'
import SvgIconRecord from '@/components/atomic/device/camera/svg-icon-record'
import SvgIconDateTime from '@/components/atomic/device/camera/svg-icon-datetime'
import SvgIconFirstChannel from '@/assets/icons/device-details/svg-icon-first-channel.vue'
import SvgIconAlarm from '@/components/atomic/device/hap/svg-icon-alarm.vue'
import SvgIconFault from '@/components/atomic/device/hap/svg-icon-fault.vue'
import SvgIconSabotage from '@/components/atomic/device/hap/svg-icon-sabotage.vue'
// import SvgIconCommunication from '@/components/atomic/device/hap/svg-icon-communication.vue'
// import SvgIconEnergy from '@/components/atomic/device/hap/svg-icon-energy.vue'
// import SvgIconBattery from '@/components/atomic/device/hap/svg-icon-battery.vue'
import SvgIconServiceRequest from '@/assets/icons/list/svg-icon-is-service-request'
import SvgIconDeviceInterface from '@/assets/icons/list/svg-icon-device-interface'
import SvgIconWarning from '@/assets/icons/list/svg-icon-warning.vue'
import { PERSONAL_TITLES } from '@/constant.js'
import { bus } from '@/main.js'
import { dateTimeChange } from '@/utils.js'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'GatewayDeviceTable',
  data() {
    return {
      multiple_selection: [],
      bus: {},
      loading: true
    }
  },
  components: {
    // SvgIconDownload,
    // SvgIconWarning,
    // SvgIconFirstChannel,
    SvgIconHumidty,
    SvgIconTemprature,
    SvgIconTamper,
    SvgIconBattery,
    // SvgIconServiceRequest,
    // SvgIconDeviceInterface,
    // SvgIconConnection,
    SvgIconEnergy,
    // SvgIconAlarm,
    // SvgIconSecondChannel,
    // SvgIconThirdChannel,
    // SvgIconFourthChannel,
    // SvgIconSabotage,
    // SvgIconFault,
    SvgIconCommunication
    // SvgIconEnergy,
    // SvgIconBattery,
    // SvgIconDisk,
    // SvgIconRecord,
    // SvgIconDateTime
    // SvgIconServiceRequest,
    // SvgIconQuery,
  },
  props: {
    data: {
      default: []
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: 'auth/getPermissions'
    })
    // updateTableForChangeRoute() {

    // 	return ''
    // }
  },
  watch: {
    data: function (val) {
      if (val) {
        this.loading = false
      } else {
        if (
          [
            'Dashboard',
            'List',
            'Premises',
            'DeviceLastSignals'
            // 'UserPermissions'
          ].includes(this.$route.name)
        )
          this.loading = false
        else this.loading = true
      }
      if (val && this.$route.name == 'Premises') this.setCurrent(val[0])
      this.$forceUpdate()
    }
  },
  methods: {
    ...mapActions({
      setSelectedRows: 'dataTable/setSelectedRows',
      setSelectedRow: 'dataTable/setSelectedRow',
      setCurrentPremise: 'premise/setCurrentPremise'
      // setLocation: "map/setLocation",
    }),
    getTitle(val) {
      return PERSONAL_TITLES.filter((item) => {
        return item.key === val
      })
    },
    formattedDatetime(val) {
      let result = val ? val.toString().split('-')[0] != '0001' : false
      if (result) return dateTimeChange(val)
      else if (['Services'].includes(this.$route.name))
        return 'Henüz Tamanlanmadı'
      else return 'Bilgi Alınamadı'
    },
    interfaceClickHandle(val) {
      console.log('https://' + val.row.host + ':' + val.row.port)
      if (process.env.IS_ELECTRON)
        require('electron').shell.openExternal(
          'http://' + val.row.host + ':' + val.row.port
        )
      else {
        let href = 'http://' + val.row.host + ':' + val.row.port
        window.open(href, '_blank')
      }
    },
    handleServiceSorting(val) {
      if (['List'].includes(this.$route.name)) {
        if (val.order === 'ascending') {
          bus.$emit('onServiceSorting', { state: 'is_service' })
        } else {
          bus.$emit('onServiceSorting', {})
        }
      }
      //    else {
      //     if (val.order === 'ascending') {
      //       bus.$emit('onTrackedServiceSorting', { is_service: true })
      //     } else {
      //       bus.$emit('onTrackedServiceSorting', {})
      //     }
      //   }
    },
    handleDBClick(val) {
      console.log('DB Click', val)
      if (
        ['List', 'Dashboard'].includes(this.$route.name) &&
        this.getPermissions['device_show_in_dashboard']
      ) {
        if (this.$route.fullPath.indexOf('iot') < 0) {
          this.$router.push({
            name: 'DeviceDetail',
            params: { device_id: val.id }
          })
          this.setSelectedRow(val)
        } else {
          this.$router.push({
            name: 'DeviceDetailIot',
            params: { device_id: val.id }
          })
          this.setSelectedRow(val)
        }
      }
    },
    rowClassName({ row }) {
      return this.$refs.iotGatewayTable.selection.find(
        (element) => element.id == row.id
      )
        ? 'selected-row'
        : ''
    },
    handleSelectionChange(val) {
      this.setSelectedRows(val)
    },
    async setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
      this.setSelectedRow(row)
    },
    handleCurrentChange(row) {
      this.setSelectedRow({})
      if (this.$route.name === 'Premises') {
        this.setCurrentPremise(row)
        this.setSelectedRow(row)
        let location = {
          lat: row.location.lat,
          long: row.location.long
        }
        this.$store.dispatch('setLocation', {
          location: { ...location }
        })
        bus.$emit('onCurrentChangeRowPremise', row)
      } else {
        this.setSelectedRow(row)
        bus.$emit('onCurrentChangeRowPremise', row)
      }
    },
    downloadEventRecord(val) {
      this.$emit('onDownloadEventRecord', val)
    },
    handleSvgIconClick(val) {
      bus.$emit('onSvgIconClick', val)
    }
  },
  created() {
    // console.log(this.$route)
    console.log(this.$route.fullPath.indexOf('iot'))
  },
  mounted() {
    console.log('This.Route', this.$route)
  },
  destroyed() {
    console.log('Destroyed', this.$route.fullPath)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';

.data-table {
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  align-items: center;
  color: #000000;
  // margin-top: 10px;
}
.data-table ul {
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  grid-gap: 5px;
  padding: 0px !important;
  margin: 0px;
}
.el-table .selected-row {
  background-color: $hybrone_selection_table_color !important;
  td {
    &:nth-child(1) {
      border-left: 10px solid $hybrone_light_blue !important;
    }
  }
}
.el-table .current-row {
  background-color: $hybrone_selection_table_color !important;
  td {
    &:nth-child(1) {
      border-left: 10px solid $hybrone_light_blue !important;
    }
  }
}
.connection-type {
  display: flex;
  justify-content: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  &-wifi {
    color: #f2994a;
  }
  &-eth {
    color: #007db7;
  }
  &-gsm {
    color: #9b51e0;
  }
  &-na {
    color: #a0a0a0;
  }
}
.mycell {
  border: none !important;
}
.mycell2 {
  border: none !important;
  padding: 0 !important;
}
.success {
  background: #6fcf97 !important;
}
.error {
  background: #e04141 !important;
}
.no-name {
  background: #a0a0a0 !important;
}
</style>
