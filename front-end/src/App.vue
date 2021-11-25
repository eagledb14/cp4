<template>
  <div id="app">
    <div id="nav">
			<div class="nav-box">
				<h1>Creature Fighter</h1>
			</div>
      <div class="nav-box">
				<router-link to="/">Home</router-link> |
				<router-link to="/Add">Display</router-link> |
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

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  width: 100%;
	height: 50px;
	background-color: #960c0c; 
	display: flex;
	justify-content: space-around;
	align-items: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
	text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.nav-box {
	display: flex;
	align-items: center;
	height: 100%;
	padding: 0 10%;
	background-color: #677077;
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
	max-width: 400px;
	max-height: 400px;
}

.footer-container {	
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 25%;
	background-color: #960c0c;
}

.footer {
	display: flex;
	justify-content: center;
	background-color: #677077;
}

.footer-item {
	padding: 10px;
	text-decoration: none;
}

.footer-item > a {
	text-decoration: none;
}

</style>
