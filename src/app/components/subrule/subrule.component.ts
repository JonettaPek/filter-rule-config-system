import { Component, Input } from '@angular/core';
import { Subrule } from '../../states/portfolio-subrule/portfolio-subrule.reducer';

@Component({
  selector: 'app-subrule',
  standalone: true,
  imports: [],
  templateUrl: './subrule.component.html',
  styleUrl: './subrule.component.css'
})
export class SubruleComponent {

  @Input()
  index: number | undefined;

  @Input()
  subrule: Subrule | undefined;

}
