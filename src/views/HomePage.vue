<template>
  <div class="home-page">
    <div class="stars"></div>
    <div class="spaceship" ref="spaceshipRef">
      <div class="ship-body"></div>
      <div class="ship-light"></div>
    </div>
    
    <div class="welcome-content" ref="welcomeRef">
      <h1 class="glitch-text" data-text="欢迎来到我的地球探索日志">
        欢迎来到我的地球探索日志
      </h1>
      <h2 class="alien-subtitle">
        Leon LiuZX，来自半人马座α星
      </h2>
      <p class="alien-note">
        我是一个误入地球的外星观察员，记录我的地球生活与思考。
        <span class="note-tooltip">
          注意：地球人喜欢用"欢迎"这个词，但他们的"欢迎"通常伴随着好奇的眼神和偷偷拍照的行为。
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const spaceshipRef = ref(null)
const welcomeRef = ref(null)

onMounted(() => {
  // 飞船降落动画
  gsap.from(spaceshipRef.value, {
    y: -100,
    opacity: 0,
    duration: 2,
    ease: "power2.out"
  })

  // 文字渐入动画
  gsap.from(welcomeRef.value, {
    y: 50,
    opacity: 0,
    duration: 1.5,
    delay: 1,
    ease: "power2.out"
  })
})
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.stars {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(42, 59, 76, 0.1) 0%, rgba(10, 15, 22, 0) 70%);
  z-index: -1;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(white 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.1;
  }
}

.spaceship {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 60px;

  .ship-body {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    filter: drop-shadow(0 0 10px rgba(126, 87, 194, 0.5));
  }

  .ship-light {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 20px;
    background: linear-gradient(to bottom, var(--accent-color), transparent);
    opacity: 0.5;
  }
}

.welcome-content {
  text-align: center;
  max-width: 800px;
  margin-top: 15vh;
}

.glitch-text {
  font-size: 3rem;
  font-weight: bold;
  color: var(--text-color);
  text-shadow: var(--neon-glow);
  position: relative;
  
  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    left: 2px;
    text-shadow: -2px 0 #ff00c1;
    animation: glitch-anim-1 2s infinite linear alternate-reverse;
  }

  &::after {
    left: -2px;
    text-shadow: 2px 0 #00fff9;
    animation: glitch-anim-2 3s infinite linear alternate-reverse;
  }
}

.alien-subtitle {
  font-size: 1.5rem;
  margin: 1rem 0;
  color: var(--accent-color);
  font-family: 'Courier New', monospace;
}

.alien-note {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-top: 2rem;
  position: relative;
  
  .note-tooltip {
    position: absolute;
    bottom: -80px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(126, 87, 194, 0.1);
    padding: 1rem;
    border-radius: 10px;
    font-size: 0.9rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    width: 80%;
    backdrop-filter: blur(5px);
    
    &::before {
      content: '';
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid rgba(126, 87, 194, 0.1);
    }
  }

  &:hover .note-tooltip {
    opacity: 1;
  }
}

@keyframes glitch-anim-1 {
  0% {
    clip: rect(30px, 9999px, 10px, 0);
  }
  100% {
    clip: rect(0px, 9999px, 25px, 0);
  }
}

@keyframes glitch-anim-2 {
  0% {
    clip: rect(15px, 9999px, 25px, 0);
  }
  100% {
    clip: rect(10px, 9999px, 20px, 0);
  }
}
</style> 