import { DatePipe } from "@angular/common";

export interface IUser {
  emailId: string;
  userPassword: string;
  roleId: number | null;
  gender: string | null;
  dateOfBirth: Date | null;
 // birthDate: DatePipe | null;
  address: string | null;
}
