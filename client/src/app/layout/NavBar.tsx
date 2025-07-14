
import { Group } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Box, Container, MenuItem } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";


export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        backgroundImage: 'linear-gradient(135deg, #182a73, #218aae, #20a7ac)'
        }}>
          <Container maxWidth={false}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <MenuItem component={NavLink} to='/' sx={{display: 'flex', gap: 2 }}>
                  <Group fontSize="large" />
                  <Typography variant="h4" fontWeight="bold">Reactivities</Typography>
                </MenuItem>
              </Box>
              <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                <MenuItemLink to='/activities' >
                  Activities
                </MenuItemLink>
                <MenuItemLink to='/create-activity'>
                  Create Activity
                </MenuItemLink>
              </Box>
              <MenuItem>
                User menu
              </MenuItem>
            </Toolbar>
          </Container>
      </AppBar>
    </Box>
  );
}
