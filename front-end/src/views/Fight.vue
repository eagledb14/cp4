<template>
  <div class="Fight">
    <h1>Fight!</h1>
		
		<div class="start" v-if="!canStart">
			<button @click="startFight()">Start</button>
		</div>
		<div v-else>
			<div class="fighters">
				<div v-for="fighter in fighters" :key="fighter._id">
					<h1>{{ fighter.name }} </h1>
					<img class="creature-img" :src="fighter.path">
					<p>"{{ fighter.desc }}"</p>
				</div>
			</div>
			<button id="next" @click="startFight()">Next</button>
		</div>

		<!--diplaying rolls -->
		<div class="dice">
			<div class="roll" v-for="roll in rolls" :key="roll.id">
				<h1> {{ roll.one }} </h1>

				<div v-if="roll.one > roll.two"> <h1>&#62;</h1> </div>
				<div v-else> <h1>&#60;</h1> </div>

				<h1> {{ roll.two }} </h1>
			</div>		
		</div>

		<div v-if="canStart">
			<div class="results" v-if="winner >= 0">
				<h1 class="winner">Winner</h1>
				<h1 class="loser">Loser</h1>	
			</div>
			<div class="results" v-else-if="winner < 0">
				<h1 class="loser">Loser</h1>
				<h1 class="winner">Winner</h1>
			</div>
		</div>
		
  </div>
</template>




<script>
import axios from 'axios'

export default {
	name: "Fight",
	data() {
		return {
			creatures: [],
			canStart: false,
			fighters: [],
			rolls: [],
			winner: 0
		}
	},
	methods: {
		startFight() {
			this.pickFighters();
			this.doRolls();
			this.canStart = true;
			this.handleWin();
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
		pickFighters() {
			this.fighters = [];
			let f1 = Math.floor(Math.random() * (this.creatures.length - 1));
			let f2 = Math.floor(Math.random() * (this.creatures.length - 1));
			
			while(f2 === f1) {	
				f2 = Math.floor(Math.random() * this.creatures.length);
      } 
			this.fighters.push(this.creatures[f1]);
			this.fighters.push(this.creatures[f2]);
		},
		roll() {
			return Math.ceil(Math.random() * 6);
		},
		doRolls() {
			this.rolls = [];
			for (let i = 0; i < 3; i++) {
				let r1 = Math.trunc(this.roll() + this.fighters[0].strength);
				let r2 = Math.trunc(this.roll() + this.fighters[1].strength);

				this.rolls.push({
					id: i,
					one: r1,
					two: r2
				});
			}
		},
		handleWin() {
			this.winner = 0;
			for (let r of this.rolls) {
				if (r.one >= r.two) {
					this.winner++;
				}
				else {
					this.winner--;
				}
			}
			
			if (this.winner >= 1) {
				this.fighters[0].win++;
				this.fighters[1].loss++
			}
			else {
				this.fighters[0].loss++;
				this.fighters[1].win++;
			}

			this.updateCreature(this.fighters[0]);
			this.updateCreature(this.fighters[1]);
		},
		async updateCreature(fighter) {
			try {
				await axios.put('/api/creature/' + fighter._id, {
					name: fighter.name,
					desc: fighter.desc,
					path: fighter.path,
					strength: fighter.strength,
					win: fighter.win,
					loss: fighter.loss
				});
			}
			catch(err) {
				console.log(err);
			}
		}
	},
	created() {
		this.getCreatures();
	},
}


</script>



<style scoped>

.fighters {
  display: flex;
  justify-content: space-around;
  border-top: 3px solid #E8E6E3;
  border-bottom: 3px solid #E8E6E3;
}

.dice {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: space-around;
}

.roll {
	display: flex;
	justify-content: space-around;

}

.results {
	display: flex;
	justify-content: space-around;
}

.winner {
	color: green;
}

.loser {
	color: red;
}

</style>
