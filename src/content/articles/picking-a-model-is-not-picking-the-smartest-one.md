---
title: "Picking a model is not picking the smartest one"
date: 2026-08-16T22:31:00+05:30
tags: ["ai-pm", "interview-prep"]
description: "I defaulted to the most capable model available for a task that needed speed more than intelligence, and only noticed once latency complaints came in."
---

Someone asked in an interview which model I'd pick for a real-time voice agent's intent classification step, and my instinct, the one I'd have gone with a year ago, was to name whichever model was topping the leaderboard that month. That's the wrong instinct for that specific slot in a voice pipeline, and it took building an actual voice agent to learn why.

Model selection is a multi-dimensional tradeoff, and "capability" is only one axis, often not the binding one. For a voice agent's intent classification, the task is genuinely simple, classify what the caller wants into one of a dozen categories, but it sits in a pipeline where every added hundred milliseconds of latency is directly felt as an awkward pause on a phone call. A smaller, faster, slightly less capable model that returns in 150ms beats a more capable one that takes 900ms, because the task doesn't need the extra capability but the conversation absolutely needs the speed. I'd been treating "best model" as a single leaderboard position instead of a fit question against the specific constraints of where in the product it's being used.

Cost is the other axis that's easy to ignore until it isn't. A model that's marginally better on a benchmark but costs five times more per call matters enormously differently depending on call volume. At low volume during a pilot, nobody notices. At the volume a churn-rescue agent runs once it's actually deployed across a customer base, that cost multiplier turns into a real line item that someone in finance eventually asks about, and by then swapping models is a much bigger lift than it would have been if the tradeoff had been made deliberately up front.

There's also a reliability and consistency axis that's easy to underweight, some models are more capable on average but have fatter tails of weird failures, and for a task that runs unattended at high volume, a model with a slightly lower ceiling but a tighter, more predictable failure distribution can be the safer product choice, even though it looks worse on a benchmark leaderboard.

What I actually do now, and what I should have said in that interview, is start from the task's requirements, not the model roster: what latency does the user experience tolerate, what's the acceptable cost per interaction at expected volume, does the task need genuine reasoning or is it closer to classification or extraction where a smaller model is plenty. Only after those constraints are pinned down do I look at which models clear the bar, and then pick the cheapest and fastest one that does, not the most impressive one that also happens to.
