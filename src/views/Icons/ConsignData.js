import * as React from 'react';
import ReactDOM from 'react-dom';
import Paper from '@material-ui/core/Paper';
import {
  PagingState,
  SortingState,
  CustomPaging,
  FilteringState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  Toolbar,
  PagingPanel,
  ColumnChooser,
  TableFilterRow,
  TableHeaderRow,
  DragDropProvider,
  TableColumnResizing,
  TableColumnReordering,
  TableColumnVisibility,
} from '@devexpress/dx-react-grid-material-ui';

import { Loading } from './loading';
import config from '../config';


class ConsigneData extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'name' },
        { name: 'address', title: 'address' },
        { name: 'email', title: 'email' },
        { name: 'telp', title: 'telp' },
      ],
      defaultHiddenColumnNames: [],
      tableColumnExtensions: [
        { columnName: 'telp', align: 'center' },
      ],
      // columnWidths: [
      //   { columnName: 'name', width: 180 },
      //   { columnName: 'address', width: 180 },
      //   { columnName: 'email', width: 240 },
      //   { columnName: 'telp', width: 240 },
      // ],
      rows: [],
      sorting: [{ columnName: 'name', direction: 'asc' }],
      totalCount: 0,
      pageSize: 10,
      pageSizes: [5, 10, 15],
      currentPage: 0,
      filters: [],
      loading: true,
    };
    this.changeColumnWidths = (columnWidths) => {
      this.setState({ columnWidths });
      console.log(this.state.columnWidths);
    };
    this.changeFilters = this.changeFilters.bind(this);
    this.changeSorting = this.changeSorting.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
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

    let queryString = `${config.apiCons}?$limit=${pageSize}&$skip=${pageSize * currentPage}`;

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
    console.log(this.state.filters);
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

  render() {
    const {
      rows,
      loading,
      columns,
      sorting,
      pageSize,
      pageSizes,
      currentPage,
      totalCount,
      columnWidths,
      tableColumnExtensions,
      defaultHiddenColumnNames,
    } = this.state;

    return (
      <Paper style={{ position: 'relative' }}>
        <Grid
          rows={rows}
          columns={columns}
        > 
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
          <Table
            columnExtensions={tableColumnExtensions}
          />
          {/* <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={this.changeColumnWidths}
          /> */}
          <TableColumnReordering
            defaultOrder={['name', 'address', 'email', 'telp']}
          />
          <TableHeaderRow showSortingControls />
          <TableFilterRow showFilterSelector />
          <TableColumnVisibility
            defaultHiddenColumnNames={defaultHiddenColumnNames}
          />
          <Toolbar />
          <ColumnChooser />
          <PagingPanel
            pageSizes={pageSizes}
          />
        </Grid>
        {loading && <Loading />}
      </Paper>
    );
  }
}
export default ConsigneData;

