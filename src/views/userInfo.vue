<template>
  <h1>User info</h1>
  <div class="feedbacks">
    <userInfoComponent
        :userInfo= users
    />
  </div>
</template>

<script>
import userInfoComponent from "@/components/userInfoComponent";
export default {
  name: "EventList",
  components: {
    userInfoComponent,
  },
  created() {
    this.$store.dispatch("getUsers");
  },
  computed: {
   users() {
      return this.$store.state.userInfo;
    },
  },
};
</script>

<style scoped>
.feedbacks {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
