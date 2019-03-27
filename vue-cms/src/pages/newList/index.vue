<template>
    <div class="newList">
       <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in data" :key="item.id">
					<router-link :to="'/home/newInfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class="mui-ellipsis">
								<span class="mui-pull-left">发布时间:{{item.add_time | dataFonat}}</span>
								<span class="mui-pull-right">点击次数:{{item.click}}</span>
							</p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>

<style lang="less">
.newList{
	.mui-media-body{
		h1{
			font-size: 14px;
			font-weight: 700;
			.mui-ellipsis{
				span{
					color:#0094ff;
					font-size: 12px;
				}
			}
		}
	}
}
</style>

<script>
 export default{
	 data(){
		 return{
			 data:[]
		 }
	 },
	 created(){
		 this.gitNewList()
	 },
	 methods:{
		 gitNewList(){
			 this.$http.get("api/getnewslist").then(result=>{
				 if(result.body.status===0){
					 this.data=result.body.message
				 }
			 })
		 }
	 }
 }
</script>
