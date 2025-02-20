<template>
  <div class="thought-detail">
    <div class="detail-container">
      <div class="detail-header">
        <router-link to="/thoughts" class="back-btn">
          <i class="fas fa-arrow-left"></i> 返回观察终端
        </router-link>
        <div class="status-lights">
          <div class="light"></div>
          <div class="light"></div>
          <div class="light"></div>
        </div>
      </div>

      <div class="terminal-window">
        <div class="terminal-header">
          <div class="article-meta">
            <span class="entry-id">#{{ articleMeta?.id }}</span>
            <span class="entry-date">{{ articleMeta?.date }}</span>
          </div>
          <div class="terminal-title">星际观察数据传输中...</div>
        </div>

        <div class="terminal-content" :class="{ 'loading': isLoading }">
          <template v-if="isLoading">
            <div class="loading-animation">
              <div class="binary-stream">
                {{ binaryStream }}
              </div>
              <div class="loading-text">正在从半人马座α星数据库加载观察报告...</div>
            </div>
          </template>

          <template v-else-if="articleContent">
            <h1>{{ articleMeta?.title }}</h1>

            <div class="article-content">
              <div v-for="(paragraph, index) in articleContent.content" 
                   :key="index"
                   class="paragraph"
                   :style="{ animationDelay: index * 0.2 + 's' }">
                {{ paragraph }}
              </div>
            </div>

            <div class="article-conclusion">
              <div class="conclusion-header">
                <i class="fas fa-star"></i>
                <h3>结论分析</h3>
              </div>
              <p>{{ articleContent.conclusion }}</p>
            </div>

            <div class="article-tags">
              <span v-for="tag in articleMeta?.tags" 
                    :key="tag" 
                    class="tag">
                #{{ tag }}
              </span>
            </div>

            <div class="related-thoughts">
              <div class="section-header">
                <i class="fas fa-link"></i>
                <h3>相关观察记录</h3>
              </div>
              <div class="related-list">
                <router-link v-for="related in relatedArticles" 
                          :key="related.id"
                          :to="'/thoughts/' + related.id"
                          class="related-item">
                  <span class="related-title">{{ related.title }}</span>
                  <span class="related-arrow">→</span>
                </router-link>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import articlesData from '../data/articles/index.json'

// 预加载所有文章
const articleModules = {
  'T-001': () => import('../assets/articles/love-behavior-analysis.md?raw'),
  'T-002': () => import('../assets/articles/milk-tea-queue.md?raw'),
  'T-003': () => import('../assets/articles/earth-internet.md?raw')
}

const route = useRoute()
const router = useRouter()

const articles = ref(articlesData.articles)
const articleMeta = computed(() => articles.value.find(a => a.id === route.params.id))
const articleContent = ref(null)
const isLoading = ref(true)
const binaryStream = ref('')

// 生成二进制流动画
const generateBinaryStream = () => {
  const binary = '01'
  let stream = ''
  for (let i = 0; i < 100; i++) {
    stream += binary[Math.floor(Math.random() * 2)]
  }
  return stream
}

// 更新二进制流
const updateBinaryStream = () => {
  binaryStream.value = generateBinaryStream()
}

onMounted(async () => {
  if (!articleMeta.value) {
    router.push('/thoughts')
    return
  }

  // 开始二进制流动画
  const streamInterval = setInterval(updateBinaryStream, 100)

  try {
    // 模拟加载延迟
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 加载文章内容
    const loadArticle = articleModules[articleMeta.value.id]
    if (!loadArticle) {
      throw new Error('Article not found')
    }

    const markdownContent = await loadArticle()
    const markdown = markdownContent.default
    
    // 解析markdown内容
    const sections = markdown.split('\n\n')
    
    // 过滤掉标题和空行，保留正文内容
    const content = sections.filter(s => !s.startsWith('#') && s.trim())
    
    // 最后一段作为结论
    const conclusion = content.pop()
    
    articleContent.value = {
      content,
      conclusion: conclusion.replace(/\*注：|\*/g, '').trim()
    }
  } catch (error) {
    console.error('Error loading article:', error)
    router.push('/thoughts')
  } finally {
    clearInterval(streamInterval)
    isLoading.value = false
  }
})

