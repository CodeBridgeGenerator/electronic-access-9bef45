import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const AccessGroupRoomMapCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [accessGroupID, setAccessGroupID] = useState([])
const [roomID, setRoomID] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount accessGroups
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
                    //on mount rooms
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

    const onSave = async () => {
        let _data = {
            accessGroupID: _entity?.accessGroupID?._id,
roomID: _entity?.roomID?._id,
isGrantedAccess: _entity?.isGrantedAccess,
        };

        setLoading(true);
        try {
            
        await client.service("accessGroupRoomMap").patch(_entity._id, _data);
        const eagerResult = await client
            .service("accessGroupRoomMap")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "accessGroupID",
                    service : "accessGroups",
                    select:["accessGroupID"]},{
                    path : "roomID",
                    service : "rooms",
                    select:["roomID"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info accessGroupRoomMap updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

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
        <Dialog header="Edit AccessGroupRoomMap" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="accessGroupRoomMap-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="accessGroupID">AccessGroupID:</label>
            <Dropdown id="accessGroupID" value={_entity?.accessGroupID?._id} optionLabel="name" optionValue="value" options={accessGroupIDOptions} onChange={(e) => setValByKey("accessGroupID", {_id : e.value})}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="roomID">RoomID:</label>
            <Dropdown id="roomID" value={_entity?.roomID?._id} optionLabel="name" optionValue="value" options={roomIDOptions} onChange={(e) => setValByKey("roomID", {_id : e.value})}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="isGrantedAccess">IsGrantedAccess:</label>
            <InputSwitch id="isGrantedAccess" className="ml-3" checked={_entity?.isGrantedAccess} onChange={ (e) => setValByKey("isGrantedAccess", e.value)}  />
        </span>
        </div>
                <div className="col-12">&nbsp;</div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="created At:"></Tag>{" " + moment(_entity?.createdAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="created By:"></Tag>{" " +_entity?.createdBy?.name}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="last Updated At:"></Tag>{" " + moment(_entity?.updatedAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="last Updated By:"></Tag>{" " +_entity?.updatedBy?.name}</p></div>
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
