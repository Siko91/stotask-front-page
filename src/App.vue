<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app clipped dark>
      <v-list dense>
        <v-list-item
          v-for="page in sideMenuRoutes"
          :key="page.path"
          :to="page.path"
          link
        >
          <v-list-item-action>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ page.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left class="blue-grey darken-4" dark elevation="15">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="pl-1">
        <v-btn @click="$router.push('/')" text class="text-h5">
          <v-img src="/images/logo-small.png" width="1em" class="mr-3"></v-img>
          STOTASK
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <div class="pt-10">
        <router-view />
      </div>
    </v-main>

    <v-footer app color="#bbbbbb">
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import router from "./router";

export default {
  name: "App",
  components: { },
  data: () => ({
    drawer: null
  }),
  computed: {
    sideMenuRoutes() {
      if (this.loggedIn) return router.sideMenuRoutes;
      else return router.sideMenuRoutesLoggedOut;
    },
    loggedIn() {
      return !!this.$store.state.user;
    }
  },
  created() {
    this.$store.dispatch("LOAD_USER");
    this.$store.dispatch("UPDATE_USER");
    // Auto-update user info every 5 minutes
    var self = this;
    setInterval(() => self.$store.dispatch("UPDATE_USER"), 5 * 60 * 1000);
  },
  methods: {
    logout() {
      this.$store.commit("SET_LOGGED_USER", null);
      this.$router.push("/");
    }
  }
};
</script>

<style scoped></style>
