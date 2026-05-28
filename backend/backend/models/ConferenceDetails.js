const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const jsonDefault = (value) => ({
  type: DataTypes.JSON,
  defaultValue: value,
});

const ConferenceDetail = sequelize.define('ConferenceDetail', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },

  eventId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    unique: true,
  },

  basic: jsonDefault({
    title: '',
    slug: '',
    subtitle: '',
    type: 'Conference',
    category: '',
    shortDescription: '',
    fullDescription: '',
    status: 'published',
    featured: false,
  }),

  hero: jsonDefault({
    backgroundImage: '',
    conferenceImage: '',
    badgeText: 'Conference',
    date: '',
    time: '',
    location: '',
    eventMode: 'In-Person Event',
    ctaText: 'Register Now',
    ctaUrl: '',
    brochureUrl: '',
    shareUrl: '',
  }),

  infoBar: jsonDefault({
    date: '',
    location: '',
    eventType: 'Conference',
    mainSpeaker: '',
    organizedBy: '',
    status: 'published',
  }),

  about: jsonDefault({
    title: 'About The Event',
    description: '',
    secondDescription: '',
  }),

  themes: jsonDefault([
    {
      title: 'Mechanical Engineering',
      description: '',
      icon: 'Settings',
      color: '#006aff',
    },
    {
      title: 'Civil & Structural Engineering',
      description: '',
      icon: 'Building2',
      color: '#d6a62c',
    },
    {
      title: 'Electrical & Electronics Engineering',
      description: '',
      icon: 'Cpu',
      color: '#7c3aed',
    },
    {
      title: 'Computer Science & IT',
      description: '',
      icon: 'Laptop',
      color: '#ff6b22',
    },
  ]),

  registrations: jsonDefault([
    {
      title: 'Early Bird Registration',
      date: '',
      description: '',
      fee: '',
      currency: 'INR',
      url: '',
    },
    {
      title: 'Standard Registration',
      date: '',
      description: '',
      fee: '',
      currency: 'INR',
      url: '',
    },
    {
      title: 'Late Registration',
      date: '',
      description: '',
      fee: '',
      currency: 'INR',
      url: '',
    },
  ]),

  highlights: jsonDefault([
    { title: 'Keynote & Plenary Sessions' },
    { title: 'Technical Paper Presentations' },
    { title: 'Workshops & Tutorials' },
    { title: 'Panel Discussions' },
    { title: 'Exhibition & Networking' },
    { title: 'Best Paper Awards' },
    { title: 'Publication Opportunities' },
  ]),

  venue: jsonDefault({
    title: 'Venue Information',
    name: '',
    description: '',
    image: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    mapUrl: '',
    facilities: [],
    buttonText: 'View Venue Details',
    buttonUrl: '',
  }),

  importantDates: jsonDefault([
    {
      date: '',
      title: 'Early Bird Registration Ends',
    },
    {
      date: '',
      title: 'Standard Registration Ends',
    },
    {
      date: '',
      title: 'Late Registration Ends',
    },
    {
      date: '',
      title: 'Paper Submission Deadline',
    },
    {
      date: '',
      title: 'Conference Begins',
    },
  ]),

  organizer: jsonDefault({
    name: '',
    email: '',
    phone: '',
    website: '',
    whatsapp: '',
    supportEmail: '',
  }),

  cta: jsonDefault({
    title: '',
    description: '',
    buttonText: 'Register Now',
    buttonUrl: '',
    backgroundImage: '',
  }),

  seo: jsonDefault({
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    openGraphImage: '',
    canonicalUrl: '',
    socialShareImage: '',
  }),

  socialSharing: jsonDefault({
    facebookUrl: '',
    linkedInUrl: '',
    twitterUrl: '',
    whatsappUrl: '',
    customMessage: '',
  }),

  controls: jsonDefault({
    publishStatus: 'draft',
    visibility: 'private',
    archive: false,
    featured: false,
    sortOrder: 0,
  }),

  
});

module.exports = ConferenceDetail;