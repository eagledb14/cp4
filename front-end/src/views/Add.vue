<template>
  <div class="Add">
    <h1 class="title">Results</h1>

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
					await axios.post('/api/creature', {
						name: this.newName,
						desc: this.newDesc,
						path: r1.data.path
					});
					this.canAdd=false;
					this.newName = "";
					this.newDesc = ""
				}
				catch (err) {
					console.log(err);
				}
			},
		},
		computer: {
			creaturesInOrder() {
				return this.creatures.sort((a,b) => {return b - a;});
			}
		}


	}

</script>


<style scoped>

.title {
	margin-top: 20px;
}

</style>


