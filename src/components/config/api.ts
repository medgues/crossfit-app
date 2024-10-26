// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios'
// import { Bounce } from 'react-toastify'
// import { store } from '../state/store'
// import { toaster } from '../components'
// import {
//   ReqRefreshAccountToken,
//   StoreLogout,
// } from '../state/reducers/authentication2'

// export type HttpHeaderProps = {
//   deviceId: string
//   authorization: string
//   lang?: string
// }
// const api = axios.create({
//   baseURL: 'http://localhost:3000',
// })

// export const setAxiosHeaders = async ({
//   deviceId,
//   authorization,
//   lang,
// }: HttpHeaderProps) => {
//   try {
//     api.defaults.headers.common.deviceId = deviceId
//     api.defaults.headers.common.authorization = `Bearer ${authorization}`
//     api.defaults.headers.common.lang = lang || 'en'
//     return await Promise.resolve()
//   } catch (error) {
//     return Promise.reject(error)
//   }
// }

// export const API_CREATE_PARTNER = '/partner/create'
// export const API_UPDATE_PARTNER = '/partner/update'
// export const API_FETCH_PARTNER = '/partner/fetch'
// export const API_DELETE_PARTNER = '/partner/delete'

// export const API_FETCH_EKIOSK = '/ekiosk/fetch'
// export const API_CREATE_EKIOSK = '/ekiosk/create'
// export const API_UPDATE_EKIOSK = '/ekiosk/update'
// export const API_INITIATE_EKIOSK = '/ekiosk/initiate'
// export const API_SIGNUP_EKIOSK = '/ekiosk/signup'
// export const API_DELETE_EKIOSK = '/ekiosk/delete'

// export const API_CREATE_ACCOUNT = '/account/create'
// export const API_UPDATE_ACCOUNT = '/account/update'
// export const API_FETCH_ACCOUNT = '/account/fetch'
// export const API_DELETE_ACCOUNT = '/account/delete'

// export const API_FETCH_TRANSACTION = '/transaction/fetch'

// export const API_POST_LOGIN = '/authentification/signin'
// export const API_AUTH_REFRESH_ACCESS = '/authentification/refresh'

// export const API_FETCH_LANGUAGES = '/language/fetch'
// export const API_ADD_LANGUAGE = '/language/create'
// export const API_DELETE_LANGUAGE = '/language/delete'

// export const API_FETCH_NOTIFICATIONS = '/notification/fetch'
// export const API_UPDATE_NOTIFICATION = '/notification/update'

// export const API_FETCH_EVENTSLOG = '/eventLog/fetch'

// export const HTTP_STATUS_SUCCESS = 200
// export const HTTP_STATUS_CREATED = 201
// export const HTTP_STATUS_ACCEPTED = 202
// export const HTTP_STATUS_BAD_REQUEST = 400
// export const HTTP_STATUS_UNAUTHORIZED = 401
// export const HTTP_STATUS_FORBIDDEN = 403
// export const HTTP_STATUS_NOT_FOUND = 404
// export const HTTP_STATUS_SERVER_ERROR = 500
// export const HTTP_STATUS_PAYMENT_WAITING = 409

// const errorHandler = (error: any) => {
//   console.log({
//     error,
//   })
//   if (error.data.message) {
//     toaster.error(
//       {
//         title: 'Error',
//         text: error.data.message,
//       },
//       {
//         position: 'top-right',
//         autoClose: 5000,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: 'colored',
//         transition: Bounce,
//       },
//     )
//   }
// }

// api.interceptors.response.use(
//   (correctResponse: any) => {
//     console.log({
//       correctResponse,
//     })
//     return correctResponse
//   },
//   async (error: any) => {
//     const { response } = error
//     // eslint-disable-next-line @typescript-eslint/no-use-before-define
//     //error handler and Sentry message capture
//     errorHandler(response)
//     // ************************ //
//     // if (!isOnline && !isShown) {
//     //   showNoInternetMessage({
//     //     onShow: () => {
//     //       isShown = true
//     //     },
//     //     onHide: () => {
//     //       isShown = false
//     //     },
//     //     message: 'No Network',
//     //     description:
//     //       "You're not connected to any network. Please select a network to continue",
//     //   })
//     //   return
//     // }
//     const { config } = error
//     const originalRequest = config
//     if (
//       error?.response?.status === HTTP_STATUS_UNAUTHORIZED &&
//       !originalRequest._retry
//     ) {
//       // eslint-disable-next-line @typescript-eslint/no-use-before-define
//       if (originalRequest.url !== API_AUTH_REFRESH_ACCESS) {
//         originalRequest._retry = true
//         await store
//           .dispatch(ReqRefreshAccountToken())
//           .then((session: any) => {
//             api.defaults.headers.common.authorization = `Bearer ${session.accessToken}`
//           })
//           .catch(async () => store.dispatch(StoreLogout()))
//         return Promise.resolve(api(originalRequest))
//       }
//       await store.dispatch(StoreLogout())
//       return Promise.reject(error.response.data)
//     }
//     return Promise.reject(error.response.data)
//   },
// )

// export default api
