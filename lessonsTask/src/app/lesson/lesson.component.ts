import { Component, OnInit } from '@angular/core';
import {MatDialog, } from "@angular/material/dialog";

import {ModalComponent} from '../modal/modal.component';
import {LocalStorageService} from './local-storage.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  lessonsList : {
    topic: string,
    date : string,
    lecturer: string
    editMode:boolean;
  }[] = [];
    singleTopic:string;
    singleDate:string;
    singleLecturer:string;
  

  constructor(public dialog:MatDialog, public local:LocalStorageService) {}

  ngOnInit() {
    this.lessonsList = this.local.loadMemory() ;
  }

  openModule():void {
       const dialogRef = this.dialog.open( ModalComponent ,{height: '400px',width: '600px',
          data : {topic:this.singleTopic , date:this.singleDate, lecturer:this.singleLecturer , editMode:Boolean} 
        });

        dialogRef.afterClosed().subscribe(result => {
          result.editMode = false;
          this.lessonsList.push(result);          
          this.local.addToMemory(this.lessonsList.length-1,result)
        });   
  }
  
  editChanger(id): void {
      this.lessonsList[id].editMode = !this.lessonsList[id].editMode;
  }

  saveChanger(id): void {
    this.lessonsList[id].editMode = !this.lessonsList[id].editMode;
    this.local.addToMemory(id,this.lessonsList[id]);
  }  
}
