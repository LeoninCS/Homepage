import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import Lenis from 'lenis';
import { FaBilibili, FaGithub, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { SiXiaohongshu } from 'react-icons/si';
import 'lenis/dist/lenis.css';
import './styles.css';

const projects = [
  {
    label: 'Feed',
    title: 'GCFeed',
    caption: 'GoClubFeed 面向短视频场景，围绕内容生产、分发、消费与治理链路展开，技术栈包含 Go、Gin、GORM、Redis、MQ 和 MySQL。',
    image: '/picture/46-icpc-wuhan-regional-01.jpg',
    href: 'https://github.com/LeoninCS/GCFeed',
  },
  {
    label: 'Agent',
    title: 'SDD Agent Engine',
    caption: '基于 SDD 的本地 Agent 工作流引擎，面向 VS Code、RAG、多 Agent 编排、自动门禁和文档回写闭环。',
    image: '/picture/35-programming-contest-team-photo.jpg',
    href: 'https://github.com/LeoninCS/SDD-Agent-WorkflowEngine',
  },
  {
    label: 'Cloud',
    title: 'CompliK',
    caption: 'Sealos 系统组实习项目，参与集群合规系统 Admin 开发、系统适配、CI、多端分析插件和 ProcScan 二进制分析。',
    image: '/picture/40-illuminated-arch-bridge-night.jpg',
    href: 'https://github.com/labring/CompliK',
  },
  {
    label: 'Open Source',
    title: 'GoClub',
    caption: 'Hugo + GitHub Pages + Cloudflare 搭建的 Go 后端知识库，整理面经、八股、资源索引、项目学习和技术博客。',
    image: '/picture/42-icpc-shenzhen-invitational-01.jpg',
    href: 'https://goclub.space/',
  },
];

const profileRows = [
  ['姓名', '献超前 / Xianchao Qian'],
  ['技术 ID', 'LeoninCS'],
  ['学校', '河南大学 软件工程本科在读 · 开封'],
  ['当前工作地', '杭州，中国'],
  ['求职方向', 'Agent 开发'],
  ['技术方向', 'Go · Gin · GORM · 云原生 · AI Agent'],
];

const internshipCards = [
  {
    eyebrow: '实习经历',
    title: 'Sealos 系统组实习，参与 CompliK 集群合规系统建设。',
    text: '负责 Admin 面板全栈开发、Admin 与 CompliK 适配、CompliK CI 搭建、多端分析插件、ProcScan 二进制分析和系统迭代维护。',
    note: '关键词：Admin、CI、合规扫描、ProcScan、系统适配。',
    visualTitle: 'CompliK Admin',
    visualText: 'Admin / CI / ProcScan / Plugin',
  },
];

const competitionCards = [
  {
    eyebrow: '竞赛奖项',
    title: 'OJ 训练记录稳定可查。',
    text: 'LeetCode 2100，Codeforces 1653，累计 1500+ Problems，河南大学 ACM 集训队，具备 ICPC 现场经验。',
    note: '长期算法训练支撑复杂度分析、边界覆盖和实现稳定性。',
    visualTitle: 'LeetCode 2100',
    visualText: 'Codeforces 1653 / 1500+ Problems',
  },
  {
    eyebrow: '省赛与国赛',
    title: 'CCPC 河南省赛金牌和天梯赛个人国二。',
    text: '2026 年第八届 CCPC 河南省大学生程序设计竞赛金牌，O（1）团队；2026 年第十一届中国高校计算机大赛-团体程序设计天梯赛个人全国二等奖。',
    note: '团队赛与个人赛共同体现赛时分工、题目筛选和稳定交付。',
    visualTitle: 'CCPC Gold',
    visualText: 'GPLT National Second Prize',
  },
  {
    eyebrow: '补充奖项',
    title: '蓝桥杯省一和百度之星初赛铜奖。',
    text: '2025 年第十六届蓝桥杯全国软件和信息技术专业人才大赛省赛一等奖，2025 年第二十一届百度之星程序设计大赛初赛铜奖。',
    note: '多类型竞赛经历覆盖算法基本功和短时编码能力。',
    visualTitle: 'Lanqiao / Baidu Star',
    visualText: '省一 / 初赛铜奖',
  },
];

const hobbyCards = [
  {
    eyebrow: '骑行',
    title: '长距离骑行，让身体和判断力一起在线。',
    text: '骑行累计 10000+ 公里，代表路线包括环太湖、环海南岛，习惯用路线规划、体能分配和复盘记录管理长期目标。',
    visualTitle: 'Cycling 10000+ km',
    visualText: '环太湖 / 环海南岛 / 复盘记录',
    note: '长期主义从路上开始，也会回到工程节奏里。',
  },
  {
    eyebrow: '摄影',
    title: '摄影记录城市、山野、湖畔和古建。',
    text: '偏爱自然光、街景、旅途和建筑细节，用照片记录观察力和审美判断。',
    visualTitle: 'Photography',
    visualText: '城市 / 山野 / 湖畔 / 古建',
    note: '照片是个人页面里的真实质感来源。',
  },
  {
    eyebrow: '音乐与 HiFi',
    title: 'R&B、Jazz、Hip-Hop 和 Pop 是长期听感入口。',
    text: '喜欢方大同、Kendrick Lamar、SZA、Frank Ocean、J. Cole 等，也关注 FiiO KA13、Sennheiser IE 200、声场和解析。',
    visualTitle: 'Music / HiFi',
    visualText: 'R&B / Jazz / Hip-Hop / Pop',
    note: '把听感当作一种审美训练。',
  },
  {
    eyebrow: '投资观察',
    title: '投资观察连接商业模式和长期决策。',
    text: '关注 KO、NVDA、TSM、AAPL、MSFT、GOOGL、MU、CVX，以及指数、Crypto、现金流、技术趋势和流动性周期。',
    visualTitle: 'Finance Notes',
    visualText: '商业模式 / 现金流 / 技术趋势',
    note: '用结构化记录训练信息判断。',
  },
];

const contactEmail = 'xianchaoqian@foxmail.com';

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/LeoninCS',
    detail: 'github.com/LeoninCS',
    Icon: FaGithub,
    summary: '代码、开源项目和工程记录',
  },
  {
    name: 'X',
    href: 'https://x.com/xxxmvp2',
    detail: 'x.com/xxxmvp2',
    Icon: FaXTwitter,
    summary: '观点、技术观察和理财记录',
  },
  {
    name: 'Bilibili',
    href: 'https://space.bilibili.com/491359383',
    detail: 'space.bilibili.com/491359383',
    Icon: FaBilibili,
    summary: '视频内容与生活记录',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/forever_mvp0?igsh=MXhnNjA3ZjFkbTZwbg==',
    detail: 'forever_mvp0',
    Icon: FaInstagram,
    summary: '摄影与旅途照片',
  },
  {
    name: '小红书',
    href: 'https://xhslink.com/m/68F5FSoWMxt',
    detail: 'xhslink.com/m/68F5FSoWMxt',
    Icon: SiXiaohongshu,
    summary: '骑行、摄影和生活方式',
  },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function useScrollEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const handleResize = () => update();
    const rootVars = new Map();
    const setRootVar = (name, value) => {
      if (rootVars.get(name) === value) {
        return;
      }

      rootVars.set(name, value);
      root.style.setProperty(name, value);
    };
    const revealTargets = [
      '.hero-device',
      '.split-heading',
      '.feature-stage',
      '.feature-caption',
      '.get-card',
      '.profile-grid div',
      '.social-strip a',
      '.final-copy',
    ].join(',');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      {
        rootMargin: '0px 0px 8% 0px',
        threshold: 0.08,
      },
    );

    const observedTargets = new WeakSet();
    const observeRevealTargets = (scope = document) => {
      if (scope.matches?.(revealTargets) && !observedTargets.has(scope)) {
        observedTargets.add(scope);
        observer.observe(scope);
      }

      scope.querySelectorAll?.(revealTargets).forEach((element) => {
        if (!observedTargets.has(element)) {
          observedTargets.add(element);
          observer.observe(element);
        }
      });
    };

    observeRevealTargets();

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            observeRevealTargets(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const lenis = new Lenis({
      autoRaf: true,
      autoToggle: true,
      anchors: true,
      lerp: 0.1,
      syncTouch: false,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      overscroll: true,
    });

    window.lenis = lenis;
    setRootVar('--hero-device-y', '0px');
    setRootVar('--hero-device-opacity', '1');
    setRootVar('--hero-ui-opacity', '1');

    const stackCards = [...document.querySelectorAll('.get-card')];
    const stackSection = document.querySelector('.what-section');

    const update = (nextScroll) => {
      const scrollY = nextScroll ?? lenis.animatedScroll ?? window.scrollY;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const heroMotionProgress = clamp(scrollY / Math.min(760, viewportHeight * 0.92), 0, 1);
      const forestLiftTarget = viewportWidth <= 560 ? -58 : viewportWidth <= 980 ? -84 : -118;
      const frontHillLiftTarget = viewportWidth <= 560 ? -22 : -34;
      const backHillLiftTarget = viewportWidth <= 560 ? -8 : -14;

      document.body.classList.toggle('is-scrolled', scrollY > 16);
      setRootVar('--hill-back-y', `${Math.round(heroMotionProgress * backHillLiftTarget)}px`);
      setRootVar('--hill-front-y', `${Math.round(heroMotionProgress * frontHillLiftTarget)}px`);
      setRootVar('--forest-y', `${Math.round(heroMotionProgress * forestLiftTarget)}px`);
      setRootVar('--hero-light-x', `${Math.round((heroMotionProgress - 0.5) * 22)}px`);
      setRootVar('--hero-light-y', `${Math.round(heroMotionProgress * -22)}px`);
      setRootVar('--final-glow-y', `${Math.round(scrollY * -0.018)}px`);

      if (!stackSection) {
        return;
      }

      const stackTop = stackSection.offsetTop - viewportHeight * 1.1;
      const stackBottom = stackSection.offsetTop + stackSection.offsetHeight + viewportHeight;
      if (scrollY < stackTop || scrollY > stackBottom) {
        return;
      }

      stackCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const nextRect = stackCards[index + 1]?.getBoundingClientRect();
        const coverProgress = nextRect ? clamp((rect.bottom - nextRect.top) / rect.height, 0, 1) : 0;
        const centerOffset = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
        const scale = 1 - Math.min(coverProgress * 0.058 + Math.abs(centerOffset) * 0.006, 0.07);
        const imageScale = 1.045 - Math.min(coverProgress * 0.035 + Math.abs(centerOffset) * 0.016, 0.055);
        const layerOpacity = 1 - Math.min(coverProgress * 0.18, 0.18);
        card.style.setProperty('--card-scale', scale.toFixed(3));
        card.style.setProperty('--card-image-scale', imageScale.toFixed(3));
        card.style.setProperty('--stack-opacity', layerOpacity.toFixed(3));
      });
    };

    update();
    lenis.on('scroll', ({ scroll }) => update(scroll));
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      if (window.lenis === lenis) {
        delete window.lenis;
      }
      lenis.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, []);
}

