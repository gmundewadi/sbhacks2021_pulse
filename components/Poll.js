import React from 'react';

import '../styles/Poll.css';

export default function Poll(props) {
    return (
        <div className={'poll'}>
            <div className={'poll_options'}>
                {props.options.map((option, index) =>
                    <div key={index} className='poll_wrapper'>
                        <input value={option} index={index} className={'poll_option'} onChange={(e) => props.changeOption(index, e.target.value)}></input>
                        <span className={'poll_delete'} onClick={() => props.deleteOption(index)}>X</span>
                    </div>
                )}
                <button className={'add_option'} onClick={props.addOption}>Add Option</button>
            </div>
            
            <button className={'send_poll'}>Open Poll</button>
        </div>
    );
}