---
title: "Personas vs jobs to be done, and which one I actually use"
date: 2026-07-31T21:20:00+05:30
tags: ["product-management", "interview-prep"]
description: "Personas gave me a fictional user with a name and a stock photo, jobs to be done gave me a reason that user showed up at all."
---

The first persona deck I ever inherited had a name, "Priya, 34, Operations Manager," a stock photo, and a bulleted list of her goals and frustrations. I used it for exactly one meeting before realizing I had no idea what decision it was supposed to help me make. It described a person. It didn't describe why that person would open our product instead of doing nothing, or doing it in Excel, or asking someone else to handle it.

Jobs to be done fixed that for me, mostly because it asks a narrower and more useful question: what is someone trying to get done, and what did they hire, or fire, to do it. Not who are they demographically, but what progress are they trying to make. A JTBD statement for the same ops manager might be something like "when a shift changes and I don't have visibility into what the outgoing team actually finished, I want a quick way to confirm status without calling the floor, so I can hand off with confidence." That's a job. It's specific enough to design against. Priya-with-a-stock-photo wasn't.

I don't think personas are useless, to be clear, and I'd push back on anyone who says to throw them out entirely. They're good for keeping a team emotionally anchored to a real kind of person instead of an abstract "the user," especially in a big org where forty people are building different corners of a product and need a shared mental shorthand. What personas are bad at is telling you what to build next, because two people who fit the same persona can be hiring your product for completely different jobs, and one persona can be doing five different jobs depending on the day.

Where I got burned mixing these up was on the RAG health assistant. We had a persona, "the anxious new parent," and every feature discussion started from what that persona would want. But "anxious new parent googling a symptom at 2am" and "anxious new parent trying to remember what the pediatrician actually said last visit" are completely different jobs, needing completely different product behavior — one wants reassurance and triage, the other wants retrieval and memory. We kept designing for the persona and arguing about which job we meant, without realizing that was the actual disagreement.

If someone asked me to measure whether we're using JTBD well instead of just personas with extra steps, I'd look at whether our feature prioritization docs reference a job statement with a trigger condition and a desired outcome, or whether they just reference "what Priya wants." The trigger condition is the part that's easy to skip and the part that actually makes the framework work — a job without a trigger is just a preference.
