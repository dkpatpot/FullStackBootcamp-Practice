import React from "react";
function Footer(){
    const newDate = new Date();
    const currentYear = newDate.getFullYear();
    return <footer><p>copyright © {currentYear}</p></footer>
}
export default Footer;