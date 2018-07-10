import React from 'react'
import { Form, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
// Todo Change path to charge omise  & use Prop instead of cData

export class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submitPay = this.submitPay.bind(this);

    }

    handleChange = event => {
        this.setState({ name: event.target.value });
    }

    componentDidMount() {
        const { OmiseCard } = window;
        OmiseCard.configure({
            publicKey: 'pkey_test_5cbk0k6swgh9kw4fn6i',
            amount: this.props.coursePrice //IN Satang-THB 0.01 ฿
        });

        OmiseCard.configureButton('#checkout-button', {
            frameLabel: 'Tutor Online',
            submitLabel: 'Pay',
            frameDescription: 'Enroll ' + this.props.courseName,
            image: 'http://icons.iconarchive.com/icons/martz90/circle/96/books-icon.png'
        });

        OmiseCard.attach();
    }

    render() {
        return (
            <div style={{ textAlign: 'center', paddingTop: '15px' }}>
                <Form action="http://localhost:8888/payment/creditcard" method="POST">
                    <Input type="submit" value={"Pay To Enroll for " + (this.props.coursePrice / 100).toLocaleString('en') + " ฿"} id="checkout-button" className="btn btn-primary" onChange={this.handleChange} style={{ paddingTop: '10px', paddingBottom: '10px' }} />
                    <Input name='amount' id='amount' value={this.props.coursePrice} style={{ display: 'none' }} />
                    <Input name='courseid' id='courseID' value={this.props.courseID} style={{ display: 'none' }} />
                    <Input name='loginToken' id='loginToken' value={cookies.get("loginToken")} style={{ display: 'none' }} />
                </Form>
            </div>
        );
    }

    submitPay() {

    }
}


Payment.propType = {
    courseID: PropTypes.string.isRequired,
    courseName: PropTypes.string.isRequired,
    courseDesc: PropTypes.string.isRequired,
    coursePrice: PropTypes.number.isRequired
}



//Default Prop For Testing

Payment.defaultProps = {
    courseID: 'Error',
    courseName: 'Math for PAT1',
    courseDesc: '',
    coursePrice: 12344
};
