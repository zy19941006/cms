<template>
    <div class="newInfo">
        <h3 class="title">{{data.title}}</h3>
        <p class="subtitle">
            <span class="mui-pull-left">发表时间:{{data.add_time | dataFonat}}</span>
            <span class="mui-pull-right">点击:{{data.click}}次</span>
        </p>
        <div class="content" v-html="data.content">

        </div>
        <login :id="id"></login>
    </div>
</template>

<style lang="less">
    .newInfo{
        padding: 0 5px;
        .title{
            text-align: center;
            color: red;
            font-size: 16px;
            font-weight: 700;
        }
        .subtitle{
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #ccc;
                span{
                    color: #226aff;
                }
            }
            .content{
                img{
                    width: 100%;
                }
            }
    }
</style>

<script>
import conment from '../../components/comment'
export default{
    data(){
        return{
            id:this.$route.params.id,
            data:{}
        }
    },
    created(){
        this.getNewInfo()
    },
    methods:{
        getNewInfo(){
            this.$http.get("api/getnew/"+this.id).then(result=>{
                if(result.body.status===0){
                    // console.log(result.body)
                    this.data=result.body.message[0]
                }
              
            })
        }
    },
    components:{
        login:conment
    }
}
    
</script>
