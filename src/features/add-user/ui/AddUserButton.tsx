import { useState } from 'react';
import { UserForm } from '../../../widgets/user-form/UserForm';
import { motion } from 'framer-motion';

export const AddUserButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="whitespace-nowrap min-w-fit px-4 py-2 text-sm font-medium rounded-lg border border-blue-200 bg-blue-100 text-blue-900 shadow hover:bg-blue-200 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Добавить пользователя
        </button>
      </motion.div>
      <UserForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};
