import React, { Component } from 'react'
import { Button, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Table, Badge } from 'reactstrap'

export class CourseField extends React.Component {
    render() {
        const tablebody = this.props.defaultValue.src.map((item, i) => {
            var today = new Date();
            if (new Date(item.CourseExpDate) >= today) {
                return (<tr>
                    <th scope="row">{i + 1}</th>
                    <td>{item.CourseID}</td>
                    <td>{item.CourseName}</td>
                    <td>{item.CourseExpDate}  <Badge color="primary">{parseInt(((new Date(item.CourseExpDate)) - today) / (24 * 3600 * 1000))} days left</Badge></td>
                </tr>
                );
            }
            else {
                return (<tr style={{ color: '#F00' }}>
                    <th scope="row">{i + 1}</th>
                    <td>{item.CourseID}</td>
                    <td>{item.CourseName}</td>
                    <td>{item.CourseExpDate}   <Badge color="danger">Expired</Badge></td>
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