---
title: "TIL: Sub-500ms end-to-end is the number people quote for voice, and most of it isn't the LLM"
date: 2026-08-22T21:20:00+05:30
tags: ["til", "voice-ai"]
description: "Everyone quotes sub-500ms for voice agents, and most of that budget is STT and TTS, not the model."
---

Someone on a panel I watched said "you need sub-500ms end-to-end for a voice agent to feel natural," stated like a settled number, and I nodded along the way I do with numbers that sound authoritative. Later I actually broke down where our own 500ms-ish budget on the churn-rescue agent was going, and the LLM call was the smallest piece of it, not the biggest, which wasn't what I expected walking in.

Rough breakdown for a single turn: end-of-speech detection eating a chunk of it just deciding the caller is actually done talking, speech-to-text finalizing a transcript, the model generating a response, text-to-speech synthesizing audio, and the audio actually reaching the caller. The LLM step, the part everyone assumes is the bottleneck because it's the "AI" part, was maybe a fifth of the total budget once we measured instead of assumed.

That number, sub-500ms, is a useful target to hold a team to, but it's not a spec for the model, it's a spec for the whole pipeline, and most of the room to optimize is in speech detection and synthesis, not in swapping to a faster LLM. I'd been mentally allocating almost all our latency worry to the model. Wrong place to be looking.
