import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className='didc-container'>
      <div className='block-container'>
        <div className='center-content'>
          <div style={{ marginBottom: 35 }}>
            <div className='header black' style={{ lineHeight: '100%', margin: 0 }}>
              Innovation
            </div>
            <div>@ FWD</div>
          </div>

          <div className='iaf-body black' style={{ textAlign: 'justify' }}>
            <div>
              At FWD we’re committed to building an innovative culture designed to cultivate creativity and
              collaboration. We believe that good ideas can come from anyone, anytime and have built the
              avenues to promote innovation from both a top down as well as bottom up perspective.
            </div>
            <div>
              Our Springboard CEO Challenge provides a fertile ground where innovation from the ground up can
              flourish, bringing together talented, diverse FWD colleagues from various job functions to
              collaborate.
            </div>
            <div>
              The best ideas from our markets are put through a rapid-prototyping stage to build tangible
              demonstrations, validate with stakeholders and demonstrate proofs-of-concept.
              <br />
              These ideas are then further validated and put into full production, resulting in new products
              and solutions.
            </div>
            <div>
              Leading the drive for innovation in each market are our Innovation Champions, a community of
              passionate individuals and visionary thinkers, always looking to challenge the status quo.
              <br />
              Each community of Champions is unique, recognizing the need for local cultural norms in driving
              innovation.
            </div>
          </div>
        </div>
      </div>

      <div id='head-of-innovation' className='bg-orange'>
        <div className='block-container'>
          <div className='center-content hoi-container'>
            <div className='hoi-image'>
              <img src='https://d35y6yt0mxh4p7.cloudfront.net/dev/img/murtaza.jfif' alt='Murtaza Kanchwala' />
            </div>

            <div className='hoi-content normal-text white'>
              <div>
                "At the heart of Group Innovation is a spirit of collaboration. We have already begun to
                change the way that people feel about insurance and we want to embed innovation so strongly
                into our DNA that we can always provide products, services and solutions that are
                next-in-class.
              </div>
              <div>
                We believe that great ideas can come from anywhere –from the CEO all the way to fresh
                graduates and are constantly on the lookout to source, refine and build these ideas into ways
                that give the customer a better experience.
              </div>
              <div>
                We are committed to empowering and driving innovation within our community and nurturing our
                employees to become disruptors. We work with everyone to come up with new prototypes and
                constantly improving our way of work”,
              </div>
              <br />
              <br />
              <div style={{ fontFamily: 'FWDCircularWeb Book Italic', fontSize: 20, margin: 0 }}>
                Murtaza Kanchwala, Group Head of Innovation
              </div>
            </div>
          </div>
        </div>
      </div>

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
        </div>
      </div>

      <div className='block-container'>
        <div className='bg-orange' style={{ borderRadius: '360px 0px', marginBottom: 50 }}>
          <div className='center-content'>
            <div className='innovation-champions'>
              <div className='ic-image'>
                <div>
                  <img
                    src='https://d35y6yt0mxh4p7.cloudfront.net/dev/img/innovation_champion.jfif'
                    alt='Innovation Champions'
                  />
                </div>
              </div>

              <div className='ic-context'>
                <div className='header white'>Innovation Champions</div>
                <div className='header2 white'>Leading innovation locally</div>
                <div className='black line-spacing'>
                  Leading the drive for innovation in each market are our Innovation Champions, a community of
                  passionate individuals and visionary thinkers, always looking to challenge the status quo.
                </div>
                <div className='black line-spacing'>
                  Each community of Champions is unique, recognizing the need for local cultural norms in
                  driving innovation.
                </div>
              </div>
            </div>

            <div className='startup-studio'>
              <div className='ss-context'>
                <div className='header white'>Startup Studio</div>
                <div className='header2 white'>Collaboration with others</div>
                <div className='black line-spacing'>
                  We also work closely with the entrepreneurial ecosystem, collaborating with start-ups at the
                  leading edge of innovation.
                </div>
                <div className='black line-spacing'>
                  Through the FWD Startup Studio, we have mentored over 100 early-stage start-ups and have
                  begun working with others to incorporate new technologies, products and ways of working in
                  FWD.
                </div>
                <div className='black line-spacing'>
                  We are inviting the best start-ups globally to come and partner with us to change the way
                  that people feel about insurance.{' '}
                </div>
                <div className='black line-spacing'>
                  TIM Ventures - our venture capital fund – was set up in 2022 and has invested in 14
                  high-potential start-ups across the insurtech and takafultech space to build on our promise
                  to look forward as a next-in-class insurer.
                </div>
                <div className='ss-findoutmore'>
                  <a href='https://fwdstartupstudio.com/'>Find Out More</a>
                </div>
              </div>

              <div className='ss-image'>
                <div>
                  <img
                    src='https://d35y6yt0mxh4p7.cloudfront.net/dev/img/startup_studio.jfif'
                    alt='Startup Studio'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
