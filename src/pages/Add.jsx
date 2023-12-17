import React from "react";
import { PlusCircle } from "react-feather";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form} from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addVideo } from "../service/allapi";
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Add({handleResponse}) {

  const [uploadData, setuploadData] = useState({
    id: "", caption: "", thumbnail: "", url: ""
  })

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // set input function definition
  const setInput = (e) => {
    // setuploadData(e.target.value)

    const { name, value } = e.target
    setuploadData({ ...uploadData, [name]: value })


  }
  console.log(uploadData);

  // exctract url

  const extractUrl = (e) => {
    // console.log(e.target.value);

    let youtubeUrl = e.target.value
    if (youtubeUrl.includes("v=")) {
      let index = youtubeUrl.indexOf("v=")
      console.log(index);

      let videoUrl = youtubeUrl.substring(index + 2, index + 13)
      console.log(videoUrl);

      let videoData = uploadData

      videoData.url = `https://www.youtube.com/embed/${videoUrl}`
      setuploadData(videoData)
    }
  }

  //  define handle add function

  const handleAdd = async () => {
    const { id, caption, thumbnail, url } = uploadData

    if (!id || !caption || !thumbnail || !url) {
      toast("please fill the form completely")
    }
    else {
      let response = await addVideo(uploadData)
      //  console.log(response.data);

      if (response.status >= 200 && response.status < 300) {

        console.log(response.data);

       handleResponse(response.data)

        setShow(false)
        toast.success("video uploaded sucessfully!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })

      }
      else {
        toast("please provide unique id!!")
      }
    }
  }

  return (
    <>
      <div onClick={handleShow} className="btn">
        <PlusCircle color="green" size={90} />
      </div>

      {/* models */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            {/* id */}

            <FloatingLabel className="mb-3" controlId="floatingid" label="Id">
              <Form.Control name='id' onChange={setInput} type="text" placeholder="Uploading video id" />
            </FloatingLabel>


            {/* caption */}

            <FloatingLabel className="mb-3" controlId="floatingcaptiom" label="Uploading video caption">
              <Form.Control name='caption' onChange={setInput} type="text" placeholder="Uploading Video Caption" />
            </FloatingLabel>

            {/* image url */}

            <FloatingLabel className="mb-3" controlId="floatingimage" label=" Video cover URL">
              <Form.Control name='thumbnail' onChange={setInput} type="text" placeholder="Video Cover Image URL" />
            </FloatingLabel>

            {/* video link */}

            <FloatingLabel className="mb-3" controlId="floatinglink" label="Uploading video caption">
              <Form.Control name='url' onChange={extractUrl} type="text" placeholder="Video Link" />
            </FloatingLabel>

          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}
export default Add