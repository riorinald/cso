import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import {
  PagingState,
  SortingState,
  CustomPaging,
  FilteringState,
  RowDetailState,
  DataTypeProvider,
  EditingState
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  VirtualTable,
  Toolbar,
  PagingPanel,
  ColumnChooser,
  TableEditRow,
  TableEditColumn,
  TableFilterRow,
  TableHeaderRow,
  TableRowDetail,
  DragDropProvider,
  TableColumnResizing,
  TableColumnReordering,
  TableColumnVisibility,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';

import PropTypes from 'prop-types';
import {
  Template, TemplatePlaceholder, Plugin, TemplateConnector,
} from '@devexpress/dx-react-core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import ClearIcon from '@material-ui/icons/Clear';

import Inputan from './input' ;
import { Loading } from './loading';
import ProjectDetail from "./ProjectDetail";
import Button from '@material-ui/core/Button';
import config from '../config';
import CardBody from "components/Card/CardBody.jsx";
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import EditIcon from '@material-ui/icons/Edit';
import {styles} from './input.style';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import SaveIcon from '@material-ui/icons/Save';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const BooleanFormatter = ({ value }) => <Chip label={value ? 'Yes' : 'No'} />;
const BooleanTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={BooleanFormatter}
    {...props}
  />
);

class Tablez  extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'SI', title: 'SI Number' },
        { name: 'custId', title: 'Customer' },
        { name: 'shipId', title: 'Shippper' },
        { name: 'consId', title: 'Consignee' },
        { name: 'expedition', title: 'Expedisi' },
        { name: 'via', title: 'Via' },
        { name: 'cargo', title: 'Cargo' },
        { name: 'doc_no', title: 'Document no' },
        { name: 'awb', title: 'AWB/BL' },
        { name: 'shipdate', title: 'Shipping Date' },
        { name: 'weight', title: 'Weight' },
        { name: 'package', title: 'Package' },
        { name: 'uom', title: 'uom' },
        { name: 'volume', title: 'Volume' },
        { name: 'ship_term', title: 'shipping term' },
        { name: 'service_term', title: 'service term' },
        { name: 'note', title: 'note' },
        { name: 'ex_cost', title: 'extra cost' },
        { name: 'gst', title: 'GST', dataType: 'boolean' },
        { name: 'createdBy', title: 'Author' },
      ],
      booleanColumns: ['gst'],
      defaultHiddenColumnNames: ['weight','package','uom','volume','ship_date','ship_term','service_term','note','ex_cost',],
      defaultOrder:['SI','custId','shipId','consId','expedition','via','cargo','doc_no','awb','shipdate','gst','createdBy','ex_cost' ],
      editingStateColumnExtensions: [
        { columnName: 'SI', editingEnabled: false },
      ],
      columnWidths: [
        { columnName: 'SI', width: 100 },
        { columnName: 'custId', width: 160 },
        { columnName: 'shipId', width: 160 },
        { columnName: 'consId', width: 160 },
        { columnName: 'expedition', width: 100 },
        { columnName: 'via', width: 80 },
        { columnName: 'cargo', width: 80 },
        { columnName: 'doc_no', width: 120 },
        { columnName: 'awb', width: 90 },
        { columnName: 'shipdate', width: 115 },
        { columnName: 'weight', width: 50 },
        { columnName: 'package', width: 50 },
        { columnName: 'uom', width: 50 },
        { columnName: 'volume', width: 50 },
        { columnName: 'ship_term', width: 70 },
        { columnName: 'service_term', width: 70 },
        { columnName: 'note', width: 100 },
        { columnName: 'ex_cost', width: 75 },
        { columnName: 'gst', width: 70 },
        { columnName: 'createdBy', width: 85},
      ],
      tableColumnExtensions: [
        { columnName: 'SI', align: 'left' },
        { columnName: 'cretedBy', align: 'right' },
      ],
      rows: [],
      sorting: [{ columnName: 'SI', direction: 'asc' }],
      leftColumns: [TableRowDetail.COLUMN_TYPE],
      totalCount: 0,
      pageSize: 10,
      pageSizes: [5, 10, 15],
      currentPage: 0,
      filters: [],
      loading: true,
      styl: "detailz",
      expandedRowIds: [],
    };

    // this.handlerz = this.handlerz.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
    this.changeFilters = this.changeFilters.bind(this);
    this.changeSorting = this.changeSorting.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.changeExpandedDetails = expandedRowIds => this.setState({ expandedRowIds });
  }
  
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  componentWillReceiveProps() {
    this.loadData();
  }

  changeSorting(sorting) {
    this.setState({
      loading: true,
      sorting,
    });
  }

  changeCurrentPage(currentPage) {
    this.setState({
      loading: true,
      currentPage,
    });
  }

  changeFilters(filters) {
    this.setState({
      loading: true,
      filters,
    });
  }

  changeColumnWidths = (columnWidths) => {
    this.setState({ columnWidths });
    console.log(this.state.columnWidths );
  };

  updates = name => {
    this.setState({ name: name }); // or with es6 this.setState({name})
  };

  changePageSize(pageSize) {
    const { totalCount, currentPage: stateCurrentPage } = this.state;
    const totalPages = Math.ceil(totalCount / pageSize);
    const currentPage = Math.min(stateCurrentPage, totalPages - 1);

    this.setState({
      loading: true,
      pageSize,
      currentPage,
    });
  }

  queryString() {
    const { filters, sorting, pageSize, currentPage } = this.state;

    let queryString = `${config.apiProj}?$limit=${pageSize}&$skip=${pageSize * currentPage}`;

    const columnSorting = sorting[0];
    if (columnSorting) {
      const sortingDirectionString = columnSorting.direction === 'desc' ? '1' : '';
      queryString = `${queryString}&$sort${'%5B' + columnSorting.columnName + '%5D'}=${sortingDirectionString}`;
    }

    let filter = filters.reduce((acc, { columnName, value }) => {
      acc.push(`${columnName}`);
      return acc;
    }, []).join(',"and",');

    let vfilter = filters.reduce((acc, { value }) => {
      acc.push(`${encodeURIComponent(value)}`);
      return acc; },[]).join('');

    if (filters.length > 0) {
      filter = `${filter}`;
      vfilter = `%${vfilter}%`;
      queryString =`${queryString}&${filter}%5B$like%5D=${vfilter}`;
    }
    // console.log(this.state.filters);
    return queryString;
  }

  loadData() {
    const queryString = this.queryString();
    if (queryString === this.lastQuery) {
      this.setState({ loading: false });
      return;
    }

    fetch(queryString)
      .then(response => response.json())
      .then(data => this.setState({
        rows: data.data,
        totalCount: data.total,
        loading: false,
      }))
      .catch(() => this.setState({ loading: false }));
    this.lastQuery = queryString;
  }

  handlerz() {
    console.log('suskes');
    this.setState({
      expandedRowIds:[''],
      loading: true
    });
}

