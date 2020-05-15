const sidebarOptions = [
  { name: 'Summary', endpoint: 'summary' },
  { name: 'Rota', endpoint: 'rota' },
  { name: 'Employees', endpoint: 'employees' },
];

export interface SidebarOption {
  name: string;
  endpoint: string;
}

export interface SideberButtonConfig {
  name: string;
  endpoint: string;
  isWindowBig: boolean;
}

export default sidebarOptions;
