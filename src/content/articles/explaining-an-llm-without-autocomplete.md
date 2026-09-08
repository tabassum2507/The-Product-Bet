---
title: "How I finally explained an LLM without saying 'it's like autocomplete'"
date: 2026-08-07T19:05:00+05:30
tags: ["ai-pm", "learning-in-public"]
description: "The autocomplete analogy is technically fine and explains almost nothing useful about how to make product decisions with an LLM."
---

I've said "it's basically autocomplete, just really good" to a stakeholder probably a dozen times, and every time it bought me a nod and zero useful follow-up questions. Which should have told me something. The analogy is correct as far as it goes, next-token prediction, but it doesn't explain the thing stakeholders actually need to understand to make good decisions, which is why the model is confident, wrong, and unpredictable in the specific ways it is.

What's changed for me is explaining it through what the model is optimizing for instead of what it's mechanically doing. An LLM is trained to produce text that's statistically plausible given everything before it, not text that's true, not text that reflects what it "knows" the way a database reflects what's stored in it. Those two things, plausible and true, overlap a huge amount of the time, which is exactly why it's so easy to forget they're different properties. When they diverge, you get a hallucination, and it doesn't feel different from a correct answer at generation time, because the model isn't distinguishing "I'm sure" from "this sounds right," it's producing the same kind of output either way.

That reframe changes what questions people ask afterward. Instead of "how smart is the model," I get "how do we know when it's just producing plausible text versus text we can trust," which is the actual product question. It also makes it easier to explain why more parameters or a bigger context window doesn't fix hallucination, because the underlying objective, plausibility, hasn't changed, you've just made the model better at being plausible.

Where I got this wrong for a while was assuming that because I could explain the mechanism, I understood the failure modes, and those are different kinds of understanding. Knowing that a model predicts tokens doesn't tell you it'll confidently invent a citation for a paper that doesn't exist, or that it'll answer a math question wrong with the same tone of certainty as a right one. You learn those specific failure shapes by watching the model fail, not by knowing the architecture, and I spent longer than I should have thinking the architecture explanation was doing more work than it actually was in a product conversation.

The thing I try to measure now when I'm explaining this to a stakeholder isn't whether they can repeat the definition back, it's whether their next question is about the model's capability or about where in the product it needs a check before the output reaches a user. The second question means the explanation actually landed. The first means I just gave them a fun fact.
