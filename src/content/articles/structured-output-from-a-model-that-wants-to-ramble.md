---
title: "Getting structured output out of a model that wants to ramble"
date: 2026-08-12T19:38:00+05:30
tags: ["ai-pm", "technical-pm"]
description: "The first time I needed reliable JSON out of an LLM, I found out how much a model can technically follow instructions and still fail you."
---

We needed the RAG health assistant to output a structured triage object, urgency level, suggested next step, a confidence flag, so a downstream system could route the conversation without a human reading free text every time. My first attempt was a prompt that said "respond in JSON with these fields" followed by a description of the fields in prose. It worked about eighty percent of the time. The other twenty percent, the model wrapped the JSON in a sentence, or used a field name that was close but not exact, or occasionally just explained its reasoning first and then forgot to include the object at all.

Two things fixed most of it. Few-shot examples, actual sample input-output pairs in the prompt showing the exact JSON shape, did more than any amount of prose instruction, because the model is pattern-matching against concrete examples far more reliably than it's parsing a spec written in English. And where the API supported it, a schema-constrained output mode, where the model's token generation is actually restricted to only produce valid JSON matching a defined schema, closed the remaining gap almost entirely, because at that point it's not a matter of the model choosing to follow instructions, the invalid tokens simply aren't available to generate.

What I hadn't appreciated going in is that these are different guarantees with different failure costs. Prompt-based instruction is a request the model usually honors. Schema-constrained generation is closer to an actual guarantee about output shape, but it's not free, it can make the model's phrasing feel stiffer inside the fields that do allow free text, because the model is now working within tighter rails than it would choose on its own, and there's a real quality tradeoff between fully unconstrained fluency and reliable structure that I didn't expect to have to weigh.

Few-shot has its own cost, mostly token budget, every example you add is tokens you're paying for on every single request, and there's a point where adding a fifth example to nail an edge case isn't worth the marginal token cost against how rarely that edge case actually occurs in production traffic.

The way I measure whether structured output is actually solved, rather than just looking solved in the demo, is a validation rate against a held-out sample of real, messy user inputs, not the clean examples used to write the prompt, checking not just whether the JSON parses but whether the values inside it are the ones a human reviewer would have picked. A ninety-nine percent JSON-parses-successfully rate can hide a much lower rate of actually-correct-classification, and those are two different numbers that get conflated in a demo far too easily.
