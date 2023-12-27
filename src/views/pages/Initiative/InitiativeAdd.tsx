import React, { useState, useContext, useRef } from 'react';
import Axios, { AxiosResponse, AxiosError } from 'axios';
import { Editor as TinyMCEEditor } from 'tinymce';
import { Editor } from '@tinymce/tinymce-react';
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
import './initiative-details.scss';

const InitiativeAdd = () => {
  const auth: IAuth = useContext(AuthContext);
  const history = useHistory();
  const [showDiscard, setShowDiscard] = useState(false);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { createInitiative, createInitiativeLoading, createInitiativeError } = CreateInitiative();
  const [editorContent, setEditorContent] = useState('');
  const editorRef = useRef<TinyMCEEditor | null>(null);

  async function createPageContent(reqData: object): Promise<void> {
    try {
      // Make the GET request to the API
      const response: AxiosResponse = await Axios.post('http://localhost:5000/data', reqData);

      // Handle the API response data
      console.log('API Response:', response.data);
    } catch (error) {
      // Handle errors
      if (Axios.isAxiosError(error)) {
        // Axios-specific error handling
        const axiosError: AxiosError = error;
        console.error('Axios Error:', axiosError.message);
        console.error('Status Code:', axiosError.response?.status);
        console.error('Response Data:', axiosError.response?.data);
      } else {
        // Other error handling
        console.error('Error making POST request:', error.message);
      }
    }
  }

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

      if (editorRef.current) {
        const currentContent = editorRef.current.getContent();

        const data = {
          key: form.elements.initiativeKey.value,
          payload: {
            title: form.elements.initiativeTitle.value,
            screen_name: form.elements.initiativeScreenName.value,
            description: form.elements.initiativeDescription.value,
            category: form.elements.initiativeCategory.value,
            department: form.elements.initiativeDepartment.value,
            link: form.elements.initiativeLink.value,
            content: currentContent,
          },
        };

        createPageContent(data);
      }
    }
    setValidated(true);
  };

  if (loading || createInitiativeLoading) return <SectionLoader height='500px' width='100%' />;

  if (error || createInitiativeError) {
    console.error(error, createInitiativeError);
    return <ServerRequestError height='500px' imgHeight='250px' width='100%' />;
  }

  const advtemplate_templates = [
    {
      title: 'FWD',
      items: [
        {
          title: 'Group Innovation',
          content:
            '<div id="head-of-innovation" class="bg-orange"><div class="block-container"><div class="center-content hoi-container"><div class="hoi-image"><img src="https://d35y6yt0mxh4p7.cloudfront.net/dev/img/murtaza.jfif" alt="Murtaza Kanchwala"></div><div class="hoi-content normal-text white"><div>"At the heart of Group Innovation is a spirit of collaboration. We have already begun to change the way that people feel about insurance and we want to embed innovation so strongly into our DNA that we can always provide products, services and solutions that are next-in-class.</div><div>We believe that great ideas can come from anywhere –from the CEO all the way to fresh graduates and are constantly on the lookout to source, refine and build these ideas into ways that give the customer a better experience.</div><div>We are committed to empower and drive innovation within our community and nurture our employees to become disruptors. We work with everyone to come up with new prototypes and constantly improving our way of work”,</div><br><br><div style="font-family: FWDCircularWeb Book Italic; font-size: 20px; margin:0;">Murtaza Kanchwala, Group Head of Innovation</div></div></div></div></div>',
        },
      ],
    },
    {
      title: 'Quick replies',
      items: [
        {
          title: 'Message received',
          content:
            '<p dir="ltr">Hey {{Customer.FirstName}}!</p>\n<p dir="ltr">Just a quick note to say we&rsquo;ve received your message, and will get back to you within 48 hours.</p>\n<p dir="ltr">For reference, your ticket number is: {{Ticket.Number}}</p>\n<p dir="ltr">Should you have any questions in the meantime, just reply to this email and it will be attached to this ticket.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Regards,</p>\n<p dir="ltr">{{Agent.FirstName}}</p>',
        },
        {
          title: 'Thanks for the feedback',
          content:
            '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p dir="ltr">We appreciate you taking the time to provide feedback on {{Product.Name}}.</p>\n<p dir="ltr">It sounds like it wasn&rsquo;t able to fully meet your expectations, for which we apologize. Rest assured our team looks at each piece of feedback and uses it to decide what to focus on next with {{Product.Name}}.</p>\n<p dir="ltr"><strong>&nbsp;</strong></p>\n<p dir="ltr">All the best, and let us know if there&rsquo;s anything else we can do to help.</p>\n<p dir="ltr">-{{Agent.FirstName}}</p>',
        },
        {
          title: 'Still working on case',
          content:
            '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p dir="ltr">Just a quick note to let you know we&rsquo;re still working on your case. It&rsquo;s taking a bit longer than we hoped, but we&rsquo;re aiming to get you an answer in the next 48 hours.</p>\n<p dir="ltr">Stay tuned,</p>\n<p dir="ltr">{{Agent.FirstName}}</p>',
        },
      ],
    },
    {
      title: 'Closing tickets',
      items: [
        {
          title: 'Closing ticket',
          content:
            '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p dir="ltr">We haven&rsquo;t heard back from you in over a week, so we have gone ahead and closed your ticket number {{Ticket.Number}}.</p>\n<p dir="ltr">If you&rsquo;re still running into issues, not to worry, just reply to this email and we will re-open your ticket.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">All the best,</p>\n<p dir="ltr">{{Agent.FirstName}}</p>',
        },
        {
          title: 'Post-call survey',
          content:
            '<p dir="ltr">Hey {{Customer.FirstName}}!</p>\n<p dir="ltr">&nbsp;</p>\n<p dir="ltr">How did we do?</p>\n<p dir="ltr">If you have a few moments, we&rsquo;d love you to fill out our post-support survey: {{Survey.Link}}</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Thanks in advance!<br>{{Company.Name}} Customer Support</p>',
        },
      ],
    },
    {
      title: 'Product support',
      items: [
        {
          title: 'How to find model number',
          content:
            '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">My name is {{Agent.FirstName}} and I will be glad to assist you today.</p>\n<p dir="ltr">To troubleshoot your issue, we first need your model number, which can be found on the underside of your product beneath the safety warning label.&nbsp;</p>\n<p dir="ltr">It should look something like the following: XX.XXXXX.X</p>\n<p dir="ltr">Once you send it over, I will advise on next steps.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Thanks!</p>\n<p dir="ltr">{{Agent.FirstName}}</p>',
        },
        {
          title: 'Support escalation',
          content:
            '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p dir="ltr">We have escalated your ticket {{Ticket.Number}} to second-level support.</p>\n<p dir="ltr">You should hear back from the new agent on your case, {{NewAgent.FirstName}}, shortly.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Thanks,</p>\n<p dir="ltr">{{Company.Name}} Customer Support</p>',
        },
      ],
    },
  ];

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
                <div
                  style={{
                    fontFamily: 'FWDCircularWeb Medium',
                    fontSize: '32px',
                    margin: '20px auto',
                  }}>
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

              <Editor
                apiKey='auba7928edd1cs8q18o0s0s9vy9oyg8l8ckedsk30bfd88md'
                initialValue='<p>This is the initial content of the editor</p>'
                init={{
                  plugins: 'link image code lists advlist advtemplate',
                  toolbar:
                    'undo redo | bold italic | alignleft aligncenter alignright | inserttemplate addtemplate | code',
                  contextmenu: 'advtemplate',
                  advtemplate_templates,
                }}
                onInit={(evt, editor) => (editorRef.current = editor)}
              />
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
