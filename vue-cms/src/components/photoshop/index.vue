<template>
  <div class="photoshop">
    <div id="slider" class="mui-slider">
		<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
			<div class="mui-scroll">
				<a :class="['mui-control-item',item.id==0 ? 'mui-active':'']" href="#item1mobile" v-for="(item) in data" :key="item.id"  @click="getPhotoshops(item.id)">
					{{item.title}}
				</a>
			</div>
		</div>
	</div>
<ul>
  <router-link v-for="item in msg" :key="item.id" class="back" :to="'/home/Thumbnail/'+item.id" tag="li">
    <img v-lazy="item.img_url">
	<div class="PhotosView">
	  <h3>{{item.title}}</h3>
	  <div class="PhotosView-b">
		{{item.zhaiyao}}
	  </div>
  	</div>
  </router-link>
</ul>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.js'
export default{
	data(){
		return{
			data:[],
			msg:[]
		}
	},
	created(){
		this.getPhotoshop()
		this.getPhotoshops(0)
	},
	mounted(){
		mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
	},
	methods:{
		getPhotoshop(){
			this.$http.get("api/getimgcategory").then(result=>{
				var title={
					title:'全部',
					id:0 
				}
				result.body.message.unshift(title)
				this.data=result.body.message	
				
			})
		},
		getPhotoshops(cateid){
			this.$http.get("api/getimages/"+cateid).then(result=>{
				if(result.body.status===0){
					console.log(result)
					this.msg=result.body.message
				}
			})
		}
	}
}
</script>

<style lang="less">
*{
  touch-action: none
}
img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.photoshop{
	ul{
		padding: 0 10px;
		.back{
		margin-bottom: 10px;
		 width: 100%;
		height: 300px;
		background-color: #ccc;
		box-shadow: 0 0 6px #999;
		position: relative;
		img{
			width: 100%;
			max-height: 300px;
		}
		.PhotosView{
			position: absolute;
			bottom: 0;
			color: #fff;
			background: rgba(0,0,0,0.5);
			h3{
				font-size: 14px;
			}
			.PhotosView-b{
				font-size: 13px;
			}
		}

	}
	}
	
}
</style>

