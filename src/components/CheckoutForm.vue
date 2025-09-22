<template> 

    <div class="checkout-form"> 

        <div class="form-header"> 

            <h2 class="form-title">Finalizar Compra</h2> 

        </div> 

 

        <form @submit.prevent="handleSubmit" class="form-content"> 

            <div class="form-section"> 

                <h3 class="section-title">Dados Pessoais</h3> 

                <div class="form-group"> 

                    <div class="input-row"> 

                        <div class="input-field"> 

                            <input v-model="form.nome" type="text" placeholder="Nome completo" class="minimal-input" 

                                :class="{ error: errors.nome }" @blur="validateSingleField('nome')" 

                                aria-describedby="nome-error"> 

                            <span v-if="errors.nome" id="nome-error" class="error-message" role="alert">{{ errors.nome 

                            }}</span> 

                        </div> 

 

                        <div class="input-field"> 

                            <input v-model="form.email" type="email" placeholder="E-mail" class="minimal-input" 

                                :class="{ error: errors.email }" @blur="validateSingleField('email')" 

                                @input="handleEmailInput" aria-describedby="email-error"> 

                            <span v-if="errors.email" id="email-error" class="error-message" role="alert">{{ 

                                errors.email }}</span> 

                        </div> 

                    </div> 

 

                    <div class="input-field"> 

                        <input v-model="form.telefone" type="tel" placeholder="Telefone" class="minimal-input" 

                            :class="{ error: errors.telefone }" @input="handleTelefoneInput" 

                            @blur="validateSingleField('telefone')" aria-describedby="telefone-error"> 

                        <span v-if="errors.telefone" id="telefone-error" class="error-message" role="alert">{{ 

                            errors.telefone }}</span> 

                    </div> 

                </div> 

            </div> 

 

            <div class="form-section"> 

                <h3 class="section-title">Endereço de Entrega</h3> 

                <div class="form-group"> 

                    <div class="input-row"> 

                        <div class="input-field cep-field"> 

                            <input ref="cepInput" v-model="form.cep" type="text" placeholder="CEP" class="minimal-input" 

                                :class="{ error: errors.cep, loading: loadingCep }" @input="handleCepInput" 

                                @blur="validateCepFormat" maxlength="9" aria-describedby="cep-status cep-error"> 

 

                            <!-- Status messages com aria-live --> 

                            <div aria-live="polite" aria-atomic="true"> 

                                <span v-if="loadingCep" id="cep-status" class="loading-indicator">Buscando CEP...</span> 

                                <span v-else-if="cepSuccess" id="cep-status" class="success-indicator">CEP 

                                    encontrado!</span> 

                            </div> 

 

                            <span v-if="errors.cep" id="cep-error" class="error-message" role="alert">{{ errors.cep 

                            }}</span> 

                        </div> 

 

                        <div class="input-field"> 

                            <input v-model="form.logradouro" type="text" placeholder="Logradouro" class="minimal-input" 

                                :class="{ error: errors.logradouro }" :readonly="addressReadonly" 

                                @blur="validateSingleField('logradouro')" aria-describedby="logradouro-error"> 

                            <span v-if="errors.logradouro" id="logradouro-error" class="error-message" role="alert">{{ 

                                errors.logradouro }}</span> 

                        </div> 

                    </div> 

 

                    <div class="input-row"> 

                        <div class="input-field number-field"> 

                            <input ref="numeroInput" v-model="form.numero" type="text" placeholder="Número" 

                                class="minimal-input" :class="{ error: errors.numero }" 

                                @blur="validateSingleField('numero')" aria-describedby="numero-error"> 

                            <span v-if="errors.numero" id="numero-error" class="error-message" role="alert">{{ 

                                errors.numero }}</span> 

                        </div> 

 

                        <div class="input-field"> 

                            <input v-model="form.complemento" type="text" placeholder="Complemento (opcional)" 

                                class="minimal-input" @blur="validateSingleField('complemento')"> 

                        </div> 

                    </div> 

 

                    <div class="input-row"> 

                        <div class="input-field"> 

                            <input v-model="form.bairro" type="text" placeholder="Bairro" class="minimal-input" 

                                :class="{ error: errors.bairro }" :readonly="addressReadonly" 

                                @blur="validateSingleField('bairro')" aria-describedby="bairro-error"> 

                            <span v-if="errors.bairro" id="bairro-error" class="error-message" role="alert">{{ 

                                errors.bairro }}</span> 

                        </div> 

 

                        <div class="input-field"> 

                            <input v-model="form.cidade" type="text" placeholder="Cidade" class="minimal-input" 

                                :class="{ error: errors.cidade }" :readonly="addressReadonly" 

                                @blur="validateSingleField('cidade')" aria-describedby="cidade-error"> 

                            <span v-if="errors.cidade" id="cidade-error" class="error-message" role="alert">{{ 

                                errors.cidade }}</span> 

                        </div> 

 

                        <div class="input-field uf-field"> 

                            <input v-model="form.uf" type="text" placeholder="UF" class="minimal-input" 

                                :class="{ error: errors.uf }" :readonly="addressReadonly" maxlength="2" 

                                @input="handleUfInput" @blur="validateSingleField('uf')" aria-describedby="uf-error"> 

                            <span v-if="errors.uf" id="uf-error" class="error-message" role="alert">{{ errors.uf 

                            }}</span> 

                        </div> 

                    </div> 

                </div> 

            </div> 

 

            <div v-if="statusMessage" class="status-message" :class="statusType" aria-live="polite" role="alert"> 

                {{ statusMessage }} 

            </div> 

 

            <button type="submit" class="submit-btn" :disabled="submitting" :class="{ loading: submitting }"> 

                <span v-if="submitting">Processando...</span> 

                <span v-else>Finalizar Pedido</span> 

            </button> 

        </form> 

    </div> 

