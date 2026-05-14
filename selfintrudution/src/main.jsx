import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import * as THREE from 'three';
import './styles.css';

const PERFORMANCE = {
  antialias: false,
  decorativeLights: false,
  maxDelta: 0.04,
  pixelRatio: 1,
  portalSegments: 48,
  portalShards: 6,
  shadows: false,
  textureScale: 0.5,
};

window.addEventListener('error', (event) => {
  document.body.dataset.runtimeError = event.message;
});

window.addEventListener('unhandledrejection', (event) => {
  document.body.dataset.runtimeError = event.reason?.message || String(event.reason);
});

const profile = {
  name: 'LeoninCS',
  realName: '献超前',
  role: 'Backend Developer Intern',
  location: 'Hangzhou, China',
  email: 'xianchaoqian@foxmail.com',
  github: 'github.com/LeoninCS',
};

const rooms = [
  { id: 'central', title: '主厅', subtitle: 'Atelier', center: [0, 0], width: 34, depth: 30, doors: ['east', 'west', 'north', 'south'] },
  { id: 'finance', title: '投资厅', subtitle: 'Finance', center: [42, 0], width: 28, depth: 24, doors: ['west'] },
  { id: 'music', title: '音乐厅', subtitle: 'Music', center: [-42, 0], width: 28, depth: 24, doors: ['east'] },
  { id: 'photo', title: '摄影厅', subtitle: 'Photography', center: [0, -65], width: 46, depth: 70, doors: ['south'] },
  { id: 'tech', title: '工程厅', subtitle: 'Engineering', center: [0, 42], width: 28, depth: 24, doors: ['north'] },
];

const walkZones = [
  { xMin: -15.4, xMax: 15.4, zMin: -13.4, zMax: 13.4 },
  { xMin: 15.4, xMax: 28.8, zMin: -4.4, zMax: 4.4 },
  { xMin: 28.8, xMax: 54.8, zMin: -10.8, zMax: 10.8 },
  { xMin: -28.8, xMax: -15.4, zMin: -4.4, zMax: 4.4 },
  { xMin: -54.8, xMax: -28.8, zMin: -10.8, zMax: 10.8 },
  { xMin: -4.4, xMax: 4.4, zMin: -28.8, zMax: -13.4 },
  { xMin: -21.6, xMax: 21.6, zMin: -98.8, zMax: -28.8 },
  { xMin: -4.4, xMax: 4.4, zMin: 13.4, zMax: 28.8 },
  { xMin: -11.8, xMax: 11.8, zMin: 28.8, zMax: 54.8 },
];

const exhibits = [
  {
    id: 'identity',
    title: '身份',
    subtitle: 'Portrait',
    detailsTitle: '身份画像',
    position: [-17.05, 4.15, -7.2],
    rotation: Math.PI / 2,
    details: [
      profile.name,
      `${profile.realName} / ${profile.role}`,
      profile.location,
      '河南大学软件工程本科在读',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/LeoninCS' },
      { label: 'GoClub', href: 'https://goclub.space/' },
      { label: 'Email', href: `mailto:${profile.email}` },
    ],
  },
  {
    id: 'skills',
    title: '能力',
    subtitle: 'Craft',
    detailsTitle: '能力栈',
    position: [13.55, 4.15, 37.4],
    rotation: -Math.PI / 2,
    details: ['Go / Python / React / Three.js', 'Kubernetes / Redis / MQ', 'LangGraph / Agent Workflow', 'Raft / Distributed Systems'],
    links: [
      { label: 'Go', href: 'https://github.com/golang/go' },
      { label: 'LangGraph', href: 'https://github.com/langchain-ai/langgraph' },
      { label: 'Kubernetes', href: 'https://github.com/kubernetes/kubernetes' },
      { label: 'Redis', href: 'https://github.com/redis/redis' },
    ],
  },
  {
    id: 'projects',
    title: '项目',
    subtitle: 'Works',
    detailsTitle: '项目陈列',
    position: [-13.55, 4.15, 42.8],
    rotation: Math.PI / 2,
    details: ['Go 语言俱乐部', '视频 Feed 流系统', '多智能体工作流助手', 'Sealos 集群合规与 AIOps'],
    links: [
      { label: 'GoClub', href: 'https://goclub.space/' },
      { label: 'Sealos', href: 'https://github.com/labring/sealos' },
      { label: 'Feed System', href: 'https://github.com/LeoninCS/feedsystem_video_go' },
      { label: 'Agent Assistant', href: 'https://github.com/LeoninCS/multi-agent-workflow-assistant' },
    ],
  },
  {
    id: 'algorithm',
    title: '算法',
    subtitle: 'Medal',
    detailsTitle: '算法纹章',
    position: [0, 4.15, 53.55],
    rotation: Math.PI,
    details: ['LeetCode 2100', 'Codeforces 1653', '累计刷题 1500+', '河南大学 ACM 集训队'],
    links: [
      { label: 'LeetCode', href: 'https://leetcode.cn/u/mvp-u/' },
      { label: 'Codeforces', href: 'https://codeforces.com/profile/LeoninCS' },
      { label: 'ICPC', href: 'https://icpc.global/' },
    ],
  },
  {
    id: 'stocks',
    title: '股票',
    subtitle: 'Stocks',
    detailsTitle: '股票观察',
    position: [55.55, 4.15, -5.2],
    rotation: -Math.PI / 2,
    details: ['KO / NVDA / TSM / AAPL', 'MSFT / GOOGL / MU / CVX', '关注商业模式、现金流与技术趋势', '用长期主义看公司质量'],
    links: [
      { label: 'KO', href: 'https://finance.yahoo.com/quote/KO/' },
      { label: 'NVDA', href: 'https://finance.yahoo.com/quote/NVDA/' },
      { label: 'TSM', href: 'https://finance.yahoo.com/quote/TSM/' },
      { label: 'AAPL', href: 'https://finance.yahoo.com/quote/AAPL/' },
      { label: 'MSFT', href: 'https://finance.yahoo.com/quote/MSFT/' },
      { label: 'GOOGL', href: 'https://finance.yahoo.com/quote/GOOGL/' },
      { label: 'MU', href: 'https://finance.yahoo.com/quote/MU/' },
      { label: 'CVX', href: 'https://finance.yahoo.com/quote/CVX/' },
    ],
  },
  {
    id: 'indices',
    title: '指数',
    subtitle: 'Indexes',
    detailsTitle: '指数陈列',
    position: [42, 4.15, -11.55],
    rotation: 0,
    details: ['Nasdaq 100', 'S&P 500', 'Nikkei 225', '用宽基指数观察宏观与产业节奏'],
    links: [
      { label: 'Nasdaq 100', href: 'https://finance.yahoo.com/quote/%5ENDX/' },
      { label: 'S&P 500', href: 'https://finance.yahoo.com/quote/%5EGSPC/' },
      { label: 'Nikkei 225', href: 'https://finance.yahoo.com/quote/%5EN225/' },
    ],
  },
  {
    id: 'crypto',
    title: '加密',
    subtitle: 'Crypto',
    detailsTitle: '链上展柜',
    position: [42, 4.15, 11.55],
    rotation: Math.PI,
    details: ['BTC / ETH / USDT', '关注基础设施与流动性周期', 'Web3 视角服务于工程理解', '风险意识优先于叙事热度'],
    links: [
      { label: 'BTC', href: 'https://finance.yahoo.com/quote/BTC-USD/' },
      { label: 'ETH', href: 'https://finance.yahoo.com/quote/ETH-USD/' },
      { label: 'USDT', href: 'https://finance.yahoo.com/quote/USDT-USD/' },
      { label: 'Ethereum', href: 'https://github.com/ethereum/go-ethereum' },
    ],
  },
  {
    id: 'music',
    title: '音乐',
    subtitle: 'Music',
    detailsTitle: '音乐偏好',
    position: [-55.55, 4.15, -4.8],
    rotation: Math.PI / 2,
    details: ['R&B / Jazz / Hip-Hop / Pop', '方大同 / Kendrick Lamar / SZA', 'Frank Ocean / J. Cole / NewJeans', '音乐像展厅里的第二条动线'],
    links: [
      { label: 'Kendrick Lamar', href: 'https://open.spotify.com/search/Kendrick%20Lamar' },
      { label: 'SZA', href: 'https://open.spotify.com/search/SZA' },
      { label: 'Frank Ocean', href: 'https://open.spotify.com/search/Frank%20Ocean' },
      { label: 'NewJeans', href: 'https://open.spotify.com/search/NewJeans' },
    ],
  },
  {
    id: 'hifi',
    title: 'HiFi',
    subtitle: 'Audio',
    detailsTitle: '声音器物',
    position: [-42, 4.15, -11.55],
    rotation: 0,
    details: ['耳机、播放器、声场与解析', '喜欢带空间感和质感的声音', '把听感当作一种审美训练', '安静但有层次的长期爱好'],
    links: [
      { label: 'FiiO KA13', href: 'https://www.fiio.com/search?keyword=KA13' },
      { label: 'Sennheiser IE 200', href: 'https://www.sennheiser-hearing.com/search/?query=IE%20200' },
      { label: 'HiFi Search', href: 'https://www.head-fi.org/search/?q=HiFi' },
    ],
  },
  {
    id: 'albums',
    title: '唱片',
    subtitle: 'Albums',
    detailsTitle: '唱片墙',
    position: [-42, 4.15, 11.55],
    rotation: Math.PI,
    details: ['Blonde / DAMN. / 2014 Forest Hills Drive', 'RADWIMPS / amazarashi', '从旋律、词、采样里找结构感', '写代码时也需要节奏'],
    links: [
      { label: 'Blonde', href: 'https://open.spotify.com/search/Blonde%20Frank%20Ocean' },
      { label: 'DAMN.', href: 'https://open.spotify.com/search/DAMN.%20Kendrick%20Lamar' },
      { label: 'J. Cole', href: 'https://open.spotify.com/search/J.%20Cole' },
      { label: 'RADWIMPS', href: 'https://open.spotify.com/search/RADWIMPS' },
    ],
  },
  {
    id: 'photography',
    title: '摄影',
    subtitle: 'Photography',
    detailsTitle: '摄影切片',
    position: [0, 4.15, -99.55],
    rotation: 0,
    image: '/picture/01-city-tower-blue-hour.jpg',
    details: ['城市 / 蓝调时刻 / 旅途', '用构图记录光线和秩序', '镜头背后是对空间的观察', '摄影让个人介绍更有现场感'],
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/forever_mvp0?igsh=MXhnNjA3ZjFkbTZwbg==' },
      { label: '小红书', href: 'https://xhslink.com/m/68F5FSoWMxt' },
      { label: 'Nikon Z30', href: 'https://www.nikon.com.cn/search?keyword=Z30' },
    ],
  },
  {
    id: 'cycling',
    title: '骑行',
    subtitle: 'Cycling',
    detailsTitle: '骑行路线',
    position: [-22.55, 4.15, -55],
    rotation: Math.PI / 2,
    image: '/picture/09-road-bike-stadium.jpg',
    details: ['长距离骑行 10000+ 公里', '耐力、路线、补给和风景', '身体经验会反过来塑造工程耐心', '喜欢把城市当成开放地图'],
    links: [
      { label: 'Bilibili', href: 'https://space.bilibili.com/491359383' },
      { label: '小红书', href: 'https://xhslink.com/m/68F5FSoWMxt' },
      { label: 'Strava Routes', href: 'https://www.strava.com/routes' },
    ],
  },
  {
    id: 'contest',
    title: '竞赛',
    subtitle: 'ACM',
    detailsTitle: '竞赛照片',
    position: [22.55, 4.15, -55],
    rotation: -Math.PI / 2,
    image: '/picture/42-icpc-shenzhen-invitational-01.jpg',
    details: ['河南大学 ACM 集训队', 'ICPC 现场经验', '算法训练沉淀为工程直觉', '复杂问题拆解能力来自长期练习'],
    links: [
      { label: 'Codeforces', href: 'https://codeforces.com/profile/LeoninCS' },
      { label: 'LeetCode', href: 'https://leetcode.cn/u/mvp-u/' },
      { label: 'ICPC', href: 'https://icpc.global/' },
    ],
  },
  {
    id: 'city-night',
    title: '城市',
    subtitle: 'City',
    detailsTitle: '城市影像',
    position: [-22.55, 4.15, -77],
    rotation: Math.PI / 2,
    image: '/picture/01-city-tower-blue-hour.jpg',
    details: ['城市天际线 / 蓝调光线', '喜欢把秩序、尺度和色温放进画面', '把照片当作空间记忆的索引', '摄影厅作为这座馆的远端长廊'],
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/forever_mvp0?igsh=MXhnNjA3ZjFkbTZwbg==' },
      { label: '小红书', href: 'https://xhslink.com/m/68F5FSoWMxt' },
    ],
  },
  {
    id: 'team-photo',
    title: '现场',
    subtitle: 'Scene',
    detailsTitle: '现场记录',
    position: [22.55, 4.15, -77],
    rotation: -Math.PI / 2,
    image: '/picture/35-programming-contest-team-photo.jpg',
    details: ['团队合影 / 竞赛现场 / 路途记忆', '照片把事件留下来', '工程和生活都需要长期记录', '这里会继续扩展更多照片'],
    links: [
      { label: 'Bilibili', href: 'https://space.bilibili.com/491359383' },
      { label: 'GitHub', href: 'https://github.com/LeoninCS' },
    ],
  },
  {
    id: 'contact',
    title: '联系',
    subtitle: 'Contact',
    detailsTitle: '联系',
    position: [0, 4.15, -14.55],
    rotation: 0,
    details: [profile.email, profile.github, '后端工程 / 云原生平台 / AI Agent / 开源协作'],
    links: [
      { label: 'Email', href: `mailto:${profile.email}` },
      { label: 'GitHub', href: 'https://github.com/LeoninCS' },
      { label: 'X', href: 'https://x.com/xxxmvp2' },
      { label: 'Bilibili', href: 'https://space.bilibili.com/491359383' },
      { label: 'Instagram', href: 'https://www.instagram.com/forever_mvp0?igsh=MXhnNjA3ZjFkbTZwbg==' },
    ],
  },
];

