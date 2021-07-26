import Image from 'next/image'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import styled from "styled-components";
import DeliveryImage from "../public/delivery-center.png";

const NavBar = styled(AppBar)`
  flex-grow: 1;
  background-color: #d47855 !important;
  margin-bottom: 1em;
`;

const Title = styled(Typography)`
  flex-grow: 1;
  color: #fdf9f9;
`;

export default function TopBar() {
  return (
    <div>
      <NavBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Title variant="h6">Pedidos</Title>
          <Button color="inherit"><Image src={DeliveryImage} alt="Delivery Center" height={46} width={208} /></Button>
        </Toolbar>
      </NavBar>
    </div>
  );
}
