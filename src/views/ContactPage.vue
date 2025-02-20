<template>
  <div class="contact-page">
    <div class="contact-container">
      <div class="contact-header">
        <h2>星际联络站</h2>
        <p class="subtitle">如果你想联系我，请通过这些星际频道：</p>
      </div>

      <div class="contact-grid">
        <a v-for="(channel, index) in channels" 
           :key="index"
           :href="channel.link"
           target="_blank"
           class="contact-card"
           @mouseenter="activeChannel = channel.name"
           @mouseleave="activeChannel = null">
          <div class="card-content">
            <div class="channel-icon" :class="{ 'active': activeChannel === channel.name }">
              <i :class="channel.icon">{{ channel.emoji }}</i>
            </div>
            <h3>{{ channel.name }}</h3>
            <p>{{ channel.description }}</p>
          </div>
          <div class="hover-effect"></div>
        </a>
      </div>

      <div class="secret-message">
        <div class="message-header">
          <span class="status-dot"></span>
          加密通信
        </div>
        <div class="message-content">
          <p class="typing-effect">正在建立星际加密通道...</p>
          <div class="binary-code">
            01001000 01100101 01101100 01101100 01101111
          </div>
        </div>
      </div>

      <div class="easter-egg" @click="toggleEasterEgg">
        <div class="egg-content" :class="{ 'revealed': isEasterEggRevealed }">
          <template v-if="isEasterEggRevealed">
            <h4>🎉 恭喜你发现了彩蛋！</h4>
            <p>这是一条来自半人马座α星的秘密信息：</p>
            <div class="alien-message">
              "在浩瀚的宇宙中，相遇就是缘分。期待与你在星际之间相见。"
            </div>
          </template>
          <template v-else>
            <div class="egg-hint">？</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeChannel = ref(null)
const isEasterEggRevealed = ref(false)

const channels = [
  {
    name: 'GitHub',
    icon: 'fab fa-github',
    emoji: '💻',
    link: 'https://github.com/mattheliu',
    description: '探索我的代码星系'
  },
  {
    name: 'Twitter',
    icon: 'fab fa-twitter',
    emoji: '🐦',
    link: 'https://twitter.com/leonliuzx',
    description: '接收我的地球观察简报'
  },
  {
    name: 'Lark',
    icon: 'fab fa-instagram',
    emoji: '📸',
    link: 'https://tqt57o2n4u5.feishu.cn/wiki/IApmwLqeNi0dx9k2HI7cAUltneh?from=from_copylink',
    description: '查看我的个人说明书'
  },
  {
    name: 'Email',
    icon: 'fas fa-envelope',
    emoji: '📧',
    link: 'mailto:leonliuzx@outlook.com',
    description: '发送星际邮件给我'
  }
]

const toggleEasterEgg = () => {
  isEasterEggRevealed.value = !isEasterEggRevealed.value
}
</script>

<style lang="scss" scoped>
.contact-page {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contact-container {
  max-width: 1200px;
  width: 100%;
  background: rgba(10, 15, 22, 0.8);
  border-radius: 20px;
  padding: 3rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 10% 10%, rgba(126, 87, 194, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 90% 90%, rgba(126, 87, 194, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
}

.contact-header {
  text-align: center;
  margin-bottom: 3rem;
  
  h2 {
    color: var(--accent-color);
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .subtitle {
    color: var(--text-color);
    font-size: 1.2rem;
    opacity: 0.8;
  }
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.contact-card {
  position: relative;
  background: rgba(42, 59, 76, 0.3);
  border-radius: 15px;
  padding: 2rem;
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    
    .hover-effect {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.1;
    }
  }
  
  .card-content {
    position: relative;
    z-index: 1;
    text-align: center;
  }
  
  .channel-icon {
    width: 60px;
    height: 60px;
    background: var(--accent-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-size: 1.5rem;
    transition: transform 0.3s ease;
    
    &.active {
      transform: rotate(360deg);
    }
  }
  
  h3 {
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--text-color);
    opacity: 0.8;
    font-size: 0.9rem;
  }
  
  .hover-effect {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, var(--accent-color) 0%, transparent 70%);
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition: transform 0.5s ease, opacity 0.5s ease;
    pointer-events: none;
  }
}

.secret-message {
  background: rgba(42, 59, 76, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  
  .message-header {
    display: flex;
    align-items: center;
    color: var(--accent-color);
    margin-bottom: 1rem;
    
    .status-dot {
      width: 8px;
      height: 8px;
      background: #4CAF50;
      border-radius: 50%;
      margin-right: 0.5rem;
      animation: blink 2s infinite;
    }
  }
  
  .message-content {
    .typing-effect {
      color: var(--text-color);
      margin-bottom: 1rem;
      
      &::after {
        content: '|';
        animation: blink 1s infinite;
      }
    }
    
    .binary-code {
      font-family: 'Courier New', monospace;
      color: var(--accent-color);
      font-size: 0.8rem;
      opacity: 0.7;
      overflow-wrap: break-word;
    }
  }
}

.easter-egg {
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  
  .egg-content {
    background: rgba(42, 59, 76, 0.3);
    border-radius: 15px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    
    &.revealed {
      background: rgba(126, 87, 194, 0.2);
      transform: scale(1.1);
    }
    
    .egg-hint {
      width: 30px;
      height: 30px;
      background: var(--accent-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-color);
      font-weight: bold;
    }
    
    h4 {
      color: var(--accent-color);
      margin-bottom: 1rem;
    }
    
    p {
      color: var(--text-color);
      margin-bottom: 0.5rem;
    }
    
    .alien-message {
      font-family: 'Courier New', monospace;
      color: var(--accent-color);
      padding: 1rem;
      border: 1px solid var(--accent-color);
      border-radius: 10px;
      margin-top: 1rem;
    }
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@media (max-width: 768px) {
  .contact-page {
    padding: 1rem;
  }

  .contact-container {
    padding: 1.5rem;
  }

  .contact-header {
    h2 {
      font-size: 2rem;
    }
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .contact-card {
    padding: 1.5rem;

    .channel-icon {
      width: 50px;
      height: 50px;
      font-size: 1.2rem;
    }
  }

  .secret-message {
    margin: 1rem 0;
  }

  .easter-egg {
    position: static;
    margin-top: 2rem;

    .egg-content {
      padding: 1rem;
    }
  }
}
</style> 