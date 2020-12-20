import { Injectable } from '@angular/core';
import { TasksCompletedPerDayReportModel } from '../../shared/models/reports.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiResModel } from '../../shared/models/api-res.model';
import { apiUrls } from '../../../config/api-urls.constants';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ReportService {
  
  constructor(private http: HttpClient) { }
  
  /**
   * Function to tasks completed per day report
   */
  fetchTaskCompletedPerDayReport(): Observable<ApiResModel<TasksCompletedPerDayReportModel[]>> {
    const urlString = apiUrls.baseUrl + apiUrls.endpoints.taskCompletedPerDay;
    return this.http.get<ApiResModel<Array<TasksCompletedPerDayReportModel>>>(urlString)
    .pipe(
      catchError((error: Error) => {
        return throwError(error);
      })
    );
  }
}
