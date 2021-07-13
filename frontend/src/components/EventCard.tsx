import React from "react";
import {Badge, Button, Card, Col, Container, ListGroup, ListGroupItem, ProgressBar, Row} from "react-bootstrap";

function EventCard() {
    return (
        <div>
            <Card className="bg-secondary" style={{width: '26rem', padding: '4px'}}>
                <Card.Header as="h5">
                    Category: <Badge pill variant="danger"><strong> coding</strong></Badge>
                </Card.Header>
                <Card.Img variant="top" src="https://avatars.githubusercontent.com/u/24881389?s=60&v=4"/>
                <Card.Body>
                    <Card.Title style={{fontSize: "32px"}}>Awesome Event Name</Card.Title>
                    {/*<Card.Subtitle style={{color: "gray"}}> Event Start Date - Event End Date</Card.Subtitle>*/}
                    {/*<Card.Text style={{color: "red"}}>*/}
                    {/*    Some quick example text to build on the card title and make up the bulk of*/}
                    {/*    the card's content.*/}
                    {/*</Card.Text>*/}
                    <ListGroup className="list-group-flush">
                        <ListGroupItem className="bg-secondary" style={{fontSize: "16px"}}>
                            <i>Event Start Date: </i>
                            <strong>2000-01-01</strong>
                        </ListGroupItem>
                        <ListGroupItem className="bg-secondary" style={{fontSize: "16px"}}>
                            <i>Event End Date: </i>
                            <strong>2000-01-02</strong>
                        </ListGroupItem>
                        <ListGroupItem className="bg-secondary" style={{fontSize: "16px"}}>
                            <Container>
                                <Row>
                                    <Col xs={6}>
                                        <i>Remaining Quota: </i>
                                    </Col>
                                    <Col>
                                        <ProgressBar variant='info' striped now={25}/>
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroupItem>
                    </ListGroup>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" size="lg" block>Event Details</Button>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default EventCard;