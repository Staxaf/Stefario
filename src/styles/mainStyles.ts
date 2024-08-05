import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils";

export const mainStyles = StyleSheet.create({
  row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	betweenRow: {
		justifyContent: 'space-between'
	},
	centeredRow: {
		width: '100%',
		justifyContent: 'center',
	},
	ml4: {
		marginLeft: 4
	},
	ml10: {
		marginLeft: 10
	},
	overlay: {
		flex: 1,
		width: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		alignItems: 'center',
		justifyContent: 'center'
	}
})