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
                    </Row>
                </Card.Header>
                {/*<Card.Img variant="top" src="https://avatars.githubusercontent.com/u/24881389?s=60&v=4"/>*/}
                <Card.Body>
                    <Card.Title style={{fontSize: "28px"}}>{props.eventName}</Card.Title>
                    {/*<Card.Subtitle style={{color: "gray"}}> Event Start Date - Event End Date</Card.Subtitle>*/}
                    {/*<Card.Text style={{color: "red"}}>*/}
                    {/*    Some quick example text to build on the card title and make up the bulk of*/}
                    {/*    the card's content.*/}
                    {/*</Card.Text>*/}
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
                    <Button className="align-self-center" variant="primary" size="lg" block>Event Details</Button>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default EventCard;