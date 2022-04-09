<template>
  <h1>Feedback for Good</h1>
  <div class="feedbacks">
    <FeedbackCard
      v-for="feedback in feedbacks"
      :key="feedback.id"
      :feedback="feedback"
    />
  </div>
</template>

<script>
import FeedbackCard from "@/components/FeedbackCard";
export default {
  name: "EventList",
  components: {
    FeedbackCard,
  },
  created() {
    this.$store.dispatch("getFeedbacks");
  },
  computed: {
    feedbacks() {
      return this.$store.state.feedbacks;
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
