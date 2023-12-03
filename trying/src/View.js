import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, MenuItem, Slider, Switch, TextField, Typography } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext } from "react";
import  GameStateContext  from "./Context/useContext";



const currencies = ['Links', 'Total link strength', 'Documents', 'Citations', 'Norm.citations'];

const View = () => {
  const [checked, setChecked] = React.useState(true);

  const {
    search,
        setSearch,
        currentItemSize,
        setItemSize,
        currentLinkSize,
        setLinkSize,
        curvedLinks, 
        setCurvedLinks
  } = useContext(GameStateContext);
  
  const handleItemSizeChange = (event, newValue) => {
    setItemSize(newValue);
  };
  const handleLinkSizeChange = (event, newValue) => {
    setLinkSize(newValue);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleToggleCurvature = () => {
    setCurvedLinks(!curvedLinks);
  };


  return (
    <Box>
        <List style={{ textAlign: 'center', display: 'block', padding: '3%' }}>
  <ListItem style={{ display: 'block', textAlign: 'center' }} disablePadding alignItems='center'>
    <Typography fontWeight={'bold'}>Visualization</Typography>
    <Box>
      <Typography id="input-slider" gutterBottom textAlign={'left'} fontSize={'13px'} color={'gray'}>
          Scale
      </Typography>
      <Slider
        aria-label="Temperature"
        defaultValue={30}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={110}
      />
    </Box>
  </ListItem>
  <ListItem style={{ display: 'block', textAlign: 'center' }} disablePadding>
    <Typography fontWeight={'bold'}>Items</Typography>
    <Box mt={'4%'}>
    <TextField
          id="standard-select-currency"
          select
          label="Size"
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
    <Box mt={'5%'}>
      <TextField
          id="outlined-required"
          select
          defaultValue="20"
          variant="standard"
          label='Color'
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
    <Box mt='5%'>
    <Typography variant='body2' gutterBottom textAlign={'left'} fontSize={'13px'} color={'gray'}>
          Size variation
      </Typography>
      <Slider
        defaultValue={30}
        onChange={handleItemSizeChange}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={110}
      />
    </Box>
    <Box mt='5%'>
    <TextField
          id="outlined-required"
          defaultValue="20"
          variant="standard"
          label='Maximum label strength'
          fullWidth
  />
    </Box>
  </ListItem>
  <ListItem style={{ display: 'block', textAlign: 'center', marginTop: 20 }} disablePadding alignItems='center'>
    <Typography fontWeight={'bold'}>Links</Typography>
    <Box mt='5%'>
    <Typography variant='body2' gutterBottom textAlign={'left'} fontSize={'13px'} color={'gray'}>
          Size variation
      </Typography>
      <Slider
        defaultValue={30}
        onChange={handleLinkSizeChange}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={110}
      />
    </Box>
    <Box mt='5%'>
    <TextField
          id="outlined-required"
          defaultValue="20"
          variant="standard"
          label='Minimum links'
          fullWidth
  />
    </Box>
    <Box mt='5%'>
    <TextField
          id="outlined-required"
          defaultValue="20"
          variant="standard"
          label='Maximum links'
          fullWidth
  />
    </Box>
    <Box mt='5%' display={'flex'} justifyContent={'space-between'}>
    <Typography variant='body2' gutterBottom textAlign={'left'} mt='2%' fontSize={'13px'} color={'gray'}>
          Curved links
      </Typography>
    <Switch
      checked={curvedLinks}
      onChange={handleToggleCurvature}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    </Box>
  </ListItem>
  <ListItem style={{ display: 'block', textAlign: 'center', marginTop: 20 }} disablePadding alignItems='center'>
    <Typography fontWeight={'bold'}>Color schemes</Typography>
    <Box mt='5%'>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Cluster colors</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
    <Box mt={'5%'}>
      <TextField
          id="outlined-required"
          select
          defaultValue="20"
          variant="standard"
          label='Score colors'
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
</List>
    </Box>
  )
}

export default View