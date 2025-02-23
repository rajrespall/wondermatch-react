import { Box, Switch, Modal, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useSettings } from '../context/SettingsContext'

const Settings = ({ open, onClose }) => {
    const { settings, toggleSoundEffects, toggleBackgroundMusic } = useSettings()

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="settings-modal"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" component="h2" gutterBottom>
          Settings
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography>Sound Effects</Typography>
            <Switch 
              checked={settings.soundEffects}
              onChange={toggleSoundEffects}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>Background Music</Typography>
            <Switch 
              checked={settings.backgroundMusic}
              onChange={toggleBackgroundMusic}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default Settings