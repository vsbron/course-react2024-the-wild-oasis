import { ReactNode } from "react";
import { BookingObject } from "./types";

export type BodyProps = {
  data: any;
  render: (item: BookingObject) => React.JSX.Element;
};
export type CommonRowProps = {
  columns: string;
};
export type HeaderProps = {
  children: ReactNode;
};
export type RowProps = { children: ReactNode; columns?: string };
export type TableProps = {
  columns: string;
  children: React.ReactNode;
};
export type TableContextType = {
  columns: string;
};
