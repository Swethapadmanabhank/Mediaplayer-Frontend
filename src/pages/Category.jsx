import React, { useEffect } from "react";
import { useState } from 'react';
import { Col, Form, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from "react-toastify";
import { addCategory, deleteCategory, getVideos, getcategory, updateCategory } from "../service/allapi";
import { Trash2 } from "react-feather";
import VideoCard from './VideoCard'




function Category() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [addcategory, setaddcategory] = useState({
        id:"", name:"", allVideos:[]
    })
    const handleaddcategory=(e)=>{
        const { name, value } = e.target
        setaddcategory({ ...addcategory, [name]: value })

    }
    const[allcategory,setaddcategories]=useState([])


    // console.log(addcategory);

    const handleAdd = async (e) => {
        e.preventDefault()
        const { id, name } = addcategory
        if (!id || !name) {
            toast('please fill the form completely')
        }
        else {
            // api call
            let res = await addCategory(addcategory)
            console.log(res);

            if (res.status >= 200 && res.status < 300) {
                console.log(res.data);
                setShow(false)
                toast('category successfully added')
                getCategorylist()
            }
            else {
                toast('please provide a unique id')
            }
        }
    }

    useEffect(() => {
        getCategorylist()
     
    }, [])
    


    const getCategorylist=async()=>{
        // api call
     const resp=  await  getcategory()
     console.log(resp);
     setaddcategories(resp.data)

    }

    console.log(allcategory);

    const handleDeleteCategory=async(e,id)=>{
        e.preventDefault()
        // api call for category delete
       const resp= await deleteCategory(id)
       
       console.log(resp);
       getCategorylist()

    }
    // define ondragOver 
    const dragOver=(e)=>{
      e.preventDefault()
      console.log("dragging over the category");
    }
    const dropped=async(e,CategoryId)=>{
        console.log("categoryid",CategoryId);
        let sourceCardId=e.dataTransfer.getData("cardId")
        console.log('source card id',sourceCardId);
     const {data}= await getVideos(sourceCardId)
     console.log(data);

     let selectedCategory=allcategory.find(item=>item.id==CategoryId)
     console.log("target categoryDetails",selectedCategory);
     selectedCategory.allVideos.push(data)

     console.log("updated category details",selectedCategory);
    await updateCategory(CategoryId,selectedCategory)
     getCategorylist()
    }

  

    return (
        <>
            <div className="d-grid">
                <div onClick={handleShow} className="btn btn-dark m-2 "> Add Category</div>
            </div>

         {
            allcategory.map(item=>(
            <div droppable onDragOver={e=>dragOver(e)} onDrop={e=>dropped(e,item?.id)}>
               <div className="d-flex justify-content-between border rounded mt-3 p-3">
         
         <h4>{item?.name}</h4>
         <span onClick={e=>handleDeleteCategory(e,item?.id)}><Trash2 color="red"/></span>

         
         <Row>
            {
              item?.allVideos.map((card)=>(
             <Col>
             
             <VideoCard card={card} insideCategory={true}/>

             </Col>
              ))
              }
             

            
         </Row>


         </div>
         </div>

            ))
         }

         

     



            {/* model */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>

                        <FloatingLabel className="mb-3" controlId="floatingid" label="Id">
                            <Form.Control type="text" name="id" onChange={handleaddcategory} placeholder="Category id" />
                        </FloatingLabel>

                        <FloatingLabel className="mb-3" controlId="floatingidcaption" label="Caption">
                            <Form.Control type="text" name="name" onChange={handleaddcategory} placeholder="Caption" />
                        </FloatingLabel>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleAdd} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Category