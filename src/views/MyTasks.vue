<template>
    <div class="home-container">
        <div class="header-container">
            <p class="logo">Siemens' Submission</p>
            <p class="title">My Tasks</p>
        </div>
        <button @click="showingDifficulty = 'easy'" :class="{ active: showingDifficulty === 'easy' }">Easy</button>
        <button @click="showingDifficulty = 'medium'" :class="{ active: showingDifficulty === 'medium' }">Medium</button>
        <button @click="showingDifficulty = 'hard'" :class="{ active: showingDifficulty === 'hard' }">Hard</button>

        <div class="slider">
            <button v-if="getUser.goals.length > 1" class="arrow prev" @click="prev"><span
                    class="material-icons">keyboard_arrow_left</span></button>

            <div class="slider-slides" :style="{ transform: 'translateX(-' + currentIndex * 100 + '%)' }">
                <div class="slider-slides-slide">
                    <img src="@/assets/astro-planet.svg" alt="Image 1">
                    <h3>{{ getUser.goals[currentIndex].goalText }}</h3>
                </div>
                <div class="slider-slides-slide">
                    <img src="@/assets/dynamis-planet.svg" alt="Image 2">
                    <h3>{{ getUser.goals[currentIndex].goalText }}</h3>
                </div>
                <div class="slider-slides-slide">
                    <img src="@/assets/lumos-planet.svg" alt="Image 3">
                    <h3>{{ getUser.goals[currentIndex].goalText }}</h3>
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
        <div v-if="getUser.tasks.length > 0">
            {{ tasks }}
        </div>
    </div>
</template>

<script>import { mapGetters } from 'vuex';
export default {
    name: "my-tasks",
    computed: {
        ...mapGetters(['getUser', 'getLoading']),

        tasks() {
            return this.getUser.tasks.filter(task => task.goalTitle === this.getUser.goals[this.currentIndex].goalTitle).filter(task => task.difficulty === this.showingDifficulty)
        }
    },
    mounted() {
        this.totalSlides = this.getUser.goals.length
    },
    data() {
        return {
            currentIndex: 0,
            totalSlides: 0,
            showingDifficulty: 'easy'
        }
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
        },
    },
}
</script>
<style lang="scss" scoped>
.home-container {
    width: 100%;
    height: 100%;
}

button {
    all: unset;
    width: 80px;
    background-color: #444a5c;
    padding: 10px;
    font-family: 'ptmono';
    margin-bottom: 20px;
}

.active {
    background-color: #162041;
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
                width: 80%;
                text-wrap: wrap;
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
</style>