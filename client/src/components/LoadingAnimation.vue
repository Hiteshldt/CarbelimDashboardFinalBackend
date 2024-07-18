<template>
  <transition name="fade">
    <div class="loading-overlay" v-if="isLoading">
      <div class="spinner"></div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>

<style scoped>
.loading-overlay {
  margin-top: 4.2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1f2937;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.spinner {
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite, colorchange 4s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes colorchange {
  0% { border-top-color: #3498db; }
  25% { border-top-color: #e74c3c; }
  50% { border-top-color: #f1c40f; }
  75% { border-top-color: #2ecc71; }
  100% { border-top-color: #3498db; }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

@media (max-width: 650px) {
  .loading-overlay {
    height: calc(100% - 8rem);
    margin-top: 4.2rem;
    bottom: 3.8rem;
  }
}
</style>
