import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class ApiService{

    constructor(private http: HttpClient){}

    postUsuario(data:any){
        return this.http.post<any>("https://reqres.in/api/users", data)
        .pipe(map((res:any)=>{return res}))
    }
    getUsuario(){
        return this.http.get<any>("https://reqres.in/api/users?page=2")
        .pipe(
            map((res:any)=>{
                return res}))
    }
    updatetUsuario(data:any, id: number){
        return this.http.put<any>("https://reqres.in/api/users/2",+id, data)
        .pipe(
            map((res:any)=>{
                return res}))
    }
    deleteUsuario(id:number){
        return this.http.delete<any>("https://reqres.in/api/users/2"+id)
        .pipe(
            map((res:any)=>{
                return res}))
    }


    
}


