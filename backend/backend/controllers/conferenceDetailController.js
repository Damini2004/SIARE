const Event = require('../models/Event');
const ConferenceDetail = require('../models/ConferenceDetails');

async function publicDetail(req, res) {
  const event = await Event.findByPk(req.params.eventId);

  if (!event || event.type !== 'conference') {
    return res.status(404).json({ error: 'Conference not found' });
  }

  const detail = await ConferenceDetail.findOne({ where: { eventId: event.id } });

  res.json({
    event,
    detail: detail || null,
  });
}

async function adminDetail(req, res) {
  const event = await Event.findByPk(req.params.eventId);

  if (!event || event.type !== 'conference') {
    return res.status(404).json({ error: 'Conference not found' });
  }

  const [detail] = await ConferenceDetail.findOrCreate({
    where: { eventId: event.id },
    defaults: getDefaultConferenceDetail(event),
  });

  res.json({
    event,
    detail,
  });
}

async function upsert(req, res) {
  const event = await Event.findByPk(req.params.eventId);

  if (!event || event.type !== 'conference') {
    return res.status(404).json({ error: 'Conference not found' });
  }

  const payload = sanitizePayload(req.body, event);

  const [detail] = await ConferenceDetail.findOrCreate({
    where: { eventId: event.id },
    defaults: { eventId: event.id, ...payload },
  });

  if (!detail.isNewRecord) {
    await detail.update(payload);
  }

  res.json({
    event,
    detail,
  });
}

function sanitizePayload(body, event) {
  const defaults = getDefaultConferenceDetail(event);

  return {
    basic: objectOrDefault(body.basic, defaults.basic),
    hero: objectOrDefault(body.hero, defaults.hero),
    infoBar: objectOrDefault(body.infoBar, defaults.infoBar),
    about: objectOrDefault(body.about, defaults.about),
    themes: arrayOrDefault(body.themes, defaults.themes),
    speakers: arrayOrDefault(body.speakers, defaults.speakers),
    committee: arrayOrDefault(body.committee, defaults.committee),
    importantDates: arrayOrDefault(body.importantDates, defaults.importantDates),
    registrations: arrayOrDefault(body.registrations, defaults.registrations),
    venue: objectOrDefault(body.venue, defaults.venue),
    organizer: objectOrDefault(body.organizer, defaults.organizer),
    schedule: arrayOrDefault(body.schedule, defaults.schedule),
    sponsors: arrayOrDefault(body.sponsors, defaults.sponsors),
    mediaGallery: objectOrDefault(body.mediaGallery, defaults.mediaGallery),
    cta: objectOrDefault(body.cta, defaults.cta),
    seo: objectOrDefault(body.seo, defaults.seo),
    socialSharing: objectOrDefault(body.socialSharing, defaults.socialSharing),
    controls: objectOrDefault(body.controls, defaults.controls),
  };
}

function objectOrDefault(value, fallback) {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value
    : fallback;
}

function arrayOrDefault(value, fallback) {
  return Array.isArray(value) ? value : fallback;
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getDefaultConferenceDetail(event) {
  return {
    eventId: event.id,

    basic: {
      title: event.title || '',
      slug: slugify(event.title),
      subtitle: '',
      type: 'Conference',
      category: '',
      shortDescription: event.description || '',
      fullDescription: event.description || '',
      status: event.status || 'published',
      featured: Boolean(event.isFeatured),
    },

    hero: {
      backgroundImage: event.imageUrl || '',
      conferenceImage: '',
      badgeText: 'Conference',
      date: event.date || '',
      time: event.time || '',
      location: event.location || '',
      ctaText: 'Register Now',
      ctaUrl: event.link || 'https://membership.siaresociety.org/register',
      calendarUrl: '',
      brochureUrl: '',
    },

    infoBar: {
      date: event.date || '',
      location: event.location || '',
      eventType: 'Conference',
      mainSpeaker: event.speaker || '',
      organizedBy: event.instructor || 'SIARE',
      status: event.status || 'Upcoming',
    },

    about: {
      title: 'About The Conference',
      description: event.description || 'Conference details will be updated soon.',
      objectives: [],
      benefits: [],
    },

    themes: [
      {
        title: 'Artificial Intelligence and Emerging Technologies',
        description: 'Research trends, innovation, and emerging applications.',
        icon: 'Sparkles',
        color: '#0875c9',
      },
      {
        title: 'Engineering and Applied Sciences',
        description: 'Advanced engineering solutions and interdisciplinary research.',
        icon: 'Cpu',
        color: '#43aa37',
      },
    ],

    speakers: [],

    committee: [],

    importantDates: [
      {
        title: 'Paper Submission Deadline',
        date: '',
        description: '',
      },
      {
        title: 'Registration Deadline',
        date: '',
        description: '',
      },
    ],

    registrations: [
      {
        title: 'Standard Registration',
        startDate: '',
        endDate: '',
        fee: 'Free',
        currency: 'INR',
        benefits: ['Conference access'],
        url: event.link || '',
        badgeColor: '#0d6efd',
      },
    ],

    venue: {
      name: event.location || '',
      address: '',
      city: event.location || '',
      state: '',
      country: 'India',
      mapUrl: '',
      image: '',
      description: 'Venue information will be updated soon.',
    },

    organizer: {
      name: event.instructor || 'SIARE',
      email: 'contact@siaresociety.org',
      phone: '+91 738 735 5544',
      website: 'siaresociety.org',
      whatsapp: '',
      supportEmail: 'contact@siaresociety.org',
    },

    schedule: [],

    sponsors: [],

    mediaGallery: {
      images: [],
      videos: [],
      enabled: true,
    },

    cta: {
      title: 'Join the conference and connect with global researchers',
      description: 'Register now to participate in academic discussions and networking.',
      buttonText: 'Register Now',
      buttonUrl: event.link || 'https://membership.siaresociety.org/register',
      backgroundImage: '',
    },

    seo: {
      metaTitle: event.title || '',
      metaDescription: event.description || '',
      metaKeywords: '',
      openGraphImage: event.imageUrl || '',
      canonicalUrl: '',
      socialShareImage: event.imageUrl || '',
    },

    socialSharing: {
      facebookUrl: '',
      linkedInUrl: '',
      twitterUrl: '',
      whatsappUrl: '',
      customMessage: event.title || '',
    },

    controls: {
      publishStatus: 'published',
      visibility: 'public',
      archive: false,
      featured: Boolean(event.isFeatured),
      sortOrder: Number(event.order) || 0,
    },
  };
}

module.exports = {
  adminDetail,
  publicDetail,
  upsert,
};