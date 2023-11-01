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
  cvData!: any;

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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildCvForm();
  }

  buildCvForm(): void {
    this.cvForm = this.formBuilder.group({
      aboutMe: new FormControl(''),
      createdDate: new FormControl(''),
      lastUpdated: new FormControl(''),
      isPublic: new FormControl(false),
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
      skills: new FormControl(''),
      languages: new FormControl(''),
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
