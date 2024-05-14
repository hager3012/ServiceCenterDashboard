import { Icon } from '@chakra-ui/react';
import {
  MdPerson,
  MdHome,
  MdTimer,
  MdRoom,
  MdLock,
} from 'react-icons/md';


import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Center',
    layout: '/admin',
    path: '/center',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Product Brand',
    layout: '/admin',
    path: '/product-brand',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  },
];

export default routes;
