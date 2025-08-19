const r=`# 首页内容显示控制实现说明\r
\r
## 需求背景\r
在Vue博客项目中，我们希望某些特定的内容（如欢迎文字、滚动图标等）只在首页显示，而在其他页面不显示。\r
\r
## 实现方案\r
\r
### 1. 技术原理\r
使用Vue的条件渲染指令\`v-if\`结合Vue Router的路由信息来控制元素的显示与隐藏。\r
\r
### 2. 实现步骤\r
\r
#### 步骤一：引入路由信息\r
在App.vue文件的script部分，确保引入并使用了路由信息：\r
\r
\`\`\`javascript\r
import { useRoute } from 'vue-router';\r
\r
// 在setup中获取当前路由信息\r
const route = useRoute();\r
\`\`\`\r
\r
#### 步骤二：添加条件渲染\r
在需要控制显示的元素上添加\`v-if\`指令，判断当前路由路径：\r
\r
\`\`\`html\r
<div class="bzhi" v-if="route.path === '/home'">\r
  <span>{{ displayText }}</span>\r
  <div class="scroll-icon">\r
    <!-- 滚动图标内容 -->\r
  </div>\r
</div>\r
\`\`\`\r
\r
### 3. 核心代码说明\r
\r
#### 路由配置确认\r
在\`src/router/index.ts\`中确认首页路径配置：\r
\r
\`\`\`javascript\r
const routes = [\r
  { path: '/', redirect: '/home' },  // 根路径重定向到/home\r
  { path: '/home', name: 'home', component: home },  // 首页路径为/home\r
  // 其他路由...\r
]\r
\`\`\`\r
\r
#### 条件渲染逻辑\r
通过判断\`route.path === '/home'\`来确定当前是否在首页，从而控制元素的显示与隐藏。\r
\r
### 4. 注意事项\r
\r
1. 确保在script部分正确引入\`useRoute\`：\r
   \`\`\`javascript\r
   import { useRoute } from 'vue-router';\r
   \`\`\`\r
\r
2. 确保在setup函数中调用\`useRoute()\`：\r
   \`\`\`javascript\r
   const route = useRoute();\r
   \`\`\`\r
\r
3. 路径判断要与路由配置中的路径一致，在本项目中首页路径为\`/home\`。\r
\r
### 5. 扩展应用\r
\r
此方法可以应用于任何需要根据路由路径控制显示的场景，只需修改条件判断即可：\r
\r
\`\`\`html\r
<!-- 只在归档页面显示 -->\r
<div v-if="route.path === '/archive'">...</div>\r
\r
<!-- 只在关于页面显示 -->\r
<div v-if="route.path === '/about'">...</div>\r
\r
<!-- 在首页和归档页面都显示 -->\r
<div v-if="route.path === '/home' || route.path === '/archive'">...</div>\r
\`\`\`\r
\r
## 总结\r
通过Vue的响应式系统和Vue Router提供的路由信息，我们可以轻松实现基于路由路径的内容显示控制，为用户提供更精准的界面展示效果。`;export{r as default};
