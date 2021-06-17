/* eslint-disable prettier/prettier */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-else-return */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
import React, {  useState } from 'react';
import {
  Card,
  Button,
  Collapse,
  FormGroup,
  Label,
} from 'reactstrap';
import useDidMountEffect from '../../../../../hooks/useDidMountEffect'
import ViewMode, {defaultInputObj} from '../../../../../components/custom/ControlledInput';
import EditMode from './EditMode';
import inputTypes from '../../../../../constants/inputTypes'

const Inputitem = ({
  inputdata,
  onChangeHandler,
  deleteClick,
  order,
}) => {
  const [collapse, setCollapse] = useState(!inputdata.data?.name ||  false);
  const [mode, setMode] = useState('edit-mode');

  const editClick = () => {
    setMode('edit-mode');
    setCollapse(true);
  };

  const viewClick = () => {
    setMode('view-mode');
    setCollapse(true);
  };


  return (
    <Card className={`key d-flex mb-4 ${mode}`}>
      <div className="d-flex flex-grow-1 min-width-zero">
        <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
          <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
            <span className="heading-number d-inline-block">{order + 1}</span>
            {inputdata.data.name}
          </div>
        </div>
        <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
          {mode === 'view-mode' && (
            <Button
              outline
              color="theme-3"
              className="icon-button ml-1 edit-button"
              onClick={() => editClick()}
            >
              <i className="simple-icon-pencil" />
            </Button>
          )}
          {mode === 'edit-mode' && (
            <Button
              outline
              color="theme-3"
              className="icon-button ml-1 view-button no-border"
              onClick={() => viewClick()}
            >
              <i className="simple-icon-eye" />
            </Button>
          )}
          <Button
            outline
            color="theme-3"
            className={`icon-button ml-1 rotate-icon-click ${
              collapse ? 'rotate' : ''
            }`}
            onClick={() => setCollapse(!collapse)}
          >
            <i className="simple-icon-arrow-down" />
          </Button>

          <Button
            outline
            color="theme-3"
            className="icon-button ml-1"
            onClick={() => deleteClick(inputdata.id)}
          >
            <i className="simple-icon-ban" />
          </Button>
        </div>
      </div>

      <Collapse isOpen={collapse}>
        <div className="card-body pt-0">
          {mode === 'edit-mode' && (
            <div className="edit-mode">
               <EditMode
                inputData={inputdata}
                onChangeHandler={(type, updatedValue)=>{
                  let newState;
                  if(type === 'type'){
                    if(updatedValue.id === 1){
                      newState = {...inputdata,data:{...inputdata.data,value:''}, type: updatedValue}
                    } else {
                     const options =  inputdata.data.options.length === 0 ? [defaultInputObj({name:'new Field'})] : inputdata.data.options
                     newState = {...inputdata,data:{...inputdata.data,options,}, type: updatedValue}
                    }
                  }else{
                    newState = {...inputdata,data:{...inputdata.data, [type]: updatedValue}}
                  }
                  onChangeHandler(newState)
                }
                }
              />
            </div>
          )}
          {mode === 'view-mode' && (
            <div className="view-mode">
              <FormGroup>
                <Label htmlFor={`inpuKey__${inputdata.id}`} >{inputdata.data.name}</Label>
                <ViewMode
                  inputData={inputdata}
                  onChangeHandler={(inputEle, updatedValue) => {
                    onChangeHandler({...inputEle,data:{...inputEle.data,value:updatedValue}})
                  }
                }
                />
     
              </FormGroup>
            </div>
          )}
        </div>
      </Collapse>
    </Card>
  );
};
export default Inputitem
