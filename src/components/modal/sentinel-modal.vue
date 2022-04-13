<template>
  <el-drawer
    :withHeader="false"
    :visible.sync="drawer"
    :direction="direction"
    :before-close="handleClose"
    custom-class="drawer"
    size="400px"
  >
    <span class="close-icon" @click="handleClose">
      <SvgClose />
    </span>
    <div
      v-if="['action', 'report', 'service'].includes(type)"
      class="form-content"
    >
      <div class="title">
        <span>{{ title }}</span>
      </div>
      <div v-if="type === 'action'">
        <div class="content">
          <DeviceActions @onClose="handleClose"></DeviceActions>
        </div>
      </div>
      <div v-else-if="type === 'report'">
        <div class="content">
          <DeviceReport @onClose="handleClose"></DeviceReport>
        </div>
      </div>
      <div v-else-if="type === 'service'">
        <div class="content">
          <DeviceService @onClose="handleClose"></DeviceService>
        </div>
      </div>

      <div class="save-button">
        <el-button type="primary" @click="handleOnSaveClick">{{
          type === 'action'
            ? 'Güncelle'
            : type === 'report'
            ? 'Oluştur'
            : 'Kaydet'
        }}</el-button>
      </div>
    </div>
    <div class="form-content" v-else>
      <div class="title">
        <span>{{ title }}</span>
      </div>
      <!-- Temp -->
      <el-table
        v-if="type === 'temp'"
        :data="data"
        stripe
        style="max-width: 400px"
        :header-cell-style="{ color: '#444444' }"
        cell-class-name="myCell"
      >
        <el-table-column
          prop="type"
          header-align="left"
          label="Sensör Adı"
          width="130"
        >
        </el-table-column>
        <el-table-column
          prop="sensor_id"
          header-align="left"
          label="Sensör Id"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          header-align="left"
          label="Değer"
          width="75"
        >
          <template slot-scope="scope">
            <div style="display: flex; justify-content: center">
              {{ ('℃ ', scope.row.temp) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          header-align="left"
          label="Durum"
          width="85"
        >
          <template slot-scope="scope">
            <div style="display: flex; justify-content: center">
              <SvgIconTemprature
                :status="
                  scope.row.temp != null
                    ? scope.row.temp
                      ? true
                      : false
                    : null
                "
              ></SvgIconTemprature>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- Humidty" -->
      <el-table
        v-else-if="type === 'humidty'"
        :data="data"
        stripe
        style="max-width: 400px"
        :header-cell-style="{ color: '#444444' }"
        cell-class-name="myCell"
      >
        <el-table-column
          prop="type"
          header-align="left"
          label="Sensör Adı"
          width="130"
        >
        </el-table-column>
        <el-table-column
          prop="sensor_id"
          header-align="left"
          label="Sensör Id"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          header-align="left"
          label="Değer"
          width="75"
        >
          <template slot-scope="scope">
            <div style="display: flex; justify-content: center">
              {{ ('℃ ', scope.row.humidity) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          header-align="left"
          label="Durum"
          width="85"
        >
          <template slot-scope="scope">
            <div style="display: flex; justify-content: center">
              <SvgIconHumidty
                :status="
                  scope.row.humidity > 0
                    ? scope.row.humidity
                      ? true
                      : false
                    : null
                "
              ></SvgIconHumidty>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-else-if="type === 'tamper'"
        :data="data"
        stripe
        style="max-width: 400px"
        :header-cell-style="{ color: '#444444' }"
        cell-class-name="myCell"
      >
        <el-table-column
          prop="type"
          header-align="left"
          label="Sensör Adı"
          width="130"
        >
        </el-table-column>
        <el-table-column
          prop="sensor_id"
          header-align="left"
          label="Sensör Id"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          header-align="left"
          label="Değer"
          width="75"
        >
          <template slot-scope="scope">
            <div style="display: flex; justify-content: center">
              {{ scope.row.tamper ? 'Normal' : 'Alarm' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          header-align="left"
          label="Durum"
          width="85"
        >
          <template slot-scope="scope">
            <div style="display: flex; justify-content: center">
              <SvgIconTamper
                :status="
                  scope.row.tamper != null
                    ? scope.row.tamper
                      ? true
                      : false
                    : null
                "
              ></SvgIconTamper>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-else-if="type === 'battery'"
        :data="data"
        stripe
        style="max-width: 400px"
        :header-cell-style="{ color: '#444444' }"
        cell-class-name="myCell"
      >
        <el-table-column
          prop="type"
          header-align="left"
          label="Sensör Adı"
          width="130"
        >
        </el-table-column>
        <el-table-column
          prop="sensor_id"
          header-align="left"
          label="Sensör Id"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          header-align="left"
          label="Değer"
          width="75"
        >
          <template slot-scope="scope">
            <div style="display: flex; justify-content: center">
              {{ ('% ', scope.row.battery) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          header-align="left"
          label="Durum"
          width="85"
        >
          <template slot-scope="scope">
            <div style="display: flex; justify-content: center">
              <SvgIconBattery
                :value="scope.row.battery > 0 ? scope.row.battery : null"
              ></SvgIconBattery>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-drawer>
</template>

<script>
import SvgClose from '@/assets/icons/list/svg-icon-close.vue'
import SvgIconHumidty from '@/assets/icons/device-details/termolog/svg-icon-humudity'
import SvgIconTemprature from '@/assets/icons/device-details/termolog/svg-icon-temprature'
import SvgIconTamper from '@/assets/icons/device-details/termolog/svg-icon-tamper'
import SvgIconBattery from '@/assets/icons/device-details/termolog/svg-icon-battery'
import DeviceActions from '@/components/list/device-actions'
import DeviceReport from '@/components/list/device-report'
import DeviceService from '@/components/list/device-service'
import { bus } from '@/main.js'
import { mapActions } from 'vuex'
export default {
  name: 'SentinelModal',
  components: {
    SvgClose,
    DeviceActions,
    DeviceReport,
    DeviceService,
    SvgIconTemprature,
    SvgIconHumidty,
    SvgIconTamper,
    SvgIconBattery
  },
  data() {
    return {
      title: null,
      data: []
    }
  },
  computed: {
    getSelectedRows() {
      return this.$store.state.dataTable.selectedRows
    },
    getSelectedRow() {
      return this.$store.state.dataTable.selectedRow
    }
  },
  watch: {
    type: function (value) {
      console.log('Selected Row', this.getSelectedRows[0])
      switch (value) {
        case 'action':
          this.title = 'İşlemler'
          break
        case 'report':
          this.title = 'Raporlama'
          break
        case 'service':
          this.title = 'Servis'
          break
        case 'temp':
          this.title = 'Sıcaklık Durumları'
          break
        case 'humidty':
          this.title = 'Nem Durumları'
          break
        case 'tamper':
          this.title = 'Tamper Durumları'
          break
        case 'battery':
          this.title = 'Batarya Durumları'
          break
      }
      this.fillDataTable({ premise_id: this.getSelectedRows[0].premise_id })
      this.$forceUpdate()
    }
  },
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: null
    }
  },
  methods: {
    ...mapActions({
      getSensorsGateway: 'device/getSensorsGateway'
    }),
    handleClose() {
      console.log('OnClose Triggered')
      this.$emit('onClose', false)
    },
    handleOnSaveClick() {
      switch (this.type) {
        case 'report':
          bus.$emit('onReportSubmit', true)
          break
        case 'service':
          bus.$emit('onSubmitService', true)
          break
        case 'actions':
          break

        default:
          break
      }
    },
    fillDataTable(params) {
      let sensors = this.getSensorsGateway({ page: 1, limit: 20, ...params })
      sensors.then((r) => {
        this.data = r
      })
    }
  },
  created() {
    console.log('Created')
    if (this.$route.fullPath.indexOf('iot') > 0) {
      this.fillDataTable()
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';

.el-drawer.ltr,
.el-drawer.rtl,
.el-drawer__container {
  top: 64px !important;
  bottom: 29px !important;
  height: 781px !important;
  border-radius: 20px 0px 0px 20px;
}

.form-content {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  overflow-y: auto;
  max-height: 84vh;
  padding-bottom: 16px;
  box-sizing: border-box;
  height: 100%;
  .content {
    margin-bottom: 12px;
    .span-label {
      font-family: Roboto;
      font-style: normal;
      font-weight: 300;
      font-size: 12px;
      line-height: 14px;
      display: flex;
      align-items: center;
      margin-bottom: 4px;
    }
  }
  .title {
    text-align: right;
    padding: 54px 0 10px 0;
    span {
      font-family: Roboto;
      font-style: normal;
      font-weight: 300;
      font-size: 24px;
      line-height: 28px;
    }
  }
  .save-button {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: auto;
    padding-top: 22px;
  }
}

.close-icon {
  position: absolute !important;
  top: 48px !important;
  display: inline-flex !important;
  left: -20px !important;
  cursor: pointer !important;
  z-index: 2002 !important;
}
.myCell {
  padding: 3px 0 3px 0 !important;
  .cell {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
}
</style>
