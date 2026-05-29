import { useEffect, useState } from "react";
import {
  MonitorPlay,
  GraduationCap,
  Users,
  Mail,
  Crown,
  Edit3,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Eye,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/footerlogo.png";
import API from "../../api/axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    events: 0,
    conferences: 0,
    members: 0,
    journals: 0,
    inquiries: 0,
    membershiptiers: 0,
    pricingplans: 0,
    collaborations: 0,
  });
  const [recentViews, setRecentViews] = useState([]);
  const [managedEvents, setManagedEvents] = useState([]);
  const [membershipTiers, setMembershipTiers] = useState([]);
  const [tiersLoading, setTiersLoading] = useState(false);
  const [editingFooterId, setEditingFooterId] = useState(null);
  const [editingFooterForm, setEditingFooterForm] = useState({
    type: "",
    label: "",
    value: "",
    order: 0,
    isActive: true,
  });
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [activeEventType, setActiveEventType] = useState("conference");
  const [eventsLoading, setEventsLoading] = useState(false);
  const [footerOpen, setFooterOpen] = useState(false);
  const [footerContacts, setFooterContacts] = useState([]);
  const [footerLoading, setFooterLoading] = useState(false);
  const [footerForm, setFooterForm] = useState({
    type: "address",
    label: "",
    value: "",
    order: 0,
    isActive: true,
  });
  const [eventSearch, setEventSearch] = useState("");
  const [eventSort, setEventSort] = useState("createdAt-desc");
  const [eventPage, setEventPage] = useState(1);
  useEffect(() => {
    async function loadStats() {
      try {
        const [
          events,
          conferences,
          members,
          journals,
          inquiries,
          tiers,
          plans,
          collaborations,
        ] = await Promise.allSettled([
          API.get("/events"),
          API.get("/conferences"),
          API.get("/members"),
          API.get("/journals"),
          API.get("/admin/inquiries"),
          API.get("/membership-tiers"),
          API.get("/pricing"),
          API.get("/collaborations"),
        ]);

        setStats({
          events:
            events.value?.data?.count || events.value?.data?.data?.length || 0,
          conferences:
            conferences.value?.data?.count ||
            conferences.value?.data?.data?.length ||
            0,
          members:
            members.value?.data?.count ||
            members.value?.data?.data?.length ||
            0,
          journals:
            journals.value?.data?.count ||
            journals.value?.data?.data?.length ||
            0,
          inquiries:
            inquiries.value?.data?.count ||
            inquiries.value?.data?.data?.length ||
            0,
          membershiptiers:
            tiers.value?.data?.count || tiers.value?.data?.data?.length || 0,
          pricingplans:
            plans.value?.data?.count || plans.value?.data?.data?.length || 0,
          collaborations:
            collaborations.value?.data?.count ||
            collaborations.value?.data?.data?.length ||
            0,
        });
      } catch (err) {
        console.log(err);
      }
    }

    loadStats();
    loadRecentViews();
    loadManagedEvents();
    loadMembershipTiers();
    loadMembers();
  }, []);

  const eventCounts = {
    conference: managedEvents.filter((item) => item.type === "conference")
      .length,
    webinar: managedEvents.filter((item) => item.type === "webinar").length,
    workshop: managedEvents.filter((item) => item.type === "workshop").length,
  };
  async function loadFooterContacts() {
    try {
      setFooterLoading(true);
      const res = await API.get("/footer-contact");
      setFooterContacts(res.data.data || []);
    } catch (err) {
      console.log("Footer Contact Error:", err);
    } finally {
      setFooterLoading(false);
    }
  }

  async function openFooterPopup() {
    setFooterOpen(true);
    await loadFooterContacts();
  }
  async function createFooterContact() {
    try {
      if (!footerForm.label.trim()) {
        alert("Label is required");
        return;
      }

      if (!footerForm.value.trim()) {
        alert("Value is required");
        return;
      }

      await API.post("/admin/footer-contact", footerForm);

      alert("Footer contact added");

      setFooterForm({
        type: "address",
        label: "",
        value: "",
        order: 0,
        isActive: true,
      });

      await loadFooterContacts();
    } catch (err) {
      alert(err?.response?.data?.error || "Create failed");
    }
  }
  async function updateFooterContact(id, payload) {
    try {
      await API.put(`/admin/footer-contact/${id}`, payload);
      await loadFooterContacts();
      alert("Footer contact updated");
    } catch (err) {
      alert(err?.response?.data?.error || "Update failed");
    }
  }

  function startEditFooter(item) {
    setEditingFooterId(item.id);
    setEditingFooterForm({
      type: item.type || "address",
      label: item.label || "",
      value: item.value || "",
      order: item.order || 0,
      isActive: item.isActive ?? true,
    });
  }

  async function saveEditFooter(id) {
    await updateFooterContact(id, editingFooterForm);
    setEditingFooterId(null);
  }
  async function updateFooterContact(id, payload) {
    try {
      await API.put(`/admin/footer-contact/${id}`, payload);
      await loadFooterContacts();
      alert("Footer contact updated");
    } catch (err) {
      alert(err?.response?.data?.error || "Update failed");
    }
  }

  async function deleteFooterContact(id) {
    if (!window.confirm("Delete this footer contact?")) return;

    try {
      await API.delete(`/admin/footer-contact/${id}`);
      await loadFooterContacts();
      alert("Footer contact deleted");
    } catch (err) {
      alert(err?.response?.data?.error || "Delete failed");
    }
  }

  const boxes = [
    {
      title: "Conference",
      label: "Add academic conference",
      count: eventCounts.conference,
      icon: Users,
      color: "#43aa37",
      path: "/admin/create-event?type=conference",
    },
    {
      title: "Webinar",
      label: "Add online webinar",
      count: eventCounts.webinar,
      icon: MonitorPlay,
      color: "#0875c9",
      path: "/admin/create-event?type=webinar",
    },
    {
      title: "Workshop",
      label: "Add training workshop",
      count: eventCounts.workshop,
      icon: GraduationCap,
      color: "#ff352e",
      path: "/admin/create-event?type=workshop",
    },

    {
      title: "Members",
      label: "Manage members",
      count: members.length || stats.members,
      icon: Crown,
      color: "#7a45c9",
      path: "/admin/members",
    },
    {
      title: "Collaborations",
      label: "Manage collaborations",
      count: stats.collaborations,
      icon: Users,
      color: "#0875c9",
      path: "/admin/collaborations",
    },
    {
      title: "Tiers",
      label: "Membership categories",
      count: membershipTiers.length || stats.membershiptiers,
      icon: Users,
      color: "#43aa37",
      path: "/admin/membership-tiers",
    },

    // {
    //   title: "Pricing Plans",
    //   label: "Pricing and benefits",
    //   count: stats.pricingplans,
    //   icon: CreditCard,
    //   color: "#0875c9",
    //   path: "/membership",
    // },
  ];

  const handleLogout = async () => {
    try {
      await API.post("/admin/logout");
    } catch {}
    navigate("/admin/login");
  };
  async function loadRecentViews() {
    try {
      const res = await API.get("/admin/recent-views");

      setRecentViews((res.data.data || []).slice(0, 5));
    } catch (err) {
      console.log("Recent Views Error:", err);
    }
  }

  async function saveRecentView(page, path) {
    try {
      await API.post("/admin/recent-views", {
        page,
        path,
      });

      loadRecentViews();
    } catch (err) {
      console.log("Save Recent View Error:", err);
    }
  }

  async function loadManagedEvents() {
    try {
      setEventsLoading(true);
      const res = await API.get("/admin/events", { params: { limit: 100 } });

      setManagedEvents(res.data.data || []);
    } catch (err) {
      console.log("Event Management Error:", err);
    } finally {
      setEventsLoading(false);
    }
  }

  async function loadMembershipTiers() {
    try {
      setTiersLoading(true);

      const res = await API.get("/admin/membership-tiers", {
        params: { limit: 4 },
      });

      setMembershipTiers(res.data.data || []);
    } catch (err) {
      console.log("Membership Tiers Error:", err);
    } finally {
      setTiersLoading(false);
    }
  }
  async function loadMembers() {
    try {
      setMembersLoading(true);

      const res = await API.get("/admin/members", {
        params: { limit: 4 },
      });

      setMembers(res.data.data || []);
    } catch (err) {
      console.log("Members Error:", err);
    } finally {
      setMembersLoading(false);
    }
  }
  async function deleteManagedEvent(event) {
    const confirmed = window.confirm(
      `Delete "${event.title}"? This cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      await API.delete(`/admin/events/${event.id}`);
      await loadManagedEvents();
    } catch (err) {
      alert(err.message);
    }
  }

  const filteredManagedEvents = managedEvents
    .filter((item) => item.type === activeEventType)
    .filter((item) => {
      const term = eventSearch.toLowerCase().trim();
      if (!term) return true;
      return [
        item.title,
        item.speaker,
        item.instructor,
        item.location,
        item.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term);
    })
    .sort((a, b) => {
      const [field, direction] = eventSort.split("-");
      const aValue = String(a[field] || "");
      const bValue = String(b[field] || "");
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  const eventPageSize = 5;
  const totalEventPages = Math.max(
    Math.ceil(filteredManagedEvents.length / eventPageSize),
    1,
  );
  const paginatedManagedEvents = filteredManagedEvents.slice(
    (eventPage - 1) * eventPageSize,
    eventPage * eventPageSize,
  );

  const eventTypeTabs = [
    { key: "conference", label: "Conferences", color: "#43aa37" },
    { key: "webinar", label: "Webinars", color: "#0875c9" },
    { key: "workshop", label: "Workshops", color: "#ff352e" },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-[270px] bg-[#071d4f] text-white flex-col fixed left-0 top-0 bottom-0 z-20">
        <div className="px-4 py-1 border-b  border-white/10">
          <div className="flex items-center gap-3">
            {/* <div className="w-[42px] h-[42px] rounded-[14px] bg-[#e2ac39] flex items-center justify-center">
              <LayoutDashboard size={22} className="text-[#071d4f]" />
            </div> */}
            <Link to="/">
              <img src={logo} alt="siare logo" className="h-20 w-36" />
              {/* <div>
                <h2 className="text-[18px] font-black leading-none">SIARE</h2>
                <p className="text-white/55 text-[11px] font-semibold mt-1">
                  Admin Panel
                </p>
              </div> */}
            </Link>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {boxes.map((box) => {
            const Icon = box.icon;
            return (
              <button
                key={`sidebar-${box.title}-${box.path}`}
                onClick={() => {
                  saveRecentView(box.title, box.path);
                  navigate(box.path);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-[14px] text-white/75 hover:text-white hover:bg-white/10 transition-all duration-300 text-left"
              >
                <Icon size={18} />
                <span className="text-[13px] font-bold">{box.title}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-[170px] h-[42px] rounded-[14px] bg-[#e2ac39] text-[#071d4f] font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-white"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="w-full lg:ml-[270px]">
        {/* TOP BAR */}
        <header className="sticky top-0 z-10 bg-white/85 backdrop-blur-xl border-b border-[#e5ebf4]">
          <div className="flex items-center justify-between ">
            <section className="relative w-full overflow-hidden border-b border-[#b9babc] bg-[linear-gradient(90deg,#071d4f_0%,#0b2c75_55%,#0875c9_100%)]">
              <div className="absolute right-[-120px] top-[-120px] w-[420px] h-[260px] rounded-full bg-white/10 blur-[90px]" />
              <div className="absolute left-[20%] bottom-[-130px] w-[420px] h-[220px] rounded-full bg-[#e2ac39]/10 blur-[100px]" />

              <div className="relative w-full px-6 sm:px-8 lg:px-12 py-4">
                <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <h2 className="text-white text-[24px] sm:text-[26px] font-bold leading-none">
                      Admin Dashboard
                    </h2>

                    <p className="text-white/75 text-[13px] sm:text-[14px] mt-2">
                      Manage events, members, membership tiers and inquiries.
                    </p>
                  </div>
                  <button
                    onClick={openFooterPopup}
                    className="h-[54px] px-4 lg:ml-32 rounded-[12px] bg-white text-[#071d4f] flex items-center gap-2 shadow-[0_18px_40px_rgba(0,0,0,0.18)] hover:-translate-y-[2px] transition-all duration-300 "
                  >
                    <div className="w-[32px] h-[32px] rounded-[12px] bg-[#fff5de] flex items-center justify-center">
                      <Mail size={16} className="text-[#e2ac39]" />
                    </div>
                    <div className="text-left">
                      <p className="text-[#071d4f] text-[13px] font-black">
                        Footer
                      </p>
                      <p className="text-[#7a8598] text-[11px]">
                        Updates Contact
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      saveRecentView("Inquiries", "/admin/inquiries");
                      navigate("/admin/inquiries");
                    }}
                    className="h-[56px] w-full sm:w-[220px] md:ml-auto rounded-[18px] bg-white px-5 flex items-center justify-between shadow-[0_18px_40px_rgba(0,0,0,0.18)] hover:-translate-y-[2px] transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-[38px] h-[38px] rounded-[12px] bg-[#fff5de] flex items-center justify-center">
                        <Mail size={16} className="text-[#e2ac39]" />
                      </div>

                      <div className="text-left">
                        <p className="text-[#071d4f] text-[13px] font-black">
                          Inquiries
                        </p>
                        <p className="text-[#7a8598] text-[11px]">
                          Open Requests
                        </p>
                      </div>
                    </div>

                    <div className="min-w-[30px] h-[30px] rounded-full bg-[#ff4d4d] text-white text-[11px] font-black flex items-center justify-center">
                      {stats.inquiries}
                    </div>
                  </button>
                </div>
              </div>
            </section>
            {/* <button
              onClick={handleLogout}
              className="lg:hidden h-[42px] px-5 rounded-full bg-[#071d4f] text-white font-bold flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button> */}
          </div>
        </header>

        <main className="px-5 sm:px-8 py-7">
          {/* HERO CARD */}
          {/* HERO CARD */}

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {boxes.map((box, index) => {
              const Icon = box.icon;

              return (
                <button
                  key={`card-${box.title}-${box.path}`}
                  onClick={() => navigate(box.path)}
                  className="
          group
          h-[92px]
          w-full
          rounded-[18px]
          bg-white
          border border-[#e5ebf4]
          shadow-[0_8px_22px_rgba(7,29,79,0.06)]
          hover:shadow-[0_14px_32px_rgba(7,29,79,0.12)]
          hover:-translate-y-[3px]
          transition-all duration-300
          px-4
          flex items-center gap-6
          text-left
        "
                >
                  <div
                    className="
            w-[50px] h-[50px]
            rounded-[14px]
            flex items-center justify-center
            shrink-0
            transition-all duration-300
            group-hover:scale-110
          "
                    style={{
                      background: `${box.color}18`,
                      color: box.color,
                    }}
                  >
                    <Icon size={24} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-black uppercase tracking-[0.5px] text-[#6b7890] truncate">
                      {box.title}
                    </p>

                    <h3 className="text-[20px] leading-none font-medium text-[#071d4f] mt-2">
                      {box.count || 0}
                    </h3>

                    <p className="text-[12px] font-semibold text-[#94a3b8] mt-1 truncate">
                      {box.label}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <section className="mt-7 bg-white rounded-[24px] border border-[#e5ebf4] shadow-[0_14px_35px_rgba(7,29,79,0.06)] overflow-hidden">
            <div className="px-5 sm:px-6 py-5 border-b border-[#eef2f7] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-[#071d4f] text-[16px] font-bold uppercase">
                  Event Management
                </h2>
                <p className="text-[#6b7890] text-[12px] font-medium mt-1">
                  Manage conference, webinar, and workshop records.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {eventTypeTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveEventType(tab.key);
                      setEventPage(1);
                    }}
                    className={`h-[38px] px-4 rounded-[12px] border text-[12px] font-bold transition-all ${
                      activeEventType === tab.key
                        ? "bg-[#071d4f] text-white border-[#071d4f]"
                        : "bg-[#f8fafd] text-[#071d4f] border-[#e5ebf4] hover:bg-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}

                <button
                  onClick={() =>
                    navigate(`/admin/create-event?type=${activeEventType}`)
                  }
                  className="h-[38px] px-4 rounded-[12px] bg-[#e2ac39] text-[#071d4f] text-[12px] font-bold flex items-center gap-2"
                >
                  <PlusCircle size={15} />
                  Add
                </button>
              </div>
            </div>

            <div className="px-5 sm:px-6 py-4 border-b border-[#eef2f7] grid md:grid-cols-[1fr_220px] gap-3">
              <input
                value={eventSearch}
                onChange={(e) => {
                  setEventSearch(e.target.value);
                  setEventPage(1);
                }}
                placeholder="Search title, speaker, location or status"
                className="h-[40px] rounded-[12px] border border-[#dfe7f1] px-4 text-[13px] text-[#071d4f] outline-none focus:border-[#e2ac39]"
              />
              <select
                value={eventSort}
                onChange={(e) => setEventSort(e.target.value)}
                className="h-[40px] rounded-[12px] border border-[#dfe7f1] px-4 text-[13px] text-[#071d4f] outline-none focus:border-[#e2ac39]"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="date-asc">Date Asc</option>
                <option value="date-desc">Date Desc</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left">
                <thead className="bg-[#f8fafd] border-b border-[#eef2f7]">
                  <tr>
                    <th className="px-6 py-3 text-[11px] uppercase text-[#6b7890] font-black">
                      Title
                    </th>
                    <th className="px-6 py-3 text-[11px] uppercase text-[#6b7890] font-black">
                      Date
                    </th>
                    <th className="px-6 py-3 text-[11px] uppercase text-[#6b7890] font-black">
                      Location
                    </th>
                    <th className="px-6 py-3 text-[11px] uppercase text-[#6b7890] font-black">
                      Status
                    </th>
                    <th className="px-6 py-3 text-[11px] uppercase text-[#6b7890] font-black text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#eef2f7]">
                  {eventsLoading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-8 text-center text-[#6b7890] text-[13px] font-semibold"
                      >
                        Loading records...
                      </td>
                    </tr>
                  ) : filteredManagedEvents.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-8 text-center text-[#6b7890] text-[13px] font-semibold"
                      >
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    paginatedManagedEvents.map((event) => (
                      <tr key={event.id} className="hover:bg-[#fbfcfe]">
                        <td className="px-6 py-4">
                          <p className="text-[#071d4f] text-[13px] font-bold">
                            {event.title}
                          </p>
                          <p className="text-[#6b7890] text-[12px] mt-1">
                            {event.speaker ||
                              event.instructor ||
                              "No speaker added"}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-[#071d4f] text-[13px] font-semibold">
                          {event.date || "-"}
                        </td>
                        <td className="px-6 py-4 text-[#071d4f] text-[13px] font-semibold">
                          {event.location || "-"}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex h-[28px] items-center rounded-full bg-[#eef7f0] px-3 text-[11px] font-bold uppercase text-[#24852c]">
                            {event.status || "published"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            {event.type === "conference" && (
                              <button
                                onClick={() =>
                                  navigate(
                                    `/admin/conferences/${event.id}/content`,
                                  )
                                }
                                className="h-[36px] px-3 rounded-[10px] bg-[#e2ac39]/15 text-[#9a6b08] text-[11px] font-bold flex items-center justify-center hover:bg-[#e2ac39] hover:text-[#071d4f] transition"
                                title="Manage conference page"
                              >
                                Page
                              </button>
                            )}
                            {event.type === "workshop" && (
                              <button
                                onClick={() =>
                                  navigate(
                                    `/admin/workshops/${event.id}/content`,
                                  )
                                }
                                className="h-[36px] px-3 rounded-[10px] bg-[#e2ac39]/15 text-[#9a6b08] text-[11px] font-bold flex items-center justify-center hover:bg-[#e2ac39] hover:text-[#071d4f] transition"
                                title="Manage workshop page"
                              >
                                Page
                              </button>
                            )}
                            {event.type === "webinar" && (
                              <button
                                onClick={() =>
                                  navigate(
                                    `/admin/webinars/${event.id}/content`,
                                  )
                                }
                                className="h-[36px] px-3 rounded-[10px] bg-[#e2ac39]/15 text-[#9a6b08] text-[11px] font-bold flex items-center justify-center hover:bg-[#e2ac39] hover:text-[#071d4f] transition"
                                title="Manage webinar page"
                              >
                                Page
                              </button>
                            )}
                            {/* <button
                              onClick={() =>
                                navigate(
                                  `/admin/create-event?type=${event.type}&id=${event.id}`,
                                )
                              }
                              className="w-[36px] h-[36px] rounded-[10px] bg-[#0875c9]/10 text-[#0875c9] flex items-center justify-center hover:bg-[#0875c9] hover:text-white transition"
                              title="Edit"
                            >
                              <Edit3 size={16} />
                            </button> */}
                            {/* <button
                              onClick={() => deleteManagedEvent(event)}
                              className="w-[36px] h-[36px] rounded-[10px] bg-[#ff352e]/10 text-[#ff352e] flex items-center justify-center hover:bg-[#ff352e] hover:text-white transition"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-[#eef2f7] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-[#6b7890] text-[12px] font-semibold">
                Showing {paginatedManagedEvents.length} of{" "}
                {filteredManagedEvents.length} records
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={eventPage === 1}
                  onClick={() => setEventPage((page) => Math.max(page - 1, 1))}
                  className="h-[34px] px-3 rounded-[10px] border border-[#dfe7f1] text-[#071d4f] text-[12px] font-bold disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-[#071d4f] text-[12px] font-bold">
                  {eventPage} / {totalEventPages}
                </span>
                <button
                  disabled={eventPage === totalEventPages}
                  onClick={() =>
                    setEventPage((page) => Math.min(page + 1, totalEventPages))
                  }
                  className="h-[34px] px-3 rounded-[10px] border border-[#dfe7f1] text-[#071d4f] text-[12px] font-bold disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </section>

          {/* members */}
                    <section className="mt-7 bg-white rounded-[24px] border border-[#e5ebf4] shadow-[0_14px_35px_rgba(7,29,79,0.06)] overflow-hidden">
            <div className="px-5 sm:px-6 py-5 border-b border-[#eef2f7] flex items-center justify-between">
              <div>
                <h2 className="text-[#071d4f] text-[16px] font-bold uppercase">
                  Members Management
                </h2>
                <p className="text-[#6b7890] text-[12px] font-medium mt-1">
                  Manage member records, tiers and status.
                </p>
              </div>

              <button
                onClick={() => navigate("/admin/members")}
                className="h-[38px] px-4 rounded-[12px] bg-[#e2ac39] text-[#071d4f] text-[12px] font-bold flex items-center gap-2"
              >
                <PlusCircle size={15} />
                Add Member
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="bg-[#f8fafd] border-b border-[#eef2f7]">
                  <tr>
                    <th className="px-6 py-3 text-[11px] uppercase text-[#6b7890] font-black">
                      Name
                    </th>
                    <th className="px-6 py-3 text-[11px] uppercase text-[#6b7890] font-black">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-[11px] uppercase text-[#6b7890] font-black">
                     Designation
                    </th>
                    <th className="px-6 py-3 text-[11px] uppercase text-[#6b7890] font-black">
                      Department
                    </th>
                   
                    {/* <th className="px-6 py-3 text-[11px] uppercase text-[#6b7890] font-black text-right">
            Actions
          </th> */}
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#eef2f7]">
                  {membersLoading ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-8 text-center text-[#6b7890] text-[13px] font-semibold"
                      >
                        Loading members...
                      </td>
                    </tr>
                  ) : members.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-8 text-center text-[#6b7890] text-[13px] font-semibold"
                      >
                        No members found.
                      </td>
                    </tr>
                  ) : (
                    members.map((member) => (
                      <tr key={member.id} className="hover:bg-[#fbfcfe]">
                        <td className="px-6 py-4">
                          <p className="text-[#071d4f] text-[13px] font-bold">
                            {member.name}
                          </p>
                        
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-[#071d4f] text-[13px] font-semibold">
                            {member.email}
                          </p>
                        
                        </td>

                        <td className="px-6 py-4 text-[#071d4f] text-[13px]">
                          {member.designation || "-"}
                        </td>

                        <td className="px-6 py-4 text-[#071d4f] text-[13px] font-semibold">
                          {member.department || "-"}
                        </td>

                        

                        {/* <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() =>
  navigate(
    "/admin/members",
    {
      state: {
        editMember: member,
      },
    }
  )
}
                    className="w-[40px] h-[40px] rounded-[12px] bg-blue-50 text-blue-600 flex items-center justify-center"
                  >
                    <Edit3 size={18} />
                  </button>

                  <button
                    onClick={() => deleteMember(member)}
                    className="w-[40px] h-[40px] rounded-[12px] bg-red-50 text-red-600 flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* membershiptier management */}
          <section className="mt-7 bg-white rounded-[24px] border border-[#e5ebf4] shadow-[0_14px_35px_rgba(7,29,79,0.06)] overflow-hidden">
            <div className="px-5 sm:px-6 py-5 border-b border-[#eef2f7] flex items-center justify-between">
              <div>
                <h2 className="text-[#071d4f] text-[16px] font-bold uppercase">
                  Membership Tiers
                </h2>
                <p className="text-[#6b7890] text-[12px] font-medium mt-1">
                  Manage membership categories and benefits.
                </p>
              </div>

              <button
                onClick={() => navigate("/admin/membership-tiers")}
                className="h-[38px] px-4 rounded-[12px] bg-[#e2ac39] text-[#071d4f] text-[12px] font-bold flex items-center gap-2"
              >
                <PlusCircle size={15} />
                Manage
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-[#f8fafd] border-b border-[#eef2f7]">
                  <tr>
                    <th className="px-6 py-3 text-[11px] uppercase text-[#6b7890] font-black">
                      Name
                    </th>
                    <th className="px-6 py-3 text-[11px] uppercase text-[#6b7890] font-black">
                      INR Price
                    </th>
                    <th className="px-6 py-3 text-[11px] uppercase text-[#6b7890] font-black">
                      USD Price
                    </th>
                    <th className="px-6 py-3 text-[11px] uppercase text-[#6b7890] font-black">
                      Benefits
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#eef2f7]">
                  {tiersLoading ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-8 text-center text-[#6b7890] text-[13px] font-semibold"
                      >
                        Loading membership tiers...
                      </td>
                    </tr>
                  ) : membershipTiers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-8 text-center text-[#6b7890] text-[13px] font-semibold"
                      >
                        No membership tiers found.
                      </td>
                    </tr>
                  ) : (
                    membershipTiers.map((tier) => (
                      <tr key={tier.id} className="hover:bg-[#fbfcfe]">
                        <td className="px-6 py-4">
                          <p className="text-[#071d4f] text-[13px] font-bold">
                            {tier.name}
                          </p>
                          <p className="text-[#6b7890] text-[12px] mt-1">
                            {tier.description || "-"}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-[#071d4f] text-[13px] font-semibold">
                          {tier.priceINR}
                        </td>

                        <td className="px-6 py-4 text-[#071d4f] text-[13px] font-semibold">
                          {tier.priceUSD}
                        </td>

                        <td className="px-6 py-4 text-[#6b7890] text-[12px]">
                          {(tier.benefits || []).slice(0, 3).join(", ")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* BOTTOM */}
          <section className="grid xl:grid-cols-[1.35fr_0.65fr] gap-6 mt-7">
            {/* RECENT VIEWS */}
            <div className="bg-white rounded-[28px] border border-[#e5ebf4] shadow-[0_14px_35px_rgba(7,29,79,0.06)] overflow-hidden">
              <div className="px-6 py-5 border-b border-[#eef2f7] flex items-center justify-between">
                <div>
                  <h2 className="text-[#071d4f] text-[16px] font-bold uppercase">
                    Recent Views
                  </h2>
                  <p className="text-[#6b7890] text-[12px] font-medium mt-1">
                    Recently opened dashboard pages
                  </p>
                </div>

                <Eye className="text-[#e2ac39]" size={23} />
              </div>

              <div className="divide-y divide-[#eef2f7]">
                {recentViews.length === 0 ? (
                  <div className="p-6 text-[#6b7890] text-[12px] font-medium">
                    No recent views available.
                  </div>
                ) : (
                  recentViews.map((item) => (
                    <button
                      key={`recent-${item.page}-${item.viewedAt}`}
                      className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#f8fafd] transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-[44px] h-[44px] rounded-[15px] bg-[#0875c9]/10 flex items-center justify-center">
                          <Eye size={21} className="text-[#0875c9]" />
                        </div>

                        <div>
                          <h4 className="text-[#071d4f] text-[14px] font-bold">
                            {item.page}
                          </h4>
                          <p className="text-[#6b7890] text-[12px] mt-1">
                            {new Date(item.viewedAt).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      {/* <ArrowRight size={17} className="text-[#9aa6b8]" /> */}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* QUICK ACTION */}
            <div className="bg-white rounded-[28px] border border-[#e5ebf4] p-6 shadow-[0_14px_35px_rgba(7,29,79,0.06)]">
              <p className="text-[#e2ac39] text-[12px] font-bold uppercase tracking-[1.5px]">
                Quick Actions
              </p>

              <h3 className="text-[#071d4f] text-[16px] font-bold mt-2 leading-tight">
                Create and manage academic events
              </h3>

              <p className="text-[#6b7890] text-[12px] leading-[1.7] mt-2">
                Add conferences, webinars, and workshops directly from your
                admin panel.
              </p>

              <div className="mt-6 space-y-3">
                {boxes.slice(0, 5).map((box) => {
                  const Icon = box.icon;

                  return (
                    <button
                      key={`quick-${box.title}-${box.path}`}
                      onClick={() => {
                        saveRecentView(box.title, box.path);
                        navigate(box.path);
                      }}
                      className="w-full h-[48px] rounded-[16px] bg-[#f7f9fc] border border-[#edf1f6] px-4 flex items-center justify-between transition-all duration-300 hover:bg-[#071d4f] group"
                    >
                      <span className="flex items-center gap-3">
                        <Icon
                          size={18}
                          className="text-[#071d4f] group-hover:text-white"
                        />
                        <span className="text-[#071d4f] text-[12px] font-bold group-hover:text-white">
                          {box.title}
                        </span>
                      </span>

                      <PlusCircle
                        size={18}
                        className="text-[#9aa6b8] group-hover:text-[#e2ac39]"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
          {/* EXISTING CONTACTS */}

          {footerOpen && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
              <div
                onClick={() => setFooterOpen(false)}
                className="absolute inset-0 bg-[#071d4f]/60 backdrop-blur-sm"
              />

              <div className="relative w-full max-w-[980px] bg-white rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.25)] overflow-hidden">
                <div className="px-6 py-5 bg-[#071d4f] flex items-center justify-between">
                  <h2 className="text-white text-[18px] font-bold">
                    Manage Footer Contact
                  </h2>

                  <button
                    onClick={() => setFooterOpen(false)}
                    className="text-white text-[22px] font-bold"
                  >
                    ×
                  </button>
                </div>

                <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                  <div className="border border-[#e5ebf4] rounded-[14px] p-4 bg-[#f8fafd]">
                    <h3 className="text-[#071d4f] text-[14px] font-black uppercase mb-3">
                      Add Footer Contact
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <select
                        value={footerForm.type}
                        onChange={(e) =>
                          setFooterForm((prev) => ({
                            ...prev,
                            type: e.target.value,
                          }))
                        }
                        className="h-[42px] rounded-[10px] border border-[#dfe7f1] px-3 text-[13px] text-[#071d4f]"
                      >
                        <option value="address">Address</option>
                        <option value="email">Email</option>
                        <option value="website">Website</option>
                        <option value="phone">Phone</option>
                      </select>

                      <input
                        value={footerForm.label}
                        onChange={(e) =>
                          setFooterForm((prev) => ({
                            ...prev,
                            label: e.target.value,
                          }))
                        }
                        placeholder="Label"
                        className="h-[42px] rounded-[10px] border border-[#dfe7f1] px-3 text-[13px] text-[#071d4f]"
                      />

                      <input
                        value={footerForm.value}
                        onChange={(e) =>
                          setFooterForm((prev) => ({
                            ...prev,
                            value: e.target.value,
                          }))
                        }
                        placeholder="Value"
                        className="h-[42px] rounded-[10px] border border-[#dfe7f1] px-3 text-[13px] text-[#071d4f]"
                      />

                      <input
                        type="number"
                        value={footerForm.order}
                        onChange={(e) =>
                          setFooterForm((prev) => ({
                            ...prev,
                            order: Number(e.target.value),
                          }))
                        }
                        placeholder="Order"
                        className="h-[42px] rounded-[10px] border border-[#dfe7f1] px-3 text-[13px] text-[#071d4f]"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={createFooterContact}
                      className="mt-3 h-[40px] px-5 rounded-[10px] bg-[#e2ac39] text-[#071d4f] text-[12px] font-black"
                    >
                      Add Contact
                    </button>
                  </div>

                  {footerLoading ? (
                    <p className="text-[#071d4f] font-bold">Loading...</p>
                  ) : footerContacts.length === 0 ? (
                    <p className="text-[#6b7890] text-sm">
                      No footer contacts found.
                    </p>
                  ) : (
                    <div className="overflow-x-auto border border-[#e5ebf4] rounded-[14px]">
                      <table className="w-full min-w-[850px] text-left">
                        <thead className="bg-[#f8fafd]">
                          <tr>
                            <th className="px-4 py-3 text-[11px] uppercase text-[#6b7890] font-black">
                              Type
                            </th>
                            <th className="px-4 py-3 text-[11px] uppercase text-[#6b7890] font-black">
                              Label
                            </th>
                            <th className="px-4 py-3 text-[11px] uppercase text-[#6b7890] font-black">
                              Value
                            </th>
                            <th className="px-4 py-3 text-[11px] uppercase text-[#6b7890] font-black">
                              Order
                            </th>
                            <th className="px-4 py-3 text-[11px] uppercase text-[#6b7890] font-black text-right">
                              Actions
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-[#eef2f7]">
                          {footerContacts.map((item) => {
                            const isEditing = editingFooterId === item.id;

                            return (
                              <tr key={item.id} className="hover:bg-[#fbfcfe]">
                                <td className="px-4 py-3">
                                  {isEditing ? (
                                    <select
                                      value={editingFooterForm.type}
                                      onChange={(e) =>
                                        setEditingFooterForm((prev) => ({
                                          ...prev,
                                          type: e.target.value,
                                        }))
                                      }
                                      className="h-[36px] rounded-[8px] border border-[#dfe7f1] px-2 text-[12px]"
                                    >
                                      <option value="address">Address</option>
                                      <option value="email">Email</option>
                                      <option value="website">Website</option>
                                      <option value="phone">Phone</option>
                                    </select>
                                  ) : (
                                    item.type
                                  )}
                                </td>

                                <td className="px-4 py-3">
                                  {isEditing ? (
                                    <input
                                      value={editingFooterForm.label}
                                      onChange={(e) =>
                                        setEditingFooterForm((prev) => ({
                                          ...prev,
                                          label: e.target.value,
                                        }))
                                      }
                                      className="h-[36px] w-[130px] rounded-[8px] border border-[#dfe7f1] px-2 text-[12px]"
                                    />
                                  ) : (
                                    item.label
                                  )}
                                </td>

                                <td className="px-4 py-3">
                                  {isEditing ? (
                                    <input
                                      value={editingFooterForm.value}
                                      onChange={(e) =>
                                        setEditingFooterForm((prev) => ({
                                          ...prev,
                                          value: e.target.value,
                                        }))
                                      }
                                      className="h-[36px] w-[260px] rounded-[8px] border border-[#dfe7f1] px-2 text-[12px]"
                                    />
                                  ) : (
                                    item.value
                                  )}
                                </td>

                                <td className="px-4 py-3">
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={editingFooterForm.order}
                                      onChange={(e) =>
                                        setEditingFooterForm((prev) => ({
                                          ...prev,
                                          order: Number(e.target.value),
                                        }))
                                      }
                                      className="h-[36px] w-[70px] rounded-[8px] border border-[#dfe7f1] px-2 text-[12px]"
                                    />
                                  ) : (
                                    item.order
                                  )}
                                </td>

                                <td className="px-4 py-3">
                                  <div className="flex justify-end gap-2">
                                    {isEditing ? (
                                      <>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            saveEditFooter(item.id)
                                          }
                                          className="h-[34px] px-3 rounded-[8px] bg-green-50 text-green-700 text-[12px] font-bold"
                                        >
                                          Save
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() =>
                                            setEditingFooterId(null)
                                          }
                                          className="h-[34px] px-3 rounded-[8px] bg-gray-100 text-gray-600 text-[12px] font-bold"
                                        >
                                          Cancel
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          type="button"
                                          onClick={() => startEditFooter(item)}
                                          className="h-[34px] px-3 rounded-[8px] bg-blue-50 text-blue-600 text-[12px] font-bold"
                                        >
                                          Edit
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() =>
                                            deleteFooterContact(item.id)
                                          }
                                          className="h-[34px] px-3 rounded-[8px] bg-red-50 text-red-600 text-[12px] font-bold"
                                        >
                                          Delete
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
