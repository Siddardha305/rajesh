"use client";

import styles from "./Experience.module.css";
import ScrollReveal from "./ScrollReveal";

interface Job {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export default function Experience() {
  const experiences: Job[] = [
    {
      role: "Freelance Graphic Designer",
      company: "Creators & Influencers across India",
      period: "2025 - Present",
      bullets: [
        "Collaborating with top creators and digital influencers to build high-conversion, recognizable visual assets.",
        "Developing high-impact custom thumbnails, branding strategies, and promotional creatives that improve viewer click-through rates (CTR) by over 15% on average.",
        "Ensuring quick delivery schedules and maintaining strong client partnerships throughout India."
      ]
    },
    {
      role: "Graphic Designer",
      company: "Pixel Media (Youtuber Sai Krishna)",
      period: "2023 - 2024",
      bullets: [
        "Designed and executed high-performance YouTube thumbnails and visual content strategies for popular tech content creator Sai Krishna.",
        "Created social media promotional posters and templates to unify channel branding across digital platforms.",
        "Collaborated closely with creators to align graphical elements with content narratives, resulting in increased viewer loyalty and reach."
      ]
    },
    {
      role: "Graphic Designer",
      company: "Future India Academy",
      period: "2022 - 2023",
      bullets: [
        "Designed posters and marketing branding collaterals for academic content and promotional campaigns.",
        "Created professional slide templates, educational graphics, and physical poster flyers to boost student enrollment.",
        "Maintained brand consistency across academic handouts and digital educational posters."
      ]
    },
    {
      role: "Freelance Graphic Designer",
      company: "Various YouTubers & Creators",
      period: "2020 - 2022",
      bullets: [
        "Worked with multiple YouTubers on thumbnails and social media creatives, generating traction and engagement.",
        "Learned color theory, visual framing, and high-impact text layouts that capture instantaneous viewer attention.",
        "Developed custom layout systems to speed up the creative design workflow."
      ]
    }
  ];

  return (
    <section id="experience" className={styles.experienceSection}>
      <div className="container">
        <ScrollReveal direction="up">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionTag}>MY JOURNEY</p>
            <h2 className={styles.sectionTitle}>Work Experience</h2>
          </div>
        </ScrollReveal>

        <div className={styles.timeline}>
          {experiences.map((exp, idx) => (
            <div key={idx} className={styles.timelineItem}>
              <div className={styles.timelinePoint}>
                <div className={styles.pulseInner}></div>
              </div>
              <ScrollReveal direction="left" delay={idx * 100}>
                <div className={styles.timelineContent}>
                  <span className={styles.period}>{exp.period}</span>
                  <h3 className={styles.role}>{exp.role}</h3>
                  <h4 className={styles.company}>{exp.company}</h4>
                  <ul className={styles.bulletList}>
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className={styles.bulletItem}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
