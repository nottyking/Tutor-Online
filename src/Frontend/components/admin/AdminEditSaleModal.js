import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, ModalBody, Label, Input, Container, Collapse, Card, CardBody, FormFeedback, InputGroup, InputGroupText, InputGroupAddon, InputGroupButtonDropdown } from 'reactstrap'
import Cookies from 'universal-cookie';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const cookies = new Cookies()
const ipList = require('../../../Config/ipConfig')
const axios = require('axios')
const capsulation = require('../../capsulation/SendData');
var id; var exitfx; var exitandreloadfx;
var checkValid = { salePrice: true, salePercent: true, discount: true }
const DefaultDiscountField = { discount: 0.00, salePrice: 0.00, percent: 0.00, startDate: '2000-01-01', endDate: '2000-01-01' };

export class AdminEditSaleModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expireType: this.props.src.limitdurationtype,
            showThumbnail: this.props.src.thumbnail,
            showBanner: this.props.src.banner,
            redirect: '',
            discountField: DefaultDiscountField
        }
        this.saveToDatabase = this.saveToDatabase.bind(this);
        this.manageDiscountPrice = this.manageDiscountPrice.bind(this);
        this.managePercentSale = this.managePercentSale.bind(this);
        this.managePriceSale = this.managePriceSale.bind(this);
        this.endDateCheck = this.endDateCheck.bind(this);
        this.startDateCheck = this.startDateCheck.bind(this);
        id = this.props.src.courseid;
        exitfx = this.props.closeModal;
        exitandreloadfx = this.props.closeModalAndReload;
    }

    componentWillMount() {
        this.getDiscountField();
        console.log("src");
        console.log(this.props.src);
    }

    componentWillUpdate() {
        console.log(this.state.discountField)
    }

    async saveToDatabase() {
        //Waiting for send props to database
        const data = {
            courseid: this.props.src.courseid,
            coursediscountprice: isNaN(parseInt((document.getElementById('salePrice').value * 100).toFixed(0))) ? 0 : parseInt((document.getElementById('salePrice').value * 100).toFixed(0)),
            coursediscountcreatedate: document.getElementById('startdate').value,
            coursediscountexpireddate: document.getElementById('enddate').value,
        }

        //SEND ABOVE DATA TO DATABASE///////////////////////



        ////////////////////////////////////////////////////
        console.log(data)
        alert("[Course Discount Saved]\nCourse id: " + data.courseid + "\nSale price: " + ((data.coursediscountprice * 0.01).toFixed(2)) + " ฿\nStart Date: " + data.coursediscountcreatedate + "\nEnd Date: " + data.coursediscountexpireddate);
        exitandreloadfx();
        return true;
    }

    getDiscountField() {
        //Get salePrice & date from discount database
        if (this.props.src.coursediscountid != null) {
            const fullPrice = this.props.src.price * 0.01;
            var salePriceData = (this.props.src.coursediscountprice != null) ? (this.props.src.coursediscountprice * 0.01) : 0.00;
            var discountData = fullPrice - salePriceData;
            var percentData = discountData * 100 / fullPrice;
            var startDateData = (this.props.src.coursediscountcreatedate != null) ? this.props.src.coursediscountcreatedate.substring(0, 10) : moment().add(1, 'day').format('YYYY-MM-DD');
            var endDateData = (this.props.src.coursediscountexpireddate != null) ? this.props.src.coursediscountexpireddate.substring(0, 10) : moment().add(2, 'day').format('YYYY-MM-DD');

            this.setState({
                discountField: {
                    salePrice: salePriceData.toFixed(2),
                    discount: discountData.toFixed(2),
                    percent: percentData.toFixed(2),
                    startDate: startDateData,
                    endDate: endDateData
                }
            })
        } else {
            this.setState({
                discountField: {
                    salePrice: (this.props.src.price * 0.01).toFixed(2),
                    discount: 0.00,
                    percent: 0.00,
                    startDate: moment().add(1, 'day').format('YYYY-MM-DD'),
                    endDate: moment().add(2, 'day').format('YYYY-MM-DD')
                }
            })
        }

    }

    managePercentSale() {
        const fullPrice = this.props.src.price * 0.01;
        const percent = document.getElementById('salePercent').value;
        var salePrice = (100 - percent) * fullPrice * 0.01;

        if (percent >= 0 && percent <= 100 && salePrice >= 20) {
            var discount = fullPrice - salePrice;
            document.getElementById('discount').value = discount.toFixed(2);
            document.getElementById('salePrice').value = salePrice.toFixed(2);

            document.getElementById("salePercent").classList.remove('is-invalid');
            document.getElementById("salePercent").classList.add('is-valid');
            return checkValid.salePercent = true;

        } else {
            document.getElementById('discount').value = 'Exceed Original Price or Not valid';
            document.getElementById('salePrice').value = 'Exceed Original Price or Not valid';

            document.getElementById("salePercent").classList.remove('is-valid');
            document.getElementById("salePercent").classList.add('is-invalid');
            return checkValid.salePercent = false;
        }
    }

    managePriceSale() {
        const fullPrice = this.props.src.price * 0.01;
        const salePrice = document.getElementById('salePrice').value;

        if (fullPrice >= salePrice && (salePrice > 20 || salePrice == 0)) {
            var discount = fullPrice - salePrice;
            var percent = discount * 100 / fullPrice;
            document.getElementById('discount').value = discount.toFixed(2);
            document.getElementById('salePercent').value = percent.toFixed(2);

            document.getElementById("salePrice").classList.remove('is-invalid');
            document.getElementById("salePrice").classList.add('is-valid');
            return checkValid.salePrice = true;

        } else {
            document.getElementById('discount').value = 'Exceed Original Price or Not valid';
            document.getElementById('salePercent').value = 'Exceed 100% or Not valid';

            document.getElementById("salePrice").classList.remove('is-valid');
            document.getElementById("salePrice").classList.add('is-invalid');
            return checkValid.salePrice = false;
        }
    }

    manageDiscountPrice() {
        const fullPrice = this.props.src.price * 0.01;
        const discount = document.getElementById('discount').value;

        if ((discount <= (fullPrice - 20) && discount >= 0) || discount == fullPrice) {
            var salePrice = fullPrice - discount;
            var percent = discount * 100 / fullPrice;
            document.getElementById('salePrice').value = salePrice.toFixed(2);
            document.getElementById('salePercent').value = percent.toFixed(2);

            document.getElementById("discount").classList.remove('is-invalid');
            document.getElementById("discount").classList.add('is-valid');
            return checkValid.discount = true;

        } else {
            document.getElementById('salePrice').value = 'Exceed Original Price or Not valid';
            document.getElementById('salePercent').value = 'Exceed 100% or Not valid';

            document.getElementById("discount").classList.remove('is-valid');
            document.getElementById("discount").classList.add('is-invalid');
            return checkValid.discount = false;
        }

    }

    startDateCheck() {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var validStartDuration = parseInt((new Date(document.getElementById('startdate').value)) - today) / (24 * 3600 * 1000);
        if (validStartDuration >= 1) {
            document.getElementById("startdate").classList.remove('is-invalid');
            document.getElementById("startdate").classList.add('is-valid');
            return true;
        } else {
            document.getElementById("startdate").classList.remove('is-valid');
            document.getElementById("startdate").classList.add('is-invalid');
            return false;
        }
        return true;
    }

    endDateCheck() {
        var validDuration = parseInt((new Date(document.getElementById('enddate').value)) - (new Date(document.getElementById('startdate').value))) / (24 * 3600 * 1000);
        if (validDuration >= 1) {
            document.getElementById("enddate").classList.remove('is-invalid');
            document.getElementById("enddate").classList.add('is-valid');
            return true;
        } else {
            document.getElementById("enddate").classList.remove('is-valid');
            document.getElementById("enddate").classList.add('is-invalid');
            return false;
        }
    }

    checkAll = () => {
        return (this.endDateCheck() && this.startDateCheck() && checkValid.discount && checkValid.salePercent && checkValid.salePrice);
    }

    render() {
        return (
            <ModalBody >
                <Container fluid>
                    <h3>{this.props.src.coursename}</h3>
                    {' '}
                    <Form>
                        <hr></hr>
                        <FormGroup row>
                            <Label>Manage Price (Thai Baht)</Label>
                            <InputGroup>
                                <Button color='success' disabled style={{ minWidth: 140 }}>Original Price</Button>
                                <Input disabled
                                    defaultValue={(this.props.src.price * 0.01).toFixed(2)}
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup row>
                            <InputGroup>
                                <Button color='primary' disabled style={{ minWidth: 140 }}>Sale Price</Button>
                                <Input
                                    type='salePrice'
                                    id='salePrice'
                                    defaultValue={this.state.discountField.salePrice}
                                    onChange={this.managePriceSale}
                                    placeholder='Enter Sale price in Thai Baht' />
                                <FormFeedback>Sale price must be a number and not have all of symbol ex. ',' , '฿'{<br />}Sale price must be between 20 and Original price, or must be 0</FormFeedback>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup row>
                            <InputGroup>
                                <Button color='primary' disabled style={{ minWidth: 140 }}>Discount</Button>
                                <Input
                                    type='discount'
                                    id='discount'
                                    defaultValue={this.state.discountField.discount}
                                    onChange={this.manageDiscountPrice}
                                    placeholder='Enter Discount price in Thai Baht' />
                                <FormFeedback>Discount must be a number and not have all of symbol ex. ',' , '฿'{<br />}Discount does not exceed Original price, or must be 0{<br />}After get discount, Sale price must more than 20, or must be 0</FormFeedback>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup row>
                            <InputGroup>
                                <Button color='primary' disabled style={{ minWidth: 140 }}>Sale %</Button>
                                <Input
                                    type='salePercent'
                                    id='salePercent'
                                    defaultValue={this.state.discountField.percent}
                                    onChange={this.managePercentSale}
                                    placeholder='Enter % discount in Thai Baht' />
                                <FormFeedback>% must be a number and not have all of symbol ex. ',' , '฿'{<br />}% must be between 0-100{<br />}After get discount, Sale price must more than 20, or must be 0</FormFeedback>
                            </InputGroup>
                        </FormGroup>

                        <hr></hr>
                        <FormGroup row>
                            <Input plaintext> Discount Date</Input>
                            <Card>
                                <CardBody>
                                    Choose Start Discount Date<br />
                                    <Label>[fomat: mm/dd/yyyy]</Label>
                                    <Input
                                        type='date'
                                        id='startdate'
                                        onChange={this.startDateCheck}
                                        defaultValue={(this.state.discountField.startDate != null) ? this.state.discountField.startDate : moment().add(1, 'day').format('YYYY-MM-DD')}
                                    />
                                    <FormFeedback>must more than 1 days form now</FormFeedback>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    Choose End Discount Date<br />
                                    <Label>[fomat: mm/dd/yyyy]</Label>
                                    <Input
                                        type='date'
                                        id='enddate'
                                        onChange={this.endDateCheck}
                                        defaultValue={(this.state.discountField.endDate != null) ? this.state.discountField.endDate : moment().add(2, 'day').format('YYYY-MM-DD')}
                                    />
                                    <FormFeedback>must more than 1 days form start Discount Date</FormFeedback>
                                </CardBody>
                            </Card>
                        </FormGroup>
                    </Form>
                    <hr />
                    <Button color='primary' onClick={() => { if (this.checkAll()) { this.saveToDatabase() } }} style={{ float: 'right' }}>Save</Button>
                    <p style={{ float: 'right' }}> </p>
                    <Button color='secondary' onClick={this.props.closeModal} style={{ float: 'right' }}>Cancel</Button>
                </Container>

            </ModalBody>
        )
    }
}

AdminEditSaleModal.propTypes = {
    src: PropTypes.shape({
        courseid: PropTypes.string.isRequired,
        coursename: PropTypes.string.isRequired,
        instructor: PropTypes.number.isRequired,
        price: PropTypes.string.isRequired,
        banner: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        limitduration: PropTypes.string.isRequired,
        limitdurationtype: PropTypes.string.isRequired,
        createdate: PropTypes.string.isRequired,
        isavailable: PropTypes.string.isRequired
    }).isRequired
}