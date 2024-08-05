import React, { useCallback, useState } from 'react'
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { mainStyles } from '../../styles/mainStyles'
import { styles } from './styles'
import SubmitButton from '../SubmitButton'

type AddBalanceModalType = {
	isShowModal: boolean,
	closeModal: () => void,
	onSuccess: (balance: number) => void
}

const AddBalanceModal: React.FC<AddBalanceModalType> = ({ isShowModal, closeModal, onSuccess }) => {
	const [value, setValue] = useState<string>('')
	const onClose = useCallback(() => {
		setValue('')
		closeModal()
	}, [])
	const onSave = useCallback(() => {
		onSuccess(+value)	
		onClose()
	}, [value])
	
	return (
		<Modal visible={isShowModal} transparent={true} animationType='fade'>
			<TouchableOpacity onPress={closeModal} style={mainStyles.overlay}>
				<View style={styles.modal}>
					<Text style={styles.modal__headerText}>
						Add balance
					</Text>
					<TextInput
						value={value}
						onChangeText={(e) => {
							if (!isNaN(+e) && e[0] !== '0' && e.length < 7) setValue(e) // simple validation
						}}
						keyboardType='numeric'
						style={styles.modal__input}
					/>
					<View style={[mainStyles.row, mainStyles.betweenRow, styles.modal__buttons]}>
						<TouchableOpacity onPress={onClose}>
							<Text style={styles.modal__headerText}>
								Close
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							disabled={value.length === 0}
							style={[value.length === 0 && styles.modal__buttonDisaled]}
							onPress={onSave}>
							<Text style={styles.modal__headerText}>
								Save
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		</Modal>
	)
}

export default AddBalanceModal
