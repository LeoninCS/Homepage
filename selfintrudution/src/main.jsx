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
    title: '视频 Feed 流系统',
    caption: 'Go 后端项目，关注内容流接口、游标分页、Redis 缓存、消息队列和高并发服务稳定性。',
    image: '/picture/46-icpc-wuhan-regional-01.jpg',
    href: 'https://github.com/LeoninCS/feedsystem_video_go',
  },
  {
    label: 'Agent',
    title: 'Agent Flow',
    caption: '多智能体工作流助手，围绕工具调用、状态流转、任务编排和 Agent 工程化落地展开。',
    image: '/picture/35-programming-contest-team-photo.jpg',
    href: 'https://github.com/LeoninCS/multi-agent-workflow-assistant',
  },
  {
    label: 'Cloud',
    title: 'Sealos AIOps',
    caption: '云原生平台实践，覆盖 Kubernetes 巡检、合规扫描、自动化运维和平台工程。',
    image: '/picture/40-illuminated-arch-bridge-night.jpg',
    href: 'https://github.com/labring/sealos',
  },
  {
    label: 'Open Source',
    title: 'GoClub',
    caption: 'Go 后端开源社区项目，沉淀内容组织、协作工具和技术分享。',
    image: '/picture/42-icpc-shenzhen-invitational-01.jpg',
    href: 'https://goclub.space/',
  },
];

const profileRows = [
  ['姓名', '献超前 / Xianchao Qian'],
  ['技术 ID', 'LeoninCS'],
  ['学校', '河南大学 软件工程本科在读'],
  ['所在地', '杭州，中国'],
  ['方向', '后端开发实习 · Go · Kubernetes · AI Agent'],
];

const internshipCards = [
  {
    eyebrow: '实习经历',
    title: '后端开发实习经历，围绕工程落地展开。',
    text: '覆盖接口开发、日志排查、指标观察、问题拆解、测试补充和服务稳定性建设。',
    note: '关键词：接口、稳定性、可观测性、测试补充。',
    visualTitle: 'Backend Intern',
    visualText: '接口开发 / 日志排查 / 稳定性建设',
  },
];

const competitionCards = [
  {
    eyebrow: '竞赛奖项',
    title: '算法训练和竞赛记录可以直接验证。',
    text: 'LeetCode 2100，Codeforces 1653，累计 1500+ Problems，河南大学 ACM 集训队，具备 ICPC 现场经验。',
    note: '长期训练记录是后端工程能力的底座。',
    visualTitle: 'LeetCode 2100',
    visualText: 'Codeforces 1653 / 1500+ Problems',
  },
];

