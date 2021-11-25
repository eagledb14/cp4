<template>
  <div class="home">
	<h1 class="title">Creature Fighter</h1>

	<div class="info-holder">
	
		<div class="desc">
			<div class="image-pair">
				<p>Does your creature have what it takes to take on the best? upload your creature and see how it does</p>
				<img src="https://images.unsplash.com/photo-1561084746-f360502e5abe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80">
			</div>
			<div class="image-pair">
				<img src="https://images.unsplash.com/photo-1615798763618-183906cd14b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80">
				<p>Or will it fall behind the biggest and the best?</p>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios"

export default {
  name: 'Home',
  data() {
    return {
      word: "yes",
    }
  },
  methods: {
    async getWord() {
      try {
        let response = await axios.get("/api/");
        this.word = response.data;
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


<style scoped>

.info-holder {
	display: flex;
	justify-content: center;
	margin-top: 30px;
	flex-wrap: wrap;
}

.info-holder  img {
	max-width: 400px;
	max-height: 400px;
}

.desc {
	width:50%;
}

.image-pair {
	display: flex;
	justify-content: space-between;
	align-items: center;
}


</style>
