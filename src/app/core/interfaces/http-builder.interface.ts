import { HttpParams } from '@angular/common/http';

export interface HttpBuilderInterface {
  build(params: any): HttpParams;
}