const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Conference = sequelize.define(
  "Conference",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    // BASIC INFO
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    shortTitle: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    theme: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    type: {
      type: DataTypes.STRING,
      defaultValue: "Conference",
    },

    description: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    about: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    // DATE & LOCATION
    startDate: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    endDate: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    date: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    time: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    venue: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    location: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    country: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    modes: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    // HERO SECTION
    heroImage: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    imageUrl: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    brochureUrl: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    // ORGANIZER INFO
    organizerName: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    instructor: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    speaker: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    contactEmail: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    contactPhone: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    websiteUrl: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    // CONTENT BLOCKS
    organizingCommittee: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    keynoteSpeakers: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    editorialBoard: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    tracks: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    themes: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    venueDetails: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    schedule: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    registrations: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    highlights: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    importantDates: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    speakers: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    sponsors: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    gallery: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    testimonials: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    faq: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    cta: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    // PAPER SUBMISSION
    keywords: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    submissionInstructions: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    submissionStartDate: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    abstractDeadline: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    fullPaperDeadline: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    registrationDeadline: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    paperCategories: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    peerReviewMethod: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    // SETTINGS
    color: {
      type: DataTypes.STRING,
      defaultValue: "bg-blue-500",
    },

    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Conference;