function Logo() {
  return (
    <a className="logo" href="#hero" aria-label="回到首页">
      <span>LC</span>
      <strong>LeoninCS.</strong>
    </a>
  );
}

function Nav() {
  return (
    <nav className="top-nav" aria-label="主导航">
      <Logo />
      <div className="nav-center">
        <a href="#info">信息</a>
        <a href="#internship">实习</a>
        <a href="#projects">项目</a>
        <a href="#competition">竞赛</a>
        <a href="#hobbies">爱好</a>
        <a href="#socials">社媒</a>
      </div>
      <div className="nav-actions">
        <a href="https://github.com/LeoninCS" rel="noreferrer" target="_blank">GitHub</a>
        <a href="mailto:xianchaoqian@foxmail.com">联系我</a>
      </div>
    </nav>
  );
}

function MockColorField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d', { alpha: true });
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let lastPaint = 0;
    const colorStops = [
      ['rgba(164, 255, 236, 0.58)', 'rgba(164, 255, 236, 0)'],
      ['rgba(255, 214, 148, 0.42)', 'rgba(255, 214, 148, 0)'],
      ['rgba(255, 169, 217, 0.38)', 'rgba(255, 169, 217, 0)'],
      ['rgba(122, 164, 255, 0.32)', 'rgba(122, 164, 255, 0)'],
      ['rgba(220, 255, 177, 0.3)', 'rgba(220, 255, 177, 0)'],
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(280, Math.round(rect.width / 2));
      height = Math.max(220, Math.round(rect.height / 2));
      canvas.width = width;
      canvas.height = height;
    };

    const paint = (time = 0) => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#202020';
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = 'lighter';

      colorStops.forEach(([inner, outer], index) => {
        const phase = time * (0.00012 + index * 0.000018) + index * 1.78;
        const x = width * (0.54 + Math.sin(phase) * (0.22 + index * 0.018));
        const y = height * (0.42 + Math.cos(phase * 0.91) * (0.28 - index * 0.018));
        const radius = Math.max(width, height) * (0.36 + index * 0.045);
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, inner);
        gradient.addColorStop(1, outer);
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      });

      context.globalCompositeOperation = 'source-over';
      const shadow = context.createLinearGradient(0, 0, 0, height);
      shadow.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
      shadow.addColorStop(0.34, 'rgba(0, 0, 0, 0)');
      shadow.addColorStop(1, 'rgba(0, 0, 0, 0.68)');
      context.fillStyle = shadow;
      context.fillRect(0, 0, width, height);
    };

    const tick = (time) => {
      if (time - lastPaint > 33) {
        paint(time);
        lastPaint = time;
      }

      animationFrame = requestAnimationFrame(tick);
    };

    resize();
    paint();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    if (!mediaQuery.matches) {
      animationFrame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas className="mock-color-field" ref={canvasRef} aria-hidden="true" />;
}

