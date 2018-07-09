import React, { Component } from 'react'
import { Button, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Table, Badge } from 'reactstrap'
import dateFormat from 'dateformat'
const ipList = require('../../../Config/ipConfig');
export class CourseField extends React.Component {

    render() {
        const tablebody = this.props.defaultValue.src.map((item, i) => {
            var today = new Date();
            if (parseInt(((new Date(item.expireddate)) - today)) > 0) {
                return (<tr >
                    <td scope="row">{i + 1}</td>
                    <td>{item.courseid}</td>
                    <td><a href={ipList.frontend+'/learning/'+item.courseid+'/1'}>{item.coursename}</a></td>
                    <td>{dateFormat(item.expireddate,"dd/mm/yyyy")}  <Badge color="primary">{parseInt(((new Date(item.expireddate)) - today) / (24 * 3600 * 1000))} days left</Badge></td>
                </tr>
                );
            }
            else {
              console.log(item.expireddate);
                return (<tr style={{ color: '#F00' }}>
                    <td scope="row">{i + 1}</td>
                    <td>{item.courseid}</td>
                    <td>{item.coursename}</td>
                    <td>{dateFormat(item.expireddate,"dd/mm/yyyy")}   <Badge color="danger">Expired</Badge></td>
                </tr>
                );
            }
        });
        return (
            <Card>
                <Table style={{ marginBottom: 10 }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>CourseID</th>
                            <th>Course Name</th>
                            <th>Expired Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tablebody}
                    </tbody>
                </Table>
            </Card>
        );
    }
}
