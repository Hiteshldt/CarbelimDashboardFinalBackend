<template>
  <div class="col-md-5 col-12">
    <div class="card air-quality-card h-100">
      <div class="card-body">
        <h2>
          Air Quality Map </h2>
        <hr size="20" width="15%"
          style="border-top: 3px solid #31b66f; height: 2px;margin-top: 7px;margin-bottom: 3px; opacity: 1;" />
        <h5>India </h5>

        <button class="btn btn-success btn-sm mt-4">View Map</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-w-background {
  background-image: url('../assets/india_map_shape_new_3.png');
  background-position: bottom;
  background-size: 100% 95px;
  background-repeat: no-repeat;
  border: none;
}

.card-w-background span {
  line-height: 15px;
  color: #5f5d5d;
  font-size: 15px;
}

.air-quality-card {
  background-image: url('../assets/air-quality-map.png');
  background-size: cover;
  border: none;
}

.air-quality-card h2 {
  font-size: 25px;
  font-weight: 600;
  padding-top: 25px;
  color: #fafbfc;
}

.air-quality-card h5 {
  font-size: 20px;
  font-weight: 500;
  color: #fafbfc;
}

.air-quality-card button {
  background-color: #31b66f;
}
</style>
