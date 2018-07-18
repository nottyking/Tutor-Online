import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, ModalBody, Label, Input, Container, Collapse, Card, CardBody, FormFeedback, InputGroup,InputGroupText, InputGroupAddon, InputGroupButtonDropdown } from 'reactstrap'
import Cookies from 'universal-cookie'
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
const DefaultDiscountField = { discount: 0, salePrice: 0, percent: 0, startDate: '2000-01-01', endDate: '2000-01-01' };

export class AdminEditSaleModal extends React.Component {
    constructor(props) {
        super(props)
        const html = this.props.src.description;
        //console.log(html);
        const contentBlock = htmlToDraft(html);
        //console.log(contentBlock);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        //console.log(contentState);
        const editorState = EditorState.createWithContent(contentState);
        //console.log(editorState);
        this.state = {
            expireType: this.props.src.limitdurationtype,
            showThumbnail: this.props.src.thumbnail,
            showBanner: this.props.src.banner,
            redirect: '',
            editorState: editorState,
            contentState: contentState,
            contentBlock: contentBlock,
            html: html,
            discountField: DefaultDiscountField
        }
        this.toggletype = this.toggletype.bind(this);
        this.saveToDatabase = this.saveToDatabase.bind(this);
        this.manageDiscountPrice = this.manageDiscountPrice.bind(this);
        this.managePercentSale = this.managePercentSale.bind(this);
        this.managePriceSale = this.managePriceSale.bind(this);
        id = this.props.src.courseid;
        exitfx = this.props.closeModal;
        exitandreloadfx = this.props.closeModalAndReload;
    }

    componentWillMount() {
        this.getDiscountField();
    }

    componentWillUpdate() {
        console.log(this.state.discountField)
    }

    async saveToDatabase() {
        //Waiting for send props to database
    }

    getDiscountField() {
        //Get salePrice & date from discount database
        if (false /*have salePrice value*/) {
            this.setState({
                discountField: {
                    salePrice: 'sale Price from database',
                    discount: (this.props.src.price * 0.01) - ('sale Price from database'),
                    percent: 1 - (('sale Price from database') * 100 / (this.props.src.price * 0.01)),
                    startDate: 'Start Date from database',
                    endDate: 'End Date from database'
                }
            })
        } else {
            this.setState({
                discountField: {
                    salePrice: (this.props.src.price * 0.01),
                    discount: 0,
                    percent: 0,
                    startDate: new Date(),
                    endDate: new Date()
                }
            })
        }

    }

    toggletype = event => {
        console.log(document.getElementById('limitdurationtype').value);
        this.setState({
            expireType: document.getElementById('limitdurationtype').value
        });
    }

    managePercentSale() {

    }

    managePriceSale() {
        const fullPrice = this.props.src.price * 0.01;
        const salePrice = document.getElementById('salePrice').value;

        if (fullPrice >= salePrice && (salePrice > 20 || salePrice == 0)) {
            var discount = fullPrice - salePrice;
            var percent = discount * 100 / fullPrice;
            document.getElementById('discount').value = discount;
            document.getElementById('salePercent').value = percent.toFixed(2);

            document.getElementById("salePrice").classList.remove('is-invalid');
            document.getElementById("salePrice").classList.add('is-valid');
            return true;

        } else {
            document.getElementById('discount').value = 'Exceed Original Price or Not valid';
            document.getElementById('salePercent').value = 'Exceed 100% or Not valid';

            document.getElementById("salePrice").classList.remove('is-valid');
            document.getElementById("salePrice").classList.add('is-invalid');
            return false;
        }
    }

    manageDiscountPrice() {
        
    }

    limitdurationCheck() {
        if (document.getElementById('limitdurationtype').value === '1') {
            if (!isNaN(document.getElementById('limitduration').value) && (document.getElementById('limitduration').value >= 7)) {
                document.getElementById("limitduration").classList.remove('is-invalid');
                document.getElementById("limitduration").classList.add('is-valid');
                //console.log('price true');
                return true;
            }
            //console.log('price false');
            document.getElementById("limitduration").classList.remove('is-valid');
            document.getElementById("limitduration").classList.add('is-invalid');
            return false;
        }
        return true;
    }
    expireDateCheck() {
        if (document.getElementById('limitdurationtype').value === '2') {
            //console.log('check expire');
            var today = new Date();
            var temp;
            today.setHours(0, 0, 0, 0);
            temp = parseInt((new Date(document.getElementById('expiredate').value)) - today) / (24 * 3600 * 1000);
            //console.log(temp >= 7);
            if (temp >= 7) {
                document.getElementById("expiredate").classList.remove('is-invalid');
                document.getElementById("expiredate").classList.add('is-valid');
                return true;
            } else {
                document.getElementById("expiredate").classList.remove('is-valid');
                document.getElementById("expiredate").classList.add('is-invalid');
                return false;
            }

        }
        return true
    }

