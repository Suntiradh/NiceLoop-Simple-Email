<template>
  <div id="compose">
    <form @submit.prevent="sentEmail">
      <input
        type="text"
        placeholder="sent to e-mail..."
        v-model="mails.emailTo"
      />
      <input type="text" placeholder="subject" v-model="mails.subject" />
      <input type="text" placeholder="body" v-model="mails.body" />
      <button type="submit">Send Email</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Compose",
  data() {
    return {
      mails: {},
    };
  },
  methods: {
    sentEmail() {
      this.$store.dispatch("sentEmail", {
        emailTo: this.mails.emailTo,
        subject: this.mails.subject,
        body: this.mails.body,
      });
      this.mails = {};
    },
  },
};
</script>

<style></style>