</template> 

 

<script> 

import { ref, nextTick } from 'vue' 

import CepService from '../services/cep' 

import { validateField, validateForm, validateFieldLive } from '@/utils/validators' 

import { maskCep, maskTelefone } from '@/utils/masks' 

 

export default { 

    name: 'CheckoutForm', 

    emits: ['success'], 

    setup(props, { emit }) { 

        const form = ref({ 

            nome: '', 

            email: '', 

            telefone: '', 

            cep: '', 

            logradouro: '', 

            numero: '', 

            complemento: '', 

            bairro: '', 

            cidade: '', 

            uf: '' 

        }) 

 

        const errors = ref({}) 

        const loadingCep = ref(false) 

        const cepSuccess = ref(false) 

        const addressReadonly = ref(false) 

        const statusMessage = ref('') 

        const statusType = ref('info') 

        const submitting = ref(false) 

 

        const cepInput = ref(null) 

        const numeroInput = ref(null) 

 

        let cepTimeout = null 

 

        const validateSingleField = (fieldName) => { 

            const config = fieldName === 'complemento' ? { required: false } : { required: true } 

            const error = validateField(fieldName, form.value[fieldName], config) 

 

            if (error) { 

                errors.value[fieldName] = error 

            } else { 

                delete errors.value[fieldName] 

            } 

        } 

 

        const handleEmailInput = () => { 

            const liveError = validateFieldLive('email', form.value.email) 

            if (liveError) { 

                errors.value.email = liveError 

            } else if (errors.value.email) { 

                delete errors.value.email 

            } 

        } 

 

        const handleTelefoneInput = () => { 

            form.value.telefone = maskTelefone(form.value.telefone) 

            const liveError = validateFieldLive('telefone', form.value.telefone) 

            if (liveError) { 

                errors.value.telefone = liveError 

            } else if (errors.value.telefone) { 

                delete errors.value.telefone 

            } 

        } 

 

        const handleUfInput = () => { 

            form.value.uf = form.value.uf.toUpperCase() 

        } 

 

        const validateFormData = () => { 

            const fieldsConfig = { 

                nome: { required: true }, 

                email: { required: true }, 

                telefone: { required: true }, 

                cep: { required: true }, 

                logradouro: { required: true }, 

                numero: { required: true }, 

                complemento: { required: false }, 

                bairro: { required: true }, 

                cidade: { required: true }, 

                uf: { required: true } 

            } 

 

            const result = validateForm(form.value, fieldsConfig) 

            errors.value = result.errors 

            return result.isValid 

        } 

 

        const validateCepFormat = () => { 

            const error = validateFieldLive('cep', form.value.cep) 

            if (error) { 

                errors.value.cep = error 

            } else if (errors.value.cep && form.value.cep.replace(/\D/g, '').length === 8) { 

                delete errors.value.cep 

            } 

        } 

 

        const handleCepInput = () => { 

            form.value.cep = maskCep(form.value.cep) 

            const digits = form.value.cep.replace(/\D/g, '') 

 

            cepSuccess.value = false 

            addressReadonly.value = false 

 

            if (cepTimeout) clearTimeout(cepTimeout) 

 

            if (errors.value.cep && digits.length <= 8) { 

                delete errors.value.cep 

            } 

 

            if (digits.length === 8) { 

                cepTimeout = setTimeout(() => fetchCep(digits), 500) 

            } else if (digits.length > 0) { 

                clearAddressFields() 

            } 

        } 

 

        const clearAddressFields = () => { 

            form.value.logradouro = '' 

            form.value.bairro = '' 

            form.value.cidade = '' 

            form.value.uf = '' 

        } 

 

        const fetchCep = async (cep) => { 

            loadingCep.value = true 

            cepSuccess.value = false 

 

            try { 

                const result = await CepService.fetchCep(cep) 

 

                if (result.success) { 

                    const { logradouro, bairro, cidade, uf } = result.data 

 

                    form.value.logradouro = logradouro || '' 

                    form.value.bairro = bairro || '' 

                    form.value.cidade = cidade || '' 

                    form.value.uf = uf || '' 

 

                    addressReadonly.value = !!(logradouro && bairro && cidade && uf) 

                    cepSuccess.value = true 

 

                    if (errors.value.cep) { 

                        delete errors.value.cep 

                    } 

 

                    await nextTick() 

                    if (numeroInput.value) { 

                        numeroInput.value.focus() 

                    } 

 

                    setStatusMessage('CEP encontrado e endereço preenchido!', 'success') 

                } else { 

                    if (result.error.includes('não encontrado')) { 

                        setStatusMessage('CEP não encontrado. Preencha o endereço manualmente.', 'error') 

                        addressReadonly.value = false 

                    } else { 

                        setStatusMessage(result.error, 'error') 

                    } 

                } 

            } catch (error) { 

                setStatusMessage('Erro ao buscar CEP. Verifique sua conexão e tente novamente.', error) 

                addressReadonly.value = false 

            } finally { 

                loadingCep.value = false 

            } 

        } 

 

        const setStatusMessage = (message, type) => { 

            statusMessage.value = message 

            statusType.value = type 

            setTimeout(() => { 

                statusMessage.value = '' 

                if (type === 'success') { 

                    cepSuccess.value = false 

                } 

            }, 4000) 

        } 

 

        const handleSubmit = async () => { 

            if (!validateFormData()) { 

                setStatusMessage('Por favor, corrija os erros no formulário antes de continuar.', 'error') 

                return 

            } 

 

            submitting.value = true 

            try { 

                await new Promise(resolve => setTimeout(resolve, 2000)) 

                setStatusMessage('Pedido finalizado com sucesso!', 'success') 

                emit('success', form.value) 

            } catch (error) { 

                setStatusMessage('Erro ao processar pedido. Tente novamente.', error) 

            } finally { 

                submitting.value = false 

            } 

        } 

 

        return { 

            form, 

            errors, 

            loadingCep, 

            cepSuccess, 

            addressReadonly, 

            statusMessage, 

            statusType, 

            submitting, 

            cepInput, 

            numeroInput, 

            validateSingleField, 

            handleEmailInput, 

            handleTelefoneInput, 

            handleUfInput, 

            handleCepInput, 

            validateCepFormat, 

            handleSubmit 

        } 

    } 

} 

