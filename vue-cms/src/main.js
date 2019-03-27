// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

//导入resource解决发送请求问题
import resource from 'vue-resource'
Vue.use(resource)

import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem("car") || "[]")

//按需引入模块
import { Header, Swipe, SwipeItem, Button, Switch } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);

// 引入清除默认样式css
import './components/common.css'
// 引入mint-ui的样式
import 'mint-ui/lib/style.css'

// 引入mui的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//引入时间格式化
import moment from 'moment'
Vue.filter('dataFonat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})

// 托管http请求前缀
Vue.http.options.root = 'http://vue.lovegf.cn:8899/';
// 解决post请求,参数转换为json格式
Vue.http.options.emulateJSON = true;
//引入懒加载模块
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);

//引入查看缩略图的模块
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

Vue.config.productionTip = false

//创建vuex实例并挂载到vue实例上
var store = new Vuex.Store({
    state: { //this.$store.state
        car: car
    },
    mutations: { //this.$store.commit("方法名称"，"按需传递唯一的参数")
        addToCar(state, goodsinfo) {
            //先标记一个false表示car数组中没有加入物品，没有匹配到
            var falg = false
            state.car.some(item => { //循环找是否有相同的id,找到后把数量购买的数量想加
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    falg = true
                    return true
                }
            })
            if (!falg) { //判断如果没有匹配到就把数据直接push到数组
                state.car.push(goodsinfo)
            }
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            state.car.some(item => {
                    if (item.id == goodsinfo.id) {
                        item.count = parseInt(goodsinfo.count)
                        return true
                    }
                })
                //当修改完商品的数量，把最新的购物车保存到本地存储中
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        remove(state, id) {
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true;
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        updateGoodsselected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        }
    },
    getters: { //this.$store.getters
        gitCommint(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            });
            return c
        },
        getGoodsCount(state) {
            var o = [];
            state.car.forEach(item => {
                //循环car 以健值队的形式得出结果
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelectde(state) {
            var i = [];
            state.car.forEach(item => {
                i[item.id] = item.selected
            })
            return i
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, // 勾选的数量
                amount: 0 // 勾选的总价
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    store,
    template: '<App/>'
})