import { colors } from './../../types/colors';
import { MONTSERRAT_SEMIBOLD } from './../../constants';
import { StyleSheet } from "react-native";
import {SCREEN_WIDTH, normalize} from '../../utils'

export const styles = StyleSheet.create({
	cardWrapper: {
		borderRadius: 20,
		width: SCREEN_WIDTH / 2 - 18,
		height: normalize(95),
		padding: 8,
		borderStyle: "solid",
    borderWidth: 2,
		borderColor: 'transparent'
	},
	cardWrapper__selected: {
		borderColor: colors.orange,
	},
  card: {
		height: '100%',
		
	},
	card__top: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	card__value: {
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 15
	},
	card__text: {
		fontFamily: MONTSERRAT_SEMIBOLD,
		color: colors.white,
		fontSize: normalize(12)
	},
	card__bottom: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	card__icon: {
		marginRight: 2
	}
})