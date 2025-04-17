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
