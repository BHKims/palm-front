<template>
    <div>
        <!-- <component :is="componentInstance"/> -->
        UserID: {{id}}
        <br>
        Hello, {{user.name}}!!
        <br>
        <br>
        <input id="image" type="file" v-on:change="image">
        <br><br>
        <button @click="request()">요청하기</button>
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
            image:[]
        }
    }
})

export default class MyPage extends Vue {
    beforeMount() {
        console.log(this.$store.state.user)
        this.$data.id = this.$route.params.id
        // this.$data.user = this.$store.state.user
        
    }

    request() {
        console.log("palm request!!");
        var file = document.getElementById('image').files[0];
        console.log(file);
        var binary = new Blob([file]);
        console.log("binary: ", binary);

        apiService.sendImage(file.name, binary).then(res => {
            
        })
    }
}
</script>


