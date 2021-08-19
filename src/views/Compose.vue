<template>
  <div id="compose" class="w-1/2 m-auto">
    <form class="lg:p-10 md:p-6 sm:p-2 text-left" @submit.prevent="sentEmail">
      <div>
        <label class="font-medium">Sent to:</label>
        <input
          class="
            border border-black
            hover:bg-gray-100 hover:bg-opacity-30
            w-full
            rounded-md
            block
            p-1
          "
          type="text"
          placeholder="sent to e-mail..."
          v-model="mails.emailTo"
        />
      </div>
      <div class="my-4">
        <label class="font-medium">Subject:</label>
        <input
          class="
            border border-black
            hover:bg-gray-100 hover:bg-opacity-30
            w-full
            rounded-md
            block
            p-1
          "
          type="text"
          placeholder="subject"
          v-model="mails.subject"
        />
      </div>
      <div class="h-48">
        <label class="font-medium">Body:</label>
        <textarea
          class="
            border border-black
            hover:bg-gray-100 hover:bg-opacity-30
            w-full
            rounded-md
            block
            h-40
            p-1
          "
          type="text"
          placeholder="body"
          v-model="mails.body"
        ></textarea>
      </div>
      <div class="w-full flex justify-end">
        <button
          class="border border-gray-900 bg-blue-200 hover:bg-blue-400 p-1"
          type="submit"
        >
          Send Email
        </button>
      </div>
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
