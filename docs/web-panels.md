# Separate Web Panel Design

The web product should be built in Next.js as separate role-based panels under one application. Each panel should have its own navigation, permissions, dashboard cards, data tables, and workflows.

## 1. Global Super Admin Panel

### Purpose

Controls the full marketplace across Ghana, Nigeria, and Côte d'Ivoire.

### Main Screens

- Global overview dashboard.
- Country management.
- Currency and timezone configuration.
- Payment provider configuration.
- SMS provider configuration.
- User and role management.
- System audit logs.

### Key Metrics

- Total countries active.
- Total pickup requests.
- Revenue by country.
- Active collectors by country.
- Failed payments.
- SMS booking volume.

## 2. Country Operations Admin Panel

### Purpose

Manages day-to-day country operations.

### Main Screens

- Country dashboard.
- Pickup requests.
- Collector approvals.
- Service zones.
- Sack pricing.
- Country reports.
- Local support escalation.

### Dashboard Cards

- Pending pickups.
- Assigned pickups.
- Completed pickups today.
- Cancelled pickups.
- Online collectors.
- Revenue today.

## 3. Dispatcher Panel

### Purpose

Focuses on assignment and field operations.

### Main Screens

- Pending pickup queue.
- Active jobs board.
- Collector map.
- Manual assignment drawer.
- Auto-dispatch monitor.
- Reassignment and cancellation tools.

### Suggested Layout

- Left column: pickup request queue.
- Center: map showing collectors and pickup points.
- Right column: selected job details, customer contact, sack count, schedule window, and assignment controls.

### Actions

- Assign collector manually.
- Trigger automatic assignment.
- Override assigned collector.
- Contact customer.
- Contact collector.
- Mark operational issue.

## 4. Collector Management Panel

### Purpose

Approves and monitors independent collectors.

### Main Screens

- Collector applications.
- Approved collectors.
- Suspended collectors.
- Collector profile detail.
- Documents and identity review.
- Performance leaderboard.

### Collector Profile Data

- Full name.
- Phone number.
- Country and city.
- Service zones.
- Vehicle type.
- ID documents.
- Approval status.
- Online/offline status.
- Active jobs.
- Completed jobs.
- Cancellation rate.
- Average rating.
- Earnings summary.

## 5. Pickup Request Management Panel

### Purpose

Central workspace for all pickup requests.

### Status Tabs

- New.
- Pending assignment.
- Assigned.
- Accepted.
- En route.
- Arrived.
- Completed.
- Cancelled.
- Disputed.

### Request Detail View

- Customer details.
- Pickup address and landmark.
- Phone number.
- Sack quantity and sizes.
- Schedule window.
- Payment status.
- Assigned collector.
- Timeline of status updates.
- Proof photos.
- Admin notes.

## 6. Sack Inventory and Pricing Panel

### Purpose

Controls official company sacks and fixed pricing.

### Main Screens

- Sack types.
- Sack sale orders.
- Inventory by warehouse or branch.
- Pricing by country.
- Pickup fee rules.
- Stock movement history.

### Important Fields

- Sack type: small, medium, large, custom.
- Country.
- Currency.
- Customer purchase price.
- Collection fee.
- Active/inactive status.
- SKU or barcode.
- Current stock.

## 7. Payment and Wallet Panel

### Purpose

Monitors customer payments, collector earnings, cash verification, and payouts.

### Main Screens

- Payment transactions.
- Wallet ledger.
- Cash collections pending verification.
- Collector payout queue.
- Refunds.
- Provider reconciliation.

### Payment Filters

- Country.
- Provider.
- Method.
- Status.
- Date range.
- Customer.
- Collector.

## 8. Special Pickup Quote Panel

### Purpose

Handles manually priced bulky or unusual waste jobs.

### Main Screens

- New quote requests.
- Photo review.
- Quote builder.
- Customer approval status.
- Assigned special pickups.

### Quote Builder Fields

- Waste category.
- Estimated volume.
- Photos.
- Admin price.
- Service fee.
- Collector payout estimate.
- Expiry date.
- Internal notes.

## 9. Photo Proof Verification Panel

### Purpose

Prevents disputes and validates completed pickups.

### Main Screens

- Completed pickups awaiting review.
- Proof photo gallery.
- Dispute comparison view.
- Collector compliance flags.

### Verification Data

- Photo timestamp.
- GPS location at upload.
- Collector name.
- Job ID.
- Sacks collected.
- Customer address.
- Admin approval or rejection.

## 10. Reporting and Analytics Panel

### Purpose

Gives management visibility into operational and financial performance.

### Reports

- Daily pickups.
- Weekly pickups.
- Monthly pickups.
- Revenue by country.
- Revenue by service zone.
- Collector performance.
- Customer activity.
- Cancellation reasons.
- Payment failure rates.
- Sack sales and usage.

## 11. Customer Support Panel

### Purpose

Handles customer complaints, failed pickups, payment issues, and disputes.

### Main Screens

- Support tickets.
- Customer profile.
- Pickup history.
- Payment history.
- Dispute proof photos.
- SMS conversation history.

## 12. Suggested Next.js Route Structure

```text
/app
  /(auth)
    /login
    /forgot-password
  /(super-admin)
    /countries
    /providers
    /audit-logs
  /(country-admin)
    /dashboard
    /pickups
    /collectors
    /zones
    /pricing
  /(dispatcher)
    /dispatch
    /active-jobs
    /map
  /(finance)
    /payments
    /wallets
    /payouts
    /reconciliation
  /(inventory)
    /sacks
    /stock
    /orders
  /(support)
    /tickets
    /customers
    /disputes
```

## 13. Visual Design Direction

Use a clean logistics dashboard style:

- Dark sidebar with role-specific navigation.
- White or soft-gray content background.
- Green primary brand color for completed and environmental actions.
- Amber for pending states.
- Red for cancelled, dispute, or failed payment states.
- Card-based KPIs at the top of each dashboard.
- Map and table split views for dispatch screens.
- Photo proof thumbnails with modal preview.
- Mobile-responsive tables for tablet operations use.
