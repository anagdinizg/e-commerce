<template>
    <div class="checkout-form">
        <div class="form-header">
            <h2 class="form-title">Finalizar Compra</h2>
        </div>

        <form class="form-content">
            <!-- Dados pessoais -->
            <div class="form-section">
                <h3 class="section-title">Dados Pessoais</h3>
                <div class="form-group">
                    <div class="input-row">
                        <div class="input-field">
                            <input type="text" placeholder="Nome completo" class="minimal-input" />
                        </div>

                        <div class="input-field">
                            <input type="email" placeholder="E-mail" class="minimal-input" />
                        </div>
                    </div>

                    <div class="input-field">
                        <input type="tel" placeholder="Telefone" class="minimal-input" />
                    </div>
                </div>
            </div>

            <!-- Endereço -->
            <div class="form-section">
                <h3 class="section-title">Endereço de Entrega</h3>
                <div class="form-group">
                    <div class="input-row">
                        <div class="input-field cep-field">
                            <input type="text" placeholder="CEP" class="minimal-input" />
                        </div>

                        <div class="input-field">
                            <input type="text" placeholder="Logradouro" class="minimal-input" />
                        </div>
                    </div>

                    <div class="input-row">
                        <div class="input-field number-field">
                            <input type="text" placeholder="Número" class="minimal-input" />
                        </div>

                        <div class="input-field">
                            <input type="text" placeholder="Complemento (opcional)" class="minimal-input" />
                        </div>
                    </div>

                    <div class="input-row">
                        <div class="input-field">
                            <input type="text" placeholder="Bairro" class="minimal-input" />
                        </div>

                        <div class="input-field">
                            <input type="text" placeholder="Cidade" class="minimal-input" />
                        </div>

                        <div class="input-field uf-field">
                            <input type="text" placeholder="UF" class="minimal-input" maxlength="2" />
                        </div>
                    </div>
                </div>
            </div>

            <button type="submit" class="submit-btn">Finalizar Pedido</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "CheckoutForm",
};
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
