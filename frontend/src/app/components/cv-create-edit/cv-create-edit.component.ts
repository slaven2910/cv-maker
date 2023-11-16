import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { CV } from '../../models/cv.model';
import { CvService } from 'src/app/services/cv.service';

@Component({
  selector: 'app-cv-create-edit',
  templateUrl: './cv-create-edit.component.html',
  styleUrls: ['./cv-create-edit.component.css'],
})
export class CvCreateEditComponent implements OnInit {
  @Input() cvId: string | null = null;
  cvForm!: FormGroup;
  cvData: CV | null = null; 


  name = '';
  onKey(value: string) {
    this.name = value;  
  }

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

  constructor(private formBuilder: FormBuilder, private cvService: CvService) {}

  ngOnInit(): void {
    this.buildCvForm();

    if (this.cvId) {
      // In Edit mode, load the existing CV data
      this.cvService.getCV(this.cvId).subscribe(
        (cv: CV) => {
          // Populate the form with the existing CV data
          this.cvForm.patchValue(cv);
        },
        (error) => {
          // Handle error fetching existing CV data
        }
      );
    }
  }

   onSubmit() {
    const formData = this.cvForm.value;
    if (!this.cvId) {
      // Create mode
      this.cvService.createCV(formData).subscribe(
        (response) => {
          // Handle success response
          console.log('CV data created successfully', response);
          // You can also reset the form or perform any other actions here.
        },
        (error) => {
          // Handle error response
          console.error('Error creating CV data', error);
        }
      );
    } else {
      // Edit mode
      this.cvService.updateCV(this.cvId, formData).subscribe(
        (response) => {
          // Handle success response
          console.log('CV data updated successfully', response);
          // You can also reset the form or perform any other actions here.
        },
        (error) => {
          // Handle error response
          console.error('Error updating CV data', error);
        }
      );
    }
  }

  onCreateCV() {
      const formData = this.cvForm.value;
  
      // Send the CV data to the backend using the CvService
      this.cvService.createCV(formData).subscribe(
        (response) => {
          // Handle success response
          console.log('CV data sent successfully', response);
          // You can also reset the form or perform any other actions here.
        },
        (error) => {
          // Handle error response
          console.error('Error sending CV data', error);
        }
      );
  }
  

  addSkill() {
    const skillValue = (this.cvForm.get('skills') as FormArray).at(0).get('value')?.value;
    if (skillValue) {
      (this.cvForm.get('skills') as FormArray).push(new FormGroup({
        'type': new FormControl('Skill'),
        'value': new FormControl(skillValue)
      }));
    }
  }

  removeSkill(index: number) {
    const skillArray = this.cvForm.get('skills') as FormArray;
    if (index >= 0 && index < skillArray.length) {
      skillArray.removeAt(index);
    }
  }

  
  addLanguage() {
    const languageValue = (this.cvForm.get('languages') as FormArray).at(0).get('value')?.value;
    if (languageValue) {
      (this.cvForm.get('languages') as FormArray).push(new FormGroup({
        'type': new FormControl('Language'),
        'value': new FormControl(languageValue)
      }));
    }
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
        name: new FormControl('', [Validators.required]),
        address: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.pattern('[0-9]*')]),
      }),
      education: this.formBuilder.array([
        this.createEducationGroup(),
      ]),
      experience: this.formBuilder.array([
        this.createExperienceGroup(),
      ]),
      skills: this.formBuilder.array([
        this.createSkillGroup(),
      ]),
      languages: this.formBuilder.array([
        this.createLanguageGroup(),
      ]),
      certifications: this.formBuilder.array([
        this.createCertificationGroup(),
      ]),
      references: this.formBuilder.array([
        this.createReferenceGroup(),
      ]),
    });
  }

  createSkillGroup() {
    return this.formBuilder.group({
      type: 'Skill',
      value: '',
    });
  }
  
  createLanguageGroup() {
    return this.formBuilder.group({
      type: 'Language',
      value: '',
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
}
