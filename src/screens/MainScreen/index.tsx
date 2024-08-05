import React, { useCallback, useMemo, useState } from 'react'
import { FlatList, ListRenderItem, Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { mainStyles } from '../../styles/mainStyles'
import CoinSvg from '../../assets/coin.svg'
import { normalize } from '../../utils'
import { ICard } from '../../types/general-types'
import { AMAZON, VISA } from '../../constants'
import CardItem from '../../components/CardItem'
import SubmitButton from '../../components/SubmitButton'
import Bonus from '../../components/Bonus'
import NotEnoughSvg from '../../assets/not_enough.svg'
import Animated, { FadeIn } from 'react-native-reanimated'
import AddBalanceModal from '../../components/AddBalanceModal'

export default function MainScreen() {
  const [balance, setBalance] = useState<number>(2500)
  const [historyWithdraw, setHistoryWithdraw] = useState<number[]>([]) // history of withdraw - array of numbers (price)
  const [isLoadingWithdraw, setIsLoadingWithdraw] = useState<boolean>(false)
  const [isSuccessWithdrawn, setIsSuccessWithdraw] = useState<boolean>(false)
  const [selectedCard, setSelectedCard] = useState<ICard | null>(null)
  const [isShowModal, setIsShowModal] = useState(false)

  const openModal = useCallback(() => setIsShowModal(true), [])
  const closeModal = useCallback(() => setIsShowModal(false), [])

  const cards: ICard[] = useMemo(() => [
    {
      id: 1,
      type: VISA,
      price: 1,
      bonusIndicator: 2,
      commission: 0.25
    },
    {
      id: 2,
      type: VISA,
      price: 2,
      bonusIndicator: 2,
      commission: null
    },
    {
      id: 3,
      type: VISA,
      price: 5,
      bonusIndicator: null,
      commission: 0.25
    },
    {
      id: 4,
      type: AMAZON,
      price: 10,
      bonusIndicator: null,
      commission: null
    },
    {
      id: 5,
      type: AMAZON,
      price: 20,
      bonusIndicator: 2,
      commission: null
    },
    {
      id: 6,
      type: AMAZON,
      price: 50,
      bonusIndicator: null,
      commission: null
    },
  ], [])

  const isApplyCommissions = useMemo(() => historyWithdraw.length >= 2, [historyWithdraw]) // is apply commissions

  const keyExtractor = useCallback((item: ICard) => item.id.toString(), [])
  const renderItem: ListRenderItem<ICard> = useCallback(({ item }) => <CardItem card={item}
    isSelected={item.id === selectedCard?.id}
    setSelectedCard={setSelectedCard} />, [selectedCard])

  const countPercentWithPrice = useCallback((price: number, percent: number): number => {
    if (percent === null) return 0
    return (price / 100 * percent)
  }, [])

  const countWithDrawPrice = useCallback((card: ICard): number => {
    return card.price + (card.bonusIndicator ? countPercentWithPrice(card.price, card.bonusIndicator) : 0) - 
    ((isApplyCommissions && card.commission) ? countPercentWithPrice((card.price), card.commission) : 0)
  }, [isApplyCommissions])

  const convertPriceToCoins = useCallback((price: number): number => {
    return price * 1000
  }, [])

  const onWidthdrawPress = useCallback(() => {
    setIsLoadingWithdraw(true)
    setTimeout(() => {
      if (selectedCard) {
        setBalance(balance - convertPriceToCoins(selectedCard.price)) // refresh balance
        setHistoryWithdraw([...historyWithdraw, convertPriceToCoins(selectedCard.price)]) // add in history
      }
      setIsLoadingWithdraw(false) // refresh loader
      setIsSuccessWithdraw(true)  // turn on sucess withdraw
    }, 3000)

    setTimeout(() => { // turn off success withdraw
      setIsSuccessWithdraw(false)
      setSelectedCard(null)
    }, 6000)
  }, [selectedCard, historyWithdraw])

  const getButtonLabel = useCallback((): string => {
    if (isLoadingWithdraw) return 'Withdrawing...'
    else if (selectedCard) return `${isSuccessWithdrawn ? 'Withdrawn' : 'Withdraw'} ($${countWithDrawPrice(selectedCard).toFixed(2)})`
    else return 'Withdraw'
  }, [selectedCard, isLoadingWithdraw, isSuccessWithdrawn])

  


  return <View style={styles.container}>
    <AddBalanceModal
      isShowModal={isShowModal}
      closeModal={closeModal}
      onSuccess={setBalance}
    />
    <SafeAreaView>
      <View style={[mainStyles.row, mainStyles.betweenRow]}>
        <Text style={styles.headerText}>
          Withdraw
        </Text>
        <TouchableOpacity onPress={openModal} style={styles.balance}>
          <CoinSvg width={normalize(12)} height={normalize(12)} />
          <Text style={styles.balance__total}>{balance} +</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={styles.cards}
        scrollEnabled={false}
      />

    </SafeAreaView>
    <View>
      <View style={styles.priceBlock}>
        <View style={[mainStyles.row, mainStyles.betweenRow, styles.priceBlock__inner]}>
          <Text style={[styles.headerText, styles.priceBlock__text]}>
            Price
          </Text>
          <View style={mainStyles.row}>
            <CoinSvg width={normalize(16)} height={normalize(16)} />
            <Text style={[styles.headerText, styles.priceBlock__text, mainStyles.ml4]}>
              {selectedCard ? convertPriceToCoins(selectedCard.price) : 0}
            </Text>
          </View>
        </View>
        {selectedCard && <View
          style={[styles.noCommission, convertPriceToCoins(selectedCard.price) > balance && mainStyles.betweenRow]}>
          {convertPriceToCoins(selectedCard.price) > balance && <View style={mainStyles.row}>
            <NotEnoughSvg width={normalize(12)} height={normalize(12)} />
            <Text style={[styles.dangerText, mainStyles.ml4]}>
              Not enough funds
            </Text>
          </View>}
          <Text style={[styles.headerText, styles.noCommission__text]}>
            {(isApplyCommissions && selectedCard.commission) ? `Commission: -${countPercentWithPrice(convertPriceToCoins(selectedCard.price), selectedCard.commission)}` : 'No commission'}
          </Text>
        </View>}
      </View>
      <SubmitButton
        label={getButtonLabel()}
        onPress={onWidthdrawPress}
        disabled={(!selectedCard || (selectedCard && (convertPriceToCoins(selectedCard.price) > balance)) && !isSuccessWithdrawn)}
        isLoading={isLoadingWithdraw}
        isSuccess={isSuccessWithdrawn}
      />
      {selectedCard?.bonusIndicator && <Bonus bonus={countPercentWithPrice(selectedCard.price, selectedCard.bonusIndicator)} />}
    </View>
  </View>
}
