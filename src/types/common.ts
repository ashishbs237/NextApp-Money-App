export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface IConfirmatinDialogAction<T> {
  data?: T;
  command?: "default" | "edit" | "delete" | "info";
}

export interface IDialogType<T> {
  data?: T;
  command?: "default" | "add" | "delete";
}

// export interface IIncomeItem{
//   command?: "default" | "add" | "delete";
//   data?: {
//     _id? : number,
//     label?: string;
//     amount?: string;
//     customLabel?: string;
//   };
// }

export interface IIncomeItem {
  _id?: string | number;
  label?: string;
  amount?: string;
  customLabel?: string;
  yearlyIncrement?: number;
}

export type ActionType = "add" | "edit" | "delete" | "info" | "default" | null;
