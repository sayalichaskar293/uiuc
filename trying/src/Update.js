import { Accordion, AccordionDetails, AccordionSummary, Box, Button, List, ListItem, MenuItem, Slider, Switch, TextField, Typography } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const currencies = ['Links', 'Total link strength', 'Documents', 'Citations', 'Norm.citations'];

const Update = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box>
        <List style={{ textAlign: 'center', display: 'block', padding: '3%' }}>
  <ListItem style={{ display: 'block', textAlign: 'center' }} disablePadding alignItems='center'>
    <Typography fontWeight={'bold'}>Rotate / Flip</Typography>
    <Box mt='5%'>
    <TextField
          id="outlined-required"
          defaultValue="90"
          variant="standard"
          label='Degrees to rotate'
          fullWidth
  />
    </Box>
    <Box display='flex' flexDirection={'column'} mb='10%'>
      <Button variant="outlined" style={{marginTop: '5%'}}>Rotate</Button>
      <Button variant="outlined" style={{margin: '5% 0%'}}>Flip Horizontally</Button>
      <Button variant="outlined">Flip Vertically</Button>
    </Box>
  </ListItem>
  <ListItem style={{ display: 'block', textAlign: 'center' }} disablePadding>
    <Typography fontWeight={'bold'}>Normalization</Typography>
    <Box mt={'4%'}>
    <TextField
          select
          label="Normalization method"
          defaultValue="Documents"
          variant="standard"
          margin='1%'
          fullWidth
          style={{textAlign: 'left'}}
        >
          {currencies.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
    </Box>
  </ListItem>
  <ListItem style={{ display: 'block', textAlign: 'center', marginTop: 20 }} disablePadding alignItems='center'>
    <Typography fontWeight={'bold'}>Layout</Typography>
    <Box mt='5%'>
    <TextField
          id="outlined-required"
          defaultValue="2"
          variant="standard"
          label='Attraction'
          fullWidth
          type='number'
  />
    </Box>
    <Box mt='5%'>
    <TextField
          id="outlined-required"
          defaultValue="1"
          variant="standard"
          label='Repulsion'
          fullWidth
          type='number'
  />
    </Box>
    <Box mt='5%'>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Advance Parameters</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box mt='5%'>
          <TextField
                id="outlined-required"
                defaultValue="1"
                variant="standard"
                label='Repulsion'
                fullWidth
                type='number'
        />
        </Box>
        <Box mt='5%'>
    <TextField
          id="outlined-required"
          defaultValue="1"
          variant="standard"
          label='Random starts'
          fullWidth
          type='number'
  />
    </Box>
    <Box mt='5%'>
    <TextField
          id="outlined-required"
          defaultValue="1"
          variant="standard"
          label='Maximum iterations'
          fullWidth
          type='number'
  />
    </Box>
    <Box mt='5%'>
    <TextField
          id="outlined-required"
          defaultValue="1"
          variant="standard"
          label='Initial step size'
          fullWidth
          type='number'
  />
    </Box>
    <Box mt='5%'>
    <TextField
          id="outlined-required"
          defaultValue="1"
          variant="standard"
          label='Step size reduction'
          fullWidth
          type='number'
  />
    </Box>
    <Box mt='5%'>
    <TextField
          id="outlined-required"
          defaultValue="1"
          variant="standard"
          label='Step size convergence'
          fullWidth
          type='number'
  />
    </Box>
    <Box mt='5%'>
    <TextField
          id="outlined-required"
          defaultValue="1"
          variant="standard"
          label='Random seed'
          fullWidth
          type='number'
  />
    </Box>
    <Box mt='5%' display={'flex'} justifyContent={'space-between'}>
    <Typography variant='body2' gutterBottom textAlign={'left'} mt='2%' fontSize={'13px'} color={'gray'}>
          Use Random seed
      </Typography>
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    </Box>
        </AccordionDetails>
      </Accordion>
      <Button variant="outlined" style={{margin: '5% 0%'}} fullWidth>Update Layout</Button>
    </Box>
  </ListItem>
  <ListItem style={{ display: 'block', textAlign: 'center', marginTop: 20 }} disablePadding alignItems='center'>
    <Typography fontWeight={'bold'}>Clustering</Typography>
    <Box mt='5%'>
    <TextField
          id="outlined-required"
          defaultValue="1"
          variant="standard"
          label='Resolution'
          fullWidth
          type='number'
  />
    </Box>
    <Box mt='5%'>
    <TextField
          id="outlined-required"
          defaultValue="1"
          variant="standard"
          label='Minimum cluster size'
          fullWidth
          type='number'
  />
    </Box>
    <Box mt='5%' display={'flex'} justifyContent={'space-between'}>
    <Typography variant='body2' gutterBottom textAlign={'left'} mt='2%' fontSize={'13px'} color={'gray'}>
          Merge small clusters
      </Typography>
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    </Box>
    <Box mt='5%'>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Advance Parameters</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box mt='5%'>
    <TextField
          id="outlined-required"
          defaultValue="1"
          variant="standard"
          label='Random starts'
          fullWidth
          type='number'
  />
    </Box>
    <Box mt='5%'>
    <TextField
          id="outlined-required"
          defaultValue="1"
          variant="standard"
          label='Iterations'
          fullWidth
          type='number'
  />
    </Box>
    <Box mt='5%'>
    <TextField
          id="outlined-required"
          defaultValue="1"
          variant="standard"
          label='Random seed'
          fullWidth
          type='number'
  />
    </Box>
    <Box mt='5%' display={'flex'} justifyContent={'space-between'}>
    <Typography gutterBottom textAlign={'left'} mt='2%' fontSize={'13px'} color={'gray'}>
          Use random seed
      </Typography>
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    </Box>
        </AccordionDetails>
      </Accordion>
      <Button variant="outlined" style={{margin: '5% 0%'}} fullWidth>Update Clustering</Button>
    </Box>
  </ListItem>
</List>
    </Box>
  )
}

export default Update