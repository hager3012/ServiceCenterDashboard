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
    name: 'Client',
    layout: '/admin',
    path: '/client',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Schedule',
    layout: '/admin',
    path: '/schedule',
    icon: <Icon as={MdTimer} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'TimeSlot',
    layout: '/admin',
    path: '/timeslot',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Appointment',
    layout: '/admin',
    path: '/appointment',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'City',
    layout: '/admin',
    path: '/city',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Developer',
    layout: '/admin',
    path: '/developer',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Project Category',
    layout: '/admin',
    path: '/project-category',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Project',
    layout: '/admin',
    path: '/project',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Facility',
    layout: '/admin',
    path: '/facility',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Payment Plan',
    layout: '/admin',
    path: '/payment-plan',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Phase',
    layout: '/admin',
    path: '/phase',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Event',
    layout: '/admin',
    path: '/event',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Property',
    layout: '/admin',
    path: '/property',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Unit',
    layout: '/admin',
    path: '/unit',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'FloorPlan',
    layout: '/admin',
    path: '/floor-plan',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Agent',
    layout: '/admin',
    path: '/agent',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Offer',
    layout: '/admin',
    path: '/offer',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
];

export default routes;
