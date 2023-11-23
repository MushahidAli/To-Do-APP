import { useState } from 'react'
import { Button, Modal, FloatingLabel, Form } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import CustomErrorMessage from './assets/elements/ErrorMessage'
import SuccessModal from './assets/modals/SuccessModal'
import TaskCard from './assets/taskCard/TaskCard'
import './App.css'

export default function App() {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const handleShowSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {setShowSuccess(false)}, 3000);
  }

  const taskSchema = Yup.object().shape({
    task_title: Yup.string().required('Task Title Is Mandatory!'),
    task_summary: Yup.string().required('Task Summary Is Mandatory!'),
  });

  const appendDataToLocalStorage = (key, newData) => {
    const existingDataString = localStorage.getItem(key);
    const existingData = existingDataString ? JSON.parse(existingDataString) : [];
    existingData.push(newData);
    localStorage.setItem(key, JSON.stringify(existingData));
  };

  return (
    <div className='task-main'>
      <h2 className='task-title mb-3 d-flex justify-content-between'>
        <p>My Tasks</p>
        <p onClick={() => {localStorage.removeItem('tasks'); window.location.href=""}} style={{cursor: 'pointer'}}>Delete All</p>
      </h2>
      <div className='task-container mb-3'>
        {
          localStorage.getItem('tasks') ?
          JSON.parse(localStorage.getItem('tasks')).map((element, idx) => <div key={idx}><TaskCard element={element}/></div>)
          :
          "You have no tasks yet!"
        }
      </div>
      <Button className='add-task-btn' onClick={handleShow}>Add A New Task</Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <div className='modal-main'>
          <div className='modal-header'>Create A New Task</div>
          <Formik
            initialValues={{
              task_title: "",
              task_summary: ""
            }}
            validationSchema={taskSchema}
            onSubmit={
              (values) => {
                console.log("Values : ", values);
                setShow(false);
                handleShowSuccess();
                appendDataToLocalStorage('tasks', values);
                }
            }
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit
            }) => (
              <form onSubmit={handleSubmit}>
                <div className='modal-body'>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Task Title"
                    className="mb-3"
                  >
                    <Form.Control type="text" name="task_title" placeholder="Task Title" value={values.task_title} onChange={handleChange} onBlur={handleBlur} />
                    <CustomErrorMessage errors={errors} touched={touched} name="task_title" />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Task Summary">
                    <Form.Control type="text" name="task_summary" placeholder="Task Summary" value={values.task_summary} onChange={handleChange} onBlur={handleBlur} />
                    <CustomErrorMessage errors={errors} touched={touched} name="task_summary" />
                  </FloatingLabel>
                </div>
                <div className='modal-controller m-2 d-flex justify-content-between align-items-center'>
                  <Button variant="outline-primary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Create Task
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Modal>

      <SuccessModal show={showSuccess} />

    </div>
  )
}