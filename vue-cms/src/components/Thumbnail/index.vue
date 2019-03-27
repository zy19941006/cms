<template>
    <div class="newInfo">
        <h3 class="title">{{data.title}}</h3>
        <p class="subtitle">
            <span class="mui-pull-left">发表时间:{{data.add_time | dataFonat}}</span>
            <span class="mui-pull-right">点击:{{data.click}}次</span>
        </p>
        <div class="photo">           
          <img class="preview-img" v-for="(item, index) in photo" :src="item.src" height="100" @click="$preview.open(index,photo)" :key='item.src'>
        </div>
        <div class="content" v-html="data.content">

        </div>
        <conment :id="id"></conment>
    </div>
</template>

<style lang="less">
    .newInfo{
        padding: 0 5px;
        .title{
            text-align: center;
            color:blue;
            font-size: 16px;
            font-weight: 700;
        }
        .subtitle{
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #ccc;
            }
            .content{
                font-size: 14px;
                line-height: 30px;
                color: black;
                img{
                    width: 100%;
                }
            }
            .photo{
                .preview-img{
                   width: 60px;
                   height: 60px;
                   margin-left: 10px;
                }
            }
         
    }
</style>

<script>
import conment from '../comment'
export default{
    data(){
        return{
            id:this.$route.params.id,
            data:{},
            photo:[
                {src:'http://img4.imgtn.bdimg.com/it/u=769216349,2330209463&fm=26&gp=0.jpg',
                 w: 600,
                h: 400},
                {src:'http://img2.imgtn.bdimg.com/it/u=2097124721,3074829049&fm=26&gp=0.jpg',
                 w: 600,
                 h: 400},
                {src:'http://img1.imgtn.bdimg.com/it/u=2543956022,3767105589&fm=26&gp=0.jpg',
                 w: 600,
                 h: 400},
                {src:'http://img2.imgtn.bdimg.com/it/u=2426941576,3691372484&fm=26&gp=0.jpg',
                 w: 600,
                h: 400},
                {src:'http://img0.imgtn.bdimg.com/it/u=989300716,195510164&fm=26&gp=0.jpg',
                w: 600,
                h: 400}
            ],
        }
    },
    created(){
        this.photoList()
        // this.Photos()
  
    },
    methods:{
        photoList(){
            this.$http.get("api/getimageInfo/"+this.id).then(result=>{
                if(result.body.status===0){
                    // console.log(result.body)
                    this.data=result.body.message[0]
                }
              
            })
        },
    Photos(){
          this.$http.get("api/getthumimages/"+this.id).then(result=>{
                if(result.body.status===0){
                    console.log(result.body)
                }
              
            })
    }
    },
    components:{
        conment
    }
}
    
</script>
