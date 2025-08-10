<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
const a1 = ref<HTMLElement | null>(null);
const a2 = ref<HTMLElement | null>(null);
const blue1 = ref<HTMLElement | null>(null);
const music = ref<HTMLElement | null>(null);
const search = ref<HTMLElement | null>(null);
let axian = "transparent";
let a2xian = "rgba(133, 130, 130, 0.397)";
document.documentElement.style.setProperty("--a2xian", a2xian);
function handledown() {
  blue1.value.className = "newclass";
  search.value.className = "search1";
  music.value.className = "music";
  if (axian == "transparent") {
    axian = "rgba(133, 130, 130, 0.397)";
    document.documentElement.style.setProperty("--axian", axian);
  }
  if (a2xian == "rgba(133, 130, 130, 0.397)") {
    a2xian = "transparent";
    document.documentElement.style.setProperty("--a2xian", a2xian);
  }
}
function handleup() {
  blue1.value.className = "blue";
  search.value.className = "search";
  music.value.className = "music1";
  if (axian == "rgba(133, 130, 130, 0.397)") {
    axian = "transparent";
    document.documentElement.style.setProperty("--axian", axian);
  }
  if (a2xian == "transparent") {
    a2xian = "rgba(133, 130, 130, 0.397)";
    document.documentElement.style.setProperty("--a2xian", a2xian);
  }
}
</script>

<template>
  <div id="back">
    <div class="tianmen15-icon">
      <img
        class="icon"
        src="https://tu.tianmen15qwq.dpdns.org/file/AgACAgUAAyEGAAScvBs8AAMhaJTD8V6j9kD5WtdijlNh_4Kc35oAAhzJMRt7kKhUJFlVQncCcpQBAAMCAANtAAM2BA.jpg"
        alt="icon"
      />
      <div class="glass"></div>
      <div>
        <div class="blue" ref="blue1"></div>
        <ul class="li">
          <li>
            <RouterLink to="/search" id="a1" ref="a1" @click="handleup">
              🔍歌曲搜索
              <div class="search" ref="search"></div>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/player" id="a2" ref="a2" @click="handledown">
              🎵播放器
              <div class="music1" ref="music"></div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div id="luyou">
    <RouterView class="luyou1"> </RouterView>
  </div>
</template>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

#back {
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(https://tu.tianmen15qwq.dpdns.org/file/AgACAgUAAyEGAAScvBs8AAMiaJTI1zEDKLMFAnu__fArG4xwJZcAAiHJMRt7kKhU_rkby78hwN4BAAMCAAN3AAM2BA.jpg);
  background-size: cover;
  background-position: center;
  z-index: -100;
}

.tianmen15-icon {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  gap: 2rem;
  height: 100vh;
}

.icon {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.6);
  transition: 0.5s ease-in-out;
}

.glass {
  box-shadow: inset 0 10px 20px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 0, 0, 0.05);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  width: 17vw;
  height: 100vh;
  background-color: rgba(240, 248, 255, 0.475);
  backdrop-filter: blur(10px);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.li {
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.li li {
  list-style: none;
}

.li li a {
  color: inherit;
  text-decoration: none;
  font-size: 1.2rem;
  line-height: 60px;
}

.li li #a1 {
  position: relative;
}

.blue {
  content: "";
  display: block;
  position: absolute;
  top: 250px;
  left: 29px;
  width: 5px;
  height: 20px;
  background-color: rgba(0, 120, 212, 1);
  backdrop-filter: blur(10px);
  border-radius: 5px;
  transition: all 0.45s cubic-bezier(0.22, 0.77, 0.44, 1.11);
}

.newclass {
  content: "";
  display: block;
  position: absolute;
  top: 325px;
  left: 29px;
  width: 5px;
  height: 20px;
  background-color: rgba(0, 120, 212, 1);
  backdrop-filter: blur(10px);
  border-radius: 5px;
  transition: all 0.45s cubic-bezier(0.22, 0.77, 0.44, 1.11);
}

.icon:hover {
  transform: rotate(180deg);
  transition: 0.5s ease-in-out;
}

@media screen and (max-width: 768px) {
  .glass {
    width: 30vw;
  }

  .icon {
    width: 60px;
    height: 60px;
  }

  .li li a {
    font-size: 1rem;
  }
}

.music {
  background-color: rgba(133, 130, 130, 0.397);
  position: absolute;
  top: 93px;
  left: 37px;
  border-radius: 10px;
  width: 94%;
  height: 17.5%;
  pointer-events: none;
  transition: 0.155s ease-in-out;
}

.search {
  display: block;
  position: absolute;
  top: -2px;
  left: -3px;
  border-radius: 10px;
  width: 120%;
  height: 120%;
  background-color: rgba(133, 130, 130, 0.397);
  transition: 0.155s ease-in-out;
}

.search1 {
  background-color: transparent;
  transition: 0.155s ease-in-out;
}

.music1 {
  background: transparent;
  transition: 0.155s ease-in-out;
}

.li li #a1:hover {
  z-index: 100;
  border-radius: 10px;
  width: 120%;
  height: 120%;
  transition: 0.155s ease-in-out;
  background-color: var(--axian);
}

.li li #a2:hover {
  z-index: 1000;
  border-radius: 10px;
  width: 120%;
  height: 120%;
  transition: 0.155s ease-in-out;
  background-color: var(--a2xian);
}

#luyou {
  position: absolute;
  left: 17vw;
  top: 0;
  height: 450%;
  width: 83%;
  background-color: rgba(240, 248, 255, 0.523);
  backdrop-filter: blur(10px);
  box-shadow: inset 0 10px 20px rgba(0, 0, 0, 0.1), 0 0 30px rgba(0, 0, 0, 0.05);
}
.luyou1 {
  height: 0%;
  width: 99.95999%;
}
</style>
