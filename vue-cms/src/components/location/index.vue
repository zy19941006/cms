<template>
    <div>
         <login :id="id"></login>
    </div>
</template>
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
