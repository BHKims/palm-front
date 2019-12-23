<template>

    <div class="join">
        <div>환영합니다!</div>
        <table class="inputs">
            <tr><span>Email:</span><input v-model="id" type="text"></tr>

            <tr><span>PW:</span><input v-model="pw" type="text"></tr>

            <tr><span>name:</span><input v-model="name" type="text"></tr>

            <tr><button @click="addUser">가입하기</button></tr>
        </table>
    </div>
</template>

<script lang="ts">

import {
  Component,
  Vue
} from "nuxt-property-decorator"
import { State } from "vuex-class"
// import { Person } from "~/types";
import Card from "~/components/Card.vue"
import apiService from '../../api/api.service'
import VueRouter, {Route} from 'vue-router'

@Component({
  components: {

  },
  data: function() {
    return {
      id: '',
      pw: '',
      name: ''
    }
  }
})

export default class Join extends Vue {

    addUser() {
        let userinfo = this.$data 
        console.log('userInfo: ', userinfo)
        apiService.addUser(userinfo).then(res => {
            console.log(res);
            this.$router.push('/')
        })
    }
}
</script>

<style lang="scss" scoped>

$primary: #FFF;
$background: #4592D6;
$accent: #d34747;

*, *::before, *::after {
  box-sizing: border-box;
}

.join {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: $background;
    font-size: 24px;

    .inputs {
        position: relative;
	    padding: 5px 0;

        &::before, &::after {
            content: ' ';
            position: absolute;
            bottom: 0;
            border-bottom: 2px $primary solid;
            transition: .3s;
        }

        &::after {
            left: 50%;
            right: 50%;
            border-bottom: 2px $accent solid;
        }

        &::before, &.focus::after {
            left: 0;
            right: 0;
        }

        input[type='text'], button {
            border: 0;
            outline: 0;
            background-color: transparent;
            font-family: 'San Francisco', 'Segoe UI', 'Roboto', sans-serif;
            font-size: 1em;
            width: 100%;
            color: $primary;
        }
    }
}
</style>
