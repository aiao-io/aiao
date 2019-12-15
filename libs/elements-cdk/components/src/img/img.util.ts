import { IImgArea } from './img.interface';

export const imgGetAreas = (areas: IImgArea[], width: number, height: number) => {
  if (!areas || areas.length <= 0) {
    return null;
  }
  return areas.map(area => {
    const { href, alt, target, coordRatios, shape } = area;
    const coords = coordRatios
      .map((c, index) => {
        return index % 2 === 0 ? c * width : c * height;
      })
      .join();
    return {
      shape,
      href,
      alt,
      target,
      coords
    };
  });
};
