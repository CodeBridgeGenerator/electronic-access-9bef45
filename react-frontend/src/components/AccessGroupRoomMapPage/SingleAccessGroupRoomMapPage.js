import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";


const SingleAccessGroupRoomMapPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [accessGroupID, setAccessGroupID] = useState([]);
const [roomID, setRoomID] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("accessGroupRoomMap")
            .get(urlParams.singleAccessGroupRoomMapId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"accessGroupID","roomID"] }})
            .then((res) => {
                set_entity(res || {});
                const accessGroupID = Array.isArray(res.accessGroupID)
            ? res.accessGroupID.map((elem) => ({ _id: elem._id, accessGroupID: elem.accessGroupID }))
            : res.accessGroupID
                ? [{ _id: res.accessGroupID._id, accessGroupID: res.accessGroupID.accessGroupID }]
                : [];
        setAccessGroupID(accessGroupID);
const roomID = Array.isArray(res.roomID)
            ? res.roomID.map((elem) => ({ _id: elem._id, roomID: elem.roomID }))
            : res.roomID
                ? [{ _id: res.roomID._id, roomID: res.roomID.roomID }]
                : [];
        setRoomID(roomID);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "AccessGroupRoomMap", type: "error", message: error.message || "Failed get accessGroupRoomMap" });
            });
    }, [props,urlParams.singleAccessGroupRoomMapId]);


    const goBack = () => {
        navigate("/accessGroupRoomMap");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">AccessGroupRoomMap</h3>
                </div>
                <p>accessGroupRoomMap/{urlParams.singleAccessGroupRoomMapId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">IsGrantedAccess</label><p className="m-0 ml-3" ><i id="isGrantedAccess" className={`pi ${_entity?.isGrantedAccess?"pi-check": "pi-times"}`}  ></i></p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">AccessGroupID</label>
                    {accessGroupID.map((elem) => (
                        <Link key={elem._id} to={`/accessGroups/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.accessGroupID}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm">RoomID</label>
                    {roomID.map((elem) => (
                        <Link key={elem._id} to={`/rooms/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.roomID}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleAccessGroupRoomMapPage);
