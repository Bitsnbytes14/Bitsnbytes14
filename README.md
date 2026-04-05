<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mohammad Ahmad – GitHub README</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0c10;
    --surface: #0f1117;
    --card: #141820;
    --border: #1e2530;
    --accent: #00d4aa;
    --accent2: #3b82f6;
    --accent3: #f59e0b;
    --text: #e2e8f0;
    --muted: #64748b;
    --bright: #ffffff;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Syne', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Grid background */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  .container {
    max-width: 860px;
    margin: 0 auto;
    padding: 60px 24px 120px;
    position: relative;
    z-index: 1;
  }

  /* ── HERO ── */
  .hero {
    text-align: center;
    padding: 80px 0 60px;
    animation: fadeUp 0.8s ease both;
  }

  .hero-tag {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: var(--accent);
    border: 1px solid rgba(0,212,170,0.3);
    padding: 4px 14px;
    border-radius: 100px;
    margin-bottom: 28px;
    letter-spacing: 0.08em;
  }

  .hero h1 {
    font-size: clamp(36px, 6vw, 72px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: var(--bright);
    margin-bottom: 20px;
  }

  .hero h1 .name-accent {
    background: linear-gradient(135deg, #00d4aa, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-sub {
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px;
    color: var(--muted);
    margin-bottom: 40px;
    letter-spacing: 0.02em;
  }

  .hero-sub .cursor {
    display: inline-block;
    width: 2px;
    height: 1em;
    background: var(--accent);
    margin-left: 3px;
    vertical-align: text-bottom;
    animation: blink 1s step-end infinite;
  }

  .badge-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 40px;
  }

  .badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    padding: 6px 14px;
    border-radius: 6px;
    border: 1px solid;
    font-weight: 400;
    letter-spacing: 0.04em;
  }

  .badge-teal { color: var(--accent); border-color: rgba(0,212,170,0.25); background: rgba(0,212,170,0.06); }
  .badge-blue { color: #60a5fa; border-color: rgba(96,165,250,0.25); background: rgba(96,165,250,0.06); }
  .badge-amber { color: #fbbf24; border-color: rgba(251,191,36,0.25); background: rgba(251,191,36,0.06); }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .social-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--muted);
    text-decoration: none;
    font-size: 13px;
    font-family: 'JetBrains Mono', monospace;
    transition: all 0.2s;
  }
  .social-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: rgba(0,212,170,0.06);
    transform: translateY(-1px);
  }

  /* ── DIVIDER ── */
  .divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 48px 0 32px;
  }
  .divider-line { flex: 1; height: 1px; background: var(--border); }
  .divider-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* ── ABOUT ── */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    animation: fadeUp 0.8s 0.2s ease both;
  }

  @media (max-width: 560px) { .about-grid { grid-template-columns: 1fr; } }

  .about-item {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 18px 20px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
    transition: border-color 0.2s, transform 0.2s;
  }
  .about-item:hover {
    border-color: rgba(0,212,170,0.3);
    transform: translateY(-2px);
  }
  .about-icon {
    font-size: 20px;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .about-text strong {
    display: block;
    font-size: 14px;
    color: var(--bright);
    font-weight: 600;
    margin-bottom: 4px;
  }
  .about-text span {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.5;
  }

  /* ── SKILLS ── */
  .skills-section { animation: fadeUp 0.8s 0.3s ease both; }

  .skill-group {
    margin-bottom: 28px;
  }

  .skill-group-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--accent);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .skill-group-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(0,212,170,0.1);
  }

  .skills-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .skill-pill {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    padding: 6px 14px;
    border-radius: 6px;
    background: var(--card);
    border: 1px solid var(--border);
    color: var(--text);
    transition: all 0.2s;
    cursor: default;
  }
  .skill-pill:hover {
    border-color: var(--accent2);
    color: #93c5fd;
    background: rgba(59,130,246,0.06);
    transform: translateY(-1px);
  }

  /* ── PROJECTS ── */
  .projects-section { animation: fadeUp 0.8s 0.4s ease both; }

  .project-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 14px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;
    align-items: start;
    transition: all 0.2s;
    text-decoration: none;
    color: inherit;
    display: block;
  }
  .project-card:hover {
    border-color: rgba(59,130,246,0.4);
    transform: translateY(-2px);
    background: rgba(59,130,246,0.03);
  }

  .project-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .project-name {
    font-size: 16px;
    font-weight: 700;
    color: var(--bright);
  }

  .project-arrow {
    font-size: 18px;
    color: var(--muted);
    transition: color 0.2s, transform 0.2s;
  }
  .project-card:hover .project-arrow {
    color: var(--accent2);
    transform: translate(2px, -2px);
  }

  .project-desc {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 14px;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .project-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 4px;
    background: rgba(59,130,246,0.08);
    border: 1px solid rgba(59,130,246,0.2);
    color: #93c5fd;
  }

  /* ── STATS ── */
  .stats-section {
    animation: fadeUp 0.8s 0.5s ease both;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  }

  .stat-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    transition: all 0.2s;
  }
  .stat-card:hover {
    border-color: rgba(0,212,170,0.3);
    transform: translateY(-2px);
  }

  .stat-num {
    font-size: 28px;
    font-weight: 800;
    color: var(--accent);
    display: block;
    margin-bottom: 4px;
  }

  .stat-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 0.05em;
  }

  /* ── FOOTER ── */
  .footer {
    text-align: center;
    padding: 60px 0 0;
    animation: fadeUp 0.8s 0.6s ease both;
  }

  .footer-quote {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: var(--muted);
    border-left: 3px solid var(--accent);
    text-align: left;
    padding: 14px 20px;
    background: var(--card);
    border-radius: 0 8px 8px 0;
    margin-bottom: 32px;
    line-height: 1.6;
  }

  .footer-cta {
    font-size: 14px;
    color: var(--muted);
    margin-bottom: 12px;
  }

  .footer-email {
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px;
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px solid rgba(0,212,170,0.3);
    padding-bottom: 2px;
    transition: border-color 0.2s;
  }
  .footer-email:hover { border-color: var(--accent); }

  /* ── SECTION HEADING ── */
  .section-heading {
    font-size: 22px;
    font-weight: 800;
    color: var(--bright);
    margin-bottom: 6px;
    letter-spacing: -0.02em;
  }

  .section-sub {
    font-size: 14px;
    color: var(--muted);
    margin-bottom: 24px;
  }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  /* Typewriter */
  .typewriter {
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid var(--accent);
    animation: typing 2.5s steps(40) 0.5s both, blink-caret 0.8s step-end infinite 3s;
    display: inline-block;
    max-width: 100%;
  }

  @keyframes typing {
    from { max-width: 0; }
    to   { max-width: 100%; }
  }

  @keyframes blink-caret {
    0%, 100% { border-color: var(--accent); }
    50%       { border-color: transparent; }
  }

  /* Floating orbs */
  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
    opacity: 0.12;
    animation: float 8s ease-in-out infinite;
  }
  .orb1 { width: 400px; height: 400px; background: #00d4aa; top: -100px; right: -100px; animation-delay: 0s; }
  .orb2 { width: 300px; height: 300px; background: #3b82f6; bottom: 100px; left: -80px; animation-delay: 3s; }

  @keyframes float {
    0%, 100% { transform: translateY(0px) scale(1); }
    50%       { transform: translateY(-30px) scale(1.05); }
  }

  /* Scroll reveal */
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s, transform 0.6s;
  }
  .reveal.visible {
    opacity: 1;
    transform: none;
  }
</style>
</head>
<body>

<div class="orb orb1"></div>
<div class="orb orb2"></div>

<div class="container">

  <!-- HERO -->
  <section class="hero">
    <div class="hero-tag">available for opportunities</div>
    <h1>Hi, I'm <span class="name-accent">Mohammad Ahmad</span></h1>
    <p class="hero-sub">
      <span class="typewriter">Backend &amp; DevOps Engineer · CSE Undergrad · AI Builder</span>
    </p>
    <div class="badge-row">
      <span class="badge badge-teal">Backend Engineering</span>
      <span class="badge badge-blue">Cloud &amp; DevOps</span>
      <span class="badge badge-amber">AI Integration</span>
      <span class="badge badge-teal">Full-Stack</span>
    </div>
    <div class="social-links">
      <a class="social-btn" href="https://www.linkedin.com/in/mohammad-ahmad141004" target="_blank">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
        linkedin
      </a>
      <a class="social-btn" href="mailto:mahmad091323@gmail.com">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        email
      </a>
      <a class="social-btn" href="https://www.instagram.com/ahmadwantstosleep?igsh=MW93ajR1ODFvOGk5MA%3D%3D&utm_source=qr" target="_blank">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
        instagram
      </a>
      <a class="social-btn" href="https://github.com/Bitsnbytes14" target="_blank">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
        github
      </a>
    </div>
  </section>

  <!-- ABOUT -->
  <div class="divider reveal">
    <div class="divider-line"></div>
    <span class="divider-label">// about</span>
    <div class="divider-line"></div>
  </div>

  <section class="reveal">
    <h2 class="section-heading">What I do</h2>
    <p class="section-sub">CSE undergrad building production-grade systems, not just side projects.</p>
    <div class="about-grid">
      <div class="about-item">
        <div class="about-icon">⚙️</div>
        <div class="about-text">
          <strong>Backend Engineering</strong>
          <span>Node.js, Express, REST APIs, auth systems, scalable architecture. I care about clean code and real performance.</span>
        </div>
      </div>
      <div class="about-item">
        <div class="about-icon">☁️</div>
        <div class="about-text">
          <strong>Cloud &amp; DevOps</strong>
          <span>Containerizing apps with Docker, CI/CD pipelines, Linux-first mindset. Shipping things that actually stay up.</span>
        </div>
      </div>
      <div class="about-item">
        <div class="about-icon">🤖</div>
        <div class="about-text">
          <strong>AI Integration</strong>
          <span>Wiring LLMs into real products — OpenAI, ML pipelines, and building tools people actually use.</span>
        </div>
      </div>
      <div class="about-item">
        <div class="about-icon">🗄️</div>
        <div class="about-text">
          <strong>Databases &amp; Systems</strong>
          <span>MongoDB, MySQL — schema design, query optimization, and thinking about data at scale.</span>
        </div>
      </div>
    </div>
  </section>

  <!-- SKILLS -->
  <div class="divider reveal">
    <div class="divider-line"></div>
    <span class="divider-label">// tech stack</span>
    <div class="divider-line"></div>
  </div>

  <section class="skills-section reveal">
    <div class="skill-group">
      <div class="skill-group-label">Backend &amp; APIs</div>
      <div class="skills-wrap">
        <span class="skill-pill">Node.js</span>
        <span class="skill-pill">Express.js</span>
        <span class="skill-pill">Go</span>
        <span class="skill-pill">REST APIs</span>
        <span class="skill-pill">Python</span>
        <span class="skill-pill">Java</span>
        <span class="skill-pill">JWT / Auth</span>
      </div>
    </div>
    <div class="skill-group">
      <div class="skill-group-label">Cloud &amp; DevOps</div>
      <div class="skills-wrap">
        <span class="skill-pill">AWS</span>
        <span class="skill-pill">Docker</span>
        <span class="skill-pill">Linux</span>
        <span class="skill-pill">Git / GitHub</span>
        <span class="skill-pill">CI/CD</span>
        <span class="skill-pill">Shell Scripting</span>
      </div>
    </div>
    <div class="skill-group">
      <div class="skill-group-label">AI &amp; ML</div>
      <div class="skills-wrap">
        <span class="skill-pill">OpenAI API</span>
        <span class="skill-pill">TensorFlow</span>
        <span class="skill-pill">PyTorch</span>
        <span class="skill-pill">Scikit-learn</span>
        <span class="skill-pill">LLM Integration</span>
        <span class="skill-pill">Pandas</span>
      </div>
    </div>
    <div class="skill-group">
      <div class="skill-group-label">Databases</div>
      <div class="skills-wrap">
        <span class="skill-pill">MongoDB</span>
        <span class="skill-pill">MySQL</span>
        <span class="skill-pill">JDBC</span>
        <span class="skill-pill">Schema Design</span>
      </div>
    </div>
    <div class="skill-group">
      <div class="skill-group-label">Frontend</div>
      <div class="skills-wrap">
        <span class="skill-pill">React</span>
        <span class="skill-pill">JavaScript</span>
        <span class="skill-pill">Tailwind CSS</span>
        <span class="skill-pill">HTML / CSS</span>
        <span class="skill-pill">Figma</span>
      </div>
    </div>
  </section>

  <!-- PROJECTS -->
  <div class="divider reveal">
    <div class="divider-line"></div>
    <span class="divider-label">// projects</span>
    <div class="divider-line"></div>
  </div>

  <section class="projects-section reveal">
    <h2 class="section-heading">Selected Work</h2>
    <p class="section-sub">Things I built that do real things.</p>

    <a class="project-card" href="https://github.com/Bitsnbytes14/AI-Resume-Builder" target="_blank">
      <div class="project-header">
        <span class="project-name">AI Resume Builder</span>
        <span class="project-arrow">↗</span>
      </div>
      <p class="project-desc">
        Full-stack platform that generates ATS-optimized resumes with AI-powered personalized suggestions.
        Built the backend API, OpenAI integration, and MongoDB data layer from scratch.
      </p>
      <div class="project-tags">
        <span class="project-tag">React</span>
        <span class="project-tag">Node.js</span>
        <span class="project-tag">Express</span>
        <span class="project-tag">MongoDB</span>
        <span class="project-tag">OpenAI API</span>
      </div>
    </a>

    <a class="project-card" href="https://github.com/Bitsnbytes14/Vairava---ACL-Graft-Predictor" target="_blank">
      <div class="project-header">
        <span class="project-name">Vairava — ACL Graft Predictor</span>
        <span class="project-arrow">↗</span>
      </div>
      <p class="project-desc">
        ML model predicting ACL graft sizes from patient data using synthetic medical datasets.
        End-to-end pipeline: data generation, model training, evaluation, and visualization.
      </p>
      <div class="project-tags">
        <span class="project-tag">Python</span>
        <span class="project-tag">Scikit-learn</span>
        <span class="project-tag">Pandas</span>
        <span class="project-tag">Matplotlib</span>
      </div>
    </a>

    <a class="project-card" href="https://github.com/Bitsnbytes14" target="_blank">
      <div class="project-header">
        <span class="project-name">Codemia</span>
        <span class="project-arrow">↗</span>
      </div>
      <p class="project-desc">
        Scalable, production-ready automated coding assignment grader for educational institutions. Teachers create assignments with test cases; student submissions are graded on correctness, runtime, and memory. Multi-language support (Python, JS, C++, Java, C), plagiarism detection, and real-time analytics dashboards.
      </p>
      <div class="project-tags">
        <span class="project-tag">Node.js</span>
        <span class="project-tag">Docker</span>
        <span class="project-tag">Queue Architecture</span>
        <span class="project-tag">Load Balancing</span>
        <span class="project-tag">Multi-language Execution</span>
      </div>
    </a>
  </section>


  <!-- FOOTER -->
  <div class="divider reveal">
    <div class="divider-line"></div>
    <div class="divider-line"></div>
  </div>

  <section class="footer reveal">
    <div class="footer-quote">
      "Good systems are invisible. Good engineers make them that way."
    </div>
    <p class="footer-cta">Open to backend, DevOps, and AI roles. Let's build something that matters.</p>
    <br>
    <a class="footer-email" href="mailto:mahmad091323@gmail.com">mahmad091323@gmail.com</a>
  </section>

</div>

<script>
  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => io.observe(el));
</script>
</body>
</html>
