import React from 'react';

import '../styles/Group.css';

export default function Group(props) {

    return (
        <div className={'group'}>
            <table>
                <tr>
                    <th>Student</th>
                    <th>Pulse</th>
                    <th>Poll Answer</th>
                </tr>
                {props.data.map((student, index) =>
                    <tr key={index}>
                        <td>{student.username}</td>
                        <td>{student.pulse}%</td>
                        <td>{student.poll_response}</td>
                    </tr>
                )}
            </table>
        </div>
    );
}