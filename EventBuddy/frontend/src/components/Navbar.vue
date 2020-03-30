<template lang="html">
  <nav class="navbar navbar-expand-lg navbar-light bg-light my-navbar">
    <div class="container">
      <!--Home NavBar-->

      <!--link manage by router vue-->
      <router-link
        :to="{
          name: 'home'
        }"
        class="navbar-brand"
        >EventBuddy
      </router-link>

      <router-link
        :to="{
          name: 'home'
        }"
        class="navbar-brand"
        >DISPONIBILI
      </router-link>

      <router-link
        :to="{
          name: 'experiences'
        }"
        class="navbar-brand"
        >ESPERIENZE
      </router-link>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
    

          <li class="nav-item mx-1">
            <!--event-editor NavBar-->
            <router-link
              :to="{ name: 'event-editor' }"
              class="btn btn-success btn-sm"
              >Aggiungi Evento
            </router-link>
          </li>

          <!--profile-editor NavBar-->
          <li class="nav-item  mx-1">
            <router-link
              :to="{ name: 'profile-editor', params: { userUsername } }"
              class="btn btn-dark btn-sm"
              >{{ userUsername }}
            </router-link>
          </li>

          <li class="nav-item">
            <a class="btn btn-dark btn-sm" href="/accounts/logout/"
              >Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!--container -->
  </nav>
</template>

<script>
//how to export the component
export default {
  name: "NavbarComponent",
  data() {
    return {
      userUsername: null
    };
  },
  methods: {
    getUser() {
      this.userUsername = window.localStorage.getItem("username");
    }
  },
  created() {
    this.getUser();
  }
};
</script>

<style lang="css">
.my-navbar {
  border-bottom: 1px solid #ddd;
}

.navbar-brand {
  font-weight: bold;
  font-size: 130%;
}

.navbar-brand:hover {
  color: #ffd700 !important;
}
</style>
