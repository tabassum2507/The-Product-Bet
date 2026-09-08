---
title: "System prompts do more work than the prompt box makes you think"
date: 2026-08-11T22:44:00+05:30
tags: ["ai-pm", "technical-pm"]
description: "I treated the system prompt as a formality for a while, until rewriting one changed our churn-rescue agent's behavior more than any model swap did."
---

For a stretch I thought of the system prompt as boilerplate, the "you are a helpful assistant" line everyone copies from a tutorial and forgets about, with the real product work happening in the user-facing prompt or the retrieval pipeline. Then I rewrote the churn-rescue agent's system prompt from four sentences to about forty lines, and the agent's actual behavior on calls shifted more from that one change than from switching the underlying model had.

The system prompt is where you set the persistent context the model treats as instruction rather than conversation, things the user never sees but that shape every response, tone, constraints, what the model should refuse, how it should handle ambiguity, what persona it's holding. The user's message is one turn. The system prompt is standing instruction across every turn, which is exactly why it's more leveraged than any individual prompt tweak, and also why getting it wrong is more expensive, since the mistake compounds across every conversation instead of showing up once.

What I underestimated was how much specificity matters here versus in a one-off prompt. "Be empathetic when the customer is upset" did almost nothing in our churn-rescue script, because empathetic is vague enough that the model's default behavior already looked like it was satisfying the instruction, so nothing observably changed. What actually moved behavior was something closer to "if the customer expresses frustration, acknowledge the specific issue they named before offering any resolution, and do not offer a discount in the first response even if one is available." Specific, falsifiable, tied to an observable behavior change. Vague adjectives in a system prompt mostly just make the prompt longer without making the model do anything differently.

The tradeoff I ran into is that an overly long, overly specific system prompt starts fighting itself, and debugging which instruction is winning in a forty-line prompt when two of them push in slightly different directions is genuinely hard, harder than debugging a shorter prompt with fewer degrees of freedom. I had an instruction to "keep responses under three sentences" sitting forty lines away from "always confirm the customer's account details before proceeding," and the confirmation step routinely blew past three sentences because nobody had reconciled the two rules against each other.

The way I test a system prompt now, rather than just reading it and nodding, is running the same set of adversarial and edge-case user turns against it before and after any change, and diffing actual model output, not diffing the prompt text. The prompt text tells you what you intended. Only the transcripts tell you what actually happened, and those two have diverged on me more than once.
