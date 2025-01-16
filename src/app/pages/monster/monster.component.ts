import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-monster',
  imports: [
    ReactiveFormsModule,
    PlayingCardComponent,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css',
})
export class MonsterComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private monsterService = inject(MonsterService);
  private routeSubscription: Subscription | null = null;
  private monsterValuesSubscription: Subscription | null = null;

  monsterId = signal<number | undefined>(undefined);

  monsterForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: [MonsterType.ELECTRIC, [Validators.required]],
    healthPoints: [10, [Validators.required, Validators.min(10)]],
    figureCaption: ['', [Validators.required]],
    attackName: ['', [Validators.required]],
    attackStrength: [10, [Validators.required, Validators.min(10)]],
    attackDescription: ['', [Validators.required]],
  });

  monsterTypes = Object.values(MonsterType);

  monsterPreview: Monster = Object.assign(
    new Monster(),
    this.monsterForm.value
  );

  ngOnInit(): void {
    this.monsterValuesSubscription = this.monsterForm.valueChanges.subscribe(
      (data) => {
        this.monsterPreview = Object.assign(new Monster(), data);
      }
    );
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.monsterId.set(params['id'] ? parseInt(params['id']) : undefined);

      const monsterFound = this.monsterService.getOne(this.monsterId() || -2);
      if (monsterFound) {
        this.monsterPreview = monsterFound;
        this.monsterForm.patchValue(monsterFound);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.monsterValuesSubscription?.unsubscribe();
  }

  submit(event: Event) {
    this.monsterService.add(this.monsterPreview);
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target?.files && event.target?.files.length > 0) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.monsterForm.patchValue({
          image: reader.result as string,
        });
      };
    }
    event.preventDefault();
    console.log(this.monsterForm.value);
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

  isFieldValid(name: string) {
    const field = this.monsterForm.get(name);
    return field?.invalid && (field?.dirty || field?.touched);
  }
}
