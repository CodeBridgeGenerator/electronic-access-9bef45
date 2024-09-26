import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";
import UsersPage from "../UsersPage/UsersPage";
import AccessGroupRoomMapPage from "../AccessGroupRoomMapPage/AccessGroupRoomMapPage";


const SingleAccessGroupsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("accessGroups")
            .get(urlParams.singleAccessGroupsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "AccessGroups", type: "error", message: error.message || "Failed get accessGroups" });
            });
    }, [props,urlParams.singleAccessGroupsId]);


    const goBack = () => {
        navigate("/accessGroups");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">AccessGroups</h3>
                </div>
                <p>accessGroups/{urlParams.singleAccessGroupsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">AccessGroupID</label><p className="m-0 ml-3" >{Number(_entity?.accessGroupID)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Group Name</label><p className="m-0 ml-3" >{_entity?.groupName}</p></div>
            

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        <UsersPage/>
<AccessGroupRoomMapPage/>
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

export default connect(mapState, mapDispatch)(SingleAccessGroupsPage);
