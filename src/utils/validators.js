export const validateField = (field, value, options = {}) => {
  const clean = String(value || '').trim()

  const { required = true, customMessage } = options

  if (!clean) {
    return required ? customMessage || 'Campo obrigatório' : ''
  }

  switch (field) {
    case 'nome': {
      const words = clean.split(/\s+/).filter((w) => w.length > 0)

      if (words.length < 2) {
        return 'Informe nome e sobrenome'
      }

      if (words.some((w) => w.length < 2)) {
        return 'Nome e sobrenome devem ter pelo menos 2 caracteres cada'
      }

      if (!/^[a-zA-ZÀ-ÿ\s-']+$/.test(clean)) {
        return 'Nome deve conter apenas letras'
      }

      return ''
    }

    case 'email': {
      const emailRegex =
        /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/

      if (clean.length > 254) {
        return 'E-mail muito longo'
      }

      if (!emailRegex.test(clean)) {
        return 'E-mail inválido'
      }

      if (clean.includes('..')) {
        return 'E-mail não pode ter pontos consecutivos'
      }

      return ''
    }

    case 'telefone': {
      const digits = clean.replace(/\D/g, '')

      if (digits.length < 10) {
        return 'Telefone deve ter DDD + número (mín. 10 dígitos)'
      }

      if (digits.length > 11) {
        return 'Telefone deve ter no máximo 11 dígitos'
      }

      const ddd = digits.substring(0, 2)

      const validDDDs = [
        '11',

        '12',

        '13',

        '14',

        '15',

        '16',

        '17',

        '18',

        '19', // SP

        '21',

        '22',

        '24', // RJ

        '27',

        '28', // ES

        '31',

        '32',

        '33',

        '34',

        '35',

        '37',

        '38', // MG

        '41',

        '42',

        '43',

        '44',

        '45',

        '46', // PR

        '47',

        '48',

        '49', // SC

        '51',

        '53',

        '54',

        '55', // RS

        '61', // DF

        '62',

        '64', // GO

        '63', // TO

        '65',

        '66', // MT

        '67', // MS

        '68', // AC

        '69', // RO

        '71',

        '73',

        '74',

        '75',

        '77', // BA

        '79', // SE

        '81',

        '87', // PE

        '82', // AL

        '83', // PB

        '84', // RN

        '85',

        '88', // CE

        '86',

        '89', // PI

        '91',

        '93',

        '94', // PA

        '92',

        '97', // AM

        '95', // RR

        '96', // AP

        '98',

        '99', // MA
      ]

      if (!validDDDs.includes(ddd)) {
        return 'DDD inválido'
      }

      if (digits.length === 11) {
        const firstDigit = digits.charAt(2)

        if (firstDigit !== '9') {
          return 'Celular deve começar com 9 após o DDD'
        }
      }

      return ''
    }

    case 'cep': {
      const digits = clean.replace(/\D/g, '')

      if (digits.length !== 8) {
        return 'CEP deve ter exatamente 8 dígitos'
      }

      if (/^0+$/.test(digits) || /^9{8}$/.test(digits)) {
        return 'CEP inválido'
      }

      return ''
    }

    case 'logradouro':
    case 'bairro':
    case 'cidade': {
      if (clean.length < 2) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} deve ter pelo menos 2 caracteres`
      }

      if (clean.length > 100) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} muito longo`
      }

      if (!/^[a-zA-Z0-9À-ÿ\s,.'-]+$/.test(clean)) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} contém caracteres inválidos`
      }

      return ''
    }

    case 'numero': {
      if (!/^[0-9]+[a-zA-Z]?$/.test(clean)) {
        return 'Número inválido (ex: 123 ou 123A)'
      }

      const numero = parseInt(clean)

      if (numero === 0) {
        return 'Número deve ser maior que 0'
      }

      if (numero > 99999) {
        return 'Número muito alto'
      }

      return ''
    }

    case 'complemento': {
      if (clean.length > 50) {
        return 'Complemento muito longo'
      }

      return ''
    }

    case 'uf': {
      const upperUF = clean.toUpperCase()

      const validUFs = [
        'AC',

        'AL',

        'AP',

        'AM',

        'BA',

        'CE',

        'DF',

        'ES',

        'GO',

        'MA',

        'MT',

        'MS',

        'MG',

        'PA',

        'PB',

        'PR',

        'PE',

        'PI',

        'RJ',

        'RN',

        'RS',

        'RO',

        'RR',

        'SC',

        'SP',

        'SE',

        'TO',
      ]

      if (!validUFs.includes(upperUF)) {
        return 'UF inválida'
      }

      return ''
    }

    default: {
      if (clean.length > 255) {
        return 'Campo muito longo'
      }

      return ''
    }
  }
}

export const validateForm = (formData, fieldsConfig = {}) => {
  const errors = {}

  Object.keys(formData).forEach((field) => {
    const config = fieldsConfig[field] || {}

    const error = validateField(field, formData[field], config)

    if (error) {
      errors[field] = error
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,

    errors,
  }
}

export const validateFieldLive = (field, value) => {
  const clean = String(value || '').trim()

  if (!clean) return ''

  switch (field) {
    case 'email':
      if (clean.includes('@')) {
        const parts = clean.split('@')

        if (parts.length !== 2 || !parts[1].includes('.')) {
          return 'E-mail incompleto'
        }
      }

      return ''

    case 'cep': {
      const digits = clean.replace(/\D/g, '')

      if (digits.length > 0 && digits.length < 8) {
        return 'CEP incompleto'
      }

      return ''
    }

    case 'telefone': {
      const phoneDigits = clean.replace(/\D/g, '')

      if (phoneDigits.length > 0 && phoneDigits.length < 10) {
        return 'Telefone incompleto'
      }

      return ''
    }

    default:
      return ''
  }
}
