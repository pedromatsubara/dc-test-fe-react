import { gql } from "@apollo/client";

export default gql`
	query allOrders {
		orders {
			_id
			reference
			store
			externalReference
			amount
			deliveryFee
			customer {
				_id
				name
			}
			address {
				_id
				number
				neighborhood
				complement
				city
				state
				street
			}
			items {
				_id
				name
				amount
				quantity
				note
			}
			payments {
				_id
				method
				amount
			}
		}
	}
`;
