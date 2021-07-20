import React from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";

function EventCard(props) {


    return (
        <div>
            <Card className="bg-light" style={{width: '25rem', height: "25rem", padding: '4px'}}>
                {/*25o<3SZ*/}
                <Card.Header as="h5">
                    <Row>
                        <Col>
                            Category:
                        </Col>
                        <Col>
                            <strong> {props.eventCategory}</strong>
                        </Col>
                        <Col className="col-lg-3 ">
                            <Button className="btn-sm " variant="outline-danger">Delete</Button>
                        </Col>
                    </Row>
                </Card.Header>

                <Card.Body>

                    <Card.Title style={{fontSize: "28px"}}>{props.eventName}</Card.Title>
                    <Container>
                        <Row className="bottom-0 mt-5">
                            <Col>
                                <i>Event Start Date: </i>
                            </Col>
                            <Col>
                                <strong>{props.startDate}</strong>
                            </Col>
                        </Row>
                        <Row className="bottom-0 mt-3">
                            <Col>
                                <i>Event End Date: </i>
                            </Col>
                            <Col>
                                <strong>{props.endDate}</strong>
                            </Col>
                        </Row>
                        <Row className="bottom-0 mt-3">
                            <Col>
                                <i>Remaining Quota:</i>
                            </Col>
                            <Col>
                                <strong>{props.quota}</strong>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col>
                            <button type="button" className="btn btn-outline-primary btn-lg btn-block">Details</button>
                        </Col>

                        <Col className="col-lg-4">
                            <button type="button" className="btn btn-outline-success btn-lg btn-block">Register</button>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default EventCard;