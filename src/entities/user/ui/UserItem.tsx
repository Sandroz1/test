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
      <TableCell padding="checkbox" sx={{ width: '60px', display: { xs: 'none', sm: 'table-cell' } }}>
        <Checkbox
          color="primary"
          checked={isSelected}
          onChange={() => onToggleSelect(user.id)}
        />
      </TableCell>
      <TableCell sx={{ width: '80px' }}>
        <Avatar src={user.photo} alt={user.name} sx={{ width: 40, height: 40 }} />
      </TableCell>
      <TableCell sx={{ width: { xs: '40%', md: '20%' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: { xs: 'normal', md: 'nowrap' } }}>
        {user.name}
      </TableCell>
      <TableCell sx={{ width: { xs: '30%', md: '15%' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: { xs: 'normal', md: 'nowrap' }, display: { xs: 'none', sm: 'table-cell' } }}>
        {user.username}
      </TableCell>
      <TableCell sx={{ width: { xs: '30%', md: '25%' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: { xs: 'normal', md: 'nowrap' } }}>
        {user.email}
      </TableCell>
      <TableCell sx={{ width: { xs: '30%', md: '15%' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: { xs: 'normal', md: 'nowrap' }, display: { xs: 'none', sm: 'table-cell' } }}>
        {user.phone}
      </TableCell>
      <TableCell sx={{ width: { xs: '20%', md: '10%' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: { xs: 'normal', md: 'nowrap' }, display: { xs: 'none', md: 'table-cell' } }}>
        {user.zipcode}
      </TableCell>
    </TableRow>
  );
});
