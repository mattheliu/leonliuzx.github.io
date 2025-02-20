<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const sections = ref([
  { id: 'home', title: '降落地球', path: '/' },
  { id: 'about', title: '档案室', path: '/about' },
  { id: 'experience', title: '探索日志', path: '/experience' },
  { id: 'thoughts', title: '星际观察', path: '/thoughts' },
  { id: 'life', title: '外星朋友圈', path: '/life' },
  { id: 'contact', title: '星际联络', path: '/contact' }
])
</script>

<template>
  <div class="alien-explorer">
    <nav class="alien-nav">
      <router-link
        v-for="section in sections"
        :key="section.id"
        :to="section.path"
        class="nav-item"
        active-class="active"
      >
        {{ section.title }}
      </router-link>
    </nav>
    <main class="alien-content">
      <router-view v-slot="{ Component }">
        <transition name="page-transition">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style lang="scss">
:root {
  --primary-color: #2a3b4c;
  --accent-color: #7e57c2;
  --text-color: #e0e0e0;
  --background-color: #0a0f16;
  --neon-glow: 0 0 10px rgba(126, 87, 194, 0.5);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: 'Space Grotesk', sans-serif;
  overflow-x: hidden;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

.alien-explorer {
  min-height: 100vh;
  position: relative;
}

.alien-nav {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 100;
  background: rgba(10, 15, 22, 0.8);
  padding: 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  white-space: nowrap;
  max-width: 90%;
  overflow-x: auto;

  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(126, 87, 194, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--accent-color);
    border-radius: 2px;
  }

  .nav-item {
    color: var(--text-color);
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    position: relative;
    
    &:hover {
      color: var(--accent-color);
      text-shadow: var(--neon-glow);
    }

    &.active {
      background: rgba(126, 87, 194, 0.2);
      color: var(--accent-color);
    }
  }
}

.alien-content {
  padding-top: 100px;
  min-height: calc(100vh - 100px);
}

.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.5s ease;
}

.page-transition-enter-from,
.page-transition-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .alien-nav {
    top: auto;
    bottom: 20px;
    padding: 0.8rem;
    gap: 0.5rem;
    
    .nav-item {
      font-size: 0.8rem;
      padding: 0.4rem 0.8rem;
    }
  }

  .alien-content {
    padding-top: 20px;
    padding-bottom: 100px;
  }
}
</style>
