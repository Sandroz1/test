import { useContext, useState, useCallback } from 'react';
import { UserContext, type UserContextType } from '../../entities/user/model/UserContext';
import ConfirmationDialog from '../../shared/ui/ConfirmationDialog';
import { AddUserButton } from '../../features/add-user/ui/AddUserButton';
import { UserFilters } from '../../features/filter-users/ui/UserFilters';
import { UserTable } from '../../widgets/user-table/UserTable';
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
            <div className="p-4 rounded-lg max-w-full overflow-x-auto bg-white border border-gray-200 shadow-sm">
                <div
                    className={`flex flex-wrap gap-2 mb-3 rounded px-2 py-2 items-center min-h-[48px] ${numSelected > 0 ? 'bg-gray-100 text-gray-800' : ''}`}
                >
                    {numSelected > 0 ? (
                        <span className="flex-1 flex items-center font-medium text-base">{numSelected} выбрано</span>
                    ) : (
                        <div className="flex-1 flex items-center">
                            <span className="text-base font-semibold" id="tableTitle">Список пользователей</span>
                            <button
                                type="button"
                                onClick={onShowWelcome}
                                className="ml-2 p-1 rounded hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                title="Показать экран приветствия"
                            >
                                <InfoOutlinedIcon fontSize="small" />
                            </button>
                        </div>
                    )}
                    {numSelected > 0 ? (
                        <button
                            className="bg-red-100 hover:bg-red-200 text-red-800 font-medium rounded-lg px-4 py-2 text-sm border border-red-200 shadow hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                            onClick={() => setOpenDialog(true)}
                        >
                            Удалить
                        </button>
                    ) : (
                        <AddUserButton />
                    )}
                </div>
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
            </div>
            <ConfirmationDialog open={openDialog} onClose={() => setOpenDialog(false)} onConfirm={handleDelete} />
        </>
    );
};

export default UserListPage;