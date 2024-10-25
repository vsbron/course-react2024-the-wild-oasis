import { ReactNode } from "react";

// COMPONENTS
export type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
  disabled: boolean;
  id: string;
  children: ReactNode;
};
export type DataItemProps = {
  icon: string;
  label: string;
  children: ReactNode;
};
export type EmptyProps = {
  resourceName: string;
};
export type PaginationProps = { count: number };
export type ProtectedRouteProps = { children: ReactNode };
export type RowProps = { type: "vertical" | "horizontal"; children: ReactNode };
