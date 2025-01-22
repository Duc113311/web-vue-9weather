<template>
  <div class="w-full">
    <!--  -->
    <div class="flex items-center text-left gap-2 pad-t-b">
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.167 2V4M5.09717 4.92993L6.50717 6.33993M20.167 12H22.167M19.2371 4.92993L17.8271 6.33993M16.114 12.6501C16.237 11.9046 16.1464 11.1395 15.8527 10.4433C15.5589 9.74717 15.0739 9.14847 14.454 8.71654C13.834 8.28461 13.1044 8.03711 12.3496 8.00269C11.5948 7.96827 10.8457 8.14835 10.189 8.52206M13.167 22H7.16695C6.22092 21.9998 5.29436 21.7312 4.49487 21.2255C3.69539 20.7197 3.0558 19.9975 2.65038 19.1427C2.24496 18.288 2.09035 17.3358 2.20451 16.3966C2.31867 15.4575 2.69691 14.5701 3.29531 13.8373C3.89371 13.1046 4.6877 12.5567 5.58507 12.2572C6.48244 11.9577 7.44637 11.9189 8.36489 12.1454C9.28342 12.3718 10.1188 12.8542 10.7742 13.5366C11.4295 14.2189 11.8777 15.0731 12.067 16H13.167C13.9626 16 14.7257 16.3161 15.2883 16.8787C15.8509 17.4413 16.167 18.2044 16.167 19C16.167 19.7956 15.8509 20.5587 15.2883 21.1213C14.7257 21.6839 13.9626 22 13.167 22Z"
          stroke="var(--color-icon-df)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div class="txt_medium_14">
        <span>Air quality City</span>
      </div>
    </div>
    <div class="w-full h-full overflow-hidden">
      <!--  -->
      <div class="arc-progress">
        <!-- SVG Progress Bar -->
        <svg class="progress" viewBox="0 0 120 120">
          <!-- Background Arc -->
          <path
            class="progress-bg"
            d="M20,100 A50,50 0 1,1 100,100"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <!-- Progress Arc -->
          <path
            class="progress-bar"
            d="M20,100 A50,50 0 1,1 100,100"
            fill="none"
            stroke="url(#gradient)"
            stroke-linecap="round"
            :stroke-dasharray="314"
            :stroke-dashoffset="314 - (animatedProgress / 100) * 314"
          />

          <!-- White Dot -->
          <circle
            class="progress-dot"
            :cx="dotPosition.x"
            :cy="dotPosition.y"
            r="6"
            fill="white"
            style="stroke: black; stroke-width: 2; box-shadow: 0px 0px 5px red"
          />

          <!-- Inner Thin Line with Padding -->
          <path
            class="inner-line"
            :d="innerLinePath"
            fill="none"
            stroke="white"
            stroke-width="1"
            stroke-linecap="round"
          />
          <!-- Gradient Definition -->
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#2BE26B" />
              <!-- 0-50 -->
              <stop offset="16.67%" stop-color="#F4D43F" />
              <!-- 51-100 -->
              <stop offset="33.33%" stop-color="#F3A432" />
              <!-- 101-150 -->
              <stop offset="50%" stop-color="#C74326" />
              <!-- 151-200 -->
              <stop offset="83.33%" stop-color="#C32789" />
              <!-- 201-300 -->
              <stop offset="100%" stop-color="#560D6F" />
            </linearGradient>
          </defs>
          <!-- Knob -->
        </svg>
        <!-- Text in Center -->
        <div class="progress-text">
          <p>{{ status }}</p>
          <h1>{{ progress }}</h1>
          <span>(AQI)</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "gauge-air",

  data() {
    return {
      status: "Moderate", // Status text
      animatedProgress: 100, // Progress value that will animate
      radius: 50, // Radius of the progress arc
      strokeWidth: 10, // Stroke width of the progress arc
      padding: 10, // Padding for the inner line
      centerX: 60, // Center X coordinate of the arc
      centerY: 122, // Center Y coordinate of the arc
      gapAngle: 80, // Angle for the gap at the bottom (in degrees)

      progress: 0, // Final progress value (0 to 100)
      radiusDot: 50, // Radius of the arc
      centerXDot: 60, // Center X coordinate of the arc
      centerYDot: 60, // Center Y coordinate of the arc
      strokeWidthDot: 20, // Stroke width of the progress arc
    };
  },

  computed: {
    dotPosition() {
      debugger;
      // Calculate the angle for the current progress
      const angle = Math.PI + (this.progress / 100) * Math.PI; // Start at 180° (Math.PI)

      // Correct the radius to align the dot with the arc's centerline
      const adjustedRadius = this.radiusDot - this.strokeWidthDot / 2;

      // Calculate the x and y coordinates of the dot
      return {
        x: this.centerXDot + adjustedRadius * Math.cos(angle),
        y: this.centerYDot + adjustedRadius * Math.sin(angle),
      };
    },

    innerLinePath() {
      // Calculate the radius for the dashed line with padding
      const innerRadius = this.radius - this.padding;

      // Convert gap angle to radians
      const gapRadians = (this.gapAngle * Math.PI) / 180;

      // Calculate the start and end angles for the arc
      const startAngle = Math.PI + gapRadians / 2; // Start slightly above the bottom
      const endAngle = 2 * Math.PI - gapRadians / 2; // End slightly above the bottom

      // Calculate start and end points
      const startX = this.centerX + innerRadius * Math.cos(startAngle);
      const startY = this.centerY + innerRadius * Math.sin(startAngle);
      const endX = this.centerX + innerRadius * Math.cos(endAngle);
      const endY = this.centerY + innerRadius * Math.sin(endAngle);

      // Generate the arc path with a small gap at the bottom
      return `M${startX},${startY} A${innerRadius},${innerRadius} 0 1,1 ${endX},${endY}`;
    },

    knobPosition() {
      // Convert animated progress percentage into radians
      const angle = Math.PI + (this.animatedProgress / 100) * Math.PI; // Start at 180° (Math.PI)

      // Calculate the x and y coordinates of the knob
      return {
        x: this.centerX + this.radius * Math.cos(angle),
        y: this.centerY + this.radius * Math.sin(angle),
      };
    },
  },

  mounted() {
    // Animate the progress from 0 to the target value
    const duration = 2000; // Animation duration in ms
    const fps = 60; // Frames per second
    const steps = (duration / 1000) * fps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      // this.animatedProgress = (this.progress / steps) * currentStep;

      if (currentStep >= steps) {
        clearInterval(interval); // Stop the animation when done
        // this.animatedProgress = this.progress; // Ensure it ends at the exact value
      }
    }, 1000 / fps);
  },
  methods: {},
};
</script>
<style lang="scss">
.arc-progress {
  position: relative;
  width: 100%;
  height: 100%;
}
.progress {
  width: 100%;
  height: 100%;
}
.progress-bg {
  stroke-width: 8;
}
.progress-bar {
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s ease;
}
.progress-knob {
  transition: cx 0.5s ease, cy 0.5s ease;
}
.progress-text {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
}
.progress-text h1 {
  font-size: 2rem;
  margin: 0;
}
.progress-text span {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.inner-line {
  stroke-width: 1; /* Thin white line */
  stroke-dasharray: 4; /* Dashed effect */
  opacity: 0.3; /* Slightly transparent */
}

.progress-dot {
  transition: cx 0.3s ease, cy 0.3s ease; /* Smooth movement of the dot */
}
</style>
