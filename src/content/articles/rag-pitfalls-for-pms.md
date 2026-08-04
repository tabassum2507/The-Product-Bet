---
title: "RAG Pitfalls Every PM Should Know Before Shipping"
date: 2026-07-15
tags: ["rag", "ai-product-management"]
description: "Retrieval-augmented generation looks simple in a demo and falls apart in production. Here's what product managers consistently get wrong before launch."
---

Retrieval-augmented generation (RAG) has become the default architecture for grounding LLM answers in your own data. It's also become the default place where product teams get burned, because the failure modes don't show up in a demo — they show up three weeks after launch when support tickets start piling up.

## Chunking is a product decision, not an engineering detail

How you split documents into chunks determines what the model can and can't answer. A PM who treats chunking as "an implementation detail the engineers will figure out" ends up shipping a product that confidently answers questions with half the relevant context missing. Sit in on the chunking strategy conversation. Ask to see failure examples where the answer was wrong because the right chunk wasn't retrieved.

## Retrieval quality, not model quality, is usually the bottleneck

Teams spend weeks tuning prompts and swapping models when the actual problem is that the retriever surfaces the wrong documents. Before escalating to "we need a better model," ask: what's our retrieval precision at k=5? If nobody can answer that, that's the real gap.

## Freshness and staleness need an owner

RAG systems quietly go stale. Someone updates the source-of-truth doc, and the embedding index doesn't know until the next re-index job runs — which might be never, if nobody owns it. Define an explicit re-indexing cadence and put it on someone's calendar, not just in a runbook nobody reads.

## Citations are a trust feature, not a nice-to-have

Users don't trust an answer they can't verify. Surfacing the source chunk (with a link back to the original document) does more for perceived reliability than almost any amount of prompt tuning. If your roadmap has citations as a "phase 2" item, reconsider — it's often the highest-leverage trust feature you can ship.

## The eval set is the actual product spec

Without a curated set of representative queries and expected answers, you have no way to know if a change made things better or worse. Build this before you ship, not after the first regression report comes in.
