<template>
  <div class="indicator-gateways-container">
    <el-row>
      <el-col v-for="gateway in gatewayArrays" :key="gateway.id" :span="12">
        <div class="grid-content">
          <div class="gateway-info">
            <span class="gateway-id">{{ gateway.id }}</span>
            <span class="gateway-name">{{ gateway.name }}</span>
          </div>
          <div class="gateway-status">
            <div class="status">
              <span class="name"> İletişim </span>
              <SvgIconCommunication
                :status="gateway.status"
              ></SvgIconCommunication>
              <span class="value"> Normal </span>
            </div>
            <div class="status">
              <span class="name"> Enerji </span>
              <SvgIconEnergy
                :status="gateway.electric_connection"
              ></SvgIconEnergy>
              <span class="value"> Normal </span>
            </div>
            <div class="status">
              <span class="name"> Batarya </span>
              <SvgIconBattery :status="gateway.battery"></SvgIconBattery>
              <span class="value"> {{ '%' + gateway.battery }} </span>
            </div>
            <div class="status">
              <span class="name"> Bağlantı </span>
              <span
                v-if="gateway.connection == 'wifi'"
                class="connection-type-wifi"
                >Wİ-Fİ
              </span>
              <span
                v-else-if="gateway.connection == 'eth'"
                class="connection-type-eth"
                >ETH
              </span>
              <span
                v-else-if="gateway.connection == 'm2m'"
                class="connection-type-gsm"
                >M2M
              </span>
              <span
                v-else-if="gateway.connection == ''"
                class="connection-type-na"
              >
                N/A
              </span>
            </div>
            <div class="status">
              <span class="name"> Sensör </span>
              <span class="value-count">{{ gateway.sensor_count }} </span>
            </div>
          </div>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SvgIconCommunication from '@/assets/icons/device-details/termolog/svg-icon-communication'
import SvgIconEnergy from '@/assets/icons/device-details/termolog/svg-icon-energy'
import SvgIconBattery from '@/assets/icons/device-details/termolog/svg-icon-battery'

export default {
  name: 'IndicatorGateway',
  components: {
    SvgIconCommunication,
    SvgIconEnergy,
    SvgIconBattery
  },
  data() {
    return {}
  },
  props: {
    gatewayArrays: { type: Array, default: () => [] }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.indicator-gateways-container {
  margin-top: 20px;
  min-height: 245px;
  //   .bg-purple {
  //     background: #d3dce6;
  //   }
  //   .bg-purple-light {
  //     background: #e5e9f2;
  //   }
  .grid-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 100%;
    height: 100px;
    border: 1px solid #ececec;
    box-sizing: border-box;
    border-radius: 5px;
    // min-height: 36px;
    margin: 20px !important;
    padding: 10px;
    .gateway-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .gateway-id {
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;

        /* Gray Dark */

        color: #444444;
      }
      .gateway-name {
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;

        /* Gray Dark */

        color: #444444;
      }
    }
    .gateway-status {
      display: flex;
      flex-direction: row;
      gap: 30px;
      .status {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        .name {
          font-weight: 400;
          font-size: 10px;
          line-height: 12px;
          color: #444444;
        }
        .value {
          font-weight: 400;
          font-size: 10px;
          line-height: 12px;
          /* identical to box height */

          display: flex;
          align-items: center;
          text-align: center;

          /* Green */

          color: #6fcf97;
          &-count {
            font-weight: 500;
            font-size: 16px;
            line-height: 19px;
            /* identical to box height */
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            text-align: center;

            /* Hybrone Blue */

            color: #2c3357;
          }
        }
        .connection-type {
          margin-bottom: 30px !important;
          &-wifi {
            @extend .connection-type;
            color: #f2994a;
          }
          &-eth {
            @extend .connection-type;
            color: #007db7;
          }

          &-gsm {
            @extend .connection-type;
            color: #9b51e0;
          }
          &-na {
            @extend .connection-type;
            color: #a0a0a0;
          }
        }
      }
    }
  }
}
</style>
