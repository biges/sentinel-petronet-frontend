<template>
  <el-table
    ref="detailsTable"
    :data="data"
    :header-cell-style="{ color: '#444444' }"
    style="width: 100%; max-height: calc(100vh - 180px); overflow: auto"
    stripe
    highlight-current-row
    height="600px"
  >
    <!-- @selection-change="handleSelectionChange" -->
    <!-- <el-table-column type="selection" width="55"> </el-table-column> -->

    <el-table-column property="id" label="KANAL" min-width="35" align="center">
      <template slot-scope="scope"
        ><SvgIconFirstChannel
          :status="
            scope.row.status
              ? scope.row.is_active && !scope.row.show_warning
              : null
          "
          :device_id="scope.row.channel_id"
        ></SvgIconFirstChannel>
      </template>
    </el-table-column>
    <el-table-column
      property="category"
      label="KATEGORİ"
      min-width="35"
      align="center"
      ><template slot-scope="scope">
        {{ scope.row.category.toUpperCase() }}
      </template>
    </el-table-column>
    <el-table-column
      property="has_video_loss"
      label="VİDEO KAYBI"
      min-width="35"
      align="center"
    >
      <template slot-scope="scope"
        ><SvgIconChannelStatus
          :status="
            scope.row.status && scope.row.is_active
              ? !scope.row.has_video_loss
              : null
          "
        ></SvgIconChannelStatus>
      </template>
    </el-table-column>
    <el-table-column
      property="HAREKET ALGILAMA"
      label="HAREKET ALGILAMA"
      min-width="40"
      align="center"
    >
      <template slot-scope="scope"
        ><SvgIconChannelStatus
          :status="
            scope.row.status && scope.row.is_active
              ? !scope.row.motion_detect
              : null
          "
        ></SvgIconChannelStatus>
      </template>
    </el-table-column>
    <el-table-column
      property="has_sabotage"
      label="VİDEO SABOTAJ"
      min-width="35"
      align="center"
    >
      <template slot-scope="scope"
        ><SvgIconChannelStatus
          :status="
            scope.row.status && scope.row.is_active
              ? !scope.row.has_sabotage
              : null
          "
        ></SvgIconChannelStatus>
      </template>
    </el-table-column>
    <el-table-column
      property="sabotage"
      label="SAHNE DEĞİŞİMİ"
      min-width="35"
      align="center"
    >
      <template slot-scope="scope">
        <SvgIconChannelStatus
          v-if="!scope.row.has_scene_change && scope.row.is_active"
          :status="
            scope.row.status && scope.row.is_active
              ? !scope.row.has_scene_change
              : null
          "
        ></SvgIconChannelStatus>
        <ul v-else class="scene_change_list">
          <SvgIconChannelStatus
            :status="
              scope.row.status && scope.row.is_active
                ? !scope.row.has_scene_change
                : null
            "
          ></SvgIconChannelStatus>

          <el-button
            v-if="
              scope.row.status && scope.row.is_active
                ? scope.row.has_scene_change
                : null
            "
            @click="handleSceneChangeResetClick(scope.row)"
            >Reset</el-button
          >
        </ul>
      </template>
    </el-table-column>
    <el-table-column
      property="trouble"
      label="ANLIK GÖRÜNTÜ"
      min-width="35"
      align="center"
    >
      <template slot-scope="scope">
        <el-button
          @click="snapshotClick(scope.row.channel_id)"
          :disabled="
            !scope.row.status ||
            !scope.row.is_active ||
            !getPermissions['take_snapshot']
          "
          class="button"
        >
          <SvgIconSnapshot
            :status="scope.row.status && scope.row.is_active"
          ></SvgIconSnapshot>
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
      property="by_pass"
      label="KAYIT İNDİR"
      min-width="35"
      align="center"
    >
      <!-- :disabled="!scope.row.status && !this.getPermissions['download_records']" -->

      <template slot-scope="scope">
        <el-button
          :disabled="
            !scope.row.status ||
            !scope.row.is_active ||
            !getPermissions['download_record']
          "
          class="button"
          @click="downloadRecord(scope.row.channel_id)"
        >
          <!-- scope.row.status &&
              getPermissions['download_records'] && -->
          <SvgIconDownload
            :status="scope.row.status && scope.row.is_active"
          ></SvgIconDownload>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import SvgIconAlarm from '@/components/atomic/device/hap/svg-icon-alarm.vue'
// import SvgIconFault from '@/components/atomic/device/hap/svg-icon-fault.vue'
// import SvgIconSabotage from '@/components/atomic/device/hap/svg-icon-sabotage.vue'
import SvgIconFirstChannel from '@/assets/icons/device-details/svg-icon-first-channel.vue'
import SvgIconChannelStatus from '@/assets/icons/device-details/svg-icon-channel-status.vue'
import SvgIconSnapshot from '@/assets/icons/device-details/svg-icon-snaphot.vue'
import SvgIconDownload from '@/assets/icons/device-details/svg-icon-download.vue'

import { mapGetters, mapActions } from 'vuex'
import { bus } from '@/main.js'

export default {
  name: 'DetailsTable',
  components: {
    SvgIconChannelStatus,
    SvgIconFirstChannel,
    SvgIconSnapshot,
    SvgIconDownload
    // SvgIconAlarm,
    // SvgIconFault,
    // SvgIconSabotage
  },
  data() {
    return {
      selected_channel_id: null
    }
  },
  props: {
    data: { default: [] }
  },
  watch: {
    data: function (val) {
      console.log('Gelen DAta', val)
    }
  },
  computed: {
    ...mapGetters({
      getDevice: 'device/getDevice',
      getPermissions: 'auth/getPermissions'
    }),
    statusCheckRecordDownload() {
      return this.getPermissions['download_record']
    },
    statusCheckSnapshotDownload() {
      return this.getPermissions['take_snapshot']
    }
  },
  methods: {
    ...mapActions({
      resetVguardDeviceSceneChange: 'device/resetVguardDeviceSceneChange'
    }),
    async handleSceneChangeResetClick(val) {
      let reset = await this.resetVguardDeviceSceneChange({
        device_id: parseInt(this.$route.params.device_id),
        channel_id: val.channel_id
      })
      if (reset.status == 200) {
        bus.$emit('onRefreshDeviceData')
      }
      console.log('Sahne Değişimi Reset Tıklandı', val)
      console.log('Response', reset)
    },
    downloadRecord(val) {
      console.log('Emit ÜStü', val)
      this.$emit('onDownloadRecordClick', val)
    },
    snapshotClick(val1) {
      console.log('ChannelID,', val1)
      this.$emit('onSnapshotClick', val1)
      this.selected_channel_id = val1
    }
  },
  mounted() {
    console.log('Permission Channel', this.getPermissions)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.button {
  padding: 0px;
  margin: 0px;
  border: none;
  background: none;
  &:hover {
    background-color: #e0e0e0;
  }
}
.scene_change_list {
  min-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  //   gap: 10px;
  button {
    display: flex;

    margin-left: 10px;
    // padding: 0px !important;
    color: $hybrone_background_color;
    background-color: $hybrone_error_red;

    span {
      @extend .sentinel-label;
      align-self: center;
      margin: 0px;
    }
    &:hover {
      background-color: $hybrone_light_blue;
      span {
        @extend .sentinel-label;
        align-self: center;
        margin: 0px;
        color: #444444;
      }
    }
  }
}
</style>
