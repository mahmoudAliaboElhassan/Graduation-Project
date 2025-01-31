export interface Header {
  href?: string;
  label: string;
}
export interface DirectionType {
  direction: "ltr" | "rtl";
  left: string;
  right: string;
  marginLeft: string;
  marginRight: string;
  paddingLeft: string;
  paddingRight: string;
  borderTopRightRadius: string;
  borderRight: string;
}
export interface lang {
  code: string;
  name: string;
  country_code: string;
  dir?: string;
}
export interface RolesType {
  text: string;
  value: number | string;
}
export interface GradesType {
  text?: string;
  group?: string;
  value?: number;
}
export interface SubjectType {
  text: string;
  value: string;
}
