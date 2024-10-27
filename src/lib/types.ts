import { ReactNode } from "react";

// COMPONENTS
export type ButtonProps = {
  size: "small" | "medium" | "large";
  variation: "primary" | "secondary" | "danger";
};
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
export type FormProps = { type: "regular" | "modal" };
export type FormRowProps = {
  label: string;
  error: string;
  children: ReactNode;
};
export type HeadingProps = { as: "h1" | "h2" | "h3" | "h4" };
export type PaginationProps = { count: number };
export type ProtectedRouteProps = { children: ReactNode };
export type RowProps = {
  type?: "vertical" | "horizontal";
  children: ReactNode;
};
export type SortByProps = { options: OptionsObject };
export type TagProps = { type: string };

export interface OptionsObject {
  label: string;
  value: string;
}
