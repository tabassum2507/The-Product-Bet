---
title: "Writing acceptance criteria that don't just restate the story"
date: 2026-08-01T22:58:00+05:30
tags: ["product-management", "technical-pm"]
description: "Half my acceptance criteria used to just reword the user story, which meant they weren't testing anything at all."
---

An engineer once handed a story back to me with a note: "these acceptance criteria are just the story again, with bullet points." He was right, and it stung a little because I'd have said I understood the difference between a user story and acceptance criteria. The story was something like "as a support agent, I want to see a customer's subscription status on the ticket view, so I don't have to switch tabs." My acceptance criteria said "subscription status is visible on the ticket view" and "agent doesn't have to switch tabs to see it." Same sentence, chopped up. Not testable, not useful, not actually specifying anything an engineer or QA could act on differently than the story already did.

Acceptance criteria earn their keep by covering the edges the story glosses over, because a story is written from the ideal path and criteria are supposed to nail down what happens off that path. What does "subscription status" show for a customer with no active subscription. What if the status API times out. What if the agent has a ticket open for a customer whose subscription just changed mid-conversation, does the field update live or only on reload. None of that is in the story, all of it determines what actually gets built, and none of it gets decided if you're just rewording the happy path in bullet form.

I started using given-when-then more seriously after that, not because it's magic, but because the structure forces you to name a condition and an event before you name an outcome, which makes it much harder to just restate the story. "Given a customer with a lapsed subscription, when an agent opens their ticket, then the status field shows 'lapsed' with the lapse date, not a blank field." That sentence has actual content a story wouldn't have.

The tradeoff is that criteria written this carefully take real time, and there's a point of diminishing returns where you're specifying edge cases nobody will hit for years. I've overcorrected into this before, writing acceptance criteria for a churn-rescue call flow that covered scenarios so rare the engineering lead asked, not unkindly, whether I trusted him to make a reasonable default call on his own. Sometimes the right acceptance criterion is "handle unexpected states gracefully, flag to PM before shipping if ambiguous," and trusting the judgment of the person building it.

A decent gut check for whether criteria are doing real work: could two different engineers build meaningfully different things and both technically satisfy what's written. If yes, the criteria haven't actually specified anything, they've just decorated the story.