</script> 

 

<style scoped> 

.checkout-form { 

    max-width: 600px; 

    margin: 0 auto; 

    background: #ffffff; 

    border: 1px solid #f0f0f0; 

} 

 

.form-header { 

    padding: 30px 30px 0; 

    border-bottom: 1px solid #f0f0f0; 

    margin-bottom: 30px; 

} 

 

.form-title { 

    font-size: 1.8rem; 

    font-weight: 300; 

    color: #000000; 

    margin: 0; 

    padding-bottom: 20px; 

} 

 

.form-content { 

    padding: 0 30px 30px; 

} 

 

.form-section { 

    margin-bottom: 40px; 

} 

 

.section-title { 

    font-size: 1.1rem; 

    font-weight: 400; 

    color: #000000; 

    margin: 0 0 20px 0; 

    letter-spacing: 0.02em; 

} 

 

.form-group { 

    display: flex; 

    flex-direction: column; 

    gap: 20px; 

} 

 

.input-row { 

    display: flex; 

    gap: 20px; 

} 

 

.input-field { 

    flex: 1; 

    display: flex; 

    flex-direction: column; 

    position: relative; 

} 

 

.cep-field { 

    flex: 0 0 120px; 

} 

 

.number-field { 

    flex: 0 0 100px; 

} 

 

