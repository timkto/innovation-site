import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import { RouterPath } from '../../enums/RouterPath';
import './topics-collection.scss';

const TopicsCollection: React.FC<any> = ({ topics }) => {
  const [showStepNames, setShowStepNames] = useState(true);

  const handleResize = () => {
    if (window.innerWidth < 992) setShowStepNames(false);
    else setShowStepNames(true);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
  });

  return (
    <React.Fragment>
      <Row xs={1} md={2} lg={4} className='g-4'>
        {topics.map((topic: any) => (
          <Col className='d-flex align-items-stretch'>
            <Card style={{ width: '18rem' }}>
              <Card.Img
                variant='top'
                src='https://d35y6yt0mxh4p7.cloudfront.net/dev/img/innovation_champion.jfif'
              />
              <Card.Body>
                <Card.Title className='hide-long-title'>{topic.title}</Card.Title>
                <Card.Subtitle className='pt-1 mb-2'>
                  <Badge bg='secondary' className='me-1' style={{ fontWeight: 'normal' }}>
                    {topic.author_details.name}
                  </Badge>
                  {/* <Badge bg='primary' className='me-1'>
                    {` ${getTopicCategoryById(topic.category).name} `}
                  </Badge>
                  <Badge bg='success' className='me-1'>
                    {` ${getTopicDepartmentById(topic.department).name} `}
                  </Badge> */}
                </Card.Subtitle>
                <Card.Text className='hide-long-text'>{topic.short_description}</Card.Text>
              </Card.Body>
              {/* <ListGroup className='list-group-flush'>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup> */}
              <Card.Footer>
                <Link className='rounded-0 card-btn btn btn-primary' to={`${RouterPath.Topic}${topic.id}`}>
                  Read More
                </Link>
                <Badge bg='secondary'>
                  {` ${topic.topics_users_likes_associations_aggregate.aggregate.count} `} likes
                </Badge>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default TopicsCollection;
