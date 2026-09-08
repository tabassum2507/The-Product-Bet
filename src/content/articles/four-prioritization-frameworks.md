---
title: "Four prioritization frameworks, and when I'd actually reach for each"
date: 2026-08-03T19:32:00+05:30
tags: ["product-management", "interview-prep"]
description: "RICE, ICE, Kano, and MoSCoW all claim to tell you what to build next, and they disagree with each other more than people admit."
---

I got asked in an interview to walk through RICE scoring for a hypothetical feature, and halfway through I realized I was making up the numbers to get an answer that felt right, rather than the scoring producing the answer. Reach, impact, confidence, effort — I could justify almost any number in each column depending on how I wanted the feature to rank. That's not a flaw unique to RICE, it's a flaw in treating any prioritization framework as more objective than the inputs going into it.

A few of these, roughly:

- RICE scores reach, impact, confidence and effort, then divides to get a ranking. Good when you have real numbers for at least reach and effort, bad when confidence is a guess dressed up as a percentage.
- ICE is RICE's simpler cousin, impact, confidence, ease, useful for fast gut-check prioritization in a small team, worse for anything you need to defend to a skeptical stakeholder because it's even more guessable.
- Kano sorts features into basic, performance, and delight categories based on how satisfaction responds to investment. It's the one I find most honest, because it forces you to admit some features, the basic expectations, don't earn you anything by having them, only lose you something by lacking them.
- MoSCoW, must, should, could, won't, is less a scoring method than a communication tool for a specific release, and it's the one I actually use most often, not because it's rigorous but because it's fast to align a room around.

The failure mode with all four is the same one from that interview: the framework doesn't remove judgment, it just moves the judgment into inputs that look more objective than they are. A RICE score with fabricated confidence numbers is worse than no framework at all, because it launders a gut call into something that looks quantitative and therefore harder to argue with. I've watched a stakeholder win a prioritization debate purely by having slightly more confident-sounding numbers, not a better argument.

What I try to do differently now is separate the framework choice from the honesty question. Before scoring anything, I ask where the real uncertainty is, usually it's reach or impact, rarely effort, because engineering can estimate effort better than anyone can estimate how many people will actually use something. If reach is the shakiest number, I say so out loud before scoring, and I treat the resulting ranking as directional, not a ranked list to defend line by line.

I don't have a clean answer for how to measure whether a framework is being used well versus being used to rationalize a decision someone already made. The closest I've got is watching whether the scores ever change someone's mind. If a team runs RICE on ten features and the ranking always confirms what the loudest person in the room already wanted, the framework isn't doing anything.
