---
title: "Cache embeddings by content hash, not document ID"
date: 2026-07-30
tags: ["rag"]
description: "Keying an embedding cache by document ID instead of content hash silently serves stale vectors after edits."
---

Today I learned why our embedding cache kept serving stale results after documents were edited: it was keyed by document ID, not by a hash of the document's content.

When the document changed but the ID stayed the same, the cache happily returned the old embedding forever, since nothing invalidated it.

Fix: key the cache by a hash (e.g. SHA-256) of the chunk's text content. If the content changes, the hash changes, and you get a cache miss followed by a fresh embedding — no manual invalidation logic required.
