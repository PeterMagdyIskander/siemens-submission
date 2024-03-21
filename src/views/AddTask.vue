<template>
    <div class="home-container">
        <div class="more-info">
            <div class="more-info-info">
                <h3 class="title">Starting strong is good. Finishing strong is epic 🌟</h3>
            </div>
        </div>
        <div class="button-container">
            <h3 class="title">Title</h3>
            <input type="text" v-model="title">
        </div>
        <div class="button-container">
            <h3 class="title">Description</h3>
            <input type="text" v-model="description">
        </div>
        <div class="button-container">
            <h3 class="title">Goal Category</h3>
            <div class="select">
                <p>{{ selectedCategory }}</p>
                <span class="material-icons" @click="categoryListOpen = !categoryListOpen">keyboard_arrow_down</span>
            </div>
            <div class="drop-down" v-if="categoryListOpen">
                <p v-for="(option, index) in getUser.goals" :key="index"
                    @click="(selectedCategory = option.goalTitle, categoryListOpen = !categoryListOpen)">{{
                option.goalTitle }}</p>
            </div>
        </div>

        <div class="button-container">
            <h3 class="title">Difficulty</h3>

            <div class="navigation-section">
                <div class="navigation-section-item">
                    <img src="@/assets/easy.svg" alt="attack-icon">
                </div>
                <div class="navigation-section-item">
                    <img src="@/assets/medium.svg" alt="quest-center-icon">

                </div>
                <div class="navigation-section-item">
                    <img src="@/assets/hard.svg" alt="my-quest-icon">
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { getFirestore, collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';
export default {
    name: "create-goal",
    computed: mapGetters(['getUser', 'getLoading']),
    mounted() {
        this.selectedCategory = this.getUser.goals[0].goalTitle
    },
    data() {
        return {
            title: "",
            description: "",
            selectedCategory: "",
            categoryListOpen: false,
        }
    },
    methods: {
        submit() {

        }
    },
}
</script>

<style lang="scss" scoped>
p,
h3 {
    margin: 0;
    padding: 0;
}

.home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 30px;
}

.more-info {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 20px;
    background-color: #111323;
    border: 1px solid #F5F5F5;
    border-radius: 6px;
    z-index: 0;
    position: relative;

    &-info {
        z-index: 3;
        padding: 10px;
        display: flex;
        flex-direction: column;
        text-align: center;

        & .title {
            font-family: 'ptmono';
            font-size: 18px;
            color: #E5E5E5;
            padding: 20px;
        }
    }
}

.button-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    & .title {
        font-family: 'ptmono';
        font-size: 18px;
        color: #E5E5E5;
    }

    input,
    select,
    .select {
        width: 100%;
        height: 40px;
        border: 2px solid #3E8898;
        border-radius: 6px;
        padding-left: 10px;
    }

    .select {
        background-color: #fff;
        color: #000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;

        span {
            position: absolute;
            right: 0;
        }
    }

    button {
        width: 170px;
        padding: 10px;
        background-color: #76bbca;
        border-radius: 6px;
        border: 1px solid #E5E5E5;
        color: #fff;
        font-size: 1.2rem;
        font-family: 'pressstart2p';
        cursor: pointer;
    }

    & .drop-down {
        p {
            color: #000;
        }
    }

    & .disabled {
        background-color: #3E8898;
        color: #eee;
        cursor: unset;
    }

    & .navigation-section {
        width: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        column-gap: 25px;
    }
}
</style>
