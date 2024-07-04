<template>
    <div>
        <the-header></the-header>
        <main class="main-content">
          <router-view></router-view>
        </main>
    </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'

export default{
  components: { TheHeader },
}

</script>

<style>
.main-content {
  padding-top: 4.2rem; /* Adjust this value if your header height changes */
}
</style>