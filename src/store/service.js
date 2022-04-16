import Vue from 'vue'
import endpoints from '@/endpoints'

export default {
  namespaced: true,
  state: {
    services: [],
    service: {},
    filters: null
  },
  getters: {
    getServices: (state) => {
      return state.services
    },
    getService: (state) => {
      return state.service
    }
  },
  mutations: {
    SET_SERVICES: (state, services) => {
      state.services = services
    }
  },
  actions: {
    getServices({ commit }, params) {
      let requestObj = {
        microservice: 'TICKET',
        type: 'DATA',
        model: 'TICKET',
        where: {
          //   createdAt: {
          //     gte: params.date.startDate,
          //     lt: params.date.endDate
          //   },
          customer: {
            path: ['id'],
            equals: params.id
          }
        },
        orderBy: [
          {
            createdAt: 'desc'
          }
        ]
      }
      //   delete requestObj.where.createdAt
      let services = Vue.prototype.$api({
        ...endpoints.getServices,
        data: { ...requestObj }
      })
      return services.then((r) => {
        console.log('Store', r)
        /* commit('SET_SERVICES', r.data.data.pagination.records)
        this.dispatch(
          'pagination/setCurrentPage',
          r.data.data.pagination.to / r.data.data.pagination.per_page
        )
        this.dispatch(
          'pagination/setCurrentLimit',
          r.data.data.pagination.per_page
        )
        this.dispatch(
          'pagination/setTotalRecord',
          r.data.data.pagination.total_record
        ) */

        console.log(r.data.data.result[0])
        return r.data.data.result[0]
      })
    },
    createService(_, payload) {
      //   let new_payload = {
      //     premise_id: payload.premise_id,
      //     description: payload.description
      //   }

      let new_service = Vue.prototype.$api({
        ...endpoints.createService,
        data: { ...payload }
        // data: { ...payload },
      })
      return new_service.then((r) => {
        r
      })
    },
    getTicketDownloadList(_, payload) {
      let services = Vue.prototype.$api({
        ...endpoints.getTicketsListDownload,
        params: { response_type: 'excel', ...payload }
      })
      return services.then((r) => {
        return r.data
      })
    },
    async updateServiceStatus(_, payload) {
      let services = Vue.prototype.$api({
        ...endpoints.updateServiceStatus,
        data: { ...payload }
      })
      let result = {}
      await services.then((r) => {
        result = r
      })
      return result
    }
  }
}
