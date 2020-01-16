import { MarkdownService } from 'ngx-markdown';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { urlJoin } from '@aiao/util';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { ChangeLanguageState } from '../local/language.reducer';
import { TocService } from '../share/toc.service';

@Component({
  selector: 'aiao-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  private readonly urlParser = document.createElement('a');
  protected nextViewContainer: HTMLElement = document.createElement('div');
  destroy$ = new Subject();
  url = '';
  lang$: Observable<string>;
  activeUrl$: Observable<string>;
  anchorAry = [];
  constructor(
    public activeRouter: ActivatedRoute,
    public router: Router,
    private store: Store<{ language: ChangeLanguageState }>,
    private markdownService: MarkdownService,
    private tocService: TocService
  ) {
    this.activeUrl$ = activeRouter.url.pipe(
      takeUntil(this.destroy$),
      tap(data => console.log('data', data)),
      map(segments => segments.join('/'))
    );
    this.lang$ = this.store.pipe(
      select('language'),
      map(lang => lang.language)
    );
  }

  ionViewWillEnter() {
    this.url = 'docs' + this.router.url + '/README.md';
    // console.log('anchorAry', this.anchorAry);
    console.log('ionViewWillEnter');
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.markdownService.renderer.heading = (text: string, level: number) => {
      const anchorItem: any = {};
      let escapedText = '';
      if (/[^\w]+/g.test(text)) {
        // escapedText = this.stringHexFun(text);
      } else {
        escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      }
      anchorItem.text = text;
      anchorItem.level = level;
      anchorItem.href = '#' + escapedText;

      this.anchorAry.push(anchorItem);
      return (
        '<h' +
        level +
        '>' +
        '<a name="' +
        escapedText +
        '" class="anchor" href="#' +
        escapedText +
        '">' +
        '<span class="header-link"></span>' +
        '</a>' +
        text +
        '</h' +
        level +
        '>'
      );
    };

    combineLatest([this.lang$, this.activeUrl$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([lang, activeUrl]) => {
        const url = /^\//.test(activeUrl) ? activeUrl : '/' + activeUrl;
        if (lang === 'cn') {
          this.url = 'docs' + url + '/README.md';
        } else {
          this.url = 'docs' + url + '/README.en.md';
        }
      });
  }

  handleAnchorClick(anchor: HTMLAnchorElement, button = 0, ctrlKey = false, metaKey = false) {
    // Check for modifier keys and non-left-button, which indicate the user wants to control navigation
    if (button !== 0 || ctrlKey || metaKey) {
      return true;
    }

    // If there is a target and it is not `_self` then we take this
    // as a signal that it doesn't want to be intercepted.
    // TODO: should we also allow an explicit `_self` target to opt-out?
    const anchorTarget = anchor.target;
    if (anchorTarget && anchorTarget !== '_self') {
      return true;
    }

    if (anchor.getAttribute('download') != null) {
      return true; // let the download happen
    }

    const { pathname, search, hash } = anchor;
    let relativeUrl = pathname + search + hash;
    this.urlParser.href = relativeUrl;
    const url = this.router.url.replace(/#.*/g, '');

    // don't navigate if external link or has extension
    if (anchor.href !== this.urlParser.href || !/\/[^/.]*$/.test(pathname)) {
      if (/\.md$/.test(pathname)) {
        this.url = 'docs' + relativeUrl;
        return false;
      }
      anchor.target = '_blank';
      return true;
    }

    const href = anchor.getAttribute('href');
    if (/^\./.test(href)) {
      relativeUrl = urlJoin(url, href);
    }

    // approved for navigation
    this.url = 'docs' + relativeUrl + '/README.md';
    this.router.navigateByUrl(relativeUrl);
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

  stringHexFun(val: string) {
    if (val === '' || typeof val === 'undefined') return;
    let hexStr = '';
    for (let i = 0; i < val.length; i++) {
      hexStr += val.charCodeAt(i).toString(16);
    }
    console.log('hex string', hexStr);
    return hexStr;
  }

  onLoad() {
    this.generateTitleAndToc(document.body, '');
  }

  protected generateTitleAndToc(targetElem: HTMLElement, docId: string) {
    const titleEl = targetElem.querySelector('h1');
    const needsToc = !!titleEl && !/no-?toc/i.test(titleEl.className);
    const embeddedToc = targetElem.querySelector('aiao-toc.embedded');

    if (needsToc && !embeddedToc) {
      // Add an embedded ToC if it's needed and there isn't one in the content already.
      titleEl!.insertAdjacentHTML('afterend', '<aiao-toc class="embedded"></aiao-toc>');
    } else if (!needsToc && embeddedToc && embeddedToc.parentNode !== null) {
      // Remove the embedded Toc if it's there and not needed.
      // We cannot use ChildNode.remove() because of IE11
      embeddedToc.parentNode.removeChild(embeddedToc);
    }

    this.tocService.reset();
    let title: string | null = '';

    // Only create ToC for docs with an `<h1>` heading.
    // If you don't want a ToC, add "no-toc" class to `<h1>`.
    if (titleEl) {
      title = typeof titleEl.innerText === 'string' ? titleEl.innerText : titleEl.textContent;

      if (needsToc) {
        this.tocService.genToc(targetElem, docId);
      }
      // this.titleService.setTitle(title ? `Angular - ${title}` : 'Angular');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
