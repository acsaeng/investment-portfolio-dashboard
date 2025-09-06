import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, Navbar as BootstrapNavbar } from "react-bootstrap";
import { signOutUser } from "@/api/auth";
import PAGE from "@/utils/routes";
import CompanyWordmark from "../../../img/wordmark.png";
import { SIGN_OUT_LINK_LABEL, WORDMARK_IMAGE_ALT } from "./constants";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const router = useRouter();

  const onSignOut = async () => {
    await signOutUser();
    router.push(PAGE.SIGN_IN);
  };

  return (
    <BootstrapNavbar className="navbar">
      <Container>
        <BootstrapNavbar.Brand className="brand" href={PAGE.DASHBOARD}>
          <Image
            alt={WORDMARK_IMAGE_ALT}
            className="logo"
            height={25}
            placeholder="blur"
            quality={100}
            src={CompanyWordmark}
          />
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle />
        <BootstrapNavbar.Collapse className="collapse">
          <BootstrapNavbar.Text>
            <Link
              className="sign-out-link"
              href={PAGE.SIGN_IN}
              onClick={onSignOut}
            >
              {SIGN_OUT_LINK_LABEL}
            </Link>
          </BootstrapNavbar.Text>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
