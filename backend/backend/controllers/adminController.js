const { Op } = require('sequelize');
const Conference = require('../models/Conference');
const Event = require('../models/Event');
const Inquiry = require('../models/Inquiry');
const Journal = require('../models/Journal');
const Member = require('../models/Member');
const MembershipTier = require('../models/MembershipTier');
const PricingPlan = require('../models/PricingPlan');
const createResourceController = require('./resourceController');


const conferences = createResourceController(Conference, {
  defaultSort: { order: 1, createdAt: -1 },

  searchFields: [
    "title",
    "shortTitle",
    "theme",
    "venue",
    "country",
    "status",
    "location",
    "type",
  ],

 listFilter: (req) => {
  const filter = {};

  if (req.query.featured === "true") {
    filter.isFeatured = true;
  }

  if (req.query.active === "true") {
    filter.isActive = true;
  }

  if (req.query.active === "false") {
    filter.isActive = false;
  }

 if (req.query.status) {
  filter.status = req.query.status;
}

  return filter;
},

  sanitize: (data) => ({
    ...data,

    // ARRAYS
    modes: Array.isArray(data.modes) ? data.modes : [],

    paperCategories: Array.isArray(data.paperCategories)
      ? data.paperCategories
      : [],

    themes: Array.isArray(data.themes)
      ? data.themes
      : [],

    registrations: Array.isArray(data.registrations)
      ? data.registrations
      : [],

    highlights: Array.isArray(data.highlights)
      ? data.highlights
      : [],

    importantDates: Array.isArray(data.importantDates)
      ? data.importantDates
      : [],

    speakers: Array.isArray(data.speakers)
      ? data.speakers
      : [],

    sponsors: Array.isArray(data.sponsors)
      ? data.sponsors
      : [],

    gallery: Array.isArray(data.gallery)
      ? data.gallery
      : [],

    testimonials: Array.isArray(data.testimonials)
      ? data.testimonials
      : [],

    faq: Array.isArray(data.faq)
      ? data.faq
      : [],

    schedule: Array.isArray(data.schedule)
      ? data.schedule
      : [],

    // OBJECTS
    venueDetails:
      data.venueDetails &&
      typeof data.venueDetails === "object"
        ? data.venueDetails
        : {},

    cta:
      data.cta &&
      typeof data.cta === "object"
        ? data.cta
        : {},

    // NUMBERS
    order: Number(data.order) || 0,

    // BOOLEANS
    isFeatured:
      data.isFeatured !== undefined
        ? Boolean(data.isFeatured)
        : false,

    isActive:
      data.isActive !== undefined
        ? Boolean(data.isActive)
        : true,
  }),
});

// module.exports = conferences;

const events = createResourceController(Event, {
  defaultSort: { order: 1, createdAt: -1 },
  searchFields: ['title', 'description', 'speaker', 'instructor', 'location', 'status'],
  listFilter: (req) => {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.featured === 'true') filter.isFeatured = true;
    if (req.query.status) filter.status = req.query.status;
    return filter;
  },
  sanitize: (data) => ({
    ...data,
    type: String(data.type || 'workshop'),
    title: String(data.title || ''),
    order: Number(data.order) || 0,
    isFeatured: Boolean(data.isFeatured),
  }),
});

const inquiries = createResourceController(Inquiry, {
  defaultSort: { createdAt: -1 },
  searchFields: ['name', 'email', 'phone', 'institution', 'subject', 'purpose', 'tier', 'message'],
  listFilter: (req) => {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.purpose) filter.purpose = req.query.purpose;
    if (req.query.tier) filter.tier = req.query.tier;
    return filter;
  },
  sanitize: (data) => ({
    ...data,
    name: String(data.name || ''),
    email: String(data.email || ''),
    message: String(data.message || data.aboutDetails || ''),
    status: data.status || 'pending',
  }),
});

const journals = createResourceController(Journal, {
  defaultSort: { createdAt: -1 },
  searchFields: ['name', 'description', 'issn', 'domain'],
  listFilter: (req) => {
    const filter = {};
    if (req.query.featured === 'true') filter.isFeatured = true;
    if (req.query.domain) filter.domain = { [Op.like]: `%${req.query.domain}%` };
    return filter;
  },
  sanitize: (data) => ({
    ...data,
    indexing: Array.isArray(data.indexing) ? data.indexing : [],
    isFeatured: Boolean(data.isFeatured),
  }),
});

const members = createResourceController(Member, {
  defaultSort: { createdAt: -1 },

  searchFields: [
    "memberCode",
    "name",
    "designation",
    "email",
    "department",
    "phone",
    "scopus",
    "orcid",
  ],

  sanitize: (data) => ({
    memberCode: data.memberCode || "",

    name: String(data.name || ""),

    designation: data.designation || "",

    email: String(data.email || "")
      .toLowerCase()
      .trim(),

    department: data.department || "",

    phone: data.phone || "",

    imageUrl: data.imageUrl || "",

    scopus: data.scopus || "",

    orcid: data.orcid || "",
  }),
});

const membershipTiers = createResourceController(MembershipTier, {
  defaultSort: { order: 1, createdAt: -1 },
  searchFields: ['name', 'description'],
  sanitize: (data) => ({
    ...data,
    benefits: Array.isArray(data.benefits) ? data.benefits : [],
    order: Number(data.order) || 0,
  }),
});

const pricingPlans = createResourceController(PricingPlan, {
  defaultSort: { order: 1, createdAt: -1 },
  searchFields: ['name', 'description', 'tag'],
  listFilter: (req) => {
    const filter = {};
    if (req.query.highlight === 'true') filter.highlight = true;
    if (req.query.highlight === 'false') filter.highlight = false;
    if (req.query.tag) filter.tag = req.query.tag;
    return filter;
  },
  sanitize: (data) => ({
    ...data,
    features: Array.isArray(data.features) ? data.features : [],
    highlight: Boolean(data.highlight),
    order: Number(data.order) || 0,
  }),
});

async function updateInquiryStatus(req, res) {
  const inquiry = await Inquiry.findByPk(req.params.id);

  if (!inquiry) {
    return res.status(404).json({ error: 'Record not found' });
  }

  await inquiry.update({ status: req.body.status });
  res.json(inquiry);
}

module.exports = {
  conferences,
  events,
  inquiries,
  journals,
  members,
  membershipTiers,
  pricingPlans,
  updateInquiryStatus,
};
