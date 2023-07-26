import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ButtonLink from './ButtonLink';

/** Bootstrap Navbar Brand Link that functions as NextJs Link */
function BrandLink({ label, href }: { label: string; href: string }) {
    return (
        <>
            {/* @ts-ignore */}
            <Navbar.Brand as={Link} href={href}>
                {label}
            </Navbar.Brand>
        </>
    );
}

/** Bootstrap Navbar Link that functions as NextJs Link */
function NavLink({ label, href }: { label: string; href: string }) {
    return (
        <>
            {/* @ts-ignore */}
            <Nav.Link as={Link} href={href} variant="primary">
                {label}
            </Nav.Link>
        </>
    );
}

/** Page navigation */
export default function PageNav() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <BrandLink label="CL311" href="/" />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink label="GuestBook" href="/guestbook" />
                        <NavLink label="Report" href="/report" />
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <ButtonLink variant="success" href="/guestbook/create" style={{marginRight: '1rem'}}>
                            Add GuestBook
                        </ButtonLink>
                        <ButtonLink variant="success" href="/report/create">
                            Add Report
                        </ButtonLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
