import { useContext, useState, useCallback } from 'react';
import { UserContext, type UserContextType } from '../../entities/user/model/UserContext';
import ConfirmationDialog from '../../shared/ui/ConfirmationDialog';
import { AddUserButton } from '../../features/add-user/ui/AddUserButton';
import { UserFilters } from '../../features/filter-users/ui/UserFilters';
import { UserTable } from '../../widgets/user-table/UserTable';
import { Box, Paper, Typography, Toolbar, Button, alpha, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSnackbar } from 'notistack';

interface UserListPageProps {
  onShowWelcome: () => void;
}

const UserListPage: React.FC<UserListPageProps> = ({ onShowWelcome }) => {
    const {
        users,
        loading,
        error,
        sort,
        setSort,
        filter,
        setFilter,
        selectedUsers,
        deleteUsers,
        toggleSelect,
    } = useContext(UserContext) as UserContextType;

    const [openDialog, setOpenDialog] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleDelete = useCallback(async () => {
        try {
            await deleteUsers(selectedUsers);
            enqueueSnackbar('Пользователи удалены', { variant: 'success' });
        } catch {
            enqueueSnackbar('Ошибка при удалении пользователей', { variant: 'error' });
        } finally {
            setOpenDialog(false);
        }
    }, [deleteUsers, selectedUsers, enqueueSnackbar]);

    const handleSelectAllClick = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = users.map((n) => n.id);
            newSelecteds.forEach((id) => {
                if (!selectedUsers.includes(id)) {
                    toggleSelect(id);
                }
            });
            return;
        }
        selectedUsers.forEach((id) => toggleSelect(id));
    }, [users, selectedUsers, toggleSelect]);

    const numSelected = selectedUsers.length;

    return (
        <>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        mb: 2,
                        borderRadius: 1,
                        ...(numSelected > 0 && {
                            bgcolor: (theme) =>
                                alpha(theme.palette.primary.main, 0.15),
                            color: 'primary.main'
                        }),
                    }}
                >
                    {numSelected > 0 ? (
                        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                            {numSelected} выбрано
                        </Typography>
                    ) : (
                        <Box sx={{ flex: '1 1 100%', display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h6" id="tableTitle" component="div">
                                Список пользователей
                            </Typography>
                            <Tooltip title="Показать экран приветствия">
                                <IconButton onClick={onShowWelcome} size="small" sx={{ ml: 1 }}>
                                    <InfoOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                    {numSelected > 0 ? (
                        <Button variant="contained" color="error" onClick={() => setOpenDialog(true)}>
                            Удалить
                        </Button>
                    ) : (
                        <AddUserButton />
                    )}
                </Toolbar>
                <UserFilters filter={filter} setFilter={setFilter} />
                <UserTable
                    users={users}
                    loading={loading}
                    error={error}
                    sort={sort}
                    setSort={setSort}
                    selectedUsers={selectedUsers}
                    toggleSelect={toggleSelect}
                    handleSelectAllClick={handleSelectAllClick}
                />
            </Paper>
            <ConfirmationDialog open={openDialog} onClose={() => setOpenDialog(false)} onConfirm={handleDelete} />
        </>
    );
};

export default UserListPage;