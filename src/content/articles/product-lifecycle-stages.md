---
title: "Product lifecycle stages, and why I never used to take them seriously"
date: 2026-07-28T20:14:00+05:30
tags: ["product-management", "learning-in-public"]
description: "The product lifecycle sounds like a chart until you have to decide whether to invest or sunset something, and I couldn't answer that cleanly this week."
---

An interviewer asked me last week which stage our churn-rescue agent was in — introduction, growth, maturity, decline — and I gave the kind of answer you give when you memorized the framework instead of understanding it. Something about "growth, I think, because usage is up." He asked what evidence I'd want before making that call. I didn't have a good answer.

The lifecycle model is one of those things every PM course draws as a bell curve and moves on from. Introduction is when you're still proving anyone wants the thing. Growth is when adoption is compounding mostly without your help. Maturity is when growth flattens and you're optimizing margins instead of chasing new users. Decline is when you're deciding whether to sunset or reinvest. Easy to draw, much harder to locate yourself on in real time, because you're inside the curve, not looking at it from outside.

What actually made this useful for me wasn't the stages themselves, it was realizing that different stages call for different kinds of PM work, and doing growth-stage work during introduction (or the reverse) is a common way teams waste a quarter. Early on, you should be embarrassed by how manual your onboarding is, because you're still learning whether the core loop works at all — automating it too early locks in assumptions you haven't tested. I did this with the manufacturing ERP's Hindi voice command feature: we built a whole intent-classification pipeline before we'd confirmed operators actually wanted to speak commands instead of tapping through the existing UI faster. Turned out for about a third of them, voice was slower. We'd optimized for a stage we weren't in yet.

## How I'd actually measure it

Instead of eyeballing a curve, I've started asking three questions when someone tells me a product is "in growth": is new-user acquisition happening without incremental sales or marketing spend, is retention holding steady as the user base gets less like the early adopters, and has the unit economics story been tested at two or three times current volume, or is it still theoretical. If the answer to any of those is no, you're probably still in introduction wearing growth-stage confidence.

The failure mode I keep seeing, and the one I fell into with that interview answer, is treating lifecycle stage as a vibe read on momentum rather than a claim you should be able to defend with a specific metric. "Usage is up" is not evidence of growth stage. Usage being up while your cost to acquire a new active user is falling, that's evidence. It's a small distinction, but it's the difference between a framework you can recite and one you can use to make a real prioritization call, like whether to spend the next sprint on new-user activation or on shaving latency for existing power users.

I still don't think I'd nail that interview question today, but at least now I'd ask what he meant by "stage" before answering.
