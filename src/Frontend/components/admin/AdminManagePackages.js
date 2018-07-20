import React from 'react'
import classnames from 'classnames';
import { AdminEditPackageModal } from './AdminEditPackageModal';
import { AdminCreatePackageModal } from './AdminCreatePackageModal';
import { AdminEditPackageCourseModal } from './AdminEditPackageCourseModal';
import { AdminDeletePackageModal } from './AdminDeletePackageModal';
import ContentLoader from 'react-content-loader'
import { Loading } from '../loading/Loading'
import {
  Form, Badge, Label, Input, InputGroupButtonDropdown, DropdownMenu, DropdownItem, InputGroupAddon, DropdownToggle, InputGroup,
  FormGroup, Card, Navbar, TabContent, TabPane, Nav, NavItem, NavLink, Container, Row, Col, Table, Modal, Button, ModalFooter, ModalHeader, Pagination, PaginationItem, PaginationLink
} from 'reactstrap'
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import { AdminManageUsers } from './AdminManageUsers';

const ipList = require('../../../Config/ipConfig');
const axios = require('axios')
const capsule = require('../../capsulation/SendData')
var modalComponent;
var allpackages;
const rowperpage = 15;
const sortName = ['Package ID (+)', 'Package ID (-)', 'Package Name (A-Z)', 'Package Name (Z-A)', 'Instructor (A-Z)', 'Instructor (Z-A)', 'Price (+)', 'Price (-)', 'New Package', 'Old Package']

/*
    As a Package Mangement
    Package info : 
    1. Package ID       3.Package desc          
    2. Package Name     4.Package Thumbnail
    Props: UserID Username FirstName LastName Birthday('yyyy-mm-dd') Address Gender
            and src : List of Package object {Cid Cname Clink Cexpdate}

    Prop src must be qu
*/

const MyLoaderRow = () => (
  <ContentLoader
    height={15}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#9c9c9c"
  >
    <rect x="0" y="5" rx="3" ry="3" width="395" height="5" />
  </ContentLoader>
);
const MyLoader2 = props => (
  <ContentLoader
    height={160}
    width={400}
    speed={10}
    primaryColor="#f3f3f3"
    secondaryColor="#9c9c9c"
  >
    <circle cx="23.64" cy="24.64" r="14.64" />
  </ContentLoader>
);

