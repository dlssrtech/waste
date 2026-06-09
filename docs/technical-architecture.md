# Technical Architecture and Database Design

## 1. High-Level Architecture

```text
Next.js Web Panels
        |
        | HTTPS + WebSocket
        v
Node.js API Backend
        |
        |----------------------------------|
        v                                  v
PostgreSQL + PostGIS                  Redis + BullMQ
        |                                  |
        |                                  v
        |                           Background Jobs
        |
        |----------------------------------|
        v                                  v
Object Storage                     External Providers
Proof photos, documents            Payments, SMS, maps, email
```

## 2. Backend Services

A modular Node.js backend should be used. NestJS is recommended for a structured enterprise backend, although Express can also work for a leaner first version.

### Recommended Modules

- Auth and role-based access control.
- Countries and service zones.
- Customers.
- Collectors.
- Pickup requests.
- Assignment and dispatch.
- Sack inventory and pricing.
- Payments and wallet ledger.
- SMS booking.
- Photo proof uploads.
- Reports and analytics.
- Notifications.
- Audit logs.

## 3. Database Choice

Use PostgreSQL with PostGIS. PostgreSQL is reliable for transactional operations, and PostGIS supports location queries for nearest collector matching, service zones, and live tracking.

Use Prisma ORM or TypeORM for database access. Prisma is recommended if the team wants fast development, readable schema definitions, and good TypeScript support.

## 4. Core Database Tables

### countries

Stores country-level configuration.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| name | text | Ghana, Nigeria, Côte d'Ivoire |
| iso_code | text | GH, NG, CI |
| currency_code | text | GHS, NGN, XOF |
| timezone | text | Country timezone |
| active | boolean | Controls rollout |

### users

Stores login identities for admins, customers, and collectors.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| country_id | uuid | Nullable for global admins |
| phone | text | Unique per country |
| email | text | Optional |
| password_hash | text | Nullable for OTP-only users |
| role | enum | super_admin, country_admin, dispatcher, finance, support, inventory, customer, collector |
| status | enum | active, pending, suspended, deleted |

### collectors

Stores independent collector operational profiles.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | Related user |
| approval_status | enum | pending, approved, rejected, suspended |
| vehicle_type | text | Truck, tricycle, motorbike, van |
| service_zone_id | uuid | Main zone |
| current_location | geography(point) | PostGIS location |
| online_status | enum | online, offline, busy |
| rating | numeric | Average rating |
| completed_pickups | integer | Performance counter |

### customers

Stores customer profiles.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | Related user |
| default_address_id | uuid | Optional |
| wallet_balance | numeric | Customer wallet |
| sms_enabled | boolean | Allows SMS booking |

### pickup_requests

Stores normal and special pickup jobs.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| country_id | uuid | Country scope |
| customer_id | uuid | Request owner |
| service_zone_id | uuid | Dispatch area |
| pickup_type | enum | normal, special |
| status | enum | draft, pending_assignment, assigned, accepted, en_route, arrived, completed, cancelled, disputed |
| address_text | text | Human-readable address |
| location | geography(point) | Pickup coordinates |
| schedule_window | enum | morning, afternoon, evening |
| requested_sack_count | integer | Expected official sacks |
| actual_sack_count | integer | Confirmed by collector |
| estimated_price | numeric | Price before completion |
| final_price | numeric | Final charged price |
| payment_status | enum | unpaid, pending, paid, failed, refunded, partially_paid, cash_pending_verification |

### pickup_sacks

Stores sack quantities by type for each pickup.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| pickup_request_id | uuid | Related pickup |
| sack_type_id | uuid | Small, medium, large |
| requested_quantity | integer | Customer request |
| collected_quantity | integer | Collector confirmation |

### sack_types

Stores official sack products and pricing rules.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| country_id | uuid | Country scope |
| name | text | Small, medium, large |
| sku | text | Internal stock code |
| customer_sale_price | numeric | Sack purchase price |
| pickup_fee | numeric | Collection fee per sack |
| active | boolean | Available for use |

