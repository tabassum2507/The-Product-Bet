---
title: "TIL: HAVING runs after GROUP BY, which is why WHERE kept failing me"
date: 2026-09-05T21:55:00+05:30
tags: ["til", "sql"]
description: "WHERE kept erroring on my aggregate filter until I remembered it runs before GROUP BY, not after."
---

I wrote a query to find agents handling more than fifty calls this month, something like WHERE COUNT(*) > 50 tacked onto the end after a GROUP BY agent_id, and it just errored, aggregate function not allowed in WHERE clause. I've hit this before and still forget it every few months, which is a little embarrassing to admit.

WHERE filters rows before any grouping happens, so it has no concept of COUNT(*) yet, because the count doesn't exist until the grouping step has already collapsed rows together. HAVING filters after grouping, on the aggregated result, which is the only point where a "more than fifty" comparison against a count actually makes sense.

```sql
SELECT agent_id, COUNT(*) AS calls
FROM call_logs
GROUP BY agent_id
HAVING COUNT(*) > 50;
```

Swapping WHERE for HAVING fixed it in about ten seconds once I remembered the rule. The part that keeps tripping me up isn't the concept, I can explain it fine when asked, it's that the muscle memory of typing WHERE for any filter is faster than my brain checking whether the filter needs the grouped result first.