export class AdminManagePackages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloaded: false,
      modalOpen: false,
      packageInfo: {},
      packageHideInfo: {},
      modalHeader: '',
      pager: 0,
      ishideUnavailable: false,
      splitButtonOpen: false,
      splitSortButtonOpen: false,
      searchType: 'All',
      searchWord: '',
      //Sort 0 : by packageid assending, 1 : by packageid decreasing ,2: by packagename ass,
      // See "https://docs.google.com/spreadsheets/d/1lYKSrloHOo-Sj_Xzs-GpRVDH6igA5GcvTtXoHaZdom8/edit?usp=sharing" for more info
      sortmode: -1,
      sortmodeIcon: -1,
      sortmodeName: 'None'
    }
    //this.getDatabaseValue = this.getDatabaseValue.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.togglePackageCourse = this.togglePackageCourse.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.changeSearchType = this.changeSearchType.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.toggleSortSplit = this.toggleSortSplit.bind(this);
    this.setSortMode = this.setSortModeIcon.bind(this);
    this.sortPackageData = this.sortPackageData.bind(this);
    this.setSortModeName = this.setSortModeName.bind(this);
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
    this.handleSearchIconPress = this.handleSearchIconPress.bind(this);
    this.searchPackage = this.searchPackage.bind(this);
    this.isChange = this.isChange.bind(this);
  }

  async componentWillMount() {
    return this.getData();
  }

  async setPage(x) {
    var packageinfo = this.state.packageInfo;
    if (this.state.ishideUnavailable)
      packageinfo = this.state.packageHideInfo;
    if (x >= 0 && x <= Math.ceil(packageinfo.length / rowperpage) - 1) {
      await this.setState({ pager: x });
    }
  }

  async getData() {
    await this.setState({
      isloaded: false
    });
    console.log("GetIt");
    var temp1 = (await axios.post(ipList.backend + "/manage/package/main", capsule.sendData({
      // Don't need to add anything, just send only a loginToken with capsule
    }))).data;
    allpackages = temp1;
    for (var i = 0; i < temp1.length; i++) {
      try {
        temp1[i].thumbnail = require('../../Image/Package/Thumbnail/Thumbnail' + temp1[i].packageid + '.jpg')
        temp1[i].banner = require('../../Image/Package/Banner/Banner' + temp1[i].packageid + '.jpg')
      } catch (err) {

      }
    }
    console.log(temp1);
    await this.setState({
      isloaded: true,
      packageInfo: temp1,
      pager: 0
    });
    this.togglehideUnavailable()
    console.log("Package info:", this.state.packageInfo);
    return true;
  }

  handleSearchKeyPress(event, searchMode, sortMode) {
    if (event.charCode == 13) {
      event.preventDefault();
      this.searchPackage(event.target.value, searchMode, sortMode);
    }
  }

  handleSearchIconPress(searchKeyword, searchMode, sortMode) {
    this.searchPackage(searchKeyword, searchMode, sortMode);
  }

  async changeSearchType(type) {
    if (this.state.searchType !== type)
      await this.setState(
        { searchType: type }
      )
  }

  async isChange(isChange){
    if(isChange){
      await this.getData();
      this.searchPackage(this.state.searchWord, this.state.searchType, this.state.sortmode)
    }
  }

  async setSortModeIcon(sortMode) {
    if (this.state.sortmodeIcon !== sortMode) {
      await this.setState({
        sortmodeIcon: sortMode
      });
      this.setSortModeName(sortMode)
    }
  }

  async setSortModeName(sortMode) {
    if (sortMode < 0) {
      await this.setState({
        sortmodeName: 'None'
      });
    }
    else {
      await this.setState({
        sortmodeName: sortName[sortMode]
      });
    }
  }

  async sortPackageData(sortmode, packagedata) {
    var temppackages = packagedata;
    this.setSortModeName(sortmode);
    switch (parseInt(sortmode)) {
      case 0:
        //package ID sort min > max
        temppackages.sort(function (a, b) { return a.packageid - b.packageid });
        break;
      case 1:
        //package ID sort max > min
        console.log('mode 1 sssss');
        temppackages.sort(function (a, b) { return b.packageid - a.packageid });
        break;
      case 2:
        //package name min > max
        temppackages.sort(function (a, b) {
          var x = a.packagename.toLowerCase();
          var y = b.packagename.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return a.packageid - b.packageid;
        });
        break;
      case 3:
        //package name max < min
        temppackages.sort(function (a, b) {
          var x = a.packagename.toLowerCase();
          var y = b.packagename.toLowerCase();
          if (x < y) { return 1; }
          if (x > y) { return -1; }
          return a.packageid - b.packageid;
        });
        break;
      case 4:
        //Instructor min > max
        // temppackages.sort(function (a, b) {
        //   var x = a.instructor.toLowerCase();
        //   var y = b.instructor.toLowerCase();
        //   if (x < y) { return -1; }
        //   if (x > y) { return 1; }
        //   return a.packageid - b.packageid;
        // });
        break;
      case 5:
        //Instructor max > min
        // temppackages.sort(function (a, b) {
        //   var x = a.instructor.toLowerCase();
        //   var y = b.instructor.toLowerCase();
        //   if (x < y) { return 1; }
        //   if (x > y) { return -1; }
        //   return a.packageid - b.packageid;
        // });
        break;
      case 6:
        //Price cheap > expansive
        temppackages.sort(function (a, b) {
          if (a.price != b.price)
            return a.price - b.price
          return a.packageid - b.packageid;
        });
        break;
      case 7:
        //Price expansive > cheap
        temppackages.sort(function (a, b) {
          if (a.price != b.price)
            return b.price - a.price
          return a.packageid - b.packageid;
        });
        break;
      case 8:
        //Create Date new > old
        temppackages.sort(function (a, b) {
          var x = a.createdate;
          var y = b.createdate;
          if (x > y) { return -1; }
          if (x < y) { return 1; }
          return a.packageid - b.packageid;
        });
        break;
      case 9:
        //Create Date new > old
        temppackages.sort(function (a, b) {
          var x = a.createdate;
          var y = b.createdate;
          if (x > y) { return 1; }
          if (x < y) { return -1; }
          return a.packageid - b.packageid;
        });
        break;
      case 10:
        //Waiting for change
        //temppackages.sort(function (a, b) { return b.price - a.price });
        break;
      case 11:
        //Waiting for change
        //temppackages.sort(function (a, b) { return b.price - a.price });
        break;
      default:
        //Do nothing
        break;
    }
    await this.setState({ packageInfo: temppackages, packageHideInfo: temppackages, sortmode: sortmode, pager: 0 });
    this.togglehideUnavailable()
    console.log('sort finish')
  }

  sortPackage(sortmode) {
    var temppackages = this.state.packageInfo;
    this.sortPackageData(sortmode, temppackages)
    console.log('sort (by icon) finish')
  }

  async searchPackage(searchword, searchMode, sortMode) {
    if (searchword.indexOf('[') > -1 || searchword.indexOf('(') > -1 || searchword.indexOf('*') > -1 || searchword.indexOf('+') > -1) {
      document.getElementById('packagesearchbox').classList.remove('is-valid');
      document.getElementById('packagesearchbox').classList.add('is-invalid');
      return;
    }
    document.getElementById('packagesearchbox').classList.add('is-valid');
    document.getElementById('packagesearchbox').classList.remove('is-invalid');
    var expr = RegExp(searchword.toLowerCase());
    var temppackages = [];

    switch (searchMode) {
      case 'Package Name':
        allpackages.map((item) =>
          (expr.test(item.packagename.toLowerCase())) ? temppackages.push(item) : ''
        );
        break;
      case 'Instructor':
        allpackages.map((item) =>
          (expr.test(item.instructor.toLowerCase())) ? temppackages.push(item) : ''
        );
        break;
      case 'Full Price >':
        if (searchword == "") searchword = "0";
        allpackages.map((item) =>
          (item.price >= (100 * parseInt(searchword))) ? temppackages.push(item) : ''
        );
        break;
      case 'Full Price <':
        allpackages.map((item) =>
          (item.price <= (100 * parseInt(searchword))) ? temppackages.push(item) : ''
        );
        break;
      case 'Discounted Price >':
        if (searchword == "") searchword = "0";
        allpackages.map((item) =>
          (item.discountprice >= (100 * parseInt(searchword))) ? temppackages.push(item) : ''
        );
        break;
      case 'Discounted Price <':
        allpackages.map((item) =>
          (item.discountprice <= (100 * parseInt(searchword))) ? temppackages.push(item) : ''
        );
        break;
      default:
        allpackages.map((item) =>
          (expr.test(item.packagename.toLowerCase())) ||
          (item.price >= (100 * parseInt(searchword))) ? temppackages.push(item) : (parseInt(searchword) == NaN) ? '' :
              (item.discountprice >= (100 * parseInt(searchword))) ? temppackages.push(item) : ''
        );
        break;
    }
    this.sortPackageData(sortMode, temppackages);
    await this.setState({
      searchWord: searchword
    })
    console.log('search finish')
  }

  handleHideToggle = async () => {
    await this.setState({ ishideUnavailable: !this.state.ishideUnavailable, pager: 0 });
  }
  togglehideUnavailable = () => {
    var temp2 = Object.assign([], this.state.packageInfo);
    for (var i = temp2.length - 1; i >= 0; --i) {
      if (temp2[i].isavailable == 0) {
        temp2.splice(i, 1);
      }
    }
    this.setState({ packageHideInfo: temp2 });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }

  toggleSortSplit() {
    this.setState({
      splitSortButtonOpen: !this.state.splitSortButtonOpen
    });
  }

  toggleEdit(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Edit Package',
      modalOpen: !this.state.modalOpen
    });
    var packageinfo = this.state.packageInfo;
    if (this.state.ishideUnavailable)
      packageinfo = this.state.packageHideInfo;
    modalComponent = (x < 0) ? '' : (<AdminEditPackageModal src={packageinfo[x]} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />);
  }

  toggleCreate() {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Create Package',
      modalOpen: !this.state.modalOpen
    });
    modalComponent = <AdminCreatePackageModal closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />;
  }

  togglePackageCourse(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Edit Courses of Package',
      modalOpen: !this.state.modalOpen
    });
    var packageinfo = this.state.packageInfo;
    if (this.state.ishideUnavailable)
      packageinfo = this.state.packageHideInfo;
    modalComponent = (x < 0) ? '' : (<AdminEditPackageCourseModal isChange={this.isChange} packageid={packageinfo[x].packageid} packagename={packageinfo[x].packagename} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />);
  }

  toggleDelete(x) {
    console.log(this.state.modalOpen);
    this.setState({
      modalHeader: 'Delete Package',
      modalOpen: !this.state.modalOpen
    });
    var packageinfo = this.state.packageInfo;
    if (this.state.ishideUnavailable)
      packageinfo = this.state.PackageHideInfo;
    modalComponent = (x < 0) ? '' : (<AdminDeletePackageModal packageid={packageinfo[x].packageid} packagename={packageinfo[x].packagename} closeModal={this.closeModal} closeModalAndReload={this.closeModalAndReload} />);
  }

  closeModalAndReload = async () => {
    console.log('closemodal by fx')
    await this.getData();
    this.searchPackage(this.state.searchWord, this.state.searchType, this.state.sortmode)
    await this.setState({
      modalOpen: false
    });
  }

  closeModal = async () => {
    await this.setState({
      modalOpen: false
    });
  }

  render() {
    console.log('renderrrrrr');
    if (this.state.isloaded) {
      var packageinfo = this.state.packageInfo;
      if (this.state.ishideUnavailable)
        packageinfo = this.state.packageHideInfo;
      var packageTableBody = packageinfo.map((item, i) =>
        <tr style={{ color: (item.isavailable == '1') ? '#FFF' : '#555', display: (i >= rowperpage * this.state.pager && i < rowperpage * (this.state.pager + 1)) ? '' : 'none' }}>
          <td style={{ width: 50, maxWidth: 50 }}><b>{i + 1}</b></td>
          <td style={{ width: 110, maxWidth: 110 }}>{item.packageid}</td>
          <td style={{ width: 300, maxWidth: 300, overflowX: 'hide' }}>{item.packagename}</td>
          <td style={{ width: 150, maxWidth: 150 }}>{(item.price / 100).toLocaleString('en')} ฿</td>
          <td style={{ width: 150, maxWidth: 150 }}>{(item.discountprice / 100).toLocaleString('en')} ฿ as {(item.price / 100!==0)?(item.discountprice / (item.price) * 100).toFixed(2):'0'} % of full price</td>
          <td style={{ width: 180 }}><Button color='primary' style={{ width: 45, height: 40 }} outline onClick={() => { this.toggleEdit(i) }}><i class="fa fa-edit" /></Button>{' '}
            <Button color='primary' style={{ width: 45, height: 40 }} outline onClick={() => { this.togglePackageCourse(i) }}><i class="fa fa-reorder" /></Button>{' '}
            <Button color='danger' style={{ width: 45, height: 40 }} outline onClick={() => { this.toggleDelete(i) }}><i class="fa fa-trash-o" /></Button></td>
        </tr>
      );

      var paginationitems = [];
      for (var i = 0; i < Math.ceil(packageinfo.length / rowperpage); i++) {
        ((i) => {
          paginationitems.push(
            <PaginationItem active={i == this.state.pager}>
              <PaginationLink onClick={() => { this.setPage(new Number(i)) }}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>);

        })(i)
      }
      var tableHeader = [];

      return (
        <Container fluid style={{ paddingBottom: '10px' }}>
          <br />
          <Card style={{ background: '#444', padding: 20 }}>
            <Row className="justify-content-between" style={{ color: 'white' }}>
              <Col xs='auto'>
                <Input plaintext style={{ color: 'white', fontSize: 'large', fontWeight: 'bold' }}>Package Management</Input>
              </Col>
              <Col xs='auto'>
                <Form inline style={{ display: 'block', zIndex: 100 }}>
                  <FormGroup row style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <InputGroup >
                      <Input plaintext style={{ color: 'white', width: 100 }}>HIDE&nbsp;&nbsp;<Switch checked={this.state.ishideUnavailable} onChange={this.handleHideToggle} style={{ width: 50 }} /></Input>

                      <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitSortButtonOpen} toggle={this.toggleSortSplit}>
                        <Button disabled color="light" outline
                          style={{ width: 160 }} >{this.state.sortmodeName}</Button>
                        <DropdownToggle split outline color='light' />
                        <DropdownMenu>
                          <DropdownItem onClick={() => this.setSortModeIcon(-1)}>None</DropdownItem>
                          <DropdownItem onClick={() => this.setSortModeIcon(0)}>{sortName[0]}</DropdownItem>
                          <DropdownItem onClick={() => this.setSortModeIcon(1)}>{sortName[1]}</DropdownItem>
                          <DropdownItem onClick={() => this.setSortModeIcon(2)}>{sortName[2]}</DropdownItem>
                          <DropdownItem onClick={() => this.setSortModeIcon(3)}>{sortName[3]}</DropdownItem>
                          <DropdownItem onClick={() => this.setSortModeIcon(4)}>{sortName[4]}</DropdownItem>
                          <DropdownItem onClick={() => this.setSortModeIcon(5)}>{sortName[5]}</DropdownItem>
                          <DropdownItem onClick={() => this.setSortModeIcon(6)}>{sortName[6]}</DropdownItem>
                          <DropdownItem onClick={() => this.setSortModeIcon(7)}>{sortName[7]}</DropdownItem>
                          <DropdownItem onClick={() => this.setSortModeIcon(8)}>{sortName[8]}</DropdownItem>
                          <DropdownItem onClick={() => this.setSortModeIcon(9)}>{sortName[9]}</DropdownItem>
                        </DropdownMenu>
                      </InputGroupButtonDropdown>

                      <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
                        <Button disabled color="light" outline
                          style={{ width: 130 }} >{this.state.searchType}</Button>
                        <DropdownToggle split outline color='light' />
                        <DropdownMenu>
                          <DropdownItem onClick={() => this.changeSearchType('All')}>All</DropdownItem>
                          <DropdownItem onClick={() => this.changeSearchType('Package Name')}>Package Name</DropdownItem>
                          <DropdownItem onClick={() => this.changeSearchType('Full Price >')}>{'Full Price >'}</DropdownItem>
                          <DropdownItem onClick={() => this.changeSearchType('Full Price <')}>{'Full Price <'}</DropdownItem>
                          <DropdownItem onClick={() => this.changeSearchType('Package Price >')}>{'Package Price >'}</DropdownItem>
                          <DropdownItem onClick={() => this.changeSearchType('Package Price <')}>{'Package Price <'}</DropdownItem>
                        </DropdownMenu>
                      </InputGroupButtonDropdown>
                    </InputGroup >&nbsp;
                    <InputGroup style={{ minWidth: 290, maxWidth: 340 }} responsive >
                      <Input type="text" name="packagesearchbox" id="packagesearchbox" placeholder="Search Package" defaultValue={this.state.searchWord == '' ? '' : this.state.searchWord}
                        onKeyPress={(e, searchMode = this.state.searchType, sortMode = this.state.sortmodeIcon) => this.handleSearchKeyPress(e, searchMode, sortMode)}
                        style={{ minWidth: 250, maxWidth: 300 }} />
                      <InputGroupAddon addonType="append">
                        <Button color="primary" onClick={() => { this.handleSearchIconPress(document.getElementById('packagesearchbox').value, this.state.searchType, this.state.sortmodeIcon) }}>
                          <i class="fa fa-search" />
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Card>
          <br />

          <Modal size="lg" isOpen={this.state.modalOpen} toggle={this.closeModal}>
            <ModalHeader toggle={this.closeModal}>{this.state.modalHeader}</ModalHeader>
            {modalComponent}
            <ModalFooter></ModalFooter>
          </Modal>

          <Card style={{ background: '#444', paddingTop: 5, paddingRight: 20, paddingLeft: 20 }}>
            <Row>
              <Table responsive bordered inverse striped style={{ textAlign: 'center' }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>
                      <span onClick={() => { this.state.sortmode == 0 ? this.sortPackage(1) : this.sortPackage(0); }}>{"    Package id  "}&nbsp;</span>
                      <Badge color={this.state.sortmode == 0 || this.state.sortmode == 1 ? 'success' : 'secondary'} onClick={() => { (this.state.sortmode == 0 || this.state.sortmode == -1) ? this.sortPackage(1) : this.sortPackage(0); }}><i class={this.state.sortmode == 0 ? "fa fa-sort-amount-asc " : this.state.sortmode == 1 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
                        style={{ color: this.state.sortmode == 0 || this.state.sortmode == 1 ? '' : '#AAA' }} /></Badge></th>
                    <th>
                      <span onClick={() => { this.state.sortmode == 2 ? this.sortPackage(3) : this.sortPackage(2); }}>{"  Package Name  "}&nbsp;</span>
                      <Badge color={this.state.sortmode == 2 || this.state.sortmode == 3 ? 'success' : 'secondary'} onClick={() => { this.state.sortmode == 2 ? this.sortPackage(3) : this.sortPackage(2); }}><i class={this.state.sortmode == 2 ? "fa fa-sort-amount-asc " : this.state.sortmode == 3 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
                        style={{ color: this.state.sortmode == 2 || this.state.sortmode == 3 ? '' : '#AAA' }} /></Badge>
                    </th>
                    <th>
                      <span onClick={() => { this.state.sortmode == 4 ? this.sortPackage(5) : this.sortPackage(4); }}>{"  Full Price  "}&nbsp;</span>
                      <Badge color={this.state.sortmode == 4 || this.state.sortmode == 5 ? 'success' : 'secondary'} onClick={() => { this.state.sortmode == 4 ? this.sortPackage(5) : this.sortPackage(4); }} ><i class={this.state.sortmode == 4 ? "fa fa-sort-amount-asc " : this.state.sortmode == 5 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
                        style={{ color: this.state.sortmode == 4 || this.state.sortmode == 5 ? '' : '#AAA' }} /></Badge>
                    </th>
                    <th>
                      <span onClick={() => { this.state.sortmode == 6 ? this.sortPackage(7) : this.sortPackage(6); }}>{"  Package Price  "}&nbsp;</span>
                      <Badge color={this.state.sortmode == 6 || this.state.sortmode == 7 ? 'success' : 'secondary'} onClick={() => { this.state.sortmode == 6 ? this.sortPackage(7) : this.sortPackage(6); }} ><i class={this.state.sortmode == 6 ? "fa fa-sort-amount-asc " : this.state.sortmode == 7 ? "fa fa-sort-amount-desc" : "fa fa-align-center"}
                        style={{ color: this.state.sortmode == 6 || this.state.sortmode == 7 ? '' : '#AAA' }} /></Badge>
                    </th>
                    <th><i class="fa fa-cogs" aria-hidden="true" /></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="10">
                      <Button color='info' outline style={{ width: '100%', height: '100%' }} onClick={this.toggleCreate}><i class="fa fa-plus" /></Button>
                    </td>
                  </tr>
                  {packageTableBody}
                </tbody>
              </Table>
            </Row>

            <Row className='justify-content-around'>
              <Pagination aria-label="Page navigation example">
                <PaginationItem disabled={this.state.pager == 0}>
                  <PaginationLink onClick={() => { this.setPage(this.state.pager - 1) }} >
                    <i class="fa fa-angle-left" />
                  </PaginationLink>
                </PaginationItem>
                {paginationitems}
                <PaginationItem disabled={this.state.pager == Math.ceil(packageinfo.length / rowperpage) - 1 || packageinfo.length === 0}>
                  <PaginationLink onClick={() => { this.setPage(this.state.pager + 1) }} >
                    <i class="fa fa-angle-right" />
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </Row>
          </Card>
        </Container >
      );

    }
    else {
      return (
        <Container fluid style={{ paddingBottom: '10px' }}>
          <h3 color='white'>Package List</h3>
          <Switch checked={this.state.ishideUnavailable} disabled loading />
          <Col>
            <Table inverse striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Package id</th>
                  <th>Package Name</th>
                  <th>Full Price</th>
                  <th>Package Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="10">{MyLoaderRow()}</td>
                </tr>
                <tr>
                  <td colspan="10">{MyLoaderRow()}</td>
                </tr>
                <tr>
                  <td colspan="10">{MyLoaderRow()}</td>
                </tr>
                <tr>
                  <td colspan="10">{MyLoaderRow()}</td>
                </tr>
                <tr>
                  <td colspan="10">{MyLoaderRow()}</td>
                </tr>
                <tr>
                  <td colspan="10">{MyLoaderRow()}</td>
                </tr>
                <tr>
                  <td colspan="10">{MyLoaderRow()}</td>
                </tr>
                <tr>
                  <td colspan="10">{MyLoaderRow()}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Container>
      );
    }
  }
}
