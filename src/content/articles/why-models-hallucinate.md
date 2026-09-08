---
title: "Why models hallucinate, and why 'just fine-tune it' isn't the fix"
date: 2026-08-10T20:52:00+05:30
tags: ["ai-pm", "interview-prep"]
description: "A stakeholder asked me to fix hallucinations with fine-tuning and I didn't have a fast enough answer for why that wouldn't work."
---

A stakeholder on the health assistant project asked, fairly reasonably from where he sat, why we couldn't just fine-tune the model on our own medical content so it would stop making things up. I gave a mushy answer about how fine-tuning changes style more than facts, and it wasn't wrong, but it also wasn't the clean explanation the moment needed, and I could tell he left the room unconvinced.

The clean version I wish I'd had ready: hallucination isn't the model malfunctioning, it's the model doing exactly what it's built to do, produce statistically plausible continuations, when it doesn't have a strong enough signal pointing toward a specific correct answer. Fine-tuning adjusts the model's general behavior and tone across many examples. It doesn't give the model access to a specific fact it didn't already have some trace of in training, and it definitely doesn't teach the model to say "I don't know" more often, because "I don't know" is rarely what the fine-tuning examples look like, confident correct answers are.

What actually helps depends on which of two different problems you're solving. If the model doesn't have the knowledge at all, no amount of fine-tuning conjures it, you need retrieval, grounding the answer in a specific document at generation time so the model has something concrete to draw from instead of relying on what it half-remembers from training. If the model does have the knowledge somewhere in its weights but is inconsistent about surfacing it correctly, that's closer to a case where prompting, few-shot examples, or fine-tuning on the specific task shape can help, because you're steering behavior, not injecting facts.

The failure mode I see product teams fall into, and fell into myself on the health assistant, is picking the fix based on which one sounds more impressive rather than which problem you actually have. Fine-tuning sounds like the serious, technical solution. Retrieval sounds almost too simple. But for anything where facts need to be current or specific to your own data, retrieval is usually doing the actual load-bearing work, and fine-tuning is polish on top, if it's needed at all.

For measuring this, the number I've started caring about isn't a vague "does it hallucinate less" but a hallucination rate against a curated eval set of questions where I know the ground truth, ideally including questions the system should refuse to answer confidently. A model that hallucinates less on easy questions but still confidently invents an answer to something outside its grounding hasn't actually gotten safer, it's just gotten better at the questions you were already going to get right. The refusal rate on genuinely unanswerable questions tells you more about production readiness than the headline accuracy number does, and it's the metric I didn't have an answer for when that stakeholder asked how confident we were.
