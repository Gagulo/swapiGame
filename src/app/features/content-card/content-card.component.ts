import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent
  ],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.css'
})
export class ContentCardComponent {
  @Input() cardContent: any;
}
