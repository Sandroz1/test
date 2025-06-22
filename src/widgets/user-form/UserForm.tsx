import { useState, useEffect, useContext, forwardRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  type InputBaseComponentProps,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { UserContext, type UserContextType } from '../../entities/user/model/UserContext';
import { IMaskInput } from 'react-imask';

interface UserFormProps {
  open: boolean;
  onClose: () => void;
}

const TextMaskCustom = forwardRef<HTMLElement, InputBaseComponentProps>(
  function TextMaskCustom(props, ref) {
    const { value, onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="+7 000 000-00-00"
        value={value as string}
        onAccept={(maskedValue: string) => {
          if (onChange) {
            onChange({
              target: { value: maskedValue },
            } as React.ChangeEvent<HTMLInputElement>);
          }
        }}
        inputRef={ref as React.Ref<HTMLInputElement>}
        overwrite
      />
    );
  }
);

export const UserForm: React.FC<UserFormProps> = ({ open, onClose }) => {
  const { addUser } = useContext(UserContext) as UserContextType;
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setName('');
      setUsername('');
      setEmail('');
      setPhone('');
      setZipcode('');
      setFormErrors({});
      setIsSubmitted(false);
    }
  }, [open]);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!name.trim()) errors.name = 'Имя обязательно';
    if (!username.trim()) errors.username = 'Имя пользователя обязательно';
    if (!email.trim()) {
      errors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Некорректный формат email';
    }
    if (!phone.trim()) {
      errors.phone = 'Телефон обязателен';
    } else if (!/^\+7 \d{3} \d{3}-\d{2}-\d{2}$/.test(phone)) {
      errors.phone = 'Формат: +7 999 999-99-99';
    }
    return errors;
  };

  useEffect(() => {
    if (isSubmitted) {
      setFormErrors(validate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, username, email, phone, isSubmitted]);

  const generateAvatarUrl = (name: string) => {
    const firstLetter = name.trim().charAt(0).toUpperCase() || 'U';
    return `https://dummyimage.com/100x100/000/fff&text=${firstLetter}`;
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      const photoUrl = generateAvatarUrl(name);
      await addUser({ name, username, email, phone, zipcode, photo: photoUrl });
      enqueueSnackbar('Пользователь добавлен', { variant: 'success' });
      onClose();
    } catch {
      enqueueSnackbar('Ошибка при добавлении пользователя', { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const hasErrors = Object.keys(formErrors).length > 0;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {open && (
        <>
          <DialogTitle>Добавить пользователя</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                fullWidth
                required
                variant="outlined"
                error={!!formErrors.name}
                helperText={formErrors.name || ' '}
                slotProps={{ htmlInput: { 'aria-required': true } }}
              />
              <TextField
                label="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                fullWidth
                required
                variant="outlined"
                error={!!formErrors.username}
                helperText={formErrors.username || ' '}
                slotProps={{ htmlInput: { 'aria-required': true } }}
              />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                fullWidth
                required
                type="email"
                variant="outlined"
                error={!!formErrors.email}
                helperText={formErrors.email || ' '}
                slotProps={{ htmlInput: { 'aria-required': true } }}
              />
              <FormControl fullWidth error={!!formErrors.phone} variant="outlined">
                <InputLabel htmlFor="phone-input">Телефон</InputLabel>
                <OutlinedInput
                  id="phone-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={handleKeyDown}
                  name="phone"
                  label="Телефон"
                  required
                  inputComponent={TextMaskCustom}
                />
                <FormHelperText>{formErrors.phone || ' '}</FormHelperText>
              </FormControl>
              <TextField
                label="Индекс"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                onKeyDown={handleKeyDown}
                fullWidth
                variant="outlined"
                helperText=" "
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} disabled={submitting}>
              Отмена
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={submitting || hasErrors}
            >
              Добавить
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};