import React from "react";
import { render, screen } from "@testing-library/react";

import AccessGroupRoomMapCreateDialogComponent from "../AccessGroupRoomMapCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders accessGroupRoomMap create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AccessGroupRoomMapCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("accessGroupRoomMap-create-dialog-component")).toBeInTheDocument();
});
