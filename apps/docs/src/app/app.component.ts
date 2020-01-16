import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';

import { LanguageListComponent } from './nav/language-list/language-list.component';
import { TocService } from './share/toc.service';

@Component({
  selector: 'aiao-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hasFloatingToc = false;
  private showFloatingToc = new BehaviorSubject(false);
  private showFloatingTocWidth = 800;
  tocMaxHeight: string;
  private tocMaxHeightOffset = 0;
  hasNonEmptyToc$: Observable<boolean>;
  constructor(
    private hostElement: ElementRef,
    private menuController: MenuController,
    public popoverController: PopoverController,
    private tocService: TocService
  ) {}

  toggleNavMenu() {
    this.menuController.toggle('docs-menu');
  }

  ionViewWillEnter() {
    console.log('aiao-root ionViewWillEnter');
  }

  async openLangList(event: any) {
    const popover = await this.popoverController.create({
      component: LanguageListComponent,
      event,
      showBackdrop: false
    });
    popover.present();
  }

  ngOnInit() {
    this.hasNonEmptyToc$ = this.tocService.tocList.pipe(map(tocList => tocList.length > 0));
    // console.log('hasNonEmptyToc', hasNonEmptyToc);
    // combineLatest([hasNonEmptyToc, this.showFloatingToc]).subscribe(
    //   ([hasToc, showFloatingToc]) => (this.hasFloatingToc = hasToc && showFloatingToc)
    // );
  }

  // Restrain scrolling inside an element, when the cursor is over it
  restrainScrolling(evt: WheelEvent) {
    console.log('WheelEvent', evt);
    const elem = evt.currentTarget as Element;
    const scrollTop = elem.scrollTop;

    if (evt.deltaY < 0) {
      // Trying to scroll up: Prevent scrolling if already at the top.
      if (scrollTop < 1) {
        evt.preventDefault();
      }
    } else {
      // Trying to scroll down: Prevent scrolling if already at the bottom.
      const maxScrollTop = elem.scrollHeight - elem.clientHeight;
      if (maxScrollTop - scrollTop < 1) {
        evt.preventDefault();
      }
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.tocMaxHeightOffset) {
      const el = this.hostElement.nativeElement as Element;
      const headerEl = el.querySelector('ion-header');
      const footerEl = el.querySelector('footer');

      if (headerEl && footerEl) {
        this.tocMaxHeightOffset = headerEl.clientHeight + footerEl.clientHeight + 24; //  fudge margin
      }
    }

    this.tocMaxHeight = (document.body.scrollHeight - window.pageYOffset - this.tocMaxHeightOffset).toFixed(2);
  }
}
