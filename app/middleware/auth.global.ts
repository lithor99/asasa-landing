export default defineNuxtRouteMiddleware((to, _) => {
    // let isLogin = false;
    // const token = useCookie<any>("token");
    // const username = useCookie<any>("username");
    // const userId = useCookie("userId");
    // const query = to?.query;
    // if (token.value && query?.credential && to.path === "/login") {
    //     token.value = null;
    //     userId.value = null;
    //     username.value = null;
    // } else if (token.value) {
    //     isLogin = true;
    // }

    // const noAuthPaths = [
    //     "/","/health", "/privacy-policy",'/forgot-password','/land/home','/land/home/',
    //     '/land/home/search','/land/profile','/land/valuation','/land/viewed','/register'
    // ];
    // console.log('to.path ', to.path)
    // const foundPath = noAuthPaths.find(pth => {
    //     console.log(to.path, pth, pth.startsWith(to.path), )
    //     return to.path.startsWith(pth)
    // })
    // if (!foundPath) {
    //     // if go to other page and not logged in redirect to login page
    //     if (to.path !== "/login" && !isLogin) {
    //         return navigateTo("/login");
    //     }
    //     // if go to logo page and already logged in redirect to home page
    //     if (to.path === "/login" && isLogin) {
    //         return navigateTo("/");
    //     }
    // }
});
