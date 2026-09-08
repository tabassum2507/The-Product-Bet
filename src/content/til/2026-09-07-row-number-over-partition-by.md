---
title: "TIL: Window functions — ROW_NUMBER() OVER (PARTITION BY …) is the trick for 'latest record per user'"
date: 2026-09-07T22:15:00+05:30
tags: ["til", "sql"]
description: "ROW_NUMBER() OVER (PARTITION BY...) turned out to be the clean way to get the latest record per user."
---

I needed the most recent subscription status per customer out of a table where each status change gets its own row, and my first instinct was a subquery pulling MAX(updated_at) per customer, then joining back to get the rest of the row. It worked but felt clunky, two passes over the same data and a join just to get one row per customer.

An analyst pointed me at window functions instead, specifically ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY updated_at DESC), which numbers rows within each customer's group by recency without collapsing anything, so you can still see the full row, then filter to row number 1 in an outer query.

```sql
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (
    PARTITION BY customer_id ORDER BY updated_at DESC
  ) AS rn
  FROM subscription_events
) t
WHERE rn = 1;
```

One pass, no self-join, and it generalizes to any "latest N per group" question, not just latest one, just change the filter on rn. I'd been solving this exact shape of problem the hard way for months without knowing there was a purpose-built tool for it sitting in the same language I already use every week.
