import { emphasize } from '@material-ui/core/styles/colorManipulator';

export const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
    width: "100%",
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  textRed: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    color: "red",
  },
  textV: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:180
  },
  textM: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:200,
  },
  textG: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:60,
  },
  textMore:{
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 555
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  divider: {
    height: theme.spacing.unit * 4,
  },
  input: {
    display: 'none',
  },
});


export const expedition = [
    {
      value: 'IMPORT',
      label: 'IMPORT',
    },
    {
      value: 'EXPORT',
      label: 'EXPORT',
    },
    {
      value: 'OTHERS',
      label: 'OTHERS',
    },
  ];

export const cargos = [
    {
      value: 'LCL',
      label: 'LCL',
    },
    {
      value: 'FCL',
      label: 'FCL',
    },
    {
      value: 'OTHERS',
      label: 'OTHERS',
    },
];

export const via = [
  {
    value: 'AIR',
    label: 'AIR',
  },
  {
    value: 'SEA',
    label: 'SEA',
  },
  {
    value: 'OTHERS',
    label: 'OTHERS',
  },
];

export const ship_term = [
  {
    value: 'FAS',
    label: 'FAS',
  },
  {
    value: 'FOB',
    label: 'FOB',
  },
  {
    value: 'CFR',
    label: 'CFR',
  },
  {
    value: 'CIF',
    label: 'CIF',
  },
];

export const service_term = [
  {
    value: 'door to door',
    label: 'door to door',
  },
  {
    value: 'port to port',
    label: 'port to port',  
  },
  {
    value: 'door to port',
    label: 'door to port',
  },
  {
    value: 'port to door',
    label: 'port to door',
  },
  
];

export const fcl = [
  {
    value: '20’',
    label: '20’',
  },
  {
    value: '40’',
    label: '40’',
  }
]


export const gst = [
  {
    value: '1',
    label: 'Yes',
  },
  {
    value: '0',
    label: 'No',
  }
]

export const uom = [
  {
    value: 'BAG',
    label: 'bag',
  },
  {
    value: 'BKT',
    label: 'Bucket',
  },
  {
    value: 'BND',
    label: 'Bundle',
  },
  {
    value: 'BOWL',
    label: 'Bowl',
  },
  {
    value: 'CRD',
    label: 'Card',
  },
  {
    value: 'CM',
    label: 'Centimeters',
  },
  {
    value: 'CTN',
    label: 'Carton',
  },
  {
    value: 'PK',
    label: 'Pack',
  },
  {
    value: 'PC',
    label: 'Peice',
  },
  {
    value: 'SET',
    label: 'Set',
  },
  {
    value: 'M',
    label: 'Meter',
  },
]
