import React, { useCallback } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import GiftIcon from '../../assets/gift.svg'
import { mainStyles } from '../../styles/mainStyles'
import { normalize } from '../../utils'
import { ICard } from '../../types/general-types'
import LinearGradient from 'react-native-linear-gradient'
import { AMAZON } from '../../constants'
import VisaSvg from '../../assets/visa.svg'
import AmazonSvg from '../../assets/amazon.svg'
import CheckSvg from '../../assets/check.svg'

type CardItemType = {
	card: ICard,
	isSelected: boolean,
	setSelectedCard: (card: ICard | null) => void
}

const CardItem: React.FC<CardItemType> = ({ card, isSelected, setSelectedCard }) => {
	const chooseCard = useCallback(() => {
		setSelectedCard(isSelected ? null : card)
	}, [card, isSelected])
	return (
		<LinearGradient colors={card.type === AMAZON ? ['#252F3D', '#252F3D'] : ['#182061', '#192A88']} start={{ x: 0, y: 1 }}
			end={{ x: 1, y: 1 }} style={[styles.cardWrapper, isSelected && styles.cardWrapper__selected]}>
			<TouchableOpacity onPress={chooseCard} style={[styles.card]}>
				<View style={[styles.card__top, isSelected && mainStyles.betweenRow]}>
					{isSelected && <CheckSvg width={normalize(18)} height={normalize(18)} />}
					<View style={styles.card__value}>
						<Text style={styles.card__text}>
							${card.price.toFixed(2)}
						</Text>
					</View>
				</View>
				<View style={[mainStyles.row, mainStyles.centeredRow]}>
					{card.type === AMAZON ? <AmazonSvg width={normalize(80)} height={normalize(40)} /> : <VisaSvg width={normalize(80)} height={normalize(40)} />}
				</View>
				<View style={styles.card__bottom}>
					{card.bonusIndicator && <View style={[mainStyles.row, styles.card__value]}>
						<GiftIcon style={styles.card__icon} width={normalize(10)} height={normalize(10)} />
						<Text style={styles.card__text}>
							+{card.bonusIndicator}%
						</Text>
					</View>}
				</View>
			</TouchableOpacity>
		</LinearGradient>
	)
}

export default CardItem