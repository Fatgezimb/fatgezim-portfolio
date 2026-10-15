# A desk with five ways in

Subject: Zim Bela, a hands-on founder and technologist connecting scientific work, software, data, medicine and design. Audience: technical hiring managers and curious collaborators. Job: let someone meet the thinking behind the work, then inspect working evidence.

## Direction

A physical, sculpted maker's workbench is the signature. Five original objects share one space and one story. The page opens with “You can tell a lot from someone's desk.” The visitor can select an object, use ordinary topic buttons, or take a short guided tour. Projects and résumé remain easy to reach.

Palette: workshop lilac #e8e7f2, paper #f8f8fc, graphite violet #252137, iris #6648d9, sea glass #9eddc7, brass #dfb65b. A coral notebook provides a small medical/creative accent. Bricolage Grotesque adds character to restrained display headlines; Geist provides clear reading and Geist Mono labels object/project state.

```
Zim / working across disciplines          Workspace  Work  About  Résumé
You can tell a lot                    short founder / engineer introduction
from someone's desk.                 Take the tour / see projects
                         five-object physical workbench
                    Neuroscience / Software / Data / Medicine / Design
      object selected → controlled camera + coherent story / evidence panel
The thread through it all → short personal cross-domain story
Selected builds → existing usable samples, stronger technical case notes
How I work → source/evidence / build / test / refine
Research and learning → real poster + current design exploration
Experience / ventures / education → concise professional context
Connect → clear next action / formal résumé
```

Self-critique: a glowing abstract object would be another decorative hero. Each modeled object must look deliberately placed and open useful content. Avoid an oversized status dashboard, floating card walls, fake productivity metrics or a pseudo-game. The desk is an authored conceptual scene, not a claim about Zim's real desk or his personal modeling authorship. Keep small marks functional, and let actual work carry the credibility.

## Interaction and performance contract

Direct Three.js, already installed, loads progressively. Original procedural geometry keeps provenance simple. Controlled camera moves connect the five viewpoints; no scrolling is intercepted and no dragging is required. The accessible topic list drives the same state as raycast selection. Tour order follows neuroscience → software → data → medicine → design. Explicit next/back/close and pause controls, no automatic narration/audio.

A useful HTML introduction and original 2D workspace illustration render before JavaScript/3D. Reduced motion uses immediate state changes and static rendering. Save-Data and unavailable/context-lost WebGL stay in the 2D explorer with a recoverable action. Cap resolution, avoid per-frame React state, pause offscreen/hidden, and dispose renderer resources.

Mobile recomposes the scene above the narrative and uses ordinary full-size topic buttons. Domain information and project links remain readable at 320px and without WebGL. Full résumé content remains HTML and the formal document remains a separate downloadable artifact.

## Asset provenance

The desktop, neuron under a bell, data sculpture, notebook, folded form, small props, screen textures, SVG fallback and ribbon illustration were authored procedurally for this implementation. No stock model, reference-site asset, generated person image or confidential product capture was used. Three.js supplies geometry primitives/utilities under its existing package license. Bricolage Grotesque, Geist and Geist Mono use the existing framework font pipeline and local build output.

`public/og.png` is a browser render of this same original scene, arranged with the site’s actual identity/type system. It is not a capture of a separate product. The headshot and research poster remain their previously verified supplied derivatives; attribution remains beside the research.

## Implemented refinement

Mobile moves domain buttons above the scene and aligns an explicitly selected story into view. Selecting the same topic or restarting the tour repeats this orientation action. Escape closes the story and returns focus to the topic. The flat explorer keeps the same five stories and evidence links. Initial reduced motion and constrained device/network hints avoid the renderer; explicit 3D remains available. A lost renderer is replaced with a fresh canvas on retry.

Scene geometry is capped and the neuron branches are merged by material. Final profiling and accessibility results are tracked in `docs/IMPLEMENTATION_STATUS.md` and the final QA report.
