<template>
  <div id="app">
    <div id="nav">
			<div class="nav-box">
				<router-link to="/" class="header"> Creature Fighter</router-link>
			</div>
      <div class="nav-box">
				<router-link to="/">Home</router-link>
				<router-link to="/Add">Display</router-link>
				<router-link to="/Fight">Fight</router-link>
      </div>
    </div>

    <router-view/>


		<div class="footer-container">
			<div class="footer">
				<a class="footer-item" target="_blank" href="https://github.com/eagledb14/cp4">Github</a>
			</div>
		</div>

  </div>
</template>

//blue: 2B7F7F
//greenish yellow: 7CA922

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	background-color: #181A1B;
}

.header {
	font-weight: bold;
	font-size: 2em;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #181A1B;
  color: #E8E6E3;
}

#nav {
  width: 100%;
	height: 50px;
	background-color: #677077; 
	display: flex;
	justify-content: space-around;
	align-items: center;
}

#nav a {
  font-weight: bold;
	text-decoration: none;
	color: #563184;
}

#nav a.router-link-exact-active {
  color: #E8E6E3;
}

.nav-box {
	display: flex;
	width: 50%;
	justify-content: space-around;
	align-items: center;
	height: 100%;
}

button {
	font-size: 1.3em;
	padding: 5px;
	margin-top: 10px;
}

.title {
	margin-top: 20px;
}

.creature {
	display: flex;
	justify-content: space-around;
	align-items: center;
}

.creature-img {
	width: 70%;
	height: auto;
	max-width: 400px;
	max-height: 400px;
}

.footer-container {	
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 25%;
	background-color: #677077;
}

.footer {
	display: flex;
	justify-content: center;
}

.footer-item {
	padding: 10px;
	text-decoration: none;
	color: #563184;
	background-color: #E8E6E3;
}

.footer-item > a {
	text-decoration: none;
}

@media only screen and (max-width: 650px) {
	
	.header {
		font-size: 1.3em
	}

}

</style>
