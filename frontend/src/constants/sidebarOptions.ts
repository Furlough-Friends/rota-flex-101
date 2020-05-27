import { Role } from "./employees";

const sidebarOptionsDefault = [
  { name: 'Summary', endpoint: 'summary' },
  { name: 'Rota', endpoint: 'rota' },
];

const sidebarOptionsManager = [
  { name: 'Summary', endpoint: 'summary' },
  { name: 'Rota', endpoint: 'rota' },
  { name: 'Employees', endpoint: 'employees' },
];

export const getSidebarOptions = (role: Role) => {
  let sidebarOptions: SidebarOption[] = [];
  switch (role) {
    case Role.MANAGER:
      sidebarOptions = sidebarOptions.concat(sidebarOptionsManager);
      break;
    default:
      sidebarOptions = sidebarOptions.concat(sidebarOptionsDefault);
  }
  return sidebarOptions;
}

export interface SidebarOption {
  name: string;
  endpoint: string;
}

export interface SideberButtonConfig {
  name: string;
  endpoint: string;
  isWindowBig: boolean;
}
