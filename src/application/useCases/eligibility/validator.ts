import {
  EConnectionType,
  EConsumptionClass,
  ETariffTypes,
} from '@helpers/types'
import { EligibilityDTO } from '@dto/eligibility.dto'
import * as yup from 'yup'

const cpfRegex = /^\d{11}$/
const cnpjRegex = /^\d{14}$/

const isCpfOrCnpj = (value: string): boolean => {
  return cpfRegex.test(value) || cnpjRegex.test(value)
}

const schema = yup.object().shape({
  numeroDoDocumento: yup
    .string()
    .required('Numero de document é requerido!')
    .test(
      'is-cpf-or-cnpj',
      'Documento debe ser CPF ou CNPJ invalido!',
      (value) => {
        return isCpfOrCnpj(value)
      },
    ),
  tipoDeConexao: yup
    .string()
    .oneOf(Object.values(EConnectionType), 'Tipo de conexao invalida!'),
  classeDeConsumo: yup
    .string()
    .oneOf(Object.values(EConsumptionClass), 'Classe de Consumo invalida!'),
  modalidadeTarifaria: yup
    .string()
    .oneOf(Object.values(ETariffTypes), 'Modalidade de Tarifa invalida'),
  historicoDeConsumo: yup
    .array()
    .of(
      yup
        .number()
        .required('KWh invalido!')
        .typeError('O Valor en KWh debe ser Numerico!'),
    )
    .min(3, 'Minima quantidades de leituras: 3 ultimas leituras')
    .max(12, 'Limite maximo de leituras: 12 ultimas leituras')
    .required('Historico de consumo é Mandatorio!'),
})

export const validateEligibility = async (dto: EligibilityDTO) => {
  await schema.validate(dto, { abortEarly: false, strict: true })
}
