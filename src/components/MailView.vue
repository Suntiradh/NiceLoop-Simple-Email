<template>
  <div class="email-display">
    <h2 class="mb-0">
      Subject: <strong>{{ email.subject }}</strong>
    </h2>
    <div>
      <em
        >From {{ email.emailFrom }} on
        {{ format(new Date(email.sentAt), "MMM do yyyy") }}</em
      >
    </div>
    <div>{{ email.body }}</div>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  setup() {
    return {
      format,
    };
  },
  props: {
    email: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
