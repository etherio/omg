import { database } from "../firebase";

export default class Model {
  constructor(data) {
    this._data = data || {};
    this._id = this._data["id"] || this._data["_id"] || null;
    Object.entries(this.defineProperties()).forEach(([name, value]) => {
      this[name] = this._data[name] || value;
    });
    data && this.beforeLoaded();
  }

  beforeLoaded() {}

  async onSave() {}

  async onUpdate() {}

  async onDelete() {}

  async onPush() {}

  getCollection() {
    return "";
  }

  defineProperties() {
    return {};
  }

  toJSON() {
    let data = {};
    Object.entries(this.defineProperties()).map(([name, value]) => {
      data[name] = this[name] || value;
    });
    return data;
  }

  async get() {
    let data = await database
      .child(`${this.getCollection()}/${this._id}`)
      .get();
    this._data = (await data.val()) || {};
    Object.entries(this.defineProperties()).map(([name, value]) => {
      this[name] = this._data[name] || value;
    });
    return this;
  }

  async save() {
    await this.onSave();
    if (this._id) {
      await database
        .child(`${this.getCollection()}/${this._id}`)
        .set(this.toJSON());
    } else {
      this._data = this.toJSON();
      await database.child(this.getCollection()).push(this._data);
    }
    return this;
  }

  async update(data) {
    if (data) {
      Object.entries(data).forEach(([key, value]) => (this[key] = value));
    }
    await this.onUpdate();
    this._data = this.toJSON();
    await database
      .child(`${this.getCollection()}/${this._id}`)
      .update(this._data);
    return this;
  }

  async delete() {
    await this.onDelete();
    this._data = {};
    return await database.child(`${this.getCollection()}/${this._id}`).remove();
  }

  static async make(data) {
    let results = [];
    Object.entries(data).forEach(([id, value]) => {
      results.push(new this({ id, ...value }));
    });
    return results;
  }

  static async all() {
    let snapshot = await database.child(new this().getCollection()).get();

    return snapshot.exists() ? this.make(snapshot.val()) : [];
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
