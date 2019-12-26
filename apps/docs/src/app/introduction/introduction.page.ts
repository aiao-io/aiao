import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';

import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'aiao-introduction',
  templateUrl: 'introduction.page.html',
  styleUrls: ['introduction.page.scss']
})
export class IntroductionPage implements OnInit, OnDestroy {
  destroy$ = new Subject();
  private readonly urlParser = document.createElement('a');
  url = '';
  constructor(public activeRouter: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        startWith(0),
        takeUntil(this.destroy$),
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe((e: NavigationEnd) => {
        if (/\/$/.test(e.url)) {
          this.url = 'docs' + e.url + 'README.md';
        } else {
          this.url = 'docs' + e.url + '/README.md';
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

    // don't navigate if external link or has extension
    if (anchor.href !== this.urlParser.href || !/\/[^/.]*$/.test(pathname)) {
      if (/\.md$/.test(pathname)) {
        this.url = 'docs' + relativeUrl;
      }
      console.log("don't navigate if external");
      return false;
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
      // return false;
      return this.handleAnchorClick(target, button, ctrlKey, metaKey);
    }

    // 允许点击
    return false;
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
