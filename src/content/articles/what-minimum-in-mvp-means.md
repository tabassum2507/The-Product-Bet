---
title: "What 'minimum' in MVP actually means"
date: 2026-07-30T19:47:00+05:30
tags: ["product-management", "learning-in-public"]
description: "I used to think MVP meant fewer features, and it took shipping a bad one to learn it means fewer assumptions tested at once."
---

We shipped a version of the manufacturing ERP's voice command feature that supported exactly one phrase pattern: "add [quantity] [item] to [batch]." I called it an MVP in the planning doc. It wasn't minimum in any sense that mattered — it was just small. The assumption we actually needed to test, whether floor operators would trust voice input at all in a loud environment, wasn't testable with one rigid phrase pattern, because operators who mispronounced anything just gave up and went back to tapping. We learned voice input was unreliable. We didn't learn whether operators wanted it, because our MVP wasn't minimal with respect to the question we were asking.

That's the confusion I keep running into with "minimum viable product," and I think it's the most misused term in the PM vocabulary. Minimum doesn't mean fewest features. It means the smallest thing that lets you test your riskiest assumption. Sometimes that's a fully built feature with almost no polish. Sometimes it's not a product at all — a landing page, a concierge process where a human fakes the automation behind the scenes, a Wizard of Oz prototype. The size of the build has nothing to do with whether it's minimal; what matters is whether it isolates the assumption you're actually unsure about.

For the voice command feature, a better MVP might have been sitting next to three operators for a shift with a phone recorder, asking them to just say what they'd want to do out loud, no product at all, and seeing whether the words they used were even consistent enough to be worth building a parser for. Cheaper, faster, and it tests the actual risky assumption instead of the one we'd already quietly decided was true — that operators wanted voice, we just needed to nail the phrase grammar.

The tradeoff nobody tells you about minimalism is that a too-minimal MVP produces a false negative almost as often as a bloated one produces a false positive. If you strip a feature down so far that the experience feels broken for reasons unrelated to your actual hypothesis, users reject it for the broken parts and you never learn whether the core idea was sound. Our one-phrase-pattern build had this problem — operators rejected the friction of memorizing exact phrasing, not necessarily the idea of voice input itself. We conflated the two in the postmortem for a while.

If I were checking whether an MVP is actually minimal, I'd ask: what's the one thing this build is supposed to tell us that we don't already believe, and does every piece of what we built serve that question. Anything that doesn't serve the question is scope, not minimalism, no matter how small it looks on a roadmap slide.
