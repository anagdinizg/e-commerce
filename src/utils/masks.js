export const maskCep = (value) => {
  let digits = value.replace(/\D/g, '')

  if (digits.length > 8) digits = digits.slice(0, 8)

  return digits.length > 5 ? digits.slice(0, 5) + '-' + digits.slice(5) : digits
}

export const maskTelefone = (value) => {
  let digits = value.replace(/\D/g, '')

  if (digits.length > 11) digits = digits.slice(0, 11)

  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim()
  } else {
    return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim()
  }
}
