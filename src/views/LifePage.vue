<template>
  <div class="life-page">
    <div class="social-feed">
      <div class="feed-header">
        <h2>外星朋友圈</h2>
        <div class="feed-stats">
          <div class="stat">
            <span class="number">1,234</span>
            <span class="label">地球日观察</span>
          </div>
          <div class="stat">
            <span class="number">42</span>
            <span class="label">研究样本</span>
          </div>
          <div class="stat">
            <span class="number">7</span>
            <span class="label">星际好友</span>
          </div>
        </div>
      </div>

      <div class="posts">
        <div v-for="(post, index) in posts" 
             :key="index"
             class="post"
             :class="{ 'expanded': post.isExpanded }">
          <div class="post-header">
            <div class="post-avatar">👽</div>
            <div class="post-info">
              <div class="post-author">Leon LiuZX</div>
              <div class="post-time">{{ post.time }}</div>
            </div>
            <div class="post-location" v-if="post.location">
              📍 {{ post.location }}
            </div>
          </div>

          <div class="post-content">
            <p>{{ post.content }}</p>
            <div v-if="post.image" class="post-image">
              <img :src="post.image" :alt="post.imageAlt">
            </div>
          </div>

          <div class="post-footer">
            <div class="post-reactions">
              <button class="reaction-btn" @click="toggleReaction(post, '👍')">
                👍 {{ post.reactions.likes }}
              </button>
              <button class="reaction-btn" @click="toggleReaction(post, '🤔')">
                🤔 {{ post.reactions.thinks }}
              </button>
              <button class="reaction-btn" @click="toggleReaction(post, '👽')">
                👽 {{ post.reactions.aliens }}
              </button>
            </div>
            
            <div class="post-comments">
              <div v-for="(comment, cIndex) in post.comments" 
                   :key="cIndex"
                   class="comment">
                <span class="comment-author">{{ comment.author }}</span>
                <span class="comment-text">{{ comment.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="side-panel">
      <div class="profile-card">
        <div class="profile-header">
          <div class="profile-avatar">👽</div>
          <h3>Leon LiuZX</h3>
          <p>来自半人马座α星的地球观察员</p>
        </div>
        <div class="profile-status">
          <div class="status-item">
            <span class="status-icon">🛸</span>
            <span class="status-text">飞船能量: 87%</span>
          </div>
          <div class="status-item">
            <span class="status-icon">📡</span>
            <span class="status-text">星际信号: 良好</span>
          </div>
        </div>
      </div>

      <div class="trending-topics">
        <h4>热门话题</h4>
        <div class="topic" v-for="(topic, index) in trendingTopics" 
             :key="index">
          <span class="topic-icon">{{ topic.icon }}</span>
          <span class="topic-text">{{ topic.text }}</span>
          <span class="topic-count">{{ topic.count }}次讨论</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const posts = ref([
  {
    time: '2小时前',
    location: '地球·北京',
    content: '今天尝试了地球的"螺蛳粉"，味道像半人马座的星际燃料，但意外地上瘾。地球人的味蕾真是神奇，他们居然能把这么奇特的味道组合在一起。🍜',
    image: '/images/snail-noodles.jpg',
    imageAlt: '一碗热气腾腾的螺蛳粉',
    reactions: {
      likes: 42,
      thinks: 15,
      aliens: 7
    },
    comments: [
      {
        author: '火星来客',
        text: '建议你试试臭豆腐，那个才叫绝！'
      },
      {
        author: '木星观察者',
        text: '我们星球的能量棒跟这个比起来简直太无聊了'
      }
    ]
  },
  {
    time: '1天前',
    location: '地球·上海',
    content: '地球人发明了一种叫"抖音"的东西，我刷了整整3个地球日，差点忘记回飞船充电。这可能是一种精神控制装置，建议总部研究。📱',
    reactions: {
      likes: 89,
      thinks: 33,
      aliens: 12
    },
    comments: [
      {
        author: '半人马α星总部',
        text: '请立即提交详细报告，这个发现很重要'
      }
    ]
  },
  {
    time: '3天前',
    content: '和地球朋友讨论"外星人是否存在"，我差点暴露身份。他们说外星人一定长着大眼睛，绿皮肤，会说"地球人你好"...',
    reactions: {
      likes: 156,
      thinks: 67,
      aliens: 23
    },
    comments: [
      {
        author: '天王星特派员',
        text: '哈哈哈，他们对我们的想象还停留在上世纪'
      }
    ]
  }
])

const trendingTopics = ref([
  {
    icon: '🍜',
    text: '#地球美食探索#',
    count: 1234
  },
  {
    icon: '🤖',
    text: '#人工智能观察#',
    count: 856
  },
  {
    icon: '��',
    text: '#地球文化研究#',
    count: 567
  },
  {
    icon: '👥',
    text: '#人类行为分析#',
    count: 432
  }
])

const toggleReaction = (post, type) => {
  switch(type) {
    case '👍':
      post.reactions.likes++
      break
    case '🤔':
      post.reactions.thinks++
      break
    case '👽':
      post.reactions.aliens++
      break
  }
}
</script>

<style lang="scss" scoped>
.life-page {
  min-height: 100vh;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.social-feed {
  background: rgba(10, 15, 22, 0.8);
  border-radius: 20px;
  padding: 2rem;
  
  .feed-header {
    margin-bottom: 2rem;
    
    h2 {
      color: var(--accent-color);
      margin-bottom: 1rem;
    }
    
    .feed-stats {
      display: flex;
      gap: 2rem;
      
      .stat {
        text-align: center;
        
        .number {
          display: block;
          color: var(--text-color);
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .label {
          color: var(--accent-color);
          font-size: 0.9rem;
        }
      }
    }
  }
}

.post {
  background: rgba(42, 59, 76, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  
  .post-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    
    .post-avatar {
      width: 40px;
      height: 40px;
      background: var(--accent-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      font-size: 1.2rem;
    }
    
    .post-info {
      flex-grow: 1;
      
      .post-author {
        color: var(--text-color);
        font-weight: bold;
      }
      
      .post-time {
        color: var(--text-color);
        opacity: 0.7;
        font-size: 0.9rem;
      }
    }
    
    .post-location {
      color: var(--accent-color);
      font-size: 0.9rem;
    }
  }
  
  .post-content {
    color: var(--text-color);
    line-height: 1.6;
    margin-bottom: 1rem;
    
    .post-image {
      margin-top: 1rem;
      border-radius: 10px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: auto;
      }
    }
  }
  
  .post-footer {
    .post-reactions {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      
      .reaction-btn {
        background: rgba(126, 87, 194, 0.1);
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        color: var(--text-color);
        cursor: pointer;
        transition: background 0.3s ease;
        
        &:hover {
          background: rgba(126, 87, 194, 0.2);
        }
      }
    }
    
    .post-comments {
      .comment {
        background: rgba(10, 15, 22, 0.3);
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 0.5rem;
        
        .comment-author {
          color: var(--accent-color);
          font-weight: bold;
          margin-right: 0.5rem;
        }
        
        .comment-text {
          color: var(--text-color);
        }
      }
    }
  }
}

.side-panel {
  .profile-card {
    background: rgba(42, 59, 76, 0.3);
    border-radius: 15px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    
    .profile-header {
      text-align: center;
      margin-bottom: 1.5rem;
      
      .profile-avatar {
        width: 80px;
        height: 80px;
        background: var(--accent-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
        font-size: 2rem;
      }
      
      h3 {
        color: var(--text-color);
        margin-bottom: 0.5rem;
      }
      
      p {
        color: var(--accent-color);
        font-size: 0.9rem;
      }
    }
    
    .profile-status {
      .status-item {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        
        .status-icon {
          margin-right: 0.5rem;
        }
        
        .status-text {
          color: var(--text-color);
          font-size: 0.9rem;
        }
      }
    }
  }
  
  .trending-topics {
    background: rgba(42, 59, 76, 0.3);
    border-radius: 15px;
    padding: 1.5rem;
    
    h4 {
      color: var(--accent-color);
      margin-bottom: 1rem;
    }
    
    .topic {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      padding: 0.5rem;
      border-radius: 5px;
      transition: background 0.3s ease;
      
      &:hover {
        background: rgba(126, 87, 194, 0.1);
      }
      
      .topic-icon {
        margin-right: 0.5rem;
      }
      
      .topic-text {
        color: var(--text-color);
        flex-grow: 1;
      }
      
      .topic-count {
        color: var(--accent-color);
        font-size: 0.8rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .life-page {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1rem;
  }

  .social-feed {
    .feed-header {
      h2 {
        font-size: 2rem;
      }

      .feed-stats {
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
      }
    }
  }

  .post {
    padding: 1rem;

    .post-header {
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .post-reactions {
      flex-wrap: wrap;
    }
  }

  .side-panel {
    order: -1;
  }

  .profile-card {
    padding: 1rem;
  }

  .trending-topics {
    padding: 1rem;
  }
}
</style> 