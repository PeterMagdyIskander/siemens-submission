<template>
    <div class="home-container">
        <div class="header-container">
            <p class="logo">Siemens' Submission</p>
            <p class="title">Hi {{ getUser.name }} <span class="emojo">👋</span></p>
        </div>

        <div class="more-info">
            <div class="more-info-info">
                <h3 class="title">Let's start by setting up a GOAL <span class="emojo">🚀</span></h3>
            </div>
        </div>
        <div class="slider">
            <button class="arrow prev" @click="prev"><span class="material-icons">keyboard_arrow_left</span></button>

            <div class="slider-slides" :style="{ transform: 'translateX(-' + currentIndex * 100 + '%)' }">
                <div class="slider-slides-slide">
                    <img src="@/assets/astro-planet.svg" alt="Image 1">
                    <h3>{{ goalTitles[currentIndex] }}</h3>
                </div>
                <div class="slider-slides-slide">
                    <img src="@/assets/dynamis-planet.svg" alt="Image 2">
                    <h3>{{ goalTitles[currentIndex] }}</h3>
                </div>
                <div class="slider-slides-slide">
                    <img src="@/assets/lumos-planet.svg" alt="Image 3">
                    <h3>{{ goalTitles[currentIndex] }}</h3>
                </div>
            </div>
            <button class="arrow next" @click="next"><span class="material-icons">keyboard_arrow_right</span></button>
        </div>
        <div class="button-container">
            <h3 class="title">What do you want to do?</h3>
            <input type="text" v-model="goalText" :placeholder="goalInspos[currentIndex]">
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
    data() {
        return {
            currentIndex: 0,
            totalSlides: 3,
            goalText: "",
            goalTitles: [
                "Be Athletic",
                "Develop a skill",
                "Income Increase"
            ],
            goalInspos: [
                "Lose 10kg of fat.",
                "Learn programming.",
                "Start a side hustle."
            ]
        }
    },
    methods: {
        next() {
            this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        },
        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        },
        async submit() {
            const firestore = getFirestore();
            const userCollectionReference = collection(firestore, 'users');// Update the goals array using Firestore's arrayUnion method
            const userDoc = doc(userCollectionReference, this.getUser.id)
            await updateDoc(userDoc, {
                goals: arrayUnion({
                    goalText: this.goalText,
                    goalTitle: this.goalTitles[this.currentIndex],
                    progress:0
                })
            });
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
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 30px;
}

.header-container {
    width: 100%;
    height: 150px;
    background-color: #162041;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 20px;
    text-align: center;
    margin-bottom: 20px;

    p {
        padding: 0;
        margin: 0;
    }

    & .logo {
        font-family: 'pressstart2p';
        color: #f4ee80;
        text-shadow: 1px 2px #a14759;
        font-size: 14px;
    }

    & .title {
        font-family: 'pressstart2p';
        font-size: 18px;
    }

    & .level {
        font-family: 'ptmono';
    }
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

.emojo {
    font-size: 32px;
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
        justify-content: center;
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

.button-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 10px;

    & .title {
        font-family: 'ptmono';
        font-size: 18px;
        color: #E5E5E5;
    }

    input {
        width: 271px;
        height: 40px;
        border: 2px solid #3E8898;
        border-radius: 6px;
        padding-left: 10px;
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

    & .disabled {
        background-color: #3E8898;
        color: #eee;
        cursor: unset;
    }
}
</style>