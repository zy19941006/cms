<template>
     <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,i) in data" :key='i'>
                <a :href="item.url">
                    <img :src="item.img" alt="" :class="{full:isfull}">
                </a>
            </mt-swipe-item>
        </mt-swipe>
</template>
<style lang="less">
     .mint-swipe {
    width: 100%;
    height: 200px;
    background-color: #fff;
    .mint-swipe-items-wrap{
        width: 100%;
        .mint-swipe-item{
            a {
      display: block;
      width: 100%;
      height: 100%;
      
      img {
          display: block;
        height: 100%;
        margin: 0 auto;
        // width: 100%;
      }
      .full{
          width: 100%;
      }
    }

        }
         
    }
   
  }
</style>
<script>

   export default{
       data(){
           return{}
       },
       props:["data","isfull"]
   }
</script>

