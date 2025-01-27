import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

// Dummy user data
const dummyUsers = [
  { id: '1', username: 'UserOne' },
  { id: '2', username: 'UserTwo' },
  { id: '3', username: 'UserThree' },
];

const UserList = ({ onSelectUser }) => {
  return (
    <List>
      {dummyUsers.map((user) => (
        <React.Fragment key={user.id}>
          <ListItem button onClick={() => onSelectUser(user)}>
            <ListItemText primary={user.username} />
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default UserList;
