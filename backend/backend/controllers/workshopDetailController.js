const Event = require('../models/Event');
const WorkshopDetail = require('../models/WorkshopDetail');

async function publicDetail(req, res) {
  const event = await Event.findByPk(req.params.eventId);

  if (!event || event.type !== 'workshop') {
    return res.status(404).json({ error: 'Workshop not found' });
  }

 const [detail] = await WorkshopDetail.findOrCreate({
  where: { eventId: event.id },
  defaults: getDefaultWorkshopDetail(event),
});

  res.json({
    event,
    detail: detail || null,
  });
}

async function adminDetail(req, res) {
  const event = await Event.findByPk(req.params.eventId);

  if (!event || event.type !== 'workshop') {
    return res.status(404).json({ error: 'Workshop not found' });
  }

  const [detail] = await WorkshopDetail.findOrCreate({
    where: { eventId: event.id },
    defaults: getDefaultWorkshopDetail(event),
  });

  res.json({
    event,
    detail,
  });
}

async function upsert(req, res) {
  const event = await Event.findByPk(req.params.eventId);

  if (!event || event.type !== 'workshop') {
    return res.status(404).json({ error: 'Workshop not found' });
  }

  const payload = sanitizePayload(req.body, event);
  const [detail] = await WorkshopDetail.findOrCreate({
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
  const defaults = getDefaultWorkshopDetail(event);

  return {
    basic: objectOrDefault(body.basic, defaults.basic),
    hero: objectOrDefault(body.hero, defaults.hero),
    infoBar: objectOrDefault(body.infoBar, defaults.infoBar),
    about: objectOrDefault(body.about, defaults.about),
    outcomes: arrayOrDefault(body.outcomes, defaults.outcomes),
    facilitators: arrayOrDefault(body.facilitators, defaults.facilitators),
    targetAudience: arrayOrDefault(body.targetAudience, defaults.targetAudience),
    registrations: arrayOrDefault(body.registrations, defaults.registrations),
    highlights: arrayOrDefault(body.highlights, defaults.highlights),
    timeline: arrayOrDefault(body.timeline, defaults.timeline),
    organizer: objectOrDefault(body.organizer, defaults.organizer),
    schedule: arrayOrDefault(body.schedule, defaults.schedule),
    certificates: objectOrDefault(body.certificates, defaults.certificates),
    mediaGallery: objectOrDefault(body.mediaGallery, defaults.mediaGallery),
    testimonials: arrayOrDefault(body.testimonials, defaults.testimonials),
    sponsors: arrayOrDefault(body.sponsors, defaults.sponsors),
    cta: objectOrDefault(body.cta, defaults.cta),
    seo: objectOrDefault(body.seo, defaults.seo),
    socialSharing: objectOrDefault(body.socialSharing, defaults.socialSharing),
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
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getDefaultWorkshopDetail(event) {
  return {
    eventId: event.id,
    basic: {
      title: event.title || '',
      slug: slugify(event.title),
      subtitle: '',
      type: 'Workshop',
      category: '',
      shortDescription: event.description || '',
      fullDescription: event.description || '',
      status: event.status || 'published',
      featured: Boolean(event.isFeatured),
    },
    hero: {
      backgroundImage: event.imageUrl || '',
      workshopImage: '',
      badgeText: 'Workshop',
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
      eventType: 'Workshop',
      mainSpeaker: event.speaker || '',
      organizedBy: event.instructor || 'SIARE',
      status: event.status || 'Upcoming',
    },
    about: {
      title: 'About The Workshop',
      description: event.description || '',
      objectives: [],
      benefits: [],
    },
    outcomes: [
      { title: 'Understand research design and methodology', description: 'Learn to frame research questions and choose appropriate methodologies.', icon: 'Target', color: '#006aff' },
      { title: 'Data collection and management', description: 'Explore tools and techniques for collecting and organizing data effectively.', icon: 'Database', color: '#ff7a1a' },
      { title: 'Data analysis techniques', description: 'Hands-on practice with statistical methods and software tools.', icon: 'BarChart3', color: '#2faa38' },
    ],
    facilitators: [],
    targetAudience: [
      { title: 'Researchers and Academicians', icon: 'GraduationCap', description: 'Academic professionals seeking practical research training.' },
      { title: 'Industry Professionals', icon: 'Landmark', description: 'Professionals applying research methods at work.' },
    ],
    registrations: [
      { title: 'Standard Registration', startDate: '', endDate: '', fee: 'Free', currency: 'INR', benefits: ['Workshop access'], url: event.link || '', badgeColor: '#0d6efd' },
    ],
    highlights: [
      { title: 'Hands-on practical sessions', icon: 'CheckCircle' },
      { title: 'Certificate of participation', icon: 'CheckCircle' },
    ],
    timeline: [],
    organizer: {
      name: event.instructor || 'SIARE',
      email: 'contact@siaresociety.org',
      phone: '+91 738 735 5544',
      website: 'siaresociety.org',
      whatsapp: '',
      supportEmail: 'contact@siaresociety.org',
    },
    schedule: [],
    certificates: { available: true, templateUrl: '', materials: [], resourceLinks: [], recordedSessionUrls: [] },
    mediaGallery: { images: [], videos: [], enabled: true },
    testimonials: [],
    sponsors: [],
    cta: {
      title: 'Enhance your research skills with practical training',
      description: 'Join the workshop and gain real-world learning experience.',
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
