---
theme: wwt
layout: cover
title: "Stop Dreaming, Start Engineering"
subtitle: "Cloud Patterns for Production AI"
presenter: "Jeremy Meiss"
presenterRole: "Tech Solution Architect"
info: |
  ## Stop Dreaming, Start Engineering: Cloud Patterns for Production AI. Audience Takeaway.

  Most AI projects never make it past the prototype stage because we treat them as magic instead of software. Moving from a "cool demo" to a production-grade system requires the same architectural rigor we've spent decades building for the cloud, while asking the same questions with a healthy level of skepticism, with new rules for non-deterministic code.

  This talk will look at how AWS, GCP, and Azure have codified AI engineering, breaking down the patterns that actually work: from safe rollout strategies like shadow deployments to the shift from classic RAG to autonomous multi-agent loops. At the end we'll have a blueprint to work with that doesn't just "work on my machine", but scales, remains observable, while staying cost-effective in the real world.
drawings:
  persist: false
transition: slide-left
comark: true
duration: 35min
colorSchema: dark
---

<!--
Hold 15s while people settle. Don't read the title out loud — say hello, thank them for coming.
-->

---
layout: quote
dark: true
---

How many of you have shipped an AI demo that quietly died?

<!--
Hold 20-30s. Wait for hands. Emotional entry point. "Yeah. Me too. More than once."
-->

---
layout: stats
stats:
  - value: "80.3%"
    label: "Failure rate of enterprise AI initiatives"
    caption: "RAND, 2024 meta-analysis, n = 2,400+"
---

<!--
Hold 30s. Say the number slow, then repeat it once. Don't editorialize — the number does the work.
-->

---
layout: stats
title: "Where the 80.3% comes from"
stats:
  - value: "33.8%"
    label: "Abandoned before production"
    caption: "RAND, 2024"
  - value: "28.4%"
    label: "Ship but deliver no value"
    caption: "RAND, 2024"
  - value: "18.1%"
    label: "Run but never recoup cost"
    caption: "RAND, 2024"
---

<!--
Hold 45s. Credibility beat. Also cite: MIT NANDA — 95% of GenAI pilots deliver no measurable P&L return. Gartner (Apr 2026) — only 28% of AI infrastructure projects deliver promised ROI. "Three independent studies, same conclusion." CUT CANDIDATE if pacing runs long — slide 3 alone carries the number.
-->

---
layout: comparison
title: "Where the failure actually is"
left:
  title: "The notebook"
  points:
    - "model.fit() converges"
    - "Accuracy looks great on the holdout set"
    - "Demo day: it works"
right:
  title: "The system around it"
  points:
    - "Data pipeline — unowned, undocumented"
    - "Identity boundary — nobody drew it"
    - "Observability — bolted on after the incident"
    - "Cost line — nobody modeled it"
---

<!--
ANCHOR: "The model is 10 percent. The other 90 percent is what killed the project." It's almost never the model that failed — the model usually worked fine.
-->

---
layout: quote
dark: true
---

AI is software with new rules.

<!--
No decoration. Say the line. Pause. This is the throughline for everything after: non-deterministic output, data-dependent behavior, model drift, an inverted cost model.
-->

---
layout: default
title: "The six-phase lifecycle"
---

# The six-phase lifecycle

<div flex justify-center mt-4>

```mermaid {scale: 0.6}
flowchart LR
    A[Business Goal] --> B[Problem Framing]
    B --> C[Data Processing]
    C --> D[Model Development]
    D --> E[Deployment]
    E --> F[Monitoring]
    F -.-> B
    linkStyle 5 stroke:#e0245e,stroke-width:3px
```

</div>

<!--
Say: "This isn't waterfall. It isn't even agile. It's a feedback loop with a clock on it." The red arrow — Monitoring back to Problem Framing — is the whole point of this slide. The moment you stop iterating, your model starts decaying.
-->

---
layout: timeline
title: "Use-case drift"
events:
  - date: "Week 1"
    label: "\"Reduce complaints by 30%\""
  - date: "Month 3"
    label: "Which vector database?"
  - date: "Month 6"
    label: "Nobody mentions complaints anymore"
    detail: "Deloitte, State of AI in the Enterprise 2026"
