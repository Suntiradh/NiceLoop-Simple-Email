<template>
  <div id="login" class="w-1/2 m-auto">
    <form class="lg:p-10 md:p-6 sm:p-2 text-left" @submit.prevent="login">
      <div class="my-4">
        <label class="font-medium"> Email: </label>
        <input
          class="
            border border-black
            hover:bg-gray-100 hover:bg-opacity-30
            w-full
            rounded-md
            block
            p-1
          "
          type="email"
          placeholder="Email address..."
          v-model="email"
        />
      </div>
      <div class="my-2">
        <label class="font-medium"> Password: </label>
        <input
          class="
            border border-black
            hover:bg-gray-100 hover:bg-opacity-30
            w-full
            rounded-md
            block
            p-1
          "
          type="password"
          placeholder="Password..."
          v-model="password"
        />
      </div>
      <div class="w-full flex justify-end">
        <button
          class="border border-gray-900 bg-green-200 hover:bg-green-400 p-1"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("userLogin", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style></style>
