import { SafeLink } from "./SafeLink";
import { WorkspaceExplorer } from "./workspace/WorkspaceExplorer";
import styles from "./workspace/Workspace.module.css";
export function Hero(){return <section className={styles.hero} id="top" aria-labelledby="hero-title">
  <p className={styles.identity}>Fatgezim “Zim” Bela <span>Founder &amp; CTO · hands-on engineer · curious by default</span></p>
  <div className={styles.intro}><h1 id="hero-title">You can tell a lot<br/>from someone’s <em>desk.</em></h1><div className={styles.introCopy}><p>I’m Zim. I connect <strong>science, software and design</strong> to build things people can actually use. This is a small workspace for a few of my bigger interests.</p><div className={styles.introActions}><a href="#projects">See the projects <span aria-hidden="true">↘</span></a><SafeLink href="/resume" newTab>Résumé <span aria-hidden="true">↗</span></SafeLink></div></div></div>
  <WorkspaceExplorer/>
  <div className={styles.heroFoot}><p>Currently building at <strong>Create 13 Group</strong> &amp; <strong>NeuroPath LLC</strong></p><p>Five interests. One connected way of working.</p></div>
</section>}
