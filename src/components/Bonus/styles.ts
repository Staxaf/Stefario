import { mainStyles } from './../../styles/mainStyles';
import { StyleSheet } from "react-native";
import { colors } from "../../types/colors";
import { MONTSERRAT_SEMIBOLD } from '../../constants';
import { normalize } from '../../utils';

export const styles = StyleSheet.create({
  bonus: {
		...mainStyles.row,
		backgroundColor: colors.lightOrange,
		borderRadius: 15,
		paddingVertical: 8,
		paddingHorizontal: 16,
		marginTop: 8
	},
	bonus__text: {
		marginLeft: 4,
		fontFamily: MONTSERRAT_SEMIBOLD,
		color: colors.primaryText,
		fontSize: normalize(14)
	}
})