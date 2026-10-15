(() => {
  "use strict";

  const STORAGE_KEY = "rentx.workspace.v1";
  const UTILITY_BILL_TYPES = ["Water supply company", "Electricity bill", "Cleaning service", "Security service"];
  const NAV_ITEMS = [
    ["dashboard", "▦", "Overview", "Guudmar", ["admin", "manager", "owner", "receptionist", "finance"]],
    ["properties", "⌂", "Properties", "Guryaha", ["admin", "manager", "owner", "receptionist"]],
    ["bookings", "▤", "Bookings", "Boos celin", ["admin", "manager", "owner", "receptionist", "finance"]],
    ["customers", "♙", "Customers", "Macaamiisha", ["admin", "manager", "receptionist"]],
    ["owners", "♧", "Owners", "Mulkiilayaasha", ["admin", "manager", "owner"]],
    ["payments", "＄", "Payments", "Lacag bixinta", ["admin", "manager", "finance"]],
    ["maintenance", "⌁", "Maintenance", "Dayactirka", ["admin", "manager", "receptionist"]],
    ["reports", "▥", "Reports", "Warbixinnada", ["admin", "manager", "owner", "finance"]],
    ["assistant", "✳", "RentX Assistant", "Kaaliyaha RentX", ["admin", "manager", "owner", "receptionist", "finance"]],
    ["settings", "⚙", "Settings", "Dejinta", ["admin"]]
  ];
  const ROLES = {
    admin: ["Administrator", "Maamule"],
    manager: ["Property manager", "Maareeyaha guryaha"],
    owner: ["Landlord / owner", "Mulkiile"],
    receptionist: ["Receptionist", "Soo dhoweye"],
    finance: ["Finance officer", "Sarkaal maaliyadeed"]
  };
  const WORDS = {
    Overview: "Guudmar", Properties: "Guryaha", Bookings: "Boos celin", Customers: "Macaamiisha", Owners: "Mulkiilayaasha",
    Payments: "Lacag bixinta", Maintenance: "Dayactirka", Reports: "Warbixinnada",
    "RentX Assistant": "Kaaliyaha RentX", Settings: "Dejinta", WORKSPACE: "GOOBTA SHAQADA",
    "Good morning": "Subax wanaagsan", "Good afternoon": "Galab wanaagsan", "Good evening": "Fiid wanaagsan",
    "Here’s your Mogadishu portfolio at a glance.": "Halkan ka eeg guudmarka guryahaaga Muqdisho.",
    "Here is your rental portfolio at a glance.": "Halkan ka eeg guudmarka guryahaaga kirada.",
    "Total properties": "Wadarta guryaha", "Available now": "Hadda bannaan", "Active bookings": "Boos celin firfircoon",
    "Revenue this month": "Dakhliga bishan", "vs last month": "marka la barbardhigo bishii hore",
    "across your portfolio": "guud ahaan hantidaada", "ready to book": "diyaar u ah in la qabsado",
    "confirmed stays": "joogitaanno la xaqiijiyey", "from recorded payments": "lacagaha la diiwaangeliyey",
    "Upcoming bookings": "Boos celinnada soo socda", "View all": "Dhammaan eeg", "Recent activity": "Dhaqdhaqaaqii u dambeeyey",
    "Occupancy overview": "Guudmarka deganaanshaha", "of properties occupied": "guryaha la deggan yahay",
    "Occupied": "La deggan yahay", "Available": "Bannaan", "Property": "Guri", "Tenant": "Kirayste",
    "Check-in": "Soo gelid", "Check-out": "Ka bixid", "Status": "Xaalad", "No upcoming bookings": "Ma jiraan boos celin soo socota",
    "No activity yet": "Weli ma jiro dhaqdhaqaaq", "See all properties": "Eeg dhammaan guryaha",
    "Manage your Mogadishu rental portfolio.": "Maamul guryaha kirada ee Muqdisho.",
    "Manage reservations, arrivals, and stays.": "Maamul boos celinnada, imaanshaha iyo joogitaanka.",
    "Keep tenant contacts in one place.": "Xogta kiraystayaasha hal meel ku kaydi.",
    "Record and review manually confirmed payments.": "Diiwaangeli oo eeg lacagaha gacanta lagu xaqiijiyey.",
    "Track repairs and property issues.": "La soco dayactirka iyo arrimaha guryaha.",
    "Understand occupancy and recorded rental income.": "Faham deganaanshaha iyo dakhliga kirada la diiwaangeliyey.",
    "Ask about your rentals or find a place to stay.": "Wax ka weydii kiradaada ama raadi meel aad degto.",
    "New property": "Guri cusub", "New booking": "Boos celin cusub", "Add customer": "Ku dar macmiil",
    "Record payment": "Diiwaangeli lacag", "New request": "Codsi cusub", "Export CSV": "Soo dejiso CSV",
    "Revenue report": "Warbixinta dakhliga", "Occupancy report": "Warbixinta deganaanshaha",
    "Rental portfolio": "Guryaha kirada", "All areas": "Dhammaan xaafadaha", "All types": "Dhammaan noocyada",
    "All statuses": "Dhammaan xaaladaha", "Furnished apartment": "Guri dabaq ah oo qalabaysan",
    "Furnished": "Qalabaysan", "Bedrooms": "Qolalka jiifka", "Monthly rent": "Kirada bishii",
    "per month": "bishii", "per night": "habeenkii", "Details": "Faahfaahin", "Book stay": "Qabso hoy",
    "Edit property": "Wax ka beddel guriga", "Edit": "Wax ka beddel", "Delete": "Tirtir",
    "Available": "Bannaan", "Reserved": "La qabsaday", "Occupied": "La deggan yahay",
    "Maintenance": "Dayactir", "Active": "Firfircoon", "Confirmed": "La xaqiijiyey", "Pending": "Sugaya",
    "Cancelled": "La joojiyey", "Completed": "La dhammeeyey", "Paid": "La bixiyey", "Open": "Furan",
    "High": "Sare", "Medium": "Dhexdhexaad", "Low": "Hoose", "Overdue": "Waqtigii dhaafay",
    "Booking reference": "Tixraaca boos celinta", "Guest": "Marti", "Property / area": "Guri / xaafad",
    "Dates": "Taariikhaha", "Rent": "Kirada", "Deposit": "Dabaajiga", "Payment": "Lacag bixinta",
    "Tenant name": "Magaca kiraystaha", "Phone number": "Lambarka telefoonka", "Email": "Iimayl",
    "Property name": "Magaca guriga", "Area": "Xaafadda", "Property type": "Nooca guriga",
    "Monthly": "Bil kasta", "Nightly": "Habeen kasta", "Price (USD)": "Qiimaha (USD)",
    "Bedrooms": "Qolalka jiifka", "Furnishing": "Alaabta guriga", "Notes": "Faahfaahin",
    "Start date": "Taariikhda bilowga", "End date": "Taariikhda dhammaadka", "Select property": "Dooro guri",
    "Select tenant": "Dooro kirayste", "Guests": "Martida", "Deposit (USD)": "Dabaaji (USD)",
    "Payment method": "Habka lacag bixinta", "Amount (USD)": "Qaddarka (USD)", "Payment date": "Taariikhda lacag bixinta",
    "Reference / note": "Tixraac / qoraal", "EVC Plus": "EVC Plus", "Bank transfer": "Bangiga",
    "Cash": "Lacag caddaan ah", "Manual entry": "Diiwaangelin gacanta ah", "Rent payment": "Lacagta kirada",
    "Deposit payment": "Lacagta dabaajiga", "Maintenance title": "Cinwaanka dayactirka", "Priority": "Mudnaanta",
    "Payment type": "Nooca lacag bixinta", "Water supply company": "Shirkadda biyaha",
    "Electricity bill": "Biilka korontada", "Cleaning service": "Adeegga nadaafadda",
    "Security service": "Adeegga amniga", "Utility bills": "Biilasha adeegyada",
    "Utility bill": "Biilka adeegga", "Utility expenses": "Kharashaadka adeegyada",
    "Supplier / company": "Shirkadda / adeeg-bixiyaha", "Tenant / company": "Kirayste / shirkad",
    "Booking / property": "Boos celin / guri", "Property / building": "Guri / dhisme",
    "No utility bills yet": "Weli biil adeeg ma jiro",
    "Water supply company, electricity, cleaning, and security bills are tracked as property expenses.":
      "Biilasha shirkadda biyaha, korontada, nadaafadda iyo amniga waxaa loo diiwaangeliyaa kharashaadka guryaha.",
    "Property is required for a utility bill.": "Guri ayaa looga baahan yahay biilka adeegga.",
    "Enter the supplier or company name for this bill.": "Geli magaca shirkadda ama adeeg-bixiyaha biilkan.",
    "Description": "Sharaxaad", "Save": "Kaydi", "Cancel": "Jooji", "Close": "Xir", "Save changes": "Kaydi isbeddelka",
    "Name": "Magaca", "Type": "Nooca", "Payment method": "Habka lacag bixinta", "Date": "Taariikh",
    "Receipt": "Rasiid", "Print receipt": "Daabac rasiidka", "Mark confirmed": "Xaqiiji",
    "Cancel booking": "Jooji boos celinta", "Mark completed": "Dhammee", "Update status": "Beddel xaaladda",
    "No properties found": "Guri lama helin", "No bookings yet": "Weli boos celin ma jirto",
    "No customers yet": "Weli macmiil ma jiro", "No payments yet": "Weli lacag bixin ma jirto",
    "No maintenance requests": "Ma jiraan codsiyo dayactir", "No matching records": "Diiwaanno ku habboon lama helin",
    "Add your first property": "Ku dar gurigaaga koowaad", "Add your first customer": "Ku dar macmiilkaaga koowaad",
    "Name / phone": "Magac / telefoon", "Rent & deposit": "Kirada & dabaajiga", "Method": "Habka",
    "Code": "Lambar", "Monthly income": "Dakhliga bishii", "Occupancy": "Deganaansho",
    "Total collected": "Wadarta la ururiyey", "Bookings this month": "Boos celinnada bishan",
    "Collection rate": "Heerka lacag ururinta", "Last six months": "Lixdii bilood ee u dambaysay",
    "Monthly revenue": "Dakhliga bil kasta", "Portfolio breakdown": "Kala qaybinta hantida",
    "Furnished home": "Guri qalabaysan", "Hotel unit": "Qol huteel", "Apartment": "Guri dabaq ah",
    "Property analysis": "Falanqaynta guryaha", "Local assistant": "Kaaliye maxalli ah",
    "Rule-based assistant": "Kaaliye ku shaqeeya xeerar", "Sample workspace": "Goob tijaabo ah",
    "Sample data is editable and stored only in this browser.": "Xogta tusaalaha waa la beddeli karaa, browser-kan oo keliya ayaana lagu kaydiyaa.",
    "Role preview only — not authentication or data security.": "Tijaabinta doorarka oo keliya — ma aha gelitaan ama ammaan xogeed.",
    "Currency": "Lacagta", "Default currency": "Lacagta caadiga ah", "Language": "Luqadda",
    "English": "Ingiriisi", "Somali": "Soomaali", "Role & permissions": "Doorarka iyo rukhsadaha",
    "Reset sample workspace": "Dib u celi goobta tusaalaha", "Reset workspace": "Dib u celi goobta",
    "Resetting removes local edits and restores the starter dataset.": "Dib-u-celintu waxay tirtiraysaa isbeddellada oo waxay soo celinaysaa xogta bilowga ah.",
    "Local storage only": "Kaydka browser-kan oo keliya", "Not a real payment integration": "Ma aha isku xidh lacag-bixin dhab ah",
    "Not connected to an AI provider": "Kuma xidhna adeeg AI", "Need a hand?": "Ma u baahan tahay caawimo?",
    "Ask your RentX assistant": "Weydii kaaliyaha RentX", "Search properties, tenants…": "Raadi guryo, kiraystayaal…",
    "Workspace": "Goobta shaqada", "Mogadishu": "Muqdisho", "Take me there": "Halkaas gee",
    "Search rentals": "Raadi guryo kiro ah", "Find a place to stay": "Raadi meel aad degto",
    "Tell me what you need": "Ii sheeg waxa aad u baahan tahay", "Ask RentX…": "Weydii RentX…",
    "Try asking…": "Isku day inaad weydiiso…", "Find a furnished apartment in Hodan under $500":
      "Raadi guri dabaq ah oo qalabaysan degmada Hodan, wax ka yar $500",
    "How is occupancy looking?": "Sidee buu deganaanshuhu yahay?", "Summarize this month’s revenue":
      "Soo koob dakhliga bishan", "Analyze my property portfolio": "Falanqee guryahayga",
    "RentX runs here using local rules. It can search this workspace and summarize its records; it does not contact an AI service.":
      "RentX halkan ayuu ku shaqeeyaa isaga oo adeegsanaya xeerar maxalli ah. Wuxuu raadin karaa oo soo koobi karaa diiwaannada; adeeg AI lama xidhiidhayo.",
    "All actions are stored in this browser.": "Dhammaan ficillada waxaa lagu kaydiyaa browser-kan.",
    "Check-in": "Soo gelid", "Check-out": "Ka bixid", "Unknown": "Lama yaqaan", "N/A": "Maya",
    "No matching properties. Try another area, type, or budget.": "Guryo ku habboon lama helin. Isku day xaafad, nooc ama miisaaniyad kale.",
    "I found these matching places": "Waxaan helay meelahan ku habboon",
    "No dates available": "Taariikho bannaan ma jiraan", "Currency updated": "Lacagta waa la beddelay",
    "Changes saved": "Isbeddelka waa la kaydiyey", "Payment recorded": "Lacagta waa la diiwaangeliyey",
    "Booking saved": "Boos celinta waa la kaydiyey", "Property saved": "Guriga waa la kaydiyey",
    "Customer saved": "Macmiilka waa la kaydiyey", "Maintenance request saved": "Codsiga dayactirka waa la kaydiyey",
    "Workspace reset": "Goobta shaqada waa la dib-celiyey", "Copied": "Waa la koobiyey",
    "EVC Plus / bank / cash entries are manual records only.": "Diiwaannada EVC Plus / bangi / caddaan gacanta ayaa lagu xaqiijiyaa.",
    "This local preview stores data in this browser only.": "Muuqaalkan xogta browser-kan oo keliya ayaa lagu kaydiyaa.",
    "Settings": "Dejinta", "Manage local preferences and preview permissions.": "Maamul doorbidyada maxalliga ah iyo tijaabinta rukhsadaha.",
    "Demo role preview": "Tijaabinta doorarka", "This changes visible actions only.": "Tani waxay beddelaysaa ficillada muuqda oo keliya.",
    "All upcoming confirmed stays": "Dhammaan joogitaannada la xaqiijiyey ee soo socda",
    "Bookings and recorded payments": "Boos celinnada iyo lacagaha la diiwaangeliyey",
    "Current status across your properties": "Xaaladda hadda ee guryahaaga",
    "Quick actions": "Ficillo degdeg ah", "booking records": "diiwaanka boos celinta",
    "No available properties found": "Guryo bannaan lama helin", "No bookings available": "Boos celin lama helin",
    "Choose a valid property and customer.": "Dooro guri iyo macmiil sax ah.",
    "Enter a valid property name, area, and price.": "Geli magaca guriga, xaafadda iyo qiime sax ah.",
    "Enter a customer name and phone number.": "Geli magaca macmiilka iyo lambarka telefoonka.",
    "Enter an owner name and phone number.": "Geli magaca mulkiilaha iyo lambarka telefoonka.",
    "These dates overlap a confirmed booking. Choose different dates.": "Taariikhahani waxay ku dhacayaan boos celin kale. Dooro taariikho kale.",
    "This property is marked for maintenance.": "Gurigan waxaa loo calaamadeeyey dayactir.",
    "Choose a start date today or later and an end date after it.": "Dooro taariikh bilow ah oo maanta ama ka dambaysa iyo taariikh dhammaad oo ka dambaysa.",
    "You do not have permission for this action.": "Rukhsad uma lihid ficilkan.",
    "Allow pop-ups to print this invoice.": "Oggolow daaqadaha soo baxa si aad u daabacdo qaansheegadda.",
    "Allow pop-ups to print this receipt.": "Oggolow daaqadaha soo baxa si aad u daabacdo rasiidka.",
    "Currency selection changes formatting only; no exchange conversion is applied.": "Doorashada lacagtu waxay beddeshaa qaabka muuqaalka oo keliya; sarif lacageed lama samaynayo.",
    "Booking": "Boos celin", "Choose the language used across this browser.": "Dooro luqadda lagu isticmaalayo browser-kan.",
    "How can I help?": "Sideen kuu caawin karaa?", "Send": "Dir", "Unfurnished": "Aan qalabaysnayn",
    "Building": "Dhismaha",
    "Availability and price are based on this browser's editable workspace data.": "Helitaanka iyo qiimuhu waxay ku salaysan yihiin xogta goobta shaqada ee browser-kan.",
    "I can find available places, summarize occupancy or recorded revenue, and describe this local property portfolio. No AI provider is connected.":
      "Waxaan heli karaa guryo bannaan, soo koobi karaa deganaanshaha iyo dakhliga la diiwaangeliyey, ama sharxi karaa hantida maxalliga ah. Adeeg AI kuma xidhna.",
    "Landlords and property owners": "Mulkiilayaasha iyo dadka leh guryaha", "Property owner": "Mulkiilaha guriga",
    "Owner": "Mulkiile", "Owner name": "Magaca mulkiilaha", "Add owner": "Ku dar mulkiile",
    "No owners yet": "Weli mulkiile ma jiro", "Linked properties": "Guryaha lala xidhiidhiyey",
    "Rent collected": "Kirada la ururiyey", "An invoice can be printed from any booking.": "Waxaad boos celin kasta ka daabici kartaa qaansheegad.",
    "Booking invoice": "Qaansheegadda boos celinta", "Print invoice": "Daabac qaansheegadda",
    "Unassigned": "Aan cidna loo qoondayn", "Invoice": "Qaansheegad", "Balance due": "Hadhaaga la bixinayo",
    "Add owner": "Ku dar mulkiile"
  };

  const isoDay = (offset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().slice(0, 10);
  };
  const monthKey = (date) => String(date || "").slice(0, 7);
  const makeId = (prefix) => `${prefix}-${crypto.randomUUID ? crypto.randomUUID().slice(0, 8) : Math.random().toString(36).slice(2, 10)}`;
  const seedData = () => {
    const properties = [
      { id: "p-hodan-1", name: "Hodan Garden Residence", area: "Hodan", type: "Apartment", bedrooms: 2, price: 480, period: "Monthly", furnished: true, ownerId: "o-amina", status: "available", notes: "Bright furnished apartment near Taleex." },
      { id: "p-waberi-1", name: "Waberi Coastal Suite", area: "Waberi", type: "Furnished home", bedrooms: 3, price: 850, period: "Monthly", furnished: true, ownerId: "o-abdi", status: "available", notes: "Family home with generator and secure parking." },
      { id: "p-dharkenley-1", name: "Dabka Hotel Studio", area: "Dharkenley", type: "Hotel unit", bedrooms: 1, price: 42, period: "Nightly", furnished: true, ownerId: "o-sahra", status: "available", notes: "Daily housekeeping available." },
      { id: "p-karaan-1", name: "Karaan Family Apartment", area: "Karaan", type: "Apartment", bedrooms: 3, price: 390, period: "Monthly", furnished: false, ownerId: "o-abdi", status: "available", notes: "Spacious unfurnished apartment." },
      { id: "p-shibis-1", name: "Shibis City Home", area: "Shibis", type: "Furnished home", bedrooms: 2, price: 620, period: "Monthly", furnished: true, ownerId: "o-amina", status: "available", notes: "Quiet, furnished home close to the city." },
      { id: "p-hamar-1", name: "Hamar Boutique Room", area: "Hamar Weyne", type: "Hotel unit", bedrooms: 1, price: 58, period: "Nightly", furnished: true, ownerId: "o-sahra", status: "available", notes: "Compact hotel room with private bathroom." },
      { id: "p-hodan-2", name: "Hodan Family House", area: "Hodan", type: "Furnished home", bedrooms: 4, price: 1100, period: "Monthly", furnished: true, ownerId: "o-amina", status: "available", notes: "Four bedrooms and a private courtyard." },
      { id: "p-yakshid-1", name: "Yakshid Business Flat", area: "Yaqshid", type: "Apartment", bedrooms: 1, price: 280, period: "Monthly", furnished: true, ownerId: "o-abdi", status: "available", notes: "Practical studio apartment for a short stay." },
      { id: "p-hodan-3", name: "Hodan City Apartment", area: "Hodan", type: "Apartment", bedrooms: 1, price: 420, period: "Monthly", furnished: true, ownerId: "o-sahra", status: "available", notes: "Affordable furnished apartment near the main road." },
      { id: "p-bondhere-1", name: "Bondhere Business Building", area: "Bondhere", type: "Building", bedrooms: 8, price: 2200, period: "Monthly", furnished: false, ownerId: "o-abdi", status: "available", notes: "Whole-building rental suited to an office or organization." }
    ];
    const owners = [
      { id: "o-amina", name: "Amina Hassan", phone: "+252 61 234 5678", email: "amina@example.so" },
      { id: "o-abdi", name: "Abdi Farah", phone: "+252 61 341 2089", email: "abdi@example.so" },
      { id: "o-sahra", name: "Sahra Osman", phone: "+252 61 709 3265", email: "sahra@example.so" }
    ];
    const customers = [
      { id: "t-amina", name: "Amina Hassan", phone: "+252 61 234 5678", email: "amina@example.so" },
      { id: "t-mohamed", name: "Mohamed Ali", phone: "+252 61 987 1234", email: "mohamed@example.so" },
      { id: "t-fatima", name: "Fatima Yusuf", phone: "+252 61 555 0148", email: "fatima@example.so" },
      { id: "t-ahmed", name: "Ahmed Nur", phone: "+252 61 440 7788", email: "ahmed@example.so" }
    ];
    const bookings = [
      { id: "b-2401", propertyId: "p-hodan-1", tenantId: "t-amina", start: isoDay(-2), end: isoDay(28), guests: 2, status: "confirmed", deposit: 200, rent: 480 },
      { id: "b-2402", propertyId: "p-waberi-1", tenantId: "t-mohamed", start: isoDay(2), end: isoDay(32), guests: 4, status: "confirmed", deposit: 300, rent: 850 },
      { id: "b-2403", propertyId: "p-dharkenley-1", tenantId: "t-fatima", start: isoDay(1), end: isoDay(5), guests: 1, status: "confirmed", deposit: 0, rent: 168 },
      { id: "b-2404", propertyId: "p-hamar-1", tenantId: "t-ahmed", start: isoDay(-12), end: isoDay(-8), guests: 1, status: "completed", deposit: 0, rent: 232 },
      { id: "b-2405", propertyId: "p-karaan-1", tenantId: "t-amina", start: isoDay(10), end: isoDay(40), guests: 3, status: "pending", deposit: 150, rent: 390 }
    ];
    const payments = [
      { id: "pay-2401", bookingId: "b-2401", amount: 480, method: "EVC Plus", date: isoDay(-3), type: "Rent payment", status: "confirmed", reference: "EVC-482901" },
      { id: "pay-2402", bookingId: "b-2401", amount: 200, method: "Cash", date: isoDay(-2), type: "Deposit payment", status: "confirmed", reference: "Cash receipt" },
      { id: "pay-2403", bookingId: "b-2404", amount: 232, method: "Bank transfer", date: isoDay(-10), type: "Rent payment", status: "confirmed", reference: "BB-09122" }
    ];
    const maintenance = [
      { id: "m-2401", propertyId: "p-shibis-1", title: "Water heater inspection", priority: "Medium", status: "open", date: isoDay(-1), description: "Tenant reports the heater takes longer than usual." },
      { id: "m-2402", propertyId: "p-hodan-2", title: "Courtyard gate lock", priority: "High", status: "open", date: isoDay(-2), description: "Replace the worn front gate lock." },
      { id: "m-2403", propertyId: "p-waberi-1", title: "Generator service", priority: "Low", status: "completed", date: isoDay(-18), description: "Monthly service completed." }
    ];
    return { properties, owners, customers, bookings, payments, maintenance, settings: { language: "en", role: "admin", currency: "USD" } };
  };

  let state;
  let currentView = "dashboard";
  let globalQuery = "";
  let filters = { area: "", type: "", status: "" };
  let toastTimer;
  let memoryOnly = false;

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return seedData();
      const parsed = JSON.parse(stored);
      if (!parsed || !Array.isArray(parsed.properties) || !Array.isArray(parsed.bookings)) throw new Error("The saved workspace has an invalid structure.");
      parsed.owners ||= [];
      parsed.customers ||= [];
      parsed.payments ||= [];
      parsed.maintenance ||= [];
      parsed.settings = { language: "en", role: "admin", currency: "USD", ...parsed.settings };
      return parsed;
    } catch (error) {
      console.error("RentX could not read saved workspace data.", error);
      memoryOnly = true;
      return seedData();
    }
  }
  function saveState() {
    if (memoryOnly) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      memoryOnly = true;
      console.error("RentX could not save workspace data.", error);
      flash("Storage is unavailable; changes will not persist after reload.");
    }
  }
  function lang() { return state.settings.language === "so" ? "so" : "en"; }
  function t(key) { return lang() === "so" ? (WORDS[key] || key) : key; }
  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }
  function money(value) {
    const currency = state.settings.currency || "USD";
    try {
      return new Intl.NumberFormat(lang() === "so" ? "so-SO" : "en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(Number(value) || 0);
    } catch {
      return `${currency} ${Math.round(Number(value) || 0)}`;
    }
  }
  function formatDate(value, options = {}) {
    if (!value) return "—";
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.valueOf()) ? esc(value) : new Intl.DateTimeFormat(lang() === "so" ? "so-SO" : "en-GB", { day: "numeric", month: "short", ...options }).format(date);
  }
  function monthName(value) {
    return new Intl.DateTimeFormat(lang() === "so" ? "so-SO" : "en", { month: "short" }).format(new Date(`${value}-01T00:00:00`));
  }
  function flash(message) {
    const root = document.getElementById("toast-root");
    if (!root) return;
    root.innerHTML = `<div class="toast">${esc(t(message))}</div>`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { root.innerHTML = ""; }, 3200);
  }
  function propertyById(id) { return state.properties.find((property) => property.id === id); }
  function tenantById(id) { return state.customers.find((customer) => customer.id === id); }
  function bookingById(id) { return state.bookings.find((booking) => booking.id === id); }
  function paymentById(id) { return state.payments.find((payment) => payment.id === id); }
  function isUtilityBill(payment) { return UTILITY_BILL_TYPES.includes(payment.type); }
  function sumPayments(payments) {
    return payments.filter((payment) => payment.status === "confirmed").reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  }
  function propertyStatus(property) {
    if (property.status === "maintenance") return "maintenance";
    const now = isoDay();
    const current = state.bookings.find((booking) => booking.propertyId === property.id && booking.status === "confirmed" && booking.start <= now && booking.end > now);
    if (current) return "occupied";
    const reserved = state.bookings.find((booking) => booking.propertyId === property.id && booking.status === "confirmed" && booking.start > now);
    if (reserved) return "reserved";
    return "available";
  }
  function statusLabel(status) { return t(status.charAt(0).toUpperCase() + status.slice(1)); }
  function statusPill(status) { return `<span class="status-pill status-${esc(status.toLowerCase())}">${esc(statusLabel(status))}</span>`; }
  function personName(id) { return tenantById(id)?.name || t("Unknown"); }
  function propertyName(id) { return propertyById(id)?.name || t("Unknown"); }
  function isAllowed(view) {
    return NAV_ITEMS.find(([key]) => key === view)?.[4].includes(state.settings.role) ?? state.settings.role === "admin";
  }
  function permissionFor(action) {
    const permitted = {
      property: ["admin", "manager"],
      booking: ["admin", "manager", "receptionist"],
      customer: ["admin", "manager", "receptionist"],
      owner: ["admin", "manager"],
      payment: ["admin", "manager", "finance"],
      maintenance: ["admin", "manager", "receptionist"],
      settings: ["admin"]
    };
    return (permitted[action] || ["admin"]).includes(state.settings.role);
  }
  function renderNav() {
    const nav = document.getElementById("navigation");
    nav.innerHTML = NAV_ITEMS.filter((item) => item[4].includes(state.settings.role))
      .map(([key, icon, english, somali]) => `<a class="nav-link ${currentView === key ? "active" : ""}" href="#" data-view="${key}"><span class="nav-icon">${icon}</span><span>${esc(lang() === "so" ? somali : english)}</span></a>`).join("");
    const roleName = ROLES[state.settings.role]?.[lang() === "so" ? 1 : 0] || "Administrator";
    document.getElementById("role-label").textContent = roleName;
    document.getElementById("page-crumb").textContent = t(NAV_ITEMS.find(([key]) => key === currentView)?.[2] || "Settings");
    document.getElementById("language-toggle").textContent = lang() === "en" ? "SO" : "EN";
    document.getElementById("global-search").placeholder = t("Search properties, tenants…");
    document.documentElement.lang = lang() === "so" ? "so" : "en";
    document.documentElement.classList.toggle("somali", lang() === "so");
  }
  function render() {
    if (!isAllowed(currentView)) currentView = "dashboard";
    renderNav();
    const root = document.getElementById("app-content");
    const renderers = {
      dashboard: renderDashboard, properties: renderProperties, bookings: renderBookings,
      customers: renderCustomers, owners: renderOwners, payments: renderPayments, maintenance: renderMaintenance,
      reports: renderReports, assistant: renderAssistant, settings: renderSettings
    };
    root.innerHTML = (renderers[currentView] || renderDashboard)();
    document.getElementById("global-search").value = globalQuery;
    document.querySelectorAll("[data-i18n]").forEach((element) => { element.textContent = t(element.dataset.i18n); });
  }
  function pageHeading(title, subtitle, actions = "") {
    return `<div class="page-heading"><div><div class="eyebrow">${esc(t("Mogadishu"))} · RENTX</div><h1>${esc(t(title))}</h1><p class="subtitle">${esc(t(subtitle))}</p></div><div class="heading-actions">${actions}</div></div>`;
  }
  function sampleNotice() {
    return `<div class="sample-notice"><strong>${esc(t("Sample workspace"))}.</strong> ${esc(t("Sample data is editable and stored only in this browser."))}</div>`;
  }
  function btn(label, action, icon = "", primary = false, extra = "") {
    return `<button class="button ${primary ? "button-primary" : ""}" data-action="${esc(action)}" ${extra}>${icon ? `<span>${icon}</span>` : ""}${esc(t(label))}</button>`;
  }
  function metricCard(label, value, foot, icon) {
    return `<article class="metric-card"><div class="metric-top"><span>${esc(t(label))}</span><span class="metric-icon">${icon}</span></div><div class="metric-value">${esc(value)}</div><div class="metric-foot">${esc(t(foot))}</div></article>`;
  }
  function bookingRows(bookings, limit = 20) {
    if (!bookings.length) return `<tr><td colspan="5" class="empty-inline">${esc(t("No upcoming bookings"))}</td></tr>`;
    return bookings.slice(0, limit).map((booking) => {
      const property = propertyById(booking.propertyId);
      return `<tr><td><div class="table-primary"><span class="mini-property">⌂</span><div class="primary-copy"><strong>${esc(property?.name || t("Unknown"))}</strong><span>${esc(property?.area || "")}</span></div></div></td><td><strong>${esc(personName(booking.tenantId))}</strong></td><td>${formatDate(booking.start)}</td><td>${formatDate(booking.end)}</td><td>${statusPill(booking.status)}</td></tr>`;
    }).join("");
  }
  function renderDashboard() {
    const properties = state.properties.length;
    const available = state.properties.filter((property) => propertyStatus(property) === "available").length;
    const occupied = state.properties.filter((property) => propertyStatus(property) === "occupied").length;
    const reserved = state.properties.filter((property) => propertyStatus(property) === "reserved").length;
    const maintenanceCount = state.properties.filter((property) => propertyStatus(property) === "maintenance").length;
    const active = state.bookings.filter((booking) => booking.status === "confirmed" && booking.start <= isoDay() && booking.end > isoDay()).length;
    const thisMonth = sumPayments(state.payments.filter((payment) => !isUtilityBill(payment) && monthKey(payment.date) === monthKey(isoDay())));
    const upcoming = state.bookings.filter((booking) => booking.status === "confirmed" && booking.end >= isoDay()).sort((a, b) => a.start.localeCompare(b.start));
    const occupancy = properties ? Math.round(occupied / properties * 100) : 0;
    const dateGreeting = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 17 ? "Good afternoon" : "Good evening";
    const activity = [...state.payments.map((payment) => ({ icon: isUtilityBill(payment) ? "⌁" : "＄", title: `${money(payment.amount)} ${t(isUtilityBill(payment) ? "Utility bill" : "Payment").toLowerCase()}`, detail: `${payment.companyName || payment.method} · ${propertyName(payment.propertyId || bookingById(payment.bookingId)?.propertyId)}`, date: payment.date })),
      ...state.bookings.map((booking) => ({ icon: "▤", title: `${t("Booking")} ${booking.id}`, detail: `${personName(booking.tenantId)} · ${propertyName(booking.propertyId)}`, date: booking.start }))].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
    return `${sampleNotice()}<div class="page-heading"><div><div class="eyebrow">${esc(formatDate(isoDay(), { weekday: "long", year: "numeric" }))} · ${esc(t("Mogadishu"))}</div><h1>${esc(t(dateGreeting))}, RentX 👋</h1><p class="subtitle">${esc(t("Here’s your Mogadishu portfolio at a glance."))}</p></div><div class="heading-actions">${btn("New booking", "new-booking", "+", true)}</div></div>
      <div class="metric-grid">${metricCard("Total properties", properties, "across your portfolio", "⌂")}${metricCard("Available now", available, "ready to book", "⌕")}${metricCard("Active bookings", active, "confirmed stays", "▤")}${metricCard("Revenue this month", money(thisMonth), "from recorded payments", "＄")}</div>
      <div class="dashboard-grid"><section class="panel"><div class="panel-header"><div><h2>${esc(t("Upcoming bookings"))}</h2><p>${esc(t("All upcoming confirmed stays"))}</p></div><button class="text-link" data-view="bookings">${esc(t("View all"))} →</button></div><div class="table-wrap"><table><thead><tr><th>${esc(t("Property"))}</th><th>${esc(t("Tenant"))}</th><th>${esc(t("Check-in"))}</th><th>${esc(t("Check-out"))}</th><th>${esc(t("Status"))}</th></tr></thead><tbody>${bookingRows(upcoming, 5)}</tbody></table></div></section>
      <section class="panel"><div class="panel-header"><div><h2>${esc(t("Recent activity"))}</h2><p>${esc(t("Bookings and recorded payments"))}</p></div><button class="text-link" data-view="payments">${esc(t("View all"))} →</button></div><div class="activity-list">${activity.length ? activity.map((item) => `<div class="activity-item"><span class="activity-dot">${item.icon}</span><div class="activity-copy"><strong>${esc(item.title)}</strong><span>${esc(item.detail)}</span></div><span class="activity-time">${formatDate(item.date)}</span></div>`).join("") : `<div class="empty-state">${esc(t("No activity yet"))}</div>`}</div></section></div>
      <div class="lower-grid"><section class="panel"><div class="panel-header"><div><h2>${esc(t("Occupancy overview"))}</h2><p>${esc(t("Current status across your properties"))}</p></div><button class="text-link" data-view="reports">${esc(t("View all"))} →</button></div><div class="occupancy-summary"><div class="occupancy-title"><span>${esc(t("Occupied"))}</span><strong>${occupancy}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${occupancy}%"></div></div><div class="occupancy-legend"><span><i class="legend-dot"></i>${occupied} ${esc(t("Occupied").toLowerCase())}</span><span><i class="legend-dot reserved-dot"></i>${reserved} ${esc(t("Reserved").toLowerCase())}</span><span><i class="legend-dot muted-dot"></i>${available} ${esc(t("Available").toLowerCase())}</span><span><i class="legend-dot maintenance-dot"></i>${maintenanceCount} ${esc(t("Maintenance").toLowerCase())}</span></div></div></section>
      <section class="panel"><div class="panel-header"><div><h2>${esc(t("Quick actions"))}</h2><p>${esc(t("All actions are stored in this browser."))}</p></div></div><div class="activity-list">${btn("New property", "new-property", "+")} ${btn("Record payment", "new-payment", "＋")} ${btn("New request", "new-maintenance", "＋")}</div></section></div>`;
  }
  function propertiesFiltered() {
    const query = globalQuery.trim().toLowerCase();
    return state.properties.filter((property) => {
      const searchable = `${property.name} ${property.area} ${property.type} ${property.notes || ""}`.toLowerCase();
      return (!query || searchable.includes(query)) && (!filters.area || property.area === filters.area) && (!filters.type || property.type === filters.type) && (!filters.status || propertyStatus(property) === filters.status);
    });
  }
  function renderProperties() {
    const areas = [...new Set(state.properties.map((property) => property.area))].sort();
    const types = [...new Set(state.properties.map((property) => property.type))].sort();
    const cards = propertiesFiltered();
    return `${pageHeading("Properties", "Manage your Mogadishu rental portfolio.", permissionFor("property") ? btn("New property", "new-property", "+", true) : "")}
      ${sampleNotice()}<div class="filters-row"><select class="filter-select" id="filter-area" aria-label="${esc(t("All areas"))}"><option value="">${esc(t("All areas"))}</option>${areas.map((area) => `<option ${filters.area === area ? "selected" : ""}>${esc(area)}</option>`).join("")}</select><select class="filter-select" id="filter-type" aria-label="${esc(t("All types"))}"><option value="">${esc(t("All types"))}</option>${types.map((type) => `<option ${filters.type === type ? "selected" : ""}>${esc(t(type))}</option>`).join("")}</select><select class="filter-select" id="filter-status" aria-label="${esc(t("All statuses"))}"><option value="">${esc(t("All statuses"))}</option>${["available", "reserved", "occupied", "maintenance"].map((status) => `<option value="${status}" ${filters.status === status ? "selected" : ""}>${esc(statusLabel(status))}</option>`).join("")}</select><span class="tag">${cards.length} ${esc(t("Properties").toLowerCase())}</span></div>
      <div class="property-grid">${cards.length ? cards.map((property, index) => `<article class="property-card"><div class="property-art art-${index % 6 + 1}"><span class="art-icon">${property.type === "Hotel unit" ? "▤" : property.type === "Apartment" ? "▥" : property.type === "Building" ? "▦" : "⌂"}</span><span class="art-label">${esc(t(property.type))}</span></div><div class="property-body"><div class="property-title"><div><h3>${esc(property.name)}</h3><span class="property-location">⌖ ${esc(property.area)}, ${esc(t("Mogadishu"))}</span></div>${statusPill(propertyStatus(property))}</div><div class="property-price">${money(property.price)} <span>/ ${esc(t(property.period === "Nightly" ? "per night" : "per month"))}</span></div><div class="property-facts"><span>▣ ${Number(property.bedrooms) || 0} ${esc(t("Bedrooms").toLowerCase())}</span><span>${property.furnished ? esc(t("Furnished")) : esc(t("Unfurnished"))}</span></div><div class="card-actions">${btn("Book stay", `book-property:${property.id}`, "", true)}${permissionFor("property") ? `<button class="button" data-action="edit-property:${property.id}">${esc(t("Edit"))}</button>` : ""}</div></div></article>`).join("") : `<div class="panel empty-state" style="grid-column:1/-1"><strong>${esc(t("No properties found"))}</strong>${esc(t("No matching properties. Try another area, type, or budget."))}${permissionFor("property") ? `<div style="margin-top:13px">${btn("Add your first property", "new-property", "+", true)}</div>` : ""}</div>`}</div>`;
  }
  function renderBookings() {
    const bookings = [...state.bookings].sort((a, b) => b.start.localeCompare(a.start));
    return `${pageHeading("Bookings", "Manage reservations, arrivals, and stays.", permissionFor("booking") ? btn("New booking", "new-booking", "+", true) : "")}${sampleNotice()}
      <section class="panel"><div class="panel-header"><div><h2>${esc(t("Bookings"))}</h2><p>${bookings.length} ${esc(t("booking records"))}</p></div></div><div class="table-wrap"><table><thead><tr><th>${esc(t("Code"))}</th><th>${esc(t("Tenant"))}</th><th>${esc(t("Property / area"))}</th><th>${esc(t("Dates"))}</th><th>${esc(t("Rent"))} & ${esc(t("Deposit"))}</th><th>${esc(t("Status"))}</th><th></th></tr></thead><tbody>${bookings.length ? bookings.map((booking) => `<tr><td><strong>${esc(booking.id.toUpperCase())}</strong></td><td>${esc(personName(booking.tenantId))}</td><td><strong>${esc(propertyName(booking.propertyId))}</strong><br><span style="color:#97a19b;font-size:9px">${esc(propertyById(booking.propertyId)?.area || "")}</span></td><td>${formatDate(booking.start)} – ${formatDate(booking.end)}</td><td>${money(booking.rent)} / ${money(booking.deposit)}</td><td>${statusPill(booking.status)}</td><td><div class="inline-actions"><button class="icon-action" title="${esc(t("Print invoice"))}" data-action="invoice:${booking.id}">▧</button>${permissionFor("booking") ? `${booking.status === "pending" ? `<button class="icon-action" title="${esc(t("Mark confirmed"))}" data-action="confirm-booking:${booking.id}">✓</button>` : ""}${booking.status === "confirmed" ? `<button class="icon-action" title="${esc(t("Cancel booking"))}" data-action="cancel-booking:${booking.id}">×</button>` : ""}${booking.status === "confirmed" && booking.end < isoDay() ? `<button class="icon-action" title="${esc(t("Mark completed"))}" data-action="complete-booking:${booking.id}">✓</button>` : ""}` : ""}</div></td></tr>`).join("") : `<tr><td colspan="7" class="empty-inline">${esc(t("No bookings yet"))}</td></tr>`}</tbody></table></div></section>`;
  }
  function renderCustomers() {
    const query = document.getElementById("customer-search")?.value.toLowerCase() || "";
    const customers = state.customers.filter((customer) => `${customer.name} ${customer.phone} ${customer.email || ""}`.toLowerCase().includes(query));
    return `${pageHeading("Customers", "Keep tenant contacts in one place.", permissionFor("customer") ? btn("Add customer", "new-customer", "+", true) : "")}${sampleNotice()}<div class="filters-row"><input class="filter-select" id="customer-search" type="search" placeholder="${esc(t("Name / phone"))}" value="${esc(query)}"><span class="tag">${customers.length} ${esc(t("Customers").toLowerCase())}</span></div><section class="panel"><div class="table-wrap"><table><thead><tr><th>${esc(t("Name"))}</th><th>${esc(t("Phone number"))}</th><th>${esc(t("Email"))}</th><th>${esc(t("Active bookings"))}</th><th></th></tr></thead><tbody>${customers.length ? customers.map((customer) => {
      const bookings = state.bookings.filter((booking) => booking.tenantId === customer.id && ["confirmed", "pending"].includes(booking.status)).length;
      return `<tr><td><div class="table-primary"><span class="avatar" style="background:#e9f0e9;color:#39704f">${esc(customer.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase())}</span><div class="primary-copy"><strong>${esc(customer.name)}</strong><span>${esc(customer.email || "—")}</span></div></div></td><td>${esc(customer.phone)}</td><td>${esc(customer.email || "—")}</td><td>${bookings}</td><td>${permissionFor("customer") ? `<button class="icon-action" title="${esc(t("Edit"))}" data-action="edit-customer:${customer.id}">✎</button>` : ""}</td></tr>`;
    }).join("") : `<tr><td colspan="5" class="empty-inline">${esc(t("No customers yet"))}</td></tr>`}</tbody></table></div></section>`;
  }
  function renderOwners() {
    return `${pageHeading("Owners", "Landlords and property owners.", permissionFor("owner") ? btn("Add owner", "new-owner", "+", true) : "")}${sampleNotice()}<section class="panel"><div class="panel-header"><div><h2>${esc(t("Owners"))}</h2><p>${esc(t("Landlords and property owners"))}</p></div></div><div class="table-wrap"><table><thead><tr><th>${esc(t("Owner name"))}</th><th>${esc(t("Phone number"))}</th><th>${esc(t("Email"))}</th><th>${esc(t("Linked properties"))}</th><th>${esc(t("Rent collected"))}</th><th></th></tr></thead><tbody>${state.owners.length ? state.owners.map((owner) => {
      const properties = state.properties.filter((property) => property.ownerId === owner.id);
      const propertyIds = new Set(properties.map((property) => property.id));
      const bookingIds = new Set(state.bookings.filter((booking) => propertyIds.has(booking.propertyId)).map((booking) => booking.id));
      const collected = sumPayments(state.payments.filter((payment) => !isUtilityBill(payment) && bookingIds.has(payment.bookingId)));
      return `<tr><td><div class="table-primary"><span class="avatar" style="background:#e9f0e9;color:#39704f">${esc(owner.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase())}</span><div class="primary-copy"><strong>${esc(owner.name)}</strong><span>${properties.length} ${esc(t("Properties").toLowerCase())}</span></div></div></td><td>${esc(owner.phone)}</td><td>${esc(owner.email || "—")}</td><td>${properties.map((property) => esc(property.name)).join(", ") || "—"}</td><td><strong>${money(collected)}</strong></td><td>${permissionFor("owner") ? `<button class="icon-action" title="${esc(t("Edit"))}" data-action="edit-owner:${owner.id}">✎</button>` : ""}</td></tr>`;
    }).join("") : `<tr><td colspan="6" class="empty-inline">${esc(t("No owners yet"))}</td></tr>`}</tbody></table></div></section>`;
  }
  function renderPayments() {
    const payments = [...state.payments].sort((a, b) => b.date.localeCompare(a.date));
    const total = sumPayments(payments.filter((payment) => !isUtilityBill(payment)));
    const utilities = sumPayments(payments.filter(isUtilityBill));
    const utilityCount = payments.filter(isUtilityBill).length;
    const records = payments.length;
    return `${pageHeading("Payments", "Record and review manually confirmed payments.", permissionFor("payment") ? btn("Record payment", "new-payment", "+", true) : "")}
      <div class="notice" style="margin-bottom:15px">${esc(t("EVC Plus / bank / cash entries are manual records only."))}</div>
      <div class="notice" style="margin-bottom:15px">${esc(t("Water supply company, electricity, cleaning, and security bills are tracked as property expenses."))}</div>
      <div class="metric-grid">${metricCard("Total collected", money(total), "from recorded payments", "＄")}${metricCard("Utility expenses", money(utilities), `${utilityCount} ${t("Utility bills").toLowerCase()}`, "⌁")}${metricCard("Payment records", records, "Rent & deposit", "▤")}${metricCard("Payment method", new Set(payments.map((item) => item.method)).size, "methods used", "↗")}</div>
      <section class="panel"><div class="panel-header"><div><h2>${esc(t("Payments"))}</h2><p>${esc(t("All actions are stored in this browser."))}</p></div></div><div class="table-wrap"><table><thead><tr><th>${esc(t("Date"))}</th><th>${esc(t("Tenant / company"))}</th><th>${esc(t("Booking / property"))}</th><th>${esc(t("Type"))}</th><th>${esc(t("Method"))}</th><th>${esc(t("Amount (USD)").replace("USD", state.settings.currency))}</th><th>${esc(t("Status"))}</th><th></th></tr></thead><tbody>${payments.length ? payments.map((payment) => {
        const booking = bookingById(payment.bookingId);
        const utility = isUtilityBill(payment);
        const property = propertyById(payment.propertyId || booking?.propertyId);
        const counterparty = utility ? payment.companyName || t("Unknown") : personName(booking?.tenantId);
        const reference = utility ? property?.name || t("Unknown") : booking?.id?.toUpperCase() || "—";
        return `<tr><td>${formatDate(payment.date, { year: "numeric" })}</td><td>${esc(counterparty)}</td><td><strong>${esc(reference)}</strong></td><td>${esc(t(payment.type))}</td><td>${esc(t(payment.method))}</td><td><strong>${money(payment.amount)}</strong></td><td>${statusPill(payment.status)}</td><td><button class="icon-action" title="${esc(t("Print receipt"))}" data-action="receipt:${payment.id}">▧</button></td></tr>`;
      }).join("") : `<tr><td colspan="8" class="empty-inline">${esc(t("No payments yet"))}</td></tr>`}</tbody></table></div></section>`;
  }
  function renderMaintenance() {
    const items = [...state.maintenance].sort((a, b) => b.date.localeCompare(a.date));
    return `${pageHeading("Maintenance", "Track repairs and property issues.", permissionFor("maintenance") ? btn("New request", "new-maintenance", "+", true) : "")}${sampleNotice()}<section class="panel"><div class="panel-header"><div><h2>${esc(t("Maintenance"))}</h2><p>${items.filter((item) => item.status === "open").length} ${esc(t("Open").toLowerCase())}</p></div></div><div class="table-wrap"><table><thead><tr><th>${esc(t("Maintenance title"))}</th><th>${esc(t("Property"))}</th><th>${esc(t("Date"))}</th><th>${esc(t("Priority"))}</th><th>${esc(t("Status"))}</th><th></th></tr></thead><tbody>${items.length ? items.map((item) => `<tr><td><strong>${esc(item.title)}</strong><br><span style="color:#96a19a;font-size:9px">${esc(item.description || "")}</span></td><td>${esc(propertyName(item.propertyId))}</td><td>${formatDate(item.date, { year: "numeric" })}</td><td>${statusPill(item.priority.toLowerCase())}</td><td>${statusPill(item.status)}</td><td>${permissionFor("maintenance") && item.status !== "completed" ? `<button class="icon-action" title="${esc(t("Mark completed"))}" data-action="complete-maintenance:${item.id}">✓</button>` : ""}</td></tr>`).join("") : `<tr><td colspan="6" class="empty-inline">${esc(t("No maintenance requests"))}</td></tr>`}</tbody></table></div></section>`;
  }
  function lastSixMonths() {
    return Array.from({ length: 6 }, (_, index) => {
      const date = new Date();
      date.setDate(1);
      date.setMonth(date.getMonth() - (5 - index));
      return date.toISOString().slice(0, 7);
    });
  }
  function renderReports() {
    const months = lastSixMonths();
    const revenue = months.map((month) => sumPayments(state.payments.filter((payment) => !isUtilityBill(payment) && monthKey(payment.date) === month)));
    const max = Math.max(...revenue, 1);
    const occupiedCount = state.properties.filter((property) => propertyStatus(property) === "occupied").length;
    const reservedCount = state.properties.filter((property) => propertyStatus(property) === "reserved").length;
    const maintenanceCount = state.properties.filter((property) => propertyStatus(property) === "maintenance").length;
    const occupancy = state.properties.length ? Math.round(occupiedCount / state.properties.length * 100) : 0;
    const total = sumPayments(state.payments.filter((payment) => !isUtilityBill(payment)));
    const utilityExpenses = sumPayments(state.payments.filter(isUtilityBill));
    const collected = state.bookings.reduce((sum, booking) => sum + sumPayments(state.payments.filter((payment) => !isUtilityBill(payment) && payment.bookingId === booking.id)), 0);
    const due = state.bookings.filter((booking) => ["confirmed", "pending"].includes(booking.status)).reduce((sum, booking) => sum + Math.max(0, Number(booking.rent) + Number(booking.deposit) - state.payments.filter((payment) => payment.bookingId === booking.id && payment.status === "confirmed").reduce((sub, payment) => sub + Number(payment.amount), 0)), 0);
    const rate = collected + due ? Math.round(collected / (collected + due) * 100) : 0;
    const types = ["Building", "Apartment", "Furnished home", "Hotel unit"];
    return `${pageHeading("Reports", "Understand occupancy and recorded rental income.", btn("Export CSV", "export-report", "⇩"))}<div class="report-grid"><section class="panel chart-panel"><div class="panel-header"><div><h2>${esc(t("Monthly revenue"))}</h2><p>${esc(t("Last six months"))} · ${esc(state.settings.currency)}</p></div></div><div class="chart-bars">${months.map((month, index) => `<div class="chart-col"><span class="chart-value">${revenue[index] ? esc(money(revenue[index])) : "—"}</span><div class="chart-bar" style="height:${Math.max(3, Math.round(revenue[index] / max * 76))}%"></div><span>${esc(monthName(month))}</span></div>`).join("")}</div><div class="report-kpis"><div class="report-kpi"><span>${esc(t("Total collected"))}</span><strong>${esc(money(total))}</strong></div><div class="report-kpi"><span>${esc(t("Utility expenses"))}</span><strong>${esc(money(utilityExpenses))}</strong></div><div class="report-kpi"><span>${esc(t("Collection rate"))}</span><strong>${rate}%</strong></div></div></section>
      <section class="panel chart-panel"><div class="panel-header"><div><h2>${esc(t("Occupancy report"))}</h2><p>${esc(t("Current status across your properties"))}</p></div></div><div class="occupancy-summary"><div class="occupancy-title"><span>${esc(t("Occupancy"))}</span><strong>${occupancy}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${occupancy}%"></div></div><div class="report-kpis" style="padding:17px 0 0"><div class="report-kpi"><span>${esc(t("Total properties"))}</span><strong>${state.properties.length}</strong></div><div class="report-kpi"><span>${esc(t("Occupied"))}</span><strong>${occupiedCount}</strong></div><div class="report-kpi"><span>${esc(t("Reserved"))}</span><strong>${reservedCount}</strong></div><div class="report-kpi"><span>${esc(t("Available now"))}</span><strong>${state.properties.filter((property) => propertyStatus(property) === "available").length}</strong></div><div class="report-kpi"><span>${esc(t("Maintenance"))}</span><strong>${maintenanceCount}</strong></div></div></div></section></div>
      <section class="panel" style="margin-top:15px"><div class="panel-header"><div><h2>${esc(t("Portfolio breakdown"))}</h2><p>${esc(t("Properties"))}</p></div></div><div class="table-wrap"><table><thead><tr><th>${esc(t("Type"))}</th><th>${esc(t("Properties"))}</th><th>${esc(t("Available now"))}</th><th>${esc(t("Occupancy"))}</th><th>${esc(t("Monthly income"))}</th></tr></thead><tbody>${types.map((type) => { const group = state.properties.filter((property) => property.type === type); const free = group.filter((property) => propertyStatus(property) === "available").length; const occupied = group.filter((property) => propertyStatus(property) === "occupied").length; const income = group.reduce((sum, property) => sum + (property.period === "Monthly" && propertyStatus(property) === "occupied" ? property.price : 0), 0); return `<tr><td><strong>${esc(t(type))}</strong></td><td>${group.length}</td><td>${free}</td><td>${group.length ? Math.round(occupied / group.length * 100) : 0}%</td><td>${esc(money(income))}</td></tr>`; }).join("")}</tbody></table></div></section>`;
  }
  function renderAssistant() {
    return `${pageHeading("RentX Assistant", "Ask about your rentals or find a place to stay.")}<div class="assistant-hero"><div><div class="eyebrow" style="color:#c9e475">${esc(t("Local assistant"))} · ${esc(t("Rule-based assistant"))}</div><h2>${esc(t("How can I help?"))}</h2><p>${esc(t("RentX runs here using local rules. It can search this workspace and summarize its records; it does not contact an AI service."))}</p></div><div class="assistant-orb">✳</div></div><div class="assistant-layout" style="margin-top:15px"><section class="panel assistant-panel"><div class="panel-header"><div><h2>${esc(t("RentX Assistant"))}</h2><p>${esc(t("Local assistant"))} · ${esc(t("All actions are stored in this browser."))}</p></div><span class="online-dot"></span></div><div id="chat-messages" class="chat-messages"><div class="chat-message">${esc(t("Tell me what you need"))}<br><br>${esc(t("Try asking…"))}</div></div><form id="assistant-form" class="chat-form"><input name="message" placeholder="${esc(t("Ask RentX…"))}" required autocomplete="off"><button class="button button-primary" aria-label="${esc(t("Send"))}">↑</button></form></section><aside><div class="panel" style="padding:15px"><div class="eyebrow">${esc(t("Search rentals"))}</div><h2 style="font:700 14px Manrope,sans-serif;margin:0">${esc(t("Find a place to stay"))}</h2><div class="suggestions"><button class="suggestion" data-prompt="Find a furnished apartment in Hodan under $500">${esc(t("Find a furnished apartment in Hodan under $500"))}</button><button class="suggestion" data-prompt="How is occupancy looking?">${esc(t("How is occupancy looking?"))}</button><button class="suggestion" data-prompt="Summarize this month’s revenue">${esc(t("Summarize this month’s revenue"))}</button><button class="suggestion" data-prompt="Analyze my property portfolio">${esc(t("Analyze my property portfolio"))}</button></div></div></aside></div>`;
  }
  function renderSettings() {
    return `${pageHeading("Settings", "Manage local preferences and preview permissions.")}${sampleNotice()}<div class="settings-grid"><section class="panel settings-card"><h2>${esc(t("Language"))}</h2><p>${esc(t("Choose the language used across this browser."))}</p><div class="settings-row"><span>${esc(t("Language"))}</span><select class="filter-select" id="setting-language"><option value="en" ${lang() === "en" ? "selected" : ""}>English</option><option value="so" ${lang() === "so" ? "selected" : ""}>Soomaali</option></select></div><div class="settings-row"><span>${esc(t("Default currency"))}</span><select class="filter-select" id="setting-currency">${["USD", "SOS", "KES"].map((currency) => `<option ${state.settings.currency === currency ? "selected" : ""}>${currency}</option>`).join("")}</select></div><div class="notice">${esc(t("Currency selection changes formatting only; no exchange conversion is applied."))}</div></section><section class="panel settings-card"><h2>${esc(t("Role & permissions"))}</h2><p>${esc(t("Role preview only — not authentication or data security."))}</p><div class="settings-row"><span>${esc(t("Demo role preview"))}</span><select class="filter-select" id="setting-role">${Object.entries(ROLES).map(([key, label]) => `<option value="${key}" ${state.settings.role === key ? "selected" : ""}>${esc(label[lang() === "so" ? 1 : 0])}</option>`).join("")}</select></div><div class="notice">${esc(t("This changes visible actions only."))}</div></section><section class="panel settings-card"><h2>${esc(t("Local storage only"))}</h2><p>${esc(t("This local preview stores data in this browser only."))}</p><div class="settings-row"><span>${esc(t("Sample data is editable and stored only in this browser."))}</span><span class="tag">localStorage</span></div><div class="settings-row"><span>${esc(t("Not a real payment integration"))}</span><span class="tag">EVC / Bank / Cash</span></div><div class="settings-row"><span>${esc(t("Not connected to an AI provider"))}</span><span class="tag">local rules</span></div></section><section class="panel settings-card"><h2>${esc(t("Reset sample workspace"))}</h2><p>${esc(t("Resetting removes local edits and restores the starter dataset."))}</p>${btn("Reset workspace", "reset-workspace", "↺")}</section></div>`;
  }

  function field(label, name, value = "", type = "text", required = true, extra = "") {
    const localizedLabel = t(label).replace("USD", state.settings.currency);
    const control = type === "textarea" ? `<textarea class="field-control" name="${esc(name)}" ${required ? "required" : ""} ${extra}>${esc(value)}</textarea>` :
      `<input class="field-control" name="${esc(name)}" type="${esc(type)}" value="${esc(value)}" ${required ? "required" : ""} ${extra}>`;
    return `<div class="field"><label for="field-${esc(name)}">${esc(localizedLabel)}</label>${control.replace(`name="${esc(name)}"`, `id="field-${esc(name)}" name="${esc(name)}"`)}</div>`;
  }
  function selectField(label, name, options, selected, required = true) {
    const localizedLabel = t(label).replace("USD", state.settings.currency);
    return `<div class="field"><label for="field-${esc(name)}">${esc(localizedLabel)}</label><select class="field-control" id="field-${esc(name)}" name="${esc(name)}" ${required ? "required" : ""}>${options.map(([value, text]) => `<option value="${esc(value)}" ${value === selected ? "selected" : ""}>${esc(t(text))}</option>`).join("")}</select></div>`;
  }
  function openModal(kind, id = "", initialPropertyId = "") {
    if (kind === "property" && !permissionFor("property") || kind === "booking" && !permissionFor("booking") || kind === "customer" && !permissionFor("customer") || kind === "owner" && !permissionFor("owner") || kind === "payment" && !permissionFor("payment") || kind === "maintenance" && !permissionFor("maintenance")) {
      flash("You do not have permission for this action.");
      return;
    }
    const root = document.getElementById("modal-root");
    const existing = kind === "property" ? propertyById(id) : kind === "customer" ? tenantById(id) : kind === "owner" ? state.owners.find((owner) => owner.id === id) : null;
    let title = "", fields = "";
    if (kind === "property") {
      title = existing ? "Edit property" : "New property";
      fields = `${field("Property name", "name", existing?.name || "")}${field("Area", "area", existing?.area || "")}${selectField("Property type", "type", [["Building", "Building"], ["Apartment", "Apartment"], ["Furnished home", "Furnished home"], ["Hotel unit", "Hotel unit"]], existing?.type || "Apartment")}${field("Bedrooms", "bedrooms", existing?.bedrooms ?? 1, "number", true, 'min="0" max="20"')}${field("Price (USD)", "price", existing?.price || "", "number", true, 'min="0" step="1"')}${selectField("Type", "period", [["Monthly", "Monthly"], ["Nightly", "Nightly"]], existing?.period || "Monthly")}${selectField("Furnishing", "furnished", [["true", "Furnished"], ["false", "Unfurnished"]], String(existing?.furnished ?? true))}${selectField("Status", "status", [["available", "Available"], ["maintenance", "Maintenance"]], existing?.status === "maintenance" ? "maintenance" : "available")}${selectField("Property owner", "ownerId", [["", "Unassigned"], ...state.owners.map((owner) => [owner.id, owner.name])], existing?.ownerId || "", false)}${field("Notes", "notes", existing?.notes || "", "textarea", false)}`;
    } else if (kind === "customer") {
      title = existing ? "Edit customer" : "Add customer";
      fields = `${field("Tenant name", "name", existing?.name || "")}${field("Phone number", "phone", existing?.phone || "", "tel")}${field("Email", "email", existing?.email || "", "email", false)}`;
    } else if (kind === "owner") {
      title = existing ? "Edit owner" : "Add owner";
      fields = `${field("Owner name", "name", existing?.name || "")}${field("Phone number", "phone", existing?.phone || "", "tel")}${field("Email", "email", existing?.email || "", "email", false)}`;
    } else if (kind === "booking") {
      title = "New booking";
      const candidates = state.properties.filter((property) => property.status !== "maintenance");
      const tenants = state.customers;
      fields = candidates.length ? tenants.length ? `${selectField("Select property", "propertyId", candidates.map((property) => [property.id, `${property.name} · ${property.area} · ${money(property.price)}`]), initialPropertyId || candidates[0].id)}${selectField("Select tenant", "tenantId", tenants.map((tenant) => [tenant.id, `${tenant.name} · ${tenant.phone}`]), tenants[0]?.id || "")}${field("Start date", "start", isoDay(), "date")}${field("End date", "end", isoDay(30), "date")}${field("Guests", "guests", 1, "number", true, 'min="1" max="30"')}${field("Deposit (USD)", "deposit", 0, "number", true, 'min="0" step="1"')}` : `<div class="notice">${esc(t("Add your first customer"))}</div>` : `<div class="notice">${esc(t("No available properties found"))}</div>`;
    } else if (kind === "payment") {
      title = "Record payment";
      const bookings = state.bookings.filter((booking) => ["confirmed", "pending"].includes(booking.status));
      const utilityOptions = UTILITY_BILL_TYPES.map((type) => [type, type]);
      fields = `${selectField("Payment type", "type", [["Rent payment", "Rent payment"], ["Deposit payment", "Deposit payment"], ...utilityOptions], "Rent payment")}
        <div class="field full payment-rental-fields">${bookings.length ? selectField("Booking reference", "bookingId", bookings.map((booking) => [booking.id, `${personName(booking.tenantId)} · ${propertyName(booking.propertyId)} · ${booking.id.toUpperCase()}`]), bookings[0].id) : `<div class="notice">${esc(t("No bookings available"))}</div>`}</div>
        <div class="field full payment-utility-fields" hidden>${selectField("Property / building", "propertyId", state.properties.map((property) => [property.id, `${property.name} · ${property.area}`]), state.properties[0]?.id || "")}${field("Supplier / company", "companyName", "", "text", true)}</div>
        ${field("Amount (USD)", "amount", "", "number", true, 'min="0.01" step="0.01"')}
        ${selectField("Payment method", "method", [["EVC Plus", "EVC Plus"], ["Bank transfer", "Bank transfer"], ["Cash", "Cash"]], "EVC Plus")}
        ${field("Payment date", "date", isoDay(), "date")}${field("Reference / note", "reference", "", "text", false)}
        <div class="field full"><div class="notice">${esc(t("EVC Plus / bank / cash entries are manual records only."))}</div></div>`;
    } else if (kind === "maintenance") {
      title = "New request";
      fields = `${selectField("Property", "propertyId", state.properties.map((property) => [property.id, `${property.name} · ${property.area}`]), state.properties[0]?.id || "")}${field("Maintenance title", "title", "")}${selectField("Priority", "priority", [["Low", "Low"], ["Medium", "Medium"], ["High", "High"]], "Medium")}${field("Date", "date", isoDay(), "date")}${field("Description", "description", "", "textarea", false)}`;
    }
    root.innerHTML = `<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-header"><h2 id="modal-title">${esc(t(title))}</h2><button type="button" class="icon-button" data-action="close-modal" aria-label="${esc(t("Close"))}">×</button></div><form id="modal-form" data-kind="${esc(kind)}" data-id="${esc(id)}" class="modal-body"><div class="form-error" id="form-error"></div><div class="form-grid">${fields}</div><div class="modal-footer"><button type="button" class="button" data-action="close-modal">${esc(t("Cancel"))}</button><button class="button button-primary" type="submit">${esc(t(existing ? "Save changes" : "Save"))}</button></div></form></section></div>`;
    root.querySelector(".modal-backdrop").addEventListener("click", (event) => { if (event.target === event.currentTarget) closeModal(); });
    root.querySelector("form")?.addEventListener("submit", submitModal);
    root.querySelector('[name="type"]')?.addEventListener("change", (event) => setPaymentTypeFields(root.querySelector("form"), event.target.value));
    if (kind === "payment") setPaymentTypeFields(root.querySelector("form"), root.querySelector('[name="type"]').value);
    root.querySelector(".modal")?.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });
    root.querySelector("input,select,textarea")?.focus();
  }
  function setPaymentTypeFields(form, type) {
    if (!form) return;
    const utility = UTILITY_BILL_TYPES.includes(type);
    for (const [selector, visible] of [[".payment-rental-fields", !utility], [".payment-utility-fields", utility]]) {
      const group = form.querySelector(selector);
      if (!group) continue;
      group.hidden = !visible;
      group.querySelectorAll("input,select,textarea").forEach((control) => { control.disabled = !visible; });
    }
  }
  function closeModal() { document.getElementById("modal-root").innerHTML = ""; }
  function formError(message) {
    const error = document.getElementById("form-error");
    if (error) { error.textContent = t(message); error.classList.add("visible"); }
  }
  function submitModal(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const kind = form.dataset.kind;
    const existingId = form.dataset.id;
    if (kind === "property") {
      const property = { id: existingId || makeId("p"), name: data.name.trim(), area: data.area.trim(), type: data.type, bedrooms: Number(data.bedrooms), price: Number(data.price), period: data.period, furnished: data.furnished === "true", ownerId: data.ownerId || "", status: data.status, notes: data.notes.trim() };
      if (!property.name || !property.area || property.price < 0 || !Number.isFinite(property.price)) return formError("Enter a valid property name, area, and price.");
      if (existingId) state.properties = state.properties.map((item) => item.id === existingId ? property : item);
      else state.properties.unshift(property);
      flash("Property saved");
    } else if (kind === "customer") {
      const customer = { id: existingId || makeId("t"), name: data.name.trim(), phone: data.phone.trim(), email: data.email.trim() };
      if (!customer.name || !customer.phone) return formError("Enter a customer name and phone number.");
      if (existingId) state.customers = state.customers.map((item) => item.id === existingId ? customer : item);
      else state.customers.unshift(customer);
      flash("Customer saved");
    } else if (kind === "owner") {
      const owner = { id: existingId || makeId("o"), name: data.name.trim(), phone: data.phone.trim(), email: data.email.trim() };
      if (!owner.name || !owner.phone) return formError("Enter an owner name and phone number.");
      if (existingId) state.owners = state.owners.map((item) => item.id === existingId ? owner : item);
      else state.owners.unshift(owner);
      flash("Changes saved");
    } else if (kind === "booking") {
      const property = propertyById(data.propertyId);
      if (!property || !tenantById(data.tenantId)) return formError("Choose a valid property and customer.");
      if (data.start < isoDay() || data.end <= data.start) return formError("Choose a start date today or later and an end date after it.");
      if (property.status === "maintenance") return formError("This property is marked for maintenance.");
      const conflict = state.bookings.some((booking) => booking.propertyId === property.id && booking.status === "confirmed" && data.start < booking.end && data.end > booking.start);
      if (conflict) return formError("These dates overlap a confirmed booking. Choose different dates.");
      const booking = { id: makeId("b"), propertyId: property.id, tenantId: data.tenantId, start: data.start, end: data.end, guests: Number(data.guests), status: "confirmed", deposit: Number(data.deposit) || 0, rent: property.period === "Nightly" ? property.price * Math.max(1, Math.ceil((new Date(data.end) - new Date(data.start)) / 86400000)) : property.price };
      state.bookings.unshift(booking);
      flash("Booking saved");
    } else if (kind === "payment") {
      const utility = UTILITY_BILL_TYPES.includes(data.type);
      const booking = utility ? null : bookingById(data.bookingId);
      const property = utility ? propertyById(data.propertyId) : propertyById(booking?.propertyId);
      if (!utility && !booking || utility && !property) return formError(utility ? "Property is required for a utility bill." : "Choose a booking and enter a valid amount.");
      if (utility && !data.companyName?.trim()) return formError("Enter the supplier or company name for this bill.");
      if (!Number.isFinite(Number(data.amount)) || Number(data.amount) <= 0) return formError("Choose a booking and enter a valid amount.");
      state.payments.unshift({
        id: makeId("pay"), bookingId: booking?.id || "", propertyId: property?.id || "",
        companyName: utility ? data.companyName.trim() : "", amount: Number(data.amount),
        method: data.method, date: data.date, type: data.type, status: "confirmed", reference: data.reference.trim()
      });
      flash("Payment recorded");
    } else if (kind === "maintenance") {
      if (!propertyById(data.propertyId) || !data.title.trim()) return formError("Choose a property and enter a request title.");
      state.maintenance.unshift({ id: makeId("m"), propertyId: data.propertyId, title: data.title.trim(), priority: data.priority, date: data.date, description: data.description.trim(), status: "open" });
      flash("Maintenance request saved");
    }
    saveState();
    closeModal();
    render();
  }
  function updateBooking(id, status) {
    const booking = bookingById(id);
    if (!booking || !permissionFor("booking")) return;
    if (status === "confirmed") {
      const conflict = state.bookings.some((other) => other.id !== id && other.propertyId === booking.propertyId && other.status === "confirmed" && booking.start < other.end && booking.end > other.start);
      if (conflict) return flash("These dates overlap a confirmed booking. Resolve the conflict before confirming.");
    }
    booking.status = status;
    saveState();
    render();
    flash("Changes saved");
  }
  function printReceipt(id) {
    const payment = paymentById(id);
    if (!payment) return;
    const booking = bookingById(payment.bookingId);
    const utility = isUtilityBill(payment);
    const property = propertyById(payment.propertyId || booking?.propertyId);
    const printWindow = window.open("", "_blank", "width=700,height=700");
    if (!printWindow) return flash("Allow pop-ups to print this receipt.");
    const content = `<!doctype html><html><head><meta charset="utf-8"><title>RentX receipt ${esc(payment.id)}</title><style>body{font:15px Arial,sans-serif;color:#1d3329;margin:48px auto;max-width:640px;padding:0 28px}header{border-bottom:2px solid #176b52;padding-bottom:18px}h1{font-size:25px;margin:0 0 4px}small{color:#758179}.receipt{margin:28px 0}.row{display:flex;justify-content:space-between;gap:24px;padding:12px 0;border-bottom:1px solid #e8ede9}.row span{color:#758179}.total{font-size:20px;font-weight:bold}.notice{margin-top:25px;padding:12px;background:#f4f7f2;color:#667569;font-size:12px}</style></head><body><header><h1>RentX <span style="color:#176b52">.so</span></h1><small>${utility ? "UTILITY BILL PAYMENT RECORD" : "PAYMENT RECEIPT"} · MOGADISHU</small></header><div class="receipt"><div class="row"><span>Receipt number</span><strong>${esc(payment.id.toUpperCase())}</strong></div><div class="row"><span>${utility ? "Supplier / company" : "Tenant"}</span><strong>${esc(utility ? payment.companyName : personName(booking?.tenantId))}</strong></div><div class="row"><span>Property</span><strong>${esc(property?.name || "—")}</strong></div>${utility ? "" : `<div class="row"><span>Booking</span><strong>${esc((payment.bookingId || "").toUpperCase())}</strong></div>`}<div class="row"><span>Payment type</span><strong>${esc(payment.type)}</strong></div><div class="row"><span>Method</span><strong>${esc(payment.method)}</strong></div><div class="row"><span>Date</span><strong>${esc(payment.date)}</strong></div><div class="row"><span>Reference</span><strong>${esc(payment.reference || "—")}</strong></div><div class="row total"><span>${utility ? "Expense amount" : "Amount received"}</span><strong>${esc(money(payment.amount))}</strong></div></div><p class="notice">${utility ? "This is a manually recorded utility-bill payment, not a payment-provider confirmation." : "This receipt reflects a manual payment record. It does not confirm settlement with a payment provider."}</p><script>window.onload=()=>window.print()<\/script></body></html>`;
    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
  }
  function printInvoice(id) {
    const booking = bookingById(id);
    if (!booking) return;
    const paymentTotal = sumPayments(state.payments.filter((payment) => !isUtilityBill(payment) && payment.bookingId === id));
    const due = Math.max(0, Number(booking.rent) + Number(booking.deposit) - paymentTotal);
    const printWindow = window.open("", "_blank", "width=700,height=700");
    if (!printWindow) return flash("Allow pop-ups to print this invoice.");
    const content = `<!doctype html><html><head><meta charset="utf-8"><title>RentX invoice ${esc(booking.id)}</title><style>body{font:15px Arial,sans-serif;color:#1d3329;margin:48px auto;max-width:640px;padding:0 28px}header{border-bottom:2px solid #176b52;padding-bottom:18px}h1{font-size:25px;margin:0 0 4px}small{color:#758179}.receipt{margin:28px 0}.row{display:flex;justify-content:space-between;gap:24px;padding:12px 0;border-bottom:1px solid #e8ede9}.row span{color:#758179}.total{font-size:20px;font-weight:bold}.notice{margin-top:25px;padding:12px;background:#f4f7f2;color:#667569;font-size:12px}</style></head><body><header><h1>RentX <span style="color:#176b52">.so</span></h1><small>RENTAL INVOICE · MOGADISHU</small></header><div class="receipt"><div class="row"><span>Invoice number</span><strong>${esc(booking.id.toUpperCase())}</strong></div><div class="row"><span>Tenant</span><strong>${esc(personName(booking.tenantId))}</strong></div><div class="row"><span>Property</span><strong>${esc(propertyName(booking.propertyId))}</strong></div><div class="row"><span>Owner</span><strong>${esc(state.owners.find((owner) => owner.id === propertyById(booking.propertyId)?.ownerId)?.name || "—")}</strong></div><div class="row"><span>Stay dates</span><strong>${esc(booking.start)} — ${esc(booking.end)}</strong></div><div class="row"><span>Rent</span><strong>${esc(money(booking.rent))}</strong></div><div class="row"><span>Deposit</span><strong>${esc(money(booking.deposit))}</strong></div><div class="row"><span>Payments recorded</span><strong>${esc(money(paymentTotal))}</strong></div><div class="row total"><span>Balance due</span><strong>${esc(money(due))}</strong></div></div><p class="notice">This invoice is generated from the booking record in this browser; it is not a tax invoice or payment confirmation.</p><script>window.onload=()=>window.print()<\/script></body></html>`;
    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
  }
  function exportReport() {
    const headers = ["record_type", "id", "date", "property", "counterparty", "area", "amount", "status", "payment_method", "category", "reference"];
    const rows = [...state.bookings.map((booking) => ["booking", booking.id, booking.start, propertyName(booking.propertyId), personName(booking.tenantId), propertyById(booking.propertyId)?.area || "", booking.rent, booking.status, ""]),
      ...state.payments.map((payment) => {
        const booking = bookingById(payment.bookingId);
        const property = propertyById(payment.propertyId || booking?.propertyId);
        return [isUtilityBill(payment) ? "utility_expense" : "payment", payment.id, payment.date, property?.name || "", isUtilityBill(payment) ? payment.companyName || "" : personName(booking?.tenantId), property?.area || "", payment.amount, payment.status, payment.method, payment.type, payment.reference || ""];
      })];
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rentx-report-${isoDay()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    flash("CSV exported");
  }

  function assistantAnswer(message) {
    const normalized = message.toLowerCase();
    if (/occup|مستأجر|deganaansho/.test(normalized)) {
      const total = state.properties.length;
      const occupied = state.properties.filter((property) => propertyStatus(property) === "occupied").length;
      const booked = state.properties.filter((property) => propertyStatus(property) === "reserved").length;
      return `${t("Occupancy")}: ${total ? Math.round(occupied / total * 100) : 0}% currently occupied (${occupied}/${total}). ${booked} more ${t("Properties").toLowerCase()} have future confirmed bookings, and ${total - occupied - booked} are otherwise available.`;
    }
    if (/revenue|income|dakhl|lacag/.test(normalized)) {
      const rentalPayments = state.payments.filter((payment) => !isUtilityBill(payment));
      const thisMonth = sumPayments(rentalPayments.filter((payment) => monthKey(payment.date) === monthKey(isoDay())));
      const recorded = sumPayments(rentalPayments);
      const utilityExpenses = sumPayments(state.payments.filter(isUtilityBill));
      const methodTotals = Object.entries(rentalPayments.filter((payment) => payment.status === "confirmed").reduce((totals, payment) => { totals[payment.method] = (totals[payment.method] || 0) + Number(payment.amount); return totals; }, {})).map(([method, amount]) => `${method}: ${money(amount)}`).join(" · ") || "—";
      return `${t("Revenue this month")}: ${money(thisMonth)}. ${t("Total collected")}: ${money(recorded)}. ${t("Utility expenses")}: ${money(utilityExpenses)}.\n${methodTotals}\n${t("EVC Plus / bank / cash entries are manual records only.")}`;
    }
    const budgetMatch = normalized.match(/(?:under|below|less than|max(?:imum)?|ka yar|wax ka yar)\s*\$?\s*([\d,]+)/);
    const budget = budgetMatch ? Number(budgetMatch[1].replace(/,/g, "")) : null;
    const area = state.properties.map((property) => property.area).sort((a, b) => b.length - a.length).find((name) => normalized.includes(name.toLowerCase())) || "";
    const wantsFurnished = /furnished|qalab|qalabaysan/.test(normalized);
    const type = normalized.includes("hotel") ? "Hotel unit" : normalized.includes("apartment") || normalized.includes("dabaq") ? "Apartment" : normalized.includes("building") || normalized.includes("dhisme") ? "Building" : normalized.includes("home") || normalized.includes("house") ? "Furnished home" : "";
    const searchIntent = /find|search|place|rental|stay|apartment|home|house|hotel|raadi|guri|degto/.test(normalized);
    if (searchIntent) {
      const tokens = normalized.split(/[^a-z0-9]+/).filter((token) => token.length > 2 && !["find", "search", "place", "stay", "under", "with", "furnished", "rental", "apartment"].includes(token));
      const matches = state.properties.map((property) => {
        const status = propertyStatus(property);
        const searchable = `${property.name} ${property.area} ${property.type} ${property.notes || ""}`.toLowerCase();
        const score = tokens.reduce((sum, token) => sum + (searchable.includes(token) ? 2 : 0), 0) + (area && property.area.toLowerCase() === area.toLowerCase() ? 8 : 0) + (type && property.type === type ? 4 : 0) + (wantsFurnished && property.furnished ? 2 : 0) + (budget && property.price <= budget ? 2 : 0) - (status === "maintenance" ? 20 : 0) - (status === "occupied" || status === "reserved" ? 8 : 0) - (budget && property.price > budget ? 6 : 0);
        return { property, score, status };
      }).filter((entry) => entry.status === "available" && (!area || entry.property.area.toLowerCase() === area.toLowerCase()) && (!type || entry.property.type === type) && (!wantsFurnished || entry.property.furnished) && (!budget || entry.property.price <= budget)).sort((a, b) => b.score - a.score || a.property.price - b.property.price).slice(0, 4);
      if (!matches.length) return `${t("No matching properties. Try another area, type, or budget.")} (${t("Available now")}: ${state.properties.filter((property) => propertyStatus(property) === "available").length} / ${state.properties.length}).`;
      return `${t("I found these matching places")}:\n${matches.map(({ property }) => `• ${property.name} · ${property.area} · ${t(property.type)} · ${money(property.price)} / ${t(property.period === "Nightly" ? "per night" : "per month")}`).join("\n")}\n\n${t("Availability and price are based on this browser's editable workspace data.")}`;
    }
    if (/analy|portfolio|property|properties|guri/.test(normalized)) {
      const revenue = state.payments.filter((payment) => payment.status === "confirmed").reduce((sum, payment) => sum + Number(payment.amount), 0);
      const byArea = [...new Set(state.properties.map((property) => property.area))].map((areaName) => `${areaName}: ${state.properties.filter((property) => property.area === areaName).length}`).join(", ");
      const averageRent = state.properties.length ? Math.round(state.properties.reduce((sum, property) => sum + Number(property.price), 0) / state.properties.length) : 0;
      return `${t("Property analysis")} · ${state.properties.length} ${t("Properties").toLowerCase()}, ${state.customers.length} ${t("Customers").toLowerCase()}, ${state.bookings.length} ${t("Bookings").toLowerCase()}.\n${t("Total collected")}: ${money(revenue)} · ${t("Monthly rent")} average: ${money(averageRent)}.\n${t("Area")}: ${byArea || "—"}.\n${t("This local preview stores data in this browser only.")}`;
    }
    return `${t("I can find available places, summarize occupancy or recorded revenue, and describe this local property portfolio. No AI provider is connected.")}\n\n${t("Try asking…")}`;
  }
  function addChatMessage(message, isUser = false) {
    const messages = document.getElementById("chat-messages");
    if (!messages) return;
    messages.insertAdjacentHTML("beforeend", `<div class="chat-message ${isUser ? "user-message" : ""}">${esc(message)}</div>`);
    messages.scrollTop = messages.scrollHeight;
  }
  function submitAssistant(message) {
    if (!message.trim()) return;
    addChatMessage(message.trim(), true);
    addChatMessage(assistantAnswer(message.trim()));
    const form = document.getElementById("assistant-form");
    form?.reset();
  }

  document.addEventListener("click", (event) => {
    const viewControl = event.target.closest("[data-view]");
    if (viewControl) {
      event.preventDefault();
      const requested = viewControl.dataset.view;
      if (isAllowed(requested)) { currentView = requested; globalQuery = ""; render(); }
      else flash("You do not have permission for this action.");
      return;
    }
    const promptControl = event.target.closest("[data-prompt]");
    if (promptControl) { submitAssistant(promptControl.dataset.prompt); return; }
    const control = event.target.closest("[data-action]");
    if (!control) return;
    const [action, id] = control.dataset.action.split(":");
    if (action === "close-modal") return closeModal();
    if (action === "new-property") openModal("property");
    else if (action === "edit-property") openModal("property", id);
    else if (action === "new-customer") openModal("customer");
    else if (action === "edit-customer") openModal("customer", id);
    else if (action === "new-owner") openModal("owner");
    else if (action === "edit-owner") openModal("owner", id);
    else if (action === "new-booking") openModal("booking");
    else if (action === "book-property") openModal("booking", "", id);
    else if (action === "new-payment") openModal("payment");
    else if (action === "new-maintenance") openModal("maintenance");
    else if (action === "confirm-booking") updateBooking(id, "confirmed");
    else if (action === "cancel-booking") updateBooking(id, "cancelled");
    else if (action === "complete-booking") updateBooking(id, "completed");
    else if (action === "complete-maintenance") { if (permissionFor("maintenance")) { const item = state.maintenance.find((entry) => entry.id === id); if (item) { item.status = "completed"; saveState(); render(); flash("Changes saved"); } } }
    else if (action === "receipt") printReceipt(id);
    else if (action === "invoice") printInvoice(id);
    else if (action === "export-report") exportReport();
    else if (action === "reset-workspace") {
      if (window.confirm(t("Resetting removes local edits and restores the starter dataset."))) {
        state = seedData();
        saveState();
        globalQuery = "";
        currentView = "dashboard";
        render();
        flash("Workspace reset");
      }
    }
  });
  document.getElementById("language-toggle").addEventListener("click", () => {
    state.settings.language = lang() === "en" ? "so" : "en";
    saveState();
    render();
  });
  document.getElementById("global-search").addEventListener("input", (event) => {
    globalQuery = event.currentTarget.value;
    if (currentView !== "properties") {
      currentView = "properties";
      render();
      const input = document.getElementById("global-search");
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
      document.querySelector(".search-box")?.classList.add("search-open");
    } else {
      const root = document.getElementById("app-content");
      const cursor = event.currentTarget.selectionStart;
      root.innerHTML = renderProperties();
      document.getElementById("global-search").value = globalQuery;
      document.getElementById("global-search").focus();
      document.getElementById("global-search").setSelectionRange(cursor, cursor);
    }
  });
  document.getElementById("global-search").addEventListener("focus", () => {
    if (window.innerWidth <= 760) document.querySelector(".search-box")?.classList.add("search-open");
  });
  document.getElementById("global-search").addEventListener("blur", () => {
    if (window.innerWidth <= 760) document.querySelector(".search-box")?.classList.remove("search-open");
  });
  document.addEventListener("change", (event) => {
    if (event.target.id === "filter-area") { filters.area = event.target.value; render(); }
    else if (event.target.id === "filter-type") { filters.type = event.target.value; render(); }
    else if (event.target.id === "filter-status") { filters.status = event.target.value; render(); }
    else if (event.target.id === "setting-language") { state.settings.language = event.target.value; saveState(); render(); }
    else if (event.target.id === "setting-currency") { state.settings.currency = event.target.value; saveState(); render(); flash("Currency updated"); }
    else if (event.target.id === "setting-role") { state.settings.role = event.target.value; saveState(); currentView = "dashboard"; render(); }
  });
  document.addEventListener("input", (event) => {
    if (event.target.id === "customer-search") {
      const cursor = event.target.selectionStart;
      document.getElementById("app-content").innerHTML = renderCustomers();
      const input = document.getElementById("customer-search");
      input.focus();
      input.setSelectionRange(cursor, cursor);
    }
  });
  document.addEventListener("submit", (event) => {
    if (event.target.id === "assistant-form") {
      event.preventDefault();
      submitAssistant(new FormData(event.target).get("message")?.toString() || "");
    }
  });
  const openRoleMenu = () => {
    const old = document.querySelector(".role-popover");
    if (old) return old.remove();
    const popover = document.createElement("div");
    popover.className = "role-popover";
    popover.innerHTML = `<strong>${esc(t("Demo role preview"))}</strong>${Object.entries(ROLES).map(([key, label]) => `<button class="role-option ${state.settings.role === key ? "selected" : ""}" data-role="${key}">${esc(label[lang() === "so" ? 1 : 0])}</button>`).join("")}<div class="notice" style="margin-top:7px">${esc(t("Role preview only — not authentication or data security."))}</div>`;
    document.body.appendChild(popover);
    popover.addEventListener("click", (event) => {
      const option = event.target.closest("[data-role]");
      if (!option) return;
      state.settings.role = option.dataset.role;
      saveState();
      currentView = "dashboard";
      render();
    });
  };
    document.getElementById("role-menu").addEventListener("click", openRoleMenu);
    document.getElementById("top-role-menu").addEventListener("click", openRoleMenu);

  state = loadState();
  render();
  if (memoryOnly) setTimeout(() => flash("Saved workspace could not be read or storage is unavailable; changes are not persistent."), 100);
})();
