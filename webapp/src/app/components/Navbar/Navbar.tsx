import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { signOutUser } from '@/api/auth';
import PAGE from '@/utils/routes';
import { COMPANY_NAME, SIGN_OUT_LINK_LABEL } from './constants';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const router = useRouter();

  const onSignOut = async () => {
    await signOutUser();
    router.push(PAGE.SIGN_IN);
  };

  return (
    <BootstrapNavbar className='navbar'>
      <Container>
        <BootstrapNavbar.Brand className='brand' href={PAGE.DASHBOARD}>
          {COMPANY_NAME}
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle />
        <BootstrapNavbar.Collapse className='collapse'>
          <BootstrapNavbar.Text>
            <Link className='sign-out-link' href={PAGE.SIGN_IN} onClick={onSignOut}>
              {SIGN_OUT_LINK_LABEL}
            </Link>
          </BootstrapNavbar.Text>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
