<template>
  <div class="col-md-7 col-12">
    <div class="card card-w-background h-100">
      <div class="card-body">
        <h5 class="card-title"><b>India Air Quality Index (AQI)</b></h5>
        <p class="card-text">Real-time PM2.5, PM10 air pollution level in </p>
        <div class="row g-3">
          <div class="col-12 col-lg-6 d-grid justify-content-between">
            <span class="m-0">Last Updated: 14 Jul 2024, 11:32am</span>
            <div class="d-lg-flex align-items-center d-none">
              <button href="#" class="btn btn-warning text-white rounded-5 px-4 btn-sm"
                style="background-color:#d4cc0f; border-color: #d4cc0f;">MODERATE</button>
            </div>
          </div>
          <div class="col-12 col-lg-6 d-flex justify-content-center align-items-end">
            <div>
              <h1 class="" style="color: rgb(212, 204, 15); font-size: 50px;">
                86 </h1>
              <p>(AQI-US)</p>
            </div>
            <img id="mascotImg" src="../assets/Mascot.png" alt="moderate" class="img-fluid mb-3" width="63" />
          </div>
          <div class="d-flex align-items-center justify-content-center mt-3 d-lg-none">
            <button href="#" class="btn btn-warning text-white rounded-5 px-4 btn-sm"
              style="background-color:#d4cc0f; border-color: #d4cc0f;">MODERATE</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
#mascotImg {
  margin-left: 20px;
  width: 100px;
}

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
