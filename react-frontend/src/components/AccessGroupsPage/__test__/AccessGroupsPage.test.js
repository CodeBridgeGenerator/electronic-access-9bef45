import React from "react";
import { render, screen } from "@testing-library/react";

import AccessGroupsPage from "../AccessGroupsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders accessGroups page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AccessGroupsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("accessGroups-datatable")).toBeInTheDocument();
    expect(screen.getByRole("accessGroups-add-button")).toBeInTheDocument();
});
