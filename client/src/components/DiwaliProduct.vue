<script setup>
function openLink() {
  window.open('https://www.carbelim.io/contact/', '_blank');
}
</script>

<template>
  <div class="MainContainer">
    <div id="container" class="row g-5">
      <div class="col-12 col-md-6 custom-col">
        <div class="background1">
          <div class="gradient-overlay"></div>
          <div class="product-card">
            <div>
              <img class="imageLogo" src="../assets/images/carbelim_logo.svg" />
            </div>
            <div>
              <h3>Carbelim Tree</h3>
              <p>Surround yourself with the power of a tree.</p>
              <button id="checkoutbtn" class="btn bg-white" @click="openLink">Checkout</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 custom-col">
        <div class="background2">
          <div class="gradient-overlay"></div>
          <div class="product-card">
            <div>
              <img class="imageLogo" src="../assets/images/carbelim_logo.svg" />
            </div>
            <div>
              <h3>Carbelim Wall Pannel</h3>
              <p>Check if there is fresh air.</p>
              <button class="btn bg-white" @click="openLink">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

.MainContainer {
  text-align: center;
  justify-content: center;
  margin: -10px;
  margin-top: 10px;
  background-color: white;
  padding: 5px 2px 0px;
  padding-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

#container {
  margin: 0;
  width: 100%;
}

.custom-col {
  margin: 5px 0;
  display: flex;
  justify-content: center;
}

.background1 {
  background: url('../assets/images/Park-with-people.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  width: 100%;
}

.background2 {
  background: url('../assets/images/Carbelim-Wall.png');
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  width: 100%;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
  pointer-events: none; /* Allow interactions with underlying elements */
  border-radius: 10px;
}

.product-card {
  margin-top: 20px;
  position: relative;
  padding: 16px;
  margin:  0px -50px;
  z-index: 1; /* Ensure the product card content is above the gradient overlay */
}

.imageLogo {
  margin-bottom: 10px;
  margin-top: 10px;
  width: 100px;
  opacity: 0.9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h3 {
  color: white;
}

p {
  color: white;
}

#checkoutbtn {
  margin-bottom: 50px;
}
@media (max-width: 600px) {
  .product-card {
    height: 280px;
    margin-top: 20px;
    position: relative;
    padding: 16px;
    margin: 0px -20px;
  }
}
</style>