const classicArtworks = [
  { id: 'starry-night', title: '星夜', style: 'starry', position: [17.05, 4.35, 7.4], rotation: -Math.PI / 2, width: 5.2, height: 3.7 },
  { id: 'mona-lisa', title: '蒙娜丽莎', style: 'mona', position: [-17.05, 4.4, 6.9], rotation: Math.PI / 2, width: 3.35, height: 4.45 },
  { id: 'great-wave', title: '神奈川冲浪里', style: 'wave', position: [22.2, 4.1, 4.65], rotation: Math.PI, width: 4.4, height: 3.05 },
  { id: 'girl-pearl', title: '珍珠耳环少女', style: 'pearl', position: [-22.2, 4.25, -4.65], rotation: 0, width: 3.25, height: 4.2 },
  { id: 'sunflowers', title: '向日葵', style: 'sunflowers', position: [28.45, 4.2, 7.2], rotation: Math.PI / 2, width: 3.65, height: 4.3 },
  { id: 'impression', title: '日出印象', style: 'sunrise', position: [-28.45, 4.1, 7.2], rotation: -Math.PI / 2, width: 4.45, height: 3.15 },
  { id: 'beethoven-frieze', title: '贝多芬饰带', style: 'frieze', position: [0, 7.8, 14.55], rotation: Math.PI, width: 8.2, height: 2.15 },
];

const doorSigns = [
  { id: 'finance-door', title: '投资厅', subtitle: '股票 / 指数 / 加密', position: [15.95, 6.6, 0], rotation: -Math.PI / 2 },
  { id: 'music-door', title: '音乐厅', subtitle: '音乐 / HiFi / 唱片', position: [-15.95, 6.6, 0], rotation: Math.PI / 2 },
  { id: 'photo-door', title: '摄影厅', subtitle: '摄影 / 骑行 / 竞赛', position: [0, 6.6, -13.95], rotation: 0 },
  { id: 'tech-door', title: '工程厅', subtitle: '能力 / 项目 / 算法', position: [0, 6.6, 13.95], rotation: Math.PI },
];

const portals = [
  { id: 'east-portico', axis: 'x', side: 1, center: [17.25, 0], width: 8.8, depth: 5.4 },
  { id: 'west-portico', axis: 'x', side: -1, center: [-17.25, 0], width: 8.8, depth: 5.4 },
  { id: 'photo-portico', axis: 'z', side: -1, center: [0, -15.25], width: 11.2, depth: 5.8 },
  { id: 'tech-portico', axis: 'z', side: 1, center: [0, 15.25], width: 8.8, depth: 5.4 },
];

