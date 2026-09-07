# Portfolio visual review

This revision preserves the original editorial typography, page structure, section order and case evidence. It adds decision pathways and relational data models to the existing trust and neural network views. All 4 models are available in the existing homepage visual columns and case study disclosures. Illustrative geometry is explicitly identified.

Opening actions now expose selected work, CV and contact details. Case pages include a sourced key finding and direct evidence link. Typography proportions, mobile gutters, profile navigation labels, research workflow borders and contact rows are refined within the existing layout.

## Verification

The production build, TypeScript and ESLint passed. Browser review covered desktop homepage, contact and predictive case pages, plus profile, work and research at a 390px iframe viewport. This is responsive width testing, not a physical phone test.

Menu opening and closing, mobile menu navigation to Profile, theme cycling, project search navigation, individual case filtering and model selection were exercised successfully. Clipboard access is unavailable on the HTTP preview; its explanatory fallback was confirmed. Email and CV destinations were inspected. The PDF exists in source and exported output, but the browser download event timed out, so completed download delivery is not claimed.

The browser reports WebGL disabled. Actual GPU rendering and rotation could not be verified. All models provide a labelled SVG diagram and explanatory text when a WebGL context cannot be created. Mode selection and this fallback were exercised. GPU controls correctly remain disabled in fallback mode.

Preview startup compatibility was fixed without replacing Next.js. Development output is separated from production output to prevent build interference.

This revision is held for screenshot review before publication. Remaining checks: GPU rendering and rotation on a WebGL capable device, completed CV download delivery, and physical touch device behaviour. No measured performance or accessibility certification is claimed.