function ResumeMockup({ compact = false }) {
  return (
    <div className={`product-mockup ${compact ? 'compact' : ''}`}>
      <MockColorField />
      <aside className="mock-sidebar">
        <div className="mock-pill" />
        <div className="mock-search" />
        {['信息', '实习', '项目', '竞赛', '爱好', '社媒'].map((item) => (
          <div className="mock-nav-row" key={item}>
            <span />
            <b>{item}</b>
          </div>
        ))}
        <div className="mock-course-title">信息</div>
        <div className="mock-line long" />
        <div className="mock-line" />
        <div className="mock-line short" />
      </aside>
      <section className="mock-panel">
        <div className="mock-avatar">X</div>
        <h3>献超前 / LeoninCS</h3>
        <p>Agent 开发 · Go · Gin · GORM · 云原生</p>
        <a className="mock-button" href={`mailto:${contactEmail}`}>查看联系方式</a>
        <small>
          河南大学软件工程本科（开封） → Sealos 系统组实习 → CompliK / GCFeed / SDD Agent
        </small>
      </section>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg hills-back" />
      <div className="hero-copy reveal">
        <h1>
          <span>LeoninCS</span>
          <span className="hero-separator">/</span>
          <span>Agent 开发方向简历</span>
        </h1>
        <p>
          献超前的个人主页：Agent 开发求职方向、Sealos 系统组实习、Go 后端项目、算法竞赛记录、摄影和骑行。
        </p>
        <a className="cta" href="mailto:xianchaoqian@foxmail.com">联系我</a>
      </div>
      <div className="hero-device reveal">
        <ResumeMockup />
      </div>
      <div className="hero-bg forest-foreground" />
      <div className="hero-bg hills-front" />
    </section>
  );
}

