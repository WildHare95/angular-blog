import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {Subscription} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() delay = 3000

  public text!: string
  public type = "success"

  constructor(private alertService: AlertService) { }

  ngOnInit(){
    this.alertService.alert$.pipe(untilDestroyed(this)).subscribe(alert => {
        this.text = alert.text
        this.type = alert.type

        const timeout = setTimeout(() => {
          clearTimeout(timeout)
          this.text = ""
        }, this.delay)
    })
  }
}
