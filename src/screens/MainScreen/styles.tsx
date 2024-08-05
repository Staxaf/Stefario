import { StyleSheet } from "react-native";
import { colors } from "../../types/colors";
import { SCREEN_HEIGHT, normalize } from "../../utils";
import { MONTSERRAT_BOLD, MONTSERRAT_SEMIBOLD } from "../../constants";
import { mainStyles } from "../../styles/mainStyles";


export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: colors.white,
		paddingHorizontal: 12,
		paddingVertical: 30
	},
	headerText: {
		fontSize: normalize(16),
		fontFamily: MONTSERRAT_SEMIBOLD,
		color: colors.primaryText
	},
	balance: {
		...mainStyles.row,
		backgroundColor: colors.lightOrange,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 40
	},
	balance__total: {
		fontSize: normalize(14),
		fontFamily: MONTSERRAT_SEMIBOLD,
		marginLeft: 2,
		color: colors.primaryText
	},
	cards: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: normalize(12)
	},
	priceBlock: {
		marginBottom: 12
	},
	priceBlock__text: {
		fontFamily: MONTSERRAT_BOLD,
		fontSize: normalize(14),
		color: colors.primaryText
	},
	priceBlock__inner: {
		marginBottom: 4
	},
	noCommission: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	noCommission__text: {
		fontSize: normalize(12),
		color: '#757575',
		fontFamily: MONTSERRAT_SEMIBOLD,
		textTransform: 'uppercase'
	},
	dangerText: {
		color: colors.danger,
		fontFamily: MONTSERRAT_SEMIBOLD,
		fontSize: normalize(12)
	}
})