function About() {
  const sectionRef = useRef(null);
  const [activeLine, setActiveLine] = useState(0);
  const lines = [
    '我是献超前，技术 ID 是 LeoninCS，河南大学软件工程本科在读，学校在开封，目前在杭州工作，求职方向是 Agent 开发。',
    '我的工程主线围绕 Go、Gin、GORM、云原生、Kubernetes、Sealos、AI Agent 和分布式系统展开。',
    '除了工程经历，我也长期记录骑行、摄影、音乐 HiFi、投资观察和商业模式研究，让个人页面保留真实的生活纹理。',
  ];

  useEffect(() => {
    const updateActiveLine = () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const viewportCenter = window.innerHeight * 0.52;
      const paragraphs = [...section.querySelectorAll('.intro-lines p')];
      const nextIndex = paragraphs.reduce((closestIndex, paragraph, index) => {
        const rect = paragraph.getBoundingClientRect();
        const paragraphCenter = rect.top + rect.height / 2;
        const currentRect = paragraphs[closestIndex].getBoundingClientRect();
        const currentCenter = currentRect.top + currentRect.height / 2;

        return Math.abs(paragraphCenter - viewportCenter) <
          Math.abs(currentCenter - viewportCenter)
          ? index
          : closestIndex;
      }, 0);

      setActiveLine((current) => (current === nextIndex ? current : nextIndex));
    };

    updateActiveLine();
    window.addEventListener('scroll', updateActiveLine, { passive: true });
    window.addEventListener('resize', updateActiveLine);

    return () => {
      window.removeEventListener('scroll', updateActiveLine);
      window.removeEventListener('resize', updateActiveLine);
    };
  }, []);

  return (
    <section id="info" className="about-section" ref={sectionRef}>
      <div className="section-inner narrow">
        <span className="pill muted">信息</span>
        <div className="intro-lines">
          {lines.map((line, index) => (
            <p
              className={index === activeLine ? 'active' : ''}
              key={line}
            >
              {line}
            </p>
          ))}
        </div>
        <div className="profile-grid">
          {profileRows.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = useMemo(() => projects[activeIndex], [activeIndex]);

  return (
    <section id="projects" className="features-section">
      <div className="section-inner">
        <div className="split-heading">
          <div>
            <span className="pill muted">项目</span>
            <h2>
              项目按工程问题组织。
              <em> 仓库边界清晰可查。</em>
            </h2>
          </div>
          <p>
            这里集中展示 CompliK、GCFeed、SDD Agent Engine 和 GoClub，
            对应集群合规、内容流后端、智能体工作流和开源知识库。
          </p>
        </div>

        <div className="feature-tabs" role="tablist" aria-label="项目分类">
          {projects.map((project, index) => (
            <button
              aria-selected={index === activeIndex}
              className={index === activeIndex ? 'active' : ''}
              key={project.label}
              onClick={() => setActiveIndex(index)}
              role="tab"
              type="button"
            >
              {project.label}
            </button>
          ))}
        </div>

        <div className="feature-stage" key={active.label}>
          <div className="feature-app">
            <aside>
              <strong>LeoninCS</strong>
              {['Gin', 'GORM', '缓存', '云原生', '智能体'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </aside>
            <main>
              <div className="feature-toolbar">
                <b>{active.title}</b>
                <a href={active.href} rel="noreferrer" target="_blank">打开仓库</a>
              </div>
              <div className="feature-cards">
                <article style={{ backgroundImage: `url(${active.image})` }}>
                  <span>{active.label}</span>
                </article>
                <article style={{ backgroundImage: 'url(/picture/38-bike-coastal-road.jpg)' }}>
                  <span>生活记录</span>
                </article>
                <article style={{ backgroundImage: 'url(/picture/01-city-tower-blue-hour.jpg)' }}>
                  <span>摄影</span>
                </article>
              </div>
            </main>
          </div>
        </div>

        <div className="feature-caption">
          <button
            aria-label="上一个项目"
            type="button"
            onClick={() => setActiveIndex((activeIndex + projects.length - 1) % projects.length)}
          >
            ←
          </button>
          <p>{active.caption}</p>
          <button
            aria-label="下一个项目"
            type="button"
            onClick={() => setActiveIndex((activeIndex + 1) % projects.length)}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

function StorySection({ id, eyebrow, title, mutedTitle, text, cards }) {
  return (
    <section id={id} className="what-section">
      <div className="section-inner">
        <div className="split-heading">
          <div>
            <span className="pill muted">{eyebrow}</span>
            <h2>
              {title}
              <em>{mutedTitle}</em>
            </h2>
          </div>
          <p>{text}</p>
        </div>

        <div className="get-stack">
          {cards.map((card, index) => (
            <article
              className={`get-card card-${index + 1}`}
              key={card.title}
              style={{
                '--stack-top': `${86 + index * 18}px`,
                '--stack-z': index + 1,
              }}
            >
              <div className="get-copy">
                <span>{card.eyebrow}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <strong>{card.note}</strong>
              </div>
              <div className="get-visual">
                <div className="visual-toolbar">
                  <span />
                  <span />
                  <span />
                  <span className="visual-tag">记录</span>
                </div>
                <div className="visual-card">
                  <div />
                  <h4>{card.visualTitle}</h4>
                  <p>{card.visualText}</p>
                  <span className="visual-note">重点记录</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Internship() {
  return (
    <StorySection
      id="internship"
      eyebrow="实习经历"
      title="实习内容落在真实系统里。"
      mutedTitle=" 从 Admin 到 ProcScan。"
      text="这一块集中展示 Sealos 系统组的 CompliK 实习经历：Admin 全栈、系统适配、CI、分析插件、二进制分析和持续维护。"
      cards={internshipCards}
    />
  );
}

function Competition() {
  return (
    <StorySection
      id="competition"
      eyebrow="竞赛奖项"
      title="竞赛记录展示长期训练强度。"
      mutedTitle=" 也展示解题耐心。"
      text="算法训练、ACM 集训、CCPC、天梯赛、蓝桥杯、百度之星和 ICPC 现场经验放在独立区域，方便快速判断基础能力。"
      cards={competitionCards}
    />
  );
}

function Hobbies() {
  return (
    <StorySection
      id="hobbies"
      eyebrow="爱好"
      title="骑行、摄影、音乐、投资观察。"
      mutedTitle=" 保留真实的生活纹理。"
      text="爱好区域聚焦长期兴趣：10000+ 公里骑行、摄影、音乐 HiFi 和投资观察，让个人页有简历之外的识别度。"
      cards={hobbyCards}
    />
  );
}

function Socials() {
  return (
    <section id="socials" className="faq-section">
      <div className="section-inner">
        <div className="faq-heading">
          <div>
            <span className="pill muted">社媒账号</span>
            <h2>不同平台展示不同侧面。</h2>
            <p>
              GitHub 放工程项目，X 放观察记录，Bilibili 放视频内容，Instagram 和小红书放摄影、骑行和生活动态。
            </p>
          </div>
        </div>

        <div className="social-strip" aria-label="社媒账号">
          {socials.map((item) => (
            <a href={item.href} key={item.name} rel="noreferrer" target="_blank">
              <span aria-hidden="true">
                <item.Icon />
              </span>
              <strong>{item.name}</strong>
              <em>{item.detail}</em>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-section">
      <div className="section-inner final-inner">
        <div className="final-copy">
          <h2>Agent 开发沟通，从这里开始。</h2>
          <p>
            简历投递、面试沟通、Agent 开发机会和开源协作可以直接通过邮箱联系。
          </p>
          <a className="cta" href={`mailto:${contactEmail}`}>发送邮件</a>
        </div>
      </div>
    </section>
  );
}

function App() {
  useScrollEffects();

  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Internship />
      <Projects />
      <Competition />
      <Hobbies />
      <Socials />
      <FinalCTA />
    </main>
  );
}

ReactDOMClient.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
