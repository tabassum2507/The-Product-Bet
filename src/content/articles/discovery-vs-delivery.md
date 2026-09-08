---
title: "Discovery vs delivery, and why I kept confusing the two"
date: 2026-07-29T22:03:00+05:30
tags: ["product-management", "interview-prep"]
description: "For a while discovery and delivery just meant research phase and build phase to me, which isn't what either word means."
---

For the first year of my PM life, discovery meant the two weeks before a project where you talk to customers, and delivery meant the part where engineering builds it. Clean split, sequential, discovery hands off to delivery like a baton pass. I ran three projects that way before someone in a retro pointed out that our biggest scope surprises kept happening in week six of a four-week build — well after "discovery" had supposedly ended.

The reframe that actually helped: discovery isn't a phase, it's the question "should we build this and how." Delivery is "are we building it well." Both should be running continuously, for the life of a product, not sequentially for the life of a project. When I was still doing embedded work, this maps almost exactly onto the difference between validating a sensor's signal characteristics and writing the firmware that reads it — you don't stop characterizing the sensor just because you've started writing driver code, because the driver code will surface new questions about the sensor you didn't think to ask up front.

The mistake I made, and I think it's a common one, is treating discovery as something you do until you're confident, then stop. Confidence isn't the exit condition. The exit condition is that the cost of being wrong has gotten low enough that shipping and learning from real usage is cheaper than more research. Sometimes that's after two customer calls. Sometimes it's never, because you're still learning things after launch that should reopen discovery on a feature you thought was done.

Where this actually bit me was on the churn-rescue voice agent. We did what felt like thorough discovery — a dozen calls with support leads, a review of churn tickets, a rough script. Delivery started. Three weeks in, an engineer testing the barge-in logic asked a discovery question none of us had thought to ask: what does the agent do when the customer starts talking during the agent's own confirmation message, not during a question. Nobody had scoped that because we were thinking about turn-taking as "agent asks, customer answers," not as continuous audio either party can interrupt. That's a discovery gap that only delivery surfaced.

If I were measuring whether a team has actually internalized this, I wouldn't ask them to define discovery and delivery correctly — most PMs can recite the definitions now. I'd look at whether their discovery artifacts, interview notes, usability findings, whatever, have timestamps spread across the whole project, or whether they're all clustered in week one. Clustering in week one is the tell that discovery is being treated as a phase instead of a habit.

I still catch myself scheduling "a discovery sprint" like it's a calendar block you can finish. Old habits.
