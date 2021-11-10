import { ReactElement } from "react"
import { Box, makeStyles, useTheme } from "@material-ui/core"
import { DataGrid, GridColDef } from "@material-ui/data-grid"
import Loader from 'react-loader-spinner'
import { useShipments } from "../data/use-shipments"
import useDynamicHeightRow from "../hooks/useDynamicHeightRow"

const COLUMNS: GridColDef[] = [
  {
    field: 'houseBillNumber',
    headerName: 'House Bill',
    flex: 1
  },
  {
    field: 'client',
    headerName: 'Shipper',
    flex: 1
  },
  {
    field: 'origin',
    headerName: 'Origin',
    flex: 2
  },
  {
    field: 'destination',
    headerName: 'Destination',
    flex: 2
  },
  {
    field: 'mode',
    headerName: 'Mode',
    flex: 1
  },
  {
    field: 'estimatedDeparture',
    headerName: 'Estimated Departure',
    flex: 1
  },
  {
    field: 'estimatedArrival',
    headerName: 'Estimated Arrival',
    flex: 1
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1
  }
]

const useStyles = makeStyles({
  grid: {
    marginInline: 16,
    height: "calc(100vh - 64px)",
  },
  loader: {
    margin: 'auto',
    width: 'fit-content',
    marginTop: 200
  }
})

export const ShipmentsPage: React.FC = () => {
  const classes = useStyles()
  const useShipmentsResult = useShipments()
  const theme = useTheme()
  const qtyRows = useDynamicHeightRow();

  let component: ReactElement
  switch (useShipmentsResult.status) {
    case 'SUCCESS':
      component = <DataGrid
        className={classes.grid}
        rows={useShipmentsResult.shipments}
        columns={COLUMNS}
        pageSize={qtyRows}
        disableSelectionOnClick
      />
      break;
    case 'LOADING':
      component = <Box className={classes.loader}>
        <Loader type="Grid" color={theme.palette.primary.main} />
      </Box >
      break
    case 'ERROR':
      component = <p>Error</p>
      break
  }

  return component
}