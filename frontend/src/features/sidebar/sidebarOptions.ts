import Role from '../../common/model/Role';

export interface SidebarOption {
  name: string;
  endpoint: string;
}

const sidebarOptionsDefault: SidebarOption[] = [
  { name: 'Summary', endpoint: 'summary' },
  { name: 'Rota', endpoint: 'rota' },
];

const sidebarOptionsManager: SidebarOption[] = [
  ...sidebarOptionsDefault,
  { name: 'Employees', endpoint: 'employees' },
];

export const getSidebarOptions = (role: Role): SidebarOption[] => {
  switch (role) {
    case Role.MANAGER:
      return sidebarOptionsManager;
    default:
      return sidebarOptionsDefault;
  }
};
