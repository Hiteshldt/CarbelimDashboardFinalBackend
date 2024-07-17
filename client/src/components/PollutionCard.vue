<template>
  <div class="col-12 col-md-4">
    <div class="card">
      <div class="d-flex justify-content-between align-items-center py-3 ps-2">
        <div>
          <h4>{{ title }}</h4>
          <h5>{{ subtitle }}</h5>
        </div>
        <div>
          <div class="arrow-icon">
            <font-awesome-icon :icon="faChevronRight" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

defineProps({
  title: String,
  subtitle: String
})
</script>

<style scoped>
.arrow-icon {
  background-color: #2196f3;
  color: #fff;
  width: 40px;
  height: 40px;
  margin-right: -20px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
