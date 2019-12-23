<template>
    <div>
       <nav class ="container">
            <h1 class="text-center text-info">  Palm Line<br>
                <small  class="text-secondary"> -감정선, 지능선, 생명선 인식</small>
            </h1>
        <hr><br><br>
    <div class="bang">
        <section class="container-fluid" style="margin-bottom: 30px;">
                    <button type="button" class="status-btn">
                         <input id="image" class="fileSelect" type="file" v-on:change="image">
                    </button>
                    <button type="button" class="status-btn" @click="request()">
                        요청하기:<span class="text-danger">gogo</span>
                    </button>
        </section>
        <br><br>
        <div class="user">
            UserID: {{id}}
            <br>
            안녕하세요, {{user.name}} 고객님^^
        </div>
        <br><br>
        <img class="plam" alt="Awesome logo" :src="`${this.$data.logo}`" />
        <br><br><br>
        <input class= "Name" type="text" v-model="imageName">
        <br>
            <section class="container-fluid" style="margin-bottom: 30px;">
        <button type="button" class="status-btn"  @click="sendToDB()"> 사진저장하기</button>
            <button type="button" class="status-btn" @click="receive()"> 사진 결과받기</button>
            </section>
            </div>
            <hr>
            <br><br>
        </nav>
    </div>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import VueRouter, {Route} from 'vue-router'
import axios from 'axios'

import { State } from "vuex-class"
import apiService from '~/api/api.service'

@Component({
    computed: {
        // componentInstance: function() {
        //     return () => 
        //         import(`../../modules/${dir}/components/user.vue`)
        // }
    },
    data: function() {
        return {
            id: '',
            user: {},
            image:[],
            logo:'',
            imageName: ''
        }
    }
})

export default class MyPage extends Vue {
    beforeMount() {
        console.log(this.$store.state.user)
        this.$data.id = this.$route.params.id
        // this.$data.user = this.$store.state.user
        apiService.getUserById(this.$route.params.id).then(user => {
            console.log('[getUserById]: ', user)
            this.$data.user = user[0]
        })
        .catch(err => {
            alert(err);
            this.$router.push('/');
        })
    }

    sendToDB() {
        console.log('[sendToDB] Called');
        var file = document.getElementById('image').files[0];
        var binary = new Blob([file]);

        apiService.sendImageMongo(file.name, binary).then(res => {
            console.log('[sendToDB] Success: ', res);
            alert('[사진이 정상적으로 등록되었습니다.]');
        })
        .catch(err => {
            console.log(err);
            alert(err);
        })
    }

    receive() {
        console.log('[receive] Called');

        apiService.processImageMongo(this.$data.imageName).then(data => {
            this.$data.logo = data;
        })
        .catch(err => {
            console.log(err);
            alert(err);
        })
    }

    request() {
        console.log("palm request!!");
        var file = document.getElementById('image').files[0];
        console.log(file);
        var binary = new Blob([file]);

        apiService.sendImage(file.name, binary).then(data => {
            //console.log('[sendImage] data: ', data);
            this.$data.logo = data;
        })
    }
}
</script>

<style lang="scss" scoped>
.Name {
        display: block;
        margin: 0px auto;
        width : 300px;
        height : 25px;
}
.user {
    color: royalblue;
    font-size: 1.2em;
     font-weight: bold;
}
.plam {
    display: block;
    margin: 0px auto;
    padding-top: 50px;
   padding-bottom: 60px;
}
.bang {
    text-align: center;
}
.bnag1 {
    text-align: center;
}
.container-fluid {
    height: 50px;
}
.status-btn {
    height: 50px;
    width : 300px;
   text-align: center;
   padding-top: 7px;
   padding-bottom: 7px;
   padding-left:10px;
   padding-right:10px;
   z-index: 0;
   box-shadow: none!important;
   font-weight: 700;
}
button {
    -webkit-appearance: button;
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: buttontext;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: center;
    align-items: flex-start;
    cursor: default;
    background-color: buttonface;
    box-sizing: border-box;
    margin: 0em;
    font: 400 13.3333px Arial;
    border-width: 2px;
    border-style: outset;
    border-color: buttonface;
    border-image: initial;
}
h1 {
    color : #07DABD;
    text-align : center;
    font-size : 1.5em;
    margin-block-start : 0.83em;
    margin-block-end : 0.83em;
    display : block;
    margin-inline-start : 0px;
    margin-inline-end : 0px;
    font-weight: bold;
}
small {
    color : gray;
    font-size : 0.7em;
}
nav {
    color :rgb(38, 143, 143);
    padding-left : 10%;
    padding-right: 10%;
    width: 80%;
    display: block;
}
</style>
