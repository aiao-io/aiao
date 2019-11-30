import { Observable, of } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import { ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

import { LazyElementLoader } from './lazy-element-loader';

export class LazyElementBase implements OnDestroy {
  @Output() docReady = new EventEmitter<void>();

  private void$ = of<void>(undefined);
  protected readonly onDestroy$ = new EventEmitter<void>();
  protected readonly html$ = new EventEmitter<string>();

  constructor(
    protected readonly elementRef: ElementRef<HTMLElement>,
    protected readonly elementsLoader: LazyElementLoader
  ) {
    this.html$
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap(newDoc => this.render(newDoc))
      )
      .subscribe();
  }

  protected render(html: string): Observable<void> {
    return this.void$.pipe(
      tap(() => {
        this.elementRef.nativeElement.innerHTML = html || '';
      }),
      switchMap(() => this.elementsLoader.loadFromHtmlElement(this.elementRef.nativeElement)),
      tap(() => this.docReady.emit())
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
