<template>
  <div class="calculationLog-Container">
    <ul id="liste">
      <li v-for="calculations in equationInfo" :key="calculations">
        {{ calculations }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Log",
  props: {
    equationInfo:{
      type: Array
    },
  },
};
</script>

<style scoped></style>
