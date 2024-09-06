"use client"

import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '@/providers/ColorModeProvider';

export const ThemeToggle: React.FC = () => {
  const { toggleColorMode, mode } = useColorMode();

  return (
    <IconButton onClick={toggleColorMode} color="inherit" className="text-current">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};