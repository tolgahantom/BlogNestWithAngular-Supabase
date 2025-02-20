import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  @Input() title!: string;
  @Input() author!: string;
  @Input() content!: string;
  @Input() imageUrl!: string;
}
