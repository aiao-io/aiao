import { Observable, Subject } from 'rxjs';
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
  constructor(
    public activeRouter: ActivatedRoute,
    public router: Router,
    private store: Store<{ language: ChangeLanguageState }>
  ) {
    this.lang$ = this.store.pipe(
      select('language'),
      map(lang => lang.language)
    );
  }

  ionViewWillEnter() {
    console.log(this.router.url);
    this.url = 'docs' + this.router.url + '/README.md';
    console.log('[lifeCycles] ionViewWillEnter');
  }

  ngOnInit() {
    this.url = 'docs' + this.router.url + '/README.md';
    this.lang$.pipe(takeUntil(this.destroy$)).subscribe(lang => {
      if (lang === 'cn') {
        const readme = /\/$/.test(this.router.url) ? 'README.md' : '/README.md';
        this.url = 'docs' + this.router.url + readme;
      } else {
        const readme = /\/$/.test(this.router.url) ? 'README.en.md' : '/README.en.md';
        this.url = 'docs' + this.router.url + readme;
      }
    });
    console.log('ngOnInit', this.router.url);
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
      console.log('relativeUrl is', relativeUrl);
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

  ngOnDestroy() {
    this.destroy$.next();
  }
}
