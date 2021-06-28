import { adminRoot } from './defaultValues';
// import { UserRole } from '../helpers/authHelper';

const data = [
  {
    id: 'templates',
    icon: 'simple-icon-notebook',
    label: 'menu.templates',
    to: `${adminRoot}/templates`
  },
  {
    id: 'snippets',
    icon: 'simple-icon-pencil',
    label: 'menu.snippets',
    to: `${adminRoot}/snippets`
  },
  {
    id: 'placeholder',
    icon: 'simple-icon-note',
    label: 'menu.placeholder',
    to: `${adminRoot}/placeholders`
  },
  {
    id: 'contacts',
    icon: 'simple-icon-people',
    label: 'menu.contacts',
    to: `${adminRoot}/contacts`
  },
  {
    id: 'types',
    icon: 'simple-icon-grid',
    label: 'menu.types',
    to: `${adminRoot}/types`
  },
  {
    id: 'account',
    icon: 'simple-icon-user',
    label: 'menu.account',
    to: `${adminRoot}/account`
  }
  // {
  //   id: 'gogo',
  //   icon: 'iconsminds-air-balloon-1',
  //   label: 'menu.gogo',
  //   to: `${adminRoot}/gogo`,
  //   // roles: [UserRole.Admin, UserRole.Editor],
  //   subs: [
  //     {
  //       icon: 'simple-icon-paper-plane',
  //       label: 'menu.start',
  //       to: `${adminRoot}/gogo/start`,
  //     },
  //   ],
  // },
  // {
  //   id: 'secondmenu',
  //   icon: 'iconsminds-three-arrow-fork',
  //   label: 'menu.second-menu',
  //   to: `${adminRoot}/second-menu`,
  //   subs: [
  //     {
  //       icon: 'simple-icon-paper-plane',
  //       label: 'menu.second',
  //       to: `${adminRoot}/second-menu/second`,
  //     },
  //   ],
  // },
  // {
  //   id: 'blankpage',
  //   icon: 'iconsminds-bucket',
  //   label: 'menu.blank-page',
  //   to: `${adminRoot}/blank-page`,
  // },
  // {
  //   id: 'docs',
  //   icon: 'iconsminds-library',
  //   label: 'menu.docs',
  //   to: 'https://gogo-react-docs.coloredstrategies.com/',
  //   newWindow: true,
  // },
];
export default data;
