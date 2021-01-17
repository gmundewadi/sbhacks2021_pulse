import React from 'react';

import '../styles/Menu.css';

export default function Menu(props) {

    return (
        <div className={'menu'}>
            <div className={'code'}>Code: ABC123</div>
            <ul>
                {props.menu_items.map((item, index) =>
                    <li key={item} onClick={e => props.goToPage(item)}
                        className={props.active_page === item ? 'active' : ''}>{item}</li>
                )}
            </ul>
            <div className={'byline'}>Made by Tyler & Gautam<br />SBHacks 2021</div>
        </div>
    );
}