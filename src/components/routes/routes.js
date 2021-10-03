import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Phones from '../Phones';
import AddSmartphone from '../AddSmartphone';
import EditSmartphone from "../EditSmartphone";

const Routes = () => {
  return(
    <BrowserRouter>
      <Route component={Phones} path={'/'} exact />
      <Route component={AddSmartphone} path={'/add'} />
      <Route component={EditSmartphone} path={`/edit`} />
    </BrowserRouter>
  )
}

export default Routes;