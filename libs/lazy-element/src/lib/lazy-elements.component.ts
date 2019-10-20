import { Observable, of } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { LazyElementLoader } from './lazy-element-loader';

@Component({
  selector: 'aiao-lazy-elements',
  template: `
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyElementsComponent implements OnInit, OnDestroy {
  private void$ = of<void>(undefined);
  private onDestroy$ = new EventEmitter<void>();
  private docContents$ = new EventEmitter<string>();

  @Output() docReady = new EventEmitter<void>();

  @Input()
  set html(html: string) {
    this.docContents$.emit(html);
  }

  constructor(private elementRef: ElementRef, private elementsLoader: LazyElementLoader) {
    this.docContents$
      .pipe(
        switchMap(newDoc => this.render(newDoc)),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  protected render(html: string): Observable<void> {
    return this.void$.pipe(
      tap(() => {
        this.elementRef.nativeElement.innerHTML = html;
      }),
      switchMap(() => this.elementsLoader.loadFromHtmlElement(this.elementRef.nativeElement)),
      tap(() => this.docReady.emit())
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.onDestroy$.emit();
  }
}
