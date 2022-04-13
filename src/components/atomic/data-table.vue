<template>
  <!-- Liste Dashboard Tracked Device  -->
  <el-table
    v-loading="loading"
    v-if="
      ['List', 'Dashboard'].includes(this.$route.name) &&
      this.$route.fullPath.indexOf('iot') < 0
    "
    ref="cameraTable"
    class="data-table"
    :data="data"
    style="width: 99%; max-height: calc(100vh - 180px); overflow: none"
    @row-dblclick="handleDBClick"
    :header-cell-style="
      this.$route.name == 'List'
        ? { background: '#f5f5f5', color: '#444444', wordWrap: 'break-word' }
        : { color: '#444444' }
    "
    @selection-change="handleSelectionChange"
    @sort-change="handleServiceSorting"
    :row-class-name="rowClassName"
    height="100%"
  >
    <el-table-column type="selection" width="55"> </el-table-column>

    <el-table-column
      header-align="left"
      prop="premise.custom_premise_id"
      label="DEPO KODU"
      width="180"
    >
      <template slot-scope="scope">
        <SvgIconWarning v-if="scope.row.show_warning"></SvgIconWarning>
        {{ scope.row.premise.custom_premise_id }}
      </template>
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="premise.custom_premise_name"
      label="DEPO ADI"
    >
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="premise.location.city.name"
      label="LOKASYON"
      width="140"
    >
      <!-- <template slot-scope="scope">
        {{ scope.row.premise.location }}
       
      </template> -->
    </el-table-column>

    <!--   <el-table-column
      header-align="left"
      prop="description"
      label="Açıklama"
      width="300"
    >
    </el-table-column> -->
    <el-table-column
      header-align="left"
      prop="device_brand.name"
      label="CİHAZ"
      width="180"
    >
    </el-table-column>
    <!-- <el-table-column
      header-align="left"
      prop="is_warning"
      label="CİHAZ"
      width="180"
    >
      <template slot-scope="scope">
        {{ scope.row.show_warning }}
       
      </template>
    </el-table-column> -->
    <el-table-column
      header-align="left"
      prop="device_state"
      label="Bağlantı Durumu"
      width="80px"
    >
      <template slot-scope="scope">
        <ul>
          <li class="device-state-icon">
            <SvgIconCameraConnection
              :status="
                scope.row.is_active == true ? !scope.row.network_error : false
              "
            ></SvgIconCameraConnection>
          </li>
        </ul>
      </template>
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="state"
      label="Disk Durumu"
      width="70px"
    >
      <template slot-scope="scope">
        <ul>
          <li class="device-state-icon">
            <SvgIconCameraDisk
              :status="
                scope.row.is_active == true ? !scope.row.disk_error : false
              "
            ></SvgIconCameraDisk>
          </li>
        </ul>
      </template>
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="state"
      label="Kayıt Durumu"
      width="80px"
    >
      <template slot-scope="scope">
        <ul>
          <li class="device-state-icon">
            <SvgIconCameraRecord
              :status="
                scope.row.is_active == true
                  ? !scope.row.record_error && !scope.row.disk_error
                  : false
              "
            ></SvgIconCameraRecord>
          </li>
        </ul>
      </template>
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="state"
      label="Tarih Durumu"
      width="80px"
    >
      <template slot-scope="scope">
        <ul>
          <li class="device-state-icon">
            <SvgIconCameraTime
              :status="
                scope.row.is_active == true ? !scope.row.datetime_error : false
              "
            ></SvgIconCameraTime>
          </li>
        </ul>
      </template>
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="state"
      label="Video Kaybı"
      width="80px"
    >
      <template slot-scope="scope">
        <ul>
          <li class="device-state-icon">
            <el-tooltip
              class="item"
              effect="dark"
              :visible-arrow="false"
              popper-class="white-background"
              placement="bottom"
            >
              <div
                class="circle"
                v-for="channel in scope.row.channelsVideoLoss"
                :key="channel.channel_id"
                slot="content"
              >
                <span>{{ channel }}</span>
              </div>
              <!-- <div slot="content">
                <div>{{ scope.row.channelsVideoLoss[0] }}</div>
              </div> -->
              <el-badge
                :hidden="scope.row.channelsVideoLoss.length == 0"
                :value="scope.row.channelsVideoLoss.length"
                class="item"
              >
                <SvgIconCameraVideoLoss
                  :status="
                    scope.row.is_active == true
                      ? !scope.row.has_video_loss
                      : false
                  "
                ></SvgIconCameraVideoLoss>
              </el-badge>
            </el-tooltip>
          </li>
        </ul>
      </template>
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="state"
      label="Hareket Algılama"
      width="80px"
    >
      <template slot-scope="scope">
        <ul>
          <li class="device-state-icon">
            <el-tooltip
              class="item"
              effect="dark"
              :visible-arrow="false"
              popper-class="white-background"
              placement="bottom"
            >
              <div
                class="circle"
                v-for="channel in scope.row.channelsMotionDetect"
                :key="channel.channel_id"
                slot="content"
              >
                <span>{{ channel }}</span>
              </div>
              <el-badge
                :hidden="scope.row.channelsMotionDetect.length == 0"
                :value="scope.row.channelsMotionDetect.length"
                class="item"
              >
                <SvgIconCameraMotionDetect
                  :status="
                    scope.row.is_active == true
                      ? !scope.row.motion_detect
                      : false
                  "
                ></SvgIconCameraMotionDetect> </el-badge
            ></el-tooltip>
          </li>
        </ul>
      </template>
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="state"
      label="Video Sabotaj"
      width="80px"
    >
      <template slot-scope="scope">
        <ul>
          <li class="device-state-icon">
            <el-tooltip
              class="item"
              effect="dark"
              :visible-arrow="false"
              popper-class="white-background"
              placement="bottom"
            >
              <div
                class="circle"
                v-for="channel in scope.row.channelsVideoSabotage"
                :key="channel.channel_id"
                slot="content"
              >
                <span>{{ channel }}</span>
              </div>
              <el-badge
                :hidden="scope.row.channelsVideoSabotage.length == 0"
                :value="scope.row.channelsVideoSabotage.length"
                class="item"
              >
                <SvgIconCameraVideoSabotaj
                  :status="
                    scope.row.is_active == true
                      ? !scope.row.has_video_sabotage
                      : false
                  "
                ></SvgIconCameraVideoSabotaj> </el-badge
            ></el-tooltip>
          </li>
        </ul>
      </template>
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="state"
      label="Sahne Değişimi"
      width="80px"
    >
      <template slot-scope="scope">
        <ul>
          <li class="device-state-icon">
            <el-tooltip
              class="item"
              effect="dark"
              :visible-arrow="false"
              popper-class="white-background"
              placement="bottom"
            >
              <div
                class="circle"
                v-for="channel in scope.row.channelsSceneChange"
                :key="channel.channel_id"
                slot="content"
              >
                <span>{{ channel }}</span>
              </div>
              <el-badge
                :hidden="scope.row.channelsSceneChange.length == 0"
                :value="scope.row.channelsSceneChange.length"
                class="item"
              >
                <SvgIconCameraSceneChange
                  :status="
                    scope.row.is_active == true
                      ? !scope.row.has_scene_change
                      : false
                  "
                ></SvgIconCameraSceneChange> </el-badge
            ></el-tooltip>
          </li>
        </ul>
      </template>
    </el-table-column>
    <!-- :sortable="['List'].includes(this.$route.name)" -->
    <el-table-column
      v-if="['List'].includes(this.$route.name)"
      sortable
      align="center"
      prop="last_signal"
      label="SERVİS DURUMU"
    >
      <template slot-scope="scope">
        <SvgIconServiceRequest
          :is_ticket="
            scope.row.ticket != null && !scope.row.ticket.ticket_finished_time
          "
        ></SvgIconServiceRequest>
      </template>
    </el-table-column>
    <el-table-column align="center" label="CİHAZ ARAYÜZÜ">
      <template slot-scope="scope">
        <el-button type="text" @click="interfaceClickHandle(scope)">
          <SvgIconDeviceInterface></SvgIconDeviceInterface>
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
      align="left"
      prop="updated_at"
      label="SON SİNYAL"
      width="180"
    >
      <template slot-scope="scope">
        {{
          scope.row.last_signal.event_date == null ||
          scope.row.last_signal.event_date == '0001-01-01T00:00:00Z' ||
          scope.row.last_signal.event_date == '0001-01-01T01:55:52+01:55'
            ? 'Bilgi Alınamadı'
            : formattedDatetime(scope.row.last_signal.event_date)
        }}
      </template>
    </el-table-column>
    <!-- <el-table-column header-align="center" prop="last_state" label="Sorgu">
      <template slot-scope="scope">
        <SvgIconQuery :status="scope.is_active"></SvgIconQuery>
      </template>
    </el-table-column> -->
  </el-table>
  <!-- Liste IOT Gateway Device  -->
  <el-table
    v-loading="loading"
    v-else-if="
      ['List', 'Dashboard'].includes(this.$route.name) &&
      this.$route.fullPath.indexOf('iot') > 0
    "
    ref="iotGatewayTable"
    class="data-table"
    :data="data"
    style="
      width: 99%;
      max-height: calc(100vh - 180px);
      overflow: none;
      border: none;
    "
    cell-class-name="mycell"
    @row-dblclick="handleDBClick"
    :header-cell-style="
      this.$route.name == 'List'
        ? { background: '#f5f5f5', color: '#444444' }
        : { color: '#444444' }
    "
    @selection-change="handleSelectionChange"
    @sort-change="handleServiceSorting"
    :row-class-name="rowClassName"
    height="100%"
    border="false"
  >
    <el-table-column type="selection" width="55"> </el-table-column>

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
          <div style="display: flex; justify-content: center">
            <SvgIconTemprature
              :status="
                scope.row.sensor.length > 0
                  ? scope.row.sensor[0].temp
                    ? true
                    : false
                  : null
              "
            ></SvgIconTemprature>
          </div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="device_state" label="Nem">
        <template slot-scope="scope">
          <div style="display: flex; justify-content: center">
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
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="device_state" label="Tamper">
        <template slot-scope="scope">
          <div style="display: flex; justify-content: center">
            <SvgIconTamper
              :status="
                scope.row.sensor.length > 0
                  ? scope.row.sensor[0].tamper
                    ? true
                    : false
                  : null
              "
            ></SvgIconTamper>
          </div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="device_state" label="Pil">
        <template slot-scope="scope">
          <div style="display: flex; justify-content: center">
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
  <!-- Liste IOT Gateway Sensor Device  -->
  <el-table
    v-loading="loading"
    v-else-if="
      ['DeviceDetailIot'].includes(this.$route.name) &&
      this.$route.fullPath.indexOf('iot') > 0
    "
    ref="sensorTable"
    class="data-table"
    :data="data"
    style="
      width: 99%;
      max-height: calc(100vh - 180px);
      overflow: none;
      border: none;
    "
    cell-class-name="mycell2"
    @row-dblclick="handleDBClick"
    :header-cell-style="
      this.$route.name == 'List'
        ? { background: '#f5f5f5', color: '#444444' }
        : { color: '#444444' }
    "
    @selection-change="handleSelectionChange"
    @sort-change="handleServiceSorting"
    border="false"
  >
    <!-- height="100%" -->
    <!-- :row-class-name="rowClassName" -->
    <el-table-column type="selection" width="55"> </el-table-column>

    <el-table-column
      header-align="left"
      prop="premise_id"
      label="SENSOR"
      width="100"
    >
    </el-table-column>

    <el-table-column
      header-align="left"
      prop="sensor_id"
      label="SENSÖR ID"
      width="180"
    >
    </el-table-column>

    <el-table-column
      header-align="left"
      prop="type"
      label="KATEGORİ"
      width="120"
    >
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="gateway.name"
      label="GATEWAY"
      width="180"
    >
      <!-- <template slot-scope="scope">
        {{ scope.row.sensor.length }}
      </template> -->
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="gateway_id"
      label="GATEWAY ID"
      width="180"
    >
      <!-- <template slot-scope="scope">
        {{ scope.row.sensor.length }}
      </template> -->
    </el-table-column>

    <el-table-column
      header-align="center"
      prop="device_state"
      label="SICAKLIK"
      width="200"
    >
      <template slot-scope="scope">
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            "
          >
            <SvgIconTemprature
              :status="scope.row.temp ? true : false"
            ></SvgIconTemprature>
            <span
              style="
                font-weight: 400;
                font-size: 10px;
                line-height: 12px;
                color: #6fcf97;
              "
              :style="
                scope.row.temp > scope.row.min_temp &&
                scope.row.temp < scope.row.max_temp
                  ? { color: '#6fcf97' }
                  : { color: '#e04141' }
              "
              >{{
                handleRangeCheck(
                  scope.row.max_temp,
                  scope.row.min_temp,
                  scope.row.temp
                )
              }}</span
            >
          </div>
          <span
            style="
              color: #6fcf97;
              font-weight: 500;
              font-size: 20px;
              line-height: 23px;
            "
            :style="
              scope.row.temp > scope.row.min_temp &&
              scope.row.temp < scope.row.max_temp
                ? { color: '#6fcf97' }
                : { color: '#e04141' }
            "
            >{{ scope.row.temp }}°C</span
          >
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            "
          >
            <span
              style="
                font-weight: 400;
                font-size: 10px;
                line-height: 12px;
                color: #a0a0a0;
              "
              class="label"
              >MIN</span
            >
            <span
              style="
                font-weight: 500;
                font-size: 10px;
                line-height: 12px;
                color: #444444;
              "
              class="value"
              >{{ scope.row.min_temp }}°C</span
            >
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            "
          >
            <span
              style="
                font-weight: 400;
                font-size: 10px;
                line-height: 12px;
                color: #a0a0a0;
              "
              class="label"
              >MAX</span
            >
            <span
              style="
                font-weight: 500;
                font-size: 10px;
                line-height: 12px;
                color: #444444;
              "
              class="value"
              >{{ scope.row.max_temp }}°C</span
            >
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column header-align="center" prop="device_state" label="NEM">
      <template slot-scope="scope">
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            "
          >
            <SvgIconHumidty
              :status="scope.row.humidity ? true : false"
            ></SvgIconHumidty>
            <span
              style="
                font-weight: 400;
                font-size: 10px;
                line-height: 12px;
                color: #6fcf97;
              "
              :style="
                scope.row.humidity > scope.row.min_humidity &&
                scope.row.humidity < scope.row.max_humidity
                  ? { color: '#6fcf97' }
                  : { color: '#e04141' }
              "
              >{{
                handleRangeCheck(
                  scope.row.max_humidity,
                  scope.row.min_humidity,
                  scope.row.humidity
                )
              }}</span
            >
          </div>
          <span
            style="
              color: #6fcf97;
              font-weight: 500;
              font-size: 20px;
              line-height: 23px;
            "
            :style="
              scope.row.humidity > scope.row.min_humidity &&
              scope.row.humidity < scope.row.max_humidity
                ? { color: '#6fcf97' }
                : { color: '#e04141' }
            "
            >{{ scope.row.humidity }}%</span
          >
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            "
          >
            <span
              style="
                font-weight: 400;
                font-size: 10px;
                line-height: 12px;
                color: #a0a0a0;
              "
              class="label"
              >MIN</span
            >
            <span
              style="
                font-weight: 500;
                font-size: 10px;
                line-height: 12px;
                color: #444444;
              "
              class="value"
              >{{ scope.row.min_humidity }}%</span
            >
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            "
          >
            <span
              style="
                font-weight: 400;
                font-size: 10px;
                line-height: 12px;
                color: #a0a0a0;
              "
              class="label"
              >MAX</span
            >
            <span
              style="
                font-weight: 500;
                font-size: 10px;
                line-height: 12px;
                color: #444444;
              "
              class="value"
              >{{ scope.row.max_humidity }}%</span
            >
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column header-align="center" prop="device_state" label="PİL">
      <template slot-scope="scope">
        <div
          style="
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            aling-items: center;
          "
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            "
          >
            <SvgIconBattery :value="scope.row.battery"></SvgIconBattery>

            <span
              style="
                aling-self: center;
                font-weight: 400;
                font-size: 10px;
                line-height: 12px;
                color: #6fcf97;
              "
              :style="{
                color: handleRangeBatteryCheck(scope.row.battery, 'color')
              }"
              >{{ handleRangeBatteryCheck(scope.row.battery, 'text') }}</span
            >
          </div>
          <span
            style="
              color: #6fcf97;
              font-weight: 500;
              font-size: 20px;
              line-height: 23px;
            "
            :style="{
              color: handleRangeBatteryCheck(scope.row.battery, 'color')
            }"
            >{{ scope.row.battery }}%</span
          >
        </div>
      </template>
    </el-table-column>
    <el-table-column header-align="center" prop="device_state" label="TAMPER">
      <template slot-scope="scope">
        <div style="display: flex; justify-content: center">
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            "
          >
            <SvgIconTamper
              :status="scope.row.tamper ? true : false"
            ></SvgIconTamper>

            <span
              style="
                font-weight: 400;
                font-size: 10px;
                line-height: 12px;
                color: #6fcf97;
              "
              >{{ scope.row.tamper ? 'Normal' : 'Alarm' }}</span
            >
          </div>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <!-- Depolar -->
  <el-table
    v-loading="loading"
    v-else-if="['Premises'].includes(this.$route.name)"
    ref="cameraTable"
    :data="data"
    :header-cell-style="{ color: '#444444' }"
    style="width: 97%; max-height: calc(100vh - 75px);  margin-left 20px; overflow: scroll;"
    stripe
    highlight-current-row
    @current-change="handleCurrentChange"
    :row-class-name="rowClassName"
  >
    <el-table-column
      property="custom_premise_id"
      label="DEPO KODU"
      min-width="50"
    ></el-table-column>
    <el-table-column
      property="location.city.name"
      label="LOKASYON"
      min-width="100"
      align="center"
    ></el-table-column>

    <el-table-column
      property="created_at"
      label="OLUŞTURULMA ZAMANI"
      min-width="100"
      align="right"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        {{ formattedDatetime(scope.row.created_at) }}
      </template>
    </el-table-column>
  </el-table>
  <!--Servisler-->
  <el-table
    v-loading="loading"
    v-else-if="['Services'].includes(this.$route.name)"
    ref="singleTable"
    :data="data"
    :header-cell-style="
      this.$route.name === 'Services'
        ? { background: '#f5f5f5', color: '#444444' }
        : ''
    "
    style="width: 100%; max-height: calc(100vh - 180px); overflow: none"
    stripe
    highlight-current-row
    @selection-change="handleSelectionChange"
    height="100%"
  >
    <el-table-column type="selection" width="55"> </el-table-column>
    <el-table-column property="premise_id" label="DEPO KODU" min-width="55">
    </el-table-column>

    <el-table-column property="premise_name" label="DEPO ADI" min-width="80">
      <!-- <template slot-scope="scope">
        {{ scope.custom_premise_id }}
      </template> -->
    </el-table-column>
    <el-table-column property="location" label="LOKASYON" min-width="80">
    </el-table-column>
    <el-table-column property="fault_type" label="ARIZA TİPİ" min-width="150">
    </el-table-column>
    <el-table-column property="service_state" label="DURUM" min-width="80">
    </el-table-column>
    <!---->
    <el-table-column
      property="start_time"
      label="PLANLANAN BAŞLANGIÇ TARİHİ"
      min-width="100"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        {{ formattedDatetime(scope.row.start_time) }}
      </template>
    </el-table-column>
    <el-table-column
      property="finish_time"
      label="PLANLANAN BİTİŞ TARİHİ"
      min-width="100"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        {{ formattedDatetime(scope.row.finish_time) }}
      </template>
    </el-table-column>

    <el-table-column
      align="right"
      property="created_at"
      label="OLUŞTURULMA TARİHİ"
      min-width="100"
      show-overflow-tooltip
      ><template slot-scope="scope">
        {{ formattedDatetime(scope.row.created_at) }}
      </template>
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="ticket_finished_time"
      label="TAMAMLANMA ZAMANI"
      min-width="100"
    >
      <template slot-scope="scope">
        {{ formattedDatetime(scope.row.ticket_finished_time) }}
      </template>
    </el-table-column>
  </el-table>
  <!--Logs Kullanıcı İşlemleri-->
  <el-table
    v-loading="loading"
    v-else-if="['Logs'].includes(this.$route.name)"
    ref="singleTable"
    class="data-table"
    :data="data"
    stripe
    style="width: 99%; max-height: calc(100vh - 180px); overflow: none"
    height="100%"
  >
    <el-table-column header-align="left" prop="user" label="Kullanıcı">
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="description"
      label="Olay Açıklaması"
    >
    </el-table-column>

    <el-table-column
      header-align="left"
      prop="created_at"
      label="Oluşturulma Zamanı"
    >
    </el-table-column>
  </el-table>
  <!--Geçmiş Sinyaller Kullanıcı İşlemleri-->
  <el-table
    v-loading="loading"
    v-else-if="['DeviceLastSignals'].includes(this.$route.name)"
    ref="singleTable"
    class="data-table"
    :data="data"
    stripe
    style="width: 99%; max-height: calc(100vh - 180px); overflow: none"
    height="100%"
    :header-cell-style="
      this.$route.name === 'DeviceLastSignals'
        ? { background: '#f5f5f5', color: '#444444' }
        : ''
    "
  >
    <el-table-column type="selection" width="55"> </el-table-column>
    <el-table-column header-align="left" prop="channel_id" label="KANAL">
      <template slot-scope="scope">
        {{ scope.row.channel_id }}
        <!-- <SvgIconFirstChannel
          :status="true"
          :device_id="scope.row.channel_id"
        ></SvgIconFirstChannel> -->
      </template>
    </el-table-column>
    <el-table-column header-align="left" prop="state" label="DURUM" width="450">
    </el-table-column>
    <!-- <el-table-column header-align="left" prop="signal_type.sub_category" label="KATEGORİ">
    </el-table-column> -->
    <el-table-column header-align="left" prop="channel_id" label="OLAY KAYDI">
      <template slot-scope="scope">
        <!-- @click.native.prevent="downloadEventRecord(scope.row)" -->
        <span v-if="false">{{ scope.row.is_active }}</span>
        <SvgIconDownload :disabled="true" :status="null"></SvgIconDownload>
      </template>
    </el-table-column>

    <el-table-column
      prop="channel_id"
      header-align="right"
      align="right"
      label="OLAY ZAMANI"
    >
      <template slot-scope="scope">
        {{ formattedDatetime(scope.row.event_date) }}
      </template>
    </el-table-column>
  </el-table>
  <!--Kullanıcı Tablosu İşlemleri-->
  <el-table
    v-loading="loading"
    v-else-if="['UserPermissions'].includes(this.$route.name)"
    ref="singleTable"
    class="data-table"
    :data="data"
    stripe
    highlight-current-row
    style="width: 99%; min-height: calc(100vh - 180px); overflow: none"
    height="100%"
    :header-cell-style="
      this.$route.name !== 'UserPermissions'
        ? { background: '#f5f5f5', color: '#444444' }
        : { color: '#444444' }
    "
    @current-change="handleCurrentChange"
    :row-class-name="rowClassName"
  >
    <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
    <el-table-column header-align="left" prop="name" label="ADI SOYADI">
      <!-- <template slot-scope="scope"
        >{{ scope.row.user.name + '' + scope.row.user.surname }}
      </template> -->
    </el-table-column>
    <!-- <el-table-column header-align="left" prop="signal_type.sub_category" label="KATEGORİ">
    </el-table-column> -->
    <el-table-column header-align="left" prop="username" label="EMAİL ADRESİ">
    </el-table-column>
    <el-table-column
      header-align="left"
      prop="permission_grup"
      label="YETKİ GRUBU"
    >
      <template slot-scope="scope">
        {{ getTitle(scope.row.type)[0].label }}
      </template>
    </el-table-column>
    <el-table-column
      prop="created_at"
      header-align="right"
      align="right"
      label="OLUŞTURULMA ZAMANI"
    >
      <template slot-scope="scope">
        {{ formattedDatetime(scope.row.created_at) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import SvgIconCameraConnection from '@/assets/icons/device-details/camera/svg-icon-camera-connection.vue'
import SvgIconCameraDisk from '@/assets/icons/device-details/camera/svg-icon-camera-disk.vue'
import SvgIconCameraVideoLoss from '@/assets/icons/device-details/camera/svg-icon-camera-video-loss.vue'
import SvgIconCameraRecord from '@/assets/icons/device-details/camera/svg-icon-camera-record.vue'
import SvgIconCameraTime from '@/assets/icons/device-details/camera/svg-icon-camera-time.vue'
import SvgIconCameraSceneChange from '@/assets/icons/device-details/camera/svg-icon-camera-scene-change.vue'
import SvgIconCameraVideoSabotaj from '@/assets/icons/device-details/camera/svg-icon-camera-video-sabotaj.vue'
import SvgIconCameraMotionDetect from '@/assets/icons/device-details/camera/svg-icon-camera-motion-detect.vue'

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
  name: 'DataTable',
  data() {
    return {
      multiple_selection: [],
      bus: {},
      loading: true
    }
  },
  components: {
    SvgIconCameraConnection,
    SvgIconCameraDisk,
    SvgIconCameraVideoLoss,
    SvgIconCameraRecord,
    SvgIconCameraTime,
    SvgIconCameraSceneChange,
    SvgIconCameraVideoSabotaj,
    SvgIconCameraMotionDetect,
    SvgIconDownload,
    SvgIconWarning,
    // SvgIconFirstChannel,
    SvgIconHumidty,
    SvgIconTemprature,
    SvgIconTamper,
    SvgIconBattery,
    SvgIconServiceRequest,
    SvgIconDeviceInterface,
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
      console.log(
        'https://' + val.row.cloud_id + '.hopto.org' + ':' + val.row.port
      )
      if (process.env.IS_ELECTRON)
        require('electron').shell.openExternal(
          'http://' + val.row.cloud_id + ':' + val.row.port
        )
      else {
        let href = 'http://' + val.row.host + '.hopto.org' + ':' + val.row.port
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
      return this.$refs.cameraTable.selection.find(
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
    handleRangeCheck(max, min, val) {
      if (val < max && val > min) return 'Normal'
      else return 'Alarm'
    },
    handleRangeBatteryCheck(val, type) {
      if (type == 'text') {
        if (val < 100 && val >= 26) {
          return 'Normal'
        } else if (val < 26 && val >= 10) {
          return 'Zayıf'
        } else if (val < 10 && val >= 0) return 'Alarm'
      } else if (type == 'color') {
        if (val < 100 && val >= 26) {
          return '#6FCF97'
        } else if (val < 26 && val >= 10) {
          return '#F2994A'
        } else if (val < 10 && val >= 0) return '#E04141'
      }
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
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.white-background {
  display: flex;
  flex-direction: row;
  max-width: 100%;
  max-height: 100%;
  background: $hybrone_background_color !important;
  color: $hybrone_error_red !important;
  .circle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin: 5px;
    background: $hybrone_background_color !important;

    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: 1px solid #e04141;
    box-shadow: 0px 4px 6px rgba(91, 134, 245, 0.05);
    box-sizing: border-box;
  }
}
</style>
