import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Container, Card, CardBody, CardText, CardTitle, Button, Table, Badge, CardSubtitle,Modal,ModalBody,ModalFooter,ModalHeader } from 'reactstrap'
import { Footer } from './Footer'
//yaimport {Rating} from 'react-rating';

/*
Used For Present each courses's information (price, instructor's name, syllabus, etc.)
prop : Cimg ( Course Banner) Cname Cid Cprice Cdescription Cs

*/

export class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        alreadyEnroll:false,
        alreadyReview:false,
        alreadyLogin:true,
        reviewModal:false,
        paymentModal:false
    };
    this.toggleReview = this.toggleReview.bind(this);
  }

  onClickReview = () =>{
      this.setState({alreadyReview:true});
      this.toggleReview();
  }
    
toggleReview(){
  this.setState({
    reviewModal:!this.state.reviewModal
  });
  }

  onClick = () =>{
    if(!this.state.alreadyEnroll){
      this.setState({alreadyEnroll:true});
      console.log('Enrolllll');
      }else{
        this.setState({alreadyEnroll:false});
        console.log('De Enrolllll');
      }
  }

onClick2 = () =>{
  if(!this.state.alreadyReview){
  this.setState({alreadyReview:true});
  console.log('Reviewwww');
  }else{
    this.setState({alreadyReview:false});
    console.log('De Reviewww');
  }
}

onClick3 = () =>{
  console.log('change Login state from '+ this.state.alreadyLogin + ' to ' + !this.state.alreadyLogin)
  this.setState({alreadyLogin : !this.state.alreadyLogin})
}

  render () {
    let Syllabus = this.props.src.map((item, i) => {
      return (
        <tr>
          <th scope='row'>
            {i + 1}
          </th>
          <td>
            {item.subCourseId}
          </td>
          <td>
            {item.subCourseName}
          </td>
          <td>
            <Badge href={this.state.alreadyEnroll? item.subCourseLink:''} color={this.state.alreadyEnroll?'primary':'danger'}>
              {this.state.alreadyEnroll? 'Learn':'Please Enroll To Watch'}
            </Badge>
          </td>
        </tr>
      );
    });

    var CourseReview
    if (this.props.courseReview > 4.9) {
      CourseReview = (
        <h1 style={{color: '#ffc107'}}><i className='fa fa-star'style={{fontSize:'2rem'}}/> <i className='fa fa-star'style={{fontSize:'3rem'}}/> <i className='fa fa-star'style={{fontSize:'5rem'}}/> <i className='fa fa-star'style={{fontSize:'3rem'}}/> <i className='fa fa-star'style={{fontSize:'2rem'}}/></h1>
      
      );
    }else if (this.props.courseReview > 3.9) {
      CourseReview = (
        <h1 style={{color: '#007bff'}}><i className='fa fa-star'style={{fontSize:'3rem'}}/> <i className='fa fa-star' style={{fontSize:'5rem'}}/> <i className='fa fa-star'style={{fontSize:'5rem'}}/> <i className='fa fa-star'style={{fontSize:'3rem'}}/></h1>
      );
    }else if (this.props.courseReview > 2.9) {
      CourseReview = (
        <h1 style={{color: '#007bff'}}><i className='fa fa-star' style={{fontSize:'3rem'}} /> <i className='fa fa-star' style={{fontSize:'5rem'}}/> <i className='fa fa-star' style={{fontSize:'3rem'}}/></h1>
      );
    }else if (this.props.courseReview > 1.9) {
      CourseReview = (
        <h1 style={{color: '#007bff'}}><i className='fa fa-star'style={{fontSize:'3rem'}}/> <i className='fa fa-star'style={{fontSize:'3rem'}}/></h1>
      );
    }else if (this.props.courseReview > 0.9) {
      CourseReview = (
        <h1 style={{color: '#007bff'}}><i className='fa fa-star'style={{fontSize:'3rem'}}/></h1>
      );
    }else {
      CourseReview = (
        <h1>This Course Doesn't have Review Yet</h1>
      );
    }
    // '
    var CourseReviewButton = (
      <Button color='primary' onClick={this.onClickReview}></Button>
    );
    var CourseReviewPresent;
    if(!this.state.alreadyEnroll||this.state.alreadyReview){
      CourseReviewPresent = CourseReview;
    }else{
      CourseReviewPresent = CourseReviewButton
    }
    return (
      <div className='App'>
        <Container fluid style={{backgroundColor: '#555'}}>
          <Row style={{ justifyContent: 'center',
 alignItems: 'center'}}>
            <img src={this.props.courseImage} width={700} alt='error' />
            <Col>
            
            <Card>
              <CardBody>
                <CardTitle>
                  {this.props.courseName}
                </CardTitle>
                <CardSubtitle>
                  Instructor :
                  {this.props.courseInstructor}
                </CardSubtitle>
                <CardText>
                
                  <br />
                  {this.props.courseDesc}
                </CardText>
                {!this.state.alreadyEnroll ? <Button color='primary' href='/Payment'>
                  Enroll This Course
                </Button> : ''}<br/><br/>
                <Button color='danger' onClick={this.onClick}>
                  Admin Enroll
                </Button>
                <Button color='warning' onClick={this.onClick3}>
                Admin Login
              </Button>
              </CardBody>
            </Card>
            <Table borderless style={{marginBottom: 10,color: '#FFF'}}>
              <thead>
                <tr>
                  <th>
                    #
                  </th>
                  <th>
                    SubCourseID
                  </th>
                  <th>
                    SubCourseName
                  </th>
                  <th>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Syllabus}
              </tbody>
            </Table>
            </Col>
            <Col>
            <Card>
              <CardBody>
                <CardTitle>
                  Student Review
                </CardTitle>
                {CourseReviewPresent}
                <br/>
                alreadyEnroll = {this.state.alreadyEnroll+''}
                <br/>
                alreadyReview = {this.state.alreadyReview+''}
                <br/>
                alreadyLogin = {this.state.alreadyLogin+''}
              </CardBody>
            </Card>
            <br/>
            
            </Col>
          </Row>
        </Container>
        <Footer/>


        <Modal isOpen={this.state.reviewModal} toggle={this.toggleReview}>
          <ModalBody>
            Thank You for your review.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleReview}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

Course.propTypes = {
  courseName: PropTypes.string.isRequired,
  courseImage: PropTypes.string.isRequired,
  courseLink: PropTypes.string.isRequired,
  courseDesc: PropTypes.string.isRequired,
  courseInstructor: PropTypes.string.isRequired,
  courseReview: PropTypes.number,
  subCourses: PropTypes.arrayOf(PropTypes.shape({
    subCourseName: PropTypes.string.isRequired,
    subCourseId: PropTypes.string.isRequired,
    subCourseLink: PropTypes.string.isRequired
  })).isRequired
}

Course.defaultProps = {
  courseName: 'Math for PAT1',
  courseImage: 'https://dummyimage.com/600x400/ffffff/000000&text=Default IMG',
  courseLink: '',
  courseDesc: 'Very Good Course for Everybody taught by Smartest person in the smartest factory of the best city of the best country',
  courseInstructor: 'John Doe',
  courseReview: 5,
  src: [
    {subCourseName: 'Math101',subCourseId: 'M101',subCourseLink: '/learning'},
    {subCourseName: 'Math102',subCourseId: 'M102',subCourseLink: '/learning'},
    {subCourseName: 'Math103',subCourseId: 'M103',subCourseLink: '/learning'}
  ]
}
