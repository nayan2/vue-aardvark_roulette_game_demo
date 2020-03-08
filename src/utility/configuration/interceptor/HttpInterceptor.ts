import store from '@/store/index'

export function interceptor(request: any, next: any) {
    store.commit('toggelSpinner');
    store.commit('addGameLocalLog', `GET .../${ request.url.substring(0, request.url.lastIndexOf('{') < 0 ? request.url.length : request.url.lastIndexOf('{')) }`);
    next((Response: any) => {
        store.commit('toggelSpinner');
        return Response;
    });
}