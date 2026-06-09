const panels = [
  {
    path: '/super-admin',
    icon: '🌍',
    title: 'Global Super Admin Panel',
    summary: 'Control countries, currencies, provider setup, users, roles, and audit logs across Ghana, Nigeria, and Côte d’Ivoire.',
    actions: ['Activate or pause a country', 'Configure payment and SMS providers', 'Review platform audit logs'],
    metrics: [['3', 'Countries configured', '+ Ghana active'], ['7', 'Role groups', 'RBAC ready'], ['4', 'Payment rails', 'MoMo priority'], ['99%', 'Audit coverage', 'Critical actions tracked']],
    rows: [['Ghana', 'GHS', 'Active', 'green'], ['Nigeria', 'NGN', 'Expansion', 'blue'], ['Côte d’Ivoire', 'XOF', 'Expansion', 'blue']],
    secondaryTitle: 'Global controls',
    secondary: ['Country setup', 'Currency rules', 'Provider credentials', 'Role permissions']
  },
  {
    path: '/country-admin',
    icon: '🏢',
    title: 'Country Operations Admin Panel',
    summary: 'Run day-to-day country operations with pickup counts, collector approvals, service zones, sack pricing, and local reports.',
    actions: ['Approve country-level collectors', 'Manage local service zones', 'Monitor today’s operating performance'],
    metrics: [['128', 'Pickups today', '+18%'], ['42', 'Online collectors', 'Live'], ['16', 'Pending approvals', 'Needs review'], ['GHS 8.4k', 'Revenue today', 'Tracked']],
    rows: [['Accra Central', '38 pickups', 'Healthy', 'green'], ['Tema', '21 pickups', 'Busy', 'amber'], ['Kumasi', '14 pickups', 'Growing', 'blue']],
    secondaryTitle: 'Country priorities',
    secondary: ['Pickup request management', 'Collector approval queue', 'Zone health', 'Local escalation']
  },
  {
    path: '/dispatcher',
    icon: '🛰️',
    title: 'Dispatcher Panel',
    summary: 'Assign pending pickups manually, trigger auto-dispatch, override collectors, and monitor active jobs on a map-first layout.',
    actions: ['Manual assign nearest collector', 'Trigger automatic assignment', 'Override failed or delayed jobs'],
    metrics: [['31', 'Pending queue', 'Action needed'], ['18', 'Assigned jobs', 'In progress'], ['9', 'En route', 'Live'], ['4 min', 'Avg dispatch time', 'Fast']],
    rows: [['PU-1024', '3 medium sacks', 'Pending', 'amber'], ['PU-1025', 'Special pickup', 'Assigned', 'blue'], ['PU-1026', '2 large sacks', 'En route', 'green']],
    secondaryTitle: 'Dispatch tools',
    secondary: ['Collector map', 'Queue filters', 'Assignment drawer', 'Reassignment notes']
  },
  {
    path: '/collector-management',
    icon: '🚛',
    title: 'Collector Management Panel',
    summary: 'Approve independent collectors, review documents, monitor online status, performance, ratings, and earnings summaries.',
    actions: ['Approve new collector applications', 'Suspend non-compliant collectors', 'Review job completion performance'],
    metrics: [['214', 'Collectors', 'Approved'], ['42', 'Online now', 'Available'], ['4.7', 'Avg rating', 'Strong'], ['6%', 'Cancellation rate', 'Monitor']],
    rows: [['Kojo Mensah', 'Truck', 'Online', 'green'], ['Amina Bello', 'Tricycle', 'Busy', 'amber'], ['Yaw Boateng', 'Van', 'Pending docs', 'blue']],
    secondaryTitle: 'Profile checklist',
    secondary: ['Identity documents', 'Vehicle type', 'Service zones', 'Payout account']
  },
  {
    path: '/pickup-management',
    icon: '🧾',
    title: 'Pickup Request Management Panel',
    summary: 'View all requests by status: new, pending assignment, assigned, accepted, en route, arrived, completed, cancelled, and disputed.',
    actions: ['Open pickup details', 'Review timeline and notes', 'Cancel, reassign, or dispute a pickup'],
    metrics: [['520', 'Total requests', 'This week'], ['71', 'Completed today', 'Verified'], ['8', 'Cancelled', 'Review'], ['3', 'Disputed', 'Support']],
    rows: [['New', '14 jobs', 'Queue', 'amber'], ['Assigned', '18 jobs', 'Collector active', 'blue'], ['Completed', '71 jobs', 'Photo proof', 'green']],
    secondaryTitle: 'Request detail fields',
    secondary: ['Customer details', 'Address and landmark', 'Sack quantity', 'Proof photos']
  },
  {
    path: '/sack-inventory',
    icon: '🛍️',
    title: 'Sack Inventory and Pricing Panel',
    summary: 'Manage official company sacks, local prices, collection fees, stock by warehouse, SKUs, and sack sale orders.',
    actions: ['Create sack type and SKU', 'Set country-specific sack prices', 'Track stock movements'],
    metrics: [['3', 'Sack sizes', 'Small/Medium/Large'], ['8,920', 'Sacks in stock', 'Available'], ['GHS 2-6', 'Sample price range', 'Configurable'], ['19', 'Sale orders', 'Today']],
    rows: [['Small sack', 'GHS 2', 'Active', 'green'], ['Medium sack', 'GHS 4', 'Active', 'green'], ['Large sack', 'GHS 6', 'Active', 'green']],
    secondaryTitle: 'Inventory controls',
    secondary: ['Warehouse stock', 'Barcode/SKU', 'Customer sale price', 'Collection fee']
  },
  {
    path: '/payments-wallets',
    icon: '💳',
    title: 'Payment and Wallet Panel',
    summary: 'Monitor mobile money, cards, bank transfers, cash verification, wallets, refunds, reconciliation, and collector payout queues.',
    actions: ['Verify cash payments', 'Review failed MoMo transactions', 'Approve collector payouts'],
    metrics: [['GHS 52k', 'Weekly revenue', 'Tracked'], ['23', 'Failed payments', 'Needs follow-up'], ['12', 'Cash pending', 'Verify'], ['GHS 18k', 'Payout queue', 'Collectors']],
    rows: [['MTN MoMo', 'GHS 4,120', 'Paid', 'green'], ['Cash', 'GHS 380', 'Pending verification', 'amber'], ['Card', 'GHS 620', 'Failed', 'red']],
    secondaryTitle: 'Supported payment methods',
    secondary: ['MTN MoMo', 'Telecel/Vodafone Cash', 'AirtelTigo Money', 'Cards and transfers']
  },
  {
    path: '/special-pickups',
    icon: '🛋️',
    title: 'Special Pickup Quote Panel',
    summary: 'Handle bulky waste, furniture, construction waste, photo review, custom quote creation, and customer approval status.',
    actions: ['Review uploaded waste photos', 'Create custom quote', 'Convert accepted quote into pickup job'],
    metrics: [['11', 'New quotes', 'Review'], ['6', 'Awaiting customer', 'Pending'], ['4', 'Accepted today', 'Dispatch'], ['GHS 960', 'Quote value', 'Today']],
    rows: [['Furniture pickup', 'Photo review', 'New', 'amber'], ['Construction waste', 'GHS 350', 'Accepted', 'green'], ['Bulk sacks', 'GHS 180', 'Customer review', 'blue']],
    secondaryTitle: 'Quote builder',
    secondary: ['Waste category', 'Estimated volume', 'Admin price', 'Collector payout estimate']
  },
  {
    path: '/photo-proof',
    icon: '📸',
    title: 'Photo Proof Verification Panel',
    summary: 'Validate completion photos with timestamp, GPS upload location, collector, job ID, customer address, and collected sack count.',
    actions: ['Approve valid proof photos', 'Reject unclear proof', 'Flag collector compliance issues'],
    metrics: [['71', 'Photos today', 'Uploaded'], ['9', 'Awaiting review', 'Queue'], ['2', 'Rejected', 'Follow up'], ['98%', 'Proof compliance', 'Strong']],
    rows: [['PU-1018', '3 sacks', 'Approved', 'green'], ['PU-1021', '2 sacks', 'Pending review', 'amber'], ['PU-1022', 'Blurry photo', 'Rejected', 'red']],
    secondaryTitle: 'Verification data',
    secondary: ['Photo timestamp', 'GPS location', 'Collector name', 'Admin approval']
  },
  {
    path: '/reports-analytics',
    icon: '📊',
    title: 'Reporting and Analytics Panel',
    summary: 'Track daily, weekly, monthly pickups, revenue by country and zone, collector performance, customer activity, and sack sales.',
    actions: ['Export daily pickups', 'Compare country revenue', 'Review cancellation reasons'],
    metrics: [['914', 'Weekly pickups', '+14%'], ['GHS 52k', 'Weekly revenue', '+9%'], ['4.7', 'Collector score', 'Average'], ['2.1k', 'Active customers', 'This month']],
    rows: [['Daily pickups', '128', 'Up', 'green'], ['Payment failure rate', '3.8%', 'Watch', 'amber'], ['Sack sales', '1,440', 'Up', 'green']],
    secondaryTitle: 'Available reports',
    secondary: ['Revenue by country', 'Collector performance', 'Customer activity', 'Sack sales and usage']
  },
  {
    path: '/customer-support',
    icon: '🎧',
    title: 'Customer Support Panel',
    summary: 'Resolve complaints, failed pickups, payment issues, disputes, SMS conversations, pickup history, and customer profiles.',
    actions: ['Open support ticket', 'Review pickup and payment history', 'Compare dispute proof photos'],
    metrics: [['17', 'Open tickets', 'Support'], ['4', 'Payment issues', 'Finance'], ['3', 'Pickup disputes', 'Proof needed'], ['92%', 'SLA compliance', 'Good']],
    rows: [['Ticket #214', 'Failed pickup', 'Open', 'amber'], ['Ticket #215', 'Payment refund', 'Finance', 'blue'], ['Ticket #216', 'Proof dispute', 'Reviewing', 'red']],
    secondaryTitle: 'Support workspace',
    secondary: ['Customer profile', 'Pickup history', 'Payment history', 'SMS conversation']
  }
];

