<template>
    <div class="about-us">
      <div class="background-image">
        <img :src="backgroundImage" alt="Background">
        <div class="overlay"></div>
      </div>
      <div class="content-wrapper">
        <div class="header">
          <div class="icon-wrapper">
            <img :src="appIcon" alt="App Icon" class="app-icon">
          </div>
          <h1 class="app-name">Carbelim Dashboard</h1>
        </div>
        <div class="details">
          <h5>Comprehensive Monitoring and Control Platform for Carbelim Devices</h5>
        </div>
        <div class="contact-options">
          <a v-for="link in contactLinks" :key="link.name" :href="link.url" target="_blank">{{ link.name }}</a>
        </div>
        <div class="app-version">
          <p>Version: {{ appVersion }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        backgroundImage: require('../assets/images/Park-with-people.jpg'),
        appIcon: require('../assets/AppIcon.svg'),
        appName: 'Your App Name',
        appDescription: 'This is a detailed description of the app, explaining its features and purpose.',
        contactLinks: [
          { name: 'Media Inquiries', url: 'mailto:media@carbelim.io' },
          { name: 'Collaboration Inquiries', url: 'mailto:research@carbelim.io' },
          { name: 'Industry Inquiries', url: 'mailto:mail@carbelim.io' }
        ],
        appVersion: '1.0.0'
      };
    }
  };
  </script>
  
  <style scoped>
  
  .app-name {
    font-size: 35px;
    margin-top: -5px;
    margin-bottom: -20px;
  }
  
  .paragraph {
    margin-right: 30%;
    margin-left: 30%;
  }
  
  .about-us {
    text-align: center;
  }
  
  .background-image {
    position: relative;
    width: 100%;
    height: 250px;
  }
  
  .background-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .background-image .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .content-wrapper {
    background-color: white;
    padding: 20px;
    margin-top: -70px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;
    padding-bottom: 20px;
  }
  
  .header {
    margin-top: -110px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    position: relative;
    z-index: 2;
  }
  
  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
  }
  
  .app-icon {
    width: 120px;
    height: 120px;
  }
  
  .details {
    margin: 20px 0;
    font-size: 10px;
  }
  
  .contact-options {
    margin: 20px 0;
  }
  
  .contact-options a {
    display: inline-block;
    margin: 0 10px;
    color: #007bff;
    text-decoration: none;
  }
  
  .contact-options a:hover {
    text-decoration: underline;
  }
  
  .app-version {
    font-size: 14px;
    color: #777;
  }

  @media (max-width: 650px) { 
      .content-wrapper {
          margin-top: 50px;
      }
      .background-image img {
        width: 130%;
        height: 130%;
        object-fit: cover;
    }
    .background-image .overlay {
        width: 130%;
        height: 130%;
    }
  }
  </style>
  