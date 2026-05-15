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
  { id: 'central', title: '身份厅', subtitle: 'Portrait', center: [-24, -38], width: 26, depth: 24, doors: ['east'] },
  { id: 'tech', title: '工程厅', subtitle: 'Engineering', center: [24, -12], width: 28, depth: 24, doors: ['west'] },
  { id: 'music', title: '音乐厅', subtitle: 'Music', center: [-31, 16], width: 42, depth: 34, doors: ['east'] },
  { id: 'finance', title: '投资厅', subtitle: 'Finance', center: [24, 44], width: 28, depth: 24, doors: ['west'] },
  { id: 'photo', title: '摄影厅', subtitle: 'Photography', center: [-28, 82], width: 36, depth: 40, doors: ['east'] },
];

const walkZones = [
  { xMin: -7.2, xMax: 7.2, zMin: -62, zMax: 108 },
  { xMin: -11.8, xMax: 11.8, zMin: -42.4, zMax: -33.6 },
  { xMin: -11.8, xMax: 11.8, zMin: -16.4, zMax: -7.6 },
  { xMin: -11.8, xMax: 11.8, zMin: 11.6, zMax: 20.4 },
  { xMin: -11.8, xMax: 11.8, zMin: 39.6, zMax: 48.4 },
  { xMin: -11.8, xMax: 11.8, zMin: 77.1, zMax: 86.9 },
  { xMin: -37.4, xMax: -11.4, zMin: -49.4, zMax: -26.6 },
  { xMin: 11.4, xMax: 37.4, zMin: -23.4, zMax: -0.6 },
  { xMin: -51.4, xMax: -10.6, zMin: -0.4, zMax: 32.4 },
  { xMin: 11.4, xMax: 37.4, zMin: 32.6, zMax: 55.4 },
  { xMin: -45.4, xMax: -10.6, zMin: 62.6, zMax: 101.4 },
];

const exhibits = [
  {
    id: 'identity',
    title: '身份',
    subtitle: 'Portrait',
    detailsTitle: '身份画像',
    position: [-36.95, 4.15, -38],
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
    position: [36.55, 4.15, -16.8],
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
    position: [24, 4.15, -23.55],
    rotation: 0,
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
    position: [24, 4.15, -0.45],
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
    position: [36.55, 4.15, 39.2],
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
    position: [24, 4.15, 32.45],
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
    position: [24, 4.15, 55.55],
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
    position: [-51.55, 4.15, 6.8],
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
    position: [-31, 4.15, -0.45],
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
    position: [-31, 4.15, 32.55],
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
    position: [-28, 4.15, 101.55],
    rotation: Math.PI,
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
    position: [-45.55, 4.15, 72],
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
    position: [-10.45, 4.15, 72],
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
    position: [-45.55, 4.15, 92],
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
    position: [-10.45, 4.15, 92],
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
    position: [-24, 4.35, -26.45],
    rotation: Math.PI,
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
  { id: 'starry-night', title: '星夜', style: 'starry', position: [-7.35, 4.35, -54], rotation: Math.PI / 2, width: 5.2, height: 3.7 },
  { id: 'mona-lisa', title: '蒙娜丽莎', style: 'mona', position: [7.35, 4.4, -46], rotation: -Math.PI / 2, width: 3.35, height: 4.45 },
  { id: 'great-wave', title: '神奈川冲浪里', style: 'wave', position: [-7.35, 4.1, -24], rotation: Math.PI / 2, width: 4.4, height: 3.05 },
  { id: 'girl-pearl', title: '珍珠耳环少女', style: 'pearl', position: [7.35, 4.25, -2], rotation: -Math.PI / 2, width: 3.25, height: 4.2 },
  { id: 'sunflowers', title: '向日葵', style: 'sunflowers', position: [-7.35, 4.2, 30], rotation: Math.PI / 2, width: 3.65, height: 4.3 },
  { id: 'impression', title: '日出印象', style: 'sunrise', position: [7.35, 4.1, 62], rotation: -Math.PI / 2, width: 4.45, height: 3.15 },
  { id: 'beethoven-frieze', title: '贝多芬饰带', style: 'frieze', position: [-7.35, 5.8, 106], rotation: Math.PI / 2, width: 7.8, height: 2.15 },
];

const doorSigns = [
  { id: 'identity-door', title: '身份厅', subtitle: 'LeoninCS / 档案', position: [-7.18, 7.95, -38], rotation: Math.PI / 2, compact: true },
  { id: 'tech-door', title: '工程厅', subtitle: '能力 / 项目 / 算法', position: [7.18, 7.95, -12], rotation: -Math.PI / 2, compact: true },
  { id: 'music-door', title: '音乐厅', subtitle: '音乐 / HiFi / 唱片', position: [-7.18, 7.95, 16], rotation: Math.PI / 2, compact: true },
  { id: 'finance-door', title: '投资厅', subtitle: '股票 / 指数 / 加密', position: [7.18, 7.95, 44], rotation: -Math.PI / 2, compact: true },
  { id: 'photo-door', title: '摄影厅', subtitle: '摄影 / 骑行 / 竞赛', position: [-7.18, 7.95, 82], rotation: Math.PI / 2, compact: true },
];

const portals = [
  { id: 'identity-portico', axis: 'x', side: -1, center: [-8.8, -38], width: 8.8, depth: 5.8 },
  { id: 'tech-portico', axis: 'x', side: 1, center: [8.3, -12], width: 8.8, depth: 5.8 },
  { id: 'music-portico', axis: 'x', side: -1, center: [-9.8, 16], width: 8.8, depth: 6.8 },
  { id: 'finance-portico', axis: 'x', side: 1, center: [8.3, 44], width: 8.8, depth: 5.8 },
  { id: 'photo-portico', axis: 'x', side: -1, center: [-8.3, 82], width: 9.8, depth: 5.8 },
];

const roomThemes = {
  central: { wall: 'wall', floor: 'floor', accent: '#8fdfff', runner: 0x7b2032, trim: 'brass' },
  finance: { wall: 'woodWall', floor: 'darkFloor', accent: '#d0a35a', runner: 0x2a1711, trim: 'brass' },
  music: { wall: 'listeningWall', floor: 'darkFloor', accent: '#c27bff', runner: 0x351223, trim: 'roseGold' },
  photo: { wall: 'photoWall', floor: 'floor', accent: '#9fe6ff', runner: 0x251713, trim: 'blackMetal' },
  tech: { wall: 'techWall', floor: 'darkFloor', accent: '#74d9ff', runner: 0x10202b, trim: 'blueLine' },
};

const photoWallPieces = [
  { title: '蓝调城市', image: '/picture/01-city-tower-blue-hour.jpg', position: [-45.72, 4.35, 68], rotation: Math.PI / 2, width: 5.3, height: 3.3 },
  { title: '滨海骑行', image: '/picture/38-bike-coastal-road.jpg', position: [-10.28, 4.35, 68], rotation: -Math.PI / 2, width: 5.3, height: 3.3 },
  { title: '山湖经幡', image: '/picture/13-mountain-lake-prayer-flags.jpg', position: [-45.72, 4.35, 82], rotation: Math.PI / 2, width: 5, height: 3.25 },
  { title: '桥与夜色', image: '/picture/40-illuminated-arch-bridge-night.jpg', position: [-10.28, 4.35, 82], rotation: -Math.PI / 2, width: 5, height: 3.25 },
  { title: 'ICPC 旅程', image: '/picture/46-icpc-wuhan-regional-01.jpg', position: [-45.72, 4.35, 96], rotation: Math.PI / 2, width: 5.1, height: 3.35 },
  { title: '春日花路', image: '/picture/06-blossom-grove-wide.jpg', position: [-10.28, 4.35, 96], rotation: -Math.PI / 2, width: 5.1, height: 3.35 },
];

const guideSteps = [
  {
    id: 'start',
    step: '01',
    title: '起点',
    zone: '入口连廊',
    cue: '沿连廊前进',
    instruction: '从入口连廊出发，先进入身份厅，再沿长廊逐个浏览主题展厅。',
    next: '下一站：工程厅',
    accent: '#8fdfff',
    position: [0, -58],
    rotation: 0,
    signPosition: [7.15, -58],
    signRotation: -Math.PI / 2,
  },
  {
    id: 'tech',
    step: '02',
    title: '工程厅',
    zone: 'Engineering',
    cue: '项目与能力',
    instruction: '从连廊右侧进入工程厅，依次看能力栈、项目陈列和算法纹章。',
    next: '下一站：音乐厅',
    accent: '#74d9ff',
    position: [0, -12],
    rotation: Math.PI / 2,
    signPosition: [7.15, -12],
    signRotation: -Math.PI / 2,
    arrowPosition: [0, -12],
  },
  {
    id: 'music',
    step: '03',
    title: '音乐厅',
    zone: 'Music',
    cue: '听音与唱片',
    instruction: '回到连廊向前，进入左侧音乐厅，浏览音乐偏好、HiFi 器物和唱片墙。',
    next: '下一站：投资厅',
    accent: '#c27bff',
    position: [0, 16],
    rotation: -Math.PI / 2,
    signPosition: [-7.15, 16],
    signRotation: Math.PI / 2,
    arrowPosition: [0, 16],
  },
  {
    id: 'finance',
    step: '04',
    title: '投资厅',
    zone: 'Finance',
    cue: '资产观察',
    instruction: '继续沿连廊前进，从右侧进入投资厅，查看股票、指数、加密资产和长期观察清单。',
    next: '下一站：摄影厅',
    accent: '#d0a35a',
    position: [0, 44],
    rotation: Math.PI / 2,
    signPosition: [7.15, 44],
    signRotation: -Math.PI / 2,
    arrowPosition: [0, 44],
  },
  {
    id: 'photo',
    step: '05',
    title: '摄影厅',
    zone: 'Photography',
    cue: '照片展厅',
    instruction: '抵达连廊远端，进入左侧摄影厅，浏览城市、自然、骑行和竞赛照片。',
    next: '完成浏览路线',
    accent: '#9fe6ff',
    position: [0, 82],
    rotation: -Math.PI / 2,
    signPosition: [-7.15, 82],
    signRotation: Math.PI / 2,
    arrowPosition: [0, 82],
  },
];

const guideStepMap = Object.fromEntries(guideSteps.map((step) => [step.id, step]));

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

function setCanvasFontToFit(ctx, text, maxWidth, options) {
  const { weight = '800', size = 48, minSize = 20, family = '"PingFang SC", "Microsoft YaHei", sans-serif' } = options;
  for (let fontSize = size; fontSize >= minSize; fontSize -= 2) {
    ctx.font = `${weight} ${fontSize}px ${family}`;
    if (ctx.measureText(text).width <= maxWidth || fontSize === minSize) {
      return fontSize;
    }
  }
  return minSize;
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

function createDarkStoneTexture() {
  const texture = makeCanvasTexture(768, 768, (ctx, width, height) => {
    ctx.fillStyle = '#171514';
    ctx.fillRect(0, 0, width, height);

    const gradient = ctx.createRadialGradient(width * 0.52, height * 0.42, 40, width * 0.52, height * 0.42, width * 0.72);
    gradient.addColorStop(0, 'rgba(82, 75, 64, 0.46)');
    gradient.addColorStop(0.48, 'rgba(42, 37, 33, 0.56)');
    gradient.addColorStop(1, 'rgba(8, 7, 7, 0.86)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    for (let y = 0; y < height; y += 112) {
      for (let x = 0; x < width; x += 112) {
        ctx.strokeStyle = 'rgba(214, 190, 145, 0.12)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 1, y + 1, 110, 110);
      }
    }

    for (let i = 0; i < 90; i += 1) {
      ctx.strokeStyle = `rgba(164, 151, 127, ${0.04 + Math.random() * 0.12})`;
      ctx.lineWidth = 1 + Math.random() * 2.2;
      ctx.beginPath();
      const y = Math.random() * height;
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(width * 0.28, y + Math.random() * 80 - 40, width * 0.62, y + Math.random() * 110 - 55, width, y + Math.random() * 70 - 35);
      ctx.stroke();
    }

    noise(ctx, width, height, 2600, 0.08);
  });
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 7);
  return texture;
}

function createWoodPanelTexture() {
  const texture = makeCanvasTexture(768, 768, (ctx, width, height) => {
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#21110c');
    gradient.addColorStop(0.48, '#5a3120');
    gradient.addColorStop(1, '#170d0a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    for (let x = 0; x < width; x += 72) {
      ctx.fillStyle = x % 144 === 0 ? 'rgba(255, 214, 146, 0.07)' : 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(x, 0, 4, height);
      ctx.strokeStyle = 'rgba(232, 181, 105, 0.13)';
      ctx.lineWidth = 1.4;
      ctx.strokeRect(x + 6, 12, 58, height - 24);
    }

    for (let i = 0; i < 140; i += 1) {
      ctx.strokeStyle = `rgba(244, 188, 112, ${0.025 + Math.random() * 0.08})`;
      ctx.lineWidth = 1 + Math.random() * 2;
      ctx.beginPath();
      const x = Math.random() * width;
      ctx.moveTo(x, 0);
      ctx.bezierCurveTo(x + Math.random() * 26 - 13, height * 0.3, x + Math.random() * 36 - 18, height * 0.68, x + Math.random() * 22 - 11, height);
      ctx.stroke();
    }
  });
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.8, 1.3);
  return texture;
}

