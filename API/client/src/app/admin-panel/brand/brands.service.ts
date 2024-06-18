import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { map } from 'rxjs';
import { Brand } from 'src/app/shared/models/brand';
import { IPagination } from 'src/app/shared/models/pagination';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  baseUrl = environment.apiUrl
  cuid: string = cuid();
  newBrand = new Brand();
  
  constructor(private http: HttpClient) { }

  addBrand(name: string) {
    this.newBrand.name = name;

    return this.http.post<string>(this.baseUrl + 'brands/add-brand', this.newBrand)
  }

  editBrand(brand: any) {
    return this.http.put(this.baseUrl + 'brands/edit-brand', brand);
  }

  deleteBrand(brand: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        id: brand.id,
        name: brand.name
      }
    };
    return this.http.delete(this.baseUrl + 'brands/delete-brand', httpOptions);
  }

  getBrand(id: string) {
    return this.http.get<Brand>(this.baseUrl + 'brands/' + id);
  }
  // getBrands(shopParams: ShopParams) {
  //   let params = new HttpParams();

  //   params = params.append('sort', shopParams.sort);
  //   params = params.append('pageIndex', shopParams.pageNumber.toString());
  //   params = params.append('pageIndex', shopParams.pageSize.toString());
      
  //   return this.http.get<Brand>(this.baseUrl + 'brands', {observe: 'response', params})
  //     .pipe(
  //       map(response => response.body)
  //     );
  // }

  
}
