<template>
    <div class="top-bar">
        <div class="top-bar-content">
            <span class="promo-text">Liquidação de beleza • Entrega expressa grátis</span>
            <button class="promo-btn">Compre Agora</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopBar',
}
</script>

<style scoped>
.top-bar {
    background: #000000;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.top-bar-content {
    display: flex;
    align-items: center;
    gap: 16px;
}

.promo-text {
    color: #ffffff;
    font-size: 0.8rem;
    font-weight: 300;
    letter-spacing: 0.5px;
}

.promo-btn {
    color: #e91e63;
    font-size: 0.8rem;
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.2s ease;
}

.promo-btn:hover {
    color: #ffffff;
}
</style>
