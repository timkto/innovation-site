import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RouterPath } from '../../enums/RouterPath';
import Button from 'react-bootstrap/Button';
import Axios, { AxiosResponse, AxiosError } from 'axios';

interface RouteParams {
  key: string;
}

const Initiative = () => {
  const btnStyles = {
    backgroundColor: '#e87722',
    borderColor: '#e87722',
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%)',
  };

  const { key } = useParams<RouteParams>();
  const [pageContent, setPageContent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const getPageContent = async () => {
    try {
      // Make the GET request to the API
      const response: AxiosResponse = await Axios.get(`http://localhost:5000/data/${key}`);

      // Handle the API response data
      console.log('API Response:', response.data);

      setPageContent(response.data.payload);
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
        setError('Error fetching data');
      }
    }
  };

  useEffect(() => {
    getPageContent();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!pageContent) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div id='initiative'>
        <div className='block-container'>
          <div className='center-content initiative-container'>
            <div className='description'>
              <div className='header black' style={{ lineHeight: '110%', margin: 0 }}>
                {pageContent.title ? pageContent.title : pageContent.screen_name}
              </div>
              <div>{pageContent.description}</div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
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

export default Initiative;
