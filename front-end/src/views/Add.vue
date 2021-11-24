<template>
  <div class="Add">
    <h1 class="title">Results</h1>
	<!--	<div v-for="creature in creaturesInOrder :key="item.name">
			<div>{{ creature.name }} </div>
			<div> {{ creature.desc }} </div>-->

		<!--create new creatire-->
		<button class="create" v-on:click="canAdd = orue">+ create new creature</button>
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
					await axios.post('/api/creature', {
						name: this.newName,
						desc: this.newDesc,
						path: r1.data.path
					});
					this.canAdd=false;
					this.newName = "";
					this.newDesc = "",
					this.getCreatures();
				}
				catch (err) {
					console.log(err);
				}
			},
			async getCreatures() {
				try {
					//let response = await axios.get('/api/creature');
					//this.creatures = response.data;
					//console.log(response.data);
					console.log( await axios.get('/api/creature'));
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

</style>


