import React from 'react'
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './TaskCard.css'

export default function TaskCard({ element }) {
    return (
        <div className='taskcard-main mb-3'>
            <p className='d-flex justify-content-between mb-1'>
                <b>{element.task_title}</b>
                <p>
                    <FaEdit style={{ fontSize: '25px', cursor: 'pointer' }} />
                    <MdDeleteForever style={{ fontSize: '25px', cursor: 'pointer' }} />
                </p>
            </p>
            <code>{element.task_summary}</code>
        </div>
    );
}