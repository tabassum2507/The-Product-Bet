---
title: "Tokens, context windows, and temperature, in plain terms"
date: 2026-08-08T21:08:00+05:30
tags: ["ai-pm", "interview-prep"]
description: "Three terms that show up in every AI PM interview and that I could define but not really reason about until recently."
---

I got tripped up in a mock interview when someone asked what happens to a conversation once it exceeds the context window, and I said "it gets cut off," which is true but incomplete enough that the follow-up question, cut off from where, the start or wherever's least relevant, exposed that I hadn't actually thought about it.

A token isn't a word, it's a chunk of text the model operates on, sometimes a whole word, sometimes a fragment, roughly four characters on average in English. This matters for cost and for limits, because pricing and context windows are both measured in tokens, not words or characters, so a rough rule of thumb, a bit under a word per token on average, is the thing you actually need for back-of-envelope estimates, not the precise tokenizer behavior.

The context window is the total number of tokens the model can attend to at once, input and output combined, in most implementations. What actually happens when you exceed it depends entirely on how the application is built around the model, not on the model itself. A naive implementation just truncates the oldest messages, which quietly drops the beginning of a conversation and can lose an instruction the user gave at the start. A better implementation summarizes older turns and keeps that summary in context instead of the raw text, trading some fidelity for not losing the thread entirely. This is a real product decision, not an implementation detail I get to hand off — which one you pick changes what the user experiences when a long conversation degrades.

Temperature controls how much randomness goes into token selection. Low temperature makes the model pick the most probable next token almost every time, which sounds like it should mean "more correct," but really just means "more predictable and repetitive," not more accurate. High temperature spreads probability across more plausible options, which is good for brainstorming-style outputs and bad for anything where you want the same input to reliably produce the same kind of output, like a structured data extraction task. I've seen a team set temperature high on a support-ticket classifier because "high temperature means smarter," which is backwards, and spent a week debugging inconsistent classifications before someone checked the config.

The tradeoff across all three, tokens, context, temperature, is really one tradeoff wearing three costumes: how much you pay and how consistent the output is, versus how much flexibility and freshness you get. If I were sizing a feature that uses an LLM, the first three numbers I'd want are rough tokens per request, how much conversation history actually needs to stay in context for the feature to work, and whether the task wants determinism or variety, because those three answers mostly determine the cost curve and the failure modes before a single prompt gets written.
