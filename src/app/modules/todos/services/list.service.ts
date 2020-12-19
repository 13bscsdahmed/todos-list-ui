import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../../../config/api-urls.constants';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ListModel } from '../../../store/list/models/list.model';
import { ApiResModel } from '../../shared/models/api-res.model';

@Injectable()
export class ListService {

  constructor(private http: HttpClient) { }
  
  /**
   * Function to fetch lists
   */
  fetchLists(): Observable<ApiResModel<ListModel[]>> {
    const urlString = apiUrls.baseUrl + apiUrls.endpoints.lists;
    return this.http.get<ApiResModel<Array<ListModel>>>(urlString)
    .pipe(
      catchError((error: Error) => {
        return throwError(error);
      })
    );
  }
}
