---
title: "The gap between STT and TTS is where voice products actually live"
date: 2026-08-17T19:59:00+05:30
tags: ["voice-ai", "ai-pm"]
description: "I used to think of speech-to-text and text-to-speech as bookends around the real work, until I realized the gap between them is the real work."
---

When I started on the voice hiring product, I thought of the pipeline as three boxes: speech-to-text converts what the candidate says into text, the model figures out what to do with it, text-to-speech converts the response back into audio. Two of those boxes felt like solved problems I could treat as commodities, and one box, the model logic, felt like where all the actual product decisions lived. That's roughly backwards, or at least it undersells how much product risk sits inside STT and TTS themselves.

Speech-to-text isn't a clean transcript generator, it's a probabilistic process that gets worse in exactly the conditions your actual users are calling from, background noise on a factory floor, an accent the model wasn't tuned for, a candidate saying a technical term the STT vendor's vocabulary doesn't recognize well. I watched our hiring product's candidate names get mangled often enough, across a range of Indian names the STT model just hadn't seen much of in training, that we ended up building a whole confirmation step just to re-ask and verify names, adding a turn to every single call because the input layer wasn't reliable enough to trust silently.

Text-to-speech carries its own product weight, because voice carries information text never has to. A TTS voice with the wrong pacing on a rejection message reads as either cold or falsely upbeat depending on tiny prosody choices nobody explicitly decided, they were just whatever the default voice model did with that sentence. We had candidates describe an automated rejection call as "rude" for reasons that had nothing to do with the words in the script, purely the flat, slightly-too-fast delivery of the TTS voice we'd defaulted to.

The tradeoff that sits underneath both is accuracy versus latency, and it's sharper here than almost anywhere else in an AI product, because a voice conversation has a real-time expectation text chat doesn't. A more accurate STT model that takes an extra second to finalize a transcript can make the whole conversation feel laggy in a way users notice immediately, even if they couldn't say why. You end up trading transcript accuracy for responsiveness in ways that are invisible in a demo and very visible on a live call with a real, impatient candidate.

What I measure now, instead of trusting that STT and TTS are solved infrastructure, is word error rate specifically on the vocabulary and accents our actual users have, not a vendor's general benchmark, and on the output side, whether users rate agent turns as natural in blind listening tests, not just whether the words were technically correct. Both numbers have surprised me, and neither would show up if I only looked at what the model logic in the middle was doing.
