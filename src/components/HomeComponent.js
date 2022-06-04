import { Row, Col, Container } from 'reactstrap';
import MainContainer from './MainContainer'

const Home = () => {
    return (
        <Container fluid className='main-container'>
            <Row>
                <Col className='text-center'>
                    <MainContainer/>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
