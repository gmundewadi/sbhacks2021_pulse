import React from 'react';

import '../styles/Group.css';

export default function Group(props) {

    return (
        <div className={'group'}>
            <table>
                <tr>
                    <th style={{ borderTopLeftRadius: 25 }}>Student</th>
                    <th>Pulse</th>
                    <th style={{ borderTopRightRadius: 25 }}>Poll Answer</th>
                </tr>
                {props.data.map((student, index) =>
                    <tr key={index}>
                        <td>{student.username}</td>
                        <td>{student.pulse}%</td>
                        <td>{student.poll_response > -1 ? props.options[student.poll_response] : ''}</td>
                    </tr>
                )}
            </table>
        </div>
    );
}