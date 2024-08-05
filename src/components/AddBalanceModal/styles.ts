import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, normalize } from "../../utils";
import { colors } from "../../types/colors";
import { MONTSERRAT_SEMIBOLD } from "../../constants";

export const styles = StyleSheet.create({
  modal: {
    width: SCREEN_WIDTH - 40,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    // height: 100,
  },
  modal__input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderStyle: 'solid',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: normalize(14),
  },
  modal__headerText: {
    fontSize: normalize(16),
    fontFamily: MONTSERRAT_SEMIBOLD,
    color: colors.primaryText,
    marginBottom: 10
  },
  modal__buttons: {
    paddingHorizontal: 40,
    marginTop: 20
  },
  modal__buttonDisaled: {
    opacity: 0.4
  }
})