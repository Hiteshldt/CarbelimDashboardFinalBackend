<template>
    <div class="login-container">
      <div class="image-container">
        <img src="https://ucarecdn.com/0a117933-7fee-4a91-ab0d-654c14b55739/BannerLoginPage.svg" alt="Login Graphic" />
        <div class="login-box">
          <h2>Sign Up</h2>
          <div class="input-group">
            <i class="fas fa-envelope"></i>
            <input type="name" placeholder="Name" v-model="name" />
          </div>
          <div class="input-group">
            <i class="fas fa-envelope"></i>
            <input type="email" placeholder="Email" v-model="email" />
          </div>
          <div class="input-group">
            <i class="fas fa-home"></i>
            <input type="text" placeholder="Device Id" v-model="deviceId" />
          </div>
          <div class="input-group">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="Password" v-model="password" />
          </div>
          <button @click="submitForm">Sign Up</button>
          <p class="signup-prompt">Already have an account? <router-link to="/signin">sign in</router-link></p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
        return{
            name: '',
            email: '',
            password: '',
            deviceId: '',
        };
    },
    methods: {
      
    }
  };

  </script>
  
  <style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 65vh;
  }
  
  .image-container {
    margin-top: 25vh;
    position: relative;
    width: 600px;
    height: 600px;
  }
  
  .image-container img {
    width: 90%;
    height: 90%;
    object-fit: contain;
  }
  
  .login-box {
    font-family: Roboto;
    position: absolute;
    right: 20px;
    top: 40px;
    width: 280px;
    padding: 20px;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    opacity: 0.98;
  }
  
  .login-box h2 {
    margin-bottom: 20px;
    font-size: 28px;
    color: #333;
  }
  
  .input-group {
    font-size: 16px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .input-group i {
    font-size: 18px;
    margin-right: 10px;
    color: #999;
  }
  
  .input-group input {
    align-items: start;
    font-size: 18px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #304057;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 18px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .signup-prompt {
    margin-top: 15px;
    text-align: center;
    font-size: 16px;
  }
  
  .signup-prompt a {
    color: #007bff;
    text-decoration: none;
  }
  
  .signup-prompt a:hover {
    text-decoration: underline;
  }

  </style>
  