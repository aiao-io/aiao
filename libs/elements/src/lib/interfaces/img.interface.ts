export interface ImgArea {
  shape: 'rect' | 'poly' | 'circle';
  coordRatios: number[];
  href?: string;
  alt?: string;
  target?: string;
}
