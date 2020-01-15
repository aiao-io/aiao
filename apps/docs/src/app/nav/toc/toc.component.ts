import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aiao-toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.scss']
})
export class TocComponent implements OnInit {
  anchorItems = [
    { text: 'AIAO', level: 1, href: '#aiao' },
    { text: 'Libs', level: 2, href: '#libs' },
    { text: 'Elements', level: 3, href: '#elements' },
    { text: 'Angular', level: 3, href: '#angular' },
    { text: 'utils', level: 3, href: '#utils' },
    { text: '项目结构', level: 2, href: '#987976ee7ed36784' },
    { text: '安装', level: 2, href: '#5b8988c5' },
    { text: '构建项目', level: 2, href: '#67845efa987976ee' },
    { text: '构建所有库', level: 3, href: '#67845efa624067095e93' },
    {
      text: '单独构建 <code>util</code> 库',
      level: 3,
      href: '#535572ec67845efa203c636f64653e7574696c3c2f636f64653e205e93'
    },
    { text: '单元测试', level: 2, href: '#535551436d4b8bd5' },
    { text: '测试所有库', level: 3, href: '#6d4b8bd5624067095e93' },
    { text: '测试 <code>util</code> 库', level: 3, href: '#6d4b8bd5203c636f64653e7574696c3c2f636f64653e205e93' },
    { text: '贡献', level: 2, href: '#8d21732e' },
    { text: 'License MIT', level: 2, href: '#License MIT' }
  ];

  constructor() {}

  ngOnInit() {}
}
