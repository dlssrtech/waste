# Product Flow Design

## 1. Product Vision

The platform is an operations-first waste collection marketplace. It connects customers who use official company sacks with independent collectors who are approved, assigned, tracked, and paid through the platform.

The first commercial launch should focus on Ghana. The data model and system configuration should still support Nigeria and Côte d'Ivoire from the beginning so that currencies, cities, payment methods, SMS providers, and operating rules can be activated country by country.

## 2. Core User Roles

| Role | Primary Goal | Main Access |
| --- | --- | --- |
| Super Admin | Control the entire multi-country platform | Global web dashboard |
| Country Admin | Manage operations for one country | Country operations panel |
| Dispatcher | Assign and monitor pickups | Dispatch panel |
| Finance Admin | Monitor payments, collector payouts, and revenue | Finance panel |
| Support Agent | Resolve disputes and customer issues | Support panel |
| Inventory Manager | Manage official sacks and pricing | Sack inventory panel |
| Collector | Accept and complete pickup jobs | Collector mobile role; limited web profile |
| Customer | Request pickup, buy sacks, pay, and view history | Customer mobile role; optional web portal |

## 3. End-to-End Pickup Flow

### 3.1 Customer App Pickup Request

1. Customer logs in or registers.
2. Customer selects country, city, pickup address, and service area.
3. Customer chooses normal sack pickup or special pickup.
4. For normal pickup, customer enters the number and sizes of official sacks.
5. System calculates a fixed sack-based price using the country pricing table.
6. Customer selects schedule window: morning, afternoon, or evening.
7. Customer chooses payment method: wallet, mobile money, card, bank transfer, or cash.
8. Pickup request is created with `pending_assignment` status.
9. Dashboard shows the request in the pending queue.

### 3.2 SMS Pickup Request

1. Feature-phone customer sends a message such as `PICKUP 3 SACKS`.
2. SMS provider forwards the message to the backend webhook.
3. Backend identifies the customer by phone number.
4. If the customer exists, the system creates a draft pickup request.
5. If location is missing, the system replies asking for area, landmark, or saved address code.
6. Dispatcher reviews incomplete SMS requests from the dashboard.
7. Once validated, the request enters the normal assignment queue.

### 3.3 Manual Assignment Flow

1. Dispatcher opens pending pickup requests.
2. Dispatcher filters collectors by city, service zone, availability, approval status, and current workload.
3. Dispatcher selects a collector and assigns the request.
4. Collector receives a mobile notification or SMS.
5. Job status changes to `assigned`.
6. Admin can reassign or cancel if the collector does not respond.

### 3.4 Automatic Assignment Flow

1. System checks pending pickups that are eligible for auto-dispatch.
2. System finds approved and online collectors within the service area.
3. System ranks collectors by distance, current active jobs, rating, completion rate, and capacity.
4. Job is offered to the best collector.
5. If the collector accepts, status changes to `accepted`.
6. If rejected or timed out, the system offers the job to the next collector.
7. Dispatcher can override automatic assignment at any time.

### 3.5 Pickup Completion and Photo Proof Flow

1. Collector arrives at pickup location.
2. Collector confirms that sacks are official company sacks.
3. Collector counts sacks and updates actual quantity if different from request.
4. Collector takes one or more proof photos.
5. Photos are uploaded to secure object storage.
6. Collector marks pickup as completed.
7. Dashboard stores and displays proof photos, timestamp, location, collector, and sack count.
8. Customer receives completion notification and can view proof.
9. Payment and collector earnings are finalized.

## 4. Sack-Based Business Model

Official sacks are the core business control. The platform should support sack sales, sack inventory, fixed pickup pricing, and collector verification.

| Sack Type | Example Price | Usage |
| --- | ---: | --- |
| Small | $2 | Light household waste |
| Medium | $4 | Standard household waste |
| Large | $6 | Larger household waste |

The dashboard should allow admins to configure actual local prices per country and currency. Ghana can use GHS, Nigeria can use NGN, and Côte d'Ivoire can use XOF.

## 5. Pricing Rules

### 5.1 Normal Pickup

Normal pickup pricing is fixed by official sack quantity and sack size. The platform should not calculate regular pickup pricing by distance.

Example rule:

- Small sack collection fee: fixed amount per sack.
- Medium sack collection fee: fixed amount per sack.
- Large sack collection fee: fixed amount per sack.
- Optional service fee or platform fee can be configured per country.

### 5.2 Special Pickup

Special pickup is used for bulky waste, furniture, construction debris, garden waste, commercial waste, or unusual collection jobs.

Flow:

1. Customer submits description, address, photos, preferred date, and contact number.
2. Admin reviews the request.
3. Admin sets a custom quote.
4. Customer accepts or rejects the quote.
5. Accepted quote becomes a pickup job.
6. Dispatcher assigns the job manually or through auto-dispatch.

## 6. Payment Flow

The system should support hybrid payments because customers may use smartphones, feature phones, cash, or digital wallets.

Supported methods:

- Ghana mobile money: MTN MoMo, Telecel/Vodafone Cash, AirtelTigo Money.
- Nigeria bank transfer and wallet integrations.
- Cards: debit and credit cards.
- Bank transfers.
- Cash collection.
- Internal wallet balance.

Payment statuses should include `unpaid`, `pending`, `paid`, `failed`, `refunded`, `partially_paid`, and `cash_pending_verification`.

## 7. Operations-First Development Phases

### Phase 1: Operations Dashboard

- Admin login and role permissions.
- Pickup request management.
- Collector onboarding and approval.
- Manual assignment.
- Photo proof review.
- Sack inventory and pricing management.
- Payment monitoring.
- Basic reports.
- Foundation for future auto-dispatch.

### Phase 2: Core Mobile App

- One Flutter app with role-based access.
- Customer registration and pickup requests.
- Collector registration and profile submission.
- Collector job acceptance and status updates.
- Pickup history.

### Phase 3: Payments and SMS

- Mobile money integration.
- Card and bank transfer integration.
- Wallet balance.
- SMS pickup booking.
- SMS status notifications.

### Phase 4: Automation and Scaling

- Automatic collector assignment.
- Live tracking map.
- Advanced analytics.
- Multi-country rollout controls.
- Collector payout automation.