commitChanges({ added, changed, deleted }) {
  let { rows } = this.state;
  if (added) {
    const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
    rows = [
      ...rows,
      ...added.map((row, index) => ({
        id: startingAddedId + index,
        ...row,
      })),
    ];
  }
  if (changed) {
    rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
  }
  if (deleted) {
    const deletedSet = new Set(deleted);
    rows = rows.filter(row => !deletedSet.has(row.id));
  }
  this.setState({ rows });
}

extraButton() {
    return (<Button variant="contained">ADD Customer</Button>);
}

// FilterToggle(props){
//   const { toggleFilter } = props;

//   return (
//     <Plugin name="FilterToggle">
//       <Template name="toolbarContent">
//         <TemplatePlaceholder />
//         <TemplateConnector>
//           {({}) => (
//             <React.Fragment>
//               <Tooltip title='Toggle filter' placement='bottom' enterDelay={300}>
//                 <IconButton onClick={toggleFilter}>
//                   <FilterListIcon />
//                 </IconButton>
//               </Tooltip>

//             </React.Fragment>
//           )}
//         </TemplateConnector>
//       </Template>
//     </Plugin>
//   );
// }

RowDetail = ({ row }) => (
  <div>
    <ProjectDetail data={row} />
    <input
        accept="image/*"
        className={this.props.classes.input}
        id="outlined-button-file"
        multiple
        type="file"
      />
    <label htmlFor="outlined-button-file">
        <Button variant="outlined" component="span" ><UnarchiveIcon /> Upload </Button>
    </label>
  </div> 
);

  render() {
    const { classes } = this.props;
    const {
      rows,
      columns,
      sorting,
      loading,
      pageSize,
      pageSizes,
      leftColumns,
      currentPage,
      totalCount,
      columnWidths,
      expandedRowIds,
      booleanColumns,
      tableColumnExtensions,
      defaultHiddenColumnNames,
      editingStateColumnExtensions
    } = this.state;
    console.log(this.state.expandedRowIds);

    return (
        <Grid
          rows={rows}
          columns={columns}
        > 
          <BooleanTypeProvider
            for={booleanColumns}
          />
          <DragDropProvider />
          <FilteringState
            onFiltersChange={this.changeFilters}
          />
          <SortingState
            sorting={sorting}
            onSortingChange={this.changeSorting}
          />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={this.changePageSize}
          />
          <CustomPaging
            totalCount={totalCount}
          />
          <VirtualTable
          width="auto"
          height="auto" 
          columnExtensions={tableColumnExtensions} />
          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={this.changeColumnWidths}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
            // defaultEditingRowIds={[0]}
            columnExtensions={editingStateColumnExtensions}
          />
          <TableColumnReordering
            defaultOrder={this.defaultOrder}
          />
          <TableHeaderRow showSortingControls />
          <RowDetailState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={this.changeExpandedDetails}
          />
          <TableRowDetail
            contentComponent={this.RowDetail}
          />
          <TableFixedColumns
            leftColumns={leftColumns}
          />
          <TableFilterRow />
          <TableColumnVisibility
            defaultHiddenColumnNames={defaultHiddenColumnNames}
          />
          <Toolbar />
          {/* <TableEditRow />
          <TableEditColumn
            showEditCommand
          /> */}
          <Inputan onUpdate={this.handlerz}/>

            {/* <Button variant="contained" >ADD Project</Button>
            <Button variant="contained" >ADD Customer</Button> */}
            
          <ColumnChooser />
          <PagingPanel
            pageSizes={pageSizes}
          />
        {loading && <Loading />}
        </Grid>
    );
  }
}

Tablez.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tablez);
