<template>
  <div class="sensor-table-content">
    <div class="title">
      <span> Sensörler</span>
      <div class="component">
        <span>FİLTRELE</span>
        <el-select
          v-model="filter"
          multiple
          collapse-tags
          placeholder="Seçiniz"
          class="sentinel-input"
        >
          <el-option
            v-for="item in status_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <DataTable :data="sensorArrays"></DataTable>
  </div>
</template>

<script>
import DataTable from '@/components/atomic/data-table.vue'
import { DEVICE_STATUS } from '@/constant'

export default {
  name: 'SensorTable',
  data() {
    return { status_options: [], filter: [] }
  },
  components: {
    DataTable
  },
  props: {
    sensorArrays: { type: Array, default: () => [] }
  },
  mounted() {
    this.status_options = [...DEVICE_STATUS]
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.sensor-table-content {
  //   background-color: #007db7;
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    span {
      font-weight: 500;
      font-size: 24px;
      line-height: 28px;
      display: flex;
      align-items: center;
    }
    /* Hybrone Light Blue */

    color: #007db7;
    .component {
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: nowrap;
      margin-right: 10px;
      span {
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        font-feature-settings: 'zero' on;

        /* Gray Dark */

        color: #444444;
      }
    }
  }
}
</style>
