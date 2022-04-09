<template>
  <div class="feedback-card">
    <span>{{ userInfo.username }} on {{userInfo.userID}}</span>
    <h4>{{ userInfo.loginStatus }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.feedback-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.feedback-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
