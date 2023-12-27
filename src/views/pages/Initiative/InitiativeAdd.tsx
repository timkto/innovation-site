import React, { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { AuthContext } from '../../components/Auth/AuthProvider';
import { IAuth } from '../../interfaces/IAuth';
import { TopicCategory } from '../../enums/TopicCategory';
import { TopicDepartment } from '../../enums/TopicDepartment';
import DiscardModal from '../../components/Popups/DiscardModal';
import SectionLoader from '../../components/ContentState/SectionLoader';
import ServerRequestError from '../../components/ContentState/ServerRequestError';
import { ErrorFallback } from '../../components/ContentState/ErrorFallback';
import CreateInitiative from '../../graphql/CreateInitiative';
import { RouterPath } from '../../enums/RouterPath';

const InitiativeAdd = () => {
  const auth: IAuth = useContext(AuthContext);
  const history = useHistory();
  const [showDiscard, setShowDiscard] = useState(false);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { createInitiative, createInitiativeLoading, createInitiativeError } = CreateInitiative();

  const handleAddFormSubmit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setLoading(true);
      const formValues = {
        key: form.elements.initiativeKey.value,
        title: form.elements.initiativeTitle.value,
        screen_name: form.elements.initiativeScreenName.value,
        description: form.elements.initiativeDescription.value,
        category: form.elements.initiativeCategory.value,
        department: form.elements.initiativeDepartment.value,
        link: form.elements.initiativeLink.value,
      };
      const userValues = {
        author_id: auth.user.id,
        author_name: auth.user.name,
        author_email: auth.user.email,
      };

      createInitiative({ variables: { ...formValues, ...userValues } })
        .then(_ => history.push(RouterPath.Reports))
        .catch(_ => {
          setLoading(false);
          setError(true);
        });
    }
    setValidated(true);
  };

  if (loading || createInitiativeLoading) return <SectionLoader height='500px' width='100%' />;

  if (error || createInitiativeError) {
    console.error(error, createInitiativeError);
    return <ServerRequestError height='500px' imgHeight='250px' width='100%' />;
  }

  return (
    <React.Fragment>
      {/* Page Form */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Container>
          <Row className='mt-4 max-width-960 mx-auto'>
            <Col>
              <Form
                id='AddInitiativeForm'
                className='mb-5 pb-2'
                noValidate
                validated={validated}
                onSubmit={handleAddFormSubmit}>
                <div style={{ fontFamily: 'FWDCircularWeb Medium', fontSize: '32px', margin: '20px auto' }}>
                  Create New Initiative
                </div>

                <Form.Group as={Row} className='mb-3' controlId='initiativeKey'>
                  <Form.Label column sm='2'>
                    Key
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control required placeholder='Enter key' />
                    <Form.Control.Feedback type='invalid'>
                      A key is required for creating a new idea or challenge.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className='mb-3' controlId='initiativeTitle'>
                  <Form.Label column sm='2'>
                    Title
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control required placeholder='Enter title' />
                    <Form.Control.Feedback type='invalid'>
                      A title is required for creating a new idea or challenge.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className='mb-3' controlId='initiativeScreenName'>
                  <Form.Label column sm='2'>
                    Screen Name
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control required placeholder='Enter screen name' />
                    <Form.Control.Feedback type='invalid'>
                      A screen name is required for creating a new idea or challenge.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className='mb-3' controlId='initiativeDescription'>
                  <Form.Label column sm='2'>
                    Description
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      required
                      as='textarea'
                      rows={4}
                      placeholder='Please take your time to explain your idea or challenge and share your thoughts in detail. Protip: The reader might not have any prior context on the topic, explain it in detail.'
                    />
                    <Form.Control.Feedback type='invalid'>
                      A description is required for creating a new idea or challenge.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className='mb-3' controlId='initiativeCategory'>
                  <Form.Label column sm='2'>
                    Category
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Select required defaultValue='Select a category'>
                      <option disabled>Select a category</option>
                      {Object.keys(TopicCategory).map(key => (
                        <option key={TopicCategory[key].id} value={TopicCategory[key].id}>
                          {TopicCategory[key].name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Text className='text-muted'>
                      {Object.keys(TopicCategory).map(key => (
                        <div key={TopicCategory[key].id}>
                          {TopicCategory[key].name}: {TopicCategory[key].description}
                        </div>
                      ))}
                    </Form.Text>
                    <Form.Control.Feedback type='invalid'>
                      You cannot create an idea or challenge without selecting a category.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className='mb-3' controlId='initiativeDepartment'>
                  <Form.Label column sm='2'>
                    Department
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Select required defaultValue='Select a department'>
                      <option disabled>Select a department</option>
                      {Object.keys(TopicDepartment).map(key => (
                        <option key={TopicDepartment[key].id} value={TopicDepartment[key].id}>
                          {TopicDepartment[key].name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                      Select the name of the concerned department for which this idea or challange is
                      actionable.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className='mb-3' controlId='initiativeLink'>
                  <Form.Label column sm='2'>
                    Link
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control placeholder='Enter a link (Optional)' />
                    <Form.Text className='text-muted'>
                      Any external links (website, presentation, spreadsheet) to point reader to more details.
                    </Form.Text>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </ErrorBoundary>

      {/* Bottom Action Bar */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Container fluid className='position-fixed button-action-bar'>
          <Row>
            <Col style={{ paddingTop: '10px', textAlign: 'center' }}>
              <Button className='btn-sm me-2' variant='primary' onClick={() => setShowDiscard(true)}>
                Discard
              </Button>
              <Button className='btn-sm me-2' type='submit' form='AddInitiativeForm' variant='primary'>
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      </ErrorBoundary>

      {/* Modals */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DiscardModal
          show={showDiscard}
          modalClickYes={() => {
            setShowDiscard(false);
            history.push(RouterPath.Topic);
          }}
          modalClickNo={() => setShowDiscard(false)}
        />
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default InitiativeAdd;
