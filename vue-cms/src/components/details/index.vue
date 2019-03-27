<template>
    <div class="details">
        <!-- 轮播图组件 -->
        <login :data="data" :isfull="false"></login>
        <!-- 商品名称组件 -->
        <!-- <resgin :datas="msg.stock_quantity"></resgin> -->
        <div class="button">
        <h3>商品名称</h3>
        <p>
            <span>市场价：<i>￥{{msg.market_price}}</i></span>
            <span>销售价：<i>￥{{msg.sell_price}}</i></span>
        </p>
        <div class="input">
            <i>购买数量：</i>
            <input type="text" value="1" v-model="msgs">
            <div @click="btn">-</div>
            <div @click="btnt">+</div>
        </div>
        <div class="tt">
            <button>立即购买</button>
            <button @click="btns">加入购物车</button>
        </div>
        </div>

    <transition name="ball"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
       
        <div class="shangpin">
           <div class="shangpin-p">
                商品详情：  
           </div>
            <div class="shangpin-x">
                    <p>商品货号：{{msg.goods_no}}</p>
                    <p>库存情况：{{msg.stock_quantity}}件</p>
                    <p>上架时间：{{msg.add_time | dataFonat}}</p>
            </div>
            <div class="buttn">
                <mt-button size="large" plain type="default" @click="href">图文介绍</mt-button>
                <mt-button size="large" plain type="danger" @click="location">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import login from '../lunbotu'
 export default{
     data(){
         return{
             id:this.$route.params.id,
             data:[
                 {src:'https://imgservice1.suning.cn/uimg1/b2c/image/CBoPe__vG9rJ44AC__4eQw.jpg_400w_400h_4e'},
                 {src:'https://imgservice4.suning.cn/uimg1/b2c/image/N0b4BeCL6k07DLuttQeobg.jpg_400w_400h_4e'}
             ],
             msg:{},
            msgs:1,
            // 小球的默认隐藏
            ballFlag:false
         }
     },
     created(){
         this.getDetails()
         this.zijiazi()
     },
     methods:{
         getDetails(){
             this.$http.get("api/goods/getinfo/"+this.id).then(result=>{
                 if(result.body.status===0){
                    //  console.log(result.body)
                     this.msg=result.body.message[0]
                    //  console.log(this.msg)
                   
                 } 
                
             })
         },
         zijiazi(){
                this.data.forEach(item=>{
                     item.img=item.src
                    })
                this.data=this.data
         },
         href(){
             this.$router.push({ path: '/home/href/'+this.id })
         },
         location(){
             this.$router.push({ path: '/home/location/'+this.id })
         },
        btn(){
                this.msgs--
                if(this.msgs<1){
                    this.msgs=1;
                    return
                }
            },
        btnt(){
                this.msgs++
                if(this.msgs>this.msg.stock_quantity){
                    this.msgs=this.msg.stock_quantity
                }
            },
        btns(){
           this.ballFlag=!this.ballFlag
            // console.log(11)
            var goodsinfo={
                id:this.id,
                count:this.msgs,
                price:this.msg.sell_price,
                selected:true
            };
            //调用store中的mutation方法传入对象值
            this.$store.commit("addToCar",goodsinfo)
        },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el,done) {
         el.offsetWidth;

        // const ballFonst=this.$refs.ball.getBoundingClientsRect();
         const ballPosition = this.$refs.ball.getBoundingClientRect();
        //  console.log(ballPosition)
       
        const badgePosition = document.getElementById("beged").getBoundingClientRect();
        //  console.log(badgePosition)
        const ballLeft=badgePosition.left-ballPosition.left;
        const ballTop=badgePosition.top-ballPosition.top;
     
      el.style.transform = `translate(${ballLeft}px,${ballTop}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },

     },
     components:{
         login
     }
 }
    
</script>

<style lang="less">
.details{
    background-color: #eee;
    padding:10px;
    overflow: hidden;
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        top:344px;
        left:157px;
    }
    .shangpin{
        background-color: #fff;
        box-shadow: 0 0 6px #ccc;
        .shangpin-p{
            padding:10px 15px;
            font-size: 16px;
            border-bottom: 1px solid #eee;
            
        }
        .shangpin-x{
            padding:10px 15px;
            border-bottom: 1px solid #eee;
        }
        .buttn{
            padding: 10px 15px;
           .mint-button{
                 margin: 10px 0;
            }
        }
    }
    .button{
        background-color: #fff;
        margin-bottom: 5px;
        h3{
            font-size: 17px;
            padding: 10px 15px;
            border: 1px solid #eee;
        }
        p{
            padding: 0 15px;
            margin: 10px 0;
            span:first-of-type{
                margin-right: 10px;
                i{
                 text-decoration: line-through ;
                    
                }
            }
            span:last-of-type{
                i{
                   font-size: 16px;
                   color:red;
                }
        }
    }
    .input{
        position: relative;
        padding: 0 15px;
        input{
        
            width: 130px;
            height: 33px;
            // border-left: 0;
            // border-right: 0;
            text-align: center;
            // border-radius: 0;
        }
        div:first-of-type{
            position: absolute;
            top: 0;
            left: 90px;
            width: 40px;
            height: 33px;
            line-height: 33px;
            text-align: center;
            border:1px solid #ccc;
            font-size: 16px;
        }
        div:last-of-type{
            position: absolute;
            left: 180px;
            top: 0;
            width: 40px;
            line-height: 33px;
            height: 33px;
            text-align: center;
             border:1px solid #ccc;
              font-size: 16px;
        }
       i{
           font-size: 14px;
           color: #8f8f94;
       }
    }
    .tt{
           padding: 0 15px;
           padding-bottom: 20px;
           button{
               color: #fff;
               border: 0;
           }
           button:first-of-type{
               background-color: #26a2ff;
           }
            button:last-of-type{
               background-color: #ef4f4f;
           }
       }
    }


}
</style>
