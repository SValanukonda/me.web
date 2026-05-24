---
title: "Locking and Managing Concurrent Access"
date: 2026-05-23
tags: [Performance, System Design]
description: Learn why concurrent transactions create race conditions, and how pessimistic and optimistic locking help preserve consistency in multi-threaded systems.
---

## Why Concurrent Access Becomes a Problem

Imagine two separate transactions trying to send money to the same bank account at the same time.

In real systems, transaction processing is often multi-threaded or distributed across multiple workers. If two threads read the same account balance, apply different updates, and write back independently, the final result can become incorrect.

That is a classic **race condition**.

Without proper coordination, one update can overwrite the other, leading to inconsistent balances, duplicate processing, or broken business rules.

## A Simple Example

Suppose an account has a balance of `1000`.

- Transaction A adds `500`
- Transaction B adds `300`

If both transactions read `1000` before either write completes:

- Transaction A writes `1500`
- Transaction B writes `1300`

The correct final balance should be `1800`, but one update gets lost.

This is why concurrent access must be controlled.

## What Locking Solves

Locking is used to protect shared data when multiple operations may modify it at the same time.

The goal is simple:

- Preserve data consistency
- Prevent lost updates
- Ensure transactions do not interfere with each other in unsafe ways

Two common approaches are **pessimistic locking** and **optimistic locking**.

## 1. Pessimistic Locking

Pessimistic locking assumes conflicts are likely, so it blocks other writers while one transaction is working on the record.

In practical terms:

- One transaction acquires a lock on the account
- Other transactions targeting the same account must wait
- Once the first transaction finishes, the lock is released

### Why It Works

Because only one writer is allowed at a time, the system avoids simultaneous conflicting updates.

### Benefits

- Strong consistency
- Easier to reason about in high-conflict workflows
- Useful when correctness matters more than concurrency

### Tradeoffs

- Transactions may block each other
- Higher wait times under load
- Can reduce throughput when many requests target the same row or resource

## 2. Optimistic Locking

Optimistic locking assumes conflicts are less common, so transactions are allowed to proceed without blocking each other immediately.

Before committing, the system checks whether the underlying record changed during the transaction.

This is usually done with a **version number** or **timestamp**.

### How It Works

1. A transaction reads a record along with its version.
2. The transaction prepares its update.
3. Before writing, it checks whether the version is still the same.
4. If the version changed, another transaction updated the record first.
5. The current transaction must retry or fail safely.

### Why It Works

Instead of preventing conflicts up front, optimistic locking detects them at commit time.

### Benefits

- Better concurrency when conflicts are rare
- No blocking during the read/compute phase
- Often better for read-heavy systems

### Tradeoffs

- Transactions may need retries
- More application logic is required
- Poor fit when many users frequently update the same record

## Choosing Between the Two

The right choice depends on access patterns.

- **Pessimistic locking** fits systems where update conflicts are common and correctness must be enforced immediately.
- **Optimistic locking** fits systems where conflicts are rare and throughput matters more than preventing every possible wait.

There is no universal winner. The decision depends on contention level, latency requirements, and how expensive retries are in your workflow.

## Practical Takeaway

Managing concurrent access is a core part of building reliable software, especially in banking, inventory, booking, and distributed systems.

If multiple workers can touch the same data, you need a concurrency control strategy. Understanding when to use pessimistic locking versus optimistic locking helps you balance **consistency**, **performance**, and **scalability** in a defensible way.

