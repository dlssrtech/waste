# Waste Collection Marketplace Platform

A multi-country, Uber-style waste collection operations platform designed for Ghana first, with expansion paths for Nigeria and Côte d'Ivoire. The product is structured around an operations-first web dashboard, a future single-role-based Flutter mobile app, SMS booking, sack-based pricing, and independent collector dispatch.

## Recommended Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Frontend web | Next.js, TypeScript, Tailwind CSS, shadcn/ui | Responsive admin and partner dashboards |
| Backend | Node.js, NestJS or Express, TypeScript | APIs, dispatch logic, payments, SMS webhooks |
| Database | PostgreSQL + PostGIS | Multi-country data, geolocation, reporting |
| Cache and queues | Redis + BullMQ | SMS processing, notifications, assignment jobs |
| File storage | S3-compatible object storage | Pickup proof photos and collector documents |
| Realtime | Socket.IO or WebSockets | Live job and collector updates |
| Payments | Paystack, Flutterwave, local MoMo providers | Mobile money, cards, transfers, wallet flows |
| SMS | Africa's Talking, Hubtel, Twilio, local aggregators | Feature-phone booking and notifications |

## Documentation

- [Product flow design](docs/product-flow-design.md)
- [Separate web panels](docs/web-panels.md)
- [Technical architecture and database design](docs/technical-architecture.md)

## Phase 1 Scope

Phase 1 should be sold and built as **Operations Dashboard**, not only a recycling dashboard. It includes pickup request management, collector onboarding, manual assignment, sack inventory and pricing, photo proof verification, payment monitoring, reporting basics, and the foundation for auto-dispatch.

## Working Web Prototype

This repository now includes a runnable Node.js web prototype that verifies every operations panel route works without external package installation. Start it with `npm start`, then open `http://localhost:3000`.

Available panels:

- `/super-admin`
- `/country-admin`
- `/dispatcher`
- `/collector-management`
- `/pickup-management`
- `/sack-inventory`
- `/payments-wallets`
- `/special-pickups`
- `/photo-proof`
- `/reports-analytics`
- `/customer-support`

Use `npm test` to check that all panel routes and required frontend assets return HTTP 200.
