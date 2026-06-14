const site = document.getElementById('fallback-portfolio');
const home = site.querySelector('[data-view="home"]');
const corridor = site.querySelector('[data-view="corridor"]');
const track = site.querySelector('.fallback-corridor-track');
const mainDoor = site.querySelector('[data-start]');
const roomPanel = site.querySelector('.fallback-room');

const rooms = {
  about: {
    kind: 'about',
    label: '简介',
    title: '个人简介',
    body: '我是献超前，技术 ID 为 LeoninCS，河南大学软件工程专业本科在读，预计于 2027 年毕业。目前在杭州一家开源初创公司实习，持续参与实际工程项目与开源相关工作。AI重度患者，日均上亿token用量；DevOps理念践行者，具备Go后端、AI Agent开发能力、Docker、Kubernetes等云原生技术部署运维能力，并具备实际项目落地经验；开源贡献者，维护Sealos合规组件，个人项目github累计400+star；技术内容创作者，全网累计1500+粉丝，1.5w+点赞收藏数;Web3信徒，认同去中心化的理念。生活中，我喜欢 骑行、摄影与 Hi-Fi，也常听 Hip Hop 和 R&B。除此之外，我对投资理财也有一定兴趣，主要关注美股与加密货币，保持对技术与生活的长期探索。',
    hero: '/textures/contact/paper_form.webp',
    heroAlt: '手绘简历纸张',
    items: [
      { title: '姓名', text: '献超前 / Xianchao Qian / LeoninCS', image: '/textures/contact/send_button.webp', type: 'icon', alt: '姓名入口图标' },
      { title: '学校', text: '河南大学软件工程本科在读，开封', image: '/textures/about/SOTDAYYOUNGMULTIORPETRON.webp', type: 'object', alt: '学校记录卡' },
      { title: '联系方式', text: 'xianchaoqian@foxmail.com / GitHub: LeoninCS', image: '/textures/studio/phone_front_painted.webp', type: 'object', alt: '联系方式展示屏' },
      { title: '方向', text: 'Go 后端、AI Agent、DevOps、GoWeb、Docker、Kubernetes、云原生部署运维', image: '/textures/contact/latarnia.webp', type: 'object', alt: '方向灯塔' },
    ],
  },
  gallery: {
    kind: 'projects',
    label: '经历',
    title: '实习与项目经历',
    body: '这里展示 Sealos 系统组实习、CompliK、GCFeed、SDD Agent Harness 和 GoClub，把工程经历集中放进项目房间。',
    hero: '/textures/gallery/monetuneprzod_painted.webp',
    heroAlt: '手绘项目卡片',
    items: [
      { title: 'CompliK', text: 'Admin 全栈、系统适配、CI、多端分析插件、ProcScan', image: '/textures/gallery/bioprzod_painted.webp', type: 'object', alt: 'CompliK 实习展示卡' },
      { title: 'GCFeed', text: 'Go、Gin、GORM、Redis、MQ、MySQL、内容流工程', image: '/textures/gallery/timberkittyprzod_painted.webp', type: 'object', alt: 'GCFeed 手绘项目卡片' },
      { title: 'SDD Agent Harness', text: 'VS Code、RAG、多 Agent、自动门禁、文档回写', image: '/textures/studio/monitorfront_postnafbdoublewinner.webp', type: 'object', alt: 'Agent 工程项目展示屏' },
      { title: 'GoClub', text: 'Hugo、GitHub Pages、Cloudflare、面经与八股知识库', image: '/textures/gallery/monetuneprzod_painted.webp', type: 'object', alt: 'GoClub 手绘项目卡片' },
    ],
  },
  studio: {
    kind: 'studio',
    label: '竞赛',
    title: '竞赛与成就',
    body: '这里展示 LeetCode 2100、Codeforces 1653、1500+ Problems、河南大学 ACM 集训队、CCPC 金牌、天梯赛个人国二、蓝桥杯省一、百度之星初赛铜奖和 ICPC 现场经验。',
    hero: '/textures/studio/monitor_front_painted.webp',
    heroAlt: '手绘竞赛显示器',
    items: [
      { title: 'LeetCode 2100', text: '长期算法训练和复杂问题复盘', image: '/textures/about/SOTDAYYOUNGMULTIGSAP.webp', type: 'object', alt: 'LeetCode 记录卡' },
      { title: 'Codeforces 1653', text: '竞赛能力记录，ACM 训练背景', image: '/textures/about/SOTDAYYOUNGMULTICSSWINNER.webp', type: 'object', alt: 'Codeforces 记录卡' },
      { title: 'CCPC / GPLT', text: '2026 CCPC 河南省赛金牌，天梯赛个人全国二等奖', image: '/textures/about/SOTDAYYOUNGMULTIORPETRON.webp', type: 'object', alt: 'CCPC 与天梯赛记录卡' },
      { title: '蓝桥杯 / 百度之星', text: '2025 蓝桥杯省一，百度之星初赛铜奖', image: '/textures/about/SOTDAYYOUNGMULTIDESIGNNOMINESS.webp', type: 'object', alt: '蓝桥杯与百度之星记录卡' },
    ],
  },
  contact: {
    kind: 'contact',
    label: '爱好',
    title: '爱好与生活记录',
    body: '这里展示音乐 HiFi、R&B、Jazz、Hip-Hop、Pop、投资观察、商业模式研究、摄影展览和 10000+ 公里骑行记录。',
    hero: '/picture/01-city-tower-blue-hour.jpg',
    heroAlt: '城市摄影照片',
    items: [
      { title: '音乐与 HiFi', text: 'R&B / Jazz / Hip-Hop / Pop', image: '/picture/21-river-dusk-boat.jpg', type: 'photo', alt: '音乐生活氛围照片' },
      { title: '股票与投资观察', text: '商业模式、现金流、技术趋势、基础设施周期', image: '/picture/16-lake-sunset-wide.jpg', type: 'photo', alt: '湖畔落日摄影照片' },
      { title: '摄影展览', text: '城市、自然、旅途和日常记录', image: '/picture/01-city-tower-blue-hour.jpg', type: 'photo', alt: '城市蓝调摄影照片' },
      { title: '骑行 10000+ 公里', text: '环太湖、环海南岛、城市、海岸、山野和长距离记录', image: '/picture/38-bike-coastal-road.jpg', type: 'photo', alt: '骑行生活照片' },
    ],
  },
};

