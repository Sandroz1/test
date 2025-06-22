import { useState } from 'react';
import { Button } from '@mui/material';
import { UserForm } from '../../../widgets/user-form/UserForm';
import { motion } from 'framer-motion';

export const AddUserButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            whiteSpace: 'nowrap',
            minWidth: 'fit-content',
            paddingX: 2,
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            color: 'white',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          }}
        >
          Добавить пользователя
        </Button>
      </motion.div>
      <UserForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};
