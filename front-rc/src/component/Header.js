import React from 'react';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/actions/userAction';


const Header = () => {

    const selectUserLogin = useSelector(state => state.userLogin);

    const { userInfo } = selectUserLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="primary" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand className="text-white">Newlook</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">

                            {userInfo
                                ? <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {userInfo.name}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>

                                        <LinkContainer to="/profile">
                                            <Dropdown.Item>Profile</Dropdown.Item>
                                        </LinkContainer>

                                        <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>

                                : <LinkContainer to="/login">
                                    <Nav.Link className="text-white"><i className="fas fa-user"></i> Sign in</Nav.Link>
                                </LinkContainer>}
                        {userInfo && userInfo.isAdmin && (
                            <Dropdown>
                            <Dropdown.Toggle variant="success" id="admin-menu">Admin</Dropdown.Toggle>

                            <Dropdown.Menu>

                                <LinkContainer to="/admin/userslist">
                                    <Dropdown.Item>Users</Dropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/admin/productslist">
                                    <Dropdown.Item>Products</Dropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/admin/orderslist">
                                    <Dropdown.Item>Orders</Dropdown.Item>
                                </LinkContainer>

                            </Dropdown.Menu>
                        </Dropdown>
                        )}        

                            <LinkContainer to="/cart">
                                <Nav.Link className="text-white"><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
