<template>
  <div id="home" class="my-4">
    <h3 class="font-medium my-4">Welcome to Simple Email</h3>
    <EmailTable />
  </div>
</template>

<script>
import EmailTable from "../components/EmailTable.vue";

export default {
  name: "Home",
  components: {
    EmailTable,
  },
};
</script>

<style></style>
