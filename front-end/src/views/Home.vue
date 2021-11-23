<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>{{ word }}</h1>
    <button v-on:click="getWord">Click</button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios"

export default {
  name: 'Home',
  data() {
    return {
      word: "yes",
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    async getWord() {
      try {
        this.word = await axios.get("/api/");
      }
      catch(err) {
        console.log(err);
      }
    }
  },
  computed: {
  }
}
</script>
