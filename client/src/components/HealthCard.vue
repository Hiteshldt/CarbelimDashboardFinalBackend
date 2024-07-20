<template>
  <div :class="['health-card', overallStatus.toLowerCase()]">
    <div class="header">
      <h3>{{ overallStatus }}</h3>
    </div>
    <div class="content">
      <ul>
        <li v-for="(value, name) in parameters" :key="name">
          <span>{{ name }}:</span>
          <span :style="{ color: getColor(value) }">{{ value }}</span>
        </li>
      </ul>
      <img :src="image" alt="Health advice image" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    overallStatus: {
      type: String,
      required: true,
    },
    parameters: {
      type: Object,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  methods: {
    getColor(value) {
      if (typeof value === 'number') {
        if (value < 50) return 'green';
        if (value < 100) return 'orange';
        return 'red';
      }
      return 'black';
    },
  },
};
</script>

<style scoped>
.health-card {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 16px;
  margin: 10px;
  width: 45%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}
.health-card:hover {
  transform: scale(1.05);
}

.header {
  background-color: #f0f0f0;
  padding: 8px;
  border-radius: 8px 8px 0 0;
  text-align: center;
  font-weight: bold;
}

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin: 8px 0;
}

img {
  max-width: 80px;
  height: auto;
}

.excellent {
  border-color: #4caf50;
  background-color: #e8f5e9;
}

.good {
  border-color: #8bc34a;
  background-color: #f1f8e9;
}

.fair {
  border-color: #ffc107;
  background-color: #fff8e1;
}

.poor {
  border-color: #ff9800;
  background-color: #fff3e0;
}

.hazardous {
  border-color: #f44336;
  background-color: #ffebee;
}

@media (max-width: 1024px) {
  .health-card {
    max-width: 45%;
  }
}

@media (max-width: 768px) {
  .health-card {
    max-width: 100%;
  }
  .content {
    flex-direction: column;
  }
}
</style>