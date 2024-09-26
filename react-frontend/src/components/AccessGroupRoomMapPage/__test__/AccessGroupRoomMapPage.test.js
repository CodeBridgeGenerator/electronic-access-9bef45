import React from "react";
import { render, screen } from "@testing-library/react";

import AccessGroupRoomMapPage from "../AccessGroupRoomMapPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders accessGroupRoomMap page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AccessGroupRoomMapPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("accessGroupRoomMap-datatable")).toBeInTheDocument();
    expect(screen.getByRole("accessGroupRoomMap-add-button")).toBeInTheDocument();
});
