import { Subject } from 'rxjs';

import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';

import { mockNav, mockNavs, NavPath } from '../interface';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'aiao-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  navAry = mockNavs;
  $subject = new Subject();
  private _transformer = (node: NavPath, level: number) => {
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

  constructor(private router: Router, private http: HttpClient) {
    this.dataSource.data = mockNav;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onClick(path: string) {
    if (path) {
      this.router.navigateByUrl(path);
    }
  }

  // private fetchNavigationInfo(): Observable<any> {
  //   const navigationInfo = this.http.get<any>('/navigation.json').pipe(publishLast());
  //   (navigationInfo as ConnectableObservable<any>).connect();
  //   return navigationInfo;
  // }

  ngOnInit() {
    // this.fetchNavigationInfo()
    //   .pipe(takeUntil(this.$subject))
    //   .subscribe(data => {
    //     console.log('navigationInfo', data);
    //   });

    const filterAry = this.navigationFlatter(this.navAry);
    console.log('filterAry', filterAry);
  }

  navigationFlatter(navAry: any) {
    return navAry.flat(3);
  }

  ngOnDestroy() {
    this.$subject.next();
  }
}
