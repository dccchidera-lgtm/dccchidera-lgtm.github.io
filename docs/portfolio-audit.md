# Portfolio audit and redesign

Reviewed 7 September 2026. Baseline: commit 091939788b7b219c3aeba6fdcdbaf9f247dbfb2c.

The portfolio contains useful assessed work and appropriately separates individual work, shared outputs, validation results and commercial impact. The main opportunity was to make that evidence easier to find and assess.

| Finding | Change |
| --- | --- |
| The homepage presents a quick index, question selector and four full project chapters covering the same cases. | A compact project grid becomes the primary route into the work. The question selector remains on the work page. |
| Long opening statements delay the role, work and CV. | Shorter positioning, direct work and CV links, and concise opening summaries on every case. |
| Desktop navigation requires opening a menu. | Persistent navigation with an active page indicator, plus a native mobile dialog. |
| Search and mobile overlays use modal labels without a complete focus containment implementation. | Native dialogs provide modal focus containment, Escape handling and focus restoration. |
| Several button groups use incomplete tab semantics. | Standard button groups with pressed states make each choice reachable by keyboard. |
| Clipboard rejection is unhandled. | Copy confirmation and a useful failure message, with the visible email and mail link retained. |
| Theme storage can fail and the initial client value differs from the server. | Hydration aware preference subscription, guarded storage access and early theme application. |
| Global pointer tracking and animated reveal effects add work and can hide content. | Removed pointer spotlight and hidden reveal states. Content is available immediately. |
| Child routes inherit the home canonical address. | Unique canonical addresses for all 9 public content routes. |
| The stylesheet has more than 6,000 lines and extensive page specific rules. | Replaced with one coherent responsive design system, shared surfaces and consistent typography. |
| Case studies lack a simple offline reading action. | Print or save as PDF action with print styles. |
| The profile repeats an old language practice count and has an overlong biographical timeline. | Concise profile, qualifications, skill evidence and a shorter education journey. |

## 3D addition

Two real WebGL models use locally bundled Three.js:

1. A personalisation, trust and loyalty model with the reported path coefficients.
2. A conceptual neural network, explicitly distinguished from the exact trained SAS topology.

The geometry does not encode effect size or trained weights. Both models provide text explanations, links to their case studies, rotation buttons, reset and optional automatic rotation. Automatic rotation is disabled for reduced motion preferences. The model code loads near the viewport, caps device pixel ratio, renders on demand while idle, suspends animation offscreen and when the tab is hidden, and disposes of GPU resources on unmount. Unsupported WebGL falls back to text. Touch users can rotate through buttons without sacrificing page scrolling.

## Content integrity

The reported research and validation statistics are preserved. No new client work, employment history, commercial outcomes, trained model weights or raw participant records have been invented. Individual and team attribution remains visible. The existing public CV and social preview image are preserved.

## Validation

The repository's existing check command passes ESLint, TypeScript and the production static export. Exported content is checked for internal files, anchors, duplicate IDs, one H1 per page and route specific canonical URLs. The generated 404 pages are excluded from canonical route assertions because they intentionally carry Next.js noindex metadata.

Browser visual and interaction testing has not been run. The responsive layouts, native modal behaviour, WebGL fallback and print layouts should receive a browser review before treating them as visually verified. No Lighthouse or measured real device performance scores are claimed.

## Most valuable next additions

1. Sanitised original project evidence: SQL scripts, a data dictionary and screenshots of the assessed dashboard. These would let employers inspect the outputs behind the summaries.
2. A concise dissertation brief using aggregate findings, the method, uncertainty and practical implications. Keep participant records private.
3. A new reproducible analysis on a public dataset, with a clear business question, runnable code and documented decisions. Label new work accurately rather than presenting assistant generated work as historical coursework.
4. A short project walkthrough recorded by Daniel to show communication and ownership.

These additions need their source materials or Daniel's participation. They are recommendations, not empty downloads or invented case studies.
