import styles from './submission-form.module.scss';
import { InputLabel, MenuItem, Select, TextareaAutosize } from '@mui/material';
import Input from '../input/input';

export default function GetFormElement({
  type,
  label,
  id,
  value,
  handleChange,
  dropdownItems = [],
  placeholder = '',
  minRows = 1,
  required = false,
}) {
  switch (type) {
    case 'dropdown':
      return (
        <div className={styles.formFieldContainer}>
          <InputLabel className={styles.inputLabel} id={id}>
            {label}
          </InputLabel>
          <Select
            required={required}
            id={`${id}-label`}
            value={value}
            className={styles.dropdown}
            onChange={e => handleChange(e.target.value)}
          >
            {dropdownItems.map(item => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      );
    case 'text':
      return (
        <div className={styles.formFieldContainer}>
          <InputLabel className={styles.inputLabel} id={id}>
            {label}
          </InputLabel>
          <Input
            handleChange={e => handleChange(e.target.value)}
            placeholder={placeholder}
            value={value}
            classNames={styles.input}
            required={required}
          />
        </div>
      );
    case 'textarea':
      return (
        <div className={styles.formFieldContainer}>
          <InputLabel className={styles.inputLabel} id={id}>
            {label}
          </InputLabel>
          <TextareaAutosize
            value={value}
            onChange={handleChange}
            minRows={minRows}
            className={styles.textarea}
            required={required}
          />
        </div>
      );
  }
}
