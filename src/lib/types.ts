import { ReactNode } from "react";

// COMPONENTS
export type ButtonProps = {
  size?: "small" | "medium" | "large";
  variation?: "primary" | "secondary" | "danger";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
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
  error?: string;
  children: ReactNode;
};
export type HeadingProps = { as: "h1" | "h2" | "h3" | "h4" };
export type PaginationProps = { count: number };
export type ProtectedRouteProps = { children: ReactNode };
export type RowProps = {
  type?: "vertical" | "horizontal";
  children: ReactNode;
};
export type SelectProps = {
  options: OptionsObject[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  type?: string;
};
export type StyledSelectProps = { type: string };
export type SortByProps = { options: OptionsObject[] };
export type TagProps = { type: string };


// FEATURES
export type CheckoutButtonProps = {
  bookingId: string
}
// INTERFACES
interface OptionsObject {
  label: string;
  value: string;
}
