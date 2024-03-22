<template>
    <div class="home-container">
        <div class="header-container">
            <p class="logo">Siemens' Submission</p>
            <p class="title">My Tasks</p>
        </div>
        <button @click="showingDifficulty = 'easy'" :class="{ active: showingDifficulty === 'easy' }">Easy</button>
        <button @click="showingDifficulty = 'medium'"
            :class="{ active: showingDifficulty === 'medium' }">Medium</button>
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
            <task-card @select="selectTask" @done="completeTask" v-for="task in tasks" :key="task.id"
                :title="task.title" :id="task.id"></task-card>
        </div>
        <div class="popup" v-if="selectedTask">
            <h3 class="title">{{ selectedTask.title }}</h3>
            <h3 class="title">{{ selectedTask.description }}</h3>
            <img v-if="selectedTask.difficulty === 'easy'" src="@/assets/easy.svg" alt="hard">
            <img v-if="selectedTask.difficulty === 'medium'" src="@/assets/medium.svg" alt="hard">
            <img v-if="selectedTask.difficulty === 'hard'" src="@/assets/hard.svg" alt="hard">
            <button class="reject" @click="selectedId = null">CLOSE</button>

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getFirestore, collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import TaskCard from '@/components/Quest/TaskCard.vue';
export default {
    name: "my-tasks",
    components: {
        TaskCard
    },
    computed: {
        ...mapGetters(['getUser', 'getLoading']),

        tasks() {
            return this.getUser.tasks.filter(task => task.goalTitle === this.getUser.goals[this.currentIndex].goalTitle &&
                task.difficulty === this.showingDifficulty &&
                !task.done)
        },
        doneTasks() {
            return this.getUser.tasks.filter(task => task.done)
        },
        selectedTask() {
            if (!this.selectedId)
                return null
            return this.tasks.filter(task => task.id === this.selectedId)[0]
        }
    },
    mounted() {
        this.totalSlides = this.getUser.goals.length
        console.log(this.getUser.goals)
    },
    data() {
        return {
            currentIndex: 0,
            totalSlides: 0,
            showingDifficulty: 'easy',
            selectedId: null
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
        selectTask(id) {
            this.selectedId = id
        },
        async completeTask(id) {
            console.log(this.getUser.id)
            try {
                const firestore = getFirestore();
                const usersCollectionRef = collection(firestore, 'users');
                const userDocRef = doc(usersCollectionRef, this.getUser.id);
                const userDocSnapshot = await getDoc(userDocRef);
                const userData = userDocSnapshot.data();
                console.log(userData.goals)
                let selectedTask = null;
                const updatedTasks = userData.tasks.map(task => {
                    if (task.id === id) {
                        task.done = true;
                        selectedTask = task;
                    }
                    return task;
                });

                const updatedGoals = userData.goals.map(goal => {
                    if (goal.goalTitle === selectedTask.goalTitle) {
                        switch (selectedTask.difficulty) {
                            case 'easy':
                                goal.progress += 10;
                                break;
                            case 'medium':
                                goal.progress += 20;
                                break;
                            case 'hard':
                                goal.progress += 30;
                                break;
                        }
                    }
                    return goal;
                });
                await updateDoc(userDocRef, {
                    tasks: updatedTasks,
                    goals: updatedGoals,
                });
                console.log('Goal text updated successfully!');
            } catch (error) {
                console.error('Error updating goal text:', error);
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.home-container {
    width: 100%;
    height: 100%;
    position: relative;
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
        text-align: center;
    }
}

.popup {
    width: 90%;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    background-color: #111323;
    border: 1px solid #F5F5F5;
    border-radius: 6px;
    z-index: 2;
    position: absolute;
    padding: 25px;

    & .title {
        font-family: 'ptmono';
        font-size: 32px;
        color: #E5E5E5;
    }

    img {
        width: 120px
    }

    .reject {
        background-color: #18182E;
        box-shadow: 0px -3px 6px #0000005C;
        border: 1px solid #FFFFFF;
        border-radius: 6px;
        align-self: flex-end;
        text-align: center;
        margin: 0;
        cursor: pointer;
    }
}
</style>