import { IImg, IImgArea, imgGetAreas } from '@aiao/elements-cdk/components';
import { IImageRequestOptions, ImageMethodType } from '@aiao/image-storage';
import { IMAGE_MIN_BASE64_TRANSPARENT } from '@aiao/util';
import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';

import { config } from '../../global/config';

let imageId = 0;

@Component({
  tag: 'aiao-img',
  styleUrl: 'img.scss',
  shadow: true
})
export class Img implements ComponentInterface, IImg {
  private io?: IntersectionObserver | any;
  private cacheImageRequest: IImageRequestOptions;
  private usemap = `img-usemap-${imageId++}`;
  private imageStorage = config.get('imageStorage');
  private img: HTMLImageElement;

  @Element() el!: HTMLAiaoImgElement;
  // --------------------------------------------------------------[ State ]
  // 是否已加载
  @State() loaded: boolean;
  // 是否有错误
  @State() error: boolean;
  // 加载的src
  @State() loadSrc: string;
  // 加载状态
  @State() loading: boolean;
  // --------------------------------------------------------------[ Event ]
  /**
   * 图片被加载
   */
  @Event() aiaoImgDidLoad!: EventEmitter<void>;
  /**
   * 图片加载错误
   */
  @Event() aiaoError!: EventEmitter<void>;
  // --------------------------------------------------------------[ Prop ]
  /**
   * 锚点
   */
  @Prop({ mutable: true }) map: IImgArea[];
  /**
   * 平台
   */
  @Prop() platform?: string;
  /**
   * 图片方法
   */
  @Prop() method: ImageMethodType = 'mfit';
  /**
   * 自定义动画
   */
  @Prop() animation: 'fade' | string = 'fade';
  /**
   * alt
   */
  @Prop() alt: string;
  /**
   * 图片地址
   */
  @Prop({ mutable: true }) src: string;
  @Watch('src')
  srcChanged() {
    this.beginLazyLoad();
  }
  // --------------------------------------------------------------[ Listen ]
  @Listen('resize', { target: 'window' })
  resize() {
    if (!this.loaded) {
      forceUpdate(this.el);
    }
  }
  // --------------------------------------------------------------[ public function ]
  /**
   * 重新加载
   */
  @Method()
  async reload() {
    if (this.loading === false || this.error) {
      this.error = false;
      this.beginLazyLoad();
    }
  }
  // --------------------------------------------------------------[ event hander ]
  private imgOnLoad = () => {
    if (this.loadSrc) {
      this.aiaoImgDidLoad.emit();
    }
  };
  // --------------------------------------------------------------[ private function ]
  private beginLazyLoad() {
    if (this.src === undefined || (this.loadSrc === this.src && this.loaded)) {
      return;
    }
    this.loaded = false;
    this.loading = false;
    this.cacheImageRequest = null;
    if ('IntersectionObserver' in window) {
      this.removeIO();
      this.io = new IntersectionObserver(data => {
        if (data[0].isIntersecting) {
          this.beginLoading();
          this.removeIO();
        }
      });
      if (this.io['_callback']) {
        this.io['POLL_INTERVAL'] = 100;
      }
      this.io.observe(this.el);
    } else {
      setTimeout(() => this.beginLoading(), 200);
    }
  }
  private removeIO() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }
  private getImageRequest() {
    if (this.imageStorage?.requestOptions) {
      const width = this.el.clientWidth;
      const height = this.el.clientHeight || this.el.clientWidth;
      return this.imageStorage.requestOptions(this.src, {
        adapter: this.platform,
        width,
        height,
        method: this.method
      });
    }
    return {
      url: this.src
    } as any;
  }
  private beginLoading() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    const request = this.cacheImageRequest || this.getImageRequest();
    this.cacheImageRequest = request;
    if (this.img) {
      this.img.onabort = this.img.onerror = this.img.onload = undefined;
    }
    const img = new Image();
    this.img = img;
    img.decoding = 'async';
    img.onload = () => {
      this.loading = false;
      this.loaded = true;
      this.error = false;
      this.loadSrc = request.url;
      this.img = null;
    };
    img.onabort = img.onerror = () => {
      this.loading = false;
      this.error = true;
      this.aiaoError.emit();
      this.img = null;
    };
    img.src = request.url;
  }
  // --------------------------------------------------------------[ lifecycle ]
  componentDidLoad() {
    // 图片加载优先级降低
    setTimeout(() => this.beginLazyLoad(), 0);
  }
  render() {
    const cls = {
      loaded: this.loaded,
      [this.animation]: !!this.animation
    };
    const areas =
      this.loadSrc && imgGetAreas(this.map, this.el.clientWidth, this.el.clientHeight || this.el.clientWidth);
    const attrs = { usemap: areas && `#${this.usemap}` };
    return (
      <Host class={cls}>
        {this.error && (
          <div class="error" onClick={this.reload.bind(this)}>
            <slot name="error">404</slot>
          </div>
        )}
        {this.loading && (
          <div class="loading">
            <slot name="loading"></slot>
          </div>
        )}
        <img
          {...attrs}
          src={this.loadSrc || IMAGE_MIN_BASE64_TRANSPARENT}
          alt={this.alt}
          decoding="async"
          onLoad={this.imgOnLoad}
        />
        {areas && (
          <map name={this.usemap}>
            {areas.map(area => (
              <area {...area} />
            ))}
          </map>
        )}
        <slot />
      </Host>
    );
  }
}
