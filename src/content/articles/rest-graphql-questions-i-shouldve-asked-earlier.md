---
title: "REST, GraphQL, and the questions I should've asked earlier"
date: 2026-08-24T20:03:00+05:30
tags: ["technical-pm", "interview-prep"]
description: "I nodded along to an API design debate for a year before admitting I didn't actually know what problem GraphQL was solving that REST wasn't."
---

For about a year I sat in API design discussions nodding at the word GraphQL like I had an opinion, mostly absorbing that it was "more flexible" than REST without being able to say flexible for what, specifically, or what it cost to get that flexibility. Eventually a candid engineer just asked me directly what I thought the tradeoff was, and I didn't have a real answer, just a vague sense that GraphQL was newer and REST was more standard.

REST organizes an API around resources, you hit an endpoint for a specific thing, a user, an order, and the server decides what fields come back in the response, generally the same shape every time regardless of what the client actually needed for that particular screen. That's simple and predictable and cacheable in ways that matter a lot at scale, but it means a mobile screen that only needs a user's name and avatar still gets the full user object back over the wire, or the client has to hit several endpoints and stitch the results together itself, both of which cost bandwidth and complexity somewhere.

GraphQL flips that, the client specifies exactly which fields it wants in a single query, and the server returns exactly that shape, nothing more. The appeal for a product with many different clients hitting the same backend, web, iOS, a partner integration, each wanting different slices of the same data, is real, you stop needing a proliferation of REST endpoints each tuned for one specific client's needs. What that flexibility costs is on the server side, mostly, a GraphQL server has to handle arbitrary query shapes, which makes caching harder, and makes it easier for a client to accidentally request something expensive, deeply nested data that triggers a cascade of database queries, in a way a fixed REST endpoint structurally can't.

Where this became a real product question, not just an academic one, was scoping an integration for the manufacturing ERP with a partner's inventory system. REST would have meant either over-fetching data the partner didn't need or building several narrow endpoints just for them. GraphQL would have meant less endpoint sprawl but real engineering investment in query complexity limits, because an uncontrolled GraphQL surface handed to an external partner is a legitimate way to get an accidental denial-of-service from a client that isn't even trying to cause one, just wrote an expensive query.

I don't think I need to be able to implement either from scratch, but I do think I owe it to a room like that one to know the actual axis of the tradeoff, fetch flexibility and endpoint sprawl on one side, server complexity and query cost control on the other, rather than having a preference with no reasoning under it.
