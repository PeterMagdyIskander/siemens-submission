<template>
  <div>
    <button @click="signIn">
      {{ getLoading ? "Loading..." : (getFailed ? "Please refresh!" : "Log in") }}
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "LoginPage",
  computed: mapGetters(['getUser', 'getQuests', 'getLoading', 'getFailed', mapActions]),
  methods: {
    ...mapActions(['login']),
    signIn() {
      if (!this.getLoading) {
        this.login();
      }
    }
  },
};
</script>

<style lang="scss" scoped>
div {
  text-align: center;
  padding: 250px 0;

  button {
    all: unset;
    font-family: 'pressstart2p';
    color: #f4ee80;
    font-size: 3rem;
    text-shadow: 0 5px #a14759;
  }
}
</style>
