import { UserModel, EmployeeDetails } from '../models';

export class UserBuilder {
  private _id: number;
  private _first_name: string;
  private _middle_name: string;
  private _last_name: string;
  private _suffix_name: string;
  private _birthdate: string;
  private _gender: string;
  private _marital_status_id: number;
  private _contact_number: string;
  private _home_address: string;
  private _email_address: string;
  private _photo_path: string;
  private _id_photo_path: string;
  private _id_type: number;
  private _id_number:string;
  private _is_admin: number;
  private _created_at: string | number;
  private _updated_at: string | number;
  private _employee_details: EmployeeDetails[];


  constructor() {}

  build(): UserModel {
    return new UserModel(this);
  }

  get id(): number {
    return this._id;
  }

  setId(value: number) {
    this._id = value;

    return this;
  }

  get first_name(): string {
    return this._first_name;
  }

  setFirst_name(value: string) {
    this._first_name = value;

    return this;
  }

  get middle_name(): string {
    return this._middle_name;
  }

  setMiddle_name(value: string) {
    this._middle_name = value;

    return this;
  }

  get last_name(): string {
    return this._last_name;
  }

  setLast_name(value: string) {
    this._last_name = value;

    return this;
  }

  get suffix_name(): string {
    return this._suffix_name;
  }

  setSuffix_name(value: string) {
    this._suffix_name = value;

    return this;
  }

  get marital_status_id(): number {
    return this._marital_status_id;
  }

  setMarital_status(value: number) {
    this._marital_status_id = value;

    return this;
  }

  get contact_number(): string {
    return this._contact_number;
  }

  setContact_number(value: string) {
    this._contact_number = value;

    return this;
  }

  get home_address(): string {
    return this._home_address;
  }

  setHome_address(value: string) {
    this._home_address = value;

    return this;
  }


  get gender(): string {
    return this._gender;
  }

  setGender(value: string) {
    this._gender = value;

    return this;
  }

  get birthdate(): string {
    return this._birthdate;
  }

  setBirthdate(value: string) {
    this._birthdate = value;

    return this;
  }

  get email_address(): string {
    return this._email_address;
  }

  setEmail_address(value: string) {
    this._email_address = value;

    return this;
  }

  get photo_path(): string {
    return this._photo_path;
  }

  setPhoto_path(value: string) {
    this._photo_path = value;

    return this;
  }

  get id_type(): number {
    return this._id_type;
  }

  setId_type(value: number) {
    this._id_type = value;

    return this;
  }

  get id_number(): string {
    return this._id_number;
  }

  setId_number(value: string) {
    this._id_number = value;

    return this;
  }

  get is_admin(): number {
    return this._is_admin;
  }

  setIs_admin(value: number) {
    this._is_admin = value;

    return this;
  }

  get created_at(): string | number {
    return this._created_at;
  }

  setCreated_at(value: string | number) {
    this._created_at = value;

    return this;
  }

  get updated_at(): string | number {
    return this._updated_at;
  }

  setUpdated_at(value: string | number) {
    this._updated_at = value;

    return this;
  }

  get id_photo_path(): string {
    return this._id_photo_path;
  }

  setId_photo_path(value: string) {
    this._id_photo_path = value;

    return this;
  }

  get employee_details(): EmployeeDetails[] {
    return this._employee_details;
  }

  setEmployee_details(employee_details: EmployeeDetails[]) {
    this._employee_details = employee_details;

    return this;
  }

 
}
