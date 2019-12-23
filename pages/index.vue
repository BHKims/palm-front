<template>
  <section>
    <h1 class="header">
      <img class="markImg" src="../static/hand.gif" alt="HANDGIF">
      <span>손금 인식</span>
    </h1>
    <head>
      <script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
    </head>
    <div class="body">
      <!-- <Card v-for="person in people" :key="person.id" :person="person"
      ></Card> -->
      <div class="description">
        <span>김병훈과 방진호의 손금 찾아주는 마술!</span>
      </div>

      <table class='login'>
        <tbody>
        <tr class="id">
          <td>ID: </td>
          <td><input v-model="id" type="text"></td>
        </tr>
        <tr class="pw">
          <td>PW: </td>
          <td><input v-model="pw" type="text"></td>
          <td><button @click="login(id, pw)">LogIN</button></td>
        </tr>
        <tr class="join">
          <td></td>
          <td><button @click="join">회원가입</button></td>
        </tr>
        </tbody>
      </table>
      <br><br><br>
      <!-- <a id="kakao-login-btn" class="kakaobutton"></a>
      <a href="http://developers.kakao.com/logout"></a> -->
      <br><br>
      <button class="users" @click="getUsers">get Users!</button>
      <br><br>
      <div v-for="user in users" :key="user._id">
        <div>name: {{user.name}}</div>
        <div>_id: {{user._id}}</div>
        <br>
      </div>
    </div>
  </section>
</template>

<script lang="ts">

import {
  Component,
  Vue
} from "nuxt-property-decorator"
import { State } from "vuex-class"
// import { Person } from "~/types";
import Card from "~/components/Card.vue"
import apiService from '../api/api.service'
import VueRouter, {Route} from 'vue-router'

@Component({
  components: {
    Card
  },
  data: function() {
    return {
      users: [],
      id: '',
      pw: ''
    }
  }
})

export default class Main extends Vue {

  $router: VueRouter

  login() {
    console.log('[LOGIN]');
    this.$router.push(`/user/kakao`);
  }

  mounted() {
    // let Kakao = document.createElement('script')
    // Kakao.setAttribute('src', "https://developers.kakao.com/sdk/js/kakao.min.js")
    // document.head.appendChild(Kakao)

    // Kakao.init('a7cb73efbac3d1faad0d1d6632ac9867'); 
    // Kakao.Auth.createLoginButton({
    //   container: '#kakao-login-btn',
    //   success: function(authObj) {
    //     console.log(JSON.stringify(authObj));
    //     // https://kauth.kakao.com/oauth/token
    //     console.log('KAKAO LOGIN');
    //     login();

    //   },
    //   fail: function(err) {
    //     console.log("KAKAO FAILED");
    //     alert(JSON.stringify(err));
    //   }
    // })

    apiService.checkToken().then(user => {
      if(user.length != 0) {
        console.log('Token Still Available');
        this.$router.push(`/user/${user[0]._id}`);
      }
    })

    console.log('store: ', this.$store.state);
  }
  // @State people: Person
  getUsers() {
    apiService.getUsers().then(res => {
      console.log(res);
      this.$data.users = res;
    })
  }

  login(id, pw) {
    apiService.isUser(id, pw).then(data => {
      console.log('data: ', data);
      if(data.user.length != 0) {
        console.log('Login Success!!');

        this.$store.commit('setUser', data.user);
        this.$store.commit('setToken', data.token);

        

        this.$router.push(`/user/${data.user[0]._id}`);
      } else {
        alert('정식 회원이 아닙니다!!');
      }
    })
  }

  join() {
    this.$router.push(`/join`);
  }

}
</script>

<style lang="scss" scoped>

.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin: auto;
  width:50%;
  padding: 10px;
  text-align: center;
}

.kakaobutton{
  margin-left: 150px;
  margin-top: 100px;
}

.markImg {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    height: 200px;
    width: 200px;
    font-size: 12px;
}

.body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
  max-width: 38em;
  margin: auto;
  padding: 13px;
  margin-top: 15px;
  .description {
    display: block;
    margin-left: auto;
    margin-right: auto;
    font-size: 15px;
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
  }
  .login {
    margin-top:50px;
    text-align: center;
    border: 0;
    width: 30%;
    padding-left: 30%;
    .join {
      width: 100%;
    }
  }

}

.users {
  background-color: royalblue;
  border: none;
  color: white;
  
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
