
import React, { useState } from 'react';
import { Handle } from 'react-flow-renderer';
import { ImCopy, ImCross } from "react-icons/im";
import {MdDelete} from 'react-icons/md'
import { RxCross2 } from "react-icons/rx";
const CustomNode = ({ data }) => {
  const { label, id, deleteNode } = data;
  const [nodeName, setNodeName] = useState(label);
  const [showPopup, setShowPopup] = useState(false);
  const [titleInput, setTitleInput] = useState('');



  const handleTitleSave = () => {
    setNodeName(titleInput);
    setShowPopup(false);
  };

  const handleClose = () => {
    setShowPopup(false);
  }
  const handleCopy = () => {
    console.log("copied")
  }

  return (
    <div className="custom-node" style={{ minWidth: "100px", position: 'relative' }}>
      {showPopup && (
        <div className="popup-window">
         <div style={{
            display: "flex",
            flexDirection: 'row',
            alignItems: 'center',
             justifyContent: 'space-between',
             paddingRight: '10px',
             padding: '4px',
             borderBottom: '2px solid gray',
      
            
         }}>
         <input
            type="text"
            value={titleInput}
            onChange={(event) => setTitleInput(event.target.value)}
            placeholder="Enter title"
            style={{ width: '70%',  borderStyle: 'none', height: '40px',     fontFamily: 'sans-serif',
            fontSize: '14px',
            fontWeight: 'bold',
          outline: 'none', }}
          />
          <div className='quickButtons' style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: "10px",
          
          }}>
           <button onClick={handleCopy} className='popupButton'>
           <ImCopy />
           </button>
           <button onClick={() => deleteNode(id)} className='popupButton' style={{
            color: 'red',
           }}>
           <MdDelete  />
           </button>
            
           <button onClick={handleClose} className='popupButton'>
           <RxCross2 />
           </button>
            </div>
            </div>
          <div style={{
            display: "flex",
            width: '100%',
            gap: '20px',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: '20px',
          
          }}>
             <button onClick={handleClose} style={{
              height: '40px',
              width: '90px',
              border: '2px solid black',
              borderRadius: '10px',
              fontWeight: 'bold',
              backgroundColor: 'white',
              fontSize: '17px',
              cursor: 'pointer',

             }}>Cancel</button>
          <button onClick={handleTitleSave} style={{
              height: '40px',
              width: '90px',
              border: '2px solid black',
              borderRadius: '10px',
              fontWeight: 'bold',
              backgroundColor: 'black',
              color: 'white',
              fontSize: '17px',
              cursor: 'pointer',
              marginRight: '10px',
          }}>Save</button>
            </div>
        </div>
      )}
      <div className="node-content" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: "black", fontWeight: 'bold', justifyContent: 'space-between',  width: '100%' }} onClick={() => setShowPopup(true)}>
        <span>{nodeName}</span>
        <div className="delete-icon" onClick={() => deleteNode(id)}>
          <ImCross />
        </div>
      </div>
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  );
};

export default CustomNode;
