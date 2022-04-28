import store from '../store/index.js'
import Vue from 'vue'
export default function (to, from, next) {
  console.log('From', from)
  console.log('To', to)
  const auth = store.state.auth.user.data.user
  console.log('Auth Middleware', auth)
  //Route Değiştikçe 0 lanacak olan Store değişkenleri
  store.state.dataTable.selectedRows = []
  store.state.dataTable.selectedRow = {}
  console.log(auth)
  const isLoggedIn = store.getters['auth/isLoggedIn']
  let isUndefined = typeof to.name === 'undefined'
  console.log(isLoggedIn)
  console.log(isUndefined)
  console.log(queryRedirect)

  const queryRedirect = to.query.redirect

  if (isUndefined) {
    if (!isLoggedIn) {
      next({ name: 'Login' })
    } else {
      if (queryRedirect) next({ name: queryRedirect })
      next({ name: 'Integrator' })
    }
  }

  if (isLoggedIn) {
    console.log('Login:::::::::::')
    if (queryRedirect) {
      if (
        auth.permission['sensor_access'] &&
        auth.permission['device_access']
      ) {
        console.log('GEtir God')
        next({ name: 'Dashboard' })
      } else {
        if (auth.permission['sensor_access']) {
          console.log('DashboardIOT')
          next({ name: 'DashboardIot' })
        } else if (auth.permission['device_access']) {
          console.log('Device Access')
          next({ name: 'Dashboard' })
        }
      }
    }
    if (!queryRedirect && to.name == 'Login') {
      console.log('Buramı ')
      next({ name: 'Dashboard' })
    } else {
      console.log('Else:::::::::::::')
      next()
    }
  } else {
    if (to.meta.layout == 'auth') {
      let payload = {
        name: 'Login',
        query: {
          redirect: queryRedirect
        }
      }
      if (!queryRedirect) delete payload.query.redirect
      next(payload)
    } else {
      console.log('Middile Ware Else')
      next()
    }
  }
}
