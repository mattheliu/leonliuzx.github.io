<template>
  <div class="experience-page">
    <div class="resume-container">
      <div class="resume-header">
        <h2>星际简历</h2>
        <div class="status-badge">
          <span class="status-dot"></span>
          当前状态：地球观察任务进行中
        </div>
      </div>

      <div class="experience-timeline">
        <div v-for="(exp, index) in experiences" 
             :key="index"
             class="experience-item"
             :class="{ 'right': index % 2 === 0 }">
          <div class="experience-content" @click="showExperienceDetail(exp)">
            <div class="exp-header">
              <span class="exp-year">{{ exp.year }}</span>
              <span class="exp-location">{{ exp.location }}</span>
            </div>
            <h3>{{ exp.title }}</h3>
            <div class="exp-description">{{ exp.description }}</div>
            <div class="exp-skills">
              <span v-for="(skill, sIndex) in exp.skills" 
                    :key="sIndex" 
                    class="skill-tag">
                {{ skill }}
              </span>
            </div>
            <div class="view-more">点击查看详情</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 经历详情弹窗 -->
    <div v-if="selectedExperience" class="experience-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ selectedExperience.title }}</h3>
          <button class="close-btn" @click="selectedExperience = null">×</button>
        </div>
        
        <div class="modal-body">
          <div class="exp-info">
            <div class="info-item">
              <span class="label">时间：</span>
              <span>{{ selectedExperience.year }}</span>
            </div>
            <div class="info-item">
              <span class="label">地点：</span>
              <span>{{ selectedExperience.location }}</span>
            </div>
          </div>

          <div class="exp-gallery">
            <div v-for="(image, index) in selectedExperience.images" 
                 :key="index"
                 class="gallery-item"
                 @click="showImage(image)">
              <img :src="image.url" :alt="image.description">
              <div class="image-overlay">
                <span>{{ image.description }}</span>
              </div>
            </div>
          </div>

          <div class="exp-details">
            <h4>详细描述</h4>
            <p v-for="(detail, index) in selectedExperience.details" 
               :key="index"
               class="detail-item">
              {{ detail }}
            </p>
          </div>

          <div class="exp-achievements">
            <h4>主要成就</h4>
            <ul>
              <li v-for="(achievement, index) in selectedExperience.achievements" 
                  :key="index">
                {{ achievement }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片查看器 -->
    <div v-if="selectedImage" class="image-viewer" @click="selectedImage = null">
      <div class="image-container">
        <img :src="selectedImage.url" :alt="selectedImage.description">
        <div class="image-description">{{ selectedImage.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import experienceData from '../data/experience.json'

const selectedExperience = ref(null)
const selectedImage = ref(null)
const experiences = ref(experienceData.experiences)

const showExperienceDetail = (experience) => {
  selectedExperience.value = experience
}

const showImage = (image) => {
  selectedImage.value = image
}
</script>

<style lang="scss" scoped>
.experience-page {
  min-height: 100vh;
  padding: 2rem;
}

.resume-container {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(10, 15, 22, 0.8);
  border-radius: 20px;
  padding: 2rem;
}

.resume-header {
  text-align: center;
  margin-bottom: 3rem;
  
  h2 {
    color: var(--accent-color);
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .status-badge {
    display: inline-flex;
    align-items: center;
    background: rgba(126, 87, 194, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    
    .status-dot {
      width: 8px;
      height: 8px;
      background: #4CAF50;
      border-radius: 50%;
      margin-right: 0.5rem;
      animation: blink 2s infinite;
    }
  }
}

.experience-timeline {
  position: relative;
  padding: 2rem 0;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: var(--accent-color);
    top: 0;
  }
}

.experience-item {
  width: 50%;
  margin-bottom: 2rem;
  padding: 0 2rem;
  
  &.right {
    margin-left: 50%;
  }
  
  .experience-content {
    background: rgba(42, 59, 76, 0.3);
    border-radius: 15px;
    padding: 1.5rem;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(126, 87, 194, 0.2);
      
      .view-more {
        opacity: 1;
      }
    }
  }
}

.exp-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  .exp-year {
    color: var(--accent-color);
    font-family: 'Courier New', monospace;
  }
  
  .exp-location {
    color: var(--text-color);
    opacity: 0.8;
  }
}

.exp-description {
  color: var(--text-color);
  margin: 1rem 0;
  line-height: 1.6;
}

.exp-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  
  .skill-tag {
    background: rgba(126, 87, 194, 0.1);
    color: var(--accent-color);
    padding: 0.2rem 0.8rem;
    border-radius: 15px;
    font-size: 0.9rem;
  }
}

.view-more {
  color: var(--accent-color);
  text-align: center;
  margin-top: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.experience-modal {
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
    border-radius: 20px;
    padding: 2rem;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    
    h3 {
      color: var(--accent-color);
    }
    
    .close-btn {
      background: none;
      border: none;
      color: var(--text-color);
      font-size: 1.5rem;
      cursor: pointer;
      
      &:hover {
        color: var(--accent-color);
      }
    }
  }
}

.exp-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  
  .info-item {
    .label {
      color: var(--accent-color);
      margin-right: 0.5rem;
    }
  }
}

.exp-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  
  .gallery-item {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    
    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .image-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(10, 15, 22, 0.8);
      padding: 0.5rem;
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }
    
    &:hover {
      img {
        transform: scale(1.1);
      }
      
      .image-overlay {
        transform: translateY(0);
      }
    }
  }
}

.exp-details, .exp-achievements {
  margin-bottom: 2rem;
  
  h4 {
    color: var(--accent-color);
    margin-bottom: 1rem;
  }
  
  .detail-item {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
  
  ul {
    list-style: none;
    padding-left: 1rem;
    
    li {
      margin-bottom: 0.5rem;
      position: relative;
      
      &::before {
        content: '•';
        color: var(--accent-color);
        position: absolute;
        left: -1rem;
      }
    }
  }
}

.image-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 15, 22, 0.98);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  cursor: pointer;
  
  .image-container {
    position: relative;
    max-width: 90%;
    max-height: 90vh;
    
    img {
      max-width: 100%;
      max-height: 90vh;
      object-fit: contain;
    }
    
    .image-description {
      position: absolute;
      bottom: -40px;
      left: 0;
      width: 100%;
      text-align: center;
      color: var(--text-color);
      padding: 1rem;
    }
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@media (max-width: 768px) {
  .experience-page {
    padding: 1rem;
  }

  .resume-container {
    padding: 1rem;
  }

  .resume-header {
    h2 {
      font-size: 2rem;
    }

    .feed-stats {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .experience-timeline {
    &::before {
      left: 0;
    }
  }

  .experience-item {
    width: 100%;
    padding-left: 2rem;
    margin-left: 0 !important;
  }

  .exp-gallery {
    grid-template-columns: 1fr;
  }

  .modal-content {
    padding: 1rem;
    margin: 1rem;
  }
}
</style> 