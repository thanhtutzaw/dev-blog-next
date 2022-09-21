import { AccountCircle, Logout, NotificationsActive } from "@mui/icons-material";
import { AppBar, Avatar, Menu, Badge, Container, IconButton, Link, MenuItem, Toolbar, Tooltip, Typography, ListItem, ListItemIcon, Zoom, Grow, Fade, Collapse } from "@mui/material";
import { Box } from "@mui/system";
import jwtDecode from 'jwt-decode'
import { useEffect, useState } from "react";

declare const google: any

export default function Navbar({ User, setUser }: any) {

  let localUserData: any


  // const [User, setUser] = useState<any>(
  //   typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user")!)

  // );
const [Local, setLocal] = useState(false)
  const [Data, setData] = useState({});
  const [SettingEl, setSettingEl] = useState<null | HTMLElement>(null)
  const open = Boolean(SettingEl)

  function handleOpenSetting(e: React.MouseEvent<HTMLElement>) {
    setSettingEl(e.currentTarget)
  }

  function handleCloseSetting() {
    setSettingEl(null)
  }

  function login() {

    console.log('login')
    // console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleResponse,
    })
    window.google.accounts.id.prompt((noti: any) => {
      if (noti.isNotDisplayed()) {
        throw new Error("Try to clean cookit")
      }
    })
  }

  function signout() {
    console.log("signout");
    localStorage.removeItem("user");
    handleCloseSetting()
    setUser(null)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleResponse = (response: any) => {
    const userObject: any = jwtDecode(response.credential);
    if (userObject) {
      setData(userObject);
      console.log("add Data from signin handle");
      console.log(userObject)
    }
    localStorage.setItem("user", JSON.stringify(userObject));
    console.log("add local from signin handle");
    setUser(JSON.parse(localStorage.getItem('user')!))
    // setUser(localUserData && JSON.parse());
  };
  useEffect(() => {
    
      setLocal(true)
      console.log("Local",Local);

      if(localStorage.getItem('user')){
        setLocal(true)
      }
    

    if (localStorage.getItem('user') === null) {
      setUser(null);
      console.log(" local === null set user null");
    }
    else {
      // setUser(JSON.parse(localStorage.getItem("user")!))
    }
    if (!Data) {
      console.log("no Data");
      localStorage.removeItem("user");
      // setUser(null);
    }
    if (typeof window !== "undefined" && window.document) {
      const googleScript = document.createElement("script");
      googleScript.src = "https://accounts.google.com/gsi/client";
      googleScript.async = true;
      googleScript.defer = true;
      document.head.appendChild(googleScript);
    }
  }, [Data]);

if(!Local){
  return null;
}


  // if(!User){
  //   console.log(`user {${User}} before UI`)
  // }else{
  //   console.log(`user ${User.name}`);
  // }
  return (
    <AppBar>
      <Container maxWidth="lg" sx={{ px: 3 }}>
        {/* {Local === false && (<div>aaaaaaaaaaaaaaa</div>)} */}
        {/* {Local && (<div>{typeof User}</div>)} */}
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }} alignItems='center' justifyContent='center'>
            <Typography
              component='div' variant="h6" noWrap sx={{ color: 'inherit', flexGrow: 1, mr: 2, display: { md: 'flex' } }}
            >
              <Link underline='hover' href='/' sx={{ color: 'inherit' }}>
                devBlog
              </Link>
            </Typography>
            <Box sx={{ display: { md: 'flex' } }} >
              {!User && (<><IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
                onClick={login}
              >
                <AccountCircle sx={{ fontSize: 40 }} />
              </IconButton></>)}
              {User && (<><IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsActive />
                </Badge>
              </IconButton>
                <Tooltip title={User.name}>
                  <IconButton
                    onClick={handleOpenSetting}
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={open ? 'setting' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <Avatar
                      src={User.picture}
                      alt={User.name}
                    />
                  </IconButton>
                </Tooltip>
                <Collapse in={open} >
                  <Menu open={open} keepMounted id="setting"
                    onClose={handleCloseSetting}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    anchorEl={SettingEl}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    PaperProps={{
                      sx: {
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          mr: 1,
                          ml: -.5,
                        }
                      }
                    }}
                  >
                    <MenuItem>
                      <ListItemIcon>
                        <Avatar />
                      </ListItemIcon>
                      Dashboard
                    </MenuItem>

                    <MenuItem onClick={signout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </Collapse></>)}
              {/* {User ? (
                <>

                </>
              ) : (
                <>

                </>
              )} */}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >

  )
}