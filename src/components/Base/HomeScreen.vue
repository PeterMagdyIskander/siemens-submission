<template>
    <div class="home-container">
        <Header :title="`Hi ${getUser.name}`" :emoji="'👋'"
            :subtitle="`Your goal is to ${getUser.goals[currentIndex].goalText}`">
        </Header>
        <div class="slider">
            <button v-if="getUser.goals.length > 1" class="arrow prev" @click="prev"><span
                    class="material-icons">keyboard_arrow_left</span></button>

            <div class="slides" :style="{ transform: 'translateX(-' + currentIndex * 100 + '%)' }">
                <div class="slide">
                    <span class="icon">{{ getIcon(getUser.goals[currentIndex].goalTitle) }}</span>
                    <h3>{{ getTitle(getUser.goals[currentIndex].goalTitle) }}</h3>
                </div>
                <div class="slide">
                    <span class="icon">{{ getIcon(getUser.goals[currentIndex].goalTitle) }}</span>
                    <h3>{{ getTitle(getUser.goals[currentIndex].goalTitle) }}</h3>
                </div>
                <div class="slide">
                    <span class="icon">{{ getIcon(getUser.goals[currentIndex].goalTitle) }}</span>
                    <h3>{{ getTitle(getUser.goals[currentIndex].goalTitle) }}</h3>
                </div>
            </div>
            <button v-if="getUser.goals.length > 1" class="arrow next" @click="next"><span
                    class="material-icons">keyboard_arrow_right</span></button>
        </div>

        <div class="health-section">

            <div class="health-section-container">
                <div class="health-section-container-health"
                    :style="{ width: (getUser.goals[currentIndex].progress / 100) * 100 + '%' }">
                </div>
            </div>
            <h3>{{ getUser.goals[currentIndex].progress }}% Done</h3>
        </div>
        <div class="navigation-section">
            <div class="navigation-section-item" @click="navigateTo('/AddGoal')">
                🎯
            </div>
            <div class="navigation-section-item" @click="navigateTo('/AddTask')">
                📝
            </div>
            <div class="navigation-section-item" @click="navigateTo('/MyTasks')">
                🗒️
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import Header from '../Shared/Header.vue';
export default {
    name: "home-screen",
    components: {
        Header,
    },
    computed: mapGetters(['getUser', 'getLoading']),
    data() {
        return {
            currentIndex: 0,
            totalSlides: 0,
            goals: [
                {
                    title: "Be Athletic",
                    icon: "🏋️‍♂️"
                }, {
                    title: "Develop a skill",
                    icon: "🛠️"
                }, {
                    title: "Income Increase",
                    icon: "💰"
                }
            ],
        }
    },
    mounted() {
        this.totalSlides = this.getUser.goals.length
    },
    methods: {
        navigateTo(to) {
            this.$router.push(to);
        },
        next() {
            this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        },
        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        }, getIcon(goalTitle) {
            return this.goals.filter(goal => goal.title === goalTitle)[0].icon
        },
        getTitle(goalTitle) {
            return this.goals.filter(goal => goal.title === goalTitle)[0].title
        }
    }
}
</script>

<style lang="scss" scoped>
.home-container {
    padding-bottom: 10px;
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

    &-separator {
        z-index: 3;
        border-left: 1px solid #fff;
        height: 50px;
    }

    &-info {
        z-index: 3;
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        text-align: center;

        & .title {
            font-family: 'ptmono';
            font-size: 14px;
            color: #E5E5E5;
        }

        & .info {
            font-family: 'pressstart2p';
            font-size: 17px;
            color: #E5E5E5;
        }
    }
}

.planet-img {
    height: 250px;
}

.planet-title {
    font-family: 'pressstart2p';

    &.Astro {
        font-family: 'pressstart2p';
        color: #f4ee80;
        text-shadow: 3px 3px #a14759;
    }
}

.health-section {
    &-container {
        width: 80%;
        height: 30px;
        border: 2px solid #3F8898;
        border-radius: 6px;
        padding: 5px;
        margin: 20px auto;

        &-health {
            height: 100%;
            background-color: #3F8898;
            border: 2px solid #3F8898;
            border-radius: 6px;
        }
    }

    h3 {
        font-family: 'pressstart2p';
    }
}

.navigation-section {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 25px;

    &-item {
        width: 70px;
        height: 45px;
        border: 2px solid #F5F5F5;
        background-color: #3F8898;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.75rem;
    }
}

.levelup-img {
    width: 70px;
}

.slider {
    width: 100%;
    text-align: center;
    overflow: hidden;
    position: relative;

    & .slides {
        height: 100%;
        display: flex;
        transition: transform 0.5s ease;

        & .slide {
            min-width: 100%;
            height: 100%;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            .icon {
                margin-top: 25px;
                font-size: 100px;
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
</style>