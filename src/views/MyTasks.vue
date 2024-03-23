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
            <h3 v-if="!isEditing" class="title">{{ selectedTask.title }}</h3>
            <input v-if="isEditing" type="text" placeholder="Title..." v-model="editedTitle">
            <h3 v-if="!isEditing" class="title">{{ selectedTask.description }}</h3>
            <input v-if="isEditing" type="text" placeholder="Description..." v-model="editedDescription">
            <img v-if="!isEditing && selectedTask.difficulty === 'easy'" src="@/assets/easy.svg" alt="hard">
            <img v-if="!isEditing && selectedTask.difficulty === 'medium'" src="@/assets/medium.svg" alt="hard">
            <img v-if="!isEditing && selectedTask.difficulty === 'hard'" src="@/assets/hard.svg" alt="hard">
            <div class="difficulty" v-if="isEditing">
                <div class="difficulty-item" @click="editedDifficulty = 'easy'"
                    :class="{ 'selected': editedDifficulty == 'easy' }">
                    <img src="@/assets/easy.svg" alt="attack-icon">
                </div>
                <div class="difficulty-item" @click="editedDifficulty = 'medium'"
                    :class="{ 'selected': editedDifficulty == 'medium' }">
                    <img src="@/assets/medium.svg" alt="quest-center-icon">

                </div>
                <div class="difficulty-item" @click="editedDifficulty = 'hard'"
                    :class="{ 'selected': editedDifficulty == 'hard' }">
                    <img src="@/assets/hard.svg" alt="my-quest-icon">
                </div>
            </div>
            <button class="edit" @click="editTasks">{{ isEditing ? 'Done' : 'Edit' }}</button>
            <button class="delete" @click="removeTask">Remove</button>
            <button class="reject" @click="selectedId = null">Close</button>

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
            const task = this.tasks.filter(task => task.id === this.selectedId)[0];
            return task
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
            selectedId: null,
            isEditing: false,
            editedDifficulty: '',
            editedDescription: '',
            editedTitle: ''
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
        },
        async removeTask() {
            try {
                const firestore = getFirestore();
                const usersCollectionRef = collection(firestore, 'users');
                const userDocRef = doc(usersCollectionRef, this.getUser.id);
                const userDocSnapshot = await getDoc(userDocRef);
                const userData = userDocSnapshot.data();
                console.log(userData.goals)
                const updatedTasks = userData.tasks.filter(task => task.id != this.selectedTask.id);
                await updateDoc(userDocRef, {
                    tasks: updatedTasks,
                });
                console.log('task deleted successfully!');
            } catch (error) {
                console.error('Error updating goal text:', error);
            }
            this.selectedId = null;
        },
        async editTasks() {
            if (this.isEditing) {
                if(this.editedTitle==''||this.editedDifficulty == '')
                    return 
                try {
                    const firestore = getFirestore();
                    const usersCollectionRef = collection(firestore, 'users');
                    const userDocRef = doc(usersCollectionRef, this.getUser.id);
                    const userDocSnapshot = await getDoc(userDocRef);
                    const userData = userDocSnapshot.data();
                    const updatedTasks = userData.tasks.map(task => {
                        if (task.id === this.selectedTask.id) {
                            task.description = this.editedDescription;
                            task.title = this.editedTitle;
                            task.difficulty = this.editedDifficulty;
                        }
                        return task;
                    });
                    console.log(updatedTasks)
                    await updateDoc(userDocRef, {
                        tasks: updatedTasks,
                    });
                    console.log('task edited successfully!');
                } catch (error) {
                    console.error('Error editing task', error);
                }
                this.selectedId = null;
                this.editedTitle = ''
                this.editedDescription = ''
                this.editedDifficulty = ''
            }
            
            this.isEditing = !this.isEditing;
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
        width: 120px;
        margin-bottom: 0.5rem;

        @media only screen and (max-width: 767px) {
            width: 80px;
        }
    }

    input {
        width: 100%;
        height: 40px;
        border: 2px solid #17182d;
        color: #E5E5E5;
        background-color: #252a52;
        border-radius: 6px;
        padding-left: 10px;
        font-family: "ptmono";
        font-size: 32px;
        color: #E5E5E5;
    }

    .edit {
        background-color: #18182E;
        box-shadow: 0px -3px 6px #0000005C;
        border: 1px solid #FFFFFF;
        border-radius: 6px;
        text-align: center;
        margin: 0;
        cursor: pointer;
        color: #f4ee80;

    }

    .delete {
        background-color: #18182E;
        box-shadow: 0px -3px 6px #0000005C;
        border: 1px solid #FFFFFF;
        border-radius: 6px;
        text-align: center;
        margin: 0;
        cursor: pointer;
        color: #a14759;

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

    .editable {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .material-icons {
            font-size: 32px;
        }
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
</style>