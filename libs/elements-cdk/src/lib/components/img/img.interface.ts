export interface IImgArea {
  shape: 'rect' | 'poly' | 'circle';
  coordRatios: number[];
  href?: string;
  alt?: string;
  target?: string;
}

export interface IImg {
  map?: IImgArea[];
  alt?: string;
  src?: string;
}
