import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function AlertaDeConfirmacao(props) {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <Snackbar open={props.mensagem ? true : false} autoHideDuration={6000}>
      <Alert severity="success">{props.mensagem}</Alert>
    </Snackbar>
  );
}