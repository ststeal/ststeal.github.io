<template>
  <div class="alert" :class="'alert-'+type">
    <h2>{{text}}</h2>
    <hr>
    <button class="btn btn-primary" @click="$emit('onNext')">
      Continue
    </button>
  </div>
</template>

<script>
  export default {
    name: "message",
    props: ['type', 'text']
  }
</script>

<style scoped>
  .alert {
    text-align: center;
  }

  h3 {
    margin: 30px 0;
  }
</style>
