import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, Divider, makeStyles, Paper } from "@material-ui/core";
import { Stack } from "@mui/material";
import { addDaysToDate, getDateSuffix, getDayName, listNextDays, } from "../utils";
import { useShipments } from "../data/use-shipments";
import { Shipment } from "../data/Shipment";
import { isSameDay } from "date-fns";

interface ItemProps {
  item: Shipment;
  children?: React.ReactNode
}

const useStyles = makeStyles((theme) => ({
  stack: {
    margin: 20,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    background: theme.palette.success.light,
    width: 'calc(100% / 7)'
  },
  item: {
    width: '100%',
    marginTop: 10
  },
  loader: {
    margin: 'auto',
    width: 'fit-content',
    marginTop: 200,
    color: theme.palette.primary.main
  },
  chip: {
    textAlign: 'right',
    textTransform: "lowercase",
    marginBottom: 10
  }
}));

const nextWeekOnly = (item: Shipment) => {
  const arrival = Date.parse(item.estimatedArrival)
  const nextWeek = Date.parse(addDaysToDate(8).toString())
  return arrival < nextWeek
}


export const DashboardPage: React.FC = () => {

  const classes = useStyles();

  const useShipmentsResult = useShipments()
  return (
    <Stack direction='row' className={classes.stack}
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}>
      {listNextDays().map(date => {
        return (
          <Paper className={classes.paper}>{`${getDayName(date)} ${date.getDate()} ${getDateSuffix(date.getDate())}`}
            {useShipmentsResult?.status === 'SUCCESS' &&
              useShipmentsResult.shipments.filter(nextWeekOnly)
                .map((item) => (isSameDay(date, new Date(item.estimatedArrival)) && <ShipmentItem key={item.id} item={item} />)
                )
            }
          </Paper>
        )
      })}
    </Stack>
  )
};

const ShipmentItem = ({ item }: ItemProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.item}>
      <CardContent>
        <Stack direction="row" justifyContent={'flex-end'} spacing={1}>
          <Chip label={item.status} className={classes.chip} size="small" />
        </Stack>
        <Typography variant="h5" component="div">
          {item.client}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {item.mode}
        </Typography>
        <Typography variant="body2">
          {item.houseBillNumber}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">DETAILS</Button>
      </CardActions>
    </Card>
  );
};