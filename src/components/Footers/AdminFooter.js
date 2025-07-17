/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              href="https://www.creative-tim.com?ref=adr-admin-footer"
              rel="noopener noreferrer"
              target="_blank"
            >
              | ONCF
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink
                href="https://www.oncf-voyages.ma/"
                rel="Site Officiel"
                target="_blank"
              >
                Site officiel
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://play.google.com/store/apps/details?id=ma.oncf.oncfmobileapp&hl=fr"
                rel="Application mobile de l'ONCF"
                target="_blank"
              >
                App Mobile
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://www.oncf.ma/fr/"
                rel="About us"
                target="_blank"
              >
                About us
              </NavLink>
            </NavItem>

            
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
