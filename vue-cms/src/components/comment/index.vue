<template>
    <div class="comment">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入您要发表的评论，字数最多120字" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="btn">发表评论</mt-button>
        <div class="cmt-title" v-for="(item,i) in data" :key="i">
        第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | dataFonat}}
         <div class="cmt">
            {{item.content==="undefined" ? "此用户太懒":item.content}}
        </div>
        </div>
        
        <mt-button plain type="danger" size="large" @click="bt">加载更多</mt-button>
    </div>
</template>

<style lang="less">
.comment{
    h3{
        font-size: 18px;
        font-weight: 700;
    }
    textarea{
        height: 100px;
    }
    .cmt-title{
        margin-top: 5px;
        font-size: 12px;
        background-color: #ccc;
        .cmt{
            line-height: 40px;
            background-color: #fff;
        }
    }
   
}
</style>
<script>
import { Toast } from 'mint-ui';
export default{
    data(){
        return{
            pageSize:1,
            data:[],
            msg:"",
        }
    },
    created(){
        this.getComment()
    },
    methods:{
        getComment(){
            this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageSize).then(result=>{
              if(result.body.status===0){
                //   console.log(result.body)
                  this.data = this.data.concat(result.body.message);
                //   this.data=result.body.message
              }
            })
        },
        btn(){
            if(this.msg==''){
                 return Toast('评论不能为空');
              
            }
            this.$http.post("api/postcomment/"+this.id,{content:this.msg.trim()}).then(result=>{
                // console.log(result);  
                //  this.pageSize=1
                //  this.data.unshift(this.msg)
                //  this.msg=''
                 if(result.body.status===0){
                    //  console.log(111)
                    //  this.data=this.data.concat(result.body.message)
                    //  this.pageSize=1
                     
                    //  this.data=[]
                    //  this.getComment()
                    //  this.msg=''
                    var b = {
                        user_name:'匿名用户',
                        add_time:Date.now(),
                        content:this.msg
                    }
                    this.data.unshift(b)
                     this.msg=''
                 }else{
                     Toast('获取数据失败');
                 }
            })
        },
        bt(){
            this.pageSize++
            this.getComment()
        }
    },
    props:["id"]
}
    
</script>