### assignments

Stores assignment history and override logic.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| pickup_request_id | uuid | Related pickup |
| collector_id | uuid | Assigned collector |
| assigned_by_user_id | uuid | Admin or system user |
| assignment_type | enum | manual, automatic, override |
| status | enum | offered, accepted, rejected, expired, cancelled |
| assigned_at | timestamp | Assignment timestamp |

### proof_photos

Stores pickup completion proof.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| pickup_request_id | uuid | Related pickup |
| collector_id | uuid | Uploading collector |
| storage_url | text | Secure object storage URL |
| latitude | numeric | Upload latitude |
| longitude | numeric | Upload longitude |
| captured_at | timestamp | Photo timestamp |
| verification_status | enum | pending, approved, rejected |

### payments

Stores payment transactions.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| pickup_request_id | uuid | Related pickup |
| customer_id | uuid | Paying customer |
| country_id | uuid | Country scope |
| provider | text | Paystack, Flutterwave, MTN MoMo, cash |
| method | enum | mobile_money, card, bank_transfer, wallet, cash |
| amount | numeric | Transaction amount |
| currency_code | text | GHS, NGN, XOF |
| status | enum | pending, paid, failed, refunded |
| provider_reference | text | Gateway reference |

### collector_earnings

Stores collector commissions and payout status.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| collector_id | uuid | Collector |
| pickup_request_id | uuid | Completed pickup |
| gross_amount | numeric | Job value |
| platform_fee | numeric | Platform commission |
| collector_amount | numeric | Collector earning |
| payout_status | enum | pending, processing, paid, failed |

## 5. Core API Groups

| API Group | Example Endpoints |
| --- | --- |
| Auth | `POST /auth/login`, `POST /auth/otp/request`, `POST /auth/otp/verify` |
| Countries | `GET /countries`, `POST /countries`, `PATCH /countries/:id` |
| Pickups | `GET /pickups`, `POST /pickups`, `PATCH /pickups/:id/status` |
| Dispatch | `POST /dispatch/manual-assign`, `POST /dispatch/auto-assign`, `POST /dispatch/override` |
| Collectors | `GET /collectors`, `PATCH /collectors/:id/approve`, `PATCH /collectors/:id/status` |
| Sacks | `GET /sack-types`, `POST /sack-types`, `PATCH /sack-types/:id` |
| Payments | `GET /payments`, `POST /payments/initiate`, `POST /payments/webhook` |
| SMS | `POST /sms/inbound`, `POST /sms/send` |
| Proof | `POST /proof-photos`, `PATCH /proof-photos/:id/verify` |
| Reports | `GET /reports/daily`, `GET /reports/revenue`, `GET /reports/collectors` |

## 6. Auto-Assignment Logic

A simple first version can avoid advanced AI and still provide strong operational value.

Ranking inputs:

1. Collector is approved.
2. Collector is online.
3. Collector is in the same service zone.
4. Collector has fewer active jobs.
5. Collector is closest to pickup location.
6. Collector has a strong completion rate.
7. Collector has not recently rejected the same request.

PostGIS can calculate distance, while Redis can store recent online status and active job counts.

## 7. Security and Permissions

- Use JWT access tokens with refresh tokens.
- Use role-based access control for every API route.
- Restrict country admins to their own country.
- Store proof photos and collector documents in private buckets.
- Generate signed URLs for document and photo viewing.
- Keep immutable audit logs for assignment overrides, payment changes, and collector approval decisions.

## 8. Deployment Recommendation

- Frontend: Vercel, AWS Amplify, or containerized Next.js.
- Backend: Render, Fly.io, AWS ECS, DigitalOcean App Platform, or Kubernetes later.
- Database: managed PostgreSQL with PostGIS enabled.
- Object storage: AWS S3, Cloudflare R2, or DigitalOcean Spaces.
- Observability: Sentry for errors and Grafana/Prometheus or hosted logs for operations.