const hobbyCards = [
  {
    eyebrow: '骑行',
    title: '长距离骑行，让身体和判断力一起在线。',
    text: '骑行累计 10000+ 公里，习惯用路线规划、体能分配和复盘记录管理长期目标。',
    visualTitle: 'Cycling 10000+ km',
    visualText: '路线规划 / 长期训练 / 复盘记录',
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
    eyebrow: '理财',
    title: '理财观察连接商业模式和长期决策。',
    text: '关注投资逻辑、资产配置、商业模式和公司基本面，用长期视角训练信息判断。',
    visualTitle: 'Finance Notes',
    visualText: '投资观察 / 商业模式 / 长期决策',
    note: '用结构化记录减少情绪化决策。',
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

    let animationFrame = 0;
    const lenis = new Lenis({
      autoRaf: false,
      anchors: {
        offset: 0,
        duration: 1.08,
      },
      duration: 1.12,
      easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    const update = (nextScroll) => {
      const scrollY = nextScroll ?? lenis.animatedScroll ?? window.scrollY;
      const heroProgress = clamp(scrollY / 1269, 0, 1.2);
      const viewportHeight = window.innerHeight;

      document.body.classList.toggle('is-scrolled', scrollY > 16);
      root.style.setProperty('--hero-device-y', `${Math.round(scrollY * 0.08)}px`);
      root.style.setProperty('--hero-device-opacity', String(clamp(1 - heroProgress * 1.65, 0, 1)));
      root.style.setProperty('--hill-back-y', `${Math.round(scrollY * 0.31)}px`);
      root.style.setProperty('--hill-front-y', `${Math.round(scrollY * 0.17)}px`);
      root.style.setProperty('--forest-y', `${64 + Math.round(scrollY * 0.08)}px`);
      root.style.setProperty('--hero-ui-opacity', String(clamp(1 - heroProgress * 0.25, 0.72, 1)));
      root.style.setProperty('--final-glow-y', `${Math.round(scrollY * -0.018)}px`);

      const stackCards = [...document.querySelectorAll('.get-card')];
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

    const raf = (time) => {
      lenis.raf(time);
      animationFrame = window.requestAnimationFrame(raf);
    };

    update();
    animationFrame = window.requestAnimationFrame(raf);
    lenis.on('scroll', ({ scroll }) => update(scroll));
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      lenis.destroy();
      window.removeEventListener('resize', handleResize);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
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
        <a href="https://github.com/LeoninCS">GitHub</a>
        <a href="mailto:xianchaoqian@foxmail.com">联系我</a>
      </div>
    </nav>
  );
}

function ResumeMockup({ compact = false }) {
  return (
    <div className={`product-mockup ${compact ? 'compact' : ''}`}>
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
        <p>后端开发实习 · Go · 云原生 · AI Agent</p>
        <button>查看联系方式</button>
        <small>
          河南大学软件工程本科在读 → 后端实习经历 → LeetCode 2100 / Codeforces 1653 →
          视频 Feed 流系统 / GoClub / Agent Flow / Sealos AIOps
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
        <h1>LeoninCS’s Profile Page</h1>
        <p>
          展示信息、实习、项目、竞赛、爱好、联系邮箱和社媒账号。
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
    '我是献超前，技术 ID 是 LeoninCS，河南大学软件工程本科在读，常驻杭州，求职方向是后端开发实习。',
    '我的工程主线围绕 Go 后端、云原生平台、Kubernetes、Sealos、AI Agent 和分布式系统展开。',
    '除了工程经历，我也长期记录骑行、摄影、理财观察和商业模式研究，让个人页面保留真实的生活纹理。',
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
              <em> 点开就能继续聊。</em>
            </h2>
          </div>
          <p>
            这里集中展示视频 Feed 流系统、Agent Flow、Sealos AIOps 和 GoClub，
            对应后端接口、智能体工作流、云原生平台和开源协作。
          </p>
        </div>

        <div className="feature-tabs" role="tablist" aria-label="项目分类">
          {projects.map((project, index) => (
            <button
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
              {['接口', '缓存', '消息队列', '云原生', '智能体'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </aside>
            <main>
              <div className="feature-toolbar">
                <b>{active.title}</b>
                <a href={active.href}>打开</a>
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
          <button type="button" onClick={() => setActiveIndex((activeIndex + projects.length - 1) % projects.length)}>←</button>
          <p>{active.caption}</p>
          <button type="button" onClick={() => setActiveIndex((activeIndex + 1) % projects.length)}>→</button>
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
                  <button>记录</button>
                </div>
                <div className="visual-card">
                  <div />
                  <h4>{card.visualTitle}</h4>
                  <p>{card.visualText}</p>
                  <button>查看</button>
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
      title="实习内容直接服务工程落地。"
      mutedTitle=" 从接口到稳定性。"
      text="这一块集中展示后端实习中的工程动作：开发、排查、观测、测试和复盘。"
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
      text="算法训练、ACM 集训和 ICPC 现场经验放在独立区域，方便招聘方快速判断基础能力。"
      cards={competitionCards}
    />
  );
}

function Hobbies() {
  return (
    <StorySection
      id="hobbies"
      eyebrow="爱好"
      title="骑行、摄影、理财。"
      mutedTitle=" 保留真实的生活纹理。"
      text="爱好区域聚焦三个长期兴趣：骑行、摄影和理财观察，让个人页有简历之外的识别度。"
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
          <h2>后端实习沟通，从这里开始。</h2>
          <p>
            简历投递、面试沟通和后端实习机会可以直接通过邮箱联系。
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
