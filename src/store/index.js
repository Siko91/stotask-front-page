import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {}
});

if (window) window.$store = store;

function tryGetLocalStorageVar(variableName, parser = JSON.parse) {
  var str = localStorage[variableName];
  if (!str || str === "undefined") return undefined;
  else return parser(str);
}

export default store;
