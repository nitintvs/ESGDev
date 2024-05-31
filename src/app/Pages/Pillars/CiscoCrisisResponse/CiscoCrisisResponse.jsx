import React from 'react'
import './ciscocrisisresponse.css'
import Face10 from '../../../../assets/images/faces/face10.jpg'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';
import { Link, Select } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import CircleBG from '../../../../assets/images/dashboard/circle.svg'
import BreadCrumbs from '../../../Components/Widgets/BreadCrumbs/BreadCrumbs'
import Campaigns from '../../../../assets/images/Actions/1png.png'

const CiscoCrisisResponse = () => {
  return (
    <>
      <BreadCrumbs />
      <div className="row">
        <div className='col-md-12'>
          <div className='card css-cg5djk card-img-holder text-white'>
            <div className="card-body">
              <img src={CircleBG} className="card-img-absolute" alt="circle" />
              <h2 class="MuiTypography-root MuiTypography-h2 css-bt9g5a">Cisco Crisis Response</h2>
              <p className='mnBannerHeading'> 
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem 
                Ipsum has been the industry's standard
              </p>
              <Link href='https://cisco.sharepoint.com/sites/CiscoCrisisResponse/' isExternal className={'sliderButton'}>
                CCR SharePoint <ExternalLinkIcon mx='2px' />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <Form.Group className="row">  
            <div className="col-sm-12">
              <select className="form-control">
                <option>FY 21 Q1</option>
                <option>FY 21 Q2</option>
                <option>FY 21 Q3</option>
                <option>FY 21 Q4</option>
              </select>
            </div>
          </Form.Group>
        </div>
        <div className="col-md-4">
          <Form.Group className="row">  
            <div className="col-sm-12">
              <select className="form-control">
                <option>Countries</option>
                <option>America</option>
                <option>Italy</option>
                <option>Russia</option>
                <option>Britain</option>
              </select>
            </div>
          </Form.Group>
        </div>
        <div className="col-md-4">
          <Form.Group className="row">  
            <div className="col-sm-12">
              <select className="form-control">
                <option>States</option>
                <option>America</option>
                <option>Italy</option>
                <option>Russia</option>
                <option>Britain</option>
              </select>
            </div>
          </Form.Group>
        </div>
      </div>
      <h3 className={'customHeadingH3'}> Pillar Leader </h3>
      <div className='row mt-3'>
        <div className="col-md-6">
          <Card style={{ width: '18rem', padding:'10px' }} className='pr-0'>
            <div className='row'>
              <div className={'col-md-4 leftImageBox'}>
                <Card.Img variant="top" src={Face10} />
              </div>
              <div className={'col-md-8 rightTextBox'}>
                <Card.Body>
                  <Card.Title>Erin Connor</Card.Title>
                  <Card.Text>
                    Director, Crisis Response
                  </Card.Text>
                </Card.Body>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Container className='p-0'>
        <h3 className={'customHeadingH3'}> Pillar Team Members </h3>
        <Row>
          <Col md={3}>
            <Card>
              <Card.Body className='p-4'>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body className='p-4'>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body className='p-4'>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body className='p-4'>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className='row mt-4'>
          <div className='col-md-12'>
            <div className='card card-img-holder text-white'>
              <div className="card-body">
                <h4 class="card-title">Actions</h4>
                <div className='row mrgnlM'>
                  <div className='col-md-3'>
                    <Card className='rqBorder border1'>
                      <Card.Img variant="top" src={Campaigns} />
                      <Card.Body className='customPdng'>
                        <Card.Title className='customTitle'>Campaigns</Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className='col-md-3'>
                    <Card className='rqBorder border1 mb-3'>
                      <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22287%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20287%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18c8bf2290b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18c8bf2290b%22%3E%3Crect%20width%3D%22287%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.6875%22%20y%3D%2296.20000038146972%22%3E287x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
                      <Card.Body className='customPdng'>
                        <Card.Title className='customTitle'>Cash Grants</Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className='col-md-3'>
                    <Card className='rqBorder border1 mb-3'>
                      <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22287%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20287%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18c8bf2290b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18c8bf2290b%22%3E%3Crect%20width%3D%22287%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.6875%22%20y%3D%2296.20000038146972%22%3E287x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
                      <Card.Body className='customPdng'>
                        <Card.Title className='customTitle'>CCR Community Membership</Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className='col-md-3'>
                    <Card className='rqBorder border1 mb-3'>
                      <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22287%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20287%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18c8bf2290b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18c8bf2290b%22%3E%3Crect%20width%3D%22287%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.6875%22%20y%3D%2296.20000038146972%22%3E287x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
                      <Card.Body className='customPdng'>
                        <Card.Title className='customTitle'>Deployments</Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className='col-md-3'>
                    <Card className='rqBorder border1 mb-3'>
                      <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22287%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20287%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18c8bf2290b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18c8bf2290b%22%3E%3Crect%20width%3D%22287%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.6875%22%20y%3D%2296.20000038146972%22%3E287x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
                      <Card.Body className='customPdng'>
                        <Card.Title className='customTitle'>Disaster Grants</Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className='col-md-3'>
                    <Card className='rqBorder border1 mb-3'>
                      <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22287%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20287%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18c8bf2290b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18c8bf2290b%22%3E%3Crect%20width%3D%22287%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.6875%22%20y%3D%2296.20000038146972%22%3E287x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
                      <Card.Body className='customPdng'>
                        <Card.Title className='customTitle'>Incident Response</Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className='col-md-3'>
                    <Card className='rqBorder border1 mb-3'>
                      <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22287%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20287%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18c8bf2290b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18c8bf2290b%22%3E%3Crect%20width%3D%22287%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.6875%22%20y%3D%2296.20000038146972%22%3E287x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
                      <Card.Body className='customPdng'>
                        <Card.Title className='customTitle'>Product Grants</Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className='col-md-3'>
                    <Card className='rqBorder border1 mb-3'>
                      <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22287%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20287%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18c8bf2290b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18c8bf2290b%22%3E%3Crect%20width%3D%22287%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.6875%22%20y%3D%2296.20000038146972%22%3E287x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
                      <Card.Body className='customPdng'>
                        <Card.Title className='customTitle'>Solution Consulting</Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className='col-md-3'>
                    <Card className='rqBorder border1 mb-3'>
                      <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22287%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20287%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18c8bf2290b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18c8bf2290b%22%3E%3Crect%20width%3D%22287%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.6875%22%20y%3D%2296.20000038146972%22%3E287x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
                      <Card.Body className='customPdng'>
                        <Card.Title className='customTitle'>Strategic Partnerships</Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col-md-12'>
            <div className='card card-img-holder text-white mb-3'>
              <div className="card-body">
                <Tabs
                  defaultActiveKey="qbr"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="qbr" title="QBR">
                    Cisco is a global technology company known not only for its products and services but also for its commitment to social justice. The company has various initiatives that aim to address societal issues such as inequality, discrimination, and lack of access to education and opportunities. Cisco's social justice programs often focus on underrepresented communities, striving to create more inclusive environments both within the company and in the broader community. They invest in educational programs, offer mentorship opportunities, and partner with organizations dedicated to social justice. Through corporate philanthropy, employee engagement, and advocacy, Cisco aims to be a force for positive change and social justice in the tech industry and beyond.
                  </Tab>
                  <Tab eventKey="opsmetrics" title="Ops Metrics">
                    Will Update Soon
                  </Tab>
                  <Tab eventKey="impactmetrics" title="Impact Metrics">
                    Social Impact brings together the full power and innovation of Cisco’s technology, our teams, our resources, and our extensive ecosystem to address our biggest challenges and accelerate meaningful change for people, the planet, and society.
                  </Tab>
                  <Tab eventKey="boardmetrics" title="Board Metrics">
                    Isher test announcement at Deloitte Executive Greenhouse Labs UPDATE with Nikita
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </Container>

    </>
  )
}

export default CiscoCrisisResponse




