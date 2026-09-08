---
title: "TIL: A token isn't a word, and the ~4 character rule gets a lot worse for Hindi and Bengali"
date: 2026-08-09T21:45:00+05:30
tags: ["til", "ai-pm"]
description: "A token is roughly 4 characters in English, and the ratio gets meaningfully worse for Hindi and Bengali."
---

I was sizing a cost estimate for a feature that would process customer messages, some in English, a good chunk in Hindi and Bengali since a lot of our support volume comes through those, and used the rough "a token is about four characters" rule I'd read somewhere to estimate monthly spend. The number came in low. Real usage came in almost twice as high.

Turns out that four-characters-per-token estimate is an English-specific rule of thumb, because most tokenizers are trained on corpora that skew heavily English, so English text tokenizes efficiently and non-Latin scripts don't. A Hindi or Bengali sentence with the same number of characters, sometimes even the same number of words, can use noticeably more tokens, because the tokenizer ends up splitting Devanagari or Bengali script into smaller sub-word pieces than it needs for English. I hadn't thought about tokenization as something that varies by language until the actual bill showed it.

Practical fix was boring: don't use a single blended token-per-character estimate across a multilingual user base, sample actual message volume by language and get a real ratio per language before sizing cost. Four characters per token is a starting point for English copy, not a constant.
