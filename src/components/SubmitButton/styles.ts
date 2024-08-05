import { StyleSheet } from "react-native";
import { colors } from "../../types/colors";
import { normalize } from "../../utils";
import { MONTSERRAT_SEMIBOLD } from "../../constants";

export const styles = StyleSheet.create({
	button: {
		width: '100%',
		backgroundColor: colors.primaryOrange,
		paddingVertical: 24,
		justifyContent: 'center',
		borderRadius: 50,
		flexDirection: 'row'
	},
	button__label: {
		color: colors.white,
		fontSize: normalize(16),
		fontFamily: MONTSERRAT_SEMIBOLD
	},
	button__disabled: {
		backgroundColor: colors.disabledBg
	},
	button__disabledLabel: {
		color: colors.disabledText
	}
})