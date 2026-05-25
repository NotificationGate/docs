import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroGlow} />
      <div className={styles.heroInner}>
        <div className={styles.heroBadge}>Developer-first email API</div>
        <h1 className={styles.heroTitle}>
          Transactional email<br />
          <span className={styles.heroAccent}>that just works.</span>
        </h1>
        <p className={styles.heroSub}>
          One REST API. Three isolated IP streams. Automatic DKIM, bounce handling,
          and real-time webhooks. Start sending in under 5 minutes — free.
        </p>
        <div className={styles.heroActions}>
          <a className={styles.btnPrimary} href="https://notificationgate.com/signup">
            Get started free →
          </a>
          <Link className={styles.btnSecondary} to="/quickstart">
            Read the docs
          </Link>
        </div>
        <div className={styles.heroCode}>
          <div className={styles.codeChrome}>
            <span className={styles.dot} style={{background:'#ff5f57'}} />
            <span className={styles.dot} style={{background:'#febc2e'}} />
            <span className={styles.dot} style={{background:'#28c840'}} />
            <span className={styles.codeFilename}>send-email.sh</span>
          </div>
          <pre className={styles.codePre}><code>{`curl https://notificationgate.com/api/v1/emails \\
  -H "Authorization: Bearer ng_live_xxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from":    "hello@yourdomain.com",
    "to":      "user@example.com",
    "subject": "Welcome!",
    "stream":  "transactional",
    "html":    "<p>Your account is ready.</p>"
  }'`}</code></pre>
          <div className={styles.codeStatus}>
            <span className={styles.statusDot} />
            <span style={{color:'#4ade80', fontFamily:'monospace', fontSize:'12px'}}>Delivered</span>
            <span className={styles.statusTime}>287ms</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: '✉️', title: '3 isolated email streams', desc: 'Transactional, OTP, and marketing on separate IP pools. A marketing bounce never touches your password reset reputation.' },
  { icon: '🔐', title: 'One-click DKIM setup', desc: 'Add 3 CNAME records and we handle signing, rotation, and compliance. No OpenSSL required.' },
  { icon: '⚡', title: 'Automatic bounce handling', desc: 'Hard bounces and complaints processed in real time via SNS. Your suppression list is always up to date.' },
  { icon: '🔑', title: 'API key authentication', desc: 'Live and sandbox keys. Sandbox mode returns status: sandbox with no real sending — safe for CI/CD.' },
  { icon: '📊', title: 'Real-time analytics', desc: 'Per-stream delivery rates, bounce rates, and daily charts. Know exactly what is happening with your email.' },
  { icon: '🔌', title: 'Webhooks & SDKs', desc: 'HMAC-signed delivery webhooks and official SDKs for Node.js, Python, and Go.' },
];

function Features() {
  return (
    <section className={styles.features}>
      <div className={styles.sectionInner}>
        <p className={styles.sectionLabel}>Features</p>
        <h2 className={styles.sectionTitle}>Everything you need to ship email.</h2>
        <div className={styles.featureGrid}>
          {features.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const sdks = [
  { lang: 'Node.js / TypeScript', install: 'npm install notificationgate', href: 'https://github.com/NotificationGate/sdk-node', color: '#68a063' },
  { lang: 'Python', install: 'pip install notificationgate', href: 'https://github.com/NotificationGate/sdk-python', color: '#fbbf24' },
  { lang: 'Go', install: 'go get github.com/NotificationGate/sdk-go', href: 'https://github.com/NotificationGate/sdk-go', color: '#60a5fa' },
];

function SDKs() {
  return (
    <section className={styles.sdkSection}>
      <div className={styles.sectionInner}>
        <p className={styles.sectionLabel}>SDKs</p>
        <h2 className={styles.sectionTitle}>Official SDKs for every stack.</h2>
        <div className={styles.sdkGrid}>
          {sdks.map((s) => (
            <a key={s.lang} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.sdkCard}>
              <div className={styles.sdkDot} style={{ background: s.color }} />
              <div>
                <div className={styles.sdkLang}>{s.lang}</div>
                <code className={styles.sdkInstall}>{s.install}</code>
              </div>
              <span className={styles.sdkArrow}>→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const plans = [
  { name: 'Free',    price: '$0',  emails: '3,000/mo',     highlight: false },
  { name: 'Starter', price: '$19', emails: '50,000/mo',    highlight: false },
  { name: 'Growth',  price: '$49', emails: '200,000/mo',   highlight: true  },
  { name: 'Scale',   price: '$99', emails: '1,000,000/mo', highlight: false },
];

function Pricing() {
  return (
    <section className={styles.pricing}>
      <div className={styles.sectionInner}>
        <p className={styles.sectionLabel}>Pricing</p>
        <h2 className={styles.sectionTitle}>Pay for what you send.</h2>
        <p className={styles.sectionSub}>No seats. No surprises. Cancel anytime.</p>
        <div className={styles.pricingGrid}>
          {plans.map((p) => (
            <div key={p.name} className={`${styles.planCard} ${p.highlight ? styles.planHighlight : ''}`}>
              <div className={styles.planName}>{p.name}</div>
              <div className={styles.planPrice}>{p.price}<span className={styles.planPer}>/mo</span></div>
              <div className={styles.planEmails}>{p.emails}</div>
              <a href="https://notificationgate.com/signup" className={p.highlight ? styles.planCtaPrimary : styles.planCta}>
                Get started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaInner}>
        <h2 className={styles.ctaTitle}>Start sending in 5 minutes.</h2>
        <p className={styles.ctaSub}>Add your domain. Create an API key. Ship.</p>
        <div className={styles.ctaActions}>
          <a href="https://notificationgate.com/signup" className={styles.btnPrimary}>Create free account →</a>
          <Link to="/quickstart" className={styles.btnSecondary}>Read the docs</Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main>
        <Hero />
        <Features />
        <SDKs />
        <Pricing />
        <CTA />
      </main>
    </Layout>
  );
}
