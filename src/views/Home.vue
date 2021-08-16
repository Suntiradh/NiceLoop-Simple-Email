<template>
  <div id="home">
    <h2>Home</h2>
    <h3>Welcome to Simple Email</h3>

    <Suspense>
      <template #default>
        <EmailTable />
      </template>
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<script>
import EmailTable from "../components/EmailTable.vue"

export default {
  name: "Home",
  components: {
      EmailTable,
  }
};
</script>

<style>
</style>