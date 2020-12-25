import { database } from "../firebase";

class Eloquent {
  constructor(data) {
    let d = data || {};
    this._id = d["id"] || d["_id"] || null;
    Object.entries(this.defineProperties()).forEach(([name, value]) => {
      this[name] = d[name] || value;
    });
    data && this.beforeLoaded();
  }

  beforeLoaded() {}

  beforeUpload() {}

  getCollection() {
    return "";
  }

  defineProperties() {
    return {};
  }

  toJSON() {
    let data = {};
    this.__threat__ = this.beforeUpload();
    Object.entries(this.defineProperties()).map(([name, value]) => {
      data[name] = this[name] || value;
    });
    return data;
  }

  async save() {
    let result = await database.child(this.getCollection()).push(this.toJSON());
    await this.__threat__;
    return result;
  }

  async update(data) {
    return await database
      .child(`${this.getCollection()}/${this._id}`)
      .update(data);
  }

  async delete() {
    return await database.child(`${this.getCollection()}/${this._id}`).remove();
  }

  static async make(snapshot) {
    let results = [];
    Object.entries(snapshot.val()).forEach(([id, data]) => {
      results.push(new this({ id, ...data }));
    });
    return results;
  }

  static async all() {
    let snapshot = await database.child(new this().getCollection()).get();
    return await this.make(snapshot);
  }

  static remove(id) {
    return database.child(`${new this().getCollection()}/${id}`).remove();
  }

  static orderByChild() {
    return database
      .child(new this().getCollection())
      .orderByChild(...arguments);
  }

  static orderByValue() {
    return database
      .child(new this().getCollection())
      .orderByValue(...arguments);
  }

  static endAt() {
    return database.child(new this().getCollection()).endAt(...arguments);
  }

  static startAt() {
    return database.child(new this().getCollection()).startAt(...arguments);
  }

  static limitToFirst() {
    return database
      .child(new this().getCollection())
      .limitToFirst(...arguments);
  }

  static limitToLast() {
    return database.child(new this().getCollection()).limitToLast(...arguments);
  }

  static isEqual() {
    return database.child(new this().getCollection()).isEqual(...arguments);
  }

  static async create() {
    return;
  }

  static async find() {
    return;
  }

  static async findOne() {
    return;
  }

  static async paginate() {
    return;
  }
}

export default Eloquent;
