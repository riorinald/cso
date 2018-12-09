import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import swal from 'sweetalert2';
import Select from 'react-select';
import AsyncSelect from 'react-select';
import NoSsr from '@material-ui/core/NoSsr';
// import DialogContentText from '@material-ui/core/DialogContentText';
import { styles, cargos, expedition, ship_term, service_term, via, fcl, uom, gst} from './input.style';
import './input.css';
import config from "../config";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class Inputan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      SI: '',
      expedition: 'IMPORT',
      custId: '',
      shipId: '',
      consId: '',     
      doc_no: '',
      via:'SEA',
      package:'',
      weight: '',
      cargo: 'LCL',
      volume: '',
      uom: '',
      awb: '',
      shipdate:'',
      ship_term:'',
      service_term:'',
      note: '',
      gst:'0',
      ex_cost: '',
      custAddr: '',
      req:'customers',
      que: [],
      val: null,
      selectedOption: null,
      isLoading:false,
      saves: true,
      loading:'',
      lastSI: 0,
      
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this)
  }
  
  componentDidMount() {
    this.loads();
    this.getLastSI();
  }

  componentDidUpdate(){
    this.loads();
  }

  query() {
    let query = `${config.apiUrl}/${this.state.req}`;
      if (this.state.val === null){
        query = `${query}?&$limit=20`;
      }
      if (this.state.val !== null){
        query = `${query}?&name[$like]=%${this.state.val}%`;
      }
      return query;
  }
  async loads() {
    const query = this.query()
    if(query === this.lastQuery){
      return;
    }
    const response = await axios.get(query);
    this.setState({
      que: response.data.data,
    });
    this.lastQuery = query;
    if(this.state.custId | this.state.consId | this.state.shipId !== ''){
      this.setState({saves:false});
    }

    console.log(this.query(),this.state.que);     
  }
  

  async getLastSI() {
    const res = await axios.get(`${config.apiProj}?$limit=1&$sort[SI]=-1&$select[]=SI`);
    this.setState({
      lastSI: res.data.data[0].SI
     });
  }

  async handleSave() {
    const insert = await axios.post(`${config.apiProj}`, {   
    SI    : this.state.lastSI,
    expedition    : this.state.expedition,
    custId  : this.state.custId,
    shipId   : this.state.shipId,
    consId : this.state.consId,
    doc_no    : this.state.doc_no,
    via      : this.state.via,
    package   : this.state.package,
    weight    : this.state.weight,
    cargo     : this.state.cargo,
    volume    : this.state.volume,
    uom  : this.state.uom,
    awb       : this.state.awb,
    shipdate  : this.state.shipdate,
    ship_term     : this.state.ship_term,
    service_term    : this.state.service_term,
    ex_cost      : this.state.ex_cost,
    note      : this.state.note,
    gst : this.state.gst,
  });
if (insert.data === insert.data){ 
    this.setState({ open: false });
    swal({
      type: 'success',
      title: 'Success !',
      text: 'Data Success Inputed',
      showConfirmButton: false,
      timer: 1700
    });
   this.setDefault() }
  else {
    swal({
      type: 'error',
      title: 'Error !',
      text: 'error',
      showConfirmButton: true,
    });
  }
 }
 
  handleCancel = () => {
    this.setDefault();
    swal({
      type: 'error',
      title: 'Canceled !',
      text: 'input new data canceled',
    //   showConfirmButton: false,
      timer: 1700
    });
   }  
  
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handler = name => value => {
    this.setState({
      [name]: value.value,
      selectedOption: value,
      custAddr: 'Address : ' + value.addr, 
    });
  };

  handleInputChange = (newValue) => {
    const val = newValue.replace(/\W/g, '');
    this.setState({ val });
    return val;
  };

  fill = () => {
      return this.state.que.map(q => ({ value: q.name, label: q.name, addr: q.address}));
  };
  
  loadOptions = (callback) => {
    setTimeout(() => {
      callback(this.fill());
    }, 1000);
  }

  update = () => {
    this.props.onUpdate();
  };

  setDefault = () => {
    this.setState({ 
      open: false,
      SI: '',
      expedition: 'Import',
      custId: '',
      shipId: '',
      consId: '',
      doc_no: '',
      via:'SEA',
      package:'',
      weight: '',
      cargo: 'LCL',
      volume: '',
      uom: '',
      awb: '',
      shipdate:'',
      ship_term:'',
      service_term:'',
      note: '',
      gst:0,
      ex_cost: '',
      saves: true,
      custAddr: ''
     });
  }

  condition = () => {
    if (this.state.cargo === 'FCL'){
      return true;
    }
  }

  render() {
    const { classes } = this.props;
    const { isLoading } = this.state;
    // console.log(this.state.custId,this.state.shipId, this.state.consId);

    return (
      <div>
        <Grid container>
          <Grid >
            <Button variant="contained" onClick={this.handleClickOpen} className={classes.button}>ADD Project</Button>
          </Grid>
          <Dialog
          fullWidth={true}
          maxWidth = {'md'}
            scroll={'paper'}
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add New Project</DialogTitle>
            <DialogContent>
              <form className={classes.root} noValidate autoComplete="on">
                <TextField
                  required
                  disabled
                  id="SI"
                  label="Required"
                  placeholder="Number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">SI</InputAdornment>,
                  }}
                  value={this.state.lastSI}
                  onChange={
                    this.handleChange('SI')
                  }
                  InputLabelProps={{ shrink: true, }}
                  className={classes.textRed}
                  margin="normal"
                />
                <TextField
                  id="code"
                  select
                  label="Code Expedition"
                  className={classes.textM}
                  value={this.state.expedition}
                  onChange={this.handleChange('expedition')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.textM,
                    },
                  }}
                  margin="normal"
                >
                  {expedition.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="via"
                  select
                  label="Transport by"
                  className={classes.textM}
                  value={this.state.via}
                  onChange={this.handleChange('via')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.textM,
                    },
                  }}
                  margin="normal"
                >
                  {via.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="cargo"
                  select
                  label="Cargo Type"
                  className={classes.textM}
                  value={this.state.cargo}
                  onChange={this.handleChange('cargo')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.textM,
                    },
                  }}
                  margin="normal"
                >
                  {cargos.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Divider className ={classes.Divider}/>
                <NoSsr>
                <TextField
                disabled
                  id="custId"
                  label="Customer"
                  placeholder="Customer"
                  value={this.state.custAddr}
                  fullWidth
                  onChange={this.handleChange('custId')}
                />
                <AsyncSelect
                cacheOptions
                isLoading={isLoading}
                loadOptions={this.loadOptions}
                options={this.fill()}
                onMenuOpen={()=>this.setState({req:'customers'})}
                onChange={this.handler('custId')}
                onInputChange={this.handleInputChange}
                />
                <TextField
                disabled
                 id="shipId"
                 label="Shipper"
                 placeholder="Shipper"
                 value={this.state.shipId}
                 onChange={this.handleChange('shipId')}
                 fullWidth
                />
                <AsyncSelect
                cacheOptions
                isLoading={isLoading}
                loadOptions={this.loadOptions}
                options={this.fill()}
                onMenuOpen={()=>this.setState({req:'shipper'})}
                onChange={this.handler('shipId')}
                onInputChange={this.handleInputChange}
                />
                <TextField
                disabled
                  id="consId"
                  label="Consignee"
                  placeholder="Consignee"
                  value={this.state.consId}
                  onChange={this.handleChange('consId')}
                  fullWidth
                />
                <AsyncSelect
                cacheOptions
                isLoading={isLoading}
                loadOptions={this.loadOptions}
                options={this.fill()}
                onMenuOpen={()=>this.setState({req:'consignee'})}
                onChange={this.handler('consId')}
                onInputChange={this.handleInputChange}
                />
                {/* < Select
                options={que.map(q => ({ value: q.name, label: q.name }))}
                value={this.state.consId}
                onChange={this.handler('consId')}
                placeholder="Search .."
                /> */}
                </NoSsr>
                <Divider />
                <TextField
                  id="doc_no"
                  label="Document Number"
                  placeholder="Document Number"
                  value={this.state.doc_no}
                  onChange={this.handleChange('doc_no')}
                  className={classes.textV}
                  margin="normal"
                />
                <TextField
                  id="weight"
                  label="Weight"
                  placeholder=" Gross Weight"
                  value={this.state.weight}
                  onChange={this.handleChange('weight')}
                  className={classes.textV}
                  margin="normal"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                  }}
                />
                <TextField
                  id="package"
                  label="Package"
                  placeholder="package"
                  value={this.state.package}
                  onChange={this.handleChange('package')}
                  className={classes.textField}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{this.state.uom}</InputAdornment>,
                  }}
                  margin="normal"
                />
                <TextField
                  id="uom"
                  select
                  label="uom"
                  placeholder="unit of measure"
                  value={this.state.uom}
                  onChange={this.handleChange('uom')}
                  className={classes.textM}
                  margin="normal"
                >
                  {uom.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                  {option.label}
                  </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="volume"
                  select={this.condition()}
                  label={this.state.cargo + ' volume'}
                  placeholder="Volume"
                  value={this.state.volume}
                  onChange={this.handleChange('volume')}
                  className={classes.textV}
                  margin="normal"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">m³</InputAdornment>,
                  }}
                >
                  {fcl.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                  {option.label}
                  </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="awb"
                  label="AWB / BL"
                  placeholder="AWB/BL"
                  value={this.state.awb}
                  onChange={this.handleChange('awb')}
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  id="ship_term"
                  select
                  label="Shipping Terms"
                  className={classes.textV}
                  value={this.state.ship_term}
                  onChange={this.handleChange('ship_term')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.textM,
                    },
                  }}
                  margin="normal"
                >
                  {ship_term.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="service_term"
                  select
                  label="Service Terms"
                  className={classes.textM}
                  value={this.state.service_term}
                  onChange={this.handleChange('service_term')}
                  margin="normal"
                >
                  {service_term.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="shipdate"
                  label="Shipping Date"
                  type="date"
                  value={this.state.shipdate}
                  onChange={this.handleChange('shipdate')}
                  margin="normal"
                  className={classes.textV}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="gst"
                  select
                  label="GST"
                  className={classes.textG}
                  value={this.state.gst}
                  onChange={this.handleChange('gst')}
                  margin="normal"
                >
                  {gst.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="note"
                  label="Note"
                  placeholder="Note Description"
                  value={this.state.note}
                  onChange={this.handleChange('note')}
                  margin="normal"
                  className={classes.textMore}
                />

              </form>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={this.handleCancel} >
                <CloseIcon />
                Cancel
            </Button>
              <Button disabled = {this.state.saves} variant="outlined" onClick={this.handleSave} className={classes.button}>
                <SaveIcon />
                Save
            </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    );
  }
}

Inputan.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


export default withStyles(styles, { withTheme: true })(Inputan);
