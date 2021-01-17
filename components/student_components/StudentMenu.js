import React from 'react';
import '../../styles/StudentMenu.css';

export default function StudentMenu(props) {

    return (
        <div className={'student_menu'}>
            <div className={'student_code'}>Code: {props.roomID}</div>
                {props.menu_items.map((item, index) =>
                    <span key={item} onClick={e => props.goToPage(item)}
                        className={props.active_page === item ? 'active' : ''}>{item}</span>
                )}
            {/* <div className={'byline'}>Made by Tyler & Gautam<br />SBHacks 2021</div> */}
        </div>
    );
}