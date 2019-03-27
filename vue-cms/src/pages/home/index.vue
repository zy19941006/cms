<template>
    <div class="home-Component">
        <!-- 轮播图 -->
       <!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,i) in data" :key='i'>
                <a :href="item.url">
                    <img :src="item.img" alt="">
                </a>
            </mt-swipe-item>
        </mt-swipe> -->
        <login :data="data" :isfull="true"></login>
        <!-- 六宫格列表 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newList">
		                    <img src="../../images/menu1.png" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photoshop">
		                    <img src="../../images/menu2.png" alt="">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/merchandise">
		                    <img src="../../images/menu3.png" alt="">
		                    <div class="mui-media-body">商品买卖</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                   <img src="../../images/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>
		        </ul>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import login from '../../components/lunbotu'
export default {
  data() {
    return {
      data: []
    };
  },
  created() {
    this.getBanner();
  },
  methods: {
    getBanner() {
      this.$http.get("api/getlunbo").then(result => {
        if (result.body.status === 0) {
          // console.log(result.body);
          this.data = result.body.message;
        } else {
          Toast("获取内容失败");
        }
      });
    }
  },
  components:{
    login
  }
};
</script>

<style lang="less">
.home-Component {
  width: 100%;
  // .mint-swipe {
  //   width: 100%;
  //   height: 200px;
  //   background-color: #fff;
  //   a {
  //     display: block;
  //     width: 100%;
  //     height: 100%;
  //     img {
  //       height: 100%;
  //       width: 100%;
  //     }
  //   }
  // }
  .mui-table-view {
    border: none;
    background-color: #fff;
    .mui-table-view-cell {
      border: none;
      img {
        width: 60px;
        height: 60px;
      }
      .mui-media-body {
        font-size: 14px;
      }
    }
  }
}
</style>
