<template>
  <div class="location-content">
    <div class="map-view">
      <MapView class="view" v-if="isRendered"></MapView>
    </div>
    <div class="information">
      <PremiseInformation :premise="getSelectedRow"></PremiseInformation>
    </div>
    <div class="location-bottom">
      <el-button
        :disabled="!this.getPermissions['location_delete']"
        @click="deleteClick"
        >SİL</el-button
      >
      <el-button
        :disabled="!this.getPermissions['location_edit']"
        @click="handleUpdate"
        >DÜZENLE</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { bus } from '@/main.js'
import MapView from '@/components/map/map-view'
import PremiseInformation from '@/components/premises/premise-information.vue'
export default {
  name: 'PremiseDetail',
  components: {
    MapView,
    PremiseInformation
  },
  data() {
    return {
      premise: null,
      isRendered: false
    }
  },
  computed: {
    ...mapGetters({
      getSelectedRow: 'dataTable/getSelectedRow',
      getPermissions: 'auth/getPermissions'
    })
    // getSelectedRow: function () {
    //   let premise = this.$store.state.dataTable.selectedRow;
    //   return premise;
    // },
  },
  methods: {
    ...mapActions({
      deletePremise: 'premise/deletePremise'
    }),
    deleteClick() {
      if (this.getPermissions['location_delete'])
        this.$confirm('İstasyonu silmek istediğinize emin misiniz?', {
          confirmButtonText: 'Sil',
          cancelButtonText: 'Vazgeç',
          type: 'error'
        }).then(async () => {
          let delete_premise = await this.deletePremise(this.getSelectedRow)
          if (delete_premise.status == 200) bus.$emit('onDeletePremise', true)
        })
    },
    handleUpdate() {
      if (this.getPermissions['location_edit'])
        this.$router.push({
          name: 'UpdatePremise',
          params: { id: this.getSelectedRow.id }
        })
    }
  },
  mounted() {
    this.isRendered = true
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.location-content {
  display: flex;
  flex-direction: column;
  //   justify-content: space-between;
  min-height: 100%;
  border: 1px solid black;
  border-top: 1px solid transparent;
  border-radius: 0px 0px 0px 10px;
  padding: 20px;
  .information {
    min-width: 100%;
  }
  .location-bottom {
    display: flex;
    margin-top: 10%;
    align-items: flex-end;
    flex-direction: row;
    justify-content: space-between;
    // margin-bottom: 7px; justify-content:space-between; den sonra gerek kalmadı

    button {
      @extend .sentinel-button__settings;
      &:nth-child(2n + 1) {
        background-color: $hybrone_error_red;
        color: $hybrone_background_color;
        &:hover {
          border-color: $hybrone_error_red;
          color: $hybrone_error_red;
          background-color: $hybrone_background_color;
        }
      }
      &:nth-child(2n) {
        color: #fff;
        background-color: $hybrone_light_blue;
        &:hover {
          border-color: $hybrone_light_blue;
          color: $hybrone_light_blue;
          background-color: $hybrone_background_color;
        }
      }
      [disabled='disabled'] {
        pointer-events: none;
        opacity: 0.4;
      }
    }
  }
  .map-view .view {
    overflow: hidden;
    display: flex !important;
    width: 425px !important;
    max-height: 325px !important;
  }
}
</style>
