---
title: "TIL: A north star metric is not a KPI you already report; if it's already on the dashboard, it's probably a lagging metric"
date: 2026-08-19T22:05:00+05:30
tags: ["til", "analytics"]
description: "If a north star metric is already sitting on your dashboard, it's probably a lagging metric, not a real north star."
---

Reading through a framework doc on north star metrics tonight, and one line stopped me: if the metric you picked is already something you report every week without anyone asking, it's probably not actually a north star, it's a KPI you're relabeling because picking a real one is harder.

The distinction the doc drew: a north star metric is supposed to be leading, it should move before revenue or retention move, and moving it should causally lead to the business getting healthier. A KPI you already track, weekly active users, revenue, churn, is usually lagging, it tells you the outcome of decisions made weeks or months ago, not a lever you can point a team at this quarter and expect to see shift soon.

That reframes a mistake I've seen a few places, including a team I was on, pick "revenue" as the north star because it's the metric leadership already cares about and already has a dashboard for. It's not wrong to care about revenue, but calling it the north star doesn't give anyone a new lever to pull, it just restates the scoreboard everyone was already watching. A real north star is supposed to be closer to the actual behavior that predicts revenue, not revenue itself.

I don't have our own north star nailed down from this, just a clearer sense of the test to apply: does picking this metric tell a team what to go build, or does it just tell them how last quarter went.
