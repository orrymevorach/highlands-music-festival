import styles from './past-lineup-dropdown.module.scss';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';

export default function PastLineupDropdown({ year, setYear }) {
  return (
    <FormControl hiddenLabel fullWidth className={styles.dropdown}>
      <InputLabel id="demo-simple-select-label">See past lineups</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={year}
        label="Age"
        onChange={e => setYear(e.target.value)}
      >
        <MenuItem value={2023}>2023</MenuItem>
        <MenuItem value={''}>Reset</MenuItem>
      </Select>
    </FormControl>
  );
}
