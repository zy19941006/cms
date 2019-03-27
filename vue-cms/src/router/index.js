import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


import home from '../pages/home'
import member from '../pages/member'
import shopcar from '../pages/shopcar'
import search from '../pages/search'
import newList from '../pages/newList'
import newInfo from '../pages/newInfo'
import photoShop from '../components/photoshop'
import Thumbnail from '../components/Thumbnail'
import merchandise from '../components/merchandise'
import details from '../components/details'
import href from '../components/href'
import location from '../components/location'

export default new Router({
    routes: [{
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: home
        },
        {
            path: '/member',
            component: member
        },
        {
            path: '/shopcar',
            component: shopcar
        },
        {
            path: '/search',
            component: search
        },
        {
            path: '/home/newList',
            component: newList
        },
        {
            path: '/home/newInfo/:id',
            component: newInfo
        },
        {
            path: '/home/photoshop',
            component: photoShop
        },
        {
            path: '/home/Thumbnail/:id',
            component: Thumbnail
        },
        {
            path: '/home/merchandise',
            component: merchandise
        },
        {
            path: '/home/details/:id',
            component: details
        },
        {
            path: '/home/href/:id',
            component: href
        },
        {
            path: '/home/location/:id',
            component: location
        }
    ],
    linkActiveClass: 'mui-active'
})