const relatedArticles = computed(() => {
  if (!articleMeta.value) return []
  return articles.value
    .filter(a => a.id !== articleMeta.value.id)
    .filter(a => a.tags.some(tag => articleMeta.value.tags.includes(tag)))
    .slice(0, 2)
})
</script>

<style lang="scss" scoped>
.thought-detail {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.detail-container {
  max-width: 800px;
  width: 100%;
  background: rgba(10, 15, 22, 0.8);
  border-radius: 20px;
  padding: 2rem;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  .back-btn {
    color: var(--accent-color);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateX(-5px);
    }
  }

  .status-lights {
    display: flex;
    gap: 0.5rem;
    
    .light {
      width: 8px;
      height: 8px;
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
}

.terminal-window {
  background: rgba(42, 59, 76, 0.3);
  border-radius: 15px;
  overflow: hidden;
  
  .terminal-header {
    background: rgba(126, 87, 194, 0.1);
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(126, 87, 194, 0.2);
    
    .article-meta {
      display: flex;
      gap: 1rem;
      
      .entry-id {
        color: var(--accent-color);
        font-family: 'Courier New', monospace;
      }
      
      .entry-date {
        color: var(--text-color);
        opacity: 0.7;
      }
    }
    
    .terminal-title {
      color: var(--accent-color);
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      
      &::after {
        content: '|';
        animation: blink 1s infinite;
      }
    }
  }
  
  .terminal-content {
    padding: 2rem;
    
    &.loading {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
    }
  }
}

.loading-animation {
  text-align: center;
  
  .binary-stream {
    font-family: 'Courier New', monospace;
    color: var(--accent-color);
    opacity: 0.5;
    margin-bottom: 2rem;
    font-size: 0.8rem;
    word-wrap: break-word;
  }
  
  .loading-text {
    color: var(--accent-color);
    font-family: 'Courier New', monospace;
    
    &::after {
      content: '|';
      animation: blink 1s infinite;
    }
  }
}

h1 {
  color: var(--text-color);
  font-size: 2rem;
  margin-bottom: 2rem;
  line-height: 1.4;
  animation: fadeIn 0.5s ease;
}

.article-content {
  margin-bottom: 3rem;
  
  .paragraph {
    color: var(--text-color);
    margin-bottom: 1.5rem;
    line-height: 1.8;
    font-size: 1.1rem;
    animation: slideIn 0.5s ease both;
  }
}

.article-conclusion {
  background: rgba(126, 87, 194, 0.1);
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  animation: fadeIn 0.5s ease 0.5s both;
  
  .conclusion-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    
    i {
      color: var(--accent-color);
    }
    
    h3 {
      color: var(--accent-color);
    }
  }
  
  p {
    color: var(--text-color);
    line-height: 1.8;
  }
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 3rem;
  animation: fadeIn 0.5s ease 0.7s both;
  
  .tag {
    background: rgba(126, 87, 194, 0.1);
    color: var(--accent-color);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    transition: background 0.3s ease;
    
    &:hover {
      background: rgba(126, 87, 194, 0.2);
    }
  }
}

.related-thoughts {
  animation: fadeIn 0.5s ease 0.9s both;
  
  .section-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    
    i {
      color: var(--accent-color);
    }
    
    h3 {
      color: var(--accent-color);
    }
  }
  
  .related-list {
    display: grid;
    gap: 1rem;
    
    .related-item {
      background: rgba(42, 59, 76, 0.3);
      padding: 1rem;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: transform 0.3s ease;
      text-decoration: none;
      
      &:hover {
        transform: translateX(5px);
        
        .related-arrow {
          transform: translateX(5px);
        }
      }
      
      .related-title {
        color: var(--text-color);
      }
      
      .related-arrow {
        color: var(--accent-color);
        transition: transform 0.3s ease;
      }
    }
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .thought-detail {
    padding: 1rem;
  }

  .detail-container {
    padding: 1rem;
  }

  .terminal-window {
    .terminal-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }

  .terminal-content {
    padding: 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .article-content {
    .paragraph {
      font-size: 1rem;
    }
  }

  .article-conclusion {
    padding: 1rem;
  }

  .related-thoughts {
    .related-item {
      padding: 0.8rem;
      font-size: 0.9rem;
    }
  }
}
</style> 