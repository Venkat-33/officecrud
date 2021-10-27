import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { StageService } from '../services/stage.service';
import { StatesList,StateListResponse } from '../services/State/state.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sub: Subscription = new Subscription();
   
  UserRoleList: StatesList[] = [];
  UserRoleReceivedList: StatesList[] = [];
  UserRoleListResponse: StateListResponse = {};
  errorMessage: any = "";
  limit:number=30;
  alertType = "alert-danger";
  
 
  // Error messages
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
 
  constructor(
    private StageService:StageService
  ) {
   }


  ngOnInit(): void {
    // sub: Subscription = new Subscription();
    this.PopulateStateList();
  }
 
  PopulateStateList(){
    this.errorMessage = '';
    var response = this.StageService.populateStates()
      .subscribe(httpResponse => {
        this.UserRoleListResponse = httpResponse;
        if (this.UserRoleListResponse.status === 'true') {
         // this.UserRoleReceivedList = this.UserRoleListResponse.admin !== undefined ? this.UserRoleListResponse.admin : []; // 240
               if(this.UserRoleListResponse.states!== undefined){
                           this.UserRoleReceivedList= this.UserRoleListResponse.states
                          }
        else{
          this.UserRoleReceivedList = [];
        }
        this.UserRoleList = this.UserRoleListResponse.states !== undefined ? this.UserRoleListResponse.states.slice(0,  this.limit) : [];;
        }
        else {
          this.errorMessage = this.UserRoleListResponse.message;
          this.alertType = "alert-danger";
        }
      },
        (err: HttpErrorResponse) => {
          console.log(err);
        });
}}
