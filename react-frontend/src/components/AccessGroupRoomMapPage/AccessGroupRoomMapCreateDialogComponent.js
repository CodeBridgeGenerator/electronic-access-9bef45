import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const AccessGroupRoomMapCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [accessGroupID, setAccessGroupID] = useState([])
const [roomID, setRoomID] = useState([])

    useEffect(() => {
        let init  = {isGrantedAccess: false};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [accessGroupID,roomID], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            accessGroupID: _entity?.accessGroupID?._id,roomID: _entity?.roomID?._id,isGrantedAccess: _entity?.isGrantedAccess || false,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("accessGroupRoomMap").create(_data);
        const eagerResult = await client
            .service("accessGroupRoomMap")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "accessGroupID",
                    service : "accessGroups",
                    select:["accessGroupID"]},{
                    path : "roomID",
                    service : "rooms",
                    select:["roomID"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info AccessGroupRoomMap updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in AccessGroupRoomMap" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount accessGroups
                    client
                        .service("accessGroups")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleAccessGroupsId } })
                        .then((res) => {
                            setAccessGroupID(res.data.map((e) => { return { name: e['accessGroupID'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "AccessGroups", type: "error", message: error.message || "Failed get accessGroups" });
                        });
                }, []);

useEffect(() => {
                    // on mount rooms
                    client
                        .service("rooms")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleRoomsId } })
                        .then((res) => {
                            setRoomID(res.data.map((e) => { return { name: e['roomID'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Rooms", type: "error", message: error.message || "Failed get rooms" });
                        });
                }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const accessGroupIDOptions = accessGroupID.map((elem) => ({ name: elem.name, value: elem.value }));
const roomIDOptions = roomID.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create AccessGroupRoomMap" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="accessGroupRoomMap-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="accessGroupID">AccessGroupID:</label>
                <Dropdown id="accessGroupID" value={_entity?.accessGroupID?._id} optionLabel="name" optionValue="value" options={accessGroupIDOptions} onChange={(e) => setValByKey("accessGroupID", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["accessGroupID"]) ? (
              <p className="m-0" key="error-accessGroupID">
                {error["accessGroupID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="roomID">RoomID:</label>
                <Dropdown id="roomID" value={_entity?.roomID?._id} optionLabel="name" optionValue="value" options={roomIDOptions} onChange={(e) => setValByKey("roomID", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["roomID"]) ? (
              <p className="m-0" key="error-roomID">
                {error["roomID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex mt-5">
            <span className="align-items-center">
                <label htmlFor="isGrantedAccess">IsGrantedAccess:</label>
                <InputSwitch id="isGrantedAccess" className="ml-3" checked={_entity?.isGrantedAccess} onChange={ (e) => setValByKey("isGrantedAccess", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["isGrantedAccess"]) ? (
              <p className="m-0" key="error-isGrantedAccess">
                {error["isGrantedAccess"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(AccessGroupRoomMapCreateDialogComponent);
