const sidebarOptions = [
  { name: 'Summary', endpoint: 'summary' },
  { name: 'Rota', endpoint: 'rota' },
  { name: 'Employees', endpoint: 'employees' },
];

export const SIDEBAR_STATES = {
  CLOSED: 'closed',
  CLOSING: 'closing',
  OPEN: 'open',
  OPENING: 'opening',
};

export interface SidebarOption {
  name: string;
  endpoint: string;
}

export default sidebarOptions;
