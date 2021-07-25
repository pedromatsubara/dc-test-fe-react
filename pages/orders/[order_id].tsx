import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../../lib/AppContextProvider";
import { Button, Typography, CardContent, CardActions, Card } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: "0 auto",
    backgroundColor: "#ebe99f",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OrderDetailPage() {
  const classes = useStyles();
  const router = useRouter();
  const orders = useContext(AppContext);
  const order = orders.find((order) => order._id === router.query.order_id);

  if (!order) return "uai.. sei o que houve nao";

  const { _id, store, client, day, time, amount, deliveryFee, total, debt, address, items, payments } = order;
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h6" component="p">{`Pedido de ${client} no ${store}`}</Typography>
        <Typography className={classes.title} color="textSecondary">{`Dia ${day} às ${time}`}</Typography>
        <Typography className={classes.title} color="textSecondary">{`#${_id}`}</Typography>
        <hr />
        {items.map((item) => {
          return (
            <Typography key={item._id}>
              <span>
                x{item.quantity} {item.name}
              </span>
              <span>Total: R$ {(parseInt(item.amount) / 100).toFixed(2)}</span>
            </Typography>
          );
        })}
        <hr />
        <Typography>Valor do Pedido: R$ {amount.toFixed(2)}</Typography>
        <Typography>Frete: R$ {deliveryFee.toFixed(2)}</Typography>
        <Typography>Valor Total: R$ {total.toFixed(2)}</Typography>
        <hr />
        {payments.length > 0 &&
          payments.map((payment) => {
            return (
              <Typography key={payment._id}>
                Valor ({payment.method.toLowerCase()}): R$ {(payment.amount / 100).toFixed(2)}
              </Typography>
            );
          })}
        <Typography>Valor Pendente: R$ {debt.toFixed(2)}</Typography>
        <hr />
        <Typography>{`Endereço: ${address.street}, N°${address.number}`}</Typography>
        <Typography>{`Bairro: ${address.neighborhood}, ${address.city} - ${address.state}`}</Typography>
        <Typography>{`Complemento: ${address.complement}`}</Typography>
      </CardContent>
      <CardActions>
        <Button component="div" size="small" onClick={() => router.back()}>
          Voltar
        </Button>
      </CardActions>
    </Card>
  );
}
