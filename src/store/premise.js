import Vue from 'vue'
import endpoints from '@/endpoints'
export default {
  namespaced: true,
  state: {
    currrentPremise: {},
    tracked_premise: [],
    users: []
  },
  getters: {
    getCurrentPremise: (state) => {
      return state.currrentPremise
    },
    getPremiseUsers: (state) => {
      return state.users
    }
  },
  mutations: {
    SET_CURRENT_PREMISE(state, premise) {
      console.log('Store Premise', premise)
      state.currrentPremise = premise
    },
    SET_PREMISE_USERS(state, users) {
      state.users = users
    }
  },
  actions: {
    setCurrentPremise({ commit }, premise) {
      commit('SET_CURRENT_PREMISE', premise)
    },
    async getPremiseById({ commit }, premise_id) {
      const premise = Vue.prototype.$api({
        ...endpoints.getPremiseById,
        url: '/premises/' + premise_id
      })
      return await premise.then((r) => {
        if (r.status == 200) {
          commit('SET_CURRENT_PREMISE', r.data.data.premise)
          if (r.status == 200) {
            return r.data.data.premise
          }
        }
      })
    },
    async getPremises(_, payload) {
      console.log('getPremises', payload)
      const { skip, take, customerId } = payload

      return await Vue.prototype.$api.post('/queries', {
        microservice: 'CUDIO',
        type: 'DATA',
        model: 'PREMISE',
        skip,
        take,
        relations: [
          {
            model: 'CUSTOMER'
          }
        ],
        where: { customer: { id: customerId || '' } },
        include: {
          address: {
            include: {
              country: true
            }
          }
          // contacts: true,
        }
      })
    },
    // getPremises(_, payload) {
    // 	const premise = Vue.prototype.$api({
    // 	  ...endpoints.getPremises,
    // 	  params: { page: 1, limit: 20, ...payload }
    // 	})
    // 	return premise.then((r) => {
    // 	  if (r.status == 200) {
    // 		this.dispatch(
    // 		  'pagination/setCurrentPage',
    // 		  r.data.data.pagination.to / r.data.data.pagination.per_page
    // 		)
    // 		this.dispatch(
    // 		  'pagination/setCurrentLimit',
    // 		  r.data.data.pagination.per_page
    // 		)
    // 		this.dispatch(
    // 		  'pagination/setTotalRecord',
    // 		  r.data.data.pagination.total_record
    // 		)
    // 		return r.data.data.pagination.records //Pagination keyleri device ile farklı
    // 	  }
    // 	})
    //   },
    getPremisesForMap() {
      const premise = Vue.prototype.$api({
        ...endpoints.getPremises
      })
      return premise.then((r) => {
        if (r.status == 200) {
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
          )
          return r.data.data.pagination.records //Pagination keyleri device ile farklı
        }
      })
    },
    getFilterPremises(_, filter_data) {
      const premise = Vue.prototype.$api({
        ...endpoints.getPremises,
        params: { page: 1, limit: 10, ...filter_data }
      })
      return premise.then((r) => {
        if (r.status == 200) {
          return r.data.data.premises
        }
      })
    },
    async createPremise(_, payload) {
      const newPremise = Vue.prototype.$api({
        ...endpoints.createPremise,
        data: {
          premise: payload
        }
      })
      let result = null
      return newPremise.then((r) => {
        if (r.status == 201) {
          return r
        }
      })
    },
    async deletePremise(_, premise_id) {
      const deletePremise = Vue.prototype.$api({
        ...endpoints.deletePremise,
        url: endpoints.deletePremise.url + '/' + premise_id.id
        // query: { premise_id: premise_id }
      })
      return await deletePremise.then((r) => {
        return r
      })
    },
    updatePremise(_, payload) {
      return Vue.prototype.$api({
        ...endpoints.updatePremise,
        url: '/premises/' + payload.premise_id,
        data: { premise: payload.premise }
      })
    },
    getPremiseDevice({ commit }, premise_id) {
      let premise_devices = Vue.prototype.$api({
        ...endpoints.getPremiseDevice,
        data: {
          microservice: 'CUDIO',
          type: 'DATA',
          model: 'DEVICE',
          skip: 1,
          take: 10,
          relations: ['CUSTOMER', 'PREMISE'],
          preprocess: [{}, { id: premise_id }],
          include: { premise: { include: { customer: true } } }
        }
      })
      return premise_devices.then((r) => {
        if (r.data.data.users.length > 0)
          commit('SET_PREMISE_USERS', r.data.data.users)

        return r.data.data.paginated.records
      })
    },
    getTrackedPremises(_, payload) {
      const tracked_premise = Vue.prototype.$api({
        ...endpoints.getTrackedPremises,
        url: 'prosec/devices/',
        params: payload
      })
      return tracked_premise.then((r) => {
        if (r.status == 200) {
          return r.data.data.paginated.records
        }
      })
    },
    getTrackedVguard(_, payload) {
      const tracked_premise = Vue.prototype.$api({
        ...endpoints.getTrackedPremises,
        url: 'vguard/devices/',
        params: payload
      })
      return tracked_premise.then((r) => {
        if (r.status == 200) {
          return r.data.data.paginated.records
        }
      })
    }
  }
}
