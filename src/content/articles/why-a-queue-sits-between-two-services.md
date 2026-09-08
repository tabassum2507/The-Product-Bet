---
title: "Why a queue sits between two services that could just call each other"
date: 2026-08-27T21:33:00+05:30
tags: ["technical-pm", "system-design"]
description: "An engineer wanted to add Kafka to a flow that seemed simple enough to me that I asked why we needed it at all, and the answer was worth understanding."
---

I asked, in what I hoped sounded like a reasonable question and probably sounded a little naive, why the order-confirmation flow needed a message queue at all when service A could just call service B directly over an API, the way half our other internal services already did. The engineer's answer was patient, and it's stuck with me since, because the reasoning applies well beyond that one flow.

A direct call between two services is synchronous and tightly coupled, service A is blocked waiting on service B's response, and if service B is slow or down, service A either hangs or fails, even if service A's own job was actually done the moment it decided to hand off work. A queue, something like Kafka or a simpler message broker, decouples that. Service A drops a message and moves on immediately. Service B picks it up whenever it's ready, at its own pace, and if service B is down for ten minutes, the message just waits in the queue instead of the whole transaction failing.

That decoupling buys you a few things at once, and I'd been thinking of it as basically one thing, "more scalable," which was too vague to be useful. It buys resilience, a downstream outage doesn't cascade backward into the system that triggered the event. It buys load smoothing, if a burst of ten thousand orders lands at once, the queue absorbs the spike and lets the downstream service process at a steady rate instead of getting hit with the full burst synchronously. And it buys you the ability to add new downstream consumers later, a new service can start listening to the same event stream without service A needing to know or care that it now has two consumers instead of one, which a direct point-to-point call structurally can't offer without service A being modified.

The tradeoff, and this is the part I hadn't weighed before asking the question, is that queues trade immediate consistency for eventual consistency, and that's a real product cost, not just an engineering one. If a customer places an order and the confirmation email is sent via a queued event, there's now a window, usually small, sometimes not, where the order exists but the confirmation hasn't gone out yet. For some flows that's completely fine. For a flow where a user needs to see immediate confirmation to feel confident the action worked, that lag is a genuine UX regression you have to design around, not just an infrastructure detail to wave away.

What I ask now before an engineer proposes a queue, or before I push back on one, is whether the two steps genuinely need to happen in strict lockstep from the user's perspective, or whether a short, invisible delay is actually fine. That question, more than any technology name, is the one that tells you whether decoupling is the right call.
