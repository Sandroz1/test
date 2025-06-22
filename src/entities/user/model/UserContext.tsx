import { createContext, useState, useEffect, type ReactNode, useCallback, useMemo } from 'react';
import axios from 'axios'; // Import axios
import type { User, SortField, FilterField } from '../../../shared/types/types';
import { useDebounce } from '../../../shared/lib/hooks/useDebounce';

export interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUsers: number[];
  sort: { field: SortField; order: 'asc' | 'desc' };
  filter: { name: string; email: string; phone: string };
  addUser: (newUser: Omit<User, 'id' | 'photo'> & { photo?: string }) => Promise<void>;
  deleteUsers: (ids: number[]) => Promise<void>;
  toggleSelect: (id: number) => void;
  setSort: (field: SortField, order: 'asc' | 'desc') => void;
  setFilter: (field: FilterField, value: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [sort, setSortState] = useState<{ field: SortField; order: 'asc' | 'desc' }>({ field: 'name', order: 'asc' });
  const [filter, setFilter] = useState<{ name: string; email: string; phone: string }>({ name: '', email: '', phone: '' });

  // Уменьшаем задержку debounce для более быстрого отклика
  const debouncedFilter = useDebounce(filter, 200);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (debouncedFilter.name) params.append('name', debouncedFilter.name);
      if (debouncedFilter.email) params.append('email', debouncedFilter.email);
      if (debouncedFilter.phone) params.append('phone', debouncedFilter.phone);
      params.append('sortBy', sort.field);
      params.append('order', sort.order);

      const response = await axios.get(`https://672885dc270bd0b97555ee35.mockapi.io/users`, { params });
      setUsers(response.data);
    } catch (err) {
      setError('Не удалось загрузить пользователей');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [sort, debouncedFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = useCallback(async (newUser: Omit<User, 'id' | 'photo'> & { photo?: string }) => {
    try {
      await axios.post('https://672885dc270bd0b97555ee35.mockapi.io/users', newUser);
      fetchUsers();
    } catch (err) {
      setError('Не удалось добавить пользователя');
      console.error(err);
      throw err;
    }
  }, [fetchUsers]);

  const deleteUsers = useCallback(async (ids: number[]) => {
    try {
      await Promise.all(
        ids.map((id) => axios.delete(`https://672885dc270bd0b97555ee35.mockapi.io/users/${id}`))
      );
      setSelectedUsers([]);
      fetchUsers();
    } catch (err) {
      setError('Не удалось удалить пользователей');
      console.error(err);
      throw err;
    }
  }, [fetchUsers]);

  const toggleSelect = useCallback((id: number) => {
    setSelectedUsers((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const handleFilterChange = useCallback((field: FilterField, value: string) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setSort = useCallback((field: SortField, order: 'asc' | 'desc') => {
    setSortState({ field, order });
  }, []);

  // Мемоизируем значение контекста для предотвращения лишних перерисовок
  const contextValue = useMemo(() => ({
    users,
    loading,
    error,
    selectedUsers,
    sort,
    filter,
    addUser,
    deleteUsers,
    toggleSelect,
    setSort,
    setFilter: handleFilterChange,
  }), [users, loading, error, selectedUsers, sort, filter, addUser, deleteUsers, toggleSelect, setSort, handleFilterChange]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};