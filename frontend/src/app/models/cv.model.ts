export class CV {
  id: string;
  aboutMe: string;
  sections: CVSection[];
  createdDate?: Date;
  lastUpdated?: Date;
  isPublic: boolean;
  contactInfo: ContactInfo;
  education: Education[];
  experience: Experience[];
  skills: CVItem[];
  languages: CVItem[];
  certifications: Certification[];
  references: Reference[];

  constructor(data: any) {
    this.id = data.id;
    this.aboutMe = data?.aboutMe;
    this.sections = (data?.sections || []).map((sectionData: any) => new CVSection(sectionData));
    this.createdDate = data?.createdDate;
    this.lastUpdated = data?.lastUpdated;
    this.isPublic = data?.isPublic;
    this.contactInfo = new ContactInfo(data?.contactInfo);
    this.education = (data?.education || []).map((educationData: any) => new Education(educationData));
    this.experience = (data?.experience || []).map((experienceData: any) => new Experience(experienceData));
    this.skills = (data?.skills || []).map((skillsData: any) => new CVItem(skillsData));
    this.languages = (data?.languages || []).map((languagesData: any) => new CVItem(languagesData));
    this.certifications = (data?.certifications || []).map((certificationData: any) => new Certification(certificationData));
    this.references = (data?.references || []).map((referenceData: any) => new Reference(referenceData));
  }
}

export class CVSection {
  title: string;
  items: CVItem[];

  constructor(data: any) {
    this.title = data?.title;
    this.items = (data?.items || []).map((itemData: any) => new CVItem(itemData));
  }
}

export class CVItem {
  type: string;
  value: string;

  constructor(data: any) {
    this.type = data?.type;
    this.value = data?.value;
  }
}

export class ContactInfo {
  name: string;
  address: string;
  email: string;
  phone: string;

  constructor(data: any) {
    this.name = data?.name;
    this.address = data?.address;
    this.email = data?.email;
    this.phone = data?.phone;
  }
}

export class Education {
  institution: string;
  degree: string;
  startDate: Date;
  endDate: Date;
  description: string;

  constructor(data: any) {
    this.institution = data?.institution;
    this.degree = data?.degree;
    this.startDate = data?.startDate;
    this.endDate = data?.endDate;
    this.description = data?.description;
  }
}

export class Experience {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
  description: string;

  constructor(data: any) {
    this.company = data?.company;
    this.position = data?.position;
    this.startDate = data?.startDate;
    this.endDate = data?.endDate;
    this.description = data?.description;
  }
}

export class Certification {
  name: string;
  issuer: string;
  date: Date;

  constructor(data: any) {
    this.name = data?.name;
    this.issuer = data?.issuer;
    this.date = data?.date;
  }
}

export class Reference {
  name: string;
  position: string;
  contact: string;

  constructor(data: any) {
    this.name = data?.name;
    this.position = data?.position;
    this.contact = data?.contact;
  }
}
