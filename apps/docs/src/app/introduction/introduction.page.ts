import { combineLatest, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { select, State } from '@ngrx/store';

import { selectLanguage } from '../local/language.reducer';

@Component({
  selector: 'aiao-introduction',
  templateUrl: 'introduction.page.html',
  styleUrls: ['introduction.page.scss']
})
export class IntroductionPage implements OnInit, OnDestroy {
  private readonly urlParser = document.createElement('a');
  destroy$ = new Subject();
  url = '';
  lang$ = this.state.pipe(select(selectLanguage));
  routerEvents$ = this.router.events.pipe(
    takeUntil(this.destroy$),
    filter(e => e instanceof NavigationEnd)
  );
  constructor(public activeRouter: ActivatedRoute, public router: Router, private state: State<any>) {}

  ngOnInit() {
    this.url = 'docs' + this.router.url + '/README.md';
    combineLatest([this.lang$, this.routerEvents$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        const event = val[1] as NavigationEnd;
        if (val[0] === 'cn') {
          const readme = /\/$/.test(event.url) ? 'README.md' : '/README.md';
          this.url = 'docs' + event.url + readme;
        } else {
          const readme = /\/$/.test(event.url) ? 'README.en.md' : '/README.en.md';
          this.url = 'docs' + event.url + readme;
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
    const relativeUrl = pathname + search + hash;
    this.urlParser.href = relativeUrl;
    console.log('relativeUrl', relativeUrl);

    if (this.router.url === '/integration') {
      this.router.navigateByUrl(this.router.url + pathname);
      return false;
    }

    // don't navigate if external link or has extension
    if (anchor.href !== this.urlParser.href || !/\/[^/.]*$/.test(pathname)) {
      if (/\.md$/.test(pathname)) {
        this.url = 'docs' + relativeUrl;
        return false;
      }
      anchor.target = '_blank';
      return true;
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
    // 允许点击
    return false;
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
