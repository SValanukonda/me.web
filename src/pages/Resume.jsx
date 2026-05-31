import './Resume.css';

function Resume() {
  return (
    <div className="resume-page">
      <div className="resume-header">
        <h1>Professional Summary</h1>
      </div>

      <section className="resume-section">
        <h2>Professional Experience</h2>
        
        <div className="resume-item">
          <div className="resume-item-header">
            <h3>Performance Engineer</h3>
            <span className="date">Jun 2023 – Present</span>
          </div>
          <div className="resume-subtitle">Tata Consultancy Services (Bangalore, India)</div>
          <ul className="resume-bullets">
            <li><strong>Tuned Java applications</strong> (Spring Boot, JBoss) — analyzed thread dumps, heap dumps, GC logs, and Oracle reports to reduce P99 latency and improve throughput for 300M+ subscribers.</li>
            <li><strong>Optimized critical production SQL</strong> — rewrote queries reducing execution time from 40 minutes to 1 second.</li>
            <li><strong>Scaled Spring Batch processing 3×</strong> by implementing partitioned parallel execution.</li>
            <li>Designed & executed performance test suites using JMeter, K6, Bash, and Python.</li>
            <li>Discovered critical security vulnerabilities during performance testing (CSRF flaws, unencrypted passwords).</li>
            <li>Implemented SRE practices: defined SLO/SLI/SLA metrics, conducted incident postmortems, orchestrated canary & blue-green deployments.</li>
          </ul>
        </div>
      </section>

      <section className="resume-section">
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <strong>Performance & Load:</strong> JMeter, K6, LoadRunner, Benchmarking
          </div>
          <div className="skill-category">
            <strong>Observability:</strong> Grafana, Prometheus, OpenTelemetry, LGTM, Splunk, Datadog
          </div>
          <div className="skill-category">
            <strong>Languages & DBs:</strong> Java, Python, Go, Bash/Shell, SQL, Oracle, Neo4j
          </div>
          <div className="skill-category">
            <strong>SRE & Ops:</strong> Kubernetes, Docker, Jenkins, SLO/SLI/SLA, Capacity Planning
          </div>
        </div>
      </section>

      <section className="resume-section">
        <h2>Education & Certifications</h2>
        <div className="resume-item">
          <div className="resume-item-header">
            <h3>BTech, Electronics and Communication Engineering (ECE)</h3>
            <span className="date">Aug 2019 – Aug 2023</span>
          </div>
          <div className="resume-subtitle">Velagapudi Ramakrishna Siddhartha Engineering College</div>
        </div>

        <ul className="certs-list">
          <li>Databricks Certified Generative AI Engineer Associate</li>
          <li>Google Cloud Generative AI Leader</li>
          <li>Generative AI at ACC (HPE)</li>
        </ul>
      </section>
    </div>
  );
}

export default Resume;
