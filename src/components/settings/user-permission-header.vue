<template>
  <div class="premise-filter">
    <div class="premise-search">
      <div class="component">
        <span>ARAMA</span>
        <el-input
          class="sentinel-input"
          v-model="search"
          placeholder="Kullanıcı Adı veya mail adresini giriniz."
        ></el-input>
      </div>
      <div class="component">
        <el-button type="default" @click="handleSearch">
          <SvgIconSearch></SvgIconSearch>
        </el-button>
      </div>
    </div>
    <div class="component" @click="createUserClick">
      <span>YENİ</span>

      <el-button :disabled="!this.getPermissions['user_create']">
        <SvgIconAdd></SvgIconAdd>
      </el-button>
    </div>
  </div>
</template>

<script>
import SvgIconAdd from '@/assets/icons/premises/svg-icon-add'
import SvgIconSearch from '@/assets/icons/list/svg-icon-search.vue'
import { bus } from '@/main.js'
import { mapGetters } from 'vuex'
export default {
  name: 'UserPermissionHeader',
  components: {
    SvgIconSearch,
    SvgIconAdd
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: 'auth/getPermissions'
    })
  },
  methods: {
    handleSearch() {
      this.$emit('onUsersFilteredData', {
        search: this.search
      })
    },
    createUserClick() {
      bus.$emit('onClickCreateUser')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.premise-filter {
  display: flex;
  max-height: 100px;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin-top: 21px;
  margin-bottom: 18px;
  .premise-search {
    display: flex;
    justify-content: space-between;
    .component {
      &:nth-child(2n) {
        margin-top: 20px;
      }
    }
  }
  .component {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: self-end;
    justify-content: space-between;
    flex-wrap: nowrap;
    margin-right: 10px;
    &:nth-child(1) {
      margin-left: 23px;
    }
    span {
      @extend .sentinel-label;
    }
    input {
      @extend .sentinel-input;
    }
    button {
      display: flex;
      max-width: 50px;
      justify-content: center;
      @extend .sentinel-input;

      span {
        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        text-align: center;

        /* Gray Dark */

        color: #444444;
      }
    }
  }
}
</style>
