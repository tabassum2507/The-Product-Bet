---
title: "The ways a voice agent fails that a chat agent never will"
date: 2026-08-21T19:16:00+05:30
tags: ["voice-ai", "ai-pm"]
description: "A bug that would've been a minor annoyance in a chat interface turned into a caller hanging up angry, purely because of the medium."
---

We had a bug where the churn-rescue agent occasionally repeated the last sentence of its previous turn before continuing, some race condition between the response cache and the TTS queue. In a chat interface, that's a visual glitch, a duplicated line of text a user might not even consciously register. On a phone call, it's the agent saying the same sentence twice in a row out loud, which reads as broken in a much more visceral, embarrassing way, and it was the single fastest route to a caller hanging up that we saw in the whole pilot.

That gap is the thing I underestimated moving from chat-based AI products to voice. A lot of failure modes that are cosmetic in text become experientially severe in audio, because audio only exists in time, there's no scrollback, no way to re-read, the caller experiences the glitch once, live, with no ability to check whether they misheard. A chat user can reread a garbled response and figure out what was meant. A caller can't rewind a sentence.

Some failures are unique to voice entirely, not just amplified. Crosstalk, both parties speaking at once, doesn't have a text equivalent, there's no such thing as two people typing into the same message simultaneously. Mishearing is its own category, distinct from misunderstanding, a chat agent can misinterpret a clearly-typed sentence, but a voice agent can additionally mishear a correctly-intended sentence due to noise or accent, and from the caller's side those two failures feel completely different, one is "it didn't get what I meant," the other is "it didn't even hear what I said," and callers get noticeably more frustrated by the second.

There's also a failure mode around pacing that chat doesn't have an analog for at all. A chat response that's too long just means more scrolling. A voice response that's too long means the caller has to hold the entire thing in working memory while listening, and if it's long enough, they lose the beginning before the agent reaches the end, then either ask it to repeat, which is its own friction, or just give up following along.

The tradeoff in dealing with this is that voice failure modes often require voice-specific fixes that don't transfer from your chat playbook, you can't just port over your chat agent's error handling and assume it covers the same ground, we tried that first and it left real gaps. What I track now that we didn't before is call-level abandonment tied to a specific failure category, garbled audio, mishearing, over-long response, rather than a single aggregate error rate, because those categories need genuinely different fixes and a blended number hides which one is actually driving hangups.
