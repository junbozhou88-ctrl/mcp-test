# 🌿 ZenFlow / 禅流

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-yellow.svg)](https://vitejs.dev/)
[![Vanilla CSS](https://img.shields.io/badge/CSS-Vanilla-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

ZenFlow 是一款面向移动端的**极简任务与专注管理应用**。产品旨在通过平和、低干扰的方式帮助用户管理每日待办、设置专注提醒、回顾任务完成情况，并通过连续专注数据形成正向的长期反馈。

> [!NOTE]
> 本项目基于 **React + Vite** 构建，采用 **原生 CSS** 编写，视觉风格极致内敛，特别适配移动端单手操作，在桌面端则以优雅的“手机画布原型壳”呈现。

---

## ✨ 设计理念与视觉风格

- **🍃 禅意平静 (Calm & Silent)**：采用深色背景搭配柔和绿色（Zen Green）强调色，降低任务焦虑，营造专注的心理暗示。
- **🔮 毛玻璃微质感 (Glassmorphism & Micro-animations)**：卡片采用半透明磨砂玻璃效果，交互伴随微妙的渐变和缩放微动效。
- **⚡️ 极简流畅 (Minimal & Fluent)**：交互链路短，添加、编辑、删除任务一气呵成。
- **📊 连续反馈 (Continuous Feedback)**：动态统计数据、过去 7 天完成趋势和分类占比，让成就感具象化。

---

## 📱 核心功能模块

项目已实现以下 6 大核心页面，通过轻量级 Hash 路由进行无缝切换：

| 路由 | 页面 | 功能说明 |
| --- | --- | --- |
| `#/` | **首页 (Home)** | 展示今日任务概览、剩余任务数及进度条，降低焦虑，聚焦当下任务。 |
| `#/tasks` | **全部任务 (All Tasks)** | 分组展示「今天」「明天」「稍后」的任务，支持按时间正序/倒序排序。 |
| `#/new` | **新增任务 (New Task)** | 快速书写任务，设置提醒时间、任务分组和分类（如重点任务、日常事务）。 |
| `#/edit/:id` | **编辑任务 (Edit Task)** | 修改任务内容、提醒时间、重设分类，或快速删除任务。 |
| `#/stats` | **任务统计 (Statistics)** | 回顾本周完成率，折线图呈现过去 7 天完成趋势，环形卡片展示任务类型占比。 |
| `#/profile` | **个人中心 (Profile)** | 展示林深的头像、连续专注天数，包含账号安全、帮助反馈等静态设置入口。 |

---

## 🛠️ 技术栈与目录结构

### 技术栈
*   **框架**：React 18
*   **构建工具**：Vite 5
*   **样式**：原生 CSS (自定义变量、Flexbox、Grid 布局)
*   **路由**：基于 `window.location.hash` 自研的极简 React Hook 路由 (`useHashRoute`)

### 目录结构
```bash
src/
├── assets/             # 静态资源 (图标、图片)
├── components/         # 可复用公共组件
│   ├── AppHeader.jsx   # 顶部导航栏 (包含品牌与头像入口)
│   ├── BottomNav.jsx   # 底部导航栏
│   ├── TaskCard.jsx    # 今日任务卡片 (支持快速切换完成状态)
│   └── TaskEditor.jsx  # 任务表单编辑器 (新增/编辑共用)
├── data/
│   └── initialTasks.js # 种子数据 (包含任务与用户状态)
├── hooks/
│   └── useHashRoute.js # 自定义哈希路由 Hook
├── pages/              # 业务页面级组件
│   ├── HomePage.jsx
│   ├── TasksPage.jsx
│   ├── StatsPage.jsx
│   ├── ProfilePage.jsx
│   └── TaskEditorPage.jsx
├── utils/
│   └── navigation.js   # 路由跳转工具函数
├── App.jsx             # 顶层布局与状态管理器
├── App.css             # 全局主题样式与组件微调
├── index.css           # 基础重置样式与变量定义
└── main.jsx
```

---

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动本地开发服务器
```bash
npm run dev
```
启动后，在浏览器访问控制台输出的本地端口（通常为 `http://localhost:5173`）即可预览项目。

### 3. 构建生产版本
```bash
npm run build
```
编译产物将存放在 `dist` 目录下。

### 4. 代码规范检查
```bash
npm run lint
```

---

## 📈 后续迭代计划

- [ ] **数据持久化 (V1.1)**：支持 LocalStorage 本地存储，防止页面刷新后状态丢失。
- [ ] **增强时间选择器 (V1.2)**：开发原生的时间选择弹层，支持日历选择与自定义循环周期。
- [ ] **数据同步 (V1.4)**：接入云端数据库，实现多端同步和第三方登录。
