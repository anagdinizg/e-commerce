<template>
    <v-footer class="main-footer" padless>
        <div class="footer-container">
            <div class="footer-section footer-brand">
                <div class="logo" @click="$router.push('/')" role="button" tabindex="0">
                    <span class="logo-glam">GLAM</span>
                    <span class="logo-beauty">BEAUTY</span>
                </div>
                <p class="footer-description">
                    Sua loja de beleza online com produtos de qualidade, entregas rápidas e promoções incríveis.
                </p>
            </div>

            <div class="footer-section footer-links">
                <h4 class="footer-title">Links Rápidos</h4>
                <ul>
                    <li><button @click="$router.push('/')" class="footer-link">Home</button></li>
                    <li><button class="footer-link">Produtos</button></li>
                    <li><button @click="$router.push('/about')" class="footer-link">Sobre</button></li>
                </ul>
            </div>

            <div class="footer-section footer-contact">
                <h4 class="footer-title">Contato</h4>
                <p>Email: suporte@glambeauty.com</p>
                <p>Telefone: (83) 98888-8888</p>
                <p>Endereço: Rua da Beleza, 123, Campina Grande - PB</p>
            </div>

            <div class="footer-section footer-social">
                <h4 class="footer-title">Siga-nos</h4>
                <div class="footer-social-icons">
                    <v-icon color="#cccccc" class="social-icon">mdi-facebook</v-icon>
                    <v-icon color="#cccccc" class="social-icon">mdi-instagram</v-icon>
                    <v-icon color="#cccccc" class="social-icon">mdi-twitter</v-icon>
                    <v-icon color="#cccccc" class="social-icon">mdi-youtube</v-icon>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>© 2025 GLAMBEAUTY. Todos os direitos reservados.</p>
        </div>
    </v-footer>
</template>

<script>
export default {
    name: 'FooterGB',
}
</script>

<style scoped>
.main-footer {
    background: #000000;
    color: #ffffff;
    padding: 40px 24px 20px;
    font-family: 'Inter', sans-serif;
}

.footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 32px;
}

.footer-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.footer-brand .logo {
    display: flex;
    gap: 4px;
    cursor: pointer;
}

.footer-brand .logo-glam {
    font-size: 1.5rem;
    font-weight: 300;
    color: #ffffff;
}

.footer-brand .logo-beauty {
    font-size: 1.5rem;
    font-weight: 600;
    color: #e91e63;
}

.footer-description {
    font-size: 0.85rem;
    font-weight: 300;
    color: #cccccc;
    margin-top: 8px;
}

.footer-title {
    font-size: 0.95rem;
    font-weight: 500;
    margin-bottom: 8px;
    color: #ffffff;
}

.footer-links ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.footer-link {
    font-size: 0.85rem;
    font-weight: 300;
    color: #cccccc;
    text-align: left;
    padding: 0;
    cursor: pointer;
    background: none;
    border: none;
    transition: color 0.2s ease;
}

.footer-link:hover {
    color: #e91e63;
}

.footer-contact p {
    font-size: 0.85rem;
    font-weight: 300;
    margin: 2px 0;
    color: #cccccc;
}

.footer-social-icons {
    display: flex;
    gap: 10px;
}

.social-icon {
    transition: color 0.2s ease;
    cursor: pointer;
}

.social-icon:hover {
    color: #e91e63 !important;
}

.footer-bottom {
    margin-top: 32px;
    text-align: center;
    font-size: 0.75rem;
    font-weight: 300;
    color: #777777;
    border-top: 1px solid #333333;
    padding-top: 12px;
}

@media (max-width: 1024px) {
    .footer-container {
        gap: 24px;
    }
}

@media (max-width: 768px) {
    .footer-container {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .footer-description,
    .footer-contact p,
    .footer-link {
        font-size: 0.8rem;
    }

    .footer-social-icons {
        justify-content: flex-start;
    }
}
</style>
