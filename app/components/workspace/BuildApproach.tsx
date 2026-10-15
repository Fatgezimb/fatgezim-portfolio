import styles from "./Approach.module.css";

const steps = [
  {
    number: "01",
    title: "Understand the workflow.",
    body: "Follow the inputs, decisions and handoffs. In Behavior Data Lab, the path starts with an export and ends with a comparison the user can inspect.",
    link: "#project-bela-behavior-data-lab",
    action: "Follow the data",
    detail: "Records → filters → evidence",
  },
  {
    number: "02",
    title: "Make the model useful.",
    body: "Connect the interface to a clear set of rules. RBT Practice Hub turns study material into flashcards, practice questions and saved progress.",
    link: "#project-rbt-practice-hub",
    action: "Try the learning loop",
    detail: "Question → feedback → progress",
  },
  {
    number: "03",
    title: "Check the edges.",
    body: "Permissions, validation and review are part of the product. The Rethink automation preview shows the checkpoints around a proposed run.",
    link: "#project-rethink-automations",
    action: "Inspect the checkpoints",
    detail: "Prepare → review → confirm",
  },
] as const;

export function BuildApproach() {
  return (
    <section className={styles.section} id="process">
      <header className={styles.heading}>
        <p>How I build</p>
        <h2>
          Good software has a trail
          <br />
          you can follow.
        </h2>
      </header>
      <div className={styles.steps}>
        {steps.map((step) => (
          <article key={step.number} data-reveal="up">
            <span className={styles.number}>{step.number}</span>
            <p className={styles.flow}>{step.detail}</p>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            <a href={step.link}>
              {step.action}
              <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
      <div className={styles.exploration} data-reveal="up">
        <div className={styles.study} aria-hidden="true">
          <svg viewBox="0 0 500 320">
            <defs>
              <linearGradient id="ribbon-fill" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#a89ad5" />
                <stop offset=".5" stopColor="#e4d6ee" />
                <stop offset="1" stopColor="#8166b9" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="#c6b9e8" strokeWidth=".5" opacity=".18">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <path
                  key={i}
                  d={`M${30 + i * 75} 30v260M30 ${40 + i * 45}h440`}
                />
              ))}
            </g>
            <path
              d="M148 244C65 152 188 37 276 75C390 126 294 285 220 230C121 158 269 117 349 193"
              fill="none"
              stroke="#a69aca"
              strokeWidth="62"
              opacity=".13"
              transform="translate(15 22)"
            />
            <path
              d="M148 224C65 132 188 17 276 55C390 106 294 265 220 210C121 138 269 97 349 173"
              fill="none"
              stroke="url(#ribbon-fill)"
              strokeWidth="39"
            />
            <path
              d="M148 207C94 122 185 39 267 72C358 114 285 235 232 198C155 144 275 118 349 156"
              fill="none"
              stroke="#f0e6fa"
              strokeWidth="1.2"
            />
            <text
              x="32"
              y="294"
              fill="#d7cce9"
              fontSize="9"
              fontFamily="monospace"
            >
              FORM / LIGHT / CURIOSITY
            </text>
          </svg>
        </div>
        <div>
          <p className={styles.eyebrow}>Still exploring</p>
          <h3>
            Another way to think
            <br />
            with my hands.
          </h3>
          <p>
            I’m developing my Blender and 3D modeling practice alongside
            software. Shape, materials and light are a new set of tools for
            making an idea tangible.
          </p>
          <p className={styles.caption}>
            An original illustration for this portfolio’s visual study.
          </p>
          <a href="#workspace">
            Return to the workspace <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
