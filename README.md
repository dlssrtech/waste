# Multi-Country Waste Collection Platform

This repository contains the product, UX flow, panel separation, and technical architecture design for an Uber-style waste collection marketplace. The platform is designed for an operations-first rollout in Ghana, with future expansion to Nigeria and Côte d'Ivoire.

## Recommended Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Frontend Web | Next.js, TypeScript, Tailwind CSS, shadcn/ui | Responsive web panels for admin, operations, collectors, customers, finance, and support |
| Backend | Node.js, NestJS or Express.js, TypeScript | REST/GraphQL APIs, job assignment logic, payments, SMS webhooks, notifications |
| Database | PostgreSQL + PostGIS | Relational marketplace data, country/currency support, geolocation queries |
| Cache / Queue | Redis + BullMQ | Auto-dispatch jobs, SMS processing, notifications, reporting jobs |
| File Storage | S3-compatible storage | Pickup proof photos, collector documents, sack product images |
| Maps | Google Maps, Mapbox, or OpenStreetMap | Live tracking, pickup locations, collector proximity |
| Payments | Paystack, Flutterwave, Hubtel, local MoMo integrations | Mobile money, card, bank transfer, wallet, and cash reconciliation |
| SMS | Africa's Talking, Hubtel, Twilio, or local aggregator | Feature-phone pickup requests and status alerts |

## Documentation

- [Product Flow & Separate Web Panels](docs/product-flow-and-panels.md)
- [Technical Architecture](docs/technical-architecture.md)
- [Database Design](docs/database-design.md)
- [API Design](docs/api-design.md)

## Phase 1 Scope

Phase 1 should be the Operations Dashboard, not the mobile app. The first release should let the business run daily collection operations manually while laying the foundation for automation.

Core Phase 1 modules:

- Admin login and role-based access
- Pickup request management
- Collector onboarding and approval
- Manual job assignment
- Photo proof verification
- Sack inventory and pricing management
- Payment monitoring
- Basic reporting dashboard
- Foundation for future auto-dispatch and live tracking
