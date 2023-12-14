import React from 'react';
import { Link } from 'react-router-dom';
import { RouterPath } from '../../enums/RouterPath';
import Button from 'react-bootstrap/Button';

const Springboard = () => {
  const btnStyles = {
    backgroundColor: '#e87722',
    borderColor: '#e87722',
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%)',
  };

  return (
    <div>
      <div id='springboard'>
        <div className='block-container'>
          <div className='center-content springboard-container'>
            <div className='springboard-left'>
              <div className='header black' style={{ lineHeight: '110%', margin: 0 }}>
                Springboard
              </div>
              <div>Ideation from within</div>
            </div>

            <div className='springboard-right'>
              <div>
                Our Springboard CEO Challenge provides a fertile ground where innovation from the ground up
                can flourish, bringing together talented, diverse FWD colleagues from various job functions to
                collaborate.
              </div>
              <div>
                The best ideas from our markets are put through a rapid-prototyping stage to build tangible
                demonstrations, validate with stakeholders and demonstrate proofs-of-concept.
              </div>
              <div>
                These ideas are then further validated and put into full production, resulting in new products
                and solutions.
              </div>
            </div>
          </div>

          <div>
            <br />
            <Link to={RouterPath.TopicAdd}>
              <Button style={btnStyles}>Submit your ideas here!</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Springboard;
