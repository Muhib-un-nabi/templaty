/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-else-return */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Collapse, FormGroup, Label } from 'reactstrap';

const PlaceholdersItem = ({ itemData }) => {
  const [collapse, setCollapse] = useState(false);
  const descriptionRef = useRef();

  useEffect(() => {
    if (!itemData.discription) return;
    descriptionRef.current.innerHTML = itemData.discription;
  }, [itemData]);

  return (
  <>
    {collapse&& <div onClick={()=> setCollapse(!collapse)} className='overlay-snippet-item' ></div> }
    <Card className={`d-flex mb-2 snippet-item ${(collapse ) && 'show p-2'}`}>
      <div className="d-flex flex-grow-1 min-width-zero">
        <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center p-1 ">
          <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
            {itemData.name}
          </div>
        </div>

        <div className="custom-control custom-checkbox pl-0 align-self-center pr-1">
          <Button
            outline
            color="theme-2"
            className={`icon-button ml-1 rotate-icon-click ${
              collapse ? 'rotate' : ''
            }`}
            onClick={() => setCollapse(!collapse)}>
              <i className={`${collapse? 'simple-icon-size-actual':'simple-icon-size-fullscreen'}`} />
          </Button>
        </div>
      </div>
      <Collapse isOpen={collapse}>
        <div className="card-body py-1 border">
          <div ref={descriptionRef} />
          </div>
  
      </Collapse>
      </Card>
      </>
  );
};

export default PlaceholdersItem;
