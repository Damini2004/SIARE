const { z } = require('zod');

const booleanish = z.preprocess((value) => {
  if (value === undefined) return value;
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
}, z.boolean());

const stringArray = z.array(z.string().trim().min(1)).default([]);

const conference = z.object({
  title: z.string().trim().min(1),
  shortTitle: z.string().trim().optional(),
  theme: z.string().trim().optional(),
  startDate: z.string().trim().optional(),
  endDate: z.string().trim().optional(),
  venue: z.string().trim().optional(),
  country: z.string().trim().optional(),
  modes: stringArray.optional(),
  about: z.string().trim().optional(),
  websiteUrl: z.string().trim().url().optional().or(z.literal('')),
  contactEmail: z.string().trim().email().optional().or(z.literal('')),
  imageUrl: z.string().trim().optional(),
  brochureUrl: z.string().trim().optional(),
  organizingCommittee: z.string().trim().optional(),
  keynoteSpeakers: z.string().trim().optional(),
  editorialBoard: z.string().trim().optional(),
  tracks: z.string().trim().optional(),
  keywords: z.string().trim().optional(),
  submissionInstructions: z.string().trim().optional(),
  submissionStartDate: z.string().trim().optional(),
  abstractDeadline: z.string().trim().optional(),
  fullPaperDeadline: z.string().trim().optional(),
  registrationDeadline: z.string().trim().optional(),
  paperCategories: stringArray.optional(),
  peerReviewMethod: z.string().trim().optional(),
  color: z.string().trim().optional(),
  order: z.coerce.number().int().optional(),
  isFeatured: booleanish.optional(),
  isActive: booleanish.optional(),
  date: z.string().trim().optional(),
  location: z.string().trim().optional(),
  status: z.string().trim().optional(),
});

const event = z.object({
  type: z.enum(['conference','workshop', 'webinar']),
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  speaker: z.string().trim().optional(),
  instructor: z.string().trim().optional(),
  date: z.string().trim().optional(),
  time: z.string().trim().optional(),
  location: z.string().trim().optional(),
  link: z.string().trim().url().optional().or(z.literal('')),
  status: z.string().trim().optional(),
  color: z.string().trim().optional(),
  order: z.coerce.number().int().optional(),
  isFeatured: booleanish.optional(),
  imageUrl: z.string().trim().optional(),
});

const inquiry = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  institution: z.string().trim().optional(),
  subject: z.string().trim().optional(),
  purpose: z.string().trim().optional(),
  tier: z.string().trim().optional(),
  message: z.string().trim().optional(),
  aboutDetails: z.string().trim().optional(),
  status: z.enum(['pending', 'resolved']).optional(),
});

const journal = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().optional(),
  issn: z.string().trim().optional(),
  domain: z.string().trim().optional(),
  indexing: stringArray.optional(),
  link: z.string().trim().url().optional().or(z.literal('')),
  imageUrl: z.string().trim().optional(),
  isFeatured: booleanish.optional(),
});

const member = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  institution: z.string().trim().optional(),
  tier: z.string().trim().optional(),
  status: z.enum(['active', 'expired', 'pending']).optional(),
  joinedAt: z.coerce.date().optional(),
  memberCode: z.string().optional().nullable(),
designation: z.string().optional().nullable(),
department: z.string().optional().nullable(),
imageUrl: z.string().optional().nullable(),
isHonorary: z.boolean().optional(),
});

const membershipTier = z.object({
  name: z.string().trim().min(1),
  icon: z.string().trim().optional(),
  priceINR: z.string().trim().min(1),
  priceUSD: z.string().trim().min(1),
  description: z.string().trim().optional(),
  benefits: stringArray.optional(),
  order: z.coerce.number().int().optional(),
});

const pricingPlan = z.object({
  name: z.string().trim().min(1),
  priceINR: z.string().trim().min(1),
  priceUSD: z.string().trim().min(1),
  description: z.string().trim().optional(),
  features: stringArray.optional(),
  cta: z.string().trim().optional(),
  highlight: booleanish.optional(),
  tag: z.string().trim().optional(),
  order: z.coerce.number().int().optional(),
});

const inquiryStatus = z.object({
  status: z.enum([
    "pending",
    "resolved",
  ]),
});

const workshopDetail = z.object({
  basic: z.record(z.any()).optional(),
  hero: z.record(z.any()).optional(),
  infoBar: z.record(z.any()).optional(),
  about: z.record(z.any()).optional(),
  outcomes: z.array(z.record(z.any())).optional(),
  facilitators: z.array(z.record(z.any())).optional(),
  targetAudience: z.array(z.record(z.any())).optional(),
  registrations: z.array(z.record(z.any())).optional(),
  highlights: z.array(z.record(z.any())).optional(),
  timeline: z.array(z.record(z.any())).optional(),
  organizer: z.record(z.any()).optional(),
  schedule: z.array(z.record(z.any())).optional(),
  certificates: z.record(z.any()).optional(),
  mediaGallery: z.record(z.any()).optional(),
  testimonials: z.array(z.record(z.any())).optional(),
  sponsors: z.array(z.record(z.any())).optional(),
  cta: z.record(z.any()).optional(),
  seo: z.record(z.any()).optional(),
  socialSharing: z.record(z.any()).optional(),
  controls: z.record(z.any()).optional(),
});

const webinarDetail = z.object({
  basic: z.record(z.any()).optional(),
  hero: z.record(z.any()).optional(),
  infoBar: z.record(z.any()).optional(),
  about: z.record(z.any()).optional(),
  topics: z.array(z.record(z.any())).optional(),
  speakers: z.array(z.record(z.any())).optional(),
  joiningSteps: z.array(z.record(z.any())).optional(),
  registrations: z.array(z.record(z.any())).optional(),
  targetAudience: z.array(z.record(z.any())).optional(),
  highlights: z.array(z.record(z.any())).optional(),
  organizer: z.record(z.any()).optional(),
  platform: z.record(z.any()).optional(),
  resources: z.record(z.any()).optional(),
  faqs: z.array(z.record(z.any())).optional(),
  mediaGallery: z.record(z.any()).optional(),
  cta: z.record(z.any()).optional(),
  seo: z.record(z.any()).optional(),
  socialSharing: z.record(z.any()).optional(),
  analytics: z.record(z.any()).optional(),
  controls: z.record(z.any()).optional(),
});

const conferenceDetail = z.object({
  basic: z.any().optional(),
  hero: z.any().optional(),
  infoBar: z.any().optional(),
  about: z.any().optional(),
  themes: z.any().optional(),
  registrations: z.any().optional(),
  highlights: z.any().optional(),
  venue: z.any().optional(),
  importantDates: z.any().optional(),
  organizer: z.any().optional(),
  cta: z.any().optional(),
  seo: z.any().optional(),
  socialSharing: z.any().optional(),
  controls: z.any().optional(),

  speakers: z.any().optional(),
  committee: z.any().optional(),
  schedule: z.any().optional(),
  sponsors: z.any().optional(),
  mediaGallery: z.any().optional(),
});

module.exports = {
  conference,
  event,
  inquiry,
  inquiryStatus,
  journal,
  member,
  membershipTier,
  pricingPlan,
  workshopDetail,
  webinarDetail,
  conferenceDetail
};
