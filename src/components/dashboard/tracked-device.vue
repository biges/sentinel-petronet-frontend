<template>
  <div class="tracked-device">
    <TrackedDeviceFilter
      :disabledDeleteButton="selectedRow"
      @onCreateTrackedPremise="handleCreateTrackedPremise"
    ></TrackedDeviceFilter>
    <DataTable :data="table_data" @onSelectRow="handleSelectRow"></DataTable>
  </div>
</template>

<script>
import TrackedDeviceFilter from '@/components/dashboard/tracked-device-filter'
import DataTable from '@/components/atomic/data-table.vue'
import { mapActions } from 'vuex'
export default {
  name: 'TrackedDevice',
  components: { TrackedDeviceFilter, DataTable },
  data() {
    return {
      selectedRow: false,
      table_data: []
    }
  },
  methods: {
    ...mapActions({
      getTrackedVguard: 'premise/getTrackedVguard'
    }),
    handleSelectRow(val) {
      this.selectedRow = val
    },
    handleCreateTrackedPremise() {
      this.fillDataTable()
    },
    fillDataTable() {
      let tracked_premises = this.getTrackedVguard({
        page: 1,
        limit: 5,
        is_tracked: true
      })
      tracked_premises.then((r) => {
        this.table_data = []
        r.forEach((device) => {
          let generalVideoLoss = false
          let generalVideoSabotage = false
          let generalSceneChange = false
          let channelsVideoLoss = []
          let channelsVideoSabotage = []
          let channelsSceneChange = []
          let channelsMotionDetect = []
          device.channels.forEach((channel) => {
            channel.has_scene_change
              ? channelsSceneChange.push(channel.channel_id)
              : null
            channel.has_video_loss
              ? channelsVideoLoss.push(channel.channel_id)
              : null
            channel.has_video_sabotage
              ? channelsVideoSabotage.push(channel.channel_id)
              : null
            channel.motion_detect
              ? channelsMotionDetect.push(channel.channel_id)
              : null
            generalVideoLoss |= channel.has_video_loss
            generalVideoSabotage |= channel.has_video_sabotage
            generalSceneChange |= channel.has_scene_change
          })
          this.table_data.push({
            ...device,
            has_video_loss: generalVideoLoss,
            has_video_sabotage: generalVideoSabotage,
            has_scene_change: generalSceneChange,
            channelsSceneChange,
            channelsVideoLoss,
            channelsVideoSabotage,
            channelsMotionDetect
          })
        })
      })
    }
  },
  created() {
    this.fillDataTable()
  }
}
</script>

<style lang="scss" scoped>
.tracked-device {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: #fff;
  width: 100%;
  height: 409px;
  border: 0.5px solid #c3c3c3;
  border-radius: 10px;
}
</style>
