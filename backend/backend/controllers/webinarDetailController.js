const Event = require('../models/Event');
const WebinarDetail = require('../models/WebinarDetail');

async function publicDetail(req, res) {
  const event = await Event.findByPk(req.params.eventId);

  if (!event || event.type !== 'webinar') {
    return res.status(404).json({ error: 'Webinar not found' });
  }

  const [detail] = await WebinarDetail.findOrCreate({
    where: { eventId: event.id },
    defaults: getDefaultWebinarDetail(event),
  });

  res.json({ event, detail });
}

async function adminDetail(req, res) {
  const event = await Event.findByPk(req.params.eventId);

  if (!event || event.type !== 'webinar') {
    return res.status(404).json({ error: 'Webinar not found' });
  }

  const [detail] = await WebinarDetail.findOrCreate({
    where: { eventId: event.id },
    defaults: getDefaultWebinarDetail(event),
  });

  res.json({ event, detail });
}

async function upsert(req, res) {
  const event = await Event.findByPk(req.params.eventId);

  if (!event || event.type !== 'webinar') {
    return res.status(404).json({ error: 'Webinar not found' });
  }

  const payload = sanitizePayload(req.body, event);
  const [detail] = await WebinarDetail.findOrCreate({
    where: { eventId: event.id },
    defaults: { eventId: event.id, ...payload },
  });

  if (!detail.isNewRecord) {
    await detail.update(payload);
  }

  res.json({ event, detail });
}

function sanitizePayload(body, event) {
  const defaults = getDefaultWebinarDetail(event);

  return {
    basic: objectOrDefault(body.basic, defaults.basic),
    hero: objectOrDefault(body.hero, defaults.hero),
    infoBar: objectOrDefault(body.infoBar, defaults.infoBar),
    about: objectOrDefault(body.about, defaults.about),
    topics: arrayOrDefault(body.topics, defaults.topics),
    speakers: arrayOrDefault(body.speakers, defaults.speakers),
    joiningSteps: arrayOrDefault(body.joiningSteps, defaults.joiningSteps),
    registrations: arrayOrDefault(body.registrations, defaults.registrations),
    targetAudience: arrayOrDefault(body.targetAudience, defaults.targetAudience),
    highlights: arrayOrDefault(body.highlights, defaults.highlights),
    organizer: objectOrDefault(body.organizer, defaults.organizer),
    platform: objectOrDefault(body.platform, defaults.platform),
    resources: objectOrDefault(body.resources, defaults.resources),
    faqs: arrayOrDefault(body.faqs, defaults.faqs),
    mediaGallery: objectOrDefault(body.mediaGallery, defaults.mediaGallery),
    cta: objectOrDefault(body.cta, defaults.cta),
    seo: objectOrDefault(body.seo, defaults.seo),
    socialSharing: objectOrDefault(body.socialSharing, defaults.socialSharing),
    analytics: objectOrDefault(body.analytics, defaults.analytics),
    controls: objectOrDefault(body.controls, defaults.controls),
  };
}

function objectOrDefault(value, fallback) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : fallback;
}

function arrayOrDefault(value, fallback) {
  return Array.isArray(value) ? value : fallback;
}

function slugify(value) {
  return String(value || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function getDefaultWebinarDetail(event) {
  return {
    eventId: event.id,
    basic: {
      title: event.title || '',
      slug: slugify(event.title),
      subtitle: '',
      type: 'Webinar',
      category: '',
      shortDescription: event.description || '',
      fullDescription: event.description || '',
      status: event.status || 'published',
      featured: Boolean(event.isFeatured),
    },
    hero: {
      backgroundImage: event.imageUrl || '',
      thumbnail: '',
      date: event.date || '',
      time: event.time || '',
      platform: event.location || 'Online',
      mode: 'Online',
      ctaText: 'Register Now',
      ctaUrl: event.link || 'https://membership.siaresociety.org/register',
      calendarUrl: '',
      brochureUrl: '',
    },
    infoBar: {
      date: event.date || '',
      time: event.time || '',
      eventType: 'Webinar',
      platform: event.location || 'Online',
      mainSpeaker: event.speaker || '',
      status: event.status || 'Upcoming',
    },
    about: {
      title: 'About The Webinar',
      description: event.description || '',
      objective: [],
      benefits: [],
    },
    topics: [
      { title: 'Introduction to Research Publishing', description: 'Understanding the journey from research to publication.', icon: 'BookOpen', color: '#0d6efd' },
      { title: 'Publication Ethics', description: 'Core principles and guidelines for ethical publishing.', icon: 'Scale', color: '#e2ac39' },
      { title: 'Peer Review Process', description: 'How peer review ensures quality and integrity.', icon: 'Users', color: '#22a447' },
    ],
    speakers: [],
    joiningSteps: [
      { title: 'Step 1', description: 'Register for the webinar using the registration form.', icon: 'ClipboardCheck', order: 1 },
      { title: 'Step 2', description: 'Receive the webinar link via email before the event.', icon: 'Mail', order: 2 },
      { title: 'Step 3', description: 'Join the webinar on time and participate in the live session.', icon: 'Monitor', order: 3 },
    ],
    registrations: [
      { title: 'Standard Registration', startDate: '', endDate: '', fee: 'Free', currency: '', benefits: ['Webinar access'], url: event.link || '' },
    ],
    targetAudience: [
      { title: 'Researchers', description: '', icon: 'Users' },
      { title: 'Academicians', description: '', icon: 'BookOpen' },
      { title: 'Students', description: '', icon: 'Users' },
    ],
    highlights: [
      { title: 'Expert insights from industry leaders', icon: 'CheckCircle' },
      { title: 'Live Q&A Session', icon: 'CheckCircle' },
      { title: 'E-Certificate for all participants', icon: 'CheckCircle' },
    ],
    organizer: {
      name: 'SIARE Proceedings Platform',
      logo: '',
      description: 'Global Academic Network',
      email: 'info@siare.org',
      phone: '+91 123 456 7890',
      website: 'www.siare.org',
      socialLinks: [],
    },
    platform: {
      name: event.location || 'Online',
      meetingUrl: event.link || '',
      accessInstructions: '',
      technicalRequirements: '',
      supportContact: '',
    },
    resources: {
      certificateAvailable: true,
      certificateTemplateUrl: '',
      recordingUrl: '',
      slidesUrl: '',
      resourcePdfs: [],
      eCertificateConfig: {},
    },
    faqs: [],
    mediaGallery: { images: [], videos: [], enabled: true },
    cta: {
      title: 'Gain valuable insights and learn best practices',
      description: 'Join this webinar for ethical and impactful research publishing.',
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
      structuredData: {},
    },
    socialSharing: {
      facebookUrl: '',
      linkedInUrl: '',
      twitterUrl: '',
      whatsappUrl: '',
      customMessage: event.title || '',
    },
    analytics: {
      capacity: '',
      registeredUsersCount: 0,
      attendanceTracking: false,
      webinarAnalytics: {},
      engagementMetrics: {},
    },
    controls: {
      publishStatus: 'published',
      visibility: 'public',
      featured: Boolean(event.isFeatured),
      archive: false,
      sortOrder: Number(event.order) || 0,
    },
  };
}

module.exports = { adminDetail, publicDetail, upsert };
