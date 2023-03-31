<template>
    <div v-show="!iseditmode" id="display-view">
        <h1>user profile</h1>
        <img :src="image"/>

        <span>Name : </span><b id="name">{{ name }}</b>
        <hr/>
        <span>email : </span><b id="email">{{ email }}</b>
        <hr/>
        <span>interest : </span><b id="interest">{{ interest }}</b>
        <hr/>
        <button @click="editview">Edit profile</button>
    </div>
    <div v-show="iseditmode" id="edit-view">

        <h1>user profile</h1>
        <img :src="image"/>

        <span>Name : </span>
        <input id="input-name" type="text" v-model = "name" />
        <hr/>

        <span>email : </span>
        <input id="input-email" type="text" v-model="email"/>
        <hr/>

        <span>interest : </span>
        <input id="input-interest" type="text" v-model="interest"/>
        <hr/>

        <!-- <span>Birthdate : </span>
        <input type="text" id="Birthdate">
        <hr/> -->


        <button @click="displayview">Save profile</button>
    </div>
</template>

<script>
import image from "./profile.jpeg"
export default{
    name: "App",
    data() {
        return {
            image: image,
            name : "",
            email : "",
            interest : "",
            iseditmode : false
        }
    },
    async created(){
       const userdata= await this.fetchUserProfile()
       this.name=userdata.name
       this.email=userdata.email
       this.interest=userdata.interest
    },
    methods: {
        editview(){
            this.iseditmode = true
        },
        async displayview() {
            const payload={
                name:this.name,
                email:this.email,
                interest:this.interest
            }
            const resJson = await this.updateUserProfile(payload)
            console.log(resJson)
           this.iseditmode = false    
        },
        async fetchUserProfile(){
            const res=await fetch('get-profile')
            return await res.json()
        },
        async updateUserProfile(payload){
            const res = await fetch('update-profile',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
                body: JSON.stringify(payload)
            })
            return await res.json()
        }
    }
}
</script>

<style>
img {
    width: 320px;
    height: 270px;
    display: block;
    margin-bottom: 40px;
}
div {
    width: 80%;
    margin: 40px auto;
}
hr {
    width: 50%;
    margin: 25px 0;  
}
button {
    width: 160px;
    height: 45px;
    border: 1px solid black;
    font-size: 15px;
}

input {
    width: 200px;
    padding: 5px;
    font-size: 20px;
}
button:hover{
    cursor: pointer;
    font-style: italic;
    background-color: azure;
}

.datepicker{
    margin-top: 0;
    margin-bottom: 0;
}
</style>