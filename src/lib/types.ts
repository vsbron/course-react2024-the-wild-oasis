import { ReactNode } from "react";

// COMPONENTS
export type ButtonProps = {
  size?: "small" | "medium" | "large";
  variation?: "primary" | "secondary" | "danger";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  icon?: ReactNode;
};
export type ButtonIconProps = {
  onClick?: () => void;
  disabled?: boolean;
};
export type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
  disabled: boolean;
  id: string;
  children: ReactNode;
};
export type ConfirmDeleteProps = {
  resourceName: string;
  onConfirm: () => void;
  disabled: boolean;
  onCloseModal?: () => void;
};
export type DataItemProps = {
  icon: ReactNode;
  label: string;
  children: ReactNode;
};
export type EmptyProps = {
  resourceName: string;
};
export type FormProps = { type?: "regular" | "modal" };
export type FormRowProps = {
  label?: string;
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
export type BookingDataBoxProps = {
  booking: BookingObject;
};
export type CheckoutButtonProps = {
  bookingId: string;
};
export type PriceProps = {
  isPaid: boolean;
};

// INTERFACES
interface BookingObject {
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  guests: {
    fullName: string;
    email: string;
    country: string;
    countryFlag: string;
    nationalID: string;
  };
  cabins: { name: string };
}
interface OptionsObject {
  label: string;
  value: string;
}

// CONTEXT
export type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

// FORMS
export type SignupFormData = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
