import { products as seedProducts } from "@/data/products";
import { PRODUCT_IMAGE_KEYS } from "./productImageKeys";
import { resolveAsset } from "./assetKeys";

const KEY_SESSION = "megam_admin_session";
const KEY_PRODUCTS = "megam_admin_products";
const KEY_ORDERS = "megam_admin_orders";
const KEY_REVIEWS = "megam_admin_reviews";
const KEY_JOURNAL = "megam_admin_journal";
const KEY_CONTACTS = "megam_admin_contacts";
const KEY_SETTINGS = "megam_admin_settings";

const listeners = new Set();
let version = 0;

export function subscribeAdmin(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getAdminVersion() {
  return version;
}

function bump() {
  version += 1;
  listeners.forEach((l) => l());
}

function load(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota */
  }
  bump();
}

export function formatRupee(n) {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

export function formatINRShort(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function buildSeedProducts() {
  const stocks = [12, 3, 0, 8, 15, 2, 7, 1, 22];
  return seedProducts.map((p, i) => ({
    id: p.id,
    title: p.title,
    weaveType: p.weaveType,
    category: p.category,
    priceNum: p.priceNum,
    priceLabel: p.price,
    stock: stocks[i % stocks.length],
    description: p.description,
    details: { ...p.details },
    imageKey: PRODUCT_IMAGE_KEYS[p.id] ?? "saree-texture-1",
    galleryKeys: [],
  }));
}

function seedOrders() {
  const p = seedProducts;
  return [
    {
      id: "MD-1042",
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      customer: { firstName: "Ananya", lastName: "Sharma", email: "ananya@example.com", phone: "+91 98765 43210" },
      items: [{ productId: p[0].id, title: p[0].title, qty: 1, unitPrice: p[0].priceNum }],
      total: p[0].priceNum,
      paymentStatus: "Paid",
      status: "Delivered",
    },
    {
      id: "MD-1043",
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      customer: { firstName: "Priya", lastName: "Iyer", email: "priya@example.com", phone: "+91 99887 76655" },
      items: [
        { productId: p[1].id, title: p[1].title, qty: 1, unitPrice: p[1].priceNum },
        { productId: p[5].id, title: p[5].title, qty: 1, unitPrice: p[5].priceNum },
      ],
      total: p[1].priceNum + p[5].priceNum,
      paymentStatus: "Paid",
      status: "Shipped",
    },
    {
      id: "MD-1044",
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      customer: { firstName: "Rhea", lastName: "Kapoor", email: "rhea@example.com", phone: "+91 90000 12345" },
      items: [{ productId: p[6].id, title: p[6].title, qty: 1, unitPrice: p[6].priceNum }],
      total: p[6].priceNum,
      paymentStatus: "Paid",
      status: "Processing",
    },
    {
      id: "MD-1045",
      createdAt: new Date().toISOString(),
      customer: { firstName: "Meera", lastName: "Nair", email: "meera@example.com", phone: "+91 80000 99887" },
      items: [{ productId: p[3].id, title: p[3].title, qty: 2, unitPrice: p[3].priceNum }],
      total: p[3].priceNum * 2,
      paymentStatus: "Pending",
      status: "Pending",
    },
  ];
}

function seedReviews() {
  return [
    {
      id: "rev-1",
      productId: "banarasi-crimson",
      customerName: "Ananya R.",
      rating: 5,
      text: "Exquisite drape — luminous zari.",
      status: "pending",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: "rev-2",
      productId: "royal-kanjeevaram",
      customerName: "Meera S.",
      rating: 5,
      text: "A true heirloom piece.",
      status: "approved",
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
  ];
}

function seedJournal() {
  return [
    {
      id: "art-of-draping",
      title: "The Art of Draping: A Guide to Regional Styles",
      category: "Style",
      coverImageKey: "journal-fashion-editorial",
      content: "<p>Regional drapes across India.</p>",
      publishDate: "2024-03-15",
      status: "published",
      excerpt: "From Nivi to Seedha Pallu — how six yards transform.",
    },
  ];
}

const defaultSettings = () => ({
  brandName: "Megam Drapes",
  tagline: "inspired by mother's love",
  heroEyebrow: "The Royal Silk Heritage",
  heroTitleLine1: "Where Silk",
  heroTitleLine2: "Becomes Legacy",
  heroImageKey: "hero-saree",
  featuredProductIds: ["banarasi-crimson", "royal-kanjeevaram", "emerald-pattu"],
  lowStockThreshold: 3,
});

export function initAdminData() {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(KEY_PRODUCTS)) save(KEY_PRODUCTS, buildSeedProducts());
  if (!localStorage.getItem(KEY_ORDERS)) save(KEY_ORDERS, seedOrders());
  if (!localStorage.getItem(KEY_REVIEWS)) save(KEY_REVIEWS, seedReviews());
  if (!localStorage.getItem(KEY_JOURNAL)) save(KEY_JOURNAL, seedJournal());
  if (!localStorage.getItem(KEY_CONTACTS)) save(KEY_CONTACTS, []);
  if (!localStorage.getItem(KEY_SETTINGS)) save(KEY_SETTINGS, defaultSettings());
}

export function getSession() {
  const s = load(KEY_SESSION, null);
  if (!s?.token || !s.expires || Date.now() > s.expires) {
    if (s?.token) localStorage.removeItem(KEY_SESSION);
    return null;
  }
  if (s.role !== "admin") return null;
  return s;
}

export function loginAdmin(email, password) {
  const expected = import.meta.env.VITE_ADMIN_PASSWORD ?? "megamdrapes";
  if (!password || password !== expected) return { ok: false, error: "Invalid credentials" };
  const session = {
    token: crypto.randomUUID(),
    role: "admin",
    email: email || "admin@megamdrapes.com",
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };
  save(KEY_SESSION, session);
  return { ok: true };
}

export function logoutAdmin() {
  localStorage.removeItem(KEY_SESSION);
  bump();
}

export function getProductsRaw() {
  initAdminData();
  return load(KEY_PRODUCTS, []);
}

export function setProducts(list) {
  save(KEY_PRODUCTS, list);
}

/** Ethereal-style: apply multiple stock updates in one save */
export function bulkUpdateStock(updates) {
  const products = getProductsRaw();
  for (const u of updates) {
    const p = products.find((x) => x.id === u.id);
    if (p) p.stock = Math.max(0, Number(u.stock) || 0);
  }
  setProducts(products);
}

export function upsertProduct(product) {
  const list = getProductsRaw();
  const i = list.findIndex((p) => p.id === product.id);
  if (i >= 0) list[i] = { ...list[i], ...product };
  else list.push(product);
  setProducts(list);
}

export function deleteProduct(id) {
  setProducts(getProductsRaw().filter((p) => p.id !== id));
}

export function getOrders() {
  initAdminData();
  return load(KEY_ORDERS, []);
}

export function applyOrderToInventory(order) {
  const items = order.items || [];
  if (!items.length) return;
  const products = getProductsRaw();
  let changed = false;
  for (const line of items) {
    const q = line.quantity ?? line.qty ?? 0;
    const p = products.find((x) => x.id === line.productId);
    if (p) {
      p.stock = Math.max(0, (p.stock ?? 0) - q);
      changed = true;
    }
  }
  if (changed) setProducts(products);
}

export function addOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  save(KEY_ORDERS, orders);
  applyOrderToInventory(order);
}

export function updateOrder(id, patch) {
  save(
    KEY_ORDERS,
    getOrders().map((o) => (o.id === id ? { ...o, ...patch } : o)),
  );
}

export function getReviews() {
  initAdminData();
  return load(KEY_REVIEWS, []);
}

export function setReviews(list) {
  save(KEY_REVIEWS, list);
}

export function updateReview(id, patch) {
  setReviews(getReviews().map((r) => (r.id === id ? { ...r, ...patch } : r)));
}

export function deleteReview(id) {
  setReviews(getReviews().filter((r) => r.id !== id));
}

export function getJournalPosts() {
  initAdminData();
  return load(KEY_JOURNAL, []);
}

export function setJournalPosts(list) {
  save(KEY_JOURNAL, list);
}

export function upsertJournalPost(post) {
  const list = getJournalPosts();
  const i = list.findIndex((p) => p.id === post.id);
  if (i >= 0) list[i] = { ...list[i], ...post };
  else list.push(post);
  setJournalPosts(list);
}

export function deleteJournalPost(id) {
  setJournalPosts(getJournalPosts().filter((p) => p.id !== id));
}

export function getContacts() {
  initAdminData();
  return load(KEY_CONTACTS, []);
}

export function addContact(entry) {
  const c = getContacts();
  c.unshift({
    ...entry,
    id: entry.id ?? `msg-${Date.now()}`,
    createdAt: entry.createdAt ?? new Date().toISOString(),
    resolved: entry.resolved ?? false,
  });
  save(KEY_CONTACTS, c);
}

export function updateContact(id, patch) {
  save(
    KEY_CONTACTS,
    getContacts().map((x) => (x.id === id ? { ...x, ...patch } : x)),
  );
}

export function getSettings() {
  initAdminData();
  return { ...defaultSettings(), ...load(KEY_SETTINGS, {}) };
}

export function saveSettings(patch) {
  save(KEY_SETTINGS, { ...getSettings(), ...patch });
}

export function toStoreProduct(p) {
  const image = resolveAsset(p.imageKey);
  const gallery = (p.galleryKeys ?? []).map((k) => resolveAsset(k));
  return {
    id: p.id,
    title: p.title,
    weaveType: p.weaveType,
    category: p.category,
    priceNum: p.priceNum,
    price: p.priceLabel ?? formatRupee(p.priceNum),
    image,
    images: gallery.length ? [image, ...gallery] : [image],
    description: p.description,
    details: p.details,
    stock: p.stock ?? 0,
  };
}

export function getCatalogProducts() {
  return getProductsRaw().map(toStoreProduct);
}

export function getCatalogProductById(id) {
  const p = getProductsRaw().find((x) => x.id === id);
  return p ? toStoreProduct(p) : null;
}

export function getSimilarCatalogProducts(product, count = 3) {
  const all = getProductsRaw().filter((x) => x.id !== product.id);
  const same = all.filter((x) => x.weaveType === product.weaveType).slice(0, count);
  const rest = all.filter((x) => x.weaveType !== product.weaveType);
  return [...same, ...rest].slice(0, count).map(toStoreProduct);
}

export function getPublishedJournalForStore() {
  return getJournalPosts().filter((p) => p.status === "published");
}

export function getJournalArticlesForPublic() {
  return getPublishedJournalForStore().map((p, i) => ({
    id: p.id,
    category: p.category,
    title: p.title,
    excerpt: p.excerpt || "",
    date: p.publishDate
      ? new Date(`${p.publishDate}T12:00:00`).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
      : "",
    readTime: "—",
    image: resolveAsset(p.coverImageKey),
    featured: i === 0,
  }));
}

export function getCustomersFromOrders() {
  const orders = getOrders();
  const byEmail = new Map();
  for (const o of orders) {
    const e = o.customer?.email;
    if (!e) continue;
    if (!byEmail.has(e)) {
      byEmail.set(e, {
        email: e,
        name: `${o.customer.firstName || ""} ${o.customer.lastName || ""}`.trim(),
        orders: [],
        totalSpent: 0,
      });
    }
    const c = byEmail.get(e);
    c.orders.push(o);
    c.totalSpent += o.total || 0;
  }
  return Array.from(byEmail.values()).sort((a, b) => b.totalSpent - a.totalSpent);
}

/** Ethereal dashboard: last 7 calendar days */
export function getSalesLast7Days() {
  const orders = getOrders();
  const now = new Date();
  const buckets = [];
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const dayOrders = orders.filter((o) => o.createdAt?.slice(0, 10) === key);
    buckets.push({
      day: d.toLocaleDateString("en-IN", { weekday: "short" }),
      revenue: dayOrders.reduce((s, o) => s + (o.paymentStatus === "Paid" ? o.total || 0 : 0), 0),
      orders: dayOrders.length,
    });
  }
  return buckets;
}

/** Ethereal dashboard: top pieces by revenue */
export function getTopProductsFromOrders(limit = 5) {
  const map = new Map();
  for (const o of getOrders()) {
    if (o.paymentStatus !== "Paid") continue;
    for (const item of o.items || []) {
      const q = item.quantity ?? item.qty ?? 0;
      const price = item.price ?? item.unitPrice ?? 0;
      const e = map.get(item.productId) ?? { title: item.title, units: 0, revenue: 0 };
      e.units += q;
      e.revenue += q * price;
      map.set(item.productId, e);
    }
  }
  return Array.from(map.entries())
    .map(([id, v]) => ({ id, ...v }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);
}

export const WEAVE_TYPES = ["Banarasi", "Kanjeevaram", "Pattu"];
export const ADMIN_CATEGORIES = [
  "BRIDAL COLLECTION",
  "HERITAGE WEAVES",
  "FESTIVE EDIT",
  "SIGNATURE COLLECTION",
  "EVERYDAY LUXURY",
];
