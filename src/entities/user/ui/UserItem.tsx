import { Checkbox, TableRow, TableCell, Avatar } from '@mui/material';
import type { User } from '../../../shared/types/types';
import { memo } from 'react';

interface UserItemProps {
  user: User;
  onToggleSelect: (id: number) => void;
  isSelected: boolean;
}

export const UserItem: React.FC<UserItemProps> = memo(({ user, onToggleSelect, isSelected }) => {
  return (
    <TableRow
      hover
      selected={isSelected}
    >
      <TableCell padding="checkbox" sx={{ width: '60px' }}>
        <Checkbox
          color="primary"
          checked={isSelected}
          onChange={() => onToggleSelect(user.id)}
        />
      </TableCell>
      <TableCell sx={{ width: '80px' }}>
        <Avatar src={user.photo} alt={user.name} sx={{ width: 40, height: 40 }} />
      </TableCell>
      <TableCell sx={{ width: '20%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {user.name}
      </TableCell>
      <TableCell sx={{ width: '15%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {user.username}
      </TableCell>
      <TableCell sx={{ width: '25%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {user.email}
      </TableCell>
      <TableCell sx={{ width: '15%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {user.phone}
      </TableCell>
      <TableCell sx={{ width: '10%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {user.zipcode}
      </TableCell>
    </TableRow>
  );
});
