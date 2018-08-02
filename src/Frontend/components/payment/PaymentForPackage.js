import React from 'react'
import { Form, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
// Todo Change path to charge omise  & use Prop instead of cData

export class PaymentForPackage extends React.Component {
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
            amount: this.props.packagePrice //IN Satang-THB 0.01 ฿
        });

        OmiseCard.configureButton('#checkout-button', {
            frameLabel: 'Tutor Online',
            submitLabel: 'Pay',
            frameDescription: 'Enroll ' + this.props.packageName,
            image: 'http://icons.iconarchive.com/icons/martz90/circle/96/books-icon.png'
        });

        OmiseCard.attach();
    }

    render() {
        return (
            <div style={{ textAlign: 'center', paddingTop: '15px' }}>
                <Form action="http://localhost:8888/payment/package/creditcard" method="POST">
                    <Input type="submit" value={"Pay To Enroll for " + (this.props.packagePrice / 100).toLocaleString('en') + " ฿"} id="checkout-button" className="btn btn-primary" onChange={this.handleChange} style={{ paddingTop: '10px', paddingBottom: '10px' }} />
                    <Input name='amount' id='amount' value={this.props.packagePrice} style={{ display: 'none' }} />
                    <Input name='packageid' id='packageid' value={this.props.packageID} style={{ display: 'none' }} />
                    <Input name='courseid' id='courseid' value={this.props.courseID} style={{ display: 'none' }} />
                    <Input name='loginToken' id='loginToken' value={cookies.get("loginToken")} style={{ display: 'none' }} />
                </Form>
            </div>
        );
    }

    submitPay() {

    }
}


PaymentForPackage.propType = {
    packageID: PropTypes.string.isRequired,
    packageName: PropTypes.string.isRequired,
    packagePrice: PropTypes.number.isRequired
}
