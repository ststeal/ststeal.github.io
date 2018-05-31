<template>
  <div class="alert alert-secondary">
    <h3>Are you ready?</h3>
    <button class="btn btn-success" @click = "$emit('onStart')">
      Start
    </button>
  </div>
</template>

<script>
  export default {
    methods: {
      some(){
        console.log(1);
      }
    },
    name: "start-screen"
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
