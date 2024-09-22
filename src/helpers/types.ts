import {
  BIPHASIC,
  SINGLE_PHASE,
  THREE_PHASE,
} from '@constants/minimalConsumption.constant'

export enum Ecpf {
  type = 'string',
  pattern = '^\\d{11}$',
  example = '21554495008',
}

export enum Ecnpj {
  type = 'string',
  pattern = '^\\d{14}$',
  example = '33400689000109',
}

export enum EConnectionType {
  MONOFACICO = 'monofasico',
  BIFASICO = 'bifasico',
  TRIFASICO = 'trifasico',
}

export enum EConsumptionClass {
  RESIDENCIAL = 'residencial',
  INDUSTRIAL = 'industrial',
  COMERCIAL = 'comercial',
  RURAL = 'rural',
  PODERPUBLICO = 'poderPublico',
}

export enum ETariffTypes {
  AZUL = 'azul',
  BRANCA = 'branca',
  VERDE = 'verde',
  CONVENCIONAL = 'convencional',
}

export const consumptionClassesEligible = [
  EConsumptionClass.COMERCIAL,
  EConsumptionClass.RESIDENCIAL,
  EConsumptionClass.INDUSTRIAL,
]

export const threePhaseModeEligible = [
  ETariffTypes.CONVENCIONAL,
  ETariffTypes.BRANCA,
]

export const getMinimalConsumptionByType = (
  consumptionType: EConnectionType,
) => {
  const minimalConsumptionByType = {
    [EConnectionType.MONOFACICO]: SINGLE_PHASE,
    [EConnectionType.BIFASICO]: BIPHASIC,
    [EConnectionType.TRIFASICO]: THREE_PHASE,
  }

  return minimalConsumptionByType[consumptionType]
}
