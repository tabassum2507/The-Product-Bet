---
title: "Strict JSON schemas cut function-calling errors more than prompt tweaks"
date: 2026-08-02
tags: ["agentic-workflows"]
description: "Tightening a tool's JSON schema (enums, required fields, no free-form strings) reduced malformed function calls more than any prompt change did."
---

Today I learned that tightening a tool's JSON schema does more to reduce malformed function calls than any amount of prompt engineering.

Swapping a free-form `status: string` field for `status: enum["pending", "done", "failed"]`, and marking previously-optional fields as required, cut malformed tool calls noticeably in our test set — with zero prompt changes.

Before:

```json
{
  "name": "update_ticket",
  "parameters": {
    "type": "object",
    "properties": {
      "status": { "type": "string" }
    }
  }
}
```

After:

```json
{
  "name": "update_ticket",
  "parameters": {
    "type": "object",
    "properties": {
      "status": { "type": "string", "enum": ["pending", "done", "failed"] }
    },
    "required": ["status"]
  }
}
```

Takeaway: before writing another paragraph of prompt instructions telling the model how to format a tool call, check whether the schema itself is loose enough to allow the malformed output in the first place.
