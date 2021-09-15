import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor(
    private dilogRef: MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String
  ) { }

  ngOnInit(): void {
    
  }

  cerrar(){
    this.dilogRef.close();
  }

  borrar(){
    this.dilogRef.close( true );
  }
}
