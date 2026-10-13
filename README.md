# RentX

RentX is a mobile-responsive rental operations MVP for Mogadishu. It runs directly in a modern browser without a build step or third-party dependencies.

## Run it

Open `index.html` in a browser, or serve the repository with any static HTTP server, for example:

```sh
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

The first launch creates an editable sample workspace on the current device. Use **Reset sample workspace** in Settings to restore the starting dataset. All changes are saved in browser `localStorage`; clearing browser storage removes them.

## Included workflows

- Browse and manage whole buildings, apartments, furnished homes, hotel units, bookings, tenants, landlord/owner records, payment records, and maintenance requests.
- Keep landlord/owner contacts linked to their properties; track booking dates, availability conflicts, rent/deposits, manual payment methods, invoice and receipt printing.
- Record water-supply company, electricity, cleaning, and security bills against a property, with supplier, payment method, and separate utility-expense reporting.
- Review occupancy and revenue summaries and export the underlying records as CSV.
- Search listings with local keyword/price matching and ask the RentX Assistant for rule-based summaries and recommendations.
- Switch between English and Somali, and preview role-specific navigation and actions.

## Integration boundaries

This is a functional, single-browser MVP—not a hosted multi-user service. It has no server, account authentication, shared database, audit log, or secure authorization; role selection only changes the local interface and must not be used to protect real data. EVC Plus, bank, and cash options record manually confirmed payments only: no transfer, settlement, or payment-provider API is connected. The assistant and property recommendations run locally using simple rules; no AI model or external data source is configured. Currency selection only changes number formatting—no exchange-rate conversion is performed.

Before using this with real tenants or money, connect a secure backend, configure authentication and server-side permissions, add backups and audit logging, and integrate verified payment and AI providers.
