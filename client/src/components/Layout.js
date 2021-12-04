import React from "react";
import { makeStyles, Paper } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { SubjectOutlined, AddCircleOutlineOutlined } from "@material-ui/icons";
import RepeatIcon from "@material-ui/icons/Repeat";
import { useHistory, useLocation } from "react-router";
import TypographyLayout from "./TypographyLayout";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core";

export default function Layout({ children }) {
  const drawerWidth = 240;

  const useStyles = makeStyles({
    main: {
      display: "flex",
    },

    page: {
      background: "#f9f9f9",
      width: "100%",
    },

    drawer: {
      width: drawerWidth,
      display: "flex",
      flexDirection: "column",
    },
    drawerPaper: {
      width: drawerWidth,
    },

    active: {
      background: "#f4f4f4",
    },

    list: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    listitem: {
      flex: "1",
    },
  });

  const menuItems = [
    {
      text: "Add Students Profile",
      icon: <AddCircleOutlineOutlined color="primary" />,
      path: "/",
    },
    {
      text: "Students List",
      icon: <SubjectOutlined color="primary" />,
      path: "/studentsList",
    },
    {
      text: "Add Results",
      icon: <AddCircleOutlineOutlined color="primary" />,
      path: "/addResults",
    },
    {
      text: "Show Marks",
      icon: <SubjectOutlined color="primary" />,
      path: "/seeMarks",
    },
    {
      text: "Charts",
      icon: <SubjectOutlined color="primary" />,
      path: "/charts",
    },
    {
      text: "Generate PDF",
      icon: <SubjectOutlined color="primary" />,
      path: "/generatePdf",
    }
  ];

  const classes = useStyles();
  const history = useHistory();
  const loc = useLocation();
  return (
    <div className={classes.main}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <List className={classes.list}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={loc.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>
                <TypographyLayout text={item.text} />
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>{children}</div>
    </div>
  );
}
