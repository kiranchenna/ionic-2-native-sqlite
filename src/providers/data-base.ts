import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DataBase provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataBase {

  constructor(private sqlite: SQLite) {
    console.log('Hello DataBase Provider');
  }

  creteDatabase(){
    return this.sqlite.create({
      name: 'mydb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, name text)", []).then(res => {
        return Promise.resolve(res);
      }).catch(e => {
        return Promise.resolve(e);
      });
    }).catch(e => {
      return Promise.resolve(e);
    });
  }

  insertContact(contact) {
    let insertQuery = "INSERT INTO contacts (name, number) VALUES (?,?)";
    return this.sqlite.create({
      name: 'mydb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql(insertQuery, [contact.name, contact.number]).then(res => {
        return Promise.resolve(res);
      }).catch(e => {
        return Promise.resolve(e);
      });
    }).catch(e => {
      return Promise.resolve(e);
    });
  }

  updateContact(contact){
    let updateQuery = "UPDATE contacts SET name = ?, number = ? WHERE id = ?";
    return this.sqlite.create({
      name: 'mydb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql(updateQuery, [contact.name, contact.number, contact.id]).then(res => {
        return Promise.resolve(res);
      }).catch(e => {
        return Promise.resolve(e);
      });
    }).catch(e => {
      return Promise.resolve(e);
    });
  }

  deleteContact(contact) {
    let deleteQuery = "DELETE FROM contacts WHERE id = ? AND name = ? AND number = ?";
    return this.sqlite.create({
      name: 'mydb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql(deleteQuery, [contact.id, contact.name, contact.number]).then(res => {
        return Promise.resolve(res);
      }).catch(e => {
        return Promise.resolve(e);
      });
    }).catch(e => {
      return Promise.resolve(e);
    });
  }

  getAllContacts(){
    let getQuery = "SELECT * FROM contacts ORDER BY id DESC";
    return this.sqlite.create({
      name: 'mydb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql(getQuery, []).then(res => {
        let contacts = [];
        for (var i = 0; i < res.rows.length; i++) {
          contacts.push(res.rows.item(i));
        }
        return Promise.resolve(contacts);
      }).catch(e => {
        return Promise.resolve(e);
      });
    }).catch(e => {
      return Promise.resolve(e);
    });
  }

}
