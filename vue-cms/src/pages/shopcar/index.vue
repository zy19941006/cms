<template>
   <div class="shopcar-container">
       <div class="goods-list">
           <div class="mui-card" v-for="(item, index) in goodsList" :key="index">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
                     <mt-switch v-model="$store.getters.getGoodsSelectde[item.id]" @change="selectedChang(item.id,$store.getters.getGoodsSelectde[item.id])"></mt-switch>
                     <img :src="item.thumb_path" alt="">
                     <div class="info">
                         <h1>{{item.title}}</h1>
                         <p>
                             <span class="price">￥{{item.sell_price}}</span>
                             <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                             <a href="javascript:;" @click.prevent="remove(item.id,index)">删除</a>
                         </p>
                     </div>
				</div>
			</div>
		</div>
    </div>
       
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
              <p>总计（不含运费）</p>
              <p>已勾选商品 <span class="red">{{ $store.getters. getGoodsCountAndAmount.count }}</span> 件， 总价 <span class="red">￥{{ $store.getters. getGoodsCountAndAmount.amount }}</span></p>
            </div>
             <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
		</div>
   </div>
</template>

<script>
import numbox from '../../components/shopcar_numbox'
export default{
    data(){
        return{
            goodsList:[]
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            var idArr=[];
           this.$store.state.car.forEach(item => {
                idArr.push(item.id)
                // console.log(idArr)
                 //如果购物车中没有商品，则直接返回，不需要请求数据接口。否则报错
            if(idArr.length<0){
                return;
            }
            
            this.$http.get("api/goods/getshopcarlist/"+idArr.join(",")).then(result=>{
                if(result.body.status===0){
                    this.goodsList=result.body.message
                }
            });
            });
           
        },
        remove(id,index){
            this.goodsList.splice(index,1)
            this.$store.commit("remove",id)
        },
        selectedChang(id,val){
            // console.log(id+"---"+val)
            this.$store.commit("updateGoodsselected",{id,selected:val})
        }
    },
    components:{   
    numbox
    }
}
    
</script>

<style lang="less">
    .shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>


