<template>
  <div class="about-page">
    <div class="archive-room">
      <div class="specimen-wall">
        <div class="specimen" v-for="(specimen, index) in profile.specimens" 
             :key="index" 
             @click="showSpecimenDetail(specimen)">
          <div class="specimen-frame">
            <div class="specimen-content">
              <i>{{ specimen.icon }}</i>
              <span class="specimen-label">{{ specimen.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="alien-profile">
        <div class="profile-header">
          <div class="status-light"></div>
          <h2>外星档案 #{{ profile.alienId }}</h2>
        </div>
        
        <div class="profile-content">
          <div class="profile-avatar">
            <img :src="profile.avatar" alt="Avatar">
          </div>
          
          <div class="info-group">
            <label>代号</label>
            <span>{{ profile.name }}</span>
          </div>
          
          <div class="info-group">
            <label>来源</label>
            <span>{{ profile.origin }}</span>
          </div>
          
          <div class="info-group">
            <label>职业</label>
            <span>{{ profile.occupation.join('、') }}</span>
          </div>
          
          <div class="info-group">
            <label>特长</label>
            <ul>
              <li v-for="(specialty, index) in profile.specialties" 
                  :key="index">
                {{ specialty }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedSpecimen" class="specimen-modal">
      <div class="modal-content">
        <h3>{{ selectedSpecimen.name }}</h3>
        <p>{{ selectedSpecimen.description }}</p>
        <button @click="selectedSpecimen = null">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import profileData from '@/data/profile.json'

const selectedSpecimen = ref(null)
const profile = ref(profileData)

const showSpecimenDetail = (specimen) => {
  selectedSpecimen.value = specimen
}
</script>

<style lang="scss" scoped>
.about-page {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.archive-room {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  background: rgba(10, 15, 22, 0.8);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.specimen-wall {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
}

.specimen {
  aspect-ratio: 1;
  cursor: pointer;
  perspective: 1000px;
  
  .specimen-frame {
    height: 100%;
    width: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    
    &:hover {
      transform: rotateY(10deg);
    }
  }

  .specimen-content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(126, 87, 194, 0.1);
    border: 1px solid var(--accent-color);
    border-radius: 10px;
    padding: 1rem;
    
    i {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    .specimen-label {
      text-align: center;
      font-size: 0.9rem;
      color: var(--text-color);
    }
  }
}

.alien-profile {
  background: rgba(42, 59, 76, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  
  .profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    
    .status-light {
      width: 10px;
      height: 10px;
      background: #4CAF50;
      border-radius: 50%;
      margin-right: 1rem;
      animation: blink 2s infinite;
    }
    
    h2 {
      color: var(--accent-color);
      font-family: 'Courier New', monospace;
    }
  }
  
  .info-group {
    margin-bottom: 1.5rem;
    
    label {
      display: block;
      color: var(--accent-color);
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }
    
    span, li {
      color: var(--text-color);
      font-size: 1.1rem;
    }
    
    ul {
      list-style: none;
      padding: 0;
      
      li {
        margin-bottom: 0.5rem;
        padding-left: 1rem;
        position: relative;
        
        &::before {
          content: '•';
          color: var(--accent-color);
          position: absolute;
          left: 0;
        }
      }
    }
  }
}

.specimen-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 15, 22, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  
  .modal-content {
    background: var(--primary-color);
    padding: 2rem;
    border-radius: 15px;
    max-width: 500px;
    width: 90%;
    
    h3 {
      color: var(--accent-color);
      margin-bottom: 1rem;
    }
    
    p {
      color: var(--text-color);
      margin-bottom: 1.5rem;
      line-height: 1.6;
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

.profile-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--accent-color);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@media (max-width: 768px) {
  .about-page {
    padding: 1rem;
  }

  .archive-room {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }

  .specimen-wall {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .alien-profile {
    padding: 1rem;

    .profile-header {
      margin-bottom: 1.5rem;
    }

    .profile-avatar {
      width: 100px;
      height: 100px;
    }
  }

  .specimen-modal .modal-content {
    padding: 1rem;
    margin: 1rem;
  }
}
</style> 