.uf-field { 

    flex: 0 0 80px; 

} 

 

.minimal-input { 

    width: 100%; 

    padding: 12px 0; 

    border: none; 

    border-bottom: 1px solid #e0e0e0; 

    background: transparent; 

    font-size: 1rem; 

    font-weight: 300; 

    color: #000000; 

    transition: border-color 0.2s ease; 

} 

 

.minimal-input::placeholder { 

    color: #999999; 

    font-weight: 300; 

} 

 

.minimal-input:focus { 

    outline: none; 

    border-bottom-color: #e91e63; 

} 

 

.minimal-input.error { 

    border-bottom-color: #ff4444; 

} 

 

.minimal-input.loading { 

    border-bottom-color: #e91e63; 

} 

 

.minimal-input:read-only { 

    background-color: #f9f9f9; 

    color: #666; 

    cursor: not-allowed; 

} 

 

.loading-indicator { 

    font-size: 0.8rem; 

    color: #e91e63; 

    margin-top: 4px; 

    font-weight: 400; 

} 

 

.success-indicator { 

    font-size: 0.8rem; 

    color: #00aa00; 

    margin-top: 4px; 

    font-weight: 400; 

} 

 

.error-message { 

    font-size: 0.8rem; 

    color: #ff4444; 

    margin-top: 4px; 

    font-weight: 400; 

} 

 

.status-message { 

    padding: 12px; 

    margin: 20px 0; 

    font-size: 0.9rem; 

    font-weight: 400; 

    border-left: 3px solid; 

    border-radius: 4px; 

} 

 

.status-message.success { 

    background: #f0f9f0; 

    color: #006600; 

    border-color: #00cc00; 

} 

 

.status-message.error { 

    background: #faf0f0; 

    color: #cc0000; 

    border-color: #ff4444; 

} 

 

.status-message.info { 

    background: #f0f8fa; 

    color: #0066cc; 

    border-color: #4499ff; 

} 

 

.submit-btn { 

    width: 100%; 

    padding: 16px; 

    border: 2px solid #000000; 

    background: #000000; 

    color: #ffffff; 

    font-size: 1rem; 

    font-weight: 400; 

    letter-spacing: 1px; 

    text-transform: uppercase; 

    cursor: pointer; 

    transition: all 0.2s ease; 

    margin-top: 20px; 

} 

 

.submit-btn:hover:not(:disabled) { 

    background: #ffffff; 

    color: #000000; 

} 

 

.submit-btn:disabled { 

    opacity: 0.6; 

    cursor: not-allowed; 

} 

 

.submit-btn.loading { 

    background: #666666; 

    border-color: #666666; 

} 

 

@media (max-width: 768px) { 

    .checkout-form { 

        border: none; 

    } 

 

    .form-header, 

    .form-content { 

        padding-left: 20px; 

        padding-right: 20px; 

    } 

 

    .input-row { 

        flex-direction: column; 

        gap: 20px; 

    } 

 

    .cep-field, 

    .number-field, 

    .uf-field { 

        flex: 1; 

    } 

 

    .form-title { 

        font-size: 1.5rem; 

    } 

} 

</style>
