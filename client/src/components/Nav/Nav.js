import React, { useEffect } from "react";
import { capitalizeFirstLetter } from "../../utils/helpers";
import {Home} from "../../pages/Home";


function Nav(props) {
 

  useEffect(() => {
    document.title = capitalizeFirstLetter(currentPage.name);
  }, [currentPage]);

  
}

export default Nav;
