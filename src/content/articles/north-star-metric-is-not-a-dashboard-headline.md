---
title: "A North Star metric is not a dashboard with a headline number"
date: 2026-09-03T22:48:00+05:30
tags: ["analytics", "product-management"]
description: "We picked a North Star metric in an afternoon and it took a full quarter of confusing tradeoffs to notice we'd picked one that didn't actually guide anything."
---

We picked "weekly active users" as the North Star metric for a product in an afternoon meeting, mostly because it was already on the dashboard and nobody objected. Three months later, two teams were making opposite decisions and both could point to that same number as justification, one team pushed a notification feature that goosed weekly actives by getting people to open the app more often without doing anything meaningful once inside, another team argued against it because deeper usage per session was flat or declining. The metric hadn't given us a shared direction, it had given us a shared number that both sides could recruit to support whatever they already wanted to do.

A North Star metric is supposed to be the single measure that best captures the value your product delivers to customers, chosen specifically because moving it in the right direction should mean the business is actually getting healthier, not just busier. Weekly active users fails that test for a lot of products because it's satisfiable by behavior that isn't value, a notification that nags someone into opening the app counts identically to someone genuinely getting something done inside it, and a metric that can't distinguish those two isn't pointing anyone anywhere useful, it's just measuring activity.

The correction we eventually made was picking a metric closer to the actual value exchange, something like completed resolutions per active customer for the churn-rescue product, a number that's much harder to inflate by manufacturing engagement, because a resolution being completed is closer to the actual outcome customers and the business both care about, not a proxy for attention.

Where I think teams go wrong, and where we went wrong, is optimizing for a metric that's easy to measure and already exists on a dashboard, over one that actually reflects value but requires new instrumentation to track. Weekly active users was one query away. Completed resolutions required tagging what counted as a resolution in the first place, a real product definition question nobody wanted to slow down and answer in that first meeting, so we took the easy number instead and paid for it later in confused strategy debates.

The tradeoff with a well-chosen North Star metric is that it inevitably simplifies a genuinely multidimensional business into one number, and any single number can be gamed or can miss something real if leaned on too hard without supporting metrics around it. That's not an argument against having one, it's an argument for treating it as a compass, not the entire map, and pairing it with a small set of guardrail metrics specifically chosen to catch the ways the North Star could be improved for the wrong reasons, the way our notification feature improved weekly actives for reasons that had nothing to do with customers getting more value.

I don't think there's a way to pick a good North Star metric in an afternoon. Ours took a quarter of watching the wrong one fail to actually guide anything before we were willing to spend the time getting a better one right.
