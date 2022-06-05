import { Row, Col, Container, Card, CardBody } from "reactstrap"

const About = () => {
    return (
        <Container
            fluid
            className='main-container'
            style={{
                overflow: "hidden",
                height: '100vh',
                backgroundColor: "#e0e0e0",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='72' viewBox='0 0 36 72'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23a29fa5' fill-opacity='0.4'%3E%3Cpath d='M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
        >
            <Row>
                <Col className='d-flex align-items-center justify-content-center'>
                    <Card style={{ marginTop: 'calc(20vh - 50px)'}}>
                        <CardBody
                            className='bg-light d-flex justify-content-center align-items-center shadow-lg'
                            style={{ height: "12rem", width: "24rem" }}
                        >
                            Chris Dickson &copy; {new Date().getFullYear()}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default About
