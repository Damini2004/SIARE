import {
  BrowserRouter, Routes, Route, useLocation, Navigate,} from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CollaborationsAdmin from "./pages/Dashboard/CollaborationsAdmin";
import Home from "./pages/Home";
import About from "./pages/About";
import Proceedings from "./pages/Proceedings";
import Events from "./pages/Events";
import Membership from "./pages/Membership";
import Clients from "./pages/Clients";
import Contact from "./pages/Contact";

import EventDetailsMiddle from "./pages/Conference";
import Webinar from "./pages/Webinar";
import Workshop from "./pages/Workshop";

import CreateEvent from "./pages/Dashboard/CreateEvent";
import Login from "./pages/Login";

import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopRoute from "./components/ScrollToTopRoute";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import Inquiries from "./pages/Dashboard/Inquiries";
import WorkshopAdmin from "./pages/Dashboard/WorkshopAdmin";
import WebinarAdmin from "./pages/Dashboard/WebinarAdmin";
import ConferenceAdmin from "./pages/Dashboard/ConferenceAdmin";
import API from "./api/axios";
import MembershipTiersAdmin from "./pages/Dashboard/MembershipTiersAdmin";
import MembersAdmin from "./pages/Dashboard/MembersAdmin";


function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let isMounted = true;

    API.get("/admin/session")
      .then((res) => {
        if (isMounted) {
          setStatus(res.data.user ? "authenticated" : "unauthenticated");
        }
      })
      .catch(() => {
        if (isMounted) {
          setStatus("unauthenticated");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7fb] text-[#071d4f] text-sm font-bold">
        Checking session...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
function Layout() {
  const location = useLocation();

const adminRoutes = [
  "/admin/login",
  "/admin/dashboard",
  "/admin/create-event",
  "/admin/inquiries",
  "/admin/workshops",
  "/admin/conferences",
  "/admin/webinars",
  "/admin/membership-tiers",
  "/admin/members",
  "/admin/collaborations",
];

  const hideLayout =
    adminRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

  return (
    <div className="min-h-screen flex flex-col">

      {!hideLayout && <Header />}

      <main className="flex-1">

        <ScrollToTopRoute />
        <ScrollToTop />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/proceedings" element={<Proceedings />} />
          <Route path="/events" element={<Events />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/members" element={<Clients />} />
          <Route path="/contact" element={<Contact />} />

        <Route path="/eventConference/:id" element={<EventDetailsMiddle />} />
<Route path="/eventWebinar/:id" element={<Webinar />} />
<Route path="/eventWorkshop/:id" element={<Workshop />} />

          {/* ADMIN */}

          <Route
            path="/admin/login"
            element={<Login />}
          />

    <Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/inquiries"
  element={
    <ProtectedRoute>
      <Inquiries />
    </ProtectedRoute>
  }
/>
<Route path="/admin/members" element={<MembersAdmin />} />
<Route
  path="/admin/create-event"
  element={
    <ProtectedRoute>
      <CreateEvent />
    </ProtectedRoute>
  }
/>
<Route path="/admin/membership-tiers" element={<MembershipTiersAdmin />} />
<Route
  path="/admin/workshops/:eventId/content"
  element={
    <ProtectedRoute>
      <WorkshopAdmin />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/webinars/:eventId/content"
  element={
    <ProtectedRoute>
      <WebinarAdmin />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/conferences/:eventId/content"
  element={
    <ProtectedRoute>
      <ConferenceAdmin />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/collaborations"
  element={
    <ProtectedRoute>
      <CollaborationsAdmin />
    </ProtectedRoute>
  }
/>
        </Routes>

      </main>

      {!hideLayout && <Footer />}

    </div>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
