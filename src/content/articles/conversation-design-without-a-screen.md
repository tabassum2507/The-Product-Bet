---
title: "Conversation design is interaction design without a screen"
date: 2026-08-23T21:41:00+05:30
tags: ["voice-ai", "product-management"]
description: "I kept writing voice agent scripts the way I'd write UI copy, and it took a genuinely bad call transcript to see why that doesn't work."
---

The first script I wrote for the churn-rescue agent read fine on the page. Clear sentences, logical structure, options clearly laid out: "you can say cancel, pause my subscription, or talk to a person." I'd written it the way I'd write button labels on a screen, and it fell apart the moment real callers, not the calm testers on my team, started talking to it, because nobody on a phone call remembers three options presented in a row and picks cleanly between them the way they'd tap a button.

Conversation design isn't writing dialogue, it's interaction design where the interface is entirely temporal and entirely reliant on memory, and that changes almost everything about how you structure choices. On a screen, all options are visible at once, a user can scan and compare before deciding. In a voice conversation, options arrive one at a time and vanish from the interface the instant they're spoken, so the caller is holding them in working memory while trying to decide, and human working memory for a list of unfamiliar spoken options is genuinely limited, closer to two or three items before people start losing track, not the five or six that read fine in a document.

The other thing screens give you for free that voice doesn't is state visibility. A form shows you what's filled in and what's left. A voice conversation has no persistent display of where you are in a flow, so if a caller loses track, the agent has to actively reorient them, "so to confirm, you'd like to pause rather than cancel," or the caller just gets lost and asks to repeat everything from the start, which is exactly what started happening with our three-option script until we cut it down to binary choices at each step and confirmed state out loud after every turn.

There's a real tradeoff in how much confirmation to build in. Confirm too little and callers lose track and get frustrated or make mistakes. Confirm too much and every interaction feels padded with the agent restating things back that the caller already knows they said, which reads as slow and a little patronizing over a whole call. We erred toward too much confirmation after the lost-in-the-flow problem, and pilot feedback swung the other way, callers describing the agent as repetitive. The right amount turned out to be confirming only at genuine decision points, not after every single utterance.

I measure this less by reading transcripts start to finish, which is slow and biases toward the calls I happen to sample, and more by looking at where in a flow callers most often ask for a repeat or say something like "wait, what," because that's a fairly direct signal of exactly where the conversation design lost someone, turn by turn, not just in aggregate.
