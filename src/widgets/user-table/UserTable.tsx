import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Checkbox,
  TableContainer,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { UserItem } from '../../entities/user/ui/UserItem';
import type { SortField,User } from '../../shared/types/types';

interface UserTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
  sort: { field: SortField; order: 'asc' | 'desc' };
  setSort: (field: SortField, order: 'asc' | 'desc') => void;
  selectedUsers: number[];
  toggleSelect: (id: number) => void;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  error,
  sort,
  setSort,
  selectedUsers,
  toggleSelect,
  handleSelectAllClick,
}) => {
  const handleSort = (field: SortField) => {
    const isAsc = sort.field === field && sort.order === 'asc';
    setSort(field, isAsc ? 'desc' : 'asc');
  };

  const rowCount = users.length;
  const numSelected = selectedUsers.length;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 600 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 600 }}>
        <Typography color="error">Ошибка: {error}</Typography>
      </Box>
    );
  }

  if (users.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 600 }}>
        <Typography>Пользователи не найдены.</Typography>
      </Box>
    );
  }

  return (
    <TableContainer sx={{ height: 600, width: '100%', overflowX: 'auto', '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '4px' } }}>
      <Table stickyHeader sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow sx={{
            '& .MuiTableCell-root': {
                fontWeight: 'bold',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(5px)',
            }
          }}>
            <TableCell padding="checkbox" sx={{ width: '60px', display: { xs: 'none', sm: 'table-cell' } }}>
              <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={handleSelectAllClick}
                slotProps={{
                  input: { 'aria-label': 'select all users' },
                }}
              />
            </TableCell>
            <TableCell sx={{ width: '80px' }}>Фото</TableCell>
            <TableCell sx={{ width: { xs: '40%', md: '20%' } }} sortDirection={sort.field === 'name' ? sort.order : false}>
              <TableSortLabel
                active={sort.field === 'name'}
                direction={sort.field === 'name' ? sort.order : 'asc'}
                onClick={() => handleSort('name')}
              >
                Имя
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ width: { xs: '30%', md: '15%' }, display: { xs: 'none', sm: 'table-cell' } }}>
              Имя пользователя
            </TableCell>
            <TableCell sx={{ width: { xs: '30%', md: '25%' } }}>Email</TableCell>
            <TableCell sx={{ width: { xs: '30%', md: '15%' }, display: { xs: 'none', sm: 'table-cell' } }}>
              Телефон
            </TableCell>
            <TableCell sx={{ width: { xs: '20%', md: '10%' }, display: { xs: 'none', md: 'table-cell' } }} sortDirection={sort.field === 'zipcode' ? sort.order : false}>
              <TableSortLabel
                active={sort.field === 'zipcode'}
                direction={sort.field === 'zipcode' ? sort.order : 'asc'}
                onClick={() => handleSort('zipcode')}
              >
                Индекс
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              isSelected={selectedUsers.includes(user.id)}
              onToggleSelect={toggleSelect}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};