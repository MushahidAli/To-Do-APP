import { Modal, Button } from 'react-bootstrap'
import ToDo from '../../assets/todo.png'

export default function SuccessModal({ show }) {
    return (
        <Modal show={show} centered>
            <div className='modal-header'>Success Message</div>
            <div className='text-center'>
                <div className='modal-body'>
                    <img src={ToDo} />
                </div>
                <h3>Your Task Has Been Added Successfully!</h3>
            </div>
        </Modal>
    );
}