function makeCanvasTexture(width, height, paint) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(128, Math.round(width * PERFORMANCE.textureScale));
  canvas.height = Math.max(128, Math.round(height * PERFORMANCE.textureScale));
  const context = canvas.getContext('2d');
  paint(context, canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function noise(ctx, width, height, count, alpha = 0.12) {
  for (let i = 0; i < count; i += 1) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * alpha})`;
    ctx.fillRect(Math.random() * width, Math.random() * height, Math.random() * 2 + 0.5, Math.random() * 2 + 0.5);
  }
}

function createPlasterTexture() {
  const texture = makeCanvasTexture(768, 768, (ctx, width, height) => {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#d9c7ac');
    gradient.addColorStop(0.45, '#b99f7c');
    gradient.addColorStop(1, '#6f5a43');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 70; i += 1) {
      ctx.strokeStyle = `rgba(80, 59, 38, ${0.04 + Math.random() * 0.08})`;
      ctx.lineWidth = 1 + Math.random() * 5;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.bezierCurveTo(Math.random() * width, Math.random() * height, Math.random() * width, Math.random() * height, Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    noise(ctx, width, height, 3600, 0.18);
  });
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 2.5);
  return texture;
}

function createMarbleTexture() {
  const texture = makeCanvasTexture(768, 768, (ctx, width, height) => {
    ctx.fillStyle = '#cfc4b0';
    ctx.fillRect(0, 0, width, height);

    for (let y = 0; y < height; y += 128) {
      for (let x = 0; x < width; x += 128) {
        const shade = 178 + Math.floor(Math.random() * 44);
        ctx.fillStyle = `rgb(${shade}, ${shade - 8}, ${shade - 22})`;
        ctx.fillRect(x, y, 126, 126);
        ctx.strokeStyle = 'rgba(62, 43, 27, 0.22)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, 126, 126);
      }
    }

    for (let i = 0; i < 80; i += 1) {
      ctx.strokeStyle = `rgba(255,255,255,${0.12 + Math.random() * 0.26})`;
      ctx.lineWidth = 1 + Math.random() * 2;
      ctx.beginPath();
      const startY = Math.random() * height;
      ctx.moveTo(0, startY);
      ctx.bezierCurveTo(width * 0.3, startY + Math.random() * 120 - 60, width * 0.72, startY + Math.random() * 160 - 80, width, startY + Math.random() * 140 - 70);
      ctx.stroke();
    }
  });
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 7);
  return texture;
}

function createCategoryTexture(exhibit) {
  return makeCanvasTexture(1024, 768, (ctx, width, height) => {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#2c3547');
    gradient.addColorStop(0.42, '#7d2032');
    gradient.addColorStop(1, '#d0a35a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 120; i += 1) {
      ctx.strokeStyle = `rgba(255, 236, 197, ${0.04 + Math.random() * 0.08})`;
      ctx.lineWidth = 3 + Math.random() * 8;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(14, 12, 10, 0.42)';
    ctx.fillRect(54, 54, width - 108, height - 108);
    ctx.strokeStyle = '#ecd39a';
    ctx.lineWidth = 18;
    ctx.strokeRect(68, 68, width - 136, height - 136);
    ctx.strokeStyle = 'rgba(255,255,255,0.42)';
    ctx.lineWidth = 3;
    ctx.strokeRect(100, 100, width - 200, height - 200);

    ctx.fillStyle = '#fff7df';
    ctx.font = '900 210px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(exhibit.title, width / 2, height / 2 + 22);

    ctx.fillStyle = '#f4c36a';
    ctx.font = '800 42px Georgia, serif';
    ctx.fillText(exhibit.subtitle.toUpperCase(), width / 2, 162);

    ctx.fillStyle = 'rgba(255, 247, 223, 0.18)';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2 + 20, 220, 0, Math.PI * 2);
    ctx.stroke();
  });
}

function drawCaption(ctx, width, height, title) {
  ctx.fillStyle = 'rgba(17, 10, 7, 0.54)';
  ctx.fillRect(0, height - 70, width, 70);
  ctx.fillStyle = '#fff7df';
  ctx.font = '800 28px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, width / 2, height - 35);
}

function createClassicArtworkTexture(artwork) {
  return makeCanvasTexture(900, 680, (ctx, width, height) => {
    if (artwork.style === 'starry') {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#071a4a');
      gradient.addColorStop(0.62, '#1d4f91');
      gradient.addColorStop(1, '#0d0b1c');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 16; i += 1) {
        const x = 70 + Math.random() * (width - 140);
        const y = 60 + Math.random() * 280;
        const radius = 12 + Math.random() * 22;
        ctx.strokeStyle = `rgba(255, 226, 105, ${0.38 + Math.random() * 0.42})`;
        ctx.lineWidth = 5 + Math.random() * 5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 1.65);
        ctx.stroke();
        ctx.fillStyle = '#ffe275';
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.18, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < 18; i += 1) {
        ctx.strokeStyle = `rgba(180, 220, 255, ${0.18 + Math.random() * 0.24})`;
        ctx.lineWidth = 6 + Math.random() * 8;
        ctx.beginPath();
        const y = 110 + i * 18;
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(width * 0.24, y - 70, width * 0.62, y + 80, width, y - 36);
        ctx.stroke();
      }

      ctx.fillStyle = '#0b120d';
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 40) {
        ctx.lineTo(x, height - 90 - Math.sin(x * 0.02) * 52);
      }
      ctx.lineTo(width, height);
      ctx.fill();
    }

    if (artwork.style === 'wave') {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#e9d8b8');
      gradient.addColorStop(0.58, '#c6d2d8');
      gradient.addColorStop(1, '#75624a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#1e5c8f';
      ctx.beginPath();
      ctx.moveTo(width * 0.05, height * 0.72);
      ctx.bezierCurveTo(width * 0.25, height * 0.22, width * 0.52, height * 0.1, width * 0.64, height * 0.5);
      ctx.bezierCurveTo(width * 0.46, height * 0.42, width * 0.42, height * 0.76, width * 0.18, height * 0.82);
      ctx.lineTo(width * 0.05, height * 0.72);
      ctx.fill();

      ctx.strokeStyle = '#f7f0df';
      ctx.lineWidth = 18;
      for (let i = 0; i < 8; i += 1) {
        ctx.beginPath();
        ctx.moveTo(width * (0.18 + i * 0.08), height * (0.42 + Math.sin(i) * 0.12));
        ctx.quadraticCurveTo(width * (0.33 + i * 0.05), height * 0.22, width * (0.48 + i * 0.05), height * 0.48);
        ctx.stroke();
      }

      ctx.fillStyle = '#6f685c';
      ctx.beginPath();
      ctx.moveTo(width * 0.68, height * 0.6);
      ctx.lineTo(width * 0.78, height * 0.36);
      ctx.lineTo(width * 0.88, height * 0.6);
      ctx.fill();
    }

    if (artwork.style === 'mona') {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#2a3b2c');
      gradient.addColorStop(0.48, '#7e6d45');
      gradient.addColorStop(1, '#1a160f');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#2a2118';
      ctx.beginPath();
      ctx.ellipse(width * 0.5, height * 0.42, width * 0.22, height * 0.28, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#d2a06b';
      ctx.beginPath();
      ctx.ellipse(width * 0.5, height * 0.38, width * 0.15, height * 0.2, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#2a2118';
      ctx.fillRect(width * 0.31, height * 0.48, width * 0.38, height * 0.33);
      ctx.fillStyle = '#b38a4e';
      ctx.beginPath();
      ctx.moveTo(width * 0.5, height * 0.5);
      ctx.lineTo(width * 0.3, height * 0.82);
      ctx.lineTo(width * 0.7, height * 0.82);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#3a2417';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(width * 0.42, height * 0.39);
      ctx.quadraticCurveTo(width * 0.5, height * 0.43, width * 0.58, height * 0.39);
      ctx.stroke();
    }

    if (artwork.style === 'pearl') {
      ctx.fillStyle = '#0b1723';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#d79a46';
      ctx.beginPath();
      ctx.moveTo(width * 0.31, height * 0.24);
      ctx.quadraticCurveTo(width * 0.5, height * 0.08, width * 0.72, height * 0.24);
      ctx.lineTo(width * 0.62, height * 0.32);
      ctx.quadraticCurveTo(width * 0.45, height * 0.24, width * 0.31, height * 0.24);
      ctx.fill();

      ctx.fillStyle = '#d7a473';
      ctx.beginPath();
      ctx.ellipse(width * 0.5, height * 0.42, width * 0.18, height * 0.23, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#e4d8b6';
      ctx.beginPath();
      ctx.arc(width * 0.66, height * 0.5, 22, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#193a66';
      ctx.beginPath();
      ctx.moveTo(width * 0.36, height * 0.24);
      ctx.quadraticCurveTo(width * 0.52, height * 0.18, width * 0.69, height * 0.27);
      ctx.lineTo(width * 0.58, height * 0.34);
      ctx.quadraticCurveTo(width * 0.45, height * 0.3, width * 0.36, height * 0.24);
      ctx.fill();
    }

    if (artwork.style === 'sunflowers') {
      ctx.fillStyle = '#c99a3f';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#7b4a24';
      ctx.fillRect(width * 0.28, height * 0.58, width * 0.44, height * 0.2);

      for (let i = 0; i < 9; i += 1) {
        const x = width * (0.24 + (i % 3) * 0.26) + Math.sin(i) * 18;
        const y = height * (0.22 + Math.floor(i / 3) * 0.15);
        ctx.strokeStyle = '#2d5a2b';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(x, y + 42);
        ctx.lineTo(width * 0.5, height * 0.62);
        ctx.stroke();
        for (let p = 0; p < 14; p += 1) {
          const angle = (p / 14) * Math.PI * 2;
          ctx.fillStyle = '#e3b127';
          ctx.beginPath();
          ctx.ellipse(x + Math.cos(angle) * 26, y + Math.sin(angle) * 20, 18, 8, angle, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = '#4a2713';
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (artwork.style === 'sunrise') {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#8ba2ad');
      gradient.addColorStop(0.55, '#d0a06c');
      gradient.addColorStop(1, '#2b5263');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#f0653d';
      ctx.beginPath();
      ctx.arc(width * 0.62, height * 0.42, 44, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(31, 64, 83, 0.72)';
      ctx.lineWidth = 10;
      for (let i = 0; i < 12; i += 1) {
        const y = height * 0.54 + i * 20;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(width * 0.26, y - 26, width * 0.66, y + 28, width, y - 8);
        ctx.stroke();
      }

      ctx.fillStyle = '#21313a';
      ctx.fillRect(width * 0.12, height * 0.56, width * 0.18, 18);
      ctx.fillRect(width * 0.48, height * 0.6, width * 0.24, 14);
    }

    if (artwork.style === 'frieze') {
      ctx.fillStyle = '#d3b783';
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = '#604123';
      ctx.lineWidth = 12;
      ctx.strokeRect(34, 34, width - 68, height - 68);
      ctx.fillStyle = '#4f2c1d';
      for (let i = 0; i < 7; i += 1) {
        const x = width * 0.12 + i * width * 0.12;
        ctx.beginPath();
        ctx.ellipse(x, height * 0.55, 32, 78, Math.sin(i) * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, height * 0.32, 22, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = '#a86a2d';
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(width * 0.08, height * 0.72);
      ctx.bezierCurveTo(width * 0.32, height * 0.22, width * 0.6, height * 0.88, width * 0.92, height * 0.38);
      ctx.stroke();
    }

    noise(ctx, width, height, 1400, 0.08);
    drawCaption(ctx, width, height, artwork.title);
  });
}

function createPortalGlyphTexture() {
  return makeCanvasTexture(1024, 1024, (ctx, width, height) => {
    const center = width / 2;
    ctx.clearRect(0, 0, width, height);

    const aura = ctx.createRadialGradient(center, center, 20, center, center, center * 0.92);
    aura.addColorStop(0, 'rgba(142, 232, 255, 0.28)');
    aura.addColorStop(0.42, 'rgba(54, 184, 255, 0.2)');
    aura.addColorStop(0.76, 'rgba(54, 184, 255, 0.08)');
    aura.addColorStop(1, 'rgba(54, 184, 255, 0)');
    ctx.fillStyle = aura;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(129, 227, 255, 0.92)';
    ctx.lineWidth = 10;
    [180, 270, 360, 430].forEach((radius, index) => {
      ctx.setLineDash(index % 2 === 0 ? [42, 24] : [12, 18]);
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    ctx.strokeStyle = 'rgba(255, 247, 223, 0.78)';
    ctx.lineWidth = 6;
    for (let i = 0; i < 12; i += 1) {
      const angle = (i / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(center + Math.cos(angle) * 108, center + Math.sin(angle) * 108);
      ctx.lineTo(center + Math.cos(angle) * 388, center + Math.sin(angle) * 388);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(81, 205, 255, 0.86)';
    ctx.lineWidth = 8;
    for (let i = 0; i < 8; i += 1) {
      const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
      ctx.beginPath();
      ctx.moveTo(center + Math.cos(angle) * 210, center + Math.sin(angle) * 210);
      ctx.lineTo(center + Math.cos(angle + 0.42) * 330, center + Math.sin(angle + 0.42) * 330);
      ctx.lineTo(center + Math.cos(angle - 0.42) * 330, center + Math.sin(angle - 0.42) * 330);
      ctx.closePath();
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(160, 239, 255, 0.84)';
    for (let i = 0; i < 20; i += 1) {
      const angle = (i / 20) * Math.PI * 2;
      const x = center + Math.cos(angle) * 350;
      const y = center + Math.sin(angle) * 350;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillRect(-12, -16, 24, 32);
      ctx.restore();
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
    ctx.beginPath();
    ctx.arc(center, center, 36, 0, Math.PI * 2);
    ctx.fill();
  });
}

function createDoveMaterial() {
  return {
    body: new THREE.MeshStandardMaterial({ color: 0xf5f1e8, roughness: 0.58, metalness: 0.02 }),
    shadow: new THREE.MeshStandardMaterial({ color: 0xb9b2a3, roughness: 0.72 }),
  };
}

function createDove(materials, scale = 1) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.34, 18, 12), materials.body);
  body.scale.set(1.35, 0.68, 0.72);
  body.castShadow = true;
  group.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 10), materials.body);
  head.position.set(0.42, 0.08, 0);
  head.castShadow = true;
  group.add(head);

  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.18, 8), new THREE.MeshStandardMaterial({ color: 0xd9a34a, roughness: 0.5 }));
  beak.position.set(0.58, 0.08, 0);
  beak.rotation.z = -Math.PI / 2;
  group.add(beak);

  [-1, 1].forEach((side) => {
    const wing = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.045, 0.22), materials.body);
    wing.position.set(0, 0.02, side * 0.38);
    wing.rotation.set(side * 0.12, 0.24, side * 0.42);
    wing.userData.isWing = true;
    wing.castShadow = true;
    group.add(wing);
  });

  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.42, 4), materials.shadow);
  tail.position.set(-0.48, -0.02, 0);
  tail.rotation.z = Math.PI / 2;
  group.add(tail);

  group.scale.setScalar(scale);
  return group;
}

function createCubistAvatar() {
  const group = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xf1d2a0, roughness: 0.65 });
  const blue = new THREE.MeshStandardMaterial({ color: 0x1d4f91, roughness: 0.48, metalness: 0.05 });
  const red = new THREE.MeshStandardMaterial({ color: 0x9f2536, roughness: 0.55 });
  const ochre = new THREE.MeshStandardMaterial({ color: 0xd59c45, roughness: 0.62 });
  const green = new THREE.MeshStandardMaterial({ color: 0x5eb48b, roughness: 0.58 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x15110f, roughness: 0.78 });

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.55, 1.55, 8, 14), blue);
  torso.position.y = 1.25;
  torso.scale.set(0.86, 1, 0.62);
  torso.castShadow = true;
  group.add(torso);

  const coat = new THREE.Mesh(new THREE.ConeGeometry(0.82, 1.8, 5), red);
  coat.position.set(0.02, 0.88, -0.03);
  coat.rotation.y = 0.32;
  coat.scale.set(0.92, 1, 0.78);
  coat.castShadow = true;
  group.add(coat);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.36, 10), skin);
  neck.position.y = 2.18;
  neck.castShadow = true;
  group.add(neck);

  const head = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 1), skin);
  head.position.y = 2.72;
  head.scale.set(0.9, 1.08, 0.82);
  head.rotation.set(0.04, -0.12, 0.06);
  head.castShadow = true;
  group.add(head);

  const faceA = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.74, 0.08), ochre);
  faceA.position.set(-0.22, 2.74, -0.52);
  faceA.rotation.set(0.08, 0.16, -0.22);
  faceA.castShadow = true;
  group.add(faceA);

  const faceB = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.76, 0.08), green);
  faceB.position.set(0.22, 2.68, -0.51);
  faceB.rotation.set(-0.08, -0.2, 0.24);
  faceB.castShadow = true;
  group.add(faceB);

  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.42, 4), red);
  nose.position.set(0.04, 2.68, -0.83);
  nose.rotation.x = Math.PI / 2;
  nose.castShadow = true;
  group.add(nose);

  [
    [-0.25, 2.84, -0.86, 0.12],
    [0.28, 2.82, -0.84, -0.2],
  ].forEach(([x, y, z, angle]) => {
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.055, 0.045), dark);
    eye.position.set(x, y, z);
    eye.rotation.z = angle;
    group.add(eye);
  });

  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.06, 0.045), dark);
  mouth.position.set(0.04, 2.46, -0.83);
  mouth.rotation.z = -0.15;
  group.add(mouth);

  [
    [-0.58, 1.62, 0, -0.32, ochre],
    [0.58, 1.62, 0, 0.32, green],
  ].forEach(([x, y, z, angle, material]) => {
    const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), material);
    shoulder.position.set(x * 0.72, y + 0.28, z);
    group.add(shoulder);

    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.92, 6, 10), material);
    arm.position.set(x, y, z);
    arm.rotation.z = angle;
    arm.castShadow = true;
    group.add(arm);
  });

  [
    [-0.26, 0.26, 0, 0.08],
    [0.28, 0.26, 0, -0.08],
  ].forEach(([x, y, z, angle]) => {
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.82, 6, 10), dark);
    leg.position.set(x, y, z);
    leg.rotation.z = angle;
    leg.castShadow = true;
    group.add(leg);
  });

  const baseShadow = new THREE.Mesh(new THREE.CircleGeometry(0.72, 32), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.18 }));
  baseShadow.rotation.x = -Math.PI / 2;
  baseShadow.position.y = 0.02;
  group.add(baseShadow);

  group.scale.setScalar(0.92);
  group.position.set(0, 0, 9.5);
  return group;
}

function createMuseumVisitor(palette = {}) {
  const group = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: palette.skin || 0xd8b08a, roughness: 0.68 });
  const coat = new THREE.MeshStandardMaterial({ color: palette.coat || 0x3f5f73, roughness: 0.58, metalness: 0.03 });
  const scarf = new THREE.MeshStandardMaterial({ color: palette.scarf || 0xb84a3a, roughness: 0.62 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x171210, roughness: 0.78 });

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 1.1, 6, 10), coat);
  body.position.y = 1.05;
  body.scale.set(0.72, 1, 0.55);
  body.castShadow = true;
  group.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 10), skin);
  head.position.y = 1.86;
  head.scale.set(0.92, 1.05, 0.86);
  head.castShadow = true;
  group.add(head);

  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.29, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.52), dark);
  hair.position.y = 1.98;
  hair.rotation.x = -0.18;
  group.add(hair);

  const scarfMesh = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.035, 8, 28), scarf);
  scarfMesh.position.y = 1.56;
  scarfMesh.rotation.x = Math.PI / 2;
  group.add(scarfMesh);

  [
    [-0.33, 1.1, -0.14],
    [0.33, 1.1, 0.14],
  ].forEach(([x, y, angle]) => {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.72, 5, 8), skin);
    arm.position.set(x, y, 0);
    arm.rotation.z = angle;
    arm.castShadow = true;
    arm.userData.isArm = true;
    group.add(arm);
  });

  [
    [-0.14, 0.35],
    [0.14, 0.35],
  ].forEach(([x, y]) => {
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.055, 0.62, 5, 8), dark);
    leg.position.set(x, y, 0);
    leg.castShadow = true;
    leg.userData.isLeg = true;
    group.add(leg);
  });

  const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.45, 24), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.16 }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.02;
  group.add(shadow);

  group.scale.setScalar(0.82);
  return group;
}

function createNpcVisitors(scene) {
  const routes = [
    {
      palette: { coat: 0x24496b, scarf: 0xc58a3a, skin: 0xd8aa82 },
      points: [
        [-10.5, 5.5, 3.2, -17.05, 6.9],
        [-13.2, -6.8, 3.4, -17.05, -7.2],
        [-6.5, -10.2, 2.2, 0, -14.55],
        [5.4, -8.2, 2.6, 17.05, 7.4],
      ],
    },
    {
      palette: { coat: 0x6b2938, scarf: 0x8fdfff, skin: 0xe0b98e },
      points: [
        [34.2, -5.2, 3, 42, -11.55],
        [46.8, -8.2, 3.2, 55.55, -5.2],
        [50.2, 5.6, 2.8, 55.55, -5.2],
        [36.8, 6.8, 2.4, 42, 11.55],
      ],
    },
    {
      palette: { coat: 0x365c31, scarf: 0xd0a35a, skin: 0xc99670 },
      points: [
        [-34.5, 6.2, 2.8, -42, 11.55],
        [-48.8, 7.8, 3.2, -55.55, -4.8],
        [-51.4, -4.6, 2.6, -55.55, -4.8],
        [-36.2, -6.8, 2.4, -42, -11.55],
      ],
    },
    {
      palette: { coat: 0x4f3f79, scarf: 0xf2d6a2, skin: 0xd9b184 },
      points: [
        [-10.5, -42, 2.6, -22.55, -55],
        [12.8, -52, 3.2, 22.55, -55],
        [12.4, -74, 2.4, 22.55, -77],
        [-12.2, -84, 3.1, -22.55, -77],
        [0, -94, 2.8, 0, -99.55],
      ],
    },
    {
      palette: { coat: 0x2d5562, scarf: 0xb84a3a, skin: 0xe2bd96 },
      points: [
        [-6.8, 34.4, 2.6, -13.55, 42.8],
        [5.6, 38.6, 2.8, 13.55, 37.4],
        [7.8, 49.4, 3.2, 0, 53.55],
        [-7.4, 48.6, 2.4, 0, 53.55],
      ],
    },
  ];

  return routes.map((route, index) => {
    const visitor = createMuseumVisitor(route.palette);
    const first = route.points[0];
    visitor.position.set(first[0], 0, first[1]);
    visitor.rotation.y = Math.PI;
    visitor.userData.npc = {
      route: route.points.map(([x, z, dwell, lookX, lookZ]) => ({
        position: new THREE.Vector3(x, 0, z),
        lookAt: new THREE.Vector3(lookX, 0, lookZ),
        dwell,
      })),
      current: 0,
      wait: 0.4 + index * 0.3,
      arrived: true,
      speed: 1.05 + index * 0.08,
      seed: index * 1.7,
    };
    scene.add(visitor);
    return visitor;
  });
}

function createRoomLabelTexture(room) {
  return makeCanvasTexture(768, 384, (ctx, width, height) => {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#4e271a');
    gradient.addColorStop(0.45, '#8d6a3f');
    gradient.addColorStop(1, '#21130e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    noise(ctx, width, height, 700, 0.1);

    ctx.strokeStyle = '#e2c273';
    ctx.lineWidth = 18;
    ctx.strokeRect(34, 34, width - 68, height - 68);
    ctx.strokeStyle = 'rgba(255, 247, 223, 0.36)';
    ctx.lineWidth = 3;
    ctx.strokeRect(68, 68, width - 136, height - 136);

    ctx.fillStyle = '#fff7df';
    ctx.font = '900 128px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(room.title, width / 2, height / 2 + 12);

    ctx.fillStyle = '#f4c36a';
    ctx.font = '800 34px Georgia, serif';
    ctx.fillText(room.subtitle.toUpperCase(), width / 2, 96);
  });
}

function createDoorSignTexture(sign) {
  return makeCanvasTexture(900, 360, (ctx, width, height) => {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#17120f');
    gradient.addColorStop(0.45, '#5f3b22');
    gradient.addColorStop(1, '#15110f');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(58, 191, 255, 0.15)';
    ctx.fillRect(32, 32, width - 64, height - 64);
    noise(ctx, width, height, 520, 0.08);

    ctx.strokeStyle = '#d0a35a';
    ctx.lineWidth = 16;
    ctx.strokeRect(32, 32, width - 64, height - 64);
    ctx.strokeStyle = 'rgba(120, 218, 255, 0.66)';
    ctx.lineWidth = 4;
    ctx.strokeRect(58, 58, width - 116, height - 116);

    ctx.fillStyle = '#fff7df';
    ctx.font = '900 116px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(sign.title, width / 2, height * 0.46);

    ctx.fillStyle = '#8fdfff';
    ctx.font = '800 34px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(sign.subtitle, width / 2, height * 0.73);
  });
}

function addObstacle(obstacles, x, z, radius) {
  obstacles?.push({ x, z, radius });
}

function isClearOfObstacles(position, obstacles, bodyRadius = 0.62) {
  return obstacles.every((obstacle) => {
    const dx = position.x - obstacle.x;
    const dz = position.z - obstacle.z;
    const minDistance = obstacle.radius + bodyRadius;
    return dx * dx + dz * dz >= minDistance * minDistance;
  });
}

function createMosaicTexture(accent = '#6ed6ff') {
  return makeCanvasTexture(1024, 1024, (ctx, width, height) => {
    const center = width / 2;
    const gradient = ctx.createRadialGradient(center, center, 40, center, center, center);
    gradient.addColorStop(0, '#f4dfb1');
    gradient.addColorStop(0.42, '#b89a6e');
    gradient.addColorStop(0.72, '#5f4a37');
    gradient.addColorStop(1, '#1c1511');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 14; i += 1) {
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(255, 247, 223, 0.58)' : 'rgba(62, 43, 27, 0.62)';
      ctx.lineWidth = i % 2 === 0 ? 6 : 3;
      ctx.beginPath();
      ctx.arc(center, center, 70 + i * 32, 0, Math.PI * 2);
      ctx.stroke();
    }

    for (let i = 0; i < 24; i += 1) {
      const angle = (i / 24) * Math.PI * 2;
      ctx.strokeStyle = i % 3 === 0 ? accent : 'rgba(255, 247, 223, 0.34)';
      ctx.lineWidth = i % 3 === 0 ? 8 : 3;
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(center + Math.cos(angle) * 430, center + Math.sin(angle) * 430);
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(17, 10, 7, 0.42)';
    for (let i = 0; i < 12; i += 1) {
      const angle = (i / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(center + Math.cos(angle) * 150, center + Math.sin(angle) * 150);
      ctx.lineTo(center + Math.cos(angle + 0.18) * 320, center + Math.sin(angle + 0.18) * 320);
      ctx.lineTo(center + Math.cos(angle - 0.18) * 320, center + Math.sin(angle - 0.18) * 320);
      ctx.closePath();
      ctx.fill();
    }

    noise(ctx, width, height, 1200, 0.08);
  });
}

function addBox(scene, cameraBlockers, material, size, position, castsShadow = true) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  mesh.castShadow = castsShadow;
  mesh.receiveShadow = true;
  scene.add(mesh);
  cameraBlockers?.push(mesh);
  return mesh;
}

function addWall(scene, materials, cameraBlockers, room, side) {
  const [cx, cz] = room.center;
  const wallHeight = 12;
  const doorGap = room.id === 'photo' ? 12.5 : room.id === 'central' && side === 'north' ? 12.5 : 8.8;
  const doorHeight = room.id === 'photo' || (room.id === 'central' && side === 'north') ? 7.2 : 6.8;
  const thickness = 0.8;
  const hasDoor = room.doors.includes(side);
  const halfW = room.width / 2;
  const halfD = room.depth / 2;

  if (side === 'east' || side === 'west') {
    const x = cx + (side === 'east' ? halfW + thickness / 2 : -halfW - thickness / 2);
    if (hasDoor) {
      const segment = (room.depth - doorGap) / 2;
      addBox(scene, cameraBlockers, materials.wall, [thickness, wallHeight, segment], [x, wallHeight / 2, cz - halfD + segment / 2]);
      addBox(scene, cameraBlockers, materials.wall, [thickness, wallHeight, segment], [x, wallHeight / 2, cz + halfD - segment / 2]);
      addBox(scene, cameraBlockers, materials.wall, [thickness, wallHeight - doorHeight, doorGap], [x, doorHeight + (wallHeight - doorHeight) / 2, cz]);
    } else {
      addBox(scene, cameraBlockers, materials.wall, [thickness, wallHeight, room.depth], [x, wallHeight / 2, cz]);
    }
  }

  if (side === 'north' || side === 'south') {
    const z = cz + (side === 'south' ? halfD + thickness / 2 : -halfD - thickness / 2);
    if (hasDoor) {
      const segment = (room.width - doorGap) / 2;
      addBox(scene, cameraBlockers, materials.wall, [segment, wallHeight, thickness], [cx - halfW + segment / 2, wallHeight / 2, z]);
      addBox(scene, cameraBlockers, materials.wall, [segment, wallHeight, thickness], [cx + halfW - segment / 2, wallHeight / 2, z]);
      addBox(scene, cameraBlockers, materials.wall, [doorGap, wallHeight - doorHeight, thickness], [cx, doorHeight + (wallHeight - doorHeight) / 2, z]);
    } else {
      addBox(scene, cameraBlockers, materials.wall, [room.width, wallHeight, thickness], [cx, wallHeight / 2, z]);
    }
  }
}

function addChandelier(scene, materials, x, z, scale = 1) {
  const chandelier = new THREE.Group();
  chandelier.position.set(x, 9.2, z);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.15 * scale, 0.035, 12, 54), materials.brass);
  ring.rotation.x = Math.PI / 2;
  ring.castShadow = true;
  chandelier.add(ring);

  for (let i = 0; i < 8; i += 1) {
    const angle = (i / 8) * Math.PI * 2;
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.08 * scale, 10, 8), materials.lightBulb);
    bulb.position.set(Math.cos(angle) * 1.12 * scale, 0, Math.sin(angle) * 1.12 * scale);
    chandelier.add(bulb);
  }

  if (PERFORMANCE.decorativeLights) {
    const light = new THREE.PointLight(0xffcf8a, 1.9 * scale, 15 * scale, 1.35);
    chandelier.add(light);
  }
  scene.add(chandelier);
}

function addRoom(scene, materials, cameraBlockers, obstacles, room) {
  const [cx, cz] = room.center;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(room.width, room.depth), materials.floor);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(cx, 0, cz);
  floor.receiveShadow = true;
  scene.add(floor);

  [
    [room.width, 0.06, 0.16, cx, 0.04, cz - room.depth / 2],
    [room.width, 0.06, 0.16, cx, 0.04, cz + room.depth / 2],
    [0.16, 0.06, room.depth, cx - room.width / 2, 0.04, cz],
    [0.16, 0.06, room.depth, cx + room.width / 2, 0.04, cz],
  ].forEach(([sx, sy, sz, x, y, z]) => addBox(scene, null, materials.brass, [sx, sy, sz], [x, y, z], false));

  ['east', 'west', 'north', 'south'].forEach((side) => addWall(scene, materials, cameraBlockers, room, side));

  const skylightWidth = room.width * 0.42;
  const skylightDepth = room.depth * 0.42;
  const sideWidth = (room.width - skylightWidth) / 2;
  const sideDepth = (room.depth - skylightDepth) / 2;
  [
    [room.width, 0.52, sideDepth, cx, 12.25, cz - room.depth / 2 + sideDepth / 2],
    [room.width, 0.52, sideDepth, cx, 12.25, cz + room.depth / 2 - sideDepth / 2],
    [sideWidth, 0.52, skylightDepth, cx - room.width / 2 + sideWidth / 2, 12.25, cz],
    [sideWidth, 0.52, skylightDepth, cx + room.width / 2 - sideWidth / 2, 12.25, cz],
  ].forEach(([sx, sy, sz, x, y, z]) => addBox(scene, null, materials.ceiling, [sx, sy, sz], [x, y, z], false));

  const skylight = new THREE.Mesh(new THREE.BoxGeometry(skylightWidth, 0.08, skylightDepth), materials.glass);
  skylight.position.set(cx, 12.58, cz);
  scene.add(skylight);

  [
    [skylightWidth + 0.8, 0.12, 0.18, cx, 11.88, cz - skylightDepth / 2],
    [skylightWidth + 0.8, 0.12, 0.18, cx, 11.88, cz + skylightDepth / 2],
    [0.18, 0.12, skylightDepth + 0.8, cx - skylightWidth / 2, 11.88, cz],
    [0.18, 0.12, skylightDepth + 0.8, cx + skylightWidth / 2, 11.88, cz],
  ].forEach(([sx, sy, sz, x, y, z]) => addBox(scene, null, materials.brass, [sx, sy, sz], [x, y, z], false));

  const medallion = new THREE.Mesh(new THREE.TorusGeometry(Math.min(room.width, room.depth) * 0.18, 0.045, 10, 72), materials.brass);
  medallion.position.set(cx, 11.86, cz);
  medallion.rotation.x = Math.PI / 2;
  scene.add(medallion);

  const columnX = room.width / 2 - 3.2;
  const columnZ = room.depth / 2 - 3.2;
  [
    [cx - columnX, cz - columnZ],
    [cx + columnX, cz - columnZ],
    [cx - columnX, cz + columnZ],
    [cx + columnX, cz + columnZ],
  ].forEach(([x, z]) => {
    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.62, 10.8, 22), materials.column);
    column.position.set(x, 5.4, z);
    column.castShadow = true;
    column.receiveShadow = true;
    scene.add(column);
    cameraBlockers.push(column);
    addObstacle(obstacles, x, z, 0.74);

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.9, 0.44, 22), materials.brass);
    base.position.set(x, 0.22, z);
    base.castShadow = true;
    scene.add(base);
  });

  addChandelier(scene, materials, cx, cz, room.id === 'central' ? 1.18 : 0.92);

  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(5.8, 2.9),
    new THREE.MeshStandardMaterial({ map: createRoomLabelTexture(room), roughness: 0.58, metalness: 0.06 }),
  );
  label.position.set(cx, 7.5, cz - room.depth / 2 + 0.48);
  label.rotation.y = 0;
  scene.add(label);
}

function addCorridor(scene, materials, cameraBlockers, size, position) {
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(size[0], size[1]), materials.floor);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(position[0], 0.01, position[1]);
  floor.receiveShadow = true;
  scene.add(floor);

  addBox(scene, cameraBlockers, materials.wall, [size[0], 8.5, 0.48], [position[0], 4.25, position[1] - size[1] / 2], true);
  addBox(scene, cameraBlockers, materials.wall, [size[0], 8.5, 0.48], [position[0], 4.25, position[1] + size[1] / 2], true);
}

function addGalleryPassage(scene, materials, cameraBlockers, axis, center, length, width) {
  const facingX = axis === 'x';
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(facingX ? length : width, facingX ? width : length),
    materials.floor,
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(center[0], 0.02, center[1]);
  floor.receiveShadow = true;
  scene.add(floor);

  const runner = new THREE.Mesh(
    new THREE.PlaneGeometry(facingX ? length * 0.88 : width * 0.54, facingX ? width * 0.54 : length * 0.88),
    new THREE.MeshStandardMaterial({ color: 0x7b2032, roughness: 0.72, metalness: 0.02 }),
  );
  runner.rotation.x = -Math.PI / 2;
  runner.position.set(center[0], 0.06, center[1]);
  scene.add(runner);

  [-1, 1].forEach((side) => {
    const wallPosition = facingX
      ? [center[0], 4.25, center[1] + side * width / 2]
      : [center[0] + side * width / 2, 4.25, center[1]];
    const wallSize = facingX ? [length, 8.5, 0.48] : [0.48, 8.5, length];
    addBox(scene, cameraBlockers, materials.wall, wallSize, wallPosition, true);
  });

  const columnCount = Math.max(2, Math.floor(length / 5));
  for (let i = 0; i <= columnCount; i += 1) {
    const t = i / columnCount - 0.5;
    [-1, 1].forEach((side) => {
      const x = facingX ? center[0] + t * length : center[0] + side * (width / 2 - 0.72);
      const z = facingX ? center[1] + side * (width / 2 - 0.72) : center[1] + t * length;
      const column = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 6.2, 18), materials.column);
      column.position.set(x, 3.1, z);
      column.castShadow = true;
      column.receiveShadow = true;
      scene.add(column);
      cameraBlockers.push(column);
    });
  }

  const beamSize = facingX ? [length, 0.38, width] : [width, 0.38, length];
  addBox(scene, null, materials.ceiling, beamSize, [center[0], 7.35, center[1]], false);
}

function addClassicArtwork(scene, materials, artwork) {
  const group = new THREE.Group();
  group.position.set(...artwork.position);
  group.rotation.y = artwork.rotation;

  const canvas = new THREE.Mesh(
    new THREE.PlaneGeometry(artwork.width, artwork.height),
    new THREE.MeshStandardMaterial({
      map: createClassicArtworkTexture(artwork),
      roughness: 0.64,
      metalness: 0.04,
      emissive: 0x130b06,
      emissiveIntensity: 0.05,
    }),
  );
  canvas.castShadow = true;
  group.add(canvas);

  const frameDepth = 0.18;
  const frameWidth = 0.16;
  [
    { size: [artwork.width + frameWidth * 2, frameWidth, frameDepth], position: [0, artwork.height / 2 + frameWidth / 2, -0.08] },
    { size: [artwork.width + frameWidth * 2, frameWidth, frameDepth], position: [0, -artwork.height / 2 - frameWidth / 2, -0.08] },
    { size: [frameWidth, artwork.height + frameWidth * 2, frameDepth], position: [-artwork.width / 2 - frameWidth / 2, 0, -0.08] },
    { size: [frameWidth, artwork.height + frameWidth * 2, frameDepth], position: [artwork.width / 2 + frameWidth / 2, 0, -0.08] },
  ].forEach(({ size, position }) => {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(...size), materials.frame);
    frame.position.set(...position);
    frame.castShadow = true;
    group.add(frame);
  });

  const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, artwork.width * 0.46, 12), materials.brass);
  lamp.position.set(0, artwork.height / 2 + 0.42, 0.12);
  lamp.rotation.z = Math.PI / 2;
  group.add(lamp);

  if (PERFORMANCE.decorativeLights) {
    const glow = new THREE.PointLight(0xffcf8a, 0.75, 6, 1.8);
    glow.position.set(0, artwork.height / 2 + 0.22, 0.9);
    group.add(glow);
  }

  scene.add(group);
}

function addPortalArray(trigger) {
  const portalMaterial = new THREE.MeshBasicMaterial({
    map: createPortalGlyphTexture(),
    color: 0x7edfff,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const glyph = new THREE.Mesh(new THREE.CircleGeometry(1.92, PERFORMANCE.portalSegments), portalMaterial);
  glyph.rotation.x = -Math.PI / 2;
  glyph.userData.isPortalGlyph = true;
  glyph.userData.baseOpacity = 0.72;
  trigger.add(glyph);

  [
    [1.18, 1.28, 0.72, 0.9],
    [1.52, 1.62, 0.58, -1.25],
    [1.82, 1.92, 0.38, 1.65],
  ].forEach(([inner, outer, opacity, spin], index) => {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(inner, outer, PERFORMANCE.portalSegments),
      new THREE.MeshBasicMaterial({
        color: index === 1 ? 0xfff0b8 : 0x62d4ff,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.018 + index * 0.012;
    ring.userData.isPortalRing = true;
    ring.userData.baseOpacity = opacity;
    ring.userData.spin = spin;
    trigger.add(ring);
  });

  for (let i = 0; i < PERFORMANCE.portalShards; i += 1) {
    const angle = (i / PERFORMANCE.portalShards) * Math.PI * 2;
    const shard = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.035, 0.075),
      new THREE.MeshBasicMaterial({
        color: 0x9beaff,
        transparent: true,
        opacity: 0.68,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    shard.position.set(Math.cos(angle) * 1.46, 0.08, Math.sin(angle) * 1.46);
    shard.rotation.y = -angle;
    shard.userData.isPortalShard = true;
    shard.userData.seed = i * 0.82;
    trigger.add(shard);
  }

  const pulse = new THREE.Mesh(
    new THREE.RingGeometry(0.4, 0.46, PERFORMANCE.portalSegments),
    new THREE.MeshBasicMaterial({
      color: 0x8cecff,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  pulse.rotation.x = -Math.PI / 2;
  pulse.position.y = 0.08;
  pulse.userData.isPortalPulse = true;
  pulse.userData.baseOpacity = 0.55;
  trigger.add(pulse);
}

function addDoorSign(scene, materials, sign) {
  const group = new THREE.Group();
  group.position.set(...sign.position);
  group.rotation.y = sign.rotation;

  const board = new THREE.Mesh(
    new THREE.PlaneGeometry(5.8, 2.32),
    new THREE.MeshStandardMaterial({
      map: createDoorSignTexture(sign),
      roughness: 0.5,
      metalness: 0.08,
      emissive: 0x082a3d,
      emissiveIntensity: 0.16,
    }),
  );
  group.add(board);

  const frameDepth = 0.2;
  [
    { size: [6.08, 0.14, frameDepth], position: [0, 1.23, -0.08] },
    { size: [6.08, 0.14, frameDepth], position: [0, -1.23, -0.08] },
    { size: [0.14, 2.46, frameDepth], position: [-3.04, 0, -0.08] },
    { size: [0.14, 2.46, frameDepth], position: [3.04, 0, -0.08] },
  ].forEach(({ size, position }) => {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(...size), materials.brass);
    frame.position.set(...position);
    frame.castShadow = true;
    group.add(frame);
  });

  if (PERFORMANCE.decorativeLights) {
    const lamp = new THREE.PointLight(0x6ed6ff, 1.15, 7, 1.8);
    lamp.position.set(0, 0, 0.8);
    group.add(lamp);
  }

  scene.add(group);
}

function addPortico(scene, materials, cameraBlockers, portal) {
  const [cx, cz] = portal.center;
  const facingX = portal.axis === 'x';
  const side = portal.side;
  const across = portal.width / 2;
  const depth = portal.depth;
  const columnOffset = across - 0.85;
  const columnHeight = 6.4;
  const columnRadius = 0.34;
  const innerColumns = [-columnOffset, columnOffset];
  const approachOffsets = [-depth * 0.34, depth * 0.34];

  approachOffsets.forEach((offset) => {
    innerColumns.forEach((acrossOffset) => {
      const x = facingX ? cx + side * offset : cx + acrossOffset;
      const z = facingX ? cz + acrossOffset : cz + side * offset;

      const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.68, 0.42, 24), materials.column);
      plinth.position.set(x, 0.21, z);
      plinth.castShadow = true;
      plinth.receiveShadow = true;
      scene.add(plinth);
      cameraBlockers.push(plinth);

      const column = new THREE.Mesh(new THREE.CylinderGeometry(columnRadius, columnRadius * 1.18, columnHeight, 28), materials.column);
      column.position.set(x, columnHeight / 2 + 0.42, z);
      column.castShadow = true;
      column.receiveShadow = true;
      scene.add(column);
      cameraBlockers.push(column);

      const capital = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.32, 1.05), materials.brass);
      capital.position.set(x, columnHeight + 0.76, z);
      capital.castShadow = true;
      scene.add(capital);
    });
  });

  const lintelSize = facingX ? [depth + 1.2, 0.58, portal.width + 1.25] : [portal.width + 1.25, 0.58, depth + 1.2];
  const lintel = addBox(scene, cameraBlockers, materials.column, lintelSize, [cx, 7.12, cz], true);
  lintel.receiveShadow = true;

  const archRadius = portal.width / 2;
  const arch = new THREE.Mesh(new THREE.TorusGeometry(archRadius, 0.18, 14, 72, Math.PI), materials.brass);
  arch.position.set(cx, 6.22, cz);
  if (facingX) {
    arch.rotation.set(Math.PI / 2, 0, Math.PI / 2);
  } else {
    arch.rotation.set(Math.PI / 2, 0, 0);
  }
  arch.scale.y = 0.54;
  arch.castShadow = true;
  scene.add(arch);

  const pediment = new THREE.Mesh(new THREE.ConeGeometry(portal.width * 0.56, 1.35, 3), materials.brass);
  pediment.position.set(cx, 8.08, cz);
  pediment.rotation.z = Math.PI / 6;
  if (facingX) {
    pediment.rotation.y = Math.PI / 2;
    pediment.scale.z = 0.36;
  } else {
    pediment.scale.z = 0.36;
  }
  pediment.castShadow = true;
  scene.add(pediment);

  const threshold = new THREE.Mesh(
    new THREE.PlaneGeometry(facingX ? depth + 1.6 : portal.width + 1.4, facingX ? portal.width + 1.4 : depth + 1.6),
    new THREE.MeshStandardMaterial({ color: 0x6c1f2d, roughness: 0.64, metalness: 0.04 }),
  );
  threshold.rotation.x = -Math.PI / 2;
  threshold.position.set(cx, 0.055, cz);
  scene.add(threshold);

  if (PERFORMANCE.decorativeLights) {
    const light = new THREE.PointLight(0xffd28a, 0.9, 8, 1.7);
    light.position.set(cx, 6.1, cz);
    scene.add(light);
  }
}

function addMosaic(scene, position, radius, accent) {
  const mosaic = new THREE.Mesh(
    new THREE.CircleGeometry(radius, 96),
    new THREE.MeshStandardMaterial({
      map: createMosaicTexture(accent),
      roughness: 0.44,
      metalness: 0.08,
    }),
  );
  mosaic.rotation.x = -Math.PI / 2;
  mosaic.position.set(position[0], 0.035, position[1]);
  mosaic.receiveShadow = true;
  scene.add(mosaic);
}

function addMuseumBench(scene, materials, obstacles, position, rotation = 0) {
  const group = new THREE.Group();
  group.position.set(position[0], 0, position[1]);
  group.rotation.y = rotation;

  const wood = new THREE.MeshStandardMaterial({ color: 0x5b3320, roughness: 0.46, metalness: 0.08 });
  const seat = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.26, 0.72), wood);
  seat.position.y = 0.78;
  seat.castShadow = true;
  group.add(seat);

  const back = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.24, 0.24), wood);
  back.position.set(0, 1.18, 0.34);
  back.rotation.x = -0.18;
  back.castShadow = true;
  group.add(back);

  [-1.55, 1.55].forEach((x) => {
    [-0.24, 0.24].forEach((z) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.075, 0.72, 10), materials.brass);
      leg.position.set(x, 0.38, z);
      leg.castShadow = true;
      group.add(leg);
    });
  });

  scene.add(group);
  addObstacle(obstacles, position[0], position[1], 1.9);
}

function addRopeBarrier(scene, materials, obstacles, points) {
  const postMaterial = materials.brass;
  const ropeMaterial = new THREE.MeshStandardMaterial({ color: 0x8b1f2e, roughness: 0.5, metalness: 0.18 });
  const postPositions = points.map(([x, z]) => new THREE.Vector3(x, 0, z));

  postPositions.forEach((point) => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.2, 12), postMaterial);
    post.position.set(point.x, 0.6, point.z);
    post.castShadow = true;
    scene.add(post);

    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 10), postMaterial);
    cap.position.set(point.x, 1.23, point.z);
    cap.castShadow = true;
    scene.add(cap);
  });

  for (let i = 0; i < postPositions.length; i += 1) {
    const start = postPositions[i];
    const end = postPositions[(i + 1) % postPositions.length];
    const mid = start.clone().add(end).multiplyScalar(0.5);
    const distance = start.distanceTo(end);
    const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, distance, 10), ropeMaterial);
    rope.position.set(mid.x, 1.03, mid.z);
    rope.rotation.z = Math.PI / 2;
    rope.rotation.y = Math.atan2(end.z - start.z, end.x - start.x);
    rope.castShadow = true;
    scene.add(rope);
  }

  postPositions.forEach((point) => addObstacle(obstacles, point.x, point.z, 0.42));
}

function addGlassCase(scene, materials, obstacles, position, rotation = 0, kind = 'artifact') {
  const group = new THREE.Group();
  group.position.set(position[0], 0, position[1]);
  group.rotation.y = rotation;

  const base = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.76, 1.5), materials.column);
  base.position.y = 0.38;
  base.castShadow = true;
  base.receiveShadow = true;
  group.add(base);

  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(2.22, 1.45, 1.16),
    new THREE.MeshPhysicalMaterial({
      color: 0xc7e6ff,
      roughness: 0.12,
      transmission: 0.45,
      transparent: true,
      opacity: 0.34,
      metalness: 0,
    }),
  );
  glass.position.y = 1.48;
  group.add(glass);

  const artifactMaterial = new THREE.MeshStandardMaterial({ color: kind === 'finance' ? 0xd0a35a : kind === 'music' ? 0x7bb7ff : 0xf2d6a2, roughness: 0.42, metalness: 0.25 });
  let artifact;
  if (kind === 'finance') {
    artifact = new THREE.Mesh(new THREE.TorusKnotGeometry(0.34, 0.08, 64, 10), artifactMaterial);
  } else if (kind === 'music') {
    artifact = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.055, 12, 48), artifactMaterial);
  } else if (kind === 'photo') {
    artifact = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.48, 0.36), artifactMaterial);
  } else {
    artifact = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 1), artifactMaterial);
  }
  artifact.position.y = 1.45;
  artifact.castShadow = true;
  group.add(artifact);

  if (PERFORMANCE.decorativeLights) {
    const light = new THREE.PointLight(0xffe0a8, 0.9, 4, 1.6);
    light.position.set(0, 2.2, 0);
    group.add(light);
  }

  scene.add(group);
  addObstacle(obstacles, position[0], position[1], 1.45);
  return group;
}

function addGrandVase(scene, materials, obstacles, position, rotation = 0) {
  const group = new THREE.Group();
  group.position.set(position[0], 0, position[1]);
  group.rotation.y = rotation;

  const vase = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.52, 1.75, 24), new THREE.MeshStandardMaterial({ color: 0x285f78, roughness: 0.34, metalness: 0.22 }));
  vase.position.y = 0.98;
  vase.castShadow = true;
  group.add(vase);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.26, 0.56, 24), new THREE.MeshStandardMaterial({ color: 0x2f7590, roughness: 0.3, metalness: 0.18 }));
  neck.position.y = 2.08;
  neck.castShadow = true;
  group.add(neck);

  for (let i = 0; i < 5; i += 1) {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.018, 1.4, 8), new THREE.MeshStandardMaterial({ color: 0x365c31, roughness: 0.7 }));
    stem.position.set((i - 2) * 0.12, 2.75, Math.sin(i) * 0.08);
    stem.rotation.z = (i - 2) * 0.12;
    group.add(stem);

    const plume = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.62, 8), new THREE.MeshStandardMaterial({ color: 0xd8b16d, roughness: 0.78 }));
    plume.position.set((i - 2) * 0.22, 3.42, Math.sin(i) * 0.16);
    plume.rotation.z = (i - 2) * 0.18;
    group.add(plume);
  }

  scene.add(group);
  addObstacle(obstacles, position[0], position[1], 0.86);
}

function addThemedSculpture(scene, materials, obstacles, position, kind = 'tech') {
  const group = new THREE.Group();
  group.position.set(position[0], 0, position[1]);

  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 0.85, 28), materials.column);
  plinth.position.y = 0.42;
  plinth.castShadow = true;
  plinth.receiveShadow = true;
  group.add(plinth);

  const metal = new THREE.MeshStandardMaterial({
    color: kind === 'tech' ? 0x9fc8d6 : kind === 'music' ? 0xd0a35a : kind === 'finance' ? 0xc58a3a : 0xf2f0e5,
    roughness: 0.28,
    metalness: 0.62,
  });

  const main = new THREE.Mesh(new THREE.TorusKnotGeometry(0.56, 0.12, 80, 12), metal);
  main.position.y = 1.55;
  main.castShadow = true;
  group.add(main);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.88, 0.035, 12, 72), materials.brass);
  ring.position.y = 1.55;
  ring.rotation.x = Math.PI / 2.6;
  ring.castShadow = true;
  group.add(ring);

  if (PERFORMANCE.decorativeLights) {
    const light = new THREE.PointLight(0xffd28a, 0.75, 5, 1.8);
    light.position.set(0, 2.4, 0);
    group.add(light);
  }

  scene.add(group);
  addObstacle(obstacles, position[0], position[1], 1.2);
  return group;
}

function addMuseumDecor(scene, materials, obstacles) {
  [
    [0, 0, 5.4, '#74d9ff'],
    [42, 0, 4.6, '#d0a35a'],
    [-42, 0, 4.6, '#7bb7ff'],
    [0, -48, 5.2, '#8fdfff'],
    [0, -72, 5.8, '#74d9ff'],
    [0, -91, 4.8, '#cfefff'],
    [0, 42, 4.6, '#f4c36a'],
  ].forEach(([x, z, radius, accent]) => addMosaic(scene, [x, z], radius, accent));

  addMuseumBench(scene, materials, obstacles, [7.6, 7.4], Math.PI / 2);
  addMuseumBench(scene, materials, obstacles, [-7.6, 7.4], -Math.PI / 2);
  addMuseumBench(scene, materials, obstacles, [42, 6.6], 0);
  addMuseumBench(scene, materials, obstacles, [-42, 6.6], 0);
  addMuseumBench(scene, materials, obstacles, [14.5, -43.5], Math.PI / 2);
  addMuseumBench(scene, materials, obstacles, [-14.5, -63], Math.PI / 2);
  addMuseumBench(scene, materials, obstacles, [14.5, -84], Math.PI / 2);
  addMuseumBench(scene, materials, obstacles, [-7.2, 42], Math.PI / 2);

  addGlassCase(scene, materials, obstacles, [7.4, -5.4], Math.PI / 8, 'artifact');
  addGlassCase(scene, materials, obstacles, [42, 0], 0, 'finance');
  addGlassCase(scene, materials, obstacles, [-42, 0], 0, 'music');
  addGlassCase(scene, materials, obstacles, [0, -50], Math.PI / 2, 'photo');
  addGlassCase(scene, materials, obstacles, [0, -72], Math.PI / 2, 'photo');

  addThemedSculpture(scene, materials, obstacles, [0, 42], 'tech');
  addThemedSculpture(scene, materials, obstacles, [49.2, 4.8], 'finance');
  addThemedSculpture(scene, materials, obstacles, [-49.2, 4.8], 'music');

  addGrandVase(scene, materials, obstacles, [-9.6, -9.2], -0.4);
  addGrandVase(scene, materials, obstacles, [9.6, -9.2], 0.4);
  addGrandVase(scene, materials, obstacles, [50.5, -7.4], 0.2);
  addGrandVase(scene, materials, obstacles, [-50.5, -7.4], -0.2);
  addGrandVase(scene, materials, obstacles, [-17.5, -38.5], 0);
  addGrandVase(scene, materials, obstacles, [17.5, -38.5], 0);
  addGrandVase(scene, materials, obstacles, [-17.5, -91.5], 0);
  addGrandVase(scene, materials, obstacles, [17.5, -91.5], 0);
  addGrandVase(scene, materials, obstacles, [8.4, 49.5], Math.PI);

  addRopeBarrier(scene, materials, obstacles, [
    [-2.2, -3.8],
    [2.2, -3.8],
    [2.2, 1.2],
    [-2.2, 1.2],
  ]);
  addRopeBarrier(scene, materials, obstacles, [
    [39.4, -2.8],
    [44.6, -2.8],
    [44.6, 2.8],
    [39.4, 2.8],
  ]);
  addRopeBarrier(scene, materials, obstacles, [
    [-44.6, -2.8],
    [-39.4, -2.8],
    [-39.4, 2.8],
    [-44.6, 2.8],
  ]);
}

function createGallery(scene, materials, cameraBlockers, obstacles, animatedDoves) {
  rooms.forEach((room) => addRoom(scene, materials, cameraBlockers, obstacles, room));

  addGalleryPassage(scene, materials, cameraBlockers, 'x', [22.2, 0], 14, 8.8);
  addGalleryPassage(scene, materials, cameraBlockers, 'x', [-22.2, 0], 14, 8.8);
  addGalleryPassage(scene, materials, cameraBlockers, 'z', [0, -22.2], 14, 14);
  addGalleryPassage(scene, materials, cameraBlockers, 'z', [0, 22.2], 14, 8.8);
  portals.forEach((portal) => addPortico(scene, materials, cameraBlockers, portal));

  const doveMaterials = createDoveMaterial();
  const statueBase = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.55, 0.9, 28), materials.column);
  statueBase.position.set(0, 0.45, -1.4);
  statueBase.castShadow = true;
  statueBase.receiveShadow = true;
  scene.add(statueBase);
  cameraBlockers.push(statueBase);

  const doveStatue = createDove(doveMaterials, 1.75);
  doveStatue.position.set(0, 1.48, -1.4);
  doveStatue.rotation.set(0.05, -0.7, 0);
  scene.add(doveStatue);

  [
    [-4.2, 8.2, -8.5, 0.7, 0.78],
    [5.2, 9.1, 4.8, -0.8, 0.66],
    [38.8, 8.2, 1.5, 1.2, 0.58],
    [-41.8, 8.6, -1.6, -1.1, 0.58],
    [2.5, 9.3, -38.5, 0.2, 0.62],
  ].forEach(([x, y, z, angle, scale], index) => {
    const dove = createDove(doveMaterials, scale);
    dove.position.set(x, y, z);
    dove.rotation.y = angle;
    dove.userData = { seed: index * 1.8, base: new THREE.Vector3(x, y, z) };
    scene.add(dove);
    animatedDoves.push(dove);
  });

  classicArtworks.forEach((artwork) => addClassicArtwork(scene, materials, artwork));
  doorSigns.forEach((sign) => addDoorSign(scene, materials, sign));
  addMuseumDecor(scene, materials, obstacles);
}

function createExhibit(scene, exhibit, materials, cameraBlockers) {
  const group = new THREE.Group();
  group.position.set(...exhibit.position);
  group.rotation.y = exhibit.rotation;
  group.userData.exhibit = exhibit;

  let map = createCategoryTexture(exhibit);
  if (exhibit.image) {
    map = new THREE.TextureLoader().load(exhibit.image);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 8;
  }

  const canvasMaterial = new THREE.MeshStandardMaterial({
    map,
    roughness: 0.68,
    metalness: 0.05,
    emissive: 0x1d1212,
    emissiveIntensity: 0.08,
  });

  const canvas = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 4.05), canvasMaterial);
  canvas.userData.exhibit = exhibit;
  canvas.castShadow = true;
  group.add(canvas);

  [
    { size: [5.84, 0.18, 0.22], position: [0, 2.1, -0.1] },
    { size: [5.84, 0.18, 0.22], position: [0, -2.1, -0.1] },
    { size: [0.18, 4.25, 0.22], position: [-2.92, 0, -0.1] },
    { size: [0.18, 4.25, 0.22], position: [2.92, 0, -0.1] },
  ].forEach(({ size, position }) => {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(...size), materials.frame);
    frame.position.set(...position);
    frame.castShadow = true;
    group.add(frame);
  });

  if (exhibit.image) {
    const plate = new THREE.Mesh(
      new THREE.PlaneGeometry(2.8, 0.52),
      new THREE.MeshStandardMaterial({
        map: createCategoryTexture({ ...exhibit, subtitle: 'Gallery' }),
        roughness: 0.52,
        metalness: 0.08,
      }),
    );
    plate.position.set(0, -2.85, 0.08);
    plate.scale.y = 0.38;
    group.add(plate);
  }

  const front = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), exhibit.rotation).normalize();
  const triggerPosition = new THREE.Vector3(...exhibit.position).addScaledVector(front, 3.45);
  triggerPosition.y = 0.045;

  const trigger = new THREE.Group();
  trigger.position.copy(triggerPosition);
  trigger.userData.exhibit = exhibit;

  addPortalArray(trigger);

  if (PERFORMANCE.decorativeLights) {
    const uplight = new THREE.PointLight(0x53c8ff, 1.15, 6, 1.85);
    uplight.position.set(0, 0.45, 0);
    trigger.add(uplight);
  }

  scene.add(group);
  scene.add(trigger);
  cameraBlockers.push(group);
  return { group, canvas, trigger, triggerPosition, triggerRadius: 2.05, data: exhibit };
}

function disposeScene(scene) {
  scene.traverse((object) => {
    object.geometry?.dispose();
    if (object.material) {
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => {
        Object.values(material).forEach((value) => value?.isTexture && value.dispose());
        material.dispose();
      });
    }
  });
}

function usePressedKeys() {
  const keysRef = React.useRef(new Set());

  React.useEffect(() => {
    const down = (event) => keysRef.current.add(event.key.toLowerCase());
    const up = (event) => keysRef.current.delete(event.key.toLowerCase());
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  return keysRef;
}

function MuseumExperience() {
  const mountRef = React.useRef(null);
  const keysRef = usePressedKeys();
  const [selectedExhibit, setSelectedExhibit] = React.useState(null);
  const [webglUnavailable, setWebglUnavailable] = React.useState(false);

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x15110f);
    scene.fog = new THREE.Fog(0x15110f, 26, 72);

    const camera = new THREE.PerspectiveCamera(54, mount.clientWidth / mount.clientHeight, 0.1, 160);
    let renderer;

    try {
      renderer = new THREE.WebGLRenderer({ antialias: PERFORMANCE.antialias, powerPreference: 'high-performance' });
    } catch (error) {
      document.body.dataset.runtimeError = error.message;
      setWebglUnavailable(true);
      return undefined;
    }

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, PERFORMANCE.pixelRatio));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = PERFORMANCE.shadows;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    mount.appendChild(renderer.domElement);

    const cameraBlockers = [];
    const obstacles = [];
    const animatedDoves = [];
    const materials = {
      floor: new THREE.MeshStandardMaterial({ map: createMarbleTexture(), roughness: 0.46, metalness: 0.08 }),
      wall: new THREE.MeshStandardMaterial({ map: createPlasterTexture(), roughness: 0.82, metalness: 0.02 }),
      ceiling: new THREE.MeshStandardMaterial({ color: 0xa98f6c, roughness: 0.8 }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0xc7e6ff, roughness: 0.18, transmission: 0.34, transparent: true, opacity: 0.38 }),
      column: new THREE.MeshStandardMaterial({ color: 0xb8a27f, roughness: 0.62, metalness: 0.05 }),
      brass: new THREE.MeshStandardMaterial({ color: 0xbc8a3b, roughness: 0.32, metalness: 0.7 }),
      lightBulb: new THREE.MeshBasicMaterial({ color: 0xfff2c5 }),
      frame: new THREE.MeshStandardMaterial({ color: 0x4d2517, roughness: 0.45, metalness: 0.18 }),
    };

    scene.add(new THREE.HemisphereLight(0xfff2d8, 0x30251c, 1.4));
    const sun = new THREE.DirectionalLight(0xffecd1, 3.1);
    sun.position.set(-8, 18, 12);
    sun.castShadow = PERFORMANCE.shadows;
    sun.shadow.mapSize.set(512, 512);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 70;
    sun.shadow.camera.left = -24;
    sun.shadow.camera.right = 24;
    sun.shadow.camera.top = 28;
    sun.shadow.camera.bottom = -28;
    scene.add(sun);

    createGallery(scene, materials, cameraBlockers, obstacles, animatedDoves);
    const avatar = createCubistAvatar();
    scene.add(avatar);
    const npcVisitors = createNpcVisitors(scene);
    const exhibitMeshes = exhibits.map((exhibit) => createExhibit(scene, exhibit, materials, cameraBlockers));

    const cameraRaycaster = new THREE.Raycaster();
    const pointer = { dragging: false, lastX: 0, lastY: 0, moved: 0 };
    let activeTriggerId = null;
    let suppressedTriggerId = null;

    let yaw = Math.PI;
    let pitch = 0.5;
    const velocity = new THREE.Vector3();
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();
    const nextPosition = new THREE.Vector3();
    const target = new THREE.Vector3();
    const desiredCamera = new THREE.Vector3();
    const actualCamera = new THREE.Vector3();
    const cameraDirection = new THREE.Vector3();
    const clock = new THREE.Clock();
    let cameraCollisionTick = 1;
    let npcTick = 0;
    let portalTick = 0;

    const isWalkable = (position) =>
      walkZones.some(
        (zone) => position.x >= zone.xMin && position.x <= zone.xMax && position.z >= zone.zMin && position.z <= zone.zMax,
      ) && isClearOfObstacles(position, obstacles);

    const handlePointerDown = (event) => {
      pointer.dragging = true;
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
      pointer.moved = 0;
      renderer.domElement.setPointerCapture?.(event.pointerId);
    };

    const handlePointerMove = (event) => {
      if (!pointer.dragging) {
        return;
      }
      const dx = event.clientX - pointer.lastX;
      const dy = event.clientY - pointer.lastY;
      pointer.moved += Math.abs(dx) + Math.abs(dy);
      yaw -= dx * 0.0048;
      pitch = THREE.MathUtils.clamp(pitch + dy * 0.003, -0.72, 1.04);
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
    };

    const handlePointerUp = (event) => {
      pointer.dragging = false;
      renderer.domElement.releasePointerCapture?.(event.pointerId);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        suppressedTriggerId = activeTriggerId;
        activeTriggerId = null;
        setSelectedExhibit(null);
      }
    };

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    let frameId = 0;
    const animate = () => {
      const delta = Math.min(clock.getDelta(), PERFORMANCE.maxDelta);
      const elapsed = clock.elapsedTime;
      const keys = keysRef.current;
      cameraCollisionTick += delta;
      npcTick += delta;
      portalTick += delta;

      forward.set(-Math.sin(yaw), 0, -Math.cos(yaw));
      right.set(Math.cos(yaw), 0, -Math.sin(yaw));
      velocity.set(0, 0, 0);

      if (keys.has('w') || keys.has('arrowup')) velocity.add(forward);
      if (keys.has('s') || keys.has('arrowdown')) velocity.sub(forward);
      if (keys.has('a') || keys.has('arrowleft')) velocity.sub(right);
      if (keys.has('d') || keys.has('arrowright')) velocity.add(right);
      if (keys.has('q')) yaw += delta * 1.6;
      if (keys.has('e')) yaw -= delta * 1.6;

      if (velocity.lengthSq() > 0) {
        velocity.normalize().multiplyScalar(6.8 * delta);
        nextPosition.copy(avatar.position).add(velocity);
        if (isWalkable(nextPosition)) {
          avatar.position.copy(nextPosition);
        } else {
          nextPosition.copy(avatar.position);
          nextPosition.x += velocity.x;
          if (isWalkable(nextPosition)) {
            avatar.position.x = nextPosition.x;
          }
          nextPosition.copy(avatar.position);
          nextPosition.z += velocity.z;
          if (isWalkable(nextPosition)) {
            avatar.position.z = nextPosition.z;
          }
        }
        avatar.rotation.y = Math.atan2(velocity.x, velocity.z) + Math.PI;
        avatar.position.y = Math.sin(elapsed * 12) * 0.035;
      } else {
        avatar.position.y = Math.sin(elapsed * 2.3) * 0.012;
      }

      const cameraOrbitDistance = 11.5;
      const horizontalDistance = Math.max(2.4, Math.cos(pitch) * cameraOrbitDistance);
      const lookHeight = pitch < -0.1 ? THREE.MathUtils.mapLinear(pitch, -0.72, -0.1, 8.6, 2.6) : 2.15;
      target.copy(avatar.position).add(new THREE.Vector3(0, lookHeight, 0));
      desiredCamera.set(
        avatar.position.x + Math.sin(yaw) * horizontalDistance,
        avatar.position.y + Math.sin(pitch) * cameraOrbitDistance + 2.1,
        avatar.position.z + Math.cos(yaw) * horizontalDistance,
      );
      desiredCamera.y = THREE.MathUtils.clamp(desiredCamera.y, 0.9, 11.65);

      if (cameraCollisionTick > 0.08) {
        cameraCollisionTick = 0;
        cameraDirection.copy(desiredCamera).sub(target);
        const cameraDistance = cameraDirection.length();
        cameraDirection.normalize();
        cameraRaycaster.set(target, cameraDirection);
        const cameraHits = cameraRaycaster.intersectObjects(cameraBlockers, true);
        const blockingHit = cameraHits.find((hit) => hit.distance > 1.2 && hit.distance < cameraDistance);
        if (blockingHit) {
          actualCamera.copy(target).add(cameraDirection.multiplyScalar(Math.max(2.8, blockingHit.distance - 0.5)));
        } else {
          actualCamera.copy(desiredCamera);
        }
      }

      camera.position.lerp(actualCamera, 0.16);
      camera.lookAt(target);

      animatedDoves.forEach((dove, index) => {
        const { base, seed } = dove.userData;
        dove.position.set(
          base.x + Math.sin(elapsed * 0.42 + seed) * 1.1,
          base.y + Math.sin(elapsed * 1.2 + seed) * 0.28,
          base.z + Math.cos(elapsed * 0.36 + seed) * 1.2,
        );
        dove.rotation.y += delta * (0.18 + index * 0.04);
        dove.children.forEach((child) => {
          if (child.userData.isWing) {
            child.rotation.z = Math.sin(elapsed * 5.8 + seed) * 0.32 + (child.position.z > 0 ? 0.42 : -0.42);
          }
        });
      });

      if (npcTick > 0.05) {
        const npcDelta = npcTick;
        npcTick = 0;
        npcVisitors.forEach((npc) => {
          const state = npc.userData.npc;
          const targetPoint = state.route[state.current];
          const toTarget = targetPoint.position.clone().sub(npc.position);
          toTarget.y = 0;
          const distance = toTarget.length();

          if (state.wait > 0) {
            state.wait -= npcDelta;
            const lookVector = targetPoint.lookAt.clone().sub(npc.position);
            if (lookVector.lengthSq() > 0.01) {
              npc.rotation.y = Math.atan2(lookVector.x, lookVector.z);
            }
          } else if (distance < 0.18) {
            if (state.arrived) {
              state.current = (state.current + 1) % state.route.length;
              state.arrived = false;
            } else {
              state.wait = targetPoint.dwell;
              state.arrived = true;
            }
          } else {
            const step = Math.min(distance, state.speed * npcDelta);
            toTarget.normalize();
            npc.position.addScaledVector(toTarget, step);
            npc.rotation.y = Math.atan2(toTarget.x, toTarget.z);
            state.arrived = false;
          }

          const walking = state.wait <= 0 && distance >= 0.18;
          npc.position.y = walking ? Math.sin(elapsed * 8.5 + state.seed) * 0.018 : Math.sin(elapsed * 1.8 + state.seed) * 0.006;
          npc.children.forEach((child, childIndex) => {
            if (child.userData.isArm) {
              child.rotation.z = (child.position.x < 0 ? -0.16 : 0.16) + Math.sin(elapsed * 6 + state.seed + childIndex) * (walking ? 0.16 : 0.035);
            }
            if (child.userData.isLeg) {
              child.rotation.z = Math.sin(elapsed * 7 + state.seed + childIndex * Math.PI) * (walking ? 0.13 : 0.02);
            }
          });
        });
      }

      let steppedExhibit = null;
      exhibitMeshes.forEach(({ trigger, triggerPosition, triggerRadius, data }) => {
        const distance = avatar.position.distanceTo(triggerPosition);
        const isActive = distance < triggerRadius;
        if (isActive) {
          steppedExhibit = data;
        }
        const shouldAnimatePortal = isActive || distance < 12 || portalTick > 0.08;
        trigger.children.forEach((child, childIndex) => {
          if (!shouldAnimatePortal) {
            return;
          }
          if (!child.material) {
            if (child.isLight) {
              child.intensity = isActive ? 2.1 : 1.05 + Math.sin(elapsed * 2.4 + triggerPosition.x) * 0.18;
            }
            return;
          }
          const wave = Math.sin(elapsed * 2.6 + triggerPosition.x * 0.14 + childIndex) * 0.12;
          const baseOpacity = child.userData.baseOpacity || 0.5;

          if (child.userData.isPortalGlyph) {
            child.rotation.z += delta * (isActive ? 0.7 : 0.35);
            child.material.opacity = isActive ? Math.min(0.95, baseOpacity + 0.16 + wave * 0.35) : Math.max(0.34, baseOpacity + wave * 0.28);
            child.scale.setScalar(isActive ? 1.08 + Math.sin(elapsed * 4.6) * 0.02 : 1 + Math.sin(elapsed * 2.2 + triggerPosition.z) * 0.025);
            return;
          }

          if (child.userData.isPortalRing) {
            child.rotation.z += delta * child.userData.spin;
            child.material.opacity = isActive ? Math.min(0.96, baseOpacity + 0.18 + wave * 0.35) : Math.max(0.22, baseOpacity + wave * 0.25);
            child.scale.setScalar(isActive ? 1.08 + Math.sin(elapsed * 3.2 + childIndex) * 0.025 : 1 + Math.sin(elapsed * 1.8 + childIndex) * 0.018);
            return;
          }

          if (child.userData.isPortalShard) {
            child.position.y = 0.1 + Math.sin(elapsed * 2.8 + child.userData.seed) * 0.055;
            child.rotation.y += delta * (isActive ? 2.4 : 1.1);
            child.material.opacity = isActive ? 0.86 + Math.sin(elapsed * 5 + child.userData.seed) * 0.08 : 0.46 + Math.sin(elapsed * 3 + child.userData.seed) * 0.08;
            return;
          }

          if (child.userData.isPortalPulse) {
            const pulse = (elapsed * (isActive ? 1.1 : 0.72) + triggerPosition.x * 0.03) % 1;
            child.scale.setScalar(0.55 + pulse * 3.1);
            child.material.opacity = (isActive ? 0.72 : 0.4) * (1 - pulse);
            return;
          }

          child.material.opacity = isActive ? Math.min(0.95, baseOpacity + 0.18 + wave * 0.5) : Math.max(0.18, baseOpacity + wave * 0.55);
          child.scale.setScalar(isActive ? 1.08 + Math.sin(elapsed * 5.4) * 0.04 : 1 + Math.sin(elapsed * 2.2 + triggerPosition.z) * 0.08);
        });
      });
      if (portalTick > 0.08) {
        portalTick = 0;
      }

      if (steppedExhibit) {
        if (suppressedTriggerId && suppressedTriggerId !== steppedExhibit.id) {
          suppressedTriggerId = null;
        }
        if (steppedExhibit.id !== activeTriggerId && suppressedTriggerId !== steppedExhibit.id) {
          activeTriggerId = steppedExhibit.id;
          setSelectedExhibit(steppedExhibit);
        }
      } else if (activeTriggerId) {
        activeTriggerId = null;
        suppressedTriggerId = null;
        setSelectedExhibit(null);
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      disposeScene(scene);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [keysRef]);

  const setTouchKey = (key, pressed) => {
    if (pressed) {
      keysRef.current.add(key);
    } else {
      keysRef.current.delete(key);
    }
  };

  return (
    <main className="game-shell">
      <div ref={mountRef} className="game-canvas" />

      {webglUnavailable && (
        <div className="fallback-stage" aria-label="WebGL fallback museum preview">
          <div className="fallback-hall">
            <div className="fallback-skylight" />
            <div className="fallback-avatar">
              <span />
              <strong />
            </div>
            <div className="fallback-dove" />
            <div className="fallback-plaque left">音乐</div>
            <div className="fallback-plaque center">摄影</div>
            <div className="fallback-plaque right">股票</div>
          </div>
          <p>当前浏览器环境禁用了 WebGL，普通 Chrome/Safari 窗口可进入 3D 展馆。</p>
        </div>
      )}

      <header className="hud-top">
        <div>
          <p>Atelier Museum</p>
          <h1>{profile.name}</h1>
        </div>
      </header>

      <div className="control-hint">
        <span>WASD</span>
        <span>拖拽视角</span>
        <span>走到光圈</span>
        <span>进入房间</span>
      </div>

      <div className="touch-pad" aria-label="Touch movement controls">
        <button onPointerDown={() => setTouchKey('w', true)} onPointerUp={() => setTouchKey('w', false)}>
          ↑
        </button>
        <button onPointerDown={() => setTouchKey('a', true)} onPointerUp={() => setTouchKey('a', false)}>
          ←
        </button>
        <button onPointerDown={() => setTouchKey('s', true)} onPointerUp={() => setTouchKey('s', false)}>
          ↓
        </button>
        <button onPointerDown={() => setTouchKey('d', true)} onPointerUp={() => setTouchKey('d', false)}>
          →
        </button>
      </div>

      {selectedExhibit && (
        <div className="detail-overlay">
          <article className="detail-card">
            <p>{selectedExhibit.subtitle}</p>
            <h2>{selectedExhibit.detailsTitle}</h2>
            {selectedExhibit.details.map((line) => (
              <span key={line}>{line}</span>
            ))}
            {selectedExhibit.links?.length > 0 && (
              <div className="detail-links">
                {selectedExhibit.links.map((link) => (
                  <a key={`${selectedExhibit.id}-${link.label}`} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </article>
        </div>
      )}
    </main>
  );
}

try {
  const rootElement = document.getElementById('root');
  ReactDOMClient.createRoot(rootElement).render(<MuseumExperience />);
} catch (error) {
  document.body.dataset.runtimeError = error.message;
}
