---
title: "Webhooks and WebSockets solve different problems, not the same one twice"
date: 2026-08-25T22:09:00+05:30
tags: ["technical-pm", "system-design"]
description: "I used the two terms almost interchangeably in a spec until an engineer asked which one I actually meant, and I realized I wasn't sure."
---

I wrote "we'll use webhooks or websockets to push the status update" in a spec once, treating the slash as if the two were roughly equivalent options, pick whichever's convenient. An engineer flagged it in review with a question that made the gap obvious: did I want the ERP to notify our system the moment a shift log closed, a single event, or did I want a persistent live connection streaming updates continuously. Those aren't the same requirement, and the two technologies aren't interchangeable answers to it.

A webhook is the simpler idea, one system, when something happens, makes an HTTP request to a URL you gave it, carrying the event data. It's push in the loosest sense, no ongoing connection, just a one-off notification fired at the moment of the event. Good fit for discrete things: an order was placed, a payment succeeded, a shift log was closed. The receiving side doesn't need to maintain any connection state, it just needs an endpoint that's up when the event happens, and some retry logic for when it isn't.

A WebSocket is a persistent, bidirectional connection that stays open, letting either side send messages at any time without the overhead of a new HTTP request each time. That's the right shape when you need continuous, frequent updates, not discrete events, live position tracking, a chat interface, or in a voice pipeline, streaming partial transcripts back as a caller is still speaking rather than waiting for them to finish. Using a webhook for that would mean firing a new HTTP request for every partial transcript chunk, which is both wasteful and adds latency exactly where you can't afford it.

The tradeoff isn't really about which is more powerful, WebSockets can technically do what webhooks do, it's about operational cost and complexity matching the actual shape of the problem. A persistent connection means both sides have to handle reconnection, keep-alives, and connection state, real infrastructure overhead that's pointless to carry for something that happens once a day, like a shift log closing. A webhook for something that needs sub-second continuous updates means either accepting real latency or firing an unreasonable volume of individual requests.

Where I'd apply this now: before specifying either in a doc, I ask whether the underlying thing is a discrete event or a continuous stream, and that answer picks the technology almost by itself, webhook for the former, WebSocket, or something like server-sent events for one-directional streaming, for the latter. I still catch myself defaulting to whichever term I heard most recently instead of asking that question first, which is exactly the habit that produced the sloppy spec line to begin with.
