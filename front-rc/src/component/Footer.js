import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col>
                    <p className="text-center text-white p-3 bg-primary">© 2021 Copyright</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
