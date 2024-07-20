<template>
  <div class="card">
    <div class="button-container">
      <transition name="fade" mode="out-in">
        <div v-if="!confirmRemove" key="remove-button">
          <button @click="confirmRemove = true">Remove Device</button>
        </div>
        <div v-else key="confirm-buttons" class="confirm-container">
          <button @click="removeDevice">Yes</button>
          <button @click="confirmRemove = false">Cancel</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmRemove: false
    };
  },
  methods: {
    removeDevice() {
      // Commit mutations to Vuex store
      this.$store.commit('SET_DEVICE_VALIDITY', false);
      this.$store.commit('SET_DEVICE_ID', '');

      // Remove the devicevalid cookie
      document.cookie = "devicevalid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Redirect to the home page
      this.$router.push('/home');
    }
  }
};
</script>

<style scoped>

.card {
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.button-container {
  margin-top: 20px;
  text-align: center;
}

button {
  background: #ff6b6b;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  margin: 5px;
}

button:hover {
  background: #e55a5a;
  transform: scale(1.05);
}

button:focus {
  outline: none;
}

.confirm-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}

@media (max-width: 600px) {
  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  button {
    width: auto;
    padding: 15px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: scale(0.9);
}
</style>
