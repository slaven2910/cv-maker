import { Component, Input } from '@angular/core';
import { CV } from 'src/app/models/cv.model';

@Component({
  selector: 'app-cv-preview',
  templateUrl: './cv-preview.component.html',
  styleUrls: ['./cv-preview.component.css']
})
export class CvPreviewComponent {
  @Input() cvData!: CV;

}
