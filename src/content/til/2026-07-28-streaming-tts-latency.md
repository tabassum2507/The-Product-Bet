---
title: "Streaming TTS hides latency if you flush audio early"
date: 2026-07-28
tags: ["voice-ai"]
description: "Perceived latency in voice agents drops a lot when you start playback on the first audio chunk instead of waiting for the full synthesis."
---

Today I learned that most of the perceived latency in a voice agent isn't the total time-to-generate — it's the time until the *first* audio chunk reaches the speaker.

If you wait for the full TTS response before playback, users feel every millisecond of generation time. If you flush and start playing as soon as the first ~200ms chunk is ready, the perceived latency drops dramatically even though total generation time is unchanged.

Practical takeaway: check whether your TTS provider supports chunked/streaming output, and make sure your playback pipeline starts on the first chunk rather than buffering the whole response.