    checkAll = () => {
        var check1 = true
        var check2 = true
        var check3 = true
        var check4 = this.limitdurationCheck()
        return (this.expireDateCheck() && check1 && check2 && check3 && check4);
    }

    toggletype = event => {
        //console.log(document.getElementById('limitdurationtype').value);
        this.setState({
            expireType: document.getElementById('limitdurationtype').value
        });
    }

    onEditorStateChange = (editorState) => {
        //console.log("CHANGE:", editorState);
        this.setState({
            editorState: editorState,
        })
    }

    render() {
        var date;
        if (this.props.src.limitdurationtype == 2) {
            date = new Date(this.props.src.createdate);
            date.setDate(date.getDate() + this.props.src.limitduration);
            //console.log(date);
        }
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
                                    <Button color='success' disabled style={{ minWidth: 110 }}>Full Price</Button>
                                    <Input disabled
                                        defaultValue={this.props.src.price / 100}
                                    />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup row>
                            <InputGroup>
                                    <Button color='primary' disabled style={{ minWidth: 110 }}>Discount</Button>
                                    <Input
                                        type='discount'
                                        id='discount'
                                        defaultValue={this.state.discountField.discount} //Waiting for change
                                        onChange={this.manageDiscountPrice}
                                        placeholder='Enter Discount price in Thai Baht' />
                                    <FormFeedback>Discount must be a number ,between 20 and Full price, or 0 and not have all of symbol ex. ',' , '฿'</FormFeedback>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup row>
                            <InputGroup>
                                    <Button color='primary' disabled style={{ minWidth: 110 }}>Sale Price</Button>
                                    <Input
                                        type='salePrice'
                                        id='salePrice'
                                        defaultValue={this.state.discountField.salePrice} //Waiting for change
                                        onChange={this.managePriceSale}
                                        placeholder='Enter Sale price in Thai Baht' />
                                    <FormFeedback>Sale price must be a number ,between 20 and Full price, or 0 and not have all of symbol ex. ',' , '฿'</FormFeedback>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup row>
                            <InputGroup>
                                    <Button color='primary' disabled style={{ minWidth: 110 }}>Sale %</Button>
                                    <Input
                                        type='salePercent'
                                        id='salePercent'
                                        defaultValue={this.state.discountField.percent} //Waiting for change
                                        onChange={this.managePercentSale}
                                        placeholder='Enter % discount in Thai Baht' />
                                    <FormFeedback>% must be a number ,between 0-100 and not have all of symbol ex. ',' , '฿'</FormFeedback>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup row>
                            <Input plaintext> Description</Input>
                            <Editor
                                editorState={this.state.editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        </FormGroup>
                        <hr></hr>
                        <FormGroup row>
                            <Input plaintext> Expire Type</Input>
                            <Input
                                type='select'
                                name='limitdurationtype'
                                id='limitdurationtype'
                                defaultValue={this.props.src.limitdurationtype}
                                onChange={this.toggletype}>
                                <option value='0'>
                                    Will Not Expire
                                </option>
                                <option value='1'>
                                    Expire in a range of time
                                </option>
                                <option value='2'>
                                    Expire on exact date
                                </option>
                            </Input>

                            <Collapse isOpen={this.state.expireType == '1'}>
                                <Card>
                                    <CardBody>
                                        choose type 1 : Expire in a range of time
                                        <FormGroup row>
                                            <Label>
                                                Choose Range of time
                                            </Label>
                                            <Input
                                                type='text'
                                                id='limitduration'
                                                placeholder='Enter range of expire in days ex. 365'
                                                defaultValue={this.props.src.limitdurationtype == 1 ? this.props.src.limitduration : ''}
                                                onChange={this.limitdurationCheck}
                                            />
                                            <FormFeedback>must be number and exceed 7</FormFeedback>
                                        </FormGroup>
                                    </CardBody>
                                </Card>
                            </Collapse>
                            <br />
                            <Collapse isOpen={this.state.expireType == '2'}>
                                <Card>
                                    <CardBody>
                                        choose type 2 : Expire on exact date<br />
                                        <Label>Choose Exact Expiry Date</Label>
                                        <Input
                                            type='date'
                                            id='expiredate'
                                            onChange={this.expireDateCheck}
                                            defaultValue={this.props.src.limitdurationtype == 2 ? date.toISOString().split('T')[0] : new Date}
                                        />
                                        <FormFeedback>must more than 7 days form now</FormFeedback>
                                    </CardBody>
                                </Card>
                            </Collapse>
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