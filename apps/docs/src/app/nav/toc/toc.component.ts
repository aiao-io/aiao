import { asapScheduler, combineLatest, Subject } from 'rxjs';
import { startWith, subscribeOn, takeUntil, tap } from 'rxjs/operators';

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  HostListener
} from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { TocItem, TocService } from '../../share/toc.service';

type TocType = 'None' | 'Floating' | 'EmbeddedSimple' | 'EmbeddedExpandable';

@Component({
  selector: 'aiao-toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.scss']
})
export class TocComponent implements OnInit, AfterViewInit, OnDestroy {
  protected nextViewContainer: HTMLElement = document.createElement('div');
  @ViewChild(IonContent, { static: true })
  private ionContent: IonContent;

  activeIndex: number | null = null;
  type: TocType = 'None';
  isCollapsed = true;
  isEmbedded = false;
  @ViewChildren('tocItem') private items: QueryList<ElementRef>;
  private onDestroy = new Subject();
  primaryMax = 4;
  tocList: TocItem[];

  constructor(elementRef: ElementRef, private tocService: TocService, private router: Router) {
    this.isEmbedded = elementRef.nativeElement.className.indexOf('embedded') !== -1;
  }

  ngOnInit() {
    this.tocService.tocList.pipe(takeUntil(this.onDestroy)).subscribe(tocList => {
      this.tocList = tocList;
      const itemCount = count(this.tocList, item => item.level !== 'h1');

      this.type =
        itemCount > 0
          ? this.isEmbedded
            ? itemCount > this.primaryMax
              ? 'EmbeddedExpandable'
              : 'EmbeddedSimple'
            : 'Floating'
          : 'None';
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.isEmbedded) {
        // We use the `asap` scheduler because updates to `activeItemIndex` are triggered by DOM changes,
        // which, in turn, are caused by the rendering that happened due to a ChangeDetection.
        // Without asap, we would be updating the model while still in a ChangeDetection handler, which is disallowed by Angular.
        combineLatest([
          this.tocService.activeItemIndex.pipe(subscribeOn(asapScheduler)),
          this.items.changes.pipe(startWith(this.items))
        ])
          .pipe(takeUntil(this.onDestroy))
          .subscribe(([index, items]) => {
            console.log('activeItemIndex', index);
            this.activeIndex = index;
            if (index === null || index >= items.length) {
              return;
            }
            const e = items.toArray()[index].nativeElement as HTMLElement;
            const p = e.offsetParent;

            const eRect = e.getBoundingClientRect();
            const pRect = p.getBoundingClientRect();

            const isInViewport = eRect.top >= pRect.top && eRect.bottom <= pRect.bottom;

            if (!isInViewport) {
              p.scrollTop += eRect.top - pRect.top - p.clientHeight / 2;
            }
          });
      }
    }, 5000);
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  toggle(canScroll = true) {
    this.isCollapsed = !this.isCollapsed;
    if (canScroll && this.isCollapsed) {
      this.toTop();
    }
  }

  toTop() {
    this.ionContent.scrollToTop();
  }

  handleAnchorClick(anchor: HTMLAnchorElement, button = 0, ctrlKey = false, metaKey = false) {
    const url = this.router.url.replace(/\#.*/g, '');
    const fragment = anchor.getAttribute('href').replace(/\#/g, '');
    this.router.navigate([url], { fragment });
    return false;
  }

  @HostListener('click', ['$event.target', '$event.button', '$event.ctrlKey', '$event.metaKey'])
  hookAllClick(eventTarget: HTMLElement, button: number, ctrlKey: boolean, metaKey: boolean): boolean {
    // 找到有 anchor 的点击
    let target: HTMLElement | null = eventTarget;
    while (target && !(target instanceof HTMLAnchorElement)) {
      target = target.parentElement;
    }
    if (target instanceof HTMLAnchorElement) {
      return this.handleAnchorClick(target, button, ctrlKey, metaKey);
    }
    return false;
  }
}

function count<T>(array: T[], fn: (item: T) => boolean) {
  return array.reduce((result, item) => (fn(item) ? result + 1 : result), 0);
}
