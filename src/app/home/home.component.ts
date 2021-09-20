import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Usuario } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarioObj : Usuario = new Usuario();
  usuarioData !: any;
  formValue !: FormGroup;
  showUsuario !: boolean;
  showActualizar !:Boolean;
  public usuarios:any = []

  constructor(private formbuilder: FormBuilder,private api :ApiService) { }

  ngOnInit(): void {


      this.formValue = this.formbuilder.group({
        first_name:[''],
        last_name:[''],
        email:['']
      })
      this.getTodoUsuario();


  }

  clickAgregarUsuario(){
    this.formValue.reset();
    this.showUsuario=true;
    this.showActualizar=false;
  }

  postDetallesUsuario(){
    this.usuarioObj.first_name = this.formValue.value.first_name;
    this.usuarioObj.last_name = this.formValue.value.last_name;
    this.usuarioObj.email = this.formValue.value.email;

    this.api.postUsuario(this.usuarioObj)
    .subscribe(res=>{
      console.log(res);
      alert("Empleado agregado con exito")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getTodoUsuario();
    },
    err=>{alert("Algo paso ups...")}
    )
   
  }

  getTodoUsuario(){
    this.api.getUsuario()
    .subscribe(res=>{
      this.usuarios = res.data;
      alert('Usuarios listados')
    })
  }

  eliminarUsuario(usuario: any){
    this.api.deleteUsuario(usuario.id)
    .subscribe(res=>{
      alert("Usuario eliminado");
      this.getTodoUsuario();
    })
  }

  editarUsuario(usuario:any){
    this.showUsuario=false;
    this.showActualizar=true;
    this.usuarioObj.id= usuario.id;
    this.formValue.controls['first_name'].setValue(usuario.first_name)
    this.formValue.controls['last_name'].setValue(usuario.last_name)
    this.formValue.controls['email'].setValue(usuario.email)
    
  }

  actualizarUsuario(){
    this.usuarioObj.first_name = this.formValue.value.first_name;
    this.usuarioObj.last_name = this.formValue.value.last_name;
    this.usuarioObj.email = this.formValue.value.email;

    this.api.updatetUsuario(this.usuarioObj,this.usuarioObj.id)
    .subscribe(res=>{
      alert("Actualizacion completada");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getTodoUsuario();
      
    })
  }
}
