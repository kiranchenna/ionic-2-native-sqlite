import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
/*import { SQLite, SQLiteObject } from '@ionic-native/sqlite';*/
import { DataBase } from "../../providers/data-base";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  disableBtn: boolean = true;
  contacts:any = [];

  constructor(public navCtrl: NavController, private altCtrl: AlertController, private db: DataBase) {
    this.db.creteDatabase().then(res => {
      console.log(res);
      this.getAllContacts();
    });
  }

  getAllContacts(){
    this.db.getAllContacts().then(res => {
      this.contacts = res;
      console.log(this.contacts);
    });
  }

  newContactForm(){
    let alert = this.altCtrl.create({
      title: 'New Contact',
      message: 'Enter New Contact Details',
      inputs: [{
        name: 'name',
        type: 'text',
        placeholder: 'Contact Name'
      }, {
        name: 'number',
        type: 'tel',
        placeholder: 'Contact Number'
      }],
      buttons: [{
        text: 'Cancle',
        handler: () => {
          console.log('Cancled');
        }
      }, {
        text: 'Create',
        handler: (data) => {
          data.completed = false;
          this.db.insertContact(data).then(res => {
            this.getAllContacts();
          }).catch(e => {
            console.log(e);
          });
        }
      }]
    });
    alert.present();
  }

  editPopup(contact){
    let popup = this.altCtrl.create({
      title: 'Edit Contact',
      message: 'Update contact details',
      inputs: [{
        name: 'name',
        type: 'text',
        value: contact.name
      }, {
        name: 'number',
        type: 'tel',
        value: contact.number
      }],
      buttons: [{
        text: 'Cancle',
        handler: ()=> {

        }
      }, {
        text: 'Update',
        handler: (data) => {
          data.completed = false;
          data.id = contact.id;
          this.db.updateContact(data).then(res => {
            this.getAllContacts();
          }).catch(e => {
            console.log(e);
          });
        }
      }]
    });
    popup.present();
  }

  deletePopup(contact){
    let popup = this.altCtrl.create({
      title: 'Delete Contact',
      message: 'Are you sure want to delete this contact?',
      buttons: [{
        text: 'Noooooo!',
        handler: () => {

        }
      }, {
        text: 'Delete',
        handler: () => {
          this.db.deleteContact(contact).then(res => {
            this.getAllContacts();
          })
        }
      }]
    });
    popup.present();
  }

}
