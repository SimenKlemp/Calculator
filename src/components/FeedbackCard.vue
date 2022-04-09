<template>
  <div class="feedback-card">
    <span>{{ feedback.name }} on {{ feedback.mail }}</span>
    <h4>{{ feedback.comment }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    feedback: {
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
