import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";

// ! EventName, EventStartDate, EventEndDate, EventQuota, EventLocation(Latitude, Longtitude), EventStatus, EventCategory

function AddEvent(props) {

    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className="w-50 m-lg-5">
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} md="8" controlId="eventName">
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Event | 25"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="eventStartdate">
                        <Form.Label>Event Start Date</Form.Label>
                        <Form.Control type="date" name='eventStartDatePicker'/>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="eventEndDate">
                        <Form.Label>Event End Date</Form.Label>
                        <Form.Control type="date" name='eventEndDatePicker'/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Group as={Col} md="4" controlId="latitude">
                        <Form.Control required type="text" placeholder="Latitude" name='latitude'/>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="longtitude">
                        <Form.Control required type="text" placeholder="Longtitude" name='longtitude'/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="eventQuota">
                        <Form.Control type="number" value={5} name="eventQuota"/>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="eventCategory">
                        <Form.Control as="select" name="eventCategory">
                            <option value="1">GAME</option>
                            <option value="2">CODE</option>
                            <option value="3">MUSIC</option>
                            <option value="4">RACE</option>
                            <option value="5">EDUCATION</option>
                            <option value="6">BUSINESS</option>
                            <option value="7">OTHER</option>
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Form.Group as={Col} md="8" controlId="submitButton">
                    <Button type="submit">Submit</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default AddEvent;