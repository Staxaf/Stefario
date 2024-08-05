import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './styles'
import { mainStyles } from '../../styles/mainStyles'
import GiftSvg from '../../assets/gift_orange.svg'
import { normalize } from '../../utils'
import Animated, { FadeIn } from 'react-native-reanimated';

type BonusType = {
	bonus: number
}

const Bonus: React.FC<BonusType> = ({ bonus }) => {

	return (
		<Animated.View
			entering={FadeIn.duration(300)}
			style={[mainStyles.row, mainStyles.centeredRow]}>
			<View style={styles.bonus}>
				<GiftSvg width={normalize(10)} height={normalize(10)} />
				<Text style={styles.bonus__text}>
					YOU GET ${bonus.toFixed(2)} BONUS
				</Text>
			</View>
		</Animated.View>
	)
}

export default Bonus