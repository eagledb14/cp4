<template>
  <div class="Add">
    <h1 class="title">Results</h1>
		<div class="creature" v-for="creature in creaturesInOrder" :key="creature.id">
			<div class="creature-display">
				<h2 class="creature-name">{{ creature.name }} </h2>
				<img class="creature-img" :src="creature.path"> 
				<p class="desc"> "{{ creature.desc }}" </p>
			</div>
			<div>
				<h3> Wins: {{ creature.win }}</h3>
				<h3> Losses: {{ creature.loss }}</h3>
			</div>
			<button @click="deleteCreature(creature)">X</button>
		</div>

		<!--create new creature-->
		<button class="create" v-on:click="canAdd = !canAdd; canUpdate = false">+ create new creature</button>
		<div class="form-container">
			<form class="form" v-if="canAdd" v-on:submit.prevent="addCreature()">
				<h1>Add</h1>
				<input type="text" v-model="newName" placeholder="Name">
				<textarea v-model="newDesc" placeholder="Description"></textarea>
				<input type="file" name="photo" @change="fileChanged">
				<button type= "submit">Add</button>
			</form>
		</div>


		<!--update creature
		<button class="create" @click="canUpdate = !canUpdate; canAdd = false">update creature</button>
		<div class="form-container" v-if="canUpdate">
			<form class="form" v-on:submit.prevent="updateCreature()">
				<h1>Update</h1>
				<input type="text" v-model="newName" placeholder="Name">
				<textarea v-model="newDesc" placeholder="Description"></textarea>
				<button type= "submit">Update</button>
			</form>
		</div>-->

  </div>
</template>



<script>
	import axios from 'axios'

	export default {
		name: 'Add',
		data() {
			return {
				canAdd: false,
				canUpdate: false,
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
			async updateCreature() {
				try {
					console.log('update not finished');	
				}
				catch(err) {
					console.log(err);
				}
			},
		},
		computed: {
			creaturesInOrder() {
				return this.creatures.sort((a,b) => {
					return (b.win - b.loss ) - (a.win - a.loss);
				});
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
	padding: 20px;
}

.creature-img {
	max-width: 400px;
	max-height: 400px;
}

.form-container {
	display: flex;
	justify-content: center;
}

.form {
	display: flex;
	flex-direction: column;
	width: 20%;	
}



@media only screen and (max-width:650px) {
	.form {
		width: 70%;
	}

}

</style>


