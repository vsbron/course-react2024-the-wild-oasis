import { ReactNode } from "react";

export type BodyProps = { data: any; render: () => void };
export type CommonRowProps = {
  columns: string;
};
export type HeaderProps = {
  children: ReactNode;
};
export type RowProps = { children: ReactNode };
export type TableProps = {
  columns: string;
  children: React.ReactNode;
};
export type TableContextType = {
  columns: string;
};