function createTechWallTexture() {
  const texture = makeCanvasTexture(768, 768, (ctx, width, height) => {
    ctx.fillStyle = '#10171b';
    ctx.fillRect(0, 0, width, height);

    for (let y = 36; y < height; y += 58) {
      ctx.strokeStyle = 'rgba(116, 217, 255, 0.16)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(28, y);
      ctx.lineTo(width - 28, y + Math.sin(y) * 12);
      ctx.stroke();
    }

    for (let i = 0; i < 80; i += 1) {
      const x = 36 + Math.random() * (width - 72);
      const y = 36 + Math.random() * (height - 72);
      ctx.strokeStyle = `rgba(143, 223, 255, ${0.12 + Math.random() * 0.18})`;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, 18 + Math.random() * 70, 10 + Math.random() * 34);
    }

    ctx.fillStyle = 'rgba(255, 247, 223, 0.08)';
    ctx.font = '700 24px ui-monospace, SFMono-Regular, Menlo, monospace';
    for (let y = 70; y < height; y += 86) {
      ctx.fillText('go func()  raft.log  kubernetes  agent.workflow', 36, y);
    }
    noise(ctx, width, height, 1700, 0.06);
  });
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 1.4);
  return texture;
}

function createListeningWallTexture() {
  const texture = makeCanvasTexture(768, 768, (ctx, width, height) => {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#170f14');
    gradient.addColorStop(0.5, '#321323');
    gradient.addColorStop(1, '#0f0b0d');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    for (let y = 70; y < height; y += 92) {
      ctx.strokeStyle = 'rgba(194, 123, 255, 0.18)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 16) {
        const wave = Math.sin(x * 0.025 + y * 0.06) * 18;
        if (x === 0) {
          ctx.moveTo(x, y + wave);
        } else {
          ctx.lineTo(x, y + wave);
        }
      }
      ctx.stroke();
    }

    for (let i = 0; i < 24; i += 1) {
      const x = 50 + (i % 6) * 112;
      const y = 70 + Math.floor(i / 6) * 150;
      ctx.strokeStyle = 'rgba(255, 231, 190, 0.16)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(x, y, 36, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 231, 190, 0.18)';
      ctx.fill();
    }
    noise(ctx, width, height, 1400, 0.07);
  });
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.8, 1.4);
  return texture;
}

function createPhotoWallTexture() {
  const texture = makeCanvasTexture(768, 768, (ctx, width, height) => {
    ctx.fillStyle = '#2b2620';
    ctx.fillRect(0, 0, width, height);
    for (let y = 0; y < height; y += 96) {
      ctx.fillStyle = y % 192 === 0 ? 'rgba(255, 247, 223, 0.045)' : 'rgba(0, 0, 0, 0.09)';
      ctx.fillRect(0, y, width, 48);
    }
    for (let i = 0; i < 60; i += 1) {
      ctx.strokeStyle = `rgba(255, 245, 224, ${0.04 + Math.random() * 0.08})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, 0);
      ctx.lineTo(Math.random() * width, height);
      ctx.stroke();
    }
    noise(ctx, width, height, 2200, 0.08);
  });
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.2, 1.5);
  return texture;
}

function createRenaissanceWallTexture() {
  const texture = makeCanvasTexture(768, 768, (ctx, width, height) => {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#e6d2aa');
    gradient.addColorStop(0.44, '#b98f58');
    gradient.addColorStop(1, '#715236');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    for (let y = 48; y < height; y += 160) {
      ctx.strokeStyle = 'rgba(105, 71, 38, 0.28)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 24) {
        const wave = Math.sin(x * 0.026) * 16;
        if (x === 0) {
          ctx.moveTo(x, y + wave);
        } else {
          ctx.lineTo(x, y + wave);
        }
      }
      ctx.stroke();
    }

    for (let x = 48; x < width; x += 144) {
      ctx.strokeStyle = 'rgba(255, 244, 208, 0.18)';
      ctx.lineWidth = 3;
      ctx.strokeRect(x, 44, 76, height - 88);
      ctx.beginPath();
      ctx.arc(x + 38, 126, 28, Math.PI, 0);
      ctx.stroke();
    }

    noise(ctx, width, height, 2400, 0.12);
  });
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.3, 1.4);
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
        [0, -56, 3.2, -7.35, -54],
        [0, -44, 3.4, 7.35, -46],
        [-12.5, -38, 2.2, -36.95, -38],
        [0, -30, 2.6, -7.35, -24],
      ],
    },
    {
      palette: { coat: 0x6b2938, scarf: 0x8fdfff, skin: 0xe0b98e },
      points: [
        [0, -18, 2.2, 7.35, -2],
        [12.5, -12, 3.2, 24, -23.55],
        [30.5, -12, 2.8, 36.55, -16.8],
        [18, -4, 2.4, 24, -0.45],
      ],
    },
    {
      palette: { coat: 0x365c31, scarf: 0xd0a35a, skin: 0xc99670 },
      points: [
        [0, 8, 2.8, -7.35, 30],
        [-12.5, 16, 3.2, -24, 27.55],
        [-31.5, 16, 2.6, -36.55, 11.2],
        [-18, 22, 2.4, -24, 4.45],
      ],
    },
    {
      palette: { coat: 0x4f3f79, scarf: 0xf2d6a2, skin: 0xd9b184 },
      points: [
        [0, 74, 2.6, -7.35, 106],
        [-12.5, 82, 3.2, -10.45, 72],
        [-36, 88, 2.4, -45.55, 92],
        [-18, 98, 3.1, -10.45, 92],
        [-28, 101, 2.8, -28, 101.55],
      ],
    },
    {
      palette: { coat: 0x2d5562, scarf: 0xb84a3a, skin: 0xe2bd96 },
      points: [
        [0, 34, 2.6, 7.35, 62],
        [12.5, 44, 2.8, 24, 32.45],
        [31, 44, 3.2, 36.55, 39.2],
        [18, 52, 2.4, 24, 55.55],
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

function createArchivePlaqueTexture(title, subtitle, lines = [], accent = '#8fdfff') {
  return makeCanvasTexture(1024, 640, (ctx, width, height) => {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#120d0a');
    gradient.addColorStop(0.48, '#4b2b1d');
    gradient.addColorStop(1, '#0c0a09');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 247, 223, 0.08)';
    ctx.fillRect(56, 52, width - 112, height - 104);
    ctx.strokeStyle = '#d0a35a';
    ctx.lineWidth = 12;
    ctx.strokeRect(54, 52, width - 108, height - 104);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    ctx.strokeRect(86, 84, width - 172, height - 168);

    ctx.fillStyle = accent;
    ctx.font = '800 34px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText(subtitle.toUpperCase(), width / 2, 145);

    ctx.fillStyle = '#fff7df';
    ctx.font = '900 112px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(title, width / 2, 275);

    ctx.fillStyle = 'rgba(255, 247, 223, 0.78)';
    ctx.font = '700 30px "PingFang SC", "Microsoft YaHei", sans-serif';
    lines.slice(0, 4).forEach((line, index) => {
      ctx.fillText(line, width / 2, 380 + index * 46);
    });

    noise(ctx, width, height, 900, 0.08);
  });
}

function createIdentityPlaqueTexture() {
  return makeCanvasTexture(1280, 720, (ctx, width, height) => {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#11181f');
    gradient.addColorStop(0.46, '#26384b');
    gradient.addColorStop(1, '#15100d');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 247, 223, 0.08)';
    ctx.fillRect(62, 58, width - 124, height - 116);
    ctx.strokeStyle = '#d0a35a';
    ctx.lineWidth = 12;
    ctx.strokeRect(62, 58, width - 124, height - 116);
    ctx.strokeStyle = '#8fdfff';
    ctx.lineWidth = 3;
    ctx.strokeRect(106, 98, width - 212, height - 196);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#8fdfff';
    setCanvasFontToFit(ctx, '/ BACKEND DEVELOPER INTERN /', width - 220, {
      weight: '800',
      size: 44,
      minSize: 24,
      family: 'Georgia, serif',
    });
    ctx.fillText('/ BACKEND DEVELOPER INTERN /', width / 2, 168);

    ctx.fillStyle = '#fff7df';
    setCanvasFontToFit(ctx, profile.name, width - 180, {
      weight: '900',
      size: 174,
      minSize: 76,
    });
    ctx.fillText(profile.name, width / 2, 330);

    ctx.fillStyle = '#f4c36a';
    setCanvasFontToFit(ctx, `${profile.realName} · ${profile.location}`, width - 220, {
      weight: '800',
      size: 46,
      minSize: 26,
    });
    ctx.fillText(`${profile.realName} · ${profile.location}`, width / 2, 470);

    ctx.fillStyle = 'rgba(255, 247, 223, 0.78)';
    ctx.font = '700 34px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('河南大学软件工程本科在读 · Cloud Native · AI Agent', width / 2, 545);

    ctx.strokeStyle = 'rgba(143, 223, 255, 0.28)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(190, 612);
    ctx.lineTo(width - 190, 612);
    ctx.stroke();

    noise(ctx, width, height, 900, 0.07);
  });
}

function createThinLineChartTexture(title, labels, accent = '#d0a35a') {
  return makeCanvasTexture(1024, 520, (ctx, width, height) => {
    ctx.fillStyle = '#120d0a';
    ctx.fillRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, 'rgba(80, 42, 22, 0.88)');
    gradient.addColorStop(0.55, 'rgba(20, 15, 12, 0.78)');
    gradient.addColorStop(1, 'rgba(120, 86, 36, 0.58)');
    ctx.fillStyle = gradient;
    ctx.fillRect(32, 32, width - 64, height - 64);

    ctx.strokeStyle = 'rgba(255, 247, 223, 0.14)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i += 1) {
      const y = 118 + i * 42;
      ctx.beginPath();
      ctx.moveTo(96, y);
      ctx.lineTo(width - 96, y);
      ctx.stroke();
    }

    ctx.strokeStyle = accent;
    ctx.lineWidth = 8;
    ctx.beginPath();
    for (let i = 0; i < 13; i += 1) {
      const x = 110 + i * ((width - 220) / 12);
      const y = 330 - Math.sin(i * 0.72) * 86 - Math.cos(i * 1.4) * 28;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    ctx.fillStyle = '#fff7df';
    ctx.font = '900 54px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(title, 92, 96);

    ctx.font = '800 34px ui-monospace, SFMono-Regular, Menlo, monospace';
    labels.forEach((label, index) => {
      ctx.fillStyle = index % 2 === 0 ? '#fff7df' : accent;
      ctx.fillText(label, 92 + (index % 4) * 210, 424 + Math.floor(index / 4) * 42);
    });
  });
}

function createSoundPanelTexture(title, labels, accent = '#c27bff') {
  return makeCanvasTexture(900, 620, (ctx, width, height) => {
    ctx.fillStyle = '#100b0f';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 12; i += 1) {
      const y = 100 + i * 34;
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(194, 123, 255, 0.38)' : 'rgba(255, 214, 146, 0.24)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      for (let x = 70; x <= width - 70; x += 20) {
        const wave = Math.sin(x * 0.035 + i * 0.7) * (18 + i * 1.8);
        if (x === 70) {
          ctx.moveTo(x, y + wave);
        } else {
          ctx.lineTo(x, y + wave);
        }
      }
      ctx.stroke();
    }

    ctx.strokeStyle = '#d0a35a';
    ctx.lineWidth = 12;
    ctx.strokeRect(42, 42, width - 84, height - 84);
    ctx.fillStyle = '#fff7df';
    ctx.font = '900 72px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, 86);

    ctx.font = '800 34px "PingFang SC", "Microsoft YaHei", sans-serif';
    labels.forEach((label, index) => {
      ctx.fillStyle = index % 2 === 0 ? '#fff7df' : accent;
      ctx.fillText(label, width / 2, 430 + index * 42);
    });
    noise(ctx, width, height, 800, 0.08);
  });
}

function createGuideSignTexture(step) {
  return makeCanvasTexture(880, 560, (ctx, width, height) => {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0f0b09');
    gradient.addColorStop(0.48, '#352014');
    gradient.addColorStop(1, '#080706');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 247, 223, 0.08)';
    ctx.fillRect(46, 46, width - 92, height - 92);
    ctx.strokeStyle = '#d0a35a';
    ctx.lineWidth = 10;
    ctx.strokeRect(44, 44, width - 88, height - 88);
    ctx.strokeStyle = step.accent;
    ctx.lineWidth = 4;
    ctx.strokeRect(78, 78, width - 156, height - 156);

    ctx.fillStyle = step.accent;
    ctx.font = '900 94px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(step.step, 104, 170);

    ctx.fillStyle = '#fff7df';
    ctx.font = '900 82px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(step.title, 104, 266);

    ctx.fillStyle = 'rgba(255, 247, 223, 0.76)';
    ctx.font = '800 32px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(step.zone, 106, 322);

    ctx.font = '700 28px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(step.cue, 106, 390);
    ctx.fillStyle = '#d0a35a';
    ctx.fillText(step.next, 106, 440);

    noise(ctx, width, height, 760, 0.08);
  });
}

function createStartMarkerTexture() {
  return makeCanvasTexture(1024, 1024, (ctx, width, height) => {
    const center = width / 2;
    ctx.clearRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(center, center, 20, center, center, center * 0.82);
    glow.addColorStop(0, 'rgba(143, 223, 255, 0.64)');
    glow.addColorStop(0.42, 'rgba(143, 223, 255, 0.18)');
    glow.addColorStop(1, 'rgba(143, 223, 255, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 247, 223, 0.82)';
    ctx.lineWidth = 12;
    for (let i = 0; i < 4; i += 1) {
      ctx.beginPath();
      ctx.arc(center, center, 132 + i * 72, 0, Math.PI * 2);
      ctx.stroke();
    }

    for (let i = 0; i < 16; i += 1) {
      const angle = (i / 16) * Math.PI * 2;
      ctx.strokeStyle = i % 4 === 0 ? '#8fdfff' : 'rgba(255, 247, 223, 0.46)';
      ctx.lineWidth = i % 4 === 0 ? 14 : 5;
      ctx.beginPath();
      ctx.moveTo(center + Math.cos(angle) * 98, center + Math.sin(angle) * 98);
      ctx.lineTo(center + Math.cos(angle) * 406, center + Math.sin(angle) * 406);
      ctx.stroke();
    }

    ctx.fillStyle = '#fff7df';
    ctx.font = '900 96px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('START', center, center - 20);
    ctx.fillStyle = '#8fdfff';
    ctx.font = '800 42px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('从这里开始', center, center + 72);
  });
}

function createRouteArrowTexture(step) {
  return makeCanvasTexture(640, 640, (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = step.accent;
    ctx.beginPath();
    ctx.moveTo(width * 0.5, height * 0.12);
    ctx.lineTo(width * 0.82, height * 0.5);
    ctx.lineTo(width * 0.6, height * 0.5);
    ctx.lineTo(width * 0.6, height * 0.86);
    ctx.lineTo(width * 0.4, height * 0.86);
    ctx.lineTo(width * 0.4, height * 0.5);
    ctx.lineTo(width * 0.18, height * 0.5);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 247, 223, 0.76)';
    ctx.lineWidth = 18;
    ctx.stroke();
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

function getRoomTheme(room) {
  return roomThemes[room.id] || roomThemes.central;
}

function getRoomMaterial(materials, room, surface) {
  const theme = getRoomTheme(room);
  return materials[theme[surface]] || materials[surface] || materials.wall;
}

function addWall(scene, materials, cameraBlockers, room, side) {
  const [cx, cz] = room.center;
  const wallMaterial = getRoomMaterial(materials, room, 'wall');
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
      addBox(scene, cameraBlockers, wallMaterial, [thickness, wallHeight, segment], [x, wallHeight / 2, cz - halfD + segment / 2]);
      addBox(scene, cameraBlockers, wallMaterial, [thickness, wallHeight, segment], [x, wallHeight / 2, cz + halfD - segment / 2]);
      addBox(scene, cameraBlockers, wallMaterial, [thickness, wallHeight - doorHeight, doorGap], [x, doorHeight + (wallHeight - doorHeight) / 2, cz]);
    } else {
      addBox(scene, cameraBlockers, wallMaterial, [thickness, wallHeight, room.depth], [x, wallHeight / 2, cz]);
    }
  }

  if (side === 'north' || side === 'south') {
    const z = cz + (side === 'south' ? halfD + thickness / 2 : -halfD - thickness / 2);
    if (hasDoor) {
      const segment = (room.width - doorGap) / 2;
      addBox(scene, cameraBlockers, wallMaterial, [segment, wallHeight, thickness], [cx - halfW + segment / 2, wallHeight / 2, z]);
      addBox(scene, cameraBlockers, wallMaterial, [segment, wallHeight, thickness], [cx + halfW - segment / 2, wallHeight / 2, z]);
      addBox(scene, cameraBlockers, wallMaterial, [doorGap, wallHeight - doorHeight, thickness], [cx, doorHeight + (wallHeight - doorHeight) / 2, z]);
    } else {
      addBox(scene, cameraBlockers, wallMaterial, [room.width, wallHeight, thickness], [cx, wallHeight / 2, z]);
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

function addBaroqueChandelier(scene, materials, x, z, scale = 1) {
  const group = new THREE.Group();
  group.position.set(x, 9.45, z);

  [1.35, 2.05].forEach((radius, index) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius * scale, 0.04 * scale, 12, 72), materials.renaissanceGold);
    ring.rotation.x = Math.PI / 2;
    ring.castShadow = true;
    group.add(ring);

    const bulbCount = index === 0 ? 8 : 12;
    for (let i = 0; i < bulbCount; i += 1) {
      const angle = (i / bulbCount) * Math.PI * 2;
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.022 * scale, 0.026 * scale, radius * 0.74 * scale, 8), materials.renaissanceGold);
      arm.position.set(Math.cos(angle) * radius * 0.35 * scale, -0.05 * index, Math.sin(angle) * radius * 0.35 * scale);
      arm.rotation.z = Math.PI / 2;
      arm.rotation.y = -angle;
      group.add(arm);

      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.095 * scale, 10, 8), materials.lightBulb);
      bulb.position.set(Math.cos(angle) * radius * scale, -0.08 * index, Math.sin(angle) * radius * scale);
      group.add(bulb);
    }
  });

  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.045 * scale, 0.06 * scale, 1.4 * scale, 12), materials.renaissanceGold);
  stem.position.y = 0.62 * scale;
  group.add(stem);
  scene.add(group);
}

function addFillLight(scene, x, z, color = 0xffecd1, intensity = 1.15, distance = 42) {
  const light = new THREE.PointLight(color, intensity, distance, 1.45);
  light.position.set(x, 7.2, z);
  scene.add(light);
}

function addMuseumLighting(scene) {
  [
    [0, -52, 0xffecd1, 1.25, 36],
    [0, -16, 0xffecd1, 1.25, 42],
    [0, 18, 0xffe3b5, 1.25, 42],
    [0, 52, 0xffd795, 1.25, 42],
    [0, 88, 0xd7f4ff, 1.25, 44],
    [-24, -38, 0xffecd1, 1.45, 38],
    [24, -12, 0x9be8ff, 1.55, 42],
    [-24, 16, 0xd8b4ff, 1.45, 42],
    [24, 44, 0xffd795, 1.55, 42],
    [-28, 82, 0xf2e6d2, 1.65, 54],
  ].forEach(([x, z, color, intensity, distance]) => addFillLight(scene, x, z, color, intensity, distance));
}

function addWallTrim(scene, materials, room) {
  const [cx, cz] = room.center;
  const theme = getRoomTheme(room);
  const trimMaterial = materials[theme.trim] || materials.brass;
  const halfW = room.width / 2;
  const halfD = room.depth / 2;
  const yLevels = [1.02, 7.65];

  yLevels.forEach((y) => {
    [
      [room.width, 0.13, 0.1, cx, y, cz - halfD - 0.43],
      [room.width, 0.13, 0.1, cx, y, cz + halfD + 0.43],
      [0.1, 0.13, room.depth, cx - halfW - 0.43, y, cz],
      [0.1, 0.13, room.depth, cx + halfW + 0.43, y, cz],
    ].forEach(([sx, sy, sz, x, yy, z]) => addBox(scene, null, trimMaterial, [sx, sy, sz], [x, yy, z], false));
  });

  const panelSpacing = room.id === 'photo' ? 9.2 : 6.8;
  for (let x = cx - halfW + panelSpacing; x < cx + halfW - 0.8; x += panelSpacing) {
    addBox(scene, null, trimMaterial, [0.08, 6.1, 0.1], [x, 4.2, cz - halfD - 0.44], false);
    addBox(scene, null, trimMaterial, [0.08, 6.1, 0.1], [x, 4.2, cz + halfD + 0.44], false);
  }
  for (let z = cz - halfD + panelSpacing; z < cz + halfD - 0.8; z += panelSpacing) {
    addBox(scene, null, trimMaterial, [0.1, 6.1, 0.08], [cx - halfW - 0.44, 4.2, z], false);
    addBox(scene, null, trimMaterial, [0.1, 6.1, 0.08], [cx + halfW + 0.44, 4.2, z], false);
  }
}

function addBaroqueWallOrnaments(scene, materials, room) {
  const [cx, cz] = room.center;
  const trimMaterial = materials.renaissanceGold || materials.brass;
  const halfW = room.width / 2;
  const halfD = room.depth / 2;
  const sides = [
    { axis: 'x', z: cz - halfD - 0.48, rotation: 0, length: room.width },
    { axis: 'x', z: cz + halfD + 0.48, rotation: Math.PI, length: room.width },
    { axis: 'z', x: cx - halfW - 0.48, rotation: Math.PI / 2, length: room.depth },
    { axis: 'z', x: cx + halfW + 0.48, rotation: -Math.PI / 2, length: room.depth },
  ];

  sides.forEach((side) => {
    const count = Math.max(2, Math.floor(side.length / 8));
    for (let i = 0; i < count; i += 1) {
      const t = (i + 0.5) / count - 0.5;
      const x = side.axis === 'x' ? cx + t * side.length : side.x;
      const z = side.axis === 'x' ? side.z : cz + t * side.length;
      const cartouche = new THREE.Group();
      cartouche.position.set(x, 5.85, z);
      cartouche.rotation.y = side.rotation;

      const oval = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.035, 8, 32), trimMaterial);
      oval.scale.set(1, 0.58, 1);
      oval.rotation.x = Math.PI / 2;
      cartouche.add(oval);

      [-0.68, 0.68].forEach((offset) => {
        const scroll = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.026, 8, 24, Math.PI * 1.35), trimMaterial);
        scroll.position.x = offset;
        scroll.rotation.set(Math.PI / 2, 0, offset > 0 ? Math.PI * 0.18 : Math.PI * 1.18);
        cartouche.add(scroll);
      });

      const ribbon = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.06, 0.08), trimMaterial);
      ribbon.position.y = -0.52;
      cartouche.add(ribbon);
      scene.add(cartouche);
    }
  });
}

function addCeilingLightRails(scene, materials, room) {
  const [cx, cz] = room.center;
  const theme = getRoomTheme(room);
  const accentColor = new THREE.Color(theme.accent);
  const railMaterial = room.id === 'tech' ? materials.blueLine : materials.blackMetal;
  const glowMaterial = new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: room.id === 'central' ? 0.38 : 0.48 });
  const railLength = room.id === 'photo' ? room.depth * 0.78 : room.width * 0.54;
  const crossLength = room.id === 'photo' ? room.width * 0.58 : room.depth * 0.42;

  [
    [room.id === 'photo' ? 0.18 : railLength, 0.08, room.id === 'photo' ? railLength : 0.18, cx, 9.92, cz],
    [room.id === 'photo' ? crossLength : 0.18, 0.08, room.id === 'photo' ? 0.18 : crossLength, cx, 9.82, cz],
  ].forEach(([sx, sy, sz, x, y, z]) => addBox(scene, null, railMaterial, [sx, sy, sz], [x, y, z], false));

  const stripCount = room.id === 'photo' ? 5 : 4;
  for (let i = 0; i < stripCount; i += 1) {
    const t = stripCount === 1 ? 0 : i / (stripCount - 1) - 0.5;
    const x = room.id === 'photo' ? cx + t * (room.width * 0.62) : cx + t * (room.width * 0.5);
    const z = room.id === 'photo' ? cz : cz + t * (room.depth * 0.42);
    const size = room.id === 'photo' ? [0.08, 0.045, room.depth * 0.68] : [room.width * 0.5, 0.045, 0.08];
    addBox(scene, null, glowMaterial, size, [x, 9.72, z], false);
  }
}

function addRoom(scene, materials, cameraBlockers, obstacles, room) {
  const [cx, cz] = room.center;
  const theme = getRoomTheme(room);
  const floorMaterial = getRoomMaterial(materials, room, 'floor');
  const trimMaterial = materials[theme.trim] || materials.brass;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(room.width, room.depth), floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(cx, 0, cz);
  floor.receiveShadow = true;
  scene.add(floor);

  [
    [room.width, 0.06, 0.16, cx, 0.04, cz - room.depth / 2],
    [room.width, 0.06, 0.16, cx, 0.04, cz + room.depth / 2],
    [0.16, 0.06, room.depth, cx - room.width / 2, 0.04, cz],
    [0.16, 0.06, room.depth, cx + room.width / 2, 0.04, cz],
  ].forEach(([sx, sy, sz, x, y, z]) => addBox(scene, null, trimMaterial, [sx, sy, sz], [x, y, z], false));

  const runner = new THREE.Mesh(
    new THREE.PlaneGeometry(room.width * 0.22, room.depth * 0.86),
    new THREE.MeshStandardMaterial({ color: theme.runner, roughness: 0.72, metalness: 0.02 }),
  );
  runner.rotation.x = -Math.PI / 2;
  runner.position.set(cx, 0.045, cz);
  if (room.id === 'finance' || room.id === 'music') {
    runner.rotation.z = Math.PI / 2;
  }
  scene.add(runner);

  ['east', 'west', 'north', 'south'].forEach((side) => addWall(scene, materials, cameraBlockers, room, side));
  addWallTrim(scene, materials, room);
  addBaroqueWallOrnaments(scene, materials, room);

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
  ].forEach(([sx, sy, sz, x, y, z]) => addBox(scene, null, trimMaterial, [sx, sy, sz], [x, y, z], false));

  const medallion = new THREE.Mesh(new THREE.TorusGeometry(Math.min(room.width, room.depth) * 0.18, 0.045, 10, 72), trimMaterial);
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

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.9, 0.44, 22), trimMaterial);
    base.position.set(x, 0.22, z);
    base.castShadow = true;
    scene.add(base);
  });

  if (room.id === 'music') {
    addBaroqueChandelier(scene, materials, cx, cz, 1.18);
  } else {
    addChandelier(scene, materials, cx, cz, room.id === 'central' ? 1.18 : 0.92);
  }
  addCeilingLightRails(scene, materials, room);

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

  const stationCount = Math.max(3, Math.floor(length / 8));
  for (let i = 0; i <= stationCount; i += 1) {
    const t = i / stationCount - 0.5;
    const x = facingX ? center[0] + t * length : center[0];
    const z = facingX ? center[1] : center[1] + t * length;
    const light = new THREE.Mesh(
      new THREE.BoxGeometry(facingX ? 1.35 : width * 0.52, 0.055, facingX ? width * 0.52 : 1.35),
      materials.lightBulb,
    );
    light.position.set(x, 7.02, z);
    scene.add(light);
  }

  const plaqueConfigs = facingX
    ? [
        [center[0] - length * 0.28, 3.5, center[1] - width / 2 + 0.34, 0],
        [center[0] + length * 0.28, 3.5, center[1] + width / 2 - 0.34, Math.PI],
      ]
    : [
        [center[0] - width / 2 + 0.34, 3.5, center[1] - length * 0.28, Math.PI / 2],
        [center[0] + width / 2 - 0.34, 3.5, center[1] + length * 0.28, -Math.PI / 2],
      ];

  plaqueConfigs.forEach(([x, y, z, rotation], index) => {
    const plaque = new THREE.Mesh(
      new THREE.PlaneGeometry(2.35, 0.72),
      new THREE.MeshStandardMaterial({
        map: createArchivePlaqueTexture(index === 0 ? '走廊' : 'Corridor', facingX ? 'Gallery Link' : 'Archive Link', [], '#8fdfff'),
        roughness: 0.5,
        metalness: 0.08,
      }),
    );
    plaque.position.set(x, y, z);
    plaque.rotation.y = rotation;
    scene.add(plaque);
  });
}

function addGrandCorridor(scene, materials, cameraBlockers) {
  const center = [0, 23];
  const length = 170;
  const width = 14;
  const zMin = center[1] - length / 2;
  const zMax = center[1] + length / 2;
  const halfWidth = width / 2;
  const doorGaps = {
    left: [
      { z: -38, gap: 8.8 },
      { z: 16, gap: 8.8 },
      { z: 82, gap: 9.8 },
    ],
    right: [
      { z: -12, gap: 8.8 },
      { z: 44, gap: 8.8 },
    ],
  };

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(width, length), materials.floor);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(center[0], 0.02, center[1]);
  floor.receiveShadow = true;
  scene.add(floor);

  const runner = new THREE.Mesh(
    new THREE.PlaneGeometry(width * 0.42, length * 0.93),
    new THREE.MeshStandardMaterial({ color: 0x7b2032, roughness: 0.72, metalness: 0.02 }),
  );
  runner.rotation.x = -Math.PI / 2;
  runner.position.set(center[0], 0.06, center[1]);
  scene.add(runner);

  const addSideWall = (side) => {
    const x = side === 'left' ? -halfWidth : halfWidth;
    const gaps = doorGaps[side].map(({ z, gap }) => ({ start: z - gap / 2, end: z + gap / 2 })).sort((a, b) => a.start - b.start);
    let cursor = zMin;
    gaps.forEach((gap) => {
      if (gap.start > cursor) {
        const segment = gap.start - cursor;
        addBox(scene, cameraBlockers, materials.wall, [0.48, 8.5, segment], [x, 4.25, cursor + segment / 2], true);
      }
      cursor = gap.end;
    });
    if (cursor < zMax) {
      const segment = zMax - cursor;
      addBox(scene, cameraBlockers, materials.wall, [0.48, 8.5, segment], [x, 4.25, cursor + segment / 2], true);
    }
  };

  addSideWall('left');
  addSideWall('right');

  const columnCount = 22;
  for (let i = 0; i <= columnCount; i += 1) {
    const z = zMin + (length * i) / columnCount;
    const nearDoor = [...doorGaps.left, ...doorGaps.right].some((door) => Math.abs(z - door.z) < door.gap * 0.6);
    if (nearDoor) {
      continue;
    }
    [-1, 1].forEach((side) => {
      const x = side * (halfWidth - 0.72);
      const column = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 6.2, 18), materials.column);
      column.position.set(x, 3.1, z);
      column.castShadow = true;
      column.receiveShadow = true;
      scene.add(column);
      cameraBlockers.push(column);
    });
  }

  addBox(scene, null, materials.ceiling, [width, 0.38, length], [center[0], 7.35, center[1]], false);

  for (let i = 0; i <= 18; i += 1) {
    const z = zMin + (length * i) / 18;
    const light = new THREE.Mesh(new THREE.BoxGeometry(width * 0.52, 0.055, 1.35), materials.lightBulb);
    light.position.set(center[0], 7.02, z);
    scene.add(light);
  }

  [
    [-halfWidth + 0.34, 3.5, -28, Math.PI / 2],
    [halfWidth - 0.34, 3.5, 22, -Math.PI / 2],
    [-halfWidth + 0.34, 3.5, 54, Math.PI / 2],
    [halfWidth - 0.34, 3.5, 92, -Math.PI / 2],
  ].forEach(([x, y, z, rotation], index) => {
    const plaque = new THREE.Mesh(
      new THREE.PlaneGeometry(2.35, 0.72),
      new THREE.MeshStandardMaterial({
        map: createArchivePlaqueTexture(index % 2 === 0 ? '长廊' : 'Corridor', 'Classic Works', [], '#8fdfff'),
        roughness: 0.5,
        metalness: 0.08,
      }),
    );
    plaque.position.set(x, y, z);
    plaque.rotation.y = rotation;
    scene.add(plaque);
  });

  const endCaps = [
    [0, -62.3, 7.2],
    [0, 108.3, 7.2],
  ];
  endCaps.forEach(([x, z, halfWidth]) => {
    addBox(scene, cameraBlockers, materials.wall, [halfWidth * 2, 8.5, 0.5], [x, 4.25, z], true);
  });

  [
    ['入口连廊', 'GRAND GALLERY', [0, 7.1, -60.8], 0],
    ['名画长廊', 'CLASSIC WORKS', [0, 7.1, 104.8], Math.PI],
  ].forEach(([title, subtitle, position, rotation]) => {
    const sign = new THREE.Mesh(
      new THREE.PlaneGeometry(5.8, 1.8),
      new THREE.MeshStandardMaterial({
        map: createArchivePlaqueTexture(title, subtitle, [], '#d0a35a'),
        roughness: 0.5,
        metalness: 0.08,
        emissive: 0x201205,
        emissiveIntensity: 0.08,
      }),
    );
    sign.position.set(...position);
    sign.rotation.y = rotation;
    scene.add(sign);
  });
}

function addArchivePlaque(scene, materials, config) {
  const group = new THREE.Group();
  group.position.set(...config.position);
  group.rotation.y = config.rotation || 0;
  group.position.add(new THREE.Vector3(0, 0, 0.16).applyAxisAngle(new THREE.Vector3(0, 1, 0), group.rotation.y));

  const board = new THREE.Mesh(
    new THREE.PlaneGeometry(config.width || 5.8, config.height || 3.4),
    new THREE.MeshStandardMaterial({
      map: config.texture || createArchivePlaqueTexture(config.title, config.subtitle, config.lines, config.accent),
      roughness: 0.52,
      metalness: 0.08,
      emissive: new THREE.Color(config.accent || '#8fdfff'),
      emissiveIntensity: 0.06,
    }),
  );
  group.add(board);

  const frameWidth = 0.16;
  const frameDepth = 0.22;
  const w = config.width || 5.8;
  const h = config.height || 3.4;
  [
    { size: [w + frameWidth * 2, frameWidth, frameDepth], position: [0, h / 2 + frameWidth / 2, -0.08] },
    { size: [w + frameWidth * 2, frameWidth, frameDepth], position: [0, -h / 2 - frameWidth / 2, -0.08] },
    { size: [frameWidth, h + frameWidth * 2, frameDepth], position: [-w / 2 - frameWidth / 2, 0, -0.08] },
    { size: [frameWidth, h + frameWidth * 2, frameDepth], position: [w / 2 + frameWidth / 2, 0, -0.08] },
  ].forEach(({ size, position }) => {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(...size), materials.brass);
    frame.position.set(...position);
    frame.castShadow = true;
    group.add(frame);
  });

  scene.add(group);
  return group;
}

function addWallPhoto(scene, materials, piece) {
  const group = new THREE.Group();
  group.position.set(...piece.position);
  group.rotation.y = piece.rotation;
  group.position.add(new THREE.Vector3(0, 0, 0.18).applyAxisAngle(new THREE.Vector3(0, 1, 0), group.rotation.y));

  const texture = new THREE.TextureLoader().load(piece.image);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  const backing = new THREE.Mesh(new THREE.BoxGeometry(piece.width + 0.74, piece.height + 0.74, 0.18), materials.frame);
  backing.position.z = -0.13;
  backing.castShadow = true;
  group.add(backing);

  const mat = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.46,
    metalness: 0.03,
    emissive: 0x100b08,
    emissiveIntensity: 0.03,
  });
  const photo = new THREE.Mesh(new THREE.PlaneGeometry(piece.width, piece.height), mat);
  photo.castShadow = true;
  group.add(photo);

  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(piece.width, piece.height),
    new THREE.MeshBasicMaterial({ color: 0xcfefff, transparent: true, opacity: 0.08, depthWrite: false }),
  );
  glass.position.z = 0.018;
  group.add(glass);

  const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, piece.width * 0.52, 10), materials.blackMetal);
  lamp.position.set(0, piece.height / 2 + 0.45, 0.12);
  lamp.rotation.z = Math.PI / 2;
  group.add(lamp);

  const plaque = new THREE.Mesh(
    new THREE.PlaneGeometry(piece.width * 0.48, 0.34),
    new THREE.MeshStandardMaterial({
      map: createArchivePlaqueTexture(piece.title, 'Photography', [], '#9fe6ff'),
      roughness: 0.5,
      metalness: 0.08,
    }),
  );
  plaque.position.set(0, -piece.height / 2 - 0.5, 0.04);
  plaque.scale.y = 0.28;
  group.add(plaque);

  scene.add(group);
}

function addFinanceArchive(scene, materials) {
  const chart = new THREE.Mesh(
    new THREE.PlaneGeometry(7.2, 3.55),
    new THREE.MeshStandardMaterial({
      map: createThinLineChartTexture('QUALITY WATCHLIST', ['KO', 'NVDA', 'TSM', 'AAPL', 'MSFT', 'GOOGL', 'MU', 'CVX'], '#d0a35a'),
      roughness: 0.48,
      metalness: 0.12,
      emissive: 0x241203,
      emissiveIntensity: 0.1,
    }),
  );
  chart.position.set(30.6, 4.45, 32.7);
  chart.rotation.y = 0;
  scene.add(chart);

  ['NDX', 'SPX', 'N225', 'BTC', 'ETH', 'USDT'].forEach((label, index) => {
    const x = 18.6 + (index % 3) * 4.05;
    const z = 40.8 + Math.floor(index / 3) * 3.6;
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.72, 0.62, 18), materials.column);
    stand.position.set(x, 0.31, z);
    stand.castShadow = true;
    scene.add(stand);

    const ticker = new THREE.Mesh(
      new THREE.BoxGeometry(2.45, 1.1, 0.16),
      new THREE.MeshStandardMaterial({
        map: createArchivePlaqueTexture(label, 'MARKET', [], '#d0a35a'),
        roughness: 0.44,
        metalness: 0.16,
        emissive: 0x2b1906,
        emissiveIntensity: 0.08,
      }),
    );
    ticker.position.set(x, 1.24, z);
    ticker.rotation.y = -0.24;
    ticker.castShadow = true;
    scene.add(ticker);
  });
}

function addMusicArchive(scene, materials) {
  const panel = new THREE.Mesh(
    new THREE.PlaneGeometry(7.2, 4.05),
    new THREE.MeshStandardMaterial({
      map: createSoundPanelTexture('声音档案', ['R&B / Jazz / Hip-Hop', 'Kendrick / SZA', 'Frank Ocean / J. Cole', 'HiFi Listening'], '#c27bff'),
      roughness: 0.52,
      metalness: 0.08,
      emissive: 0x2a1028,
      emissiveIntensity: 0.12,
    }),
  );
  panel.position.set(-30.7, 4.5, 4.7);
  panel.rotation.y = 0;
  scene.add(panel);

  for (let i = 0; i < 12; i += 1) {
    const x = -32.4 + (i % 4) * 2.15;
    const z = 14.2 + Math.floor(i / 4) * 1.52;
    const record = new THREE.Mesh(
      new THREE.CylinderGeometry(0.62, 0.62, 0.06, 48),
      new THREE.MeshStandardMaterial({ color: i % 3 === 0 ? 0x0e0b0c : i % 3 === 1 ? 0x40172a : 0x1c2540, roughness: 0.38, metalness: 0.2 }),
    );
    record.position.set(x, 3.8 + Math.floor(i / 4) * 0.08, z);
    record.rotation.x = Math.PI / 2;
    record.castShadow = true;
    scene.add(record);

    const center = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.065, 24), materials.roseGold);
    center.position.copy(record.position);
    center.rotation.x = Math.PI / 2;
    scene.add(center);
  }
}

function addTechArchive(scene, materials) {
  addArchivePlaque(scene, materials, {
    title: '工程档案',
    subtitle: 'Backend / Cloud Native / Agent',
    lines: ['Go / Python / React / Three.js', 'Kubernetes / Redis / MQ', 'LangGraph / Raft / Distributed Systems'],
    accent: '#74d9ff',
    position: [30.8, 4.45, -0.25],
    rotation: Math.PI,
    width: 4.7,
    height: 2.9,
  });

  const nodes = [
    [19.2, -18.4, 'Go'],
    [19.2, -5.8, 'Raft'],
    [29.4, -18.4, 'K8s'],
    [29.4, -5.8, 'Agent'],
  ];
  nodes.forEach(([x, z, label], index) => {
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.78, 0.58, 24), materials.blackMetal);
    plinth.position.set(x, 0.29, z);
    plinth.castShadow = true;
    scene.add(plinth);

    const node = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.56, 1),
      new THREE.MeshStandardMaterial({ color: index % 2 === 0 ? 0x74d9ff : 0xf4c36a, roughness: 0.26, metalness: 0.52 }),
    );
    node.position.set(x, 1.32, z);
    node.castShadow = true;
    scene.add(node);

    const tag = new THREE.Mesh(
      new THREE.PlaneGeometry(1.8, 0.72),
      new THREE.MeshStandardMaterial({
        map: createArchivePlaqueTexture(label, 'SYSTEM', [], '#74d9ff'),
        roughness: 0.5,
        metalness: 0.1,
      }),
    );
    tag.position.set(x, 2.18, z + 0.72);
    tag.rotation.y = Math.PI;
    scene.add(tag);
  });
}

function addIdentityWall(scene, materials) {
  addArchivePlaque(scene, materials, {
    title: profile.name,
    subtitle: `${profile.realName} / ${profile.role}`,
    lines: ['Hangzhou, China', '河南大学软件工程本科在读', 'Backend / Cloud Native / AI Agent'],
    accent: '#8fdfff',
    position: [-24, 4.65, -49.55],
    rotation: 0,
    width: 7.2,
    height: 4.05,
    texture: createIdentityPlaqueTexture(),
  });

}

function addGuideSystem(scene, materials) {
  const startMarker = new THREE.Mesh(
    new THREE.CircleGeometry(2.8, 72),
    new THREE.MeshBasicMaterial({
      map: createStartMarkerTexture(),
      transparent: true,
      opacity: 0.86,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  startMarker.rotation.x = -Math.PI / 2;
  startMarker.position.set(0, 0.085, 9.35);
  startMarker.userData.isGuideMarker = true;
  scene.add(startMarker);

  guideSteps.forEach((step, index) => {
    const [x, z] = step.signPosition || step.position;
    const sign = new THREE.Group();
    sign.position.set(x, 4.6, z);
    sign.rotation.y = step.signRotation ?? step.rotation;

    const board = new THREE.Mesh(
      new THREE.PlaneGeometry(2.8, 1.58),
      new THREE.MeshStandardMaterial({
        map: createGuideSignTexture(step),
        roughness: 0.48,
        metalness: 0.12,
        emissive: new THREE.Color(step.accent),
        emissiveIntensity: 0.05,
      }),
    );
    sign.add(board);

    const back = new THREE.Mesh(new THREE.BoxGeometry(3.05, 1.78, 0.16), materials.blackMetal);
    back.position.z = -0.12;
    back.castShadow = true;
    sign.add(back);
    scene.add(sign);

    if (index > 0) {
      const arrow = new THREE.Mesh(
        new THREE.PlaneGeometry(1.06, 1.06),
        new THREE.MeshBasicMaterial({
          map: createRouteArrowTexture(step),
          transparent: true,
          opacity: 0.72,
          side: THREE.DoubleSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      arrow.rotation.x = -Math.PI / 2;
      arrow.rotation.z = -step.rotation;
      const [arrowX, arrowZ] = step.arrowPosition || step.position;
      arrow.position.set(arrowX, 0.092, arrowZ);
      arrow.userData.isGuideArrow = true;
      arrow.userData.seed = index * 0.9;
      scene.add(arrow);
    }
  });

  const routeSegments = [
    { center: [0, 22], size: [0.24, 154], color: 0x9fe6ff },
    { center: [-6.2, -38], size: [2.1, 0.24], color: 0x8fdfff },
    { center: [6.2, -12], size: [2.1, 0.24], color: 0x74d9ff },
    { center: [-6.2, 16], size: [2.1, 0.24], color: 0xc27bff },
    { center: [6.2, 44], size: [2.1, 0.24], color: 0xd0a35a },
    { center: [-6.2, 82], size: [2.1, 0.24], color: 0x9fe6ff },
  ];

  routeSegments.forEach((segment) => {
    const line = new THREE.Mesh(
      new THREE.PlaneGeometry(segment.size[0], segment.size[1]),
      new THREE.MeshBasicMaterial({
        color: segment.color,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    line.rotation.x = -Math.PI / 2;
    line.position.set(segment.center[0], 0.078, segment.center[1]);
    scene.add(line);
  });
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
  const boardWidth = sign.compact ? 4.2 : 5.8;
  const boardHeight = sign.compact ? 1.55 : 2.32;
  const frameDepth = 0.2;

  const board = new THREE.Mesh(
    new THREE.PlaneGeometry(boardWidth, boardHeight),
    new THREE.MeshStandardMaterial({
      map: createDoorSignTexture(sign),
      roughness: 0.5,
      metalness: 0.08,
      emissive: 0x082a3d,
      emissiveIntensity: 0.16,
    }),
  );
  group.add(board);

  [
    { size: [boardWidth + 0.28, 0.12, frameDepth], position: [0, boardHeight / 2 + 0.08, -0.08] },
    { size: [boardWidth + 0.28, 0.12, frameDepth], position: [0, -boardHeight / 2 - 0.08, -0.08] },
    { size: [0.12, boardHeight + 0.28, frameDepth], position: [-boardWidth / 2 - 0.08, 0, -0.08] },
    { size: [0.12, boardHeight + 0.28, frameDepth], position: [boardWidth / 2 + 0.08, 0, -0.08] },
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
  const columnHeight = 5.7;
  const columnRadius = 0.34;
  const innerColumns = [-columnOffset, columnOffset];
  const approachOffsets = [-depth * 0.34, depth * 0.34];
  const isCentralPortal = ['east-portico', 'west-portico', 'photo-portico', 'tech-portico'].includes(portal.id);

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

  if (!isCentralPortal) {
    const lintelSize = facingX ? [depth + 1.2, 0.46, portal.width + 1.25] : [portal.width + 1.25, 0.46, depth + 1.2];
    const lintel = addBox(scene, null, materials.column, lintelSize, [cx, 6.62, cz], true);
    lintel.receiveShadow = true;
  }

  const archRadius = portal.width / 2;
  const arch = new THREE.Mesh(new THREE.TorusGeometry(archRadius, 0.18, 14, 72, Math.PI), materials.brass);
  arch.position.set(cx, 5.92, cz);
  if (facingX) {
    arch.rotation.set(Math.PI / 2, 0, Math.PI / 2);
  } else {
    arch.rotation.set(Math.PI / 2, 0, 0);
  }
  arch.scale.y = 0.54;
  arch.castShadow = true;
  scene.add(arch);

  if (!portal.id.includes('photo') && !isCentralPortal) {
    const pediment = new THREE.Mesh(new THREE.ConeGeometry(portal.width * 0.56, 1.35, 3), materials.brass);
    pediment.position.set(cx, 7.46, cz);
    pediment.rotation.z = Math.PI / 6;
    if (facingX) {
      pediment.rotation.y = Math.PI / 2;
      pediment.scale.z = 0.36;
    } else {
      pediment.scale.z = 0.36;
    }
    pediment.castShadow = true;
    scene.add(pediment);
  }

  const threshold = new THREE.Mesh(
    new THREE.PlaneGeometry(facingX ? depth + 1.6 : portal.width + 1.4, facingX ? portal.width + 1.4 : depth + 1.6),
    new THREE.MeshStandardMaterial({ color: 0x6c1f2d, roughness: 0.64, metalness: 0.04 }),
  );
  threshold.rotation.x = -Math.PI / 2;
  threshold.position.set(cx, 0.055, cz);
  scene.add(threshold);

  const ornamentCount = 3;
  for (let i = 0; i < ornamentCount; i += 1) {
    const offset = (i - 1) * (portal.width * 0.24);
    const ornament = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.026, 8, 24), materials.renaissanceGold || materials.brass);
    if (facingX) {
      ornament.position.set(cx, 6.95, cz + offset);
      ornament.rotation.set(Math.PI / 2, 0, Math.PI / 2);
    } else {
      ornament.position.set(cx + offset, 6.95, cz);
      ornament.rotation.set(Math.PI / 2, 0, 0);
    }
    scene.add(ornament);
  }

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

function addClassicalStatue(scene, materials, obstacles, position, rotation = 0, scale = 1) {
  const group = new THREE.Group();
  group.position.set(position[0], 0, position[1]);
  group.rotation.y = rotation;

  const marble = materials.statueMarble || materials.column;
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.62 * scale, 0.78 * scale, 0.42 * scale, 24), marble);
  base.position.y = 0.21 * scale;
  base.castShadow = true;
  group.add(base);

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.22 * scale, 1.02 * scale, 8, 14), marble);
  body.position.y = 1.14 * scale;
  body.scale.set(0.78, 1, 0.58);
  body.castShadow = true;
  group.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22 * scale, 16, 12), marble);
  head.position.y = 1.9 * scale;
  head.castShadow = true;
  group.add(head);

  [-1, 1].forEach((side) => {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.045 * scale, 0.62 * scale, 5, 8), marble);
    arm.position.set(side * 0.24 * scale, 1.35 * scale, 0);
    arm.rotation.z = side * 0.46;
    group.add(arm);

    const drape = new THREE.Mesh(new THREE.ConeGeometry(0.2 * scale, 0.72 * scale, 5), marble);
    drape.position.set(side * 0.12 * scale, 0.84 * scale, 0.03 * scale);
    drape.rotation.z = side * 0.16;
    group.add(drape);
  });

  scene.add(group);
  addObstacle(obstacles, position[0], position[1], 0.75 * scale);
  return group;
}

function addMusicStand(group, materials, x, z, rotation = 0, scale = 1) {
  const stand = new THREE.Group();
  stand.position.set(x, 0, z);
  stand.rotation.y = rotation;

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.018 * scale, 0.022 * scale, 0.72 * scale, 8), materials.blackMetal);
  pole.position.y = 0.62 * scale;
  stand.add(pole);

  const desk = new THREE.Mesh(new THREE.BoxGeometry(0.36 * scale, 0.26 * scale, 0.035 * scale), materials.blackMetal);
  desk.position.set(0, 1.02 * scale, -0.04 * scale);
  desk.rotation.x = -0.28;
  stand.add(desk);

  const score = new THREE.Mesh(new THREE.BoxGeometry(0.28 * scale, 0.19 * scale, 0.012 * scale), materials.parchment);
  score.position.set(0, 1.04 * scale, -0.062 * scale);
  score.rotation.x = -0.28;
  stand.add(score);

  group.add(stand);
}

function addInstrument(group, materials, type, scale = 1) {
  const wood = materials.instrumentWood;
  const brass = materials.renaissanceGold || materials.brass;
  const dark = materials.blackMetal;

  if (type === 'violin' || type === 'cello') {
    const body = new THREE.Mesh(new THREE.SphereGeometry(type === 'cello' ? 0.18 * scale : 0.12 * scale, 12, 8), wood);
    body.scale.set(0.72, 1, 0.32);
    body.position.set(0, type === 'cello' ? 0.72 * scale : 1.02 * scale, -0.18 * scale);
    group.add(body);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.018 * scale, 0.02 * scale, type === 'cello' ? 0.62 * scale : 0.42 * scale, 8), wood);
    neck.position.set(0, type === 'cello' ? 1.07 * scale : 1.22 * scale, -0.18 * scale);
    neck.rotation.x = 0.14;
    group.add(neck);

    const bow = new THREE.Mesh(new THREE.CylinderGeometry(0.007 * scale, 0.007 * scale, 0.64 * scale, 6), dark);
    bow.position.set(0.18 * scale, type === 'cello' ? 1.04 * scale : 1.16 * scale, -0.04 * scale);
    bow.rotation.z = 0.66;
    group.add(bow);
    return;
  }

  if (type === 'bass') {
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.24 * scale, 12, 8), wood);
    body.scale.set(0.74, 1.18, 0.38);
    body.position.set(0, 0.9 * scale, -0.2 * scale);
    group.add(body);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.022 * scale, 0.026 * scale, 0.9 * scale, 8), wood);
    neck.position.set(0, 1.45 * scale, -0.18 * scale);
    group.add(neck);
    return;
  }

  if (type === 'brass') {
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.026 * scale, 0.026 * scale, 0.58 * scale, 10), brass);
    tube.position.set(0, 1.05 * scale, -0.15 * scale);
    tube.rotation.z = Math.PI / 2;
    group.add(tube);

    const bell = new THREE.Mesh(new THREE.ConeGeometry(0.13 * scale, 0.22 * scale, 16), brass);
    bell.position.set(0.38 * scale, 1.05 * scale, -0.15 * scale);
    bell.rotation.z = -Math.PI / 2;
    group.add(bell);
    return;
  }

  if (type === 'woodwind') {
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.022 * scale, 0.022 * scale, 0.58 * scale, 10), dark);
    pipe.position.set(0, 1.08 * scale, -0.12 * scale);
    pipe.rotation.z = Math.PI / 2.25;
    group.add(pipe);
    return;
  }

  const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * scale, 0.18 * scale, 0.2 * scale, 18), materials.parchment);
  drum.position.set(0, 0.9 * scale, -0.2 * scale);
  drum.rotation.x = Math.PI / 2;
  group.add(drum);
}

function addOrchestraPlayer(scene, materials, position, rotation, instrument, scale = 1) {
  const group = new THREE.Group();
  group.position.set(position[0], 0, position[1]);
  group.rotation.y = rotation;

  const skin = new THREE.MeshStandardMaterial({ color: 0xe2bd96, roughness: 0.66 });
  const suit = new THREE.MeshStandardMaterial({ color: 0x171513, roughness: 0.54, metalness: 0.03 });
  const white = new THREE.MeshStandardMaterial({ color: 0xf1e8d4, roughness: 0.58 });

  const chair = new THREE.Mesh(new THREE.BoxGeometry(0.42 * scale, 0.12 * scale, 0.38 * scale), materials.darkWood);
  chair.position.set(0, 0.42 * scale, 0.12 * scale);
  group.add(chair);

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.13 * scale, 0.42 * scale, 6, 8), suit);
  torso.position.y = 0.92 * scale;
  torso.scale.set(0.82, 1, 0.62);
  group.add(torso);

  const shirt = new THREE.Mesh(new THREE.BoxGeometry(0.12 * scale, 0.24 * scale, 0.025 * scale), white);
  shirt.position.set(0, 0.98 * scale, -0.12 * scale);
  group.add(shirt);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.12 * scale, 12, 10), skin);
  head.position.y = 1.32 * scale;
  group.add(head);

  [-1, 1].forEach((side) => {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.026 * scale, 0.34 * scale, 5, 8), suit);
    arm.position.set(side * 0.13 * scale, 0.96 * scale, -0.11 * scale);
    arm.rotation.z = side * 0.52;
    group.add(arm);
  });

  addInstrument(group, materials, instrument, scale);
  addMusicStand(group, materials, 0, -0.44 * scale, 0, scale);
  scene.add(group);
  return group;
}

function addConductor(scene, materials, x, z) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  group.rotation.y = Math.PI;

  const suit = new THREE.MeshStandardMaterial({ color: 0x11100f, roughness: 0.5 });
  const skin = new THREE.MeshStandardMaterial({ color: 0xe0b98e, roughness: 0.62 });
  const batonMat = new THREE.MeshBasicMaterial({ color: 0xfff2c5 });

  const podium = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.86, 0.34, 24), materials.darkWood);
  podium.position.y = 0.17;
  group.add(podium);

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.72, 8, 12), suit);
  body.position.y = 0.98;
  group.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), skin);
  head.position.y = 1.48;
  group.add(head);

  [-1, 1].forEach((side) => {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.026, 0.52, 5, 8), suit);
    arm.position.set(side * 0.19, 1.18, -0.08);
    arm.rotation.z = side * 0.82;
    arm.rotation.x = -0.25;
    group.add(arm);
  });

  const baton = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.72, 6), batonMat);
  baton.position.set(0.34, 1.36, -0.1);
  baton.rotation.z = 1.04;
  group.add(baton);

  scene.add(group);
}

function addGrandOrchestraHall(scene, materials, obstacles) {
  const roomCenterX = -31;
  const cz = 16;
  const stageX = -39.2;
  const stageZ = cz + 1.4;
  const stage = new THREE.Group();
  stage.position.set(stageX, 0, stageZ);

  const platform = new THREE.Mesh(new THREE.BoxGeometry(24, 0.55, 17), materials.stageWood);
  platform.position.set(0, 0.28, 0);
  platform.receiveShadow = true;
  platform.castShadow = true;
  stage.add(platform);

  for (let i = 0; i < 3; i += 1) {
    const riser = new THREE.Mesh(new THREE.BoxGeometry(22 - i * 2.2, 0.28, 2.8), materials.stageWood);
    riser.position.set(0, 0.78 + i * 0.26, 2.8 + i * 2.2);
    riser.castShadow = true;
    riser.receiveShadow = true;
    stage.add(riser);
  }

  const proscenium = new THREE.Mesh(new THREE.TorusGeometry(7.8, 0.09, 12, 72, Math.PI), materials.renaissanceGold);
  proscenium.position.set(0, 4.75, 8.65);
  proscenium.rotation.x = Math.PI / 2;
  proscenium.scale.y = 0.72;
  stage.add(proscenium);

  scene.add(stage);
  addObstacle(obstacles, stageX, stageZ, 7.2);

  addConductor(scene, materials, stageX, stageZ - 4.6);

  const rows = [
    { count: 10, z: -0.6, width: 10.8, instrument: 'violin', scale: 0.9 },
    { count: 10, z: 1.4, width: 11.8, instrument: 'violin', scale: 0.9 },
    { count: 8, z: 3.4, width: 10.8, instrument: 'cello', scale: 0.96 },
    { count: 7, z: 5.3, width: 10.2, instrument: 'woodwind', scale: 0.92 },
    { count: 6, z: 7.1, width: 9.2, instrument: 'brass', scale: 0.94 },
    { count: 4, z: 8.8, width: 7.4, instrument: 'bass', scale: 1 },
    { count: 4, z: 10.2, width: 6.2, instrument: 'percussion', scale: 1 },
  ];

  rows.forEach((row, rowIndex) => {
    for (let i = 0; i < row.count; i += 1) {
      const t = row.count === 1 ? 0 : i / (row.count - 1) - 0.5;
      const x = stageX + t * row.width;
      const z = stageZ - 2.6 + row.z + Math.abs(t) * 0.7;
      const angle = Math.PI + t * 0.34;
      addOrchestraPlayer(scene, materials, [x, z], angle, row.instrument, row.scale);
    }
  });

  [
    [roomCenterX - 18.2, cz - 12.7, Math.PI / 2],
    [roomCenterX - 18.2, cz + 12.7, Math.PI / 2],
    [roomCenterX - 11.2, cz + 15.2, 0],
  ].forEach(([x, z, rotation]) => addClassicalStatue(scene, materials, obstacles, [x, z], rotation, 1.12));
}

function addMuseumDecor(scene, materials, obstacles) {
  [
    [0, -58, 4.8, '#8fdfff'],
    [-24, -38, 4.5, '#8fdfff'],
    [24, -12, 4.6, '#74d9ff'],
    [-24, 16, 4.6, '#c27bff'],
    [24, 44, 4.6, '#d0a35a'],
    [-28, 82, 5.2, '#9fe6ff'],
    [0, 104, 4.8, '#d0a35a'],
  ].forEach(([x, z, radius, accent]) => addMosaic(scene, [x, z], radius, accent));

  [
    [-31.8, -48.4, 0],
    [-18.4, -48.4, 0],
    [14.4, -3.8, Math.PI / 2],
    [34.4, -3.8, Math.PI / 2],
    [-49.6, 29.2, Math.PI / 2],
    [-49.6, 2.8, Math.PI / 2],
    [14.4, 52.2, Math.PI / 2],
    [34.4, 52.2, Math.PI / 2],
    [-40.2, 98.2, 0],
  ].forEach(([x, z, rotation]) => addMuseumBench(scene, materials, obstacles, [x, z], rotation));

  addGlassCase(scene, materials, obstacles, [-24, -38], 0, 'artifact');
  addGlassCase(scene, materials, obstacles, [24, -12], 0, 'tech');
  addGlassCase(scene, materials, obstacles, [-15.4, 30], Math.PI / 2, 'music');
  addGlassCase(scene, materials, obstacles, [24, 44], 0, 'finance');
  addGlassCase(scene, materials, obstacles, [-28, 82], Math.PI / 2, 'photo');

  addThemedSculpture(scene, materials, obstacles, [30.5, -12], 'tech');
  addThemedSculpture(scene, materials, obstacles, [30.5, 44], 'finance');
  addThemedSculpture(scene, materials, obstacles, [-47.6, 16], 'music');
  addGrandOrchestraHall(scene, materials, obstacles);

  addGrandVase(scene, materials, obstacles, [-5.4, -56], -0.4);
  addGrandVase(scene, materials, obstacles, [5.4, -56], 0.4);
  addGrandVase(scene, materials, obstacles, [5.2, 104], Math.PI);
  addGrandVase(scene, materials, obstacles, [-5.2, 104], Math.PI);
  addGrandVase(scene, materials, obstacles, [-13.2, -47.5], 0);
  addGrandVase(scene, materials, obstacles, [13.2, -22.5], 0);
  addGrandVase(scene, materials, obstacles, [-13.2, 5.5], 0);
  addGrandVase(scene, materials, obstacles, [13.2, 33.5], 0);
  addGrandVase(scene, materials, obstacles, [-13.2, 63.5], 0);

  addRopeBarrier(scene, materials, obstacles, [
    [-26.2, -40.6],
    [-21.8, -40.6],
    [-21.8, -35.4],
    [-26.2, -35.4],
  ]);
  addRopeBarrier(scene, materials, obstacles, [
    [21.4, 41.2],
    [26.6, 41.2],
    [26.6, 46.8],
    [21.4, 46.8],
  ]);
  addRopeBarrier(scene, materials, obstacles, [
    [-30.6, 79.2],
    [-25.4, 79.2],
    [-25.4, 84.8],
    [-30.6, 84.8],
  ]);
}

function createGallery(scene, materials, cameraBlockers, obstacles, animatedDoves) {
  rooms.forEach((room) => addRoom(scene, materials, cameraBlockers, obstacles, room));

  addGrandCorridor(scene, materials, cameraBlockers);
  portals.forEach((portal) => addPortico(scene, materials, cameraBlockers, portal));

  const doveMaterials = createDoveMaterial();
  const statueBase = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.55, 0.9, 28), materials.column);
  statueBase.position.set(-5.3, 0.45, -52.5);
  statueBase.castShadow = true;
  statueBase.receiveShadow = true;
  scene.add(statueBase);
  cameraBlockers.push(statueBase);

  const doveStatue = createDove(doveMaterials, 1.75);
  doveStatue.position.set(-5.3, 1.48, -52.5);
  doveStatue.rotation.set(0.05, -0.7, 0);
  scene.add(doveStatue);

  [
    [-3.8, 8.2, -42, 0.7, 0.72],
    [3.8, 9.1, -6, -0.8, 0.62],
    [-3.6, 8.2, 28, 1.2, 0.58],
    [3.6, 8.6, 64, -1.1, 0.58],
    [2.5, 9.3, 96, 0.2, 0.62],
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
  photoWallPieces.forEach((piece) => addWallPhoto(scene, materials, piece));
  addIdentityWall(scene, materials);
  addTechArchive(scene, materials);
  addFinanceArchive(scene, materials);
  addMusicArchive(scene, materials);
  addGuideSystem(scene, materials);
  addMuseumDecor(scene, materials, obstacles);
}

function createExhibit(scene, exhibit, materials, cameraBlockers) {
  const group = new THREE.Group();
  group.position.set(...exhibit.position);
  group.rotation.y = exhibit.rotation;
  group.userData.exhibit = exhibit;
  group.userData.baseY = exhibit.position[1];

  let map = createCategoryTexture(exhibit);
  if (exhibit.image) {
    map = new THREE.TextureLoader().load(exhibit.image);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 8;
  }

  const canvasMaterial = new THREE.MeshStandardMaterial({
    map,
    roughness: exhibit.image ? 0.42 : 0.62,
    metalness: exhibit.image ? 0.03 : 0.08,
    emissive: 0x1d1212,
    emissiveIntensity: exhibit.image ? 0.035 : 0.08,
  });

  const isPhoto = Boolean(exhibit.image);
  const artWidth = isPhoto ? 6.35 : 5.45;
  const artHeight = isPhoto ? 4.2 : 4.05;

  const backing = new THREE.Mesh(new THREE.BoxGeometry(artWidth + 0.82, artHeight + 0.82, 0.22), materials.exhibitBack);
  backing.position.z = -0.18;
  backing.castShadow = true;
  group.add(backing);

  const canvas = new THREE.Mesh(new THREE.PlaneGeometry(artWidth, artHeight), canvasMaterial);
  canvas.userData.exhibit = exhibit;
  canvas.castShadow = true;
  group.add(canvas);

  [
    { size: [artWidth + 0.42, 0.18, 0.26], position: [0, artHeight / 2 + 0.16, -0.04] },
    { size: [artWidth + 0.42, 0.18, 0.26], position: [0, -artHeight / 2 - 0.16, -0.04] },
    { size: [0.18, artHeight + 0.42, 0.26], position: [-artWidth / 2 - 0.16, 0, -0.04] },
    { size: [0.18, artHeight + 0.42, 0.26], position: [artWidth / 2 + 0.16, 0, -0.04] },
  ].forEach(({ size, position }) => {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(...size), materials.frame);
    frame.position.set(...position);
    frame.castShadow = true;
    group.add(frame);
  });

  const highlight = new THREE.Mesh(
    new THREE.RingGeometry(2.95, 3.08, 48),
    new THREE.MeshBasicMaterial({
      color: isPhoto ? 0x9fe6ff : 0xf4c36a,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  highlight.position.z = 0.035;
  highlight.scale.set(artWidth / 6.1, artHeight / 6.1, 1);
  highlight.userData.isExhibitHighlight = true;
  group.add(highlight);

  if (isPhoto) {
    const glass = new THREE.Mesh(
      new THREE.PlaneGeometry(artWidth, artHeight),
      new THREE.MeshBasicMaterial({ color: 0xcfefff, transparent: true, opacity: 0.07, depthWrite: false }),
    );
    glass.position.z = 0.025;
    group.add(glass);
  }

  const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, artWidth * 0.42, 10), materials.brass);
  lamp.position.set(0, artHeight / 2 + 0.58, 0.16);
  lamp.rotation.z = Math.PI / 2;
  group.add(lamp);

  if (exhibit.image) {
    const plate = new THREE.Mesh(
      new THREE.PlaneGeometry(2.55, 0.46),
      new THREE.MeshStandardMaterial({
        map: createCategoryTexture({ ...exhibit, subtitle: 'Gallery' }),
        roughness: 0.52,
        metalness: 0.08,
      }),
    );
    plate.position.set(0, -artHeight / 2 - 0.42, 0.08);
    plate.scale.y = 0.34;
    group.add(plate);
  }

  const shelf = new THREE.Mesh(new THREE.BoxGeometry(artWidth * 0.72, 0.18, 0.54), materials.blackMetal);
  shelf.position.set(0, -artHeight / 2 - 0.28, -0.08);
  shelf.castShadow = true;
  group.add(shelf);

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
  return { group, canvas, highlight, trigger, triggerPosition, triggerRadius: 2.05, data: exhibit };
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

function getIsTouchExperience() {
  return (
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches || window.innerWidth <= 720)
  );
}

function getGuideStepForPosition(position) {
  if (position.z > 68) {
    return guideStepMap.photo;
  }
  if (position.z > 34) {
    return guideStepMap.finance;
  }
  if (position.z > 6) {
    return guideStepMap.music;
  }
  if (position.z > -24) {
    return guideStepMap.tech;
  }
  return guideStepMap.start;
}

function MuseumExperience() {
  const mountRef = React.useRef(null);
  const keysRef = usePressedKeys();
  const [selectedExhibit, setSelectedExhibit] = React.useState(null);
  const [nearbyExhibit, setNearbyExhibit] = React.useState(null);
  const [guideStep, setGuideStep] = React.useState(guideStepMap.start);
  const [isTouchExperience, setIsTouchExperience] = React.useState(getIsTouchExperience);
  const [webglUnavailable, setWebglUnavailable] = React.useState(false);
  const selectedExhibitRef = React.useRef(null);
  const nearbyExhibitRef = React.useRef(null);
  const guideStepRef = React.useRef(guideStepMap.start);
  const suppressedTriggerRef = React.useRef(null);
  const isTouchExperienceRef = React.useRef(getIsTouchExperience());

  const updateSelectedExhibit = React.useCallback((exhibit) => {
    const currentId = selectedExhibitRef.current?.id ?? null;
    const nextId = exhibit?.id ?? null;
    if (currentId === nextId) {
      return;
    }
    selectedExhibitRef.current = exhibit;
    setSelectedExhibit(exhibit);
  }, []);

  const updateNearbyExhibit = React.useCallback((exhibit) => {
    const currentId = nearbyExhibitRef.current?.id ?? null;
    const nextId = exhibit?.id ?? null;
    if (currentId === nextId) {
      return;
    }
    nearbyExhibitRef.current = exhibit;
    setNearbyExhibit(exhibit);
  }, []);

  const updateGuideStep = React.useCallback((step) => {
    if (!step || guideStepRef.current?.id === step.id) {
      return;
    }
    guideStepRef.current = step;
    setGuideStep(step);
  }, []);

  const openNearbyExhibit = React.useCallback(() => {
    const exhibit = nearbyExhibitRef.current;
    if (exhibit) {
      suppressedTriggerRef.current = null;
      updateSelectedExhibit(exhibit);
    }
  }, [updateSelectedExhibit]);

  const closeSelectedExhibit = React.useCallback(() => {
    const exhibit = selectedExhibitRef.current || nearbyExhibitRef.current;
    if (exhibit) {
      suppressedTriggerRef.current = exhibit.id;
    }
    updateSelectedExhibit(null);
  }, [updateSelectedExhibit]);

  React.useEffect(() => {
    const updateTouchExperience = () => {
      const next = getIsTouchExperience();
      isTouchExperienceRef.current = next;
      setIsTouchExperience(next);
    };
    const pointerQuery = window.matchMedia('(pointer: coarse)');
    const hoverQuery = window.matchMedia('(hover: none)');
    const addQueryListener = (query) => {
      if (query.addEventListener) {
        query.addEventListener('change', updateTouchExperience);
      } else {
        query.addListener(updateTouchExperience);
      }
    };
    const removeQueryListener = (query) => {
      if (query.removeEventListener) {
        query.removeEventListener('change', updateTouchExperience);
      } else {
        query.removeListener(updateTouchExperience);
      }
    };

    updateTouchExperience();
    addQueryListener(pointerQuery);
    addQueryListener(hoverQuery);
    window.addEventListener('resize', updateTouchExperience);

    return () => {
      removeQueryListener(pointerQuery);
      removeQueryListener(hoverQuery);
      window.removeEventListener('resize', updateTouchExperience);
    };
  }, []);

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x100d0b);
    scene.fog = new THREE.Fog(0x100d0b, 64, 190);

    const getCameraFov = () => (mount.clientWidth <= 720 || isTouchExperienceRef.current ? 62 : 54);
    const camera = new THREE.PerspectiveCamera(getCameraFov(), mount.clientWidth / mount.clientHeight, 0.1, 240);
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
    renderer.toneMappingExposure = 1.24;
    renderer.shadowMap.enabled = PERFORMANCE.shadows;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    mount.appendChild(renderer.domElement);

    const cameraBlockers = [];
    const obstacles = [];
    const animatedDoves = [];
    const materials = {
      floor: new THREE.MeshStandardMaterial({ map: createMarbleTexture(), roughness: 0.46, metalness: 0.08 }),
      darkFloor: new THREE.MeshStandardMaterial({
        map: createDarkStoneTexture(),
        roughness: 0.42,
        metalness: 0.12,
        emissive: 0x17100b,
        emissiveIntensity: 0.16,
      }),
      wall: new THREE.MeshStandardMaterial({ map: createRenaissanceWallTexture(), roughness: 0.78, metalness: 0.03 }),
      woodWall: new THREE.MeshStandardMaterial({
        map: createWoodPanelTexture(),
        roughness: 0.56,
        metalness: 0.06,
        emissive: 0x1c1008,
        emissiveIntensity: 0.14,
      }),
      techWall: new THREE.MeshStandardMaterial({
        map: createTechWallTexture(),
        roughness: 0.66,
        metalness: 0.08,
        emissive: 0x061923,
        emissiveIntensity: 0.17,
      }),
      listeningWall: new THREE.MeshStandardMaterial({
        map: createListeningWallTexture(),
        roughness: 0.7,
        metalness: 0.05,
        emissive: 0x1b0b18,
        emissiveIntensity: 0.17,
      }),
      photoWall: new THREE.MeshStandardMaterial({
        map: createPhotoWallTexture(),
        roughness: 0.76,
        metalness: 0.02,
        emissive: 0x1b1712,
        emissiveIntensity: 0.12,
      }),
      ceiling: new THREE.MeshStandardMaterial({ color: 0xa98f6c, roughness: 0.8 }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0xc7e6ff, roughness: 0.18, transmission: 0.34, transparent: true, opacity: 0.38 }),
      column: new THREE.MeshStandardMaterial({ color: 0xb8a27f, roughness: 0.62, metalness: 0.05 }),
      brass: new THREE.MeshStandardMaterial({ color: 0xbc8a3b, roughness: 0.32, metalness: 0.7 }),
      renaissanceGold: new THREE.MeshStandardMaterial({ color: 0xd8a64f, roughness: 0.26, metalness: 0.74 }),
      roseGold: new THREE.MeshStandardMaterial({ color: 0xb66a58, roughness: 0.34, metalness: 0.62 }),
      blueLine: new THREE.MeshStandardMaterial({ color: 0x69d9ff, roughness: 0.28, metalness: 0.35, emissive: 0x0a3b56, emissiveIntensity: 0.18 }),
      blackMetal: new THREE.MeshStandardMaterial({ color: 0x151719, roughness: 0.34, metalness: 0.58 }),
      darkWood: new THREE.MeshStandardMaterial({ color: 0x3a1c12, roughness: 0.42, metalness: 0.08 }),
      stageWood: new THREE.MeshStandardMaterial({ color: 0x5b2f1c, roughness: 0.36, metalness: 0.08 }),
      instrumentWood: new THREE.MeshStandardMaterial({ color: 0x8a4a22, roughness: 0.34, metalness: 0.05 }),
      parchment: new THREE.MeshStandardMaterial({ color: 0xf1dfb6, roughness: 0.64, metalness: 0.02 }),
      statueMarble: new THREE.MeshStandardMaterial({ color: 0xd8cfbd, roughness: 0.56, metalness: 0.04 }),
      lightBulb: new THREE.MeshBasicMaterial({ color: 0xfff2c5 }),
      frame: new THREE.MeshStandardMaterial({ color: 0x4d2517, roughness: 0.45, metalness: 0.18 }),
      exhibitBack: new THREE.MeshStandardMaterial({ color: 0x1a1210, roughness: 0.62, metalness: 0.06 }),
    };

    scene.add(new THREE.HemisphereLight(0xfff2d8, 0x1f2d35, 1.48));
    scene.add(new THREE.AmbientLight(0x3a2d24, 0.58));
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
    addMuseumLighting(scene);

    createGallery(scene, materials, cameraBlockers, obstacles, animatedDoves);
    const avatar = createCubistAvatar();
    avatar.position.set(0, 0, -58);
    scene.add(avatar);
    const npcVisitors = createNpcVisitors(scene);
    const exhibitMeshes = exhibits.map((exhibit) => createExhibit(scene, exhibit, materials, cameraBlockers));

    const cameraRaycaster = new THREE.Raycaster();
    const pointer = { dragging: false, id: null, lastX: 0, lastY: 0, moved: 0 };
    let activeTriggerId = null;

    let yaw = 0;
    let pitch = 0.16;
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
      if (selectedExhibitRef.current) {
        return;
      }
      event.preventDefault();
      pointer.dragging = true;
      pointer.id = event.pointerId;
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
      pointer.moved = 0;
      renderer.domElement.setPointerCapture?.(event.pointerId);
    };

    const handlePointerMove = (event) => {
      if (!pointer.dragging) {
        return;
      }
      if (pointer.id !== null && event.pointerId !== pointer.id) {
        return;
      }
      event.preventDefault();
      const dx = event.clientX - pointer.lastX;
      const dy = event.clientY - pointer.lastY;
      pointer.moved += Math.abs(dx) + Math.abs(dy);
      yaw -= dx * 0.0048;
      pitch = THREE.MathUtils.clamp(pitch + dy * 0.003, -0.72, 0.72);
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
    };

    const handlePointerUp = (event) => {
      const wasDragging = pointer.dragging && (pointer.id === null || event.pointerId === pointer.id);
      if (!wasDragging) {
        return;
      }
      const isTap = pointer.moved < 10;
      pointer.dragging = false;
      pointer.id = null;
      try {
        renderer.domElement.releasePointerCapture?.(event.pointerId);
      } catch {
        // Pointer capture can already be released by the browser during gesture cancellation.
      }
      if (isTap && isTouchExperienceRef.current && nearbyExhibitRef.current && !selectedExhibitRef.current) {
        suppressedTriggerRef.current = null;
        updateSelectedExhibit(nearbyExhibitRef.current);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        suppressedTriggerRef.current = selectedExhibitRef.current?.id || nearbyExhibitRef.current?.id || activeTriggerId;
        activeTriggerId = null;
        updateSelectedExhibit(null);
      }
      if ((event.key === 'Enter' || event.key === ' ') && nearbyExhibitRef.current && !selectedExhibitRef.current) {
        event.preventDefault();
        suppressedTriggerRef.current = null;
        updateSelectedExhibit(nearbyExhibitRef.current);
      }
    };

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.fov = getCameraFov();
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

      if (!(isTouchExperienceRef.current && selectedExhibitRef.current)) {
        if (keys.has('w') || keys.has('arrowup')) velocity.add(forward);
        if (keys.has('s') || keys.has('arrowdown')) velocity.sub(forward);
        if (keys.has('a') || keys.has('arrowleft')) velocity.sub(right);
        if (keys.has('d') || keys.has('arrowright')) velocity.add(right);
        if (keys.has('q')) yaw += delta * 1.6;
        if (keys.has('e')) yaw -= delta * 1.6;
      }

      if (velocity.lengthSq() > 0) {
        velocity.normalize().multiplyScalar(8.8 * delta);
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

      const cameraOrbitDistance = 9.2;
      const horizontalDistance = Math.max(2.4, Math.cos(pitch) * cameraOrbitDistance);
      const lookHeight = pitch < -0.1 ? THREE.MathUtils.mapLinear(pitch, -0.72, -0.1, 7.4, 2.8) : 2.35;
      target.copy(avatar.position).add(new THREE.Vector3(0, lookHeight, 0));
      desiredCamera.set(
        avatar.position.x + Math.sin(yaw) * horizontalDistance,
        avatar.position.y + Math.sin(pitch) * cameraOrbitDistance + 2.65,
        avatar.position.z + Math.cos(yaw) * horizontalDistance,
      );
      desiredCamera.y = THREE.MathUtils.clamp(desiredCamera.y, 1.55, 8.6);

      cameraDirection.copy(desiredCamera).sub(target);
      const cameraDistance = cameraDirection.length();
      cameraDirection.normalize();
      cameraRaycaster.set(target, cameraDirection);
      const cameraHits = cameraRaycaster.intersectObjects(cameraBlockers, true);
      const blockingHit = cameraHits.find((hit) => hit.distance > 1.2 && hit.distance < cameraDistance);
      if (blockingHit) {
        const clearDistance = THREE.MathUtils.clamp(blockingHit.distance - 0.75, 1.65, cameraDistance);
        actualCamera.copy(target).add(cameraDirection.multiplyScalar(clearDistance));
        actualCamera.y = Math.max(actualCamera.y, target.y + (blockingHit.distance < 2.4 ? 1.1 : 0.55));
      } else {
        actualCamera.copy(desiredCamera);
      }

      camera.position.lerp(actualCamera, 0.22);
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

      updateGuideStep(getGuideStepForPosition(avatar.position));

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
      exhibitMeshes.forEach(({ group, highlight, trigger, triggerPosition, triggerRadius, data }) => {
        const distance = avatar.position.distanceTo(triggerPosition);
        const isActive = distance < triggerRadius;
        if (isActive) {
          steppedExhibit = data;
        }
        const focus = THREE.MathUtils.clamp(1 - (distance - triggerRadius) / 4.5, 0, 1);
        group.position.y = group.userData.baseY + Math.sin(elapsed * 1.8 + triggerPosition.x * 0.06) * 0.018 * focus;
        if (highlight?.material) {
          highlight.material.opacity = focus * (isActive ? 0.62 : 0.24);
          highlight.rotation.z += delta * (0.26 + focus * 0.8);
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
        updateNearbyExhibit(steppedExhibit);
        if (suppressedTriggerRef.current && suppressedTriggerRef.current !== steppedExhibit.id) {
          suppressedTriggerRef.current = null;
        }
        if (steppedExhibit.id !== activeTriggerId) {
          activeTriggerId = steppedExhibit.id;
        }
        if (!isTouchExperienceRef.current && suppressedTriggerRef.current !== steppedExhibit.id) {
          updateSelectedExhibit(steppedExhibit);
        }
      } else if (activeTriggerId) {
        activeTriggerId = null;
        suppressedTriggerRef.current = null;
        updateNearbyExhibit(null);
        updateSelectedExhibit(null);
      } else {
        updateNearbyExhibit(null);
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
  }, [keysRef, updateGuideStep, updateNearbyExhibit, updateSelectedExhibit]);

  const setTouchKey = React.useCallback((key, pressed) => {
    if (pressed) {
      keysRef.current.add(key);
    } else {
      keysRef.current.delete(key);
    }
  }, [keysRef]);

  const touchKeyProps = (key) => ({
    onPointerDown: (event) => {
      event.preventDefault();
      event.currentTarget.setPointerCapture?.(event.pointerId);
      setTouchKey(key, true);
    },
    onPointerUp: (event) => {
      event.preventDefault();
      event.currentTarget.releasePointerCapture?.(event.pointerId);
      setTouchKey(key, false);
    },
    onPointerCancel: (event) => {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
      setTouchKey(key, false);
    },
    onPointerLeave: () => setTouchKey(key, false),
  });

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
          <p>当前浏览器环境使用 2D 预览，普通 Chrome/Safari 窗口会自动进入 3D 展馆。</p>
        </div>
      )}

      <header className="hud-top">
        <div>
          <p>Modern Archive Museum</p>
          <h1>{profile.name}</h1>
        </div>
        <div className="hud-location" aria-hidden="true">
          <span>Now Showing</span>
          <strong>{nearbyExhibit ? nearbyExhibit.title : guideStep.zone}</strong>
        </div>
      </header>

      {!webglUnavailable && (
        <>
          <section className="guide-panel" aria-label="Guided museum route">
            <span>{guideStep.step}</span>
            <div>
              <p>{guideStep.zone}</p>
              <h2>{guideStep.title}</h2>
              <strong>{guideStep.cue}</strong>
              <small>{guideStep.instruction}</small>
            </div>
            <em>{guideStep.next}</em>
          </section>

          <div className="control-hint">
            <span>{isTouchExperience ? '方向键' : 'WASD'}</span>
            <span>{isTouchExperience ? '拖动空白处' : '拖拽视角'}</span>
            <span>{isTouchExperience ? '靠近展品' : '走近展牌'}</span>
            <span>Enter 查看</span>
          </div>

          <div className="touch-pad" aria-label="Touch movement controls">
            <button type="button" aria-label="向前" {...touchKeyProps('w')}>
              ↑
            </button>
            <button type="button" aria-label="向左" {...touchKeyProps('a')}>
              ←
            </button>
            <button type="button" aria-label="向后" {...touchKeyProps('s')}>
              ↓
            </button>
            <button type="button" aria-label="向右" {...touchKeyProps('d')}>
              →
            </button>
          </div>

          <div className="touch-look-pad" aria-label="Touch camera controls">
            <button type="button" aria-label="向左转" {...touchKeyProps('q')}>
              ↶
            </button>
            <button type="button" aria-label="向右转" {...touchKeyProps('e')}>
              ↷
            </button>
          </div>
        </>
      )}

      {!webglUnavailable && isTouchExperience && nearbyExhibit && !selectedExhibit && (
        <button type="button" className="inspect-button" onClick={openNearbyExhibit}>
          查看 {nearbyExhibit.title}
        </button>
      )}

      {selectedExhibit && (
        <div className="detail-overlay">
          <article className="detail-card">
            <button type="button" className="detail-close" aria-label="关闭详情" onClick={closeSelectedExhibit}>
              ×
            </button>
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