const defaultPanel = panels[0];
const panelMap = new Map(panels.map((panel) => [panel.path, panel]));

function getActivePanel() {
  return panelMap.get(window.location.pathname) || defaultPanel;
}

function renderNavigation(activePanel) {
  const nav = document.getElementById('panelNav');
  nav.innerHTML = panels
    .map((panel) => `<a class="panel-link ${panel.path === activePanel.path ? 'active' : ''}" href="${panel.path}"><span>${panel.icon}</span><span>${panel.title.replace(' Panel', '')}</span></a>`)
    .join('');
}

function renderHero(panel) {
  document.getElementById('panelTitle').textContent = panel.title;
  document.getElementById('panelHero').innerHTML = `
    <div>
      <p>${panel.summary}</p>
    </div>
    <ul class="action-list">
      ${panel.actions.map((action) => `<li>${action}</li>`).join('')}
    </ul>
  `;
}

function renderMetrics(panel) {
  document.getElementById('metricGrid').innerHTML = panel.metrics
    .map(([value, label, trend]) => `<article class="metric-card"><span>${label}</span><strong>${value}</strong><small>${trend}</small></article>`)
    .join('');
}

function renderCards(panel) {
  document.getElementById('primaryCard').innerHTML = `
    <h2>Live workspace</h2>
    <table>
      <thead><tr><th>Name</th><th>Detail</th><th>Status</th></tr></thead>
      <tbody>
        ${panel.rows.map(([name, detail, status, color]) => `<tr><td>${name}</td><td>${detail}</td><td><span class="badge ${color}">${status}</span></td></tr>`).join('')}
      </tbody>
    </table>
  `;
  document.getElementById('secondaryCard').innerHTML = `
    <h3>${panel.secondaryTitle}</h3>
    <ul class="data-list">
      ${panel.secondary.map((item) => `<li>${item}</li>`).join('')}
    </ul>
  `;
}

function renderApp() {
  const activePanel = getActivePanel();
  renderNavigation(activePanel);
  renderHero(activePanel);
  renderMetrics(activePanel);
  renderCards(activePanel);
}

renderApp();
