import { MarkdownService } from 'ngx-markdown';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { urlJoin } from '@aiao/util';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { ChangeLanguageState } from '../local/language.reducer';

@Component({
  selector: 'aiao-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  private readonly urlParser = document.createElement('a');
  destroy$ = new Subject();
  url = '';
  lang$: Observable<string>;
  activeUrl$: Observable<string>;
  anchorAry = [];
  constructor(
    public activeRouter: ActivatedRoute,
    public router: Router,
    private store: Store<{ language: ChangeLanguageState }>,
    private markdownService: MarkdownService
  ) {
    this.activeUrl$ = activeRouter.url.pipe(
      takeUntil(this.destroy$),
      map(segments => segments.join('/'))
    );
    this.lang$ = this.store.pipe(
      select('language'),
      map(lang => lang.language)
    );
  }

  ionViewWillEnter() {
    this.url = 'docs' + this.router.url + '/README.md';
    console.log('anchorAry', this.anchorAry);
    console.log('ionViewWillEnter');
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.markdownService.renderer.heading = (text: string, level: number) => {
      const anchorItem: any = {};
      let escapedText = '';
      console.log('text and level', text, level);
      if (/[^\w]+/g.test(text)) {
        escapedText = this.stringHexFun(text);
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
      .subscribe(data => {
        this.anchorAry = [];
        const url = /^\//.test(data[1]) ? data[1] : '/' + data[1];
        if (data[0] === 'cn') {
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
      relativeUrl = urlJoin(this.router.url, href);
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

  ngOnDestroy() {
    this.destroy$.next();
  }
}
