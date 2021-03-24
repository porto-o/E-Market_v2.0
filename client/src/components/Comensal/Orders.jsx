import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function PreOrders(){
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar src="https://i.blogs.es/11ae6f/pozole-verde-con-pollo-receta-comida-mexicana/1366_2000.jpg">
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Pozole" secondary="$80" />
        <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <Icon>delete_circle</Icon>
              </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar src="https://i.blogs.es/8e3e94/tacos-suadero-la-vicenta-1/1366_2000.jpg">
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Tacos" secondary="$20" />
        <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <Icon>delete_circle</Icon>
              </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar src="https://www.superama.com.mx/views/micrositio/recetas/images/parrillas/ribeyeconsalsadecerveza/Web_fotoreceta.jpg">
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Rib-eye" secondary="$200" />
        <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <Icon>delete_circle</Icon>
              </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Button variant="contained" color="secondary">
        Ordenar
      </Button>
    </List>

  );
}

export function Orders () {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar src="https://i.blogs.es/11ae6f/pozole-verde-con-pollo-receta-comida-mexicana/1366_2000.jpg">
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Pozole" secondary="$80" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar src="https://i.blogs.es/8e3e94/tacos-suadero-la-vicenta-1/1366_2000.jpg">
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Tacos" secondary="$20" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar src="https://www.superama.com.mx/views/micrositio/recetas/images/parrillas/ribeyeconsalsadecerveza/Web_fotoreceta.jpg">
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Rib-eye" secondary="$200" />
      </ListItem>
    </List>

  );
}

export function PayList () {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemText primary="Pozole" secondary="$80" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Tacos" secondary="$20" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Rib-eye" secondary="$200" />
      </ListItem>
      <hr></hr>
      <ListItem>
        <ListItemText primary="Total" secondary="$300" />
      </ListItem>
    </List>

  );
}