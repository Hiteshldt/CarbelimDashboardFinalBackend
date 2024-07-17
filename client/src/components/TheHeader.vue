<template>
  <header class="navbar">
    <div class="navbar__logo">
      <router-link to="/">
        <img src="https://i.ibb.co/ssDgtL0/Carbelim-Logo2.png" alt="Logo">
      </router-link>
    </div>
    <nav class="navbar__nav">
      <ul class="navbar__links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/graph">Graph</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <!-- <li>
          <button class="signinbtn">
            <router-link to="/signup">Sign Up</router-link>
          </button>
        </li> -->
      </ul>
    </nav>
    <div class="navbar__bottom-bar" v-if="isMobile">
      <ul class="navbar__bottom-links">
        <li><router-link to="/"><i class="fas fa-home"></i></router-link></li>
        <li><router-link to="/graph"><i class="fas fa-chart-bar"></i></router-link></li>
        <li><router-link to="/dashboard"><i class="fas fa-tachometer-alt"></i></router-link></li>
        <!-- <li><router-link to="/signup"><i class="fas fa-user"></i></router-link></li> -->
        <li><router-link to="/about"><i class="fas fa-info-circle"></i></router-link></li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    this.checkWindowSize();
    window.addEventListener('resize', this.checkWindowSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkWindowSize);
  },
  methods: {
    checkWindowSize() {
      this.isMobile = window.innerWidth <= 650;
    },
  },
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.navbar {
  font-family: Roboto;
  height: 4.2rem;
  width: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  background-color: #1f2937;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.navbar__logo img {
  margin-left: 1rem;
  height: 40px;
}

.navbar__nav {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  border-radius: 50px;
}

.navbar__links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar__links li {
  margin: 0 1rem;
}

.navbar__links a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.3s;
}

.navbar__links a:hover {
  color: #fff;
}

.navbar__bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #1f2937;
  border-top: 1px solid #374151;
  padding: 0 .4rem;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
}

.navbar__bottom-links {
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar__bottom-links li {
  margin: 0;
}

.navbar__bottom-links a {
  margin: 5px 0;
  color: #9ca3af;
  text-decoration: none;
  font-family: Roboto;
  font-size: 1.4rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 50px;
  transition: background-color 0.3s, color 0.3s;
  text-align: center;
}

.signinbtn {
  margin-top: -5px;
  background-color: #374151; /* Primary color */
  color: rgb(0, 0, 0);
  border: none;
  padding: 8px 18px;
  font-size: 16px;
  border-radius: 20px; /* Pill shape */
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease, transform 0.3s ease; /* Smooth transition for hover effect */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for modern look */
}

.signinbtn:hover {
  background-color: #526075; /* Darker shade for hover */
  transform: translateY(-2px); /* Slight lift on hover */
}

.navbar__bottom-links a:hover {
  background-color: #3e4752;
  color: #fff;
}

.navbar__bottom-links a i {
  font-size: 1.4rem; /* Ensure icons are the right size */
  color: inherit; /* Ensure icons inherit the text color */
}

@media (max-width: 650px) {
  .navbar__nav {
    display: none;
  }
}
</style>
