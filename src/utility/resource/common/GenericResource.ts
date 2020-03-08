export const GenericResource = {
    get: { method: 'GET', url: process.env.VUE_APP_ENDPOINTUR },
    add: { method: 'POST', url: process.env.VUE_APP_ENDPOINTUR },
    edit: { method: 'PUT', url: process.env.VUE_APP_ENDPOINTUR },
    delete: { method: 'DELETE', url: process.env.VUE_APP_ENDPOINTUR }
}; 
  