let corridorIndex = 0;
let wheelLock = false;

function setView(view) {
  const isHome = view === 'home';
  home.classList.toggle('is-active', isHome);
  corridor.classList.toggle('is-active', !isHome);
  site.dataset.view = view;
  if (isHome) {
    closeRoom();
    corridorIndex = 0;
    updateCorridor();
  }
}

function updateCorridor() {
  const mobile = window.matchMedia('(max-width: 760px)').matches;
  const offset = mobile ? -corridorIndex * 236 : (1.5 - corridorIndex) * 210;
  track.style.setProperty('--corridor-x', mobile ? '0px' : `${offset}px`);
  track.style.setProperty('--corridor-y', mobile ? `${offset}px` : '0px');
}

function openRoom(roomId) {
  const room = rooms[roomId];
  if (!room) return;
  roomPanel.dataset.kind = room.kind;
  site.querySelectorAll('.fallback-door-card').forEach((door) => {
    door.classList.toggle('is-active', door.dataset.room === roomId);
  });
  roomPanel.innerHTML = `
    <div class="fallback-room-top">
      <figure class="fallback-room-hero fallback-room-hero-${room.kind}">
        <img src="${room.hero}" alt="${room.heroAlt}" loading="lazy" decoding="async">
      </figure>
      <header class="fallback-room-copy">
        <span>${room.label}</span>
        <h2>${room.title}</h2>
        <p>${room.body}</p>
      </header>
    </div>
    <ul class="fallback-room-grid">
      ${room.items.map((item) => `
        <li class="fallback-room-card is-${item.type}">
          <figure>
            <img src="${item.image}" alt="${item.alt}" loading="lazy" decoding="async">
          </figure>
          <div>
            <strong>${item.title}</strong>
            <span>${item.text}</span>
          </div>
        </li>
      `).join('')}
    </ul>
    <button type="button" data-close-room>关闭纸条</button>
  `;
  roomPanel.classList.add('is-open');
  roomPanel.querySelector('[data-close-room]').addEventListener('click', closeRoom);
}

function closeRoom() {
  roomPanel.classList.remove('is-open');
  delete roomPanel.dataset.kind;
  site.querySelectorAll('.fallback-door-card').forEach((door) => door.classList.remove('is-active'));
}

function stepCorridor(direction) {
  corridorIndex += direction;
  if (corridorIndex > 3) {
    setView('home');
    return;
  }
  if (corridorIndex < 0) corridorIndex = 0;
  updateCorridor();
}

mainDoor.addEventListener('click', () => {
  mainDoor.classList.add('is-pressed');
  window.setTimeout(() => {
    mainDoor.classList.remove('is-pressed');
    setView('corridor');
  }, 260);
});

site.querySelector('[data-home]').addEventListener('click', () => setView('home'));

site.querySelectorAll('.fallback-door-card').forEach((door, index) => {
  door.addEventListener('click', () => {
    corridorIndex = index;
    updateCorridor();
    openRoom(door.dataset.room);
  });
});

site.addEventListener('wheel', (event) => {
  if (site.dataset.view !== 'corridor') return;
  if (event.target.closest('.fallback-room')) return;
  if (roomPanel.classList.contains('is-open')) return;
  event.preventDefault();
  if (wheelLock) return;
  wheelLock = true;
  stepCorridor(event.deltaY > 0 ? 1 : -1);
  window.setTimeout(() => {
    wheelLock = false;
  }, 360);
}, { passive: false });

roomPanel.addEventListener('wheel', (event) => {
  event.stopPropagation();
}, { passive: true });

site.addEventListener('pointermove', (event) => {
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;
  mainDoor.style.setProperty('--tilt-x', `${x * 6}deg`);
  mainDoor.style.setProperty('--tilt-y', `${-y * 4}deg`);
  roomPanel.style.setProperty('--room-x', `${x * 10}px`);
  roomPanel.style.setProperty('--room-y', `${y * 8}px`);
});

window.addEventListener('resize', updateCorridor);
setView('home');

const initialRoom = new URLSearchParams(window.location.search).get('room');
if (rooms[initialRoom]) {
  setView('corridor');
  corridorIndex = Object.keys(rooms).indexOf(initialRoom);
  updateCorridor();
  openRoom(initialRoom);
}
