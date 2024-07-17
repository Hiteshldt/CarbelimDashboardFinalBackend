<script setup>
</script>

<template>
    <div class="maincontainer">
        <div class="background py-5 my-2">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="mx-auto text-center">
                            <img id="logoImage" src="../assets/images/carbelim_logo.svg"
                                class="mx-auto" alt="" height="60" width="60" />
                        </div>
                        <div>
                            <h2 class="py-2">Keep a track of India Air Pollution Level On “<span>AQI Air Quality App</span>"
                            </h2>
                            <p>Know what you breathe and the quality of air in your city and nearby locations. Real-time
                                AQI, map, weather & fire data, health advice with insightful & analytical dashboards.</p>
                            <div class="d-flex justify-content-center justify-content-md-start gap-3 align-items-center">
                                <img src="https://www.aqi.in/assets/rankpage/assets/img/google-play-button.png"
                                    class="app-img" alt="" />
                                <img src="https://www.aqi.in/assets/rankpage/assets/img/app-store-button.png"
                                    class="app-img" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#logoImage {
    width: 170px;
    margin-top: -30px;
    margin-bottom: 20px;
}

h2, p {
    margin-left: 20px;
}

.maincontainer {
    padding: -10px -10px;
    border-radius: 20px;
    margin: 0 9%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: url('https://www.aqi.in/assets/images/aqi_ranking_banner.jpg') no-repeat center center;
    background-size: cover;
}

.logo-img {
    height: 60px;
    width: 60px;
}

.app-img {
    width: 140px;
}

@media (max-width: 768px) {
    .maincontainer {
        margin: 0 5%;
    }
}

/* Add your custom styles here */
</style>
