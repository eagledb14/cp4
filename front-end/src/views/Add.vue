<template>
  <div class="Add">
    <h1 class="title">Results</h1>
		<div class="creature" v-for="creature in creaturesInOrder" :key="creature.id">
			<div class="creature-display">
				<h2 class="creature-name">{{ creature.name }} </h2>
				<img class="creature-img" :src="creature.path"> 
				<p class="desc"> "{{ creature.desc }}" </p>
			</div>
				<button @click="deleteCreature(creature)">X</button>
		</div>

		<!--create new creatire-->
		<button class="create" v-on:click="canAdd = true">+ create new creature</button>
		<form v-if="canAdd" v-on:submit.prevent="addCreature()">
			<input type="text" v-model="newName" placeholder="name">
			<textarea v-model="newDesc" placeholder="Description"></textarea>
			<input type="file" name="photo" @change="fileChanged">
			<button type= "submit">Add</button>
		</form>
  </div>
</template>



<script>
	import axios from 'axios'

	export default {
		name: 'Add',
		data() {
			return {
				canAdd: false,
				creatures: [],
				file: null,
				newName: "",
				newDesc: ""	
			}
		},
		methods: {
			fileChanged(event) {
				this.file = event.target.files[0];
			},
			async addCreature() {
				try {
					const formData = new FormData();
					formData.append('photo', this.file, this.file.name);
					let r1 = await axios.post('/api/photo', formData);
					let r2 = await axios.post('/api/creature', {
						name: this.newName,
						desc: this.newDesc,
						path: r1.data.path
					});
					this.canAdd=false;
					this.newName = "";
					this.newDesc = "",
					//this.getCreatures();
					this.creatures.push(r2.data);
				}
				catch (err) {
					console.log(err);
				}
			},
			async getCreatures() {
				try {
					let response = await axios.get('/api/creature');
					this.creatures = response.data;
				}
				catch(err) {
					console.log(err);
				}
			},
			async deleteCreature(creature) {
				try {
					await axios.delete('/api/creature/' + creature._id);
					this.getCreatures();
				}
				catch(err) {
					console.log(err);
				}	
			},	
		},
		computed: {
			creaturesInOrder() {
				//return this.creatures.sort((a,b) => {return (b.win - b.loss ) - (a.win - a.loss);});
				return this.creatures;
			}
		},
		created() {
			this.getCreatures();
		}
	}

</script>


<style scoped>

.title {
	margin-top: 20px;
}

.creature {
	display: flex;
	justify-content: space-around;
	align-items: center;
}

.creature-img {
	max-width: 400px;
	max-height: 400px;
}

</style>


