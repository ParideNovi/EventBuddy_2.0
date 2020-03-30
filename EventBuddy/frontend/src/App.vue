<!--root component, include NavbarComponent and router-view -->
<template>
  <div id="app">
    <div id="nav">
      <NavbarComponent />
    </div>
    <!-- router-view shows at "/"" the Home.Vue component -->
    <router-view />
  </div>
</template>

<script>
//global imported
import { apiService } from "./common/api.service";
import NavbarComponent from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    NavbarComponent
  },
  data() {
    return {
      userUsername: null
    };
  },
  methods: {
    //GET the username
    async setUserInfo() {
      await apiService("/api/user/").then(result => {
        this.userUsername = result.username;
        //set it in the window object
        window.localStorage.setItem("username", this.userUsername);
      });
    }
  },
  created() {
    this.setUserInfo();
  }
};
</script>

<style>
body {
  font-family: "Playfair Display", serif;
  background-color: GhostWhite;
}

.btn:focus {
  box-shadow: none !important;
}
</style>
