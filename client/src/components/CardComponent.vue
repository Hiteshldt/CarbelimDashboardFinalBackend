<template>
  <div class="card">
    <div class="card-header">
      <img :src="iconPath" alt="icon" class="icon"/>
      <span class="card-title">{{ name }}</span>
    </div>
    <div class="card-body">
      <transition name="value-change" mode="out-in">
        <span key="value" class="value">{{ displayedValue }} {{ unit }}</span>
      </transition>
      <div class="progress-bar">
        <div class="progress" :style="{ width: progressPercentage + '%', backgroundColor: progressColor }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import AAQI from '@/icons/AAQI.svg';
import ACo2 from '@/icons/ACo2.svg';
import AHCHO from '@/icons/AHCHO.svg';
import APM1 from '@/icons/APM1.svg';
import APM10 from '@/icons/APM10.svg';
import APM25 from '@/icons/APM25.svg';
import ATemp from '@/icons/ATemp.svg';
import ATVOC from '@/icons/ATVOC.svg';
import WPh from '@/icons/WPh.svg';
import WDo from '@/icons/WDo.svg';
import WEc from '@/icons/WPh.svg';
import WTDs from '@/icons/WTDs.svg';
import WTemp from '@/icons/WTemp.svg';
import WTurb from '@/icons/WTurb.svg';
// Import other SVGs similarly

export default {
  props: {
    name: String,
    value: {
      type: Number,
      required: true
    },
    icon: String,
    unit: String,
    low: {
      type: Number,
      required: true
    },
    mid: {
      type: Number,
      required: true
    },
    high: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      displayedValue: this.value,
      transitionTimeout: null,
    };
  },
  computed: {
    iconPath() {
      const icons = {
        AAQI,
        ACo2,
        AHCHO,
        APM1,
        APM10,
        APM25,
        ATemp,
        ATVOC,
        WPh,
        WDo,
        WEc,
        WTDs,
        WTemp,
        WTurb
        // Add other icons similarly
      };
      return icons[this.icon] || this.icon;
    },
    progressPercentage() {
      const { value, low, high } = this;
      if (value <= low) return 0;
      if (value >= high) return 100;
      return ((value - low) / (high - low)) * 100;
    },
    progressColor() {
      const { value, low, mid, high } = this;
      const interpolateColor = (startColor, endColor, factor) => {
        const result = startColor.slice();
        for (let i = 0; i < 3; i++) {
          result[i] = Math.round(result[i] + factor * (endColor[i] - startColor[i]));
        }
        return `rgb(${result.join(",")})`;
      };

      const red = [255, 0, 0];
      const yellow = [255, 255, 0];
      const green = [0, 255, 0];
      let factor;

      if (value <= mid) {
        factor = (value - low) / (mid - low);
        return interpolateColor(red, yellow, factor);
      } else {
        factor = (value - mid) / (high - mid);
        return interpolateColor(yellow, green, factor);
      }
    }
  },
  watch: {
    value(newValue) {
      clearTimeout(this.transitionTimeout);
      this.transitionTimeout = setTimeout(() => {
        this.displayedValue = newValue;
      }, 300); // Adjust the delay for a smoother transition
    }
  }
}
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease-in-out;
}
.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.icon {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}
.card-title {
  font-weight: bold;
  font-size: 1.2em;
  color: #333;
}
.value {
  font-weight: 500;
  font-size: 1.2em;
  text-align: center;
  width: 100%;
  margin-top: 10px;
}
.progress-bar {
  margin-top: 10px;
  width: 100%;
  min-width: 60px;
  background-color: #e0e0e0;
  border-radius: 5px;
  height: 12px;
}
.progress {
  height: 100%;
  border-radius: 5px;
  transition: width 0.5s ease, background-color 0.5s ease; /* Smooth animation */
}
.card-body {
  text-align: center;
  width: 100%;
}
.value-change-enter-active, .value-change-leave-active {
  transition: opacity 2s ease;
}
.value-change-enter, .value-change-leave-to /* .value-change-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
