---
title: "How do you know the model is actually good"
date: 2026-08-14T20:09:00+05:30
tags: ["ai-pm", "analytics"]
description: "We shipped a prompt change that felt obviously better in every manual test I ran, and it made things worse for a segment I hadn't checked."
---

I rewrote a prompt on the churn-rescue agent, ran it against the ten conversations I always use to sanity check changes, and every one looked better. More natural, more on-tone, fewer awkward transitions. I shipped it. A week later retention on calls from one specific customer segment, people already mid-cancellation with a specific plan type, had dropped noticeably, and it took a few days of confused looking-around before someone connected it to the prompt change, because my ten test conversations hadn't included a single example from that segment.

That's the gap between testing a model change and evaluating one. Testing is running some inputs and eyeballing the outputs, which tells you the change didn't obviously break anything you thought to check. Evaluation is a structured, repeatable process against a representative set of cases with some notion of ground truth or at least a consistent rubric, which tells you something you can actually compare across changes over time. I'd been doing the first and calling it the second.

Building an eval set properly means it has to represent the actual distribution of what happens in production, not just the cases that are easy to think of or the ones that made a good demo. That means deliberately including the annoying, edge-case-y, poorly-phrased inputs real users generate, not just clean ones. It also means it needs enough volume that you're not fooling yourself with n of ten, because ten conversations, especially ten I picked myself, are going to reflect my own blind spots about what "normal" looks like.

The other distinction I didn't appreciate at first is between automated and human evaluation, and they're not substitutes for each other. An automated eval, using another model to grade responses against a rubric, or checking for the presence of required elements, scales cheaply and lets you run it on every single change before shipping. But it's only as good as the rubric, and some things, whether a response actually sounds like it's listening to what the customer said versus just hitting the right talking points, are still better judged by a human reviewer, at least until you've validated that your automated grader agrees with human judgment often enough to trust it unsupervised.

What I do differently now is maintain a growing eval set pulled from real, sometimes painful production transcripts, tagged by segment, and I don't ship a prompt or model change without running the whole set, not my personal favorite ten examples. It's slower. It's caught two regressions since that I would have shipped blind under the old process, including one nearly identical to the segment issue that started all this.
