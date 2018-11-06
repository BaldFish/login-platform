import Vue from 'vue'
import Router from 'vue-router'
import myLogin from '@/components/login/login'
import myCreateWallet from '@/components/createWallet/createWallet'
/*import myForgetPassword from '@/components/forgetPassword/forgetPassword'
import myRegister from '@/components/register/register'
import myContract from '@/components/register/contract'*/
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'login',
      component: myLogin
    },
    {
      path: '/createWallet',
      name: 'createWallet',
      component: myCreateWallet
    },
    /*{
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: myForgetPassword
    },
    {
      path: '/register',
      name: 'register',
      component: myRegister
    },
    {
      path: '/contract',
      name: 'contract',
      component: myContract
    },*/
  ]
})
