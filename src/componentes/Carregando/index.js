import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./style";

export default function Carregando({ open }) {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
