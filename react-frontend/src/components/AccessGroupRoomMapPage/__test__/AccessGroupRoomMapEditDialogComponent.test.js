import React from "react";
import { render, screen } from "@testing-library/react";

import AccessGroupRoomMapEditDialogComponent from "../AccessGroupRoomMapEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders accessGroupRoomMap edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AccessGroupRoomMapEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("accessGroupRoomMap-edit-dialog-component")).toBeInTheDocument();
});
