---
title: "TIL: Webhooks can arrive out of order and more than once — idempotency keys are the fix"
date: 2026-08-29T22:40:00+05:30
tags: ["til", "technical-pm"]
description: "Webhooks can arrive twice or out of order, and idempotency keys are the actual fix, not retries."
---

An engineer showed me a bug ticket where a customer got charged twice for the same order, and the cause wasn't a billing error, it was our webhook handler processing the same "payment succeeded" event twice because the payment provider had retried delivery after a slow response from our side, assuming the first attempt had failed. It hadn't failed, it had just been slow, and we had no way to tell "this is a retry of something we already handled" from "this is a new event."

I'd assumed webhooks were basically reliable, fire once, arrive once, in order. None of that is guaranteed. Providers retry on timeout or non-200 responses, which means your endpoint has to assume the same event might show up more than once. And nothing guarantees delivery order either, a later event can arrive before an earlier one if there's any retry involved anywhere in the chain.

The fix was an idempotency key, a unique identifier the provider includes on the event, that we check against events we've already processed before acting on anything, and store as processed the moment we handle one. Simple, small code change. The lesson is more about the assumption than the fix: any system receiving webhooks needs to treat every incoming event as possibly a duplicate, not occasionally one.
