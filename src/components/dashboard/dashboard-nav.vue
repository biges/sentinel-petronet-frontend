<template>
  <div
    :class="
      ['List'].includes(this.$route.name)
        ? 'header-content-list'
        : 'header-content'
    "
  >
    <div class="route" v-if="true">
      <router-link
        v-for="device_type in device_types"
        :key="device_type.id"
        :to="'/' + getNormalRoute + device_type.route"
        active-class="nav-active"
      >
        <!-- :to="parentRoute + prefixRoute" -->
        <!-- :to="'/dashboard' + device_type.route" -->

        <el-button
          v-if="device_type.valid"
          class="__nav-button sentinel-button"
        >
          <div class="group">
            <SvgIconCCTV v-if="device_type.key == 'PANEL'"></SvgIconCCTV>
            <SvgIconSensor v-else-if="device_type.key == 'IOT'"></SvgIconSensor>
            <span>{{ device_type.label }}</span>
          </div>
        </el-button>
      </router-link>
    </div>
    <div v-if="!['List'].includes(this.$route.name)" class="refresh-button">
      <div class="component">
        <span>Yenile</span>
        <el-button @click="refreshDeviceData"
          ><SvgIconRefresh></SvgIconRefresh
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { DEVICE_TYPES } from '@/constant'
import SvgIconRefresh from '@/assets/icons/list/svg-icon-refresh.vue'
import { bus } from '@/main.js'
import SvgIconCCTV from '@/assets/icons/dashboard/svg-icon-cctv.vue'
import SvgIconSensor from '@/assets/icons/dashboard/svg-icon-sensor.vue'

export default {
  name: 'DashboardNav',
  components: { SvgIconRefresh, SvgIconCCTV, SvgIconSensor },
  data() {
    return { device_types: {} }
  },
  computed: {
    prefixRoute() {
      if (this.$route.name != 'DeviceLastSignals') return ''
      else {
        return '/last-signals'
      }
    },
    getNormalRoute() {
      console.log('getNormalRoute', this.$route.path.split('/')[1])
      return this.$route.path.split('/')[1]
    },
    parentRoute() {
      if (this.$route.name == 'Dashboard') {
        return '/' + this.$route.path.split('/')[1]
      } else if (
        this.$route.name == 'DeviceDetail' ||
        this.$route.name == 'DeviceLastSignals'
      ) {
        let new_path = this.$route.path.split('/')
        new_path.pop()
        return new_path.join('/')
      } else {
        let new_path = this.$route.path.split('/')
        new_path.pop()
        new_path.pop()
        return new_path.join('/')
      }
    }
  },
  methods: {
    refreshDeviceData() {
      bus.$emit('onDashboardDataRefresh', true)
    }
  },
  created() {
    console.log('Route Path', this.$route.path.split('/')[1])
    this.device_types = { ...DEVICE_TYPES }
  },
  mounted() {
    console.log('Dashboard Nav', this.$route)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.header-content {
  display: flex;
  //   justify-content: flex-end;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  .route {
    display: flex;
    flex-direction: row;
    .__nav-button {
      span {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
    }
  }
  a {
    text-decoration: none;
  }

  .nav-active {
    button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 16px 32px;

      position: static;
      min-width: auto;
      height: 51px;
      left: 0px;
      bottom: 0px;

      /* Hybrone Light Blue */

      background: $hybrone_light_blue;
      box-shadow: 0px 2px 4px rgba(91, 134, 245, 0.05);
      border-radius: 4px;

      /* Inside Auto Layout */

      margin: 0px 10px;
      span {
        display: flex;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        align-items: center;
        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        text-align: center;

        margin: 0px;

        color: #ffffff !important;
      }
    }
  }
  button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px 32px;
    // padding: 16px 32px;
    text-decoration: none;

    position: static;
    min-width: auto;
    height: 51px;
    left: 0px;
    bottom: 0px;

    /* Hybrone Light Blue */

    background: $hybrone_background_color;
    box-shadow: 0px 2px 4px rgba(91, 134, 245, 0.05);
    border-radius: 4px;
    margin: 0px 10px;
    .group {
      display: flex;
      justify-content: space-between;
      gap: 20px;
    }
    span {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: center;
      text-decoration: none;
      align-items: center;
      font-family: Inter, sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      text-align: center;

      margin: 0px;
      //   background-color: #444444 !important;

      color: #444444 !important;
    }
  }
  .refresh-button {
    display: flex;
    flex-direction: row;
    align-content: left;
    justify-content: space-between;
    align-items: center;
    max-width: inner-content;
    .component {
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: self-end;
      justify-content: space-between;
      flex-wrap: nowrap;
      //   margin-right: 24px;

      //   &:nth-child(0) {
      //     margin-left: 23px;
      //   }
      span {
        font-weight: 300;
        font-size: 12px;
        line-height: 14px;
        text-transform: uppercase;
        align-self: center;
      }
      button {
        width: 51px;
        height: 51px;
        display: flex;
        justify-content: center;
        padding-left: 25px;
        padding-right: 25px;
      }
    }
  }
}
.header-content-list {
  @extend .header-content;
  background-color: $hybrone_header_background_color;
  padding: 27px 38px 0px 32px;
  margin: 0;
}
</style>
