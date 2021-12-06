/**
 * 安全 dom
 */
export interface IDomSanitizer {
  bypassSecurityTrustHtml(value: string): any;
  bypassSecurityTrustStyle(value: string): any;
  bypassSecurityTrustScript(value: string): any;
  bypassSecurityTrustUrl(value: string): any;
  bypassSecurityTrustResourceUrl(value: string): any;
}
