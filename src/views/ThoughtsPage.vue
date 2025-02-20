<template>
  <div class="thoughts-page">
    <div class="monitor-screen">
      <div class="screen-header">
        <div class="status-lights">
          <div class="light"></div>
          <div class="light"></div>
          <div class="light"></div>
        </div>
        <div class="screen-title">星际观察终端 v3.14159</div>
      </div>

      <div class="screen-content">
        <div class="thought-entries">
          <div v-for="article in articles" 
               :key="article.id"
               class="thought-entry-wrapper">
            <router-link 
              :to="`/thoughts/${article.id}`"
              class="thought-entry">
              <div class="entry-header">
                <span class="entry-id">#{{ article.id }}</span>
                <span class="entry-date">{{ article.date }}</span>
              </div>
              <h3>{{ article.title }}</h3>
              <div class="entry-preview">{{ article.preview }}</div>
              <div class="entry-tags">
                <span v-for="tag in article.tags" 
                      :key="tag" 
                      class="tag">
                  #{{ tag }}
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="screen-footer">
        <div class="typing-effect">正在接收来自半人马座α星的数据传输...</div>
      </div>
    </div>

    <div v-if="selectedThought" class="thought-modal">
      <div class="modal-content">
        <div class="modal-header">
          <span class="entry-id">#{{ selectedThought.id }}</span>
          <span class="entry-date">{{ selectedThought.date }}</span>
        </div>
        <h2>{{ selectedThought.title }}</h2>
        <div class="thought-content">
          <p v-for="(paragraph, index) in selectedThought.content" 
             :key="index"
             class="paragraph">
            {{ paragraph }}
          </p>
        </div>
        <div class="thought-conclusion">
          <h4>结论：</h4>
          <p>{{ selectedThought.conclusion }}</p>
        </div>
        <button @click="selectedThought = null">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import articlesData from '../data/articles/index.json'

const router = useRouter()
const articles = ref(articlesData.articles)
const selectedThought = ref(null)

const selectThought = (thought) => {
  selectedThought.value = thought
}

const handleArticleClick = (article) => {
  selectThought(article)
  router.push(`/thoughts/${article.id}`)
}
</script>

<style lang="scss" scoped>
.thoughts-page {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.monitor-screen {
  width: 100%;
  max-width: 1200px;
  background: rgba(10, 15, 22, 0.9);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(126, 87, 194, 0.2);
}

.screen-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(126, 87, 194, 0.3);
  
  .status-lights {
    display: flex;
    gap: 0.5rem;
    margin-right: 1rem;
    
    .light {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent-color);
      animation: blink 2s infinite;
      
      &:nth-child(2) {
        animation-delay: 0.5s;
      }
      
      &:nth-child(3) {
        animation-delay: 1s;
      }
    }
  }
  
  .screen-title {
    color: var(--accent-color);
    font-family: 'Courier New', monospace;
    font-size: 1.2rem;
  }
}

.thought-entries {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.thought-entry-wrapper {
  text-decoration: none;
}

.thought-entry {
  background: rgba(42, 59, 76, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: var(--text-color);
  display: block;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(126, 87, 194, 0.2);
  }
  
  .entry-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    
    .entry-id {
      color: var(--accent-color);
      font-family: 'Courier New', monospace;
    }
    
    .entry-date {
      color: var(--text-color);
      opacity: 0.7;
    }
  }
  
  h3 {
    color: var(--text-color);
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  .entry-preview {
    color: var(--text-color);
    opacity: 0.8;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    line-height: 1.6;
  }
  
  .entry-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    
    .tag {
      background: rgba(126, 87, 194, 0.2);
      color: var(--accent-color);
      padding: 0.2rem 0.5rem;
      border-radius: 5px;
      font-size: 0.8rem;
    }
  }
}

.screen-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(126, 87, 194, 0.3);
  
  .typing-effect {
    color: var(--accent-color);
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    
    &::after {
      content: '|';
      animation: blink 1s infinite;
    }
  }
}

.thought-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 15, 22, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  
  .modal-content {
    background: var(--primary-color);
    padding: 2rem;
    border-radius: 15px;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      
      .entry-id {
        color: var(--accent-color);
        font-family: 'Courier New', monospace;
      }
      
      .entry-date {
        color: var(--text-color);
        opacity: 0.7;
      }
    }
    
    h2 {
      color: var(--accent-color);
      margin-bottom: 2rem;
    }
    
    .thought-content {
      margin-bottom: 2rem;
      
      .paragraph {
        color: var(--text-color);
        margin-bottom: 1rem;
        line-height: 1.8;
      }
    }
    
    .thought-conclusion {
      background: rgba(126, 87, 194, 0.1);
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      
      h4 {
        color: var(--accent-color);
        margin-bottom: 1rem;
      }
      
      p {
        color: var(--text-color);
        line-height: 1.6;
      }
    }
    
    button {
      background: var(--accent-color);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      color: white;
      cursor: pointer;
      transition: background 0.3s ease;
      
      &:hover {
        background: darken(#7e57c2, 10%);
      }
    }
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@media (max-width: 768px) {
  .thoughts-page {
    padding: 1rem;
  }

  .monitor-screen {
    padding: 1rem;
  }

  .screen-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .thought-entries {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .thought-entry {
    h3 {
      font-size: 1.1rem;
    }

    .entry-preview {
      font-size: 0.85rem;
    }
  }
}
</style> 