---

<!--
Hold 30s. Uncomfortable laughs land here. That's the point — this is how a third of AI projects die before they ever ship.
-->

---
layout: default
title: "Well-Architected, for AI"
---

# Well-Architected, for AI

<div grid="~ cols-3 gap-6" mt-4>
<div><strong>Operational Excellence</strong><br>MLOps automation</div>
<div><strong>Security</strong><br>Model, data, prompt</div>
<div><strong>Reliability</strong><br>Recovery from drift</div>
<div><strong>Performance</strong><br>Purpose-built silicon</div>
<div><strong>Cost</strong><br>Inference is your bill</div>
<div><strong>Sustainability</strong><br>Measurable now</div>
</div>

<p text-sm opacity-70 mt-8>AWS ML Lens · GCP AI/ML Framework · Azure Well-Architected AI workload guidance</p>

<!--
Sustainability is worth a beat — training and inference at scale have real, now-measurable environmental cost.
-->

---
layout: default
title: "Convergence"
---

# Three competitors. Same six answers.

<div grid="~ cols-3 gap-6" mt-8 text-center text-xl>
<div><strong>AWS</strong></div>
<div><strong>GCP</strong></div>
<div><strong>Azure</strong></div>
</div>

<p mt-8 text-center>All three arrived at the same six Well-Architected pillars — independently.</p>

<!--
Hold 20s. Credibility beat for the entire talk. ANCHOR: "When three competitors converge on the same six pillars, that's not marketing. That's emerging engineering truth."
-->

---
layout: quote
dark: true
---

Regulation is an architectural input now. Not a Phase-6 checkbox.

<!--
Hold. Let it land.
-->

---
layout: default
title: "The clock"
---

# August 2, 2026

## EU AI Act. Full enforcement.

**Fines up to €35M or 7% of global revenue.**

<v-clicks>

- Article 50 transparency obligations
- GPAI compliance
- Data lineage
- Human-in-the-loop for high-risk systems
- Risk classification tags

</v-clicks>

<p text-sm opacity-70>Source: EU AI Act (Regulation (EU) 2024/1689)</p>

<!--
Delivery variant if pre-Aug 2: "For most of you, that's next week." Post-Aug 2 variant: "Enforcement began [N] weeks ago." Know one real enforcement case to reference if delivering after the date.
-->

---
layout: default
title: "Standards, not just regulations"
---

# Standards, not just regulations

<div grid="~ cols-3 gap-6" mt-8 text-center text-lg>
<div><strong>EU AI Act</strong></div>
<div><strong>NIST AI RMF</strong></div>
<div><strong>ISO/IEC 42001</strong></div>
</div>

<p mt-8 text-center>Buy, build, or hybrid. Same controls. Same paper trail.</p>

<!--
CUT CANDIDATE — slide 12 does most of the work.
-->

---
layout: section
number: "03"
title: "Shipping non-deterministic code"
---

<!--
Hold 5s. Move on.
-->

---
layout: comparison
title: "The core problem"
left:
  title: "A unit test"
  points:
    - "Same input →"
    - "one deterministic output"
    - "Pass or fail"
right:
  title: "The same test, against an LLM"
  points:
    - "Same input →"
    - "three different outputs, three runs"
    - "\"Correct\" isn't pass or fail"
---

<!--
ANCHOR (crisp, don't add anything after): "Correct isn't a value. It's a distribution."
-->

---
layout: default
title: "Four patterns, one slide"
---

# Four patterns, one slide

<div grid="~ cols-2 gap-6" mt-4>
<div><strong>Blue-Green</strong><br>Fast rollback, trust your validation</div>
<div><strong>Canary</strong><br>Gradual, real-user exposure</div>
<div><strong>Shadow</strong><br>Mirror traffic, discard results</div>
<div><strong>A/B Testing</strong><br>Prove business impact</div>
</div>

<!--
Hold 45s. "Read while I narrate" slide.
-->

---
layout: default
title: "Shadow deployment, in detail"
---

# Shadow deployment, in detail

<div flex justify-center mt-4>

```mermaid {scale: 0.85}
flowchart LR
    U[User request] --> P[Production model]
    P --> Resp[Response returned]
    U -.mirror.-> S[Shadow model]
    S -.-> L[(Logged & compared,\nnever returned)]
```

</div>

<v-clicks>

- Build 1 — production path only
- Build 2 — shadow duplication added
- Build 3 — comparison and diff, labeled

</v-clicks>

<!--
Highest-value technical slide of the talk. ANCHOR: "The number of production AI incidents I've seen that would have been caught by a two-week shadow run is depressing." If the venue projector is bad, skip the clicks and present the finished diagram — it's static either way, no risk.
-->

---
layout: process
title: "The Azure template"
steps:
  - title: "Deploy green"
    detail: "0% traffic"
  - title: "Smoke test"
    detail: "Invoke green by name"
  - title: "Mirror"
    detail: "Live traffic duplicated"
  - title: "Progressive shift"
    detail: "10% → 25% → 50% → 100%"
  - title: "Retire blue"
---

<!--
Say: "Names change per cloud. Shape doesn't."
-->

---
layout: default
title: "Trace-based eval"
---

# Trace-based eval

<div flex justify-center mt-4>

```mermaid {scale: 0.9}
flowchart LR
    T[Production traces] --> S[(Trace store)]
    S --> A[Autorater]
    A --> R[Regression test suite]
```

</div>

<p text-sm opacity-70 mt-4>AgentCore Evaluations (GA March 2026) · Foundry trace-based evaluation · Agent Evaluation on Agent Platform</p>

<!--
CUT CANDIDATE — nice-to-have callout, not core. Say: "Your shadow observations become your eval set. Automatically."
-->

---
layout: process
title: "The sequence"
steps:
  - title: "Shadow"
    detail: "Tells you whether the model is broken"
  - title: "Canary"
    detail: "Tells you whether users tolerate it"
  - title: "Full cutover"
---

<!--
ANCHOR (pause between sentences): "Shadow tells you whether the model is broken. Canary tells you whether users tolerate it. You need both answers." Source note: delivery notes elsewhere group this slide with the full-bleed statement slides — if you'd rather deliver it that way, swap to `layout: quote` + `dark: true` with the same line as body text.
-->

---
layout: quote
---

If shadow isn't in your pipeline, that's your highest-leverage fix.

<!--
Section landing.
-->

---
layout: section
number: "04"
title: "Grounding models in your data"
---

---
layout: default
title: "Why RAG exists"
---

# Why RAG exists

<v-clicks>

- Foundation models hallucinate
- Foundation models are frozen at training cutoff
- Foundation models don't know your company

</v-clicks>

<p mt-6 v-click><strong>RAG solves all three.</strong></p>

<!--
CUT CANDIDATE — most of the room knows why RAG exists. "Same model. Dramatically better answers."
-->

---
layout: default
title: "Four pipelines, one shape"
---

# Four pipelines, one shape

<div flex justify-center mt-4>

```mermaid {scale: 0.9}
flowchart LR
    A[Data collection] --> B[Feature / embedding]
    B --> C[Vector store]
    C --> D[Inference orchestration]
```

</div>

| | AWS | GCP | Azure |
|---|---|---|---|
| Collection & storage | S3 | Cloud Storage | Blob Storage |
| Embedding & retrieval | OpenSearch | Vertex AI | Azure AI Search |

<!--
Say: "Same shape everywhere. Different plumbing."
-->

---
layout: comparison
title: "The managed-knowledge shift"
left:
  title: "2024"
  points:
    - "A dev, staring at the four-pipeline diagram"
    - "Custom code, everywhere"
right:
  title: "2026"
  points:
    - "The same dev"
    - "One box: managed knowledge base"
    - "Bedrock Managed KB · Foundry IQ · GCP RAG Engine"
---

<!--
"You probably shouldn't be hand-rolling the four-pipeline architecture anymore."
-->

---
layout: comparison
title: "Classic vs. agentic retrieval"
left:
  title: "Classic RAG"
  points:
    - "Query: one vector search"
    - "Sources: one"
    - "Latency: fast"
    - "Cost: cheap"
    - "Best for: FAQ, refunds, policy lookup"
right:
  title: "Agentic retrieval"
  points:
    - "Query: LLM decomposes to sub-queries"
    - "Sources: many, parallel"
    - "Latency: slow"
    - "Cost: expensive"
    - "Best for: complex, multi-source, conversational"
---

<!--
The trade-off is still real. Pick deliberately, don't over-engineer.
-->

---
layout: default
title: "The default has flipped"
---

# The default has flipped

In 2026, agentic retrieval ships natively on all three clouds.

Classic RAG is still the right answer more often than teams think.

<!--
ANCHOR: "A surprising number of teams default to agentic because it sounds sophisticated, then wonder why latency is four seconds and the bill tripled."
-->

---
layout: quote
dark: true
---

When the agent retrieves, who is it acting as?

<!--
Hold. Seed for Section VI.
-->

---
layout: quote
---

Pick your RAG shape deliberately. Managed unless you have a real reason.

<!--
Section landing.
-->

---
layout: section
number: "05"
title: "Agents. And the protocol that made them portable."
---

<!--
Densest section. Do not rush.
-->

---
layout: comparison
title: "What is an agent, actually"
left:
  title: "Model + tool"
  points:
    - "Input → arrow → output"
    - "Not an agent"
right:
  title: "Model in a loop"
  points:
    - "Tools, observations feeding back"
    - "Agent"
---

<!--
"A calculator function bolted to GPT isn't an agent. A loop is."
-->

---
layout: default
title: "New failure modes"
---

# New failure modes

<v-clicks>

- Infinite loops
- Wrong tool called
- Hallucinated tool
- Correct tool, wrong argument
- Correct result, misinterpreted

</v-clicks>

<!--
Deliberately ugly and long. "None of these existed in request-response. All of them exist now."
-->

---
layout: default
title: "MCP: the setup"
---

# MCP: the setup

<div grid="~ cols-2 gap-8" mt-4>
<div flex="~ col" items-center>

**Before**

```mermaid {scale: 0.55}
graph TD
    F1[Framework A] --> T1[Tool 1]
    F1 --> T2[Tool 2]
    F1 --> T3[Tool 3]
    F2[Framework B] --> T1
    F2 --> T2
    F2 --> T3
    F3[Framework C] --> T1
    F3 --> T2
    F3 --> T3
```

</div>
<div flex="~ col" items-center>

**After**

```mermaid {scale: 0.55}
graph TD
    G1[Framework A] --> M[MCP servers]
    G2[Framework B] --> M
    G3[Framework C] --> M
    M --> S1[Tool 1]
    M --> S2[Tool 2]
    M --> S3[Tool 3]
```

</div>
</div>

<p text-sm opacity-70 mt-4>Model Context Protocol. Anthropic, November 2024. Open standard.</p>

<!--
"USB-C for agents." Pause after "agents" — the metaphor lands better with space around it.
-->

---
layout: stats
title: "MCP: the numbers"
stats:
  - value: "97M"
    label: "Monthly SDK downloads"
    caption: "March 2026"
  - value: "5"
    label: "Native hyperscaler support"
    caption: "OpenAI, Google, Microsoft, IBM, Amazon"
  - value: "~28%"
    label: "Of Fortune 500 in production"
    caption: "Conservative estimate"
  - value: "07-28"
    label: "Spec revision"
    caption: "2026, landing this week"
---

<!--
ANCHOR: "Tools are portable now. That's the new thing." Also: "970x growth in eighteen months." Read the numbers cleanly, don't editorialize.
NEEDS SOURCE: the 97M downloads and ~28% Fortune 500 figures have no named source in the outline this deck was built from (speaker-notes.md hedges with "according to the most conservative estimates" but doesn't name one). Confirm and cite before presenting, or soften to a range.
-->

---
layout: default
title: "Six orchestration patterns"
---

# Six orchestration patterns

<div grid="~ cols-3 gap-6" mt-4 text-sm>
<div><strong>Sequential</strong><br>Structured pipelines</div>
<div><strong>Routing</strong><br>Clear category dispatch</div>
<div><strong>Parallel</strong><br>Latency reduction, diverse perspectives</div>
<div><strong>ReAct</strong><br>Tool use, iterative</div>
<div><strong>Hierarchical (Magentic)</strong><br>Open-ended tasks</div>
<div><strong>Evaluator</strong><br>Quality-critical outputs</div>
</div>

<!--
Hold 60s. "Read while I narrate" slide. Do not walk through each tile — narrate the meta-point.
-->

---
layout: default
title: "Runtime landscape, current state"
---

# Runtime landscape, current state

<div grid="~ cols-3 gap-6" mt-4>
<div>

**AWS AgentCore**
GA Oct 2025. Policy GA. Evaluations GA. Payments preview.

</div>
<div>

**GCP Agent Platform**
Announced Cloud Next '26. Vertex retired. Skill Registry. Memory Bank profiles GA.

</div>
<div>

**Microsoft Foundry**
Agent Framework 1.0 GA. Foundry Agent Service GA. Hosted Agents GA. M365 publishing.

</div>
</div>

<p mt-8 text-center><strong>All three are GA. Pick on other criteria.</strong></p>

---
layout: default
title: "Cross-vendor reality"
---

# Cross-vendor reality

| Model | AWS | GCP | Azure |
|---|---|---|---|
| Claude | available | available | available |
| GPT | | | primary, expanding |
| Gemini | | primary | cross-cloud emerging |
| Open models | everywhere | everywhere | everywhere |

<p mt-6 opacity-80>The frontier model performance gap is 5–15%. The platform gap on governance is much larger.</p>

<!-- NEEDS SOURCE: the 5-15% model-performance-gap figure has no named source in the outline (asserted as fact in anchor-lines.md/talk-outline.md). Confirm which benchmark(s) this is drawn from before presenting — it repeats on slide 44. -->

---
layout: quote
dark: true
---

In 2026, agents run everywhere. What varies is who they answer to.

<!--
TOP 5 — highest-value line in the updated talk. Hold 20s. No commentary. If you flub any line in the whole deck, don't let it be this one.
-->

---
layout: default
title: "A2A + AP2"
---

# A2A + AP2

Two agents, different organizations, talking directly.

- **A2A** — agent-to-agent
- **AP2** — agent payments

Watch this space.

<!--
CUT CANDIDATE — drop without losing the argument. "If you're building anything that crosses org boundaries, these are the standards to track."
-->

---
layout: section
number: "06"
title: "The part that determines your platform choice"
---

---
layout: comparison
title: "The two identity patterns"
left:
  title: "Identity passthrough"
  points:
    - "Microsoft Foundry + Fabric"
    - "User's Entra token flows through the agent"
    - "Agent inherits the human"
right:
  title: "Runtime isolation"
  points:
    - "GCP Agent Identity"
    - "SPIFFE cert bound to container, mTLS everywhere"
    - "Agent has its own identity, tied to where it runs"
---

<!--
"Human-driven workflows on the left. Autonomous workflows on the right. You probably need both."
-->

---
layout: code-focus
title: "OpenTelemetry GenAI conventions"
---

```yaml
gen_ai.system: "anthropic"
gen_ai.request.model: "claude-opus-5"
gen_ai.usage.input_tokens: 1834
gen_ai.usage.output_tokens: 412
gen_ai.tool.name: "search_knowledge_base"
gen_ai.server.time_to_first_token: 0.312
```

Datadog · Honeycomb · New Relic · LangChain · CrewAI · AutoGen · AG2 · Microsoft

**The `gen_ai.*` schema won.**

<!--
ANCHOR: "If your platform doesn't emit these, you're locking in a vendor. Ask before you commit." For the first time, agent observability is vendor-neutral.
-->

---
layout: comparison
title: "Cost reality"
left:
  title: "Traditional compute"
  points:
    - "Mostly flat once provisioned"
right:
  title: "Inference"
  points:
    - "Linear with usage"
    - "No cap"
    - "Average enterprise: 4+ distinct LLMs in production"
---

<!--
CUT CANDIDATE — cost is real but well-understood. "Latency-aware routing between cheap and smart isn't optimization. It's table stakes."
NEEDS SOURCE: "4+ distinct LLMs in production" has no named source in the outline. Confirm before presenting.
-->

---
layout: quote
dark: true
---

Platform choice matters more than model choice.

<!--
Sub-text (spoken, not shown): frontier model gap 5-15%. Platform gap on governance and compliance, much larger.
NEEDS SOURCE: same unattributed 5-15% figure as slide 37 — see that slide's flag.
-->

---
layout: default
title: "The nine questions"
---

# The nine questions

<div grid="~ cols-2 gap-6" mt-4>
<div flex="~ col" gap-4>
<div flex gap-3><strong style="color: var(--wwt-primary-base)">1.</strong> Are your feedback loops wired from monitoring back to framing?</div>
<div flex gap-3><strong style="color: var(--wwt-primary-base)">2.</strong> Do you have a shadow stage before real users?</div>
<div flex gap-3><strong style="color: var(--wwt-primary-base)">3.</strong> Classic or agentic retrieval — deliberate choice?</div>
<div flex gap-3><strong style="color: var(--wwt-primary-base)">4.</strong> Which orchestration pattern? Can you draw it in 30 seconds?</div>
<div flex gap-3><strong style="color: var(--wwt-primary-base)">5.</strong> Are your tools exposed via MCP?</div>
</div>
<div flex="~ col" gap-4>
<div flex gap-3><strong style="color: var(--wwt-primary-base)">6.</strong> Can your agent ever see data its user can't? Structurally, not policy?</div>
<div flex gap-3><strong style="color: var(--wwt-primary-base)">7.</strong> Are you emitting OpenTelemetry GenAI conventions?</div>
<div flex gap-3><strong style="color: var(--wwt-primary-base)">8.</strong> Article 50 ready by August 2?</div>
<div flex gap-3><strong style="color: var(--wwt-primary-base)">9.</strong> Do you know your per-inference cost and have a routing strategy?</div>
</div>
</div>

<!--
Hold this slide the whole time you're walking through them. Don't advance until you've hit all nine. Not a list of services to adopt — a list of questions to answer before you ship.
-->

---
layout: quote
dark: true
---

The engineering already exists.<br>
The standards are here.<br>
The regulators are ready.<br>
Stop dreaming.

<!--
Pause. That's the end. Longer spoken version: "The engineering already exists. It's been written down. The standards are here. The runtimes are GA. The regulators are enforcing. Stop dreaming about what AI could be. Start engineering what it has to be to actually ship." Do not add anything after "start engineering" — not "thanks for coming." Just: "Start engineering. Thank you." Then step back from the mic.
-->

---
layout: default
title: "Thank you"
---

# Thank you

**Stop dreaming. Start engineering.**

Jeremy Meiss · Tech Solution Architect, World Wide Technology

<!-- TODO: add contact links (blog / talk page / book) -->
<!-- TODO: add a QR code image pointing to the handout -->

Questions?

<!--
Keep this on screen for the full Q&A. Anticipated questions:
- Which cloud should we pick? Push to governance model, data gravity, existing stack — model access is basically at parity now.
- What about open-source / self-hosted? Legitimate for cost and data sovereignty; hybrid is easier than a year ago.
- How do you handle prompt injection? Layered defenses — Model Armor (GCP), content safety (Azure), Cedar policies (AWS), plus identity passthrough. See OWASP's 2026 agentic security guidance.
- What about MCP security? Real concern — broad permissions plus non-deterministic agents. The 2026-07-28 spec revision improves OAuth alignment; auth propagation and tool overexposure are still top-reported issues.
- How do you handle evaluation? Trace-based evaluation is the current best answer across all three platforms; golden datasets still useful for regression.
- Is RAG dead now that context windows are huge? No — long-context is expensive, slow, and doesn't solve freshness or access control.
- What if I'm not in Europe? Still matters if you have European users or data; US state-level regulation is following the same patterns.
- How do I convince leadership to invest? RAND, MIT NANDA, and Gartner all agree — the 80% failure rate is a leadership problem more than a technical one.
-->
