import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { constants } from '../../../../config/app.constants';
import { TasksCompletedPerDayReportModel } from '../../../shared/models/reports.model';
import { ToastrService } from 'ngx-toastr';


/**
 * Todos reports component. Shows all the past list
 */
@Component({
  selector: 'app-report',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  constructor(private reportService: ReportService,
              private toastrService: ToastrService) { }
  reports: Array<TasksCompletedPerDayReportModel> = [];
  lastUpdatedTime: number;
  
  ngOnInit(): void {
    this.reportService.fetchTaskCompletedPerDayReport().subscribe( (res) => {
      this.reports = res.data;
      this.lastUpdatedTime = this.reports[0].updatedDateTime;
    }, (err) => {
      this.toastrService.error('An error occurred fetching report.', constants.toast.types.errorToast);
    });
  }
  
}
