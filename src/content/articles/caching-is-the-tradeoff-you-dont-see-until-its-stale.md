---
title: "Caching is the tradeoff you don't see until it's stale"
date: 2026-08-28T20:46:00+05:30
tags: ["technical-pm", "system-design"]
description: "A support ticket about a customer seeing their own cancelled plan as active taught me more about caching than any diagram had."
---

A customer emailed support furious that our app still showed their subscription as active a full day after they'd cancelled it, and the first instinct in the thread was to assume a billing bug. It wasn't a bug exactly, it was a Redis cache with a twenty-four hour expiry on subscription status that nobody had thought hard about when it was set up, because at the time the only thing anyone was optimizing for was reducing load on the billing database, and staleness was an afterthought nobody attached a number to.

Caching is storing a copy of data somewhere faster to access than its original source, so repeated reads don't have to hit a slower database or a slower external API every time. It's one of the more purely beneficial-sounding ideas in system design, faster and cheaper, until you internalize that every cache is implicitly a bet about how tolerable staleness is for that specific piece of data, and that bet is usually made by an engineer optimizing for load, not by anyone thinking about what the user experiences when the bet is wrong.

A CDN caches static assets, images, scripts, close to the user geographically, which is close to a free win, because that content genuinely doesn't change often and staleness there is rarely visible or costly. Caching subscription status is a completely different kind of bet, because the cost of staleness isn't invisible, it's a customer seeing incorrect information about something they specifically just changed and care about in that exact moment. The twenty-four hour expiry wasn't wrong as a general policy, most of the time nobody's watching that field closely enough to notice a delay. It was wrong for the specific moment right after a customer takes the action the cached field describes, which is exactly when they're most likely to check it.

The fix wasn't ditching caching, that would have just reintroduced the load problem it existed to solve. It was cache invalidation, actively clearing or updating the cached value the moment the underlying data changes, rather than passively waiting for a fixed expiry window to elapse. That's more engineering work than a flat expiry, because now every code path that changes subscription status has to remember to also invalidate the cache, and missing even one of those paths silently reintroduces the exact bug we were fixing.

What I ask now before a cache expiry gets set, rather than after a support ticket surfaces the consequence, is what the cost of staleness actually is for this specific data, and whether that cost is symmetric or whether it spikes right after specific user actions, the way subscription status does right after a cancellation. Generic advice like "cache for performance" doesn't tell you any of that, only asking about the specific field does.
