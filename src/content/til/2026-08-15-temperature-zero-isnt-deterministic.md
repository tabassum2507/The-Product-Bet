---
title: "TIL: Temperature 0 doesn't mean deterministic — same prompt, same model, still got a different answer"
date: 2026-08-15T23:05:00+05:30
tags: ["til", "ai-pm"]
description: "I ran the identical prompt twice at temperature 0 and got two different answers, which shouldn't happen and does."
---

I was building an eval set and wanted a clean baseline, so I ran the same prompt against the same model twice at temperature 0, expecting identical output both times since temperature 0 is supposed to mean "always pick the most probable token." The two responses weren't identical. Close, same structure, but a couple of words different in a way that shifted the JSON output on one field.

I assumed I'd made a mistake somewhere until I read that temperature 0 collapses most of the randomness in token selection but doesn't fully guarantee determinism in practice, because of things like floating-point non-associativity across different hardware batches, or how requests get parallelized on the serving side. The math of "pick the highest probability token every time" is deterministic in theory. The actual infrastructure serving that math at scale isn't perfectly reproducible run to run.

This matters for eval work specifically, because if I'm treating a single run at temperature 0 as ground truth for "what the model does," I'm building on a slightly wobblier foundation than I assumed. Now I run anything going into an eval baseline three times, not once, and check for drift before trusting it as the reference answer.
