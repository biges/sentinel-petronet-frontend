<template>
  <div class="container">
    <DashboardNav></DashboardNav>
    <Indicators></Indicators>
  </div>
</template>

<script>
import DashboardNav from '@/components/dashboard/dashboard-nav'
import Indicators from '@/components/dashboard/iot/indicators'
import TrackedDevice from '@/components/dashboard/tracked-device'
export default {
  name: 'DashbaordIot',
  components: {
    DashboardNav,
    Indicators
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-height: 100%;
  margin: 27px 38px 12px 32px;
}
</style>
