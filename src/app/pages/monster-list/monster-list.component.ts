import {
  Component,
  computed,
  inject,
  model,
  ModelSignal,
  signal,
  Signal,
} from '@angular/core';
import { MonsterService } from '../../services/monster/monster.service';
import { Monster } from '../../models/monster.model';
import { CommonModule } from '@angular/common';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-monster-list',
  imports: [
    CommonModule,
    PlayingCardComponent,
    SearchBarComponent,
    MatButtonModule,
  ],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css',
})
export class MonsterListComponent {
  monsterService: MonsterService = inject(MonsterService);

  monsters = signal<Monster[]>([]);

  search: ModelSignal<string> = model('');

  filteredMonsters: Signal<Monster[]> = computed(() => {
    return this.monsters().filter((monster: Monster) =>
      monster.name.toLowerCase().includes(this.search().toLowerCase())
    );
  });

  constructor() {
    this.monsters.set(this.monsterService.getAll());
  }

  addMonster() {
    const newMonster = new Monster();
    this.monsterService.add(newMonster);
    this.monsters.set(this.monsterService.getAll());
  }
}
