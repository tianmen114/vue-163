const n=`# Vue3 博客首页打字机效果实现教程\r
\r
在博客首页加一个 **打字机效果（Typing Effect）** 可以让页面更有动态感。下面介绍两种实现方式：\r
\r
---\r
\r
## 方法一：使用第三方库 \`typed.js\`（推荐）\r
\r
### 1. 安装\r
在项目根目录执行：\r
\`\`\`bash\r
npm install typed.js\r
\`\`\`\r
\r
### 2. 新建一个组件\r
\r
\`\`\`vue\r
<template>\r
  <h1 ref="typing"></h1>\r
</template>\r
\r
<script setup>\r
import { ref, onMounted, onBeforeUnmount } from "vue";\r
import Typed from "typed.js";\r
\r
const typing = ref(null); // 绑定 h1 标签\r
let typed = null;         // 保存 typed.js 实例\r
\r
onMounted(() => {\r
  typed = new Typed(typing.value, {\r
    strings: ["欢迎来到我的博客 ✨", "记录学习与生活 💻", "天门的个人空间 🌸"],\r
    typeSpeed: 80,     // 打字速度\r
    backSpeed: 50,     // 删除速度\r
    backDelay: 1500,   // 停顿时间\r
    loop: true         // 是否循环\r
  });\r
});\r
\r
onBeforeUnmount(() => {\r
  if (typed) {\r
    typed.destroy(); // 销毁实例，避免内存泄漏\r
  }\r
});\r
<\/script>\r
\`\`\`\r
\r
### 3. 更多配置选项\r
\r
\`typed.js\` 提供了丰富的配置选项，可以根据需要进行自定义：\r
\r
- \`startDelay\`: 延迟开始打字（毫秒）\r
- \`smartBackspace\`: 智能退格，只删除不匹配的部分\r
- \`shuffle\`: 随机打乱字符串数组\r
- \`fadeOut\`: 打字完成后淡出效果\r
- \`contentType\`: 内容类型，可以是 'html' 或 'text'\r
\r
示例：\r
\`\`\`javascript\r
const options = {\r
  strings: ["欢迎来到我的博客 ✨", "记录学习与生活 💻", "天门的个人空间 🌸"],\r
  typeSpeed: 80,\r
  backSpeed: 50,\r
  backDelay: 1500,\r
  loop: true,\r
  startDelay: 1000,      // 延迟1秒开始\r
  smartBackspace: true,  // 智能退格\r
  shuffle: false,        // 不随机打乱\r
  fadeOut: false,        // 不淡出\r
  contentType: 'html'    // 内容类型\r
};\r
\`\`\`\r
\r
### 代码解释\r
\r
1. \`ref("typing")\`：创建一个响应式引用，用于绑定DOM元素\r
2. \`onMounted\`：在组件挂载后初始化typed.js实例\r
3. \`Typed\`构造函数参数：\r
   - 第一个参数是要绑定的DOM元素\r
   - 第二个参数是配置对象，包含：\r
     - \`strings\`：要循环显示的文本数组\r
     - \`typeSpeed\`：打字速度（毫秒/字符）\r
     - \`backSpeed\`：删除速度（毫秒/字符）\r
     - \`backDelay\`：删除前的停顿时间（毫秒）\r
     - \`loop\`：是否循环播放\r
4. \`onBeforeUnmount\`：在组件卸载前销毁typed.js实例，防止内存泄漏\r
\r
### 错误处理\r
\r
在使用 \`typed.js\` 时，需要注意以下几点：\r
\r
1. 确保在组件卸载前销毁实例，防止内存泄漏。\r
2. 如果从网络加载字符串，需要处理网络错误。\r
3. 确保 DOM 元素在初始化时已经存在。\r
\r
### 可访问性\r
\r
为了使打字效果对屏幕阅读器友好，可以考虑以下几点：\r
\r
1. 为包含打字效果的元素添加 \`aria-label\` 属性，提供静态文本描述。\r
2. 使用 \`aria-live\` 属性来通知屏幕阅读器内容的动态变化。\r
\r
### SEO\r
\r
为了确保打字效果中的文本对搜索引擎可见，可以考虑以下几点：\r
\r
1. 在 HTML 中直接包含文本内容，然后使用 JavaScript 来实现打字效果。\r
2. 使用 \`<noscript>\` 标签为不支持 JavaScript 的用户提供替代内容。\r
\r
---\r
\r
## 方法二：纯 Vue3 实现（不用库）\r
\r
### 1. 新建 Typing.vue\r
\r
\`\`\`vue\r
<template>\r
  <h1>{{ displayText }}<span class="cursor">|</span></h1>\r
</template>\r
\r
<script setup>\r
import { ref, onMounted, onBeforeUnmount } from "vue";\r
\r
const texts = ["欢迎来到我的博客 ✨", "记录学习与生活 💻", "天门的个人空间 🌸"];\r
const displayText = ref("");\r
let index = 0;         // 当前是第几句\r
let charIndex = 0;     // 当前打到第几个字\r
let isDeleting = false;\r
let animationFrameId = null; // 用于存储 requestAnimationFrame 的 ID\r
\r
function type() {\r
  const current = texts[index];\r
  \r
  if (!isDeleting && charIndex < current.length) {\r
    // 正在打字\r
    displayText.value = current.substring(0, charIndex + 1);\r
    charIndex++;\r
    animationFrameId = requestAnimationFrame(type);\r
  } else if (isDeleting && charIndex > 0) {\r
    // 正在删除\r
    displayText.value = current.substring(0, charIndex - 1);\r
    charIndex--;\r
    animationFrameId = requestAnimationFrame(type);\r
  } else {\r
    // 打完或删完\r
    if (!isDeleting) {\r
      isDeleting = true;\r
      setTimeout(() => {\r
        animationFrameId = requestAnimationFrame(type);\r
      }, 1000); // 停顿再删\r
    } else {\r
      isDeleting = false;\r
      index = (index + 1) % texts.length;\r
      setTimeout(() => {\r
        animationFrameId = requestAnimationFrame(type);\r
      }, 200);\r
    }\r
  }\r
}\r
\r
onMounted(() => {\r
  animationFrameId = requestAnimationFrame(type);\r
});\r
\r
onBeforeUnmount(() => {\r
  if (animationFrameId) {\r
    cancelAnimationFrame(animationFrameId);\r
  }\r
});\r
<\/script>\r
\r
<style>\r
.cursor {\r
  display: inline-block;\r
  margin-left: 2px;\r
  width: 1ch;\r
  animation: blink 1s infinite;\r
}\r
\r
@keyframes blink {\r
  0%, 50% { opacity: 1; }\r
  50%, 100% { opacity: 0; }\r
}\r
</style>\r
\`\`\`\r
\r
### 2. 性能优化\r
\r
在纯 Vue 实现中，我们使用了 \`requestAnimationFrame\` 来替代 \`setTimeout\`，以获得更流畅的动画效果。\`requestAnimationFrame\` 会在浏览器下一次重绘之前执行回调函数，这样可以确保动画与浏览器的刷新率同步，避免掉帧。\r
\r
我们还添加了在组件卸载前取消动画帧的逻辑，以防止内存泄漏。\r
\r
### 代码解释\r
\r
1. \`texts\`：定义要循环显示的文本数组\r
2. \`displayText\`：响应式变量，用于存储当前显示的文本\r
3. \`index\`：当前显示的文本在数组中的索引\r
4. \`charIndex\`：当前显示到文本中的第几个字符\r
5. \`isDeleting\`：标识当前是打字状态还是删除状态\r
6. \`type()\`函数：核心逻辑函数，控制打字和删除过程\r
   - 判断当前状态（打字/删除）\r
   - 根据状态更新displayText的值\r
   - 使用\`requestAnimationFrame\`递归调用实现动画效果\r
7. \`onMounted\`：组件挂载后开始执行打字效果\r
8. \`onBeforeUnmount\`：组件卸载前取消动画帧，防止内存泄漏\r
9. CSS部分：\r
   - \`.cursor\`：为光标添加样式\r
   - \`@keyframes blink\`：定义光标的闪烁动画\r
\r
### 错误处理\r
\r
在纯 Vue 实现中，需要注意以下几点：\r
\r
1. 确保在组件卸载前取消动画帧，防止内存泄漏。\r
2. 处理数组越界的情况，例如当 \`texts\` 数组为空时。\r
\r
### 可访问性\r
\r
为了使打字效果对屏幕阅读器友好，可以考虑以下几点：\r
\r
1. 为包含打字效果的元素添加 \`aria-label\` 属性，提供静态文本描述。\r
2. 使用 \`aria-live\` 属性来通知屏幕阅读器内容的动态变化。\r
\r
### SEO\r
\r
为了确保打字效果中的文本对搜索引擎可见，可以考虑以下几点：\r
\r
1. 在 HTML 中直接包含文本内容，然后使用 JavaScript 来实现打字效果。\r
2. 使用 \`<noscript>\` 标签为不支持 JavaScript 的用户提供替代内容。\r
\r
---\r
\r
## 两种方法对比\r
\r
| 特性 | typed.js | 纯Vue实现 |\r
|------|----------|-----------|\r
| 代码量 | 少 | 多 |\r
| 功能 | 丰富 | 基础 |\r
| 依赖 | 需要安装 | 无依赖 |\r
| 自定义性 | 高 | 中等 |\r
| 性能 | 较好 | 良好 |\r
\r
## 总结\r
\r
两种方法都可以实现打字机效果，如果项目中需要多种动画效果，推荐使用typed.js库；如果只是简单的打字效果，纯Vue实现更轻量。根据项目需求选择合适的方法即可。\r
`;export{n as default};
