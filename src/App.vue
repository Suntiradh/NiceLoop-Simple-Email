<template>
  <div id="nav">
    <div v-if="this.$store.state.user !== null">
      <strong>logged in</strong>
    </div>
    <router-link to="/">Home</router-link> |
    <span v-if="!this.$store.state.user">
      <router-link to="/login">Login</router-link>
    </span>
    <span v-if="this.$store.state.user">
    <router-link to="/compose">Compose</router-link> |
    </span>
    <button
      v-if="this.$store.state.user !== null"
      class="border border-gray-900 bg-red-200 hover:bg-red-400 p-1"
      @click="userLogOut"
    >
      Logout
    </button>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    userLogOut() {
      this.$store.dispatch("userSignOut");
    },
  },
};
</script>
<style>
body {
  @apply bg-gradient-to-r from-green-100 to-blue-200;
}
#app {
  @apply font-serif text-center antialiased grayscale;
}
#nav {
  @apply p-10;
}
#nav a {
  @apply font-extrabold  text-gray-600;
}
#nav a.router-link-exact-active {
  @apply font-extrabold text-red-300;
}
/* Global Styles */
button {
  @apply text-base p-2 border rounded-xl m-2 cursor-pointer;
}
button:disabled {
  @apply cursor-auto;
}
.clickable {
  @apply cursor-pointer;
}
input[type="checkbox"] {
  @apply appearance-none cursor-pointer w-4 h-4 bg-white border rounded-sm border-solid relative align-middle p-2;
}
input[type="checkbox"].partial-check {
  @apply bg-gray-600;
}
input[type="checkbox"]:checked {
  @apply bg-red-400;
}
/* Modal */
.modal,
.overlay {
  @apply w-full h-full fixed left-0 top-0;
}
.overlay {
  @apply bg-black opacity-40;
}
.modal-card {
  @apply relative max-w-3xl m-auto mt-6 p-6 bg-white min-h-screen z-10 opacity-100;
}
/* Email Modal */
.email-display {
  @apply text-left;
}
/* Mail Table */
.mail-table {
  @apply max-w-3xl m-auto border border-collapse;
}
.mail-table tr.read {
  @apply bg-gray-400;
}
.mail-table tr.unread {
  @apply bg-white;
}
.mail-table tr {
  @apply h-20;
}
.mail-table td {
  @apply border-b-2 border-black p-2 text-left;
}
.mail-table tr:first-of-type td {
  @apply border-t-2 border-black;
}
.mail-table td p {
  @apply max-h-8 overflow-y-hidden m-auto;
}
.mail-table td.date {
  @apply w-40;
}
</style>
