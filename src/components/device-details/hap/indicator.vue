<template>
  <div class="container">
    <div class="indicator">
      <span class="indicator-title">
        {{ 'İletişim' }}
      </span>
      <div class="show-data">
        <div class="svg">
          <SvgIconCommunication
            :status="getDevice.communication"
          ></SvgIconCommunication>
        </div>
        <div class="value">
          {{ getDevice.communication ? 'Var' : 'Yok' }}
        </div>
      </div>
    </div>
    <div class="indicator">
      <span class="indicator-title">
        {{ 'Enerji Durumu' }}
      </span>
      <div class="show-data">
        <div class="svg">
          <SvgIconEnergy
            :status="!getDevice.communication ? 0 : getDevice.energy"
          ></SvgIconEnergy>
        </div>
        <div class="value">
          {{
            !getDevice.communication || getDevice.energy == 0
              ? 'Bilgi Alınamadı'
              : getDevice.energy == 1
              ? 'Var'
              : 'Yok'
          }}
        </div>
      </div>
    </div>
    <div class="indicator">
      <span class="indicator-title">
        {{ 'Batarya Durumu' }}
      </span>
      <div class="show-data">
        <div class="svg">
          <SvgIconBattery
            :status="!getDevice.communication ? 0 : getDevice.battery"
          ></SvgIconBattery>
        </div>
        <div class="value">
          {{
            !getDevice.communication || getDevice.battery === 0
              ? 'Bilgi Alınamadı'
              : getDevice.battery == 1
              ? 'Var'
              : getDevice.battery == 2
              ? 'Yok'
              : 'Zayıf'
          }}
        </div>
      </div>
    </div>
    <!-- <div class="indicator">
      <span class="indicator-title">
        {{ "Tarih / Saat" }}
      </span>
      <div class="show-data">
        <div class="svg">
          <SvgIconTime :status="getDevice.time"></SvgIconTime>
        </div>
        <div class="value">
          {{ getDevice.status ? "Var" : "Yok" }}
        </div>
      </div>
    </div> -->
    <div class="indicator">
      <span class="indicator-title">
        {{ 'Son Sinyal' }}
      </span>
      <div class="show-data">
        <div class="svg">
          <SvgIconTime :status="getDevice.last_signals"></SvgIconTime>
        </div>
        <div class="value">
          {{
            getDevice.last_signal == null ||
            getDevice.last_signal == '0001-01-01T00:00:00Z'
              ? 'Bilgi Alınamadı'
              : formattedDatetime(getDevice.last_signal)
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIconCommunication from '@/assets/icons/device-details/hap/svg-icon-communication'
import SvgIconTime from '@/assets/icons/device-details/hap/svg-icon-time'
import SvgIconBattery from '@/assets/icons/device-details/hap/svg-icon-battery'
import SvgIconEnergy from '@/assets/icons/device-details/hap/svg-icon-energy'

import { dateTimeChange } from '@/utils.js'

import { mapGetters } from 'vuex'
export default {
  name: 'Indicator',
  components: {
    SvgIconCommunication,
    SvgIconTime,
    SvgIconBattery,
    SvgIconEnergy
  },
  data() {
    return {
      formattedData: {}
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters({
      getDevice: 'device/getDevice'
    })
  },
  methods: {
    formattedDatetime(val) {
      return dateTimeChange(val)
    }
  },
  mounted() {
    console.log('ındicatorrs label', this.data)
    this.formattedData = this.data[Object.keys(this.data)[0]]
    console.log('Formatted Data', this.formattedData)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.container {
  width: 100%;
  display: flex;
  justify-content: space-between !important;
  flex-direction: row;
  .indicator {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 24%;
    height: 100px;
    border: 0.5px solid $hybrone_avatar_background;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 13px 20px;
    .indicator-title {
      align-self: flex-start;
      font-weight: 300;
      font-size: 18px;
      line-height: 21px;
    }
    .show-data {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      .value {
        align-self: flex-end;
        font-weight: bold;
        font-size: 18px;
        line-height: 21px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
