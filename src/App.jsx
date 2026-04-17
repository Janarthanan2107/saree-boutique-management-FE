import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/ScrollToTop";
import { StoreProvider } from "@/context/StoreContext";
import { AdminAuthProvider } from "@/admin/context/AdminAuthContext";
import AdminProtectedRoute from "@/admin/components/AdminProtectedRoute";
import AdminLayout from "@/admin/layouts/AdminLayout";
import AdminLoginPage from "@/admin/pages/AdminLoginPage";
import AdminDashboardPage from "@/admin/pages/AdminDashboardPage";
import AdminProductsPage from "@/admin/pages/AdminProductsPage";
import AdminStockPage from "@/admin/pages/AdminStockPage";
import AdminOrdersPage from "@/admin/pages/AdminOrdersPage";
import AdminReviewsPage from "@/admin/pages/AdminReviewsPage";
import AdminJournalPage from "@/admin/pages/AdminJournalPage";
import AdminCustomersPage from "@/admin/pages/AdminCustomersPage";
import AdminContactsPage from "@/admin/pages/AdminContactsPage";
import AdminSettingsPage from "@/admin/pages/AdminSettingsPage";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import HomePage from "@/pages/HomePage";
import CollectionsPage from "@/pages/CollectionsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CheckoutPage from "@/pages/CheckoutPage";
import HeritagePage from "@/pages/HeritagePage";
import AtelierPage from "@/pages/AtelierPage";
import JournalPage from "@/pages/JournalPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import ContactPage from "@/pages/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AdminAuthProvider>
        <StoreProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/:productId" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/heritage" element={<HeritagePage />} />
            <Route path="/atelier" element={<AtelierPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route index element={<AdminDashboardPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="stock" element={<AdminStockPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="reviews" element={<AdminReviewsPage />} />
              <Route path="journal" element={<AdminJournalPage />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              <Route path="contacts" element={<AdminContactsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster position="top-right" theme="light" closeButton />
          <CartDrawer />
          <WishlistDrawer />
        </StoreProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}
