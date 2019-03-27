<template>
    <div class="merchandise">
        <ul>
            <router-link v-for="(item, index) in data" :key="index" :to="'/home/details/'+item.id" tag="li">
                <img src="https://imgservice2.suning.cn/uimg1/b2c/image/fULrBUkFYwQ5rEV2j9xmUg.png_400w_400h_4e" alt="">
                <h4>{{item.title}}</h4>
                <div class="iphone">
                    <p>
                        <span class="new">￥{{item.sell_price}}</span>
                        <span class="old">￥{{item.market_price}}</span>
                    </p>
                    <p class="wall">
                        <span class="mui-pull-left">热卖中</span>
                        <span class="mui-pull-right">剩余{{item.stock_quantity}}件</span>
                    </p>
                </div>
            </router-link>
            <mt-button plain size="large" type="danger" @click="bt">加载更多</mt-button>
        </ul>
    </div>
</template>

<script>
export default{
    data(){
        return{
            pageindex:1,
            data:[]
        }
    },
    created(){
        this.getmerchandise()
    },
    methods:{
        getmerchandise(){
            this.$http.get("api/getgoods/?"+this.pageindex).then(result=>{
                console.log(result)
                this.data=this.data.concat(result.body.message)
            })
        },
        bt(){
            this.pageindex++
            this.getmerchandise()
        }
    }
}
    
</script>

<style lang="less">
    .merchandise{
        ul{
            padding: 0 5px;
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            justify-content:space-between;
            margin-top: 5px;
            li{
                width: 49%;
                box-shadow: 0 0 6px #ccc;
                margin-bottom: 10px;
                img{
                    width: 100%;
                }
                h4{
                    font-size: 14px;
                }
                p{
                    padding: 5px;
                    margin: 0;
                }
                .iphone{
                    background-color: #eee;
                   .new{
                    font-size: 16px;
                    color:red;
                    font-weight: 700;
                    margin-right: 10px;
                   }
                   .old{
                       text-decoration:line-through;
                      
                   }
                    .wall{
                    justify-content: space-between;
                    display: flex;
                    font-size: 13px
                }
                }

            }
        }
    }
</style>

