import { motion } from 'framer-motion';
import type { FilterField } from '../../../shared/types/types';

interface UserFiltersProps {
    filter: { name: string; email: string; phone: string };
    setFilter: (field: FilterField, value: string) => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({ filter, setFilter }) => {
    const fieldVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="flex flex-col md:flex-row gap-2 mb-3">
            <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="flex-1">
                <input
                    type="text"
                    placeholder="Фильтр по имени"
                    value={filter.name}
                    onChange={(e) => setFilter('name', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 focus:bg-blue-50 transition-all duration-200"
                />
            </motion.div>
            <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="flex-1">
                <input
                    type="text"
                    placeholder="Фильтр по email"
                    value={filter.email}
                    onChange={(e) => setFilter('email', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 focus:bg-blue-50 transition-all duration-200"
                />
            </motion.div>
            <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="flex-1">
                <input
                    type="text"
                    placeholder="Фильтр по телефону"
                    value={filter.phone}
                    onChange={(e) => setFilter('phone', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 focus:bg-blue-50 transition-all duration-200"
                />
            </motion.div>
        </div>
    );
};