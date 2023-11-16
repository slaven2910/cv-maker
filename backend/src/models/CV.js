const mongoose = require('mongoose');

const CVItemSchema = new mongoose.Schema({
  type: String,
  value: String,
});

const ContactInfoSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  phone: String,
});

const EducationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  startDate: Date,
  endDate: Date,
  description: String,
});

const ExperienceSchema = new mongoose.Schema({
  company: String,
  position: String,
  startDate: Date,
  endDate: Date,
  description: String,
});

const CertificationSchema = new mongoose.Schema({
  name: String,
  issuer: String,
  date: Date,
});

const ReferenceSchema = new mongoose.Schema({
  name: String,
  position: String,
  contact: String,
});

const CVSchema = new mongoose.Schema({
  id: String,
  aboutMe: String,
  contactInfo: ContactInfoSchema,
  createdDate: Date,
  lastUpdated: Date,
  isPublic: Boolean,
  education: [EducationSchema],
  experience: [ExperienceSchema],
  skills: [CVItemSchema],
  languages: [CVItemSchema],
  certifications: [CertificationSchema],
  references: [ReferenceSchema],
});

const CVModel = mongoose.model('CV', CVSchema);

module.exports = CVModel;
