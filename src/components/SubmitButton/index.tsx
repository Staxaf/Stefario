import React, { useEffect } from 'react'
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { styles } from './styles'
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { colors } from '../../types/colors'
import { normalize } from '../../utils'
import { mainStyles } from '../../styles/mainStyles'

type SubmitButtonType = {
	label: string,
	onPress: () => void,
	isLoading?: boolean,
	disabled?: boolean,
	isSuccess?: boolean
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const SubmitButton: React.FC<SubmitButtonType> = ({ label, isLoading, disabled, isSuccess, ...props }) => {
	const backgroundColor = useSharedValue(0);
	useEffect(() => {
		if (disabled) backgroundColor.value = withTiming(0);
		else if (isLoading) backgroundColor.value = withTiming(2)
		else backgroundColor.value = withTiming(1);
	}, [disabled, isLoading])

	const buttonDisabledStyles = useAnimatedStyle(() => {
		return {
			...styles.button,
			backgroundColor: interpolateColor(
				backgroundColor.value,
				[0, 1, 2],
				[colors.disabledBg, colors.primaryOrange, colors.primaryOrangeDisabled],
			),
		}
	})

	return (
		<AnimatedTouchable activeOpacity={0.5} style={buttonDisabledStyles} disabled={disabled || isLoading || isSuccess} {...props}>
			{isLoading && <ActivityIndicator color={colors.white} size={normalize(10)} />}
			<Text style={[styles.button__label, disabled && styles.button__disabledLabel, isLoading && mainStyles.ml10]}>
				{label}
			</Text>
		</AnimatedTouchable>
	)
}

export default SubmitButton
