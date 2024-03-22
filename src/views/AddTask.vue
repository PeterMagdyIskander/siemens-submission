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
            <div class="slider">
                <button class="arrow prev" @click="prev"><span
                        class="material-icons">keyboard_arrow_left</span></button>

                <div class="slider-slides" :style="{ transform: 'translateX(-' + currentIndex * 100 + '%)' }">
                    <div class="slider-slides-slide">
                        <img src="@/assets/astro-planet.svg" alt="Image 1">
                        <h3>{{ getUser.goals[currentIndex].goalTitle }}</h3>
                    </div>
                    <div class="slider-slides-slide">
                        <img src="@/assets/dynamis-planet.svg" alt="Image 2">
                        <h3>{{ getUser.goals[currentIndex].goalTitle }}</h3>
                    </div>
                    <div class="slider-slides-slide">
                        <img src="@/assets/lumos-planet.svg" alt="Image 3">
                        <h3>{{ getUser.goals[currentIndex].goalTitle }}</h3>
                    </div>
                </div>
                <button class="arrow next" @click="next"><span
                        class="material-icons">keyboard_arrow_right</span></button>
            </div>
        </div>

        <div class="button-container">
            <h3 class="title">Difficulty</h3>

            <div class="difficulty">
                <div class="difficulty-item" @click="difficulty = 'easy'" :class="{ 'selected': difficulty == 'easy' }">
                    <img src="@/assets/easy.svg" alt="attack-icon">
                </div>
                <div class="difficulty-item" @click="difficulty = 'medium'"
                    :class="{ 'selected': difficulty == 'medium' }">
                    <img src="@/assets/medium.svg" alt="quest-center-icon">

                </div>
                <div class="difficulty-item" @click="difficulty = 'hard'" :class="{ 'selected': difficulty == 'hard' }">
                    <img src="@/assets/hard.svg" alt="my-quest-icon">
                </div>
            </div>
        </div>
        <div class="submit-container">
            <button @click="submit" :disabled="goalText === ''" :class="{ 'disabled': goalText === '' }">SUBMIT</button>
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
        this.totalSlides = this.getUser.goals.length
    },
    data() {
        return {
            title: "",
            description: "",
            currentIndex: 0,
            totalSlides: 0,
            difficulty: 'easy',

        }
    },
    methods: {
        async submit() {
            const firestore = getFirestore();
            const userCollectionReference = collection(firestore, 'users');// Update the goals array using Firestore's arrayUnion method
            const userDoc = doc(userCollectionReference, this.getUser.uid)
            await updateDoc(userDoc, {
                taks: arrayUnion({
                    title: this.title,
                    description:this.description,
                    goalTitle: this.getUser.goals[this.currentIndex].goalTitle,
                    difficulty:this.difficulty
                })
            });
        },
        next() {
            this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        },
        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        },
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

    input {
        width: 100%;
        height: 40px;
        border: 2px solid #3E8898;
        border-radius: 6px;
        padding-left: 10px;
    }

    .slider {
        width: 100%;
        height: 250px;
        text-align: center;
        overflow: hidden;
        position: relative;

        &-slides {
            height: 100%;
            display: flex;
            transition: transform 0.5s ease;

            &-slide {
                min-width: 100%;
                height: 100%;
                flex-shrink: 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;

                img {
                    margin-top: 25px;
                    width: 150px;
                    object-fit: contain;
                }

                h3 {
                    font-family: 'pressstart2p';
                    color: #f4ee80;
                    text-shadow: 1px 2px #a14759;
                    font-size: 24px;
                }
            }
        }
    }

    .arrow {
        all: unset;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding: 10px;
        z-index: 1;
    }

    .arrow.prev {
        left: 0;
    }

    .arrow.next {
        right: 0;
    }

    /* Style for Google Icon */
    .material-icons {
        font-size: 60px;
    }

    & .difficulty {
        width: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &-item {
            padding: 13px;
            cursor: pointer;
        }

        & .selected {
            border: 2px solid #3E8898;
            border-radius: 6px;
        }
    }
}
.submit-container {
    width: 80%;
    display: flex;
    justify-content: center;
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

    & .disabled {
        background-color: #3E8898;
        color: #eee;
        cursor: unset;
    }
}
</style>
