import React from 'react'
import './communityimpact.css'
import { Box, SimpleGrid, Image, Stack, Card, CardBody, Heading, Text, CardFooter  } from '@chakra-ui/react'
import Face10 from '../../../../assets/images/faces/face10.jpg'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';
import { Link, Select } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import CircleBG from '../../../../assets/images/dashboard/circle.svg'
import BreadCrumbs from '../../../Components/Widgets/BreadCrumbs/BreadCrumbs'
import Campaigns from '../../../../assets/images/Actions/1png.png'

const CommunityImpact = () => {
  return (
    <>
      <BreadCrumbs />
      <div className="row">
        <div className='col-md-12'>
          <div className='card css-cg5djk card-img-holder text-white'>
            <div className="card-body">
              <img src={CircleBG} className="card-img-absolute" alt="circle" />
              <h2 class="MuiTypography-root MuiTypography-h2 css-bt9g5a">Community Impact</h2>
              <p className='mnBannerHeading'> 
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem 
                Ipsum has been the industry's standard
              </p>
              <Link href='https://cisco.sharepoint.com/sites/CiscoCrisisResponse/' isExternal className={'sliderButton'}>
                Community Impact Sharepoint <ExternalLinkIcon mx='2px' />
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
        <SimpleGrid columns={3} spacing={10}>
            <Box bg='white' className='customCard'>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                >
                    <Image
                        src='https://media.bizj.us/view/img/10541465/kelly-petrich-cisco*320xx508-762-86-0.jpg'
                        alt='Caffe Latte'
                        width={'120px'}
                    />
                    <Stack>
                        <CardBody padding={'10px'} >
                            <Text py='2'>
                                <b> Kelly Petrich </b><br />
                                Director, Community Impact 
                            </Text>
                        </CardBody>
                    </Stack>
                </Card>                
            </Box>
        </SimpleGrid>

        <h3 className={'customHeadingH3'}> Pillar Team Members </h3>
        <SimpleGrid columns={3} spacing={10}>
            <Box bg='white' className='customCard'>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                >
                    <Image
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIts87FD5kZDh6BXVKpSBI60GiaT3uy1ycsyhgrHLHgKUHJncgq6KrZN3kmaOecxug1SE&usqp=CAU'
                        alt='Caffe Latte'
                        width={'80px'}
                    />
                    <Stack>
                        <CardBody padding={'10px'} >
                            <Text py='2'>
                                <b> Ajay Gopal </b><br />
                                PM
                            </Text>
                        </CardBody>
                    </Stack>
                </Card>                
            </Box>
            <Box bg='white' className='customCard'>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                >
                    <Image
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIts87FD5kZDh6BXVKpSBI60GiaT3uy1ycsyhgrHLHgKUHJncgq6KrZN3kmaOecxug1SE&usqp=CAU'
                        alt='Caffe Latte'
                        width={'80px'}
                    />
                    <Stack>
                        <CardBody padding={'10px'} >
                            <Text py='2'>
                                <b> Comms </b><br />
                                Comms
                            </Text>
                        </CardBody>
                    </Stack>
                </Card>                
            </Box>
            <Box bg='white' className='customCard'>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                >
                    <Image
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIts87FD5kZDh6BXVKpSBI60GiaT3uy1ycsyhgrHLHgKUHJncgq6KrZN3kmaOecxug1SE&usqp=CAU'
                        alt='Caffe Latte'
                        width={'80px'}
                    />
                    <Stack>
                        <CardBody padding={'10px'} >
                            <Text py='2'>
                                <b> Job Aboim </b>
                            </Text>
                        </CardBody>
                    </Stack>
                </Card>                
            </Box>
        </SimpleGrid>

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

    </>
  )
}

export default CommunityImpact

