<template>
    <div class="home-container">
        <div class="header-container">
            <p class="logo">Siemens' Submission</p>
            <p class="title">Done Tasks</p>
        </div>
        <button @click="sorted = !sorted">Sorted by {{ sorted ? "Easiest" : "Hardest" }}</button>

        <div v-if="getUser.tasks.length > 0">
            <task-card v-for="task in tasks" :key="task.id"
                :title="task.title" :id="task.id" :showDifficulty="true" :difficulty="task.difficulty"></task-card>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TaskCard from '@/components/Quest/TaskCard.vue';
export default {
    name: "done-tasks",
    components: {
        TaskCard
    },
    computed: {
        ...mapGetters(['getUser', 'getLoading']),

        tasks() {
            if (this.sorted) {
                return this.doneTasks.sort((a, b) => a.difficulty - b.difficulty)
            } else {
                return this.doneTasks.sort((a, b) => b.difficulty - a.difficulty)
            }
        },
        doneTasks() {
            return this.getUser.tasks.filter(task => task.done).sort((a, b) => a.difficulty - b.difficulty)
        },

    },
    data() {
        return {
            sorted: false,
        }
    },
    methods: {

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
    width: fit-content;
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

.options-container {
    width: 100%;
    overflow-x: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

}
</style>