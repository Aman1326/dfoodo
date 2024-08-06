import React from "react";
import menu from "../Assets/menu.png";
const Menu = () => {
  const menu_array = [menu, menu];
  return (
    <>
      <div className="menu_wrapper row">
        <div className="menu_wrapper_heading mt-2 mb-2">
          <h3>Restaurant Menu</h3>
        </div>
        <div className="menu_image_wrapper col-md-3 col-6">
          {menu_array.map((menu_img, idx) => (
            <img key={idx} src={menu_img} alt="menu_img" />
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;
