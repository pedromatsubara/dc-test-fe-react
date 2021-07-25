import React from "react";
import { useRouter } from "next/router";
import { ArrowBack } from "@material-ui/icons";
import styled from "styled-components";
import {
  CardContent,
  Card,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";

import { Order } from "../model/order/Order";
import { MethodType } from "../model/order/Payment";

const ModifiedCard = styled(Card)`
  max-width: 400px;
  margin: 0 auto;
  background-color: #ebe99f !important;
`;

const getPaymentMethod = (method: keyof MethodType) => {
  switch (method.toString()) {
    case "CREDIT":
      return "crédito";
    case "DEBIT":
      return "débito";
    default:
      return "via app";
  }
};

export default function OrderDetails(props: any) {
  const order: Order = props.order;
  const router = useRouter();
  const { _id, store, client, day, time, amount, deliveryFee, total, debt, address, items, payments } = order;
  return (
    <ModifiedCard variant="outlined">
      <CardContent>
        <List>
          <ListItem>
            <IconButton onClick={() => router.push("/orders")}>
              <ArrowBack />
            </IconButton>
            <ListItemText>{`Pedido de ${client} no ${store}`}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>{`Dia ${day} às ${time}`}</ListItemText>
            <ListItemSecondaryAction>{`#${_id}`}</ListItemSecondaryAction>
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemText>Endereço:</ListItemText>
            <ListItemSecondaryAction>{`${address.street}, N°${address.number}`}</ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText>Bairro:</ListItemText>
            <ListItemSecondaryAction>{`${address.neighborhood}, ${address.city} - ${address.state}`}</ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText>Complemento:</ListItemText>
            <ListItemSecondaryAction>{`${address.complement}`}</ListItemSecondaryAction>
          </ListItem>

          <Divider />

          {items.map((item) => {
            return (
              <ListItem key={item._id}>
                <ListItemText>{`x${item.quantity} ${item.name}`}</ListItemText>
                <ListItemSecondaryAction>{`R$ ${(parseInt(item.amount) / 100).toFixed(2)}`}</ListItemSecondaryAction>
              </ListItem>
            );
          })}

          <Divider />

          <ListItem>
            <ListItemText>Valor do Pedido:</ListItemText>
            <ListItemSecondaryAction>{`R$ ${amount.toFixed(2)}`}</ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText>Frete:</ListItemText>
            <ListItemSecondaryAction>{`R$ ${deliveryFee.toFixed(2)}`}</ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText>Valor Total:</ListItemText>
            <ListItemSecondaryAction>{`R$ ${total.toFixed(2)}`}</ListItemSecondaryAction>
          </ListItem>

          <Divider />

          {payments.length > 0 &&
            payments.map((payment) => {
              return (
                <ListItem key={payment._id}>
                  <ListItemText>{`Pagamento (${getPaymentMethod(payment.method)}):`}</ListItemText>
                  <ListItemSecondaryAction>{`R$ ${(payment.amount / 100).toFixed(2)}`}</ListItemSecondaryAction>
                </ListItem>
              );
            })}
          <ListItem>
            <ListItemText>Valor Pendente:</ListItemText>
            <ListItemSecondaryAction>{`R$ ${debt.toFixed(2)}`}</ListItemSecondaryAction>
          </ListItem>
        </List>
      </CardContent>
    </ModifiedCard>
  );
}
