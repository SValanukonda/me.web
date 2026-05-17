import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">
          Hi, I'm Sarath Brahmma Valankunda.
        </h1>
        <h2 className="hero-subtitle">
          Performance Engineer | SRE
        </h2>
        <p className="hero-description">
          I specialize in validating high-stakes, time-bound banking and payment systems. 
          With a focus on performance tuning, observability, and security research, 
          I ensure 99.99% system reliability and SLA compliance.
        </p>
        <div className="hero-actions">
          <Link to="/projects" className="btn">View My Work</Link>
          <Link to="/professional-summary" className="btn btn-outline">Read My Professional Summary</Link>
        </div>
      </section>



      
      <section className="recent-cta">
         <h3>Interested in my thoughts on tech?</h3>
         <p>Check out my latest scribbles on Cyber Security, Networking, and Performance.</p>
         <Link to="/blogs" className="text-link">Read my blog <ArrowRight size={16} /></Link>
      </section>
    </div>
  );
}

export default Home;
