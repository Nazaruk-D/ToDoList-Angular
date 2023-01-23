import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CommonResponse} from "../models/core.models";
import {ResultCodeEnum} from "../enums/resultCode.enum";
import {Router} from "@angular/router";

export interface LoginRequestData {
  email: string
  password: string
  rememberMe: boolean
}


@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(data: Partial<LoginRequestData>) {
    this.http.post<CommonResponse<{userId: number}>>(`${environment.baseURL}/auth/login`, data)
      .subscribe((res) => {
        if(res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/'])
        }
      })
  }

  logout() {
    this.http.delete<CommonResponse>(`${environment.baseURL}/auth/login`)
      .subscribe((res) => {
        if(res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/login'])
        }
      })
  }

  me() {
    this.http.get(`${environment.baseURL}/auth/me`)
      .subscribe((res) => {
        debugger
      })
  }
}
