import { ConnectableObservable, Observable, Subject } from 'rxjs';
import { publishLast, takeUntil } from 'rxjs/operators';

import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';

import { NavNode } from '../interface';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  path: string;
}

@Component({
  selector: 'aiao-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  navigationPath = '/assets/navigation.json';
  $subject = new Subject();
  private _transformer = (node: NavNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      path: node.path
    };
  };
  // tslint:disable-next-line: member-ordering
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );
  // tslint:disable-next-line: member-ordering
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  // tslint:disable-next-line: member-ordering
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchNavigationInfo()
      .pipe(takeUntil(this.$subject))
      .subscribe(data => {
        this.dataSource.data = this.filterNavNode(data);
      });
  }

  private fetchNavigationInfo(): Observable<any> {
    const navigationInfo = this.http.get<any>(this.navigationPath).pipe(publishLast());
    (navigationInfo as ConnectableObservable<any>).connect();
    return navigationInfo;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onClick(node: ExampleFlatNode) {
    if (node.path && !node.expandable) {
      this.router.navigateByUrl(node.path);
    }
  }

  compactFolder(node: NavNode) {
    if (node.children.length === 1 && node.children[0].type === 'dir') {
      node.name = node.name + '/' + node.children[0].name;
      node.path = node.children[0].path;
      node.children = node.children[0].children;
      this.compactFolder(node);
    }
  }

  filterNavNode(ary: NavNode[]) {
    return ary.map(node => {
      if (node.children.length > 0) {
        this.compactFolder(node);
        this.filterNavNode(node.children);
      }
      return node;
    });
  }

  ngOnDestroy() {
    this.$subject.next();
  }
}
