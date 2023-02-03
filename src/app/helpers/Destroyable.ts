import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class Destroyable implements OnDestroy {
  public destroyed$: Subject<void> = new Subject<void>();

  public ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
