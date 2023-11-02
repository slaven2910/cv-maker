import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CV } from './../../models/cv.model';

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.css'],
})
export class CvFormComponent implements OnInit {
  cvForm!: FormGroup;
  cvData: CV | null = null; // Initialize as null


  get educationControls(){
    return (<FormArray>this.cvForm.get('education')).controls;
  }

  get experienceControls(){
    return (<FormArray>this.cvForm.get('experience')).controls;
  }

  get certificationControls(){
    return (<FormArray>this.cvForm.get('certifications')).controls;
  }

  get referencesControls(){
    return (<FormArray>this.cvForm.get('references')).controls;
  }

  get skillsControls(){
    return (<FormArray>this.cvForm.get('skills')).controls;
  }

  get languageControls(){
    return (<FormArray>this.cvForm.get('languages')).controls;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildCvForm();
  }

  logFormData() {
    console.log('Form Data:', this.cvForm.value);
  }

  addSkill() {
    (this.cvForm.get('skills') as FormArray).push(new FormGroup({
      'skill': new FormControl()
    }));
  }

  removeSkill(index: number) {
    const skillArray = this.cvForm.get('skills') as FormArray;
    if (index >= 0 && index < skillArray.length) {
      skillArray.removeAt(index);
    }
  }

  addLanguage() {
    (this.cvForm.get('languages') as FormArray).push(new FormGroup({
      'language': new FormControl()
    }));
  }

  removeLanguage(index: number) {
    const languageArray = this.cvForm.get('languages') as FormArray;
    if (index >= 0 && index < languageArray.length) {
      languageArray.removeAt(index);
    }
  }

  addEducation() {
    (this.cvForm.get('education') as FormArray).push(new FormGroup({
      'degree': new FormControl(),
      'institution': new FormControl(),
      'startDate': new FormControl(),
      'endDate': new FormControl(),
    }));
  }

  removeEducation(index: number) {
    const educationArray = this.cvForm.get('education') as FormArray;
    if (index >= 0 && index < educationArray.length) {
      educationArray.removeAt(index);
    }
  }

  addExperience() {
    (this.cvForm.get('experience') as FormArray).push(new FormGroup({
      'company': new FormControl(),
      'position': new FormControl(),
      'startDate': new FormControl(),
      'endDate': new FormControl(),
    }));
  }

  removeExperience(index: number) {
    const experienceArray = this.cvForm.get('experience') as FormArray;
    if (index >= 0 && index < experienceArray.length) {
      experienceArray.removeAt(index);
    }
  }

  addCertification() {
    (this.cvForm.get('certifications') as FormArray).push(new FormGroup({
      'name': new FormControl(),
      'issuer': new FormControl(),
      'date': new FormControl(),
    }));
  }

  removeCertification(index: number) {
    const certificationArray = this.cvForm.get('certifications') as FormArray;
    if (index >= 0 && index < certificationArray.length) {
      certificationArray.removeAt(index);
    }
  }

  addReference() {
    (this.cvForm.get('references') as FormArray).push(new FormGroup({
      'name': new FormControl(),
      'position': new FormControl(),
      'contact': new FormControl(),
    }));
  }

  removeReference(index: number) {
    const referencesArray = this.cvForm.get('references') as FormArray;
    if (index >= 0 && index < referencesArray.length) {
      referencesArray.removeAt(index);
    }
  }

  buildCvForm(): void {
    this.cvForm = this.formBuilder.group({
      aboutMe: new FormControl(''),
      contactInfo: this.formBuilder.group({
        name: new FormControl(''),
        address: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
      }),
      education: this.formBuilder.array([
        this.createEducationGroup(),
      ]),
      experience: this.formBuilder.array([
        this.createExperienceGroup(),
      ]),
      skills: this.formBuilder.array([
        this.formBuilder.group({
          skill: new FormControl(''),
        })
      ]),
      languages: this.formBuilder.array([
        this.formBuilder.group({
          language: new FormControl(''),
        })
      ]),
      certifications: this.formBuilder.array([
        this.createCertificationGroup(),
      ]),
      references: this.formBuilder.array([
        this.createReferenceGroup(),
      ]),
    });
  }

  createEducationGroup() {
    return this.formBuilder.group({
      institution: new FormControl(''),
      degree: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      description: new FormControl(''),
    });
  }

  createExperienceGroup() {
    return this.formBuilder.group({
      company: new FormControl(''),
      position: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      description: new FormControl(''),
    });
  }

  createCertificationGroup() {
    return this.formBuilder.group({
      name: new FormControl(''),
      issuer: new FormControl(''),
      date: new FormControl(''),
    });
  }

  createReferenceGroup() {
    return this.formBuilder.group({
      name: new FormControl(''),
      position: new FormControl(''),
      contact: new FormControl(''),
    });
  }

  onSubmit() {
    const formData = this.cvForm.value;
    const cv = new CV(formData);

    // Pass the cv data to the cv-preview component
    this.cvData = cv;
  }
}
