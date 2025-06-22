import { TextField, Box } from '@mui/material';
import type { FilterField } from '../../../shared/types/types';
import { motion } from 'framer-motion';

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
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
            <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }} style={{ flex: 1 }}>
                <TextField
                    label="Фильтр по имени"
                    value={filter.name}
                    onChange={(e) => setFilter('name', e.target.value)}
                    variant="filled"
                    size="small"
                    fullWidth
                    sx={{
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            transition: 'background-color 0.3s',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            }
                        }
                    }}
                />
            </motion.div>
            <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }} style={{ flex: 1 }}>
                <TextField
                    label="Фильтр по email"
                    value={filter.email}
                    onChange={(e) => setFilter('email', e.target.value)}
                    variant="filled"
                    size="small"
                    fullWidth
                     sx={{
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            transition: 'background-color 0.3s',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            }
                        }
                    }}
                />
            </motion.div>
            <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }} style={{ flex: 1 }}>
                <TextField
                    label="Фильтр по телефону"
                    value={filter.phone}
                    onChange={(e) => setFilter('phone', e.target.value)}
                    variant="filled"
                    size="small"
                    fullWidth
                     sx={{
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            transition: 'background-color 0.3s',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            }
                        }
                    }}
                />
            </motion.div>
        </Box>
    );
};