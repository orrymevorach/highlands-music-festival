import styles from './past-lineup-dropdown.module.scss';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import clsx from 'clsx';

export default function PastLineupDropdown({ year, setYear, classNames = '' }) {
  return (
    <FormControl
      hiddenLabel
      fullWidth
      className={clsx(styles.dropdown, classNames)}
    >
      <InputLabel id="demo-simple-select-label">See past lineups</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={year}
        label="Age"
        onChange={e => setYear(e.target.value)}
      >
        <MenuItem value={2022}>2022</MenuItem>
        <MenuItem value={''}>Reset</MenuItem>
      </Select>
    </FormControl>
  );
}
