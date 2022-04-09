<template>
  <div id="nav">
    <router-link :to="{ name: 'Login' }">Login</router-link> |
    <router-link :to="{ name: 'Home' }">Calculator</router-link> |
    <router-link :to="{ name: 'Form' }">Feedback form</router-link> |
    <router-link :to="{ name: 'FeedbackList' }">Feedback list</router-link> |
    <router-link :to="{ name: 'userInfo' }">User Info</router-link>

  </div>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2d2828;
  margin-top: 60px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

h4 {
  font-size: 20px;
}
</style>
