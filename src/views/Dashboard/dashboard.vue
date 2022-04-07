<template>
  <div class="container">
    <DashboardNav></DashboardNav>
    <Indicators
      v-if="!['DashbaordIot'].includes(this.$route.name)"
    ></Indicators>
    <IndicatorsIot v-else></IndicatorsIot>
    <TrackedDevice
      v-if="!['DashbaordIot'].includes(this.$route.name)"
    ></TrackedDevice>
  </div>
</template>

<script>
import DashboardNav from '@/components/dashboard/dashboard-nav'
import Indicators from '@/components/dashboard/indicators'
import IndicatorsIot from '@/components/dashboard/iot/indicators'
import TrackedDevice from '@/components/dashboard/tracked-device'
export default {
  name: 'Dashbaord',
  components: {
    DashboardNav,
    Indicators,
    IndicatorsIot,
    TrackedDevice
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-height: 100%;
  margin: 27px 38px 12px 32px;
}
</style>
