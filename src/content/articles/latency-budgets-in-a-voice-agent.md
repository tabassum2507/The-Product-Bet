---
title: "Latency budgets in a voice agent, second by second"
date: 2026-08-18T21:14:00+05:30
tags: ["voice-ai", "technical-pm"]
description: "I kept saying our agent felt slow without being able to say where the time was actually going, which is a useless thing to tell an engineer."
---

For a while my feedback on the churn-rescue agent's feel was just "it feels slow," said in a review, which is roughly as useful to an engineer as an unhelpful comment on a pull request, technically true and not actionable. What changed things was sitting down and actually breaking a single turn into its component latencies instead of experiencing the whole thing as one undifferentiated pause.

A single conversational turn in a voice agent isn't one latency number, it's a chain: time to detect the caller has stopped speaking, time for speech-to-text to finalize a transcript, time for the model to generate a response, time for text-to-speech to synthesize audio, time for that audio to actually reach the caller's ear. Each of those has its own budget, and they add up serially unless you're specifically engineering for overlap, which most naive implementations aren't doing by default.

Once I actually measured ours, the surprise wasn't the model generation step, which is the one everyone assumes is the bottleneck because it's the "AI" part. It was end-of-speech detection, the system waiting a fixed pause after the caller stops talking before deciding they're actually done, not just breathing. We had it set conservatively high to avoid cutting people off mid-sentence, and that one setting alone was contributing more perceived latency than the model call. Tightening it helped responsiveness and immediately created a new problem, more frequent interruptions of callers who paused mid-thought, which is its own kind of bad experience. That's the actual tradeoff in this layer, and it's not a tradeoff you can engineer away, only tune, because being fast and being correct about turn-taking pull against each other.

The fix that helped most wasn't shaving any single number further, it was overlapping stages instead of treating them as strictly sequential, starting TTS synthesis on the first sentence of a response while the model is still generating the rest, the same streaming idea that applies to first-token latency in chat, just carried one layer further into audio. That single architectural change did more for perceived responsiveness than any individual component optimization, because the caller experiences the sum of all these delays as one number regardless of where in the chain the time actually went.

What I track now is time-to-first-audio-chunk as the headline number, not total response time, because that's the number that actually maps to how a human perceives responsiveness on a call. And I keep a breakdown by stage next to it, because "it feels slow" stopped being feedback I could act on the moment I could instead say which specific hundred milliseconds